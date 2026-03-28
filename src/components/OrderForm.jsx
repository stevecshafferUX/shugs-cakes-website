import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { X, ImageUp, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const MAX_IMAGES_PER_ITEM = 3;
const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const ITEM_COLORS = ['#E9AECB', '#C9956A', '#B85C82', '#7A3E28', '#4A8C6F', '#9B59B6', '#E67E22'];

const ITEM_TYPES = [
  'Custom Cake', 'Cupcake Dozen', 'Cake Pops (12 pc)',
  'Sheet Cake', 'Tiered Cake', 'Smash Cake', 'Cookie Cake',
];
const FLAVORS = [
  'Vanilla Bean', 'Chocolate Fudge', 'Red Velvet', 'Lemon',
  'Strawberry', 'Marble', 'Carrot', 'Funfetti', 'Coconut', 'Brown Sugar Cinnamon',
];
const FROSTINGS = [
  'Buttercream', 'Fondant', 'Whipped Cream',
  'Cream Cheese', 'Chocolate Ganache', 'Swiss Meringue',
];
const SIZES = [
  '6–8 servings (6")', '10–12 servings (8")', '16–20 servings (10")',
  '24–30 servings (12")', '30–40 servings (sheet)', '50+ servings (custom / tiered)',
];
const DIETARY = ['Gluten-Free', 'Nut-Free', 'Vegan', 'Dairy-Free', 'Egg-Free', 'Low-Sugar'];
const OCCASIONS = [
  'Birthday', 'Wedding', 'Bridal Shower', 'Baby Shower', 'Anniversary',
  'Graduation', 'Corporate Event', 'Holiday Celebration', 'Just Because', 'Other',
];
const REFERRAL = [
  'Instagram', 'Facebook / Meta', 'Google Search', 'Pinterest',
  'Friend or Family Referral', 'Saw a Cake at an Event', 'Returning Customer', 'Other',
];

// Shared className that visually matches the shadcn Input component
const SELECT_CLS =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ' +
  'ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

/* ── Item Card ───────────────────────────────────────────────── */

function ItemCard({ item, index, canRemove, onUpdate, onRemove, onToggleDietary, onAddImage, onRemoveImage }) {
  const fileInputRef = useRef(null);
  const color = ITEM_COLORS[item.colorIndex];

  return (
    <Card className="overflow-hidden" style={{ borderLeftWidth: 4, borderLeftColor: color }}>
      <CardContent className="pt-0">
        {/* Header */}
        <div
          className="flex items-center justify-between py-3 mb-4 border-b"
          style={{ borderColor: `${color}40` }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
            <span className="font-semibold text-sm">Item {index + 1}</span>
            {item.type && (
              <span className="text-xs text-muted-foreground">— {item.type}</span>
            )}
          </div>
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
              aria-label="Remove item"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Item Type */}
          <div className="space-y-2">
            <Label>Item Type *</Label>
            <select
              value={item.type}
              onChange={e => onUpdate(item.id, 'type', e.target.value)}
              className={SELECT_CLS}
            >
              <option value="">Choose type…</option>
              {ITEM_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <Label>Number of Servings</Label>
            <select
              value={item.size}
              onChange={e => onUpdate(item.id, 'size', e.target.value)}
              className={SELECT_CLS}
            >
              <option value="">Choose size…</option>
              {SIZES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Flavor */}
          <div className="space-y-2">
            <Label>Cake Flavor *</Label>
            <select
              value={item.flavor}
              onChange={e => onUpdate(item.id, 'flavor', e.target.value)}
              className={SELECT_CLS}
            >
              <option value="">Choose flavor…</option>
              {FLAVORS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>

          {/* Frosting */}
          <div className="space-y-2">
            <Label>Frosting Type</Label>
            <select
              value={item.frosting}
              onChange={e => onUpdate(item.id, 'frosting', e.target.value)}
              className={SELECT_CLS}
            >
              <option value="">Choose frosting…</option>
              {FROSTINGS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>

          {/* Design / Theme */}
          <div className="space-y-2 md:col-span-2">
            <Label>Design / Theme</Label>
            <Input
              value={item.design}
              onChange={e => onUpdate(item.id, 'design', e.target.value)}
              placeholder="e.g. Floral garden, safari animals, minimalist gold, Barbie pink glam…"
            />
          </div>

          {/* Dietary Needs */}
          <div className="space-y-2 md:col-span-2">
            <Label>Dietary Needs</Label>
            <div className="flex flex-wrap gap-2">
              {DIETARY.map(need => (
                <button
                  key={need}
                  type="button"
                  onClick={() => onToggleDietary(item.id, need)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                    item.dietary.includes(need)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-primary/50',
                  )}
                >
                  {need}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2 md:col-span-2">
            <Label>Special Instructions</Label>
            <Textarea
              value={item.notes}
              onChange={e => onUpdate(item.id, 'notes', e.target.value)}
              rows={3}
              placeholder="Inscriptions, color palette, specific details, or anything else ShugsCakes should know…"
            />
          </div>

          {/* Reference Photo */}
          <div className="space-y-2 md:col-span-2">
            <Label>Inspiration / Reference Photo (optional)</Label>
            <div
              onDrop={e => { e.preventDefault(); onAddImage(item.id, e.dataTransfer.files); }}
              onDragOver={e => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/5',
                item.images.length >= MAX_IMAGES_PER_ITEM && 'opacity-50 pointer-events-none',
              )}
            >
              <ImageUp className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                {item.images.length}/{MAX_IMAGES_PER_ITEM} photo(s) — click or drag to add
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
                onChange={e => { onAddImage(item.id, e.target.files); e.target.value = ''; }}
              />
            </div>

            {item.images.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-1">
                {item.images.map(({ preview }, i) => (
                  <div key={i} className="relative group w-16 h-16">
                    <img
                      src={preview}
                      alt={`Reference ${i + 1}`}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveImage(item.id, i)}
                      className="absolute -top-1 -right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Main Form ───────────────────────────────────────────────── */

function OrderForm() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  // Incrementing ID ref — stays stable across renders
  const nextId = useRef(1);

  const createItem = () => {
    const id = nextId.current++;
    return {
      id,
      colorIndex: (id - 1) % ITEM_COLORS.length,
      type: '', size: '', flavor: '', frosting: '',
      design: '', dietary: [], notes: '', images: [],
    };
  };

  const [items, setItems] = useState(() => [createItem()]);
  // Ref mirrors items so event handlers like addItemImage never close over stale state
  const itemsRef = useRef(items);
  const setItemsSync = updater => {
    setItems(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      itemsRef.current = next;
      return next;
    });
  };

  const [contact, setContact] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    referralSource: '',
  });

  const [event, setEvent] = useState({
    dueDate: '',
    eventType: '',
    fulfillment: 'pickup',
    deliveryAddress: '',
  });

  /* ── Item operations ── */

  const addItem = () => setItemsSync(prev => [...prev, createItem()]);

  const removeItem = id => {
    setItemsSync(prev => {
      const item = prev.find(i => i.id === id);
      item?.images.forEach(img => URL.revokeObjectURL(img.preview));
      return prev.filter(i => i.id !== id);
    });
  };

  const updateItem = (id, field, value) =>
    setItemsSync(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));

  const toggleDietary = (id, need) =>
    setItemsSync(prev => prev.map(item => {
      if (item.id !== id) return item;
      const dietary = item.dietary.includes(need)
        ? item.dietary.filter(d => d !== need)
        : [...item.dietary, need];
      return { ...item, dietary };
    }));

  const addItemImage = (id, files) => {
    // Read from ref to guarantee latest state, not the render-time closure
    const item = itemsRef.current.find(i => i.id === id);
    if (!item) return;
    const remaining = MAX_IMAGES_PER_ITEM - item.images.length;
    if (remaining <= 0) { toast.warning(`Max ${MAX_IMAGES_PER_ITEM} photos per item.`); return; }

    const accepted = [];
    for (const file of Array.from(files).slice(0, remaining)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.warning(`"${file.name}" is not a supported type. Use JPG, PNG, GIF, or WebP.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.warning(`"${file.name}" exceeds ${MAX_FILE_SIZE_MB} MB.`);
        continue;
      }
      accepted.push({ file, preview: URL.createObjectURL(file) });
    }
    if (accepted.length) updateItem(id, 'images', [...item.images, ...accepted]);
  };

  const removeItemImage = (itemId, imgIndex) => {
    setItemsSync(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      URL.revokeObjectURL(item.images[imgIndex].preview);
      return { ...item, images: item.images.filter((_, i) => i !== imgIndex) };
    }));
  };

  /* ── Validation ── */

  const validate = () => {
    if (!contact.name.trim())                          { toast.error('Please enter your name.'); return false; }
    if (!contact.email.trim() || !contact.email.includes('@')) { toast.error('Please enter a valid email.'); return false; }
    if (!contact.phone.trim())                         { toast.error('Please enter your phone number.'); return false; }
    if (!event.dueDate)                                { toast.error('Please select your event date.'); return false; }
    if (items.length === 0)                            { toast.error('Please add at least one item.'); return false; }

    for (let i = 0; i < items.length; i++) {
      if (!items[i].type)   { toast.error(`Please select an item type for Item ${i + 1}.`); return false; }
      if (!items[i].flavor) { toast.error(`Please select a flavor for Item ${i + 1}.`); return false; }
    }

    if (event.fulfillment === 'delivery' && !event.deliveryAddress.trim()) {
      toast.error('Please enter a delivery address.'); return false;
    }
    return true;
  };

  /* ── Submit ── */

  const uploadItemImages = async item => {
    const urls = [];
    for (const { file } of item.images) {
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('order-images')
        .upload(path, file, { cacheControl: '3600', upsert: false });
      if (error) throw new Error(`Failed to upload "${file.name}": ${error.message}`);
      const { data: { publicUrl } } = supabase.storage.from('order-images').getPublicUrl(data.path);
      urls.push(publicUrl);
    }
    return urls;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      // Upload images for each item, then strip File/blob objects before serializing
      const serializedItems = await Promise.all(items.map(async item => {
        const imageUrls = await uploadItemImages(item);
        const { images: _dropped, ...rest } = item;
        return { ...rest, imageUrls };
      }));

      const orderData = {
        user_id: user?.id || null,
        customer_name: contact.name,
        customer_email: contact.email,
        customer_phone: contact.phone,
        due_date: event.dueDate,
        order_type: { items: items.map(i => i.type) },
        cake_type: {},
        theme: items.map(i => i.design).filter(Boolean).join(', ') || null,
        servings: null,
        cost: null,
        details: JSON.stringify({
          items: serializedItems,
          event,
          referralSource: contact.referralSource,
        }),
        image_urls: serializedItems.flatMap(i => i.imageUrls),
        status: 'pending',
      };

      const { error } = await supabase.from('orders').insert([orderData]).select();
      if (error) throw error;

      toast.success("Order request sent! We'll respond with a custom quote within 24–48 hours.");

      // Revoke object URLs before resetting
      itemsRef.current.forEach(item => item.images.forEach(img => URL.revokeObjectURL(img.preview)));
      setItemsSync([createItem()]);
      setContact({
        name: user?.user_metadata?.full_name || '',
        email: user?.email || '',
        phone: '',
        referralSource: '',
      });
      setEvent({ dueDate: '', eventType: '', fulfillment: 'pickup', deliveryAddress: '' });
    } catch (error) {
      console.error('Order submission error:', error);
      let msg = 'Error submitting order. ';
      if (error.message?.includes('JWT'))     msg += 'Please sign out and sign back in.';
      else if (error.message?.includes('network')) msg += 'Please check your internet connection.';
      else msg += error.message || 'Please try again or contact us directly.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Render ── */

  return (
    <div className="container mx-auto py-8 px-4">
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto space-y-6">

          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Order Form</h1>
            <p className="text-muted-foreground">Fill out the details below to place your custom order</p>
          </div>

          {/* ── Contact Information ── */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={contact.name}
                    onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
                    placeholder="Jane Smith"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contact.phone}
                    onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                    placeholder="(555) 000-0000"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contact.email}
                    onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                    placeholder="jane@example.com"
                    required
                    disabled={!!user}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="referral">How did you hear about us?</Label>
                  <select
                    id="referral"
                    value={contact.referralSource}
                    onChange={e => setContact(c => ({ ...c, referralSource: e.target.value }))}
                    className={SELECT_CLS}
                  >
                    <option value="">Select one…</option>
                    {REFERRAL.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Event Details ── */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Event Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={event.dueDate}
                    onChange={e => setEvent(ev => ({ ...ev, dueDate: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Occasion</Label>
                  <select
                    id="eventType"
                    value={event.eventType}
                    onChange={e => setEvent(ev => ({ ...ev, eventType: e.target.value }))}
                    className={SELECT_CLS}
                  >
                    <option value="">Select occasion…</option>
                    {OCCASIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Pickup or Delivery?</Label>
                  <div className="flex gap-3">
                    {['pickup', 'delivery'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setEvent(ev => ({ ...ev, fulfillment: type }))}
                        className={cn(
                          'flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all text-sm',
                          event.fulfillment === type
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50',
                        )}
                      >
                        {type === 'pickup' ? '🏪 Pickup' : '🚗 Delivery'}
                      </button>
                    ))}
                  </div>
                </div>

                {event.fulfillment === 'delivery' && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                    <Input
                      id="deliveryAddress"
                      value={event.deliveryAddress}
                      onChange={e => setEvent(ev => ({ ...ev, deliveryAddress: e.target.value }))}
                      placeholder="Street address, city, ZIP code"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ── Cake Items ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your Items</h2>
              <span className="text-sm text-muted-foreground">
                {items.length} item{items.length !== 1 ? 's' : ''}
              </span>
            </div>

            {items.map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                index={index}
                canRemove={items.length > 1}
                onUpdate={updateItem}
                onRemove={removeItem}
                onToggleDietary={toggleDietary}
                onAddImage={addItemImage}
                onRemoveImage={removeItemImage}
              />
            ))}

            <button
              type="button"
              onClick={addItem}
              className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 font-medium text-sm"
            >
              <Plus className="h-4 w-4" /> Add Another Item
            </button>
          </div>

          {/* ── Policy + Submit ── */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-4 leading-relaxed">
                By submitting this request you agree to ShugsCakes' cancellation policy.
                A <strong>50% deposit</strong> is required to hold your date.
                Final balance is due at pickup/delivery.
              </p>
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? 'Submitting…' : '🎂 Submit Order Request'}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                This is a request — not a confirmed order. ShugsCakes will respond with a custom quote within 24–48 hours.
              </p>
            </CardContent>
          </Card>

        </div>
      </form>
    </div>
  );
}

export default OrderForm;
