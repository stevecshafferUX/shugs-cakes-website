import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Calendar, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Safely parse the `details` TEXT column from JSON.
 */
function parseDetails(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

/**
 * Extracts human-readable item type labels from order_type regardless of shape.
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

// DB constraint uses hyphen: 'in-progress'
const STATUS_CONFIG = {
  pending:       { label: 'Pending',     color: 'bg-orange-500' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-500' },
  completed:     { label: 'Completed',   color: 'bg-green-500' },
  cancelled:     { label: 'Cancelled',   color: 'bg-red-500' },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status];
  const label  = config?.label ?? (status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending');
  const color  = config?.color ?? 'bg-orange-500';
  return <Badge className={color}>{label}</Badge>;
}

// ── Component ──────────────────────────────────────────────────────────────

function MyOrders() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setOrders(data || []);
        setLoading(false);
      });
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading your orders…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">View and track your custom cake orders</p>
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
            {orders.map(order => {
              const details     = parseDetails(order.details);
              const items       = details?.items ?? [];
              const event       = details?.event ?? {};
              const typeLabels  = getOrderTypeLabels(order.order_type);

              // Build a readable title: item types or theme or fallback
              const title = typeLabels.length > 0
                ? typeLabels.join(', ')
                : order.theme || 'Custom Order';

              return (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <CardTitle className="text-xl mb-1">{title}</CardTitle>
                        <CardDescription>
                          Submitted{' '}
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric',
                          })}
                        </CardDescription>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Event info row */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      {order.due_date && (
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          Event date:{' '}
                          <span className="font-medium text-foreground">
                            {new Date(order.due_date).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                            })}
                          </span>
                        </span>
                      )}
                      {event.eventType && (
                        <span className="text-muted-foreground">
                          Occasion: <span className="font-medium text-foreground">{event.eventType}</span>
                        </span>
                      )}
                      {event.fulfillment && (
                        <span className="text-muted-foreground">
                          {event.fulfillment === 'delivery' ? '🚗 Delivery' : '🏪 Pickup'}
                        </span>
                      )}
                    </div>

                    {/* Quote — shown once admin fills it in */}
                    {order.cost != null && (
                      <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                        <DollarSign className="h-4 w-4" />
                        Your quote: <span className="text-base font-bold">${parseFloat(order.cost).toFixed(2)}</span>
                        <span className="text-xs text-green-600 ml-1">— A 50% deposit is required to confirm your date</span>
                      </div>
                    )}

                    {/* Per-item summary */}
                    {items.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">
                          {items.length} Item{items.length !== 1 ? 's' : ''}
                        </p>
                        <div className="space-y-1.5">
                          {items.map((item, i) => (
                            <div key={item.id ?? i} className="text-sm flex flex-wrap gap-x-3 gap-y-0.5 pl-3 border-l-2 border-muted">
                              <span className="font-medium">{item.type || 'Item'}</span>
                              {item.flavor && <span className="text-muted-foreground">{item.flavor}</span>}
                              {item.frosting && <span className="text-muted-foreground">{item.frosting}</span>}
                              {item.size && <span className="text-muted-foreground">{item.size}</span>}
                              {item.dietary?.length > 0 && (
                                <span className="text-muted-foreground">{item.dietary.join(', ')}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Images */}
                    {order.image_urls?.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-sm font-semibold mb-2">Your Reference Photos</p>
                        <div className="flex flex-wrap gap-2">
                          {order.image_urls.map((url, i) => (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-16 h-16 rounded-lg border overflow-hidden hover:opacity-80 transition-opacity"
                            >
                              <img src={url} alt={`Reference ${i + 1}`} className="w-full h-full object-cover" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
