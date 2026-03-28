import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft, Calendar, DollarSign, User, Phone, Mail,
  Package, MapPin, Tag, UtensilsCrossed, Info,
} from 'lucide-react';
import { toast } from 'sonner';

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Safely parse the `details` TEXT column from JSON.
 * Returns null if missing or malformed.
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

function formatDate(dateStr) {
  if (!dateStr) return 'Not specified';
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

// DB constraint: 'pending' | 'in-progress' | 'completed' | 'cancelled'
const STATUS_OPTIONS = [
  { value: 'pending',      label: 'Pending' },
  { value: 'in-progress',  label: 'In Progress' },
  { value: 'completed',    label: 'Completed' },
  { value: 'cancelled',    label: 'Cancelled' },
];

const ITEM_COLORS = ['#E9AECB', '#C9956A', '#B85C82', '#7A3E28', '#4A8C6F', '#9B59B6', '#E67E22'];

// ── Sub-components ─────────────────────────────────────────────────────────

function InfoRow({ label, value, icon: Icon }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-0.5">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function ItemCard({ item, index }) {
  const color = ITEM_COLORS[index % ITEM_COLORS.length];

  const fields = [
    { label: 'Type',         value: item.type },
    { label: 'Size',         value: item.size },
    { label: 'Flavor',       value: item.flavor },
    { label: 'Frosting',     value: item.frosting },
    { label: 'Design/Theme', value: item.design },
  ].filter(f => f.value);

  const dietary = item.dietary?.length > 0 ? item.dietary : null;
  const notes   = item.notes?.trim() || null;
  const images  = item.imageUrls ?? [];

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderLeftWidth: 4, borderLeftColor: color }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ background: `${color}18` }}
      >
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
        <span className="font-semibold text-sm">Item {index + 1}</span>
        {item.type && (
          <span className="text-xs text-muted-foreground">— {item.type}</span>
        )}
      </div>

      <div className="px-4 py-3 space-y-3">
        {/* Core fields grid */}
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {fields.map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>

        {/* Dietary */}
        {dietary && (
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">Dietary Needs</p>
            <div className="flex flex-wrap gap-1.5">
              {dietary.map(need => (
                <Badge key={need} variant="secondary" className="text-xs">{need}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {notes && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Special Instructions</p>
            <p className="text-sm bg-muted/40 rounded p-2.5 leading-relaxed">{notes}</p>
          </div>
        )}

        {/* Per-item images */}
        {images.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">Reference Photos</p>
            <div className="flex flex-wrap gap-2">
              {images.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-20 h-20 rounded-lg border overflow-hidden hover:opacity-80 transition-opacity"
                >
                  <img src={url} alt={`Item ${index + 1} ref ${i + 1}`} className="w-full h-full object-cover" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

function AdminOrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [order, setOrder]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  // Editable admin fields
  const [status, setStatus]     = useState('');
  const [cost, setCost]         = useState('');

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
      setStatus(data.status ?? 'pending');
      setCost(data.cost != null ? String(data.cost) : '');
    } catch (err) {
      console.error('Error fetching order:', err);
      toast.error('Failed to load order details');
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  }, [orderId, navigate]);

  useEffect(() => {
    if (!isAdmin) { navigate('/admin/login'); return; }
    fetchOrder();
  }, [isAdmin, navigate, fetchOrder]);

  const saveChanges = async () => {
    setSaving(true);
    try {
      const updates = {
        status,
        cost: cost !== '' ? parseFloat(cost) : null,
      };
      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId);

      if (error) throw error;
      setOrder(prev => ({ ...prev, ...updates }));
      toast.success('Order updated');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges =
    order && (status !== order.status || cost !== (order.cost != null ? String(order.cost) : ''));

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center text-muted-foreground">Loading order…</p>
      </div>
    );
  }

  if (!order) return null;

  const details     = parseDetails(order.details);
  const items       = details?.items ?? [];
  const event       = details?.event ?? {};
  const referral    = details?.referralSource;
  const typeLabels  = getOrderTypeLabels(order.order_type);

  // Fallback: show top-level image_urls only for images not already shown per-item
  const allItemImageUrls = new Set(items.flatMap(i => i.imageUrls ?? []));
  const extraImages = (order.image_urls ?? []).filter(url => !allItemImageUrls.has(url));

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="outline" onClick={() => navigate('/admin/dashboard')} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="max-w-4xl mx-auto space-y-6">

        {/* Page title + status badge */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Order Details</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Submitted {new Date(order.created_at).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          </div>
          <Badge
            variant={
              order.status === 'completed'   ? 'success' :
              order.status === 'cancelled'   ? 'destructive' :
              order.status === 'in-progress' ? 'secondary' : 'default'
            }
            className="text-sm px-3 py-1 flex-shrink-0"
          >
            {STATUS_OPTIONS.find(s => s.value === order.status)?.label ?? order.status}
          </Badge>
        </div>

        {/* ── Admin Controls ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Admin Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Quote / Cost ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter quote amount…"
                  value={cost}
                  onChange={e => setCost(e.target.value)}
                />
              </div>
            </div>
            {hasChanges && (
              <div className="mt-4 flex justify-end">
                <Button onClick={saveChanges} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Changes'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ── Customer Information ── */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" /> Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Name"  value={order.customer_name} />
              <InfoRow label="Email" value={order.customer_email} icon={Mail} />
              <InfoRow label="Phone" value={order.customer_phone} icon={Phone} />
              {referral && (
                <InfoRow label="Heard about us via" value={referral} icon={Tag} />
              )}
            </CardContent>
          </Card>

          {/* ── Event Details ── */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" /> Event
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Event Date"  value={formatDate(order.due_date)} icon={Calendar} />
              {event.eventType && (
                <InfoRow label="Occasion" value={event.eventType} />
              )}
              <InfoRow
                label="Fulfillment"
                value={event.fulfillment === 'delivery' ? '🚗 Delivery' : '🏪 Pickup'}
              />
              {event.fulfillment === 'delivery' && event.deliveryAddress && (
                <InfoRow label="Delivery Address" value={event.deliveryAddress} icon={MapPin} />
              )}
              {order.cost != null && (
                <InfoRow
                  label="Quoted Price"
                  value={`$${parseFloat(order.cost).toFixed(2)}`}
                  icon={DollarSign}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Order Summary ── */}
        {typeLabels.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Package className="h-4 w-4" /> Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {typeLabels.map((label, i) => (
                  <Badge key={i} variant="secondary">{label}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Items Breakdown ── */}
        {items.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5" />
              Items ({items.length})
            </h2>
            {items.map((item, i) => (
              <ItemCard key={item.id ?? i} item={item} index={i} />
            ))}
          </div>
        )}

        {/* ── Fallback: raw details if no parsed items ── */}
        {items.length === 0 && order.details && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-4 w-4" /> Order Details (raw)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted/50 rounded p-3 overflow-x-auto whitespace-pre-wrap break-words">
                {order.details}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* ── Extra top-level images (not already shown per-item) ── */}
        {extraImages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Additional Reference Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {extraImages.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-square overflow-hidden rounded-lg border hover:opacity-80 transition-opacity"
                  >
                    <img src={url} alt={`Reference ${i + 1}`} className="w-full h-full object-cover" />
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
