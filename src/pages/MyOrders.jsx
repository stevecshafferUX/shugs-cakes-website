import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Calendar, DollarSign, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MyOrders() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  }

  function getOrderTypeLabel(order) {
    const orderType = order.order_type;
    if (typeof orderType === 'object' && orderType !== null) {
      const types = Object.keys(orderType).filter(key => orderType[key]);
      if (types.length > 0) {
        return types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ');
      }
    }
    return 'Custom Order';
  }

  function getCakeTypeLabel(order) {
    const cakeType = order.cake_type;
    if (typeof cakeType === 'object' && cakeType !== null) {
      const types = Object.keys(cakeType).filter(key => cakeType[key]);
      if (types.length > 0) {
        return types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ');
      }
    }
    return 'N/A';
  }

  function formatStatus(status) {
    if (!status) return 'Pending';
    const statusLabels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return statusLabels[status] || status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  }

  function getStatusColor(status) {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-orange-500';
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            View and track your custom cake orders
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start by ordering a custom cake!
              </p>
              <Button onClick={() => navigate('/order')}>Place an Order</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">
                        {order.theme || 'Custom Cake Order'}
                      </CardTitle>
                      <CardDescription>
                        Order placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {formatStatus(order.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Order Details
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Type:</span> {getOrderTypeLabel(order)}</p>
                          <p><span className="text-muted-foreground">Cake Style:</span> {getCakeTypeLabel(order)}</p>
                          {order.servings && (
                            <p><span className="text-muted-foreground">Servings:</span> {order.servings}</p>
                          )}
                          {order.cost && (
                            <p className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">Estimated Cost:</span>
                              <span className="font-semibold">${parseFloat(order.cost).toFixed(2)}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {order.design && (
                        <div>
                          <h3 className="font-semibold mb-2">Design Details</h3>
                          <p className="text-sm text-muted-foreground">{order.design}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {(order.due_date || order.pickup_time) && (
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Pickup Information
                          </h3>
                          <div className="space-y-1 text-sm">
                            {order.due_date && (
                              <p>
                                <span className="text-muted-foreground">Date:</span>{' '}
                                {new Date(order.due_date).toLocaleDateString()}
                              </p>
                            )}
                            {order.pickup_time && (
                              <p><span className="text-muted-foreground">Time:</span> {order.pickup_time}</p>
                            )}
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {order.customer_email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {order.customer_phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {order.details && (
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="font-semibold mb-2">Additional Details</h3>
                      <p className="text-sm text-muted-foreground">{order.details}</p>
                    </div>
                  )}

                  {order.image_urls?.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="font-semibold mb-2">Attached Images</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {order.image_urls.map((url, index) => (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block aspect-square overflow-hidden rounded-lg border hover:opacity-80 transition-opacity"
                          >
                            <img src={url} alt={`Reference image ${index + 1}`} className="w-full h-full object-cover" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
