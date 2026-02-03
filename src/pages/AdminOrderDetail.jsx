import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, DollarSign, User, Phone, Mail, Package } from 'lucide-react';
import { toast } from 'sonner';

function AdminOrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }

    fetchOrder();
  }, [orderId, isAdmin, navigate]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="outline"
        onClick={() => navigate('/admin/dashboard')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <Badge variant={order.status === 'completed' ? 'success' : 'default'} className="text-lg px-4 py-2">
            {order.status}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email
                </p>
                <p className="font-medium">{order.customer_email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Phone
                </p>
                <p className="font-medium">{order.customer_phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Due Date
                </p>
                <p className="font-medium">
                  {order.due_date
                    ? new Date(order.due_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  Budget
                </p>
                <p className="font-medium text-lg">
                  {order.cost ? `$${parseFloat(order.cost).toFixed(2)}` : 'Not specified'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Order Type</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(order.order_type || {})
                  .filter(([_, selected]) => selected)
                  .map(([type]) => (
                    <Badge key={type} variant="secondary">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Badge>
                  ))}
              </div>
            </div>

            {order.order_type?.cake && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Cake Type</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(order.cake_type || {})
                    .filter(([_, selected]) => selected)
                    .map(([type]) => (
                      <Badge key={type} variant="outline">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Badge>
                    ))}
                </div>
              </div>
            )}

            {order.theme && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Theme</p>
                <p className="font-medium">{order.theme}</p>
              </div>
            )}

            {order.servings && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Servings</p>
                <p className="font-medium">{order.servings} people</p>
              </div>
            )}

            {order.details && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Additional Details</p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{order.details}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attached Images */}
        {order.image_urls?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Attached Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default AdminOrderDetail;
