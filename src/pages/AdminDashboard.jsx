import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Shield, Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Extracts human-readable item types from order_type regardless of shape.
 * New format: { items: ["Custom Cake", "Cupcake Dozen"] }
 * Legacy format: { cake: true, cupcake: false }
 */
function getOrderTypeLabels(orderType) {
  if (!orderType) return [];
  if (Array.isArray(orderType.items)) return orderType.items;
  return Object.entries(orderType)
    .filter(([, v]) => v === true)
    .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));
}

// DB constraint: 'pending' | 'in-progress' | 'completed' | 'cancelled'
const STATUS_OPTIONS = [
  { value: 'pending',     label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed',   label: 'Completed' },
  { value: 'cancelled',   label: 'Cancelled' },
];

const STATUS_META = {
  pending:      { variant: 'default',     Icon: Clock,        label: 'Pending' },
  'in-progress':{ variant: 'secondary',   Icon: Package,      label: 'In Progress' },
  completed:    { variant: 'success',     Icon: CheckCircle,  label: 'Completed' },
  cancelled:    { variant: 'destructive', Icon: XCircle,      label: 'Cancelled' },
};

function StatusBadge({ status }) {
  const meta = STATUS_META[status] ?? { variant: 'default', Icon: Clock, label: status };
  const { variant, Icon, label } = meta;
  return (
    <Badge variant={variant} className="flex items-center gap-1 w-fit">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

function AdminDashboard() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    fetchOrders();
  }, [isAdmin, navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success('Status updated');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Delete this order? This cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;

      setOrders(prev => prev.filter(order => order.id !== orderId));
      toast.success('Order deleted');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  const filteredOrders = orders.filter(order =>
    filter === 'all' || order.status === filter
  );

  const stats = {
    total:      orders.length,
    pending:    orders.filter(o => o.status === 'pending').length,
    inProgress: orders.filter(o => o.status === 'in-progress').length,
    completed:  orders.filter(o => o.status === 'completed').length,
    cancelled:  orders.filter(o => o.status === 'cancelled').length,
  };

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage customer orders</p>
          </div>
        </div>
        <Button variant="outline" onClick={signOut}>
          Sign Out
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Orders',  value: stats.total,      color: '' },
          { label: 'Pending',       value: stats.pending,    color: 'text-yellow-600' },
          { label: 'In Progress',   value: stats.inProgress, color: 'text-blue-600' },
          { label: 'Completed',     value: stats.completed,  color: 'text-green-600' },
          { label: 'Cancelled',     value: stats.cancelled,  color: 'text-red-600' },
        ].map(({ label, value, color }) => (
          <Card key={label}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm font-medium">Filter by status:</label>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            {STATUS_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading orders…</div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No orders found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Quote</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const typeLabels = getOrderTypeLabels(order.order_type);
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customer_name}</div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div>{order.customer_email}</div>
                        <div className="text-muted-foreground">{order.customer_phone}</div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {typeLabels.length > 0 ? (
                          <div className="flex flex-col gap-0.5">
                            {typeLabels.map((t, i) => (
                              <span key={i} className="text-xs">{t}</span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {order.due_date
                          ? new Date(order.due_date).toLocaleDateString()
                          : <span className="text-muted-foreground">N/A</span>}
                      </TableCell>
                      <TableCell className="text-sm">
                        {order.cost
                          ? `$${parseFloat(order.cost).toFixed(2)}`
                          : <span className="text-muted-foreground italic">—</span>}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Select
                            value={order.status}
                            onValueChange={(value) => updateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-36">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>{label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/order/${order.id}`)}
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteOrder(order.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
