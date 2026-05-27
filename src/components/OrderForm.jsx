import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, ImageUp, Plus, ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

/* ── Constants ─────────────────────────────────────────────────── */

const MAX_IMAGES_PER_ITEM = 3;
const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ITEM_COLORS = ['#E9AECB', '#C9956A', '#B85C82', '#7A3E28', '#4A8C6F', '#9B59B6', '#E67E22'];

const ITEM_TYPES = [
  { label: 'Custom Cake',       emoji: '🎂' },
  { label: 'Cupcake Dozen',     emoji: '🧁' },
  { label: 'Cake Pops (12 pc)', emoji: '🍡' },
  { label: 'Sheet Cake',        emoji: '🍰' },
  { label: 'Tiered Cake',       emoji: '🏔️' },
  { label: 'Smash Cake',        emoji: '👶' },
  { label: 'Cookie Cake',       emoji: '🍪' },
];

const FLAVORS = [
  { label: 'Vanilla Bean',           emoji: '🍦' },
  { label: 'Chocolate Fudge',        emoji: '🍫' },
  { label: 'Red Velvet',             emoji: '🌹' },
  { label: 'Lemon',                  emoji: '🍋' },
  { label: 'Strawberry',             emoji: '🍓' },
  { label: 'Marble',                 emoji: '🌀' },
  { label: 'Carrot',                 emoji: '🥕' },
  { label: 'Funfetti',               emoji: '🎉' },
  { label: 'Coconut',                emoji: '🥥' },
  { label: 'Brown Sugar Cinnamon',   emoji: '✨', shortLabel: 'Brown Sugar Cin.' },
];

const FROSTINGS = [
  { label: 'Buttercream' },
  { label: 'Fondant' },
  { label: 'Whipped Cream' },
  { label: 'Cream Cheese' },
  { label: 'Chocolate Ganache', shortLabel: 'Choc. Ganache' },
  { label: 'Swiss Meringue' },
];

const SIZES = [
  { label: '6–8',  sub: 'servings · 6"',       value: '6–8 servings (6")'              },
  { label: '10–12', sub: 'servings · 8"',       value: '10–12 servings (8")'            },
  { label: '16–20', sub: 'servings · 10"',      value: '16–20 servings (10")'           },
  { label: '24–30', sub: 'servings · 12"',      value: '24–30 servings (12")'           },
  { label: '30–40', sub: 'servings · sheet',    value: '30–40 servings (sheet)'         },
  { label: '50+',   sub: 'servings · tiered',   value: '50+ servings (custom / tiered)' },
];

const DIETARY = ['Gluten-Free', 'Nut-Free', 'Vegan', 'Dairy-Free', 'Egg-Free', 'Low-Sugar'];

const OCCASIONS = [
  { label: 'Birthday',              emoji: '🎉' },
  { label: 'Wedding',               emoji: '💍' },
  { label: 'Bridal Shower',         emoji: '👰' },
  { label: 'Baby Shower',           emoji: '🍼' },
  { label: 'Anniversary',           emoji: '💕' },
  { label: 'Graduation',            emoji: '🎓' },
  { label: 'Corporate Event',       emoji: '💼' },
  { label: 'Holiday Celebration',   emoji: '🎄' },
  { label: 'Just Because',          emoji: '💝' },
  { label: 'Other',                 emoji: '✨' },
];

const REFERRAL = [
  'Instagram', 'Facebook / Meta', 'Google Search', 'Pinterest',
  'Friend or Family', 'Saw at an Event', 'Returning Customer', 'Other',
];

const STEP_LABELS = ['Contact', 'Event', 'Order', 'Review'];

/* ── UI Atoms ──────────────────────────────────────────────────── */

function ProgressBar({ step, total, onBack }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex-none p-1.5 rounded-full hover:bg-muted transition-colors -ml-1.5 text-muted-foreground"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <div className="w-8 flex-none" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between text-[11px] font-medium text-muted-foreground mb-2">
            {STEP_LABELS.map((label, i) => (
              <span
                key={label}
                className={cn(
                  'transition-colors',
                  i + 1 === step ? 'text-primary font-semibold' : i + 1 < step ? 'text-primary/60' : '',
                )}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChipGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const optValue = opt.label;
        const isSelected = value === optValue;
        return (
          <button
            key={optValue}
            type="button"
            onClick={() => onChange(isSelected ? '' : optValue)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-2 rounded-full border-2',
              'text-sm font-medium transition-all duration-150 active:scale-95 select-none',
              isSelected
                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                : 'border-border bg-background text-foreground hover:border-primary/50',
            )}
          >
            {opt.emoji && <span className="text-base leading-none">{opt.emoji}</span>}
            <span>{opt.shortLabel ?? opt.label}</span>
            {isSelected && <Check className="h-3 w-3 flex-none" />}
          </button>
        );
      })}
    </div>
  );
}

function MultiChipGroup({ options, value = [], onChange }) {
  const toggle = label =>
    onChange(value.includes(label) ? value.filter(v => v !== label) : [...value, label]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const optValue = typeof opt === 'string' ? opt : opt.label;
        const isSelected = value.includes(optValue);
        return (
          <button
            key={optValue}
            type="button"
            onClick={() => toggle(optValue)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2',
              'text-xs font-medium transition-all duration-150 active:scale-95 select-none',
              isSelected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-foreground hover:border-primary/50',
            )}
          >
            {optValue}
          </button>
        );
      })}
    </div>
  );
}

function SizeGrid({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {SIZES.map(opt => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(isSelected ? '' : opt.value)}
            className={cn(
              'flex flex-col items-center justify-center p-2.5 rounded-xl border-2 min-h-[60px]',
              'text-center transition-all duration-150 active:scale-95 select-none',
              isSelected
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-background hover:border-primary/50',
            )}
          >
            <span className={cn('font-bold text-sm', isSelected ? 'text-primary' : 'text-foreground')}>{opt.label}</span>
            <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">{opt.sub}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Item Card ─────────────────────────────────────────────────── */

function ItemCard({ item, index, canRemove, onUpdate, onRemove, onAddImage, onRemoveImage }) {
  const fileInputRef = useRef(null);
  const color = ITEM_COLORS[item.colorIndex];

  return (
    <div className="rounded-2xl border bg-card overflow-hidden" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full flex-none" style={{ background: color }} />
          <span className="font-semibold text-sm">
            Item {index + 1}
            {item.type && (
              <span className="font-normal text-muted-foreground"> · {item.type}</span>
            )}
          </span>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            aria-label="Remove item"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="p-4 space-y-5">
        <div className="space-y-2.5">
          <Label className="text-sm font-semibold">
            What type? <span className="text-destructive">*</span>
          </Label>
          <ChipGroup
            options={ITEM_TYPES}
            value={item.type}
            onChange={val => onUpdate(item.id, 'type', val)}
          />
        </div>

        <div className="space-y-2.5">
          <Label className="text-sm font-semibold">How many servings?</Label>
          <SizeGrid
            value={item.size}
            onChange={val => onUpdate(item.id, 'size', val)}
          />
        </div>

        <div className="space-y-2.5">
          <Label className="text-sm font-semibold">
            Flavor <span className="text-destructive">*</span>
          </Label>
          <ChipGroup
            options={FLAVORS}
            value={item.flavor}
            onChange={val => onUpdate(item.id, 'flavor', val)}
          />
        </div>

        <div className="space-y-2.5">
          <Label className="text-sm font-semibold">Frosting</Label>
          <ChipGroup
            options={FROSTINGS}
            value={item.frosting}
            onChange={val => onUpdate(item.id, 'frosting', val)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">Design or theme</Label>
          <Input
            value={item.design}
            onChange={e => onUpdate(item.id, 'design', e.target.value)}
            placeholder="e.g. Floral garden, safari animals, Barbie pink glam…"
            className="h-11"
          />
        </div>

        <div className="space-y-2.5">
          <Label className="text-sm font-semibold">Dietary needs</Label>
          <MultiChipGroup
            options={DIETARY}
            value={item.dietary}
            onChange={val => onUpdate(item.id, 'dietary', val)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">Special instructions</Label>
          <Textarea
            value={item.notes}
            onChange={e => onUpdate(item.id, 'notes', e.target.value)}
            rows={2}
            placeholder="Inscriptions, color palette, specific details…"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            Inspiration photos{' '}
            <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          </Label>
          {item.images.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {item.images.map(({ preview }, i) => (
                <div key={i} className="relative group w-20 h-20">
                  <img
                    src={preview}
                    alt={`Reference ${i + 1}`}
                    className="w-full h-full object-cover rounded-xl border"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(item.id, i)}
                    className="absolute -top-1.5 -right-1.5 bg-black/70 text-white rounded-full p-0.5"
                    aria-label="Remove photo"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {item.images.length < MAX_IMAGES_PER_ITEM && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
            >
              <ImageUp className="h-4 w-4" />
              Add photo ({item.images.length}/{MAX_IMAGES_PER_ITEM})
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
            onChange={e => { onAddImage(item.id, e.target.files); e.target.value = ''; }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Contact ───────────────────────────────────────────── */

function StepContact({ contact, setContact, onNext, user, slideClass }) {
  const handleNext = () => {
    if (!contact.name.trim()) { toast.error('Please enter your name.'); return; }
    if (!contact.email.trim() || !contact.email.includes('@')) { toast.error('Please enter a valid email.'); return; }
    if (!contact.phone.trim()) { toast.error('Please enter your phone number.'); return; }
    onNext();
  };

  return (
    <div className={cn('space-y-6', slideClass)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Let's start with you</h2>
        <p className="text-muted-foreground text-sm mt-1">We'll use this to send your custom quote</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Full name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={contact.name}
            onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
            placeholder="Jane Smith"
            className="h-12 text-base"
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={contact.phone}
            onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
            placeholder="(555) 000-0000"
            className="h-12 text-base"
            autoComplete="tel"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={contact.email}
            onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
            placeholder="jane@example.com"
            className="h-12 text-base"
            autoComplete="email"
            disabled={!!user}
          />
          {user && (
            <p className="text-xs text-muted-foreground">Signed in as {user.email}</p>
          )}
        </div>

        <div className="space-y-2.5">
          <Label>
            How did you hear about us?{' '}
            <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {REFERRAL.map(r => {
              const selected = contact.referralSource === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setContact(c => ({ ...c, referralSource: selected ? '' : r }))}
                  className={cn(
                    'px-3 py-1.5 rounded-full border text-xs font-medium transition-all active:scale-95',
                    selected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/50',
                  )}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Button onClick={handleNext} size="lg" className="w-full h-12 text-base mt-2">
        Continue <ChevronRight className="ml-1 h-5 w-5" />
      </Button>
    </div>
  );
}

/* ── Step 2: Event ─────────────────────────────────────────────── */

function StepEvent({ event, setEvent, onNext, slideClass }) {
  const handleNext = () => {
    if (!event.dueDate) { toast.error('Please select your event date.'); return; }
    if (event.fulfillment === 'delivery' && !event.deliveryAddress.trim()) {
      toast.error('Please enter a delivery address.'); return;
    }
    onNext();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={cn('space-y-6', slideClass)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Tell us about your event</h2>
        <p className="text-muted-foreground text-sm mt-1">So we can make it absolutely perfect</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="dueDate">
            When's the big day? <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dueDate"
            type="date"
            value={event.dueDate}
            onChange={e => setEvent(ev => ({ ...ev, dueDate: e.target.value }))}
            min={today}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2.5">
          <Label>
            What's the occasion?{' '}
            <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          </Label>
          <ChipGroup
            options={OCCASIONS}
            value={event.eventType}
            onChange={val => setEvent(ev => ({ ...ev, eventType: val }))}
          />
        </div>

        <div className="space-y-2.5">
          <Label>Pickup or delivery?</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'pickup',   emoji: '🏪', title: 'Pickup',   sub: 'Collect at our location' },
              { value: 'delivery', emoji: '🚗', title: 'Delivery', sub: 'We bring it to you'      },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setEvent(ev => ({ ...ev, fulfillment: opt.value }))}
                className={cn(
                  'flex flex-col items-center justify-center p-4 rounded-2xl border-2 gap-1.5 min-h-[96px]',
                  'transition-all duration-150 active:scale-95 select-none',
                  event.fulfillment === opt.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-background hover:border-primary/50',
                )}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="font-semibold text-sm">{opt.title}</span>
                <span className="text-[11px] text-muted-foreground text-center leading-tight">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {event.fulfillment === 'delivery' && (
          <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <Label htmlFor="deliveryAddress">
              Delivery address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="deliveryAddress"
              value={event.deliveryAddress}
              onChange={e => setEvent(ev => ({ ...ev, deliveryAddress: e.target.value }))}
              placeholder="Street address, city, ZIP"
              className="h-12 text-base"
              autoComplete="street-address"
            />
          </div>
        )}
      </div>

      <Button onClick={handleNext} size="lg" className="w-full h-12 text-base mt-2">
        Continue <ChevronRight className="ml-1 h-5 w-5" />
      </Button>
    </div>
  );
}

/* ── Step 3: Items ─────────────────────────────────────────────── */

function StepItems({ items, addItem, removeItem, updateItem, addItemImage, removeItemImage, onNext, slideClass }) {
  const handleNext = () => {
    for (let i = 0; i < items.length; i++) {
      if (!items[i].type)   { toast.error(`Please select a type for Item ${i + 1}.`);   return; }
      if (!items[i].flavor) { toast.error(`Please select a flavor for Item ${i + 1}.`); return; }
    }
    onNext();
  };

  return (
    <div className={cn('space-y-5', slideClass)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">What are you ordering?</h2>
        <p className="text-muted-foreground text-sm mt-1">Tell us about each item you need</p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <ItemCard
            key={item.id}
            item={item}
            index={index}
            canRemove={items.length > 1}
            onUpdate={updateItem}
            onRemove={removeItem}
            onAddImage={addItemImage}
            onRemoveImage={removeItemImage}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="w-full py-3.5 border-2 border-dashed border-border rounded-2xl text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-medium text-sm"
      >
        <Plus className="h-4 w-4" /> Add another item
      </button>

      <Button onClick={handleNext} size="lg" className="w-full h-12 text-base">
        Review my order <ChevronRight className="ml-1 h-5 w-5" />
      </Button>
    </div>
  );
}

/* ── Step 4: Review ────────────────────────────────────────────── */

function ReviewSection({ title, onEdit, children }) {
  return (
    <div className="rounded-2xl border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs text-primary font-semibold hover:underline"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted-foreground flex-none">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function StepReview({ contact, event, items, onEdit, onSubmit, submitting, slideClass }) {
  const eventDate = event.dueDate
    ? new Date(event.dueDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      })
    : null;

  return (
    <div className={cn('space-y-4', slideClass)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Review your request</h2>
        <p className="text-muted-foreground text-sm mt-1">Everything look good?</p>
      </div>

      <ReviewSection title="Contact" onEdit={() => onEdit(1)}>
        <ReviewRow label="Name"  value={contact.name}  />
        <ReviewRow label="Phone" value={contact.phone} />
        <ReviewRow label="Email" value={contact.email} />
        <ReviewRow label="Referred by" value={contact.referralSource} />
      </ReviewSection>

      <ReviewSection title="Event" onEdit={() => onEdit(2)}>
        <ReviewRow label="Date"       value={eventDate} />
        <ReviewRow label="Occasion"   value={event.eventType} />
        <ReviewRow label="Fulfillment" value={event.fulfillment === 'pickup' ? '🏪 Pickup' : '🚗 Delivery'} />
        <ReviewRow label="Deliver to" value={event.deliveryAddress} />
      </ReviewSection>

      <ReviewSection
        title={`${items.length} ${items.length === 1 ? 'Item' : 'Items'}`}
        onEdit={() => onEdit(3)}
      >
        {items.map((item, i) => (
          <div key={item.id} className={cn('space-y-1', i > 0 && 'pt-3 border-t')}>
            <p className="text-sm font-semibold">
              Item {i + 1}: {item.type || <span className="text-muted-foreground italic">No type</span>}
            </p>
            {item.flavor   && <p className="text-xs text-muted-foreground">Flavor: {item.flavor}</p>}
            {item.size     && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
            {item.frosting && <p className="text-xs text-muted-foreground">Frosting: {item.frosting}</p>}
            {item.design   && <p className="text-xs text-muted-foreground">Design: {item.design}</p>}
            {item.dietary.length > 0 && (
              <p className="text-xs text-muted-foreground">Dietary: {item.dietary.join(', ')}</p>
            )}
            {item.images.length > 0 && (
              <div className="flex gap-1.5 mt-1.5">
                {item.images.map(({ preview }, j) => (
                  <img key={j} src={preview} alt="" className="w-12 h-12 rounded-lg object-cover border" />
                ))}
              </div>
            )}
          </div>
        ))}
      </ReviewSection>

      <div className="bg-muted/40 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed">
        By submitting you agree to ShugsCakes' cancellation policy.
        A <strong className="text-foreground">50% deposit</strong> is required to hold your date.
        Final balance due at pickup or delivery.
      </div>

      <Button
        onClick={onSubmit}
        size="lg"
        className="w-full h-12 text-base"
        disabled={submitting}
      >
        {submitting ? 'Submitting…' : '🎂 Submit Request'}
      </Button>

      <p className="text-xs text-center text-muted-foreground pb-2">
        This is a request — not a confirmed order. We'll respond with a custom quote within 24–48 hours.
      </p>
    </div>
  );
}

/* ── Step 5: Success ───────────────────────────────────────────── */

function StepSuccess({ contact, onReset }) {
  const routerNavigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in-0 zoom-in-95 duration-500 px-2">
      <div className="text-7xl leading-none select-none">🎂</div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">You're all set!</h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
          We received your request and will send a custom quote to{' '}
          <strong className="text-foreground">{contact.email}</strong>{' '}
          within 24–48 hours.
        </p>
      </div>

      <div className="bg-muted/40 rounded-2xl p-4 w-full text-left space-y-2.5 max-w-sm">
        <p className="font-semibold text-sm">What happens next</p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> You'll receive a quote by email</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Confirm with a 50% deposit to hold your date</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Final balance due at pickup or delivery</li>
        </ul>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Button
          size="lg"
          className="w-full h-12 text-base"
          onClick={() => routerNavigate('/my-orders')}
        >
          View my orders
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full h-12 text-base"
          onClick={onReset}
        >
          Start a new order
        </Button>
      </div>
    </div>
  );
}

/* ── Main Form ─────────────────────────────────────────────────── */

function OrderForm() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [slideDir, setSlideDir] = useState('forward');
  const [submitting, setSubmitting] = useState(false);

  const slideClass = slideDir === 'forward'
    ? 'animate-in fade-in-0 slide-in-from-right-4 duration-300'
    : 'animate-in fade-in-0 slide-in-from-left-4 duration-300';

  const goTo = target => {
    setSlideDir(target > step ? 'forward' : 'back');
    setStep(target);
  };

  /* ── Items state ── */
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
  const itemsRef = useRef(items);
  const setItemsSync = updater => {
    setItems(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      itemsRef.current = next;
      return next;
    });
  };

  /* ── Contact & event state ── */
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

  const removeItem = id => setItemsSync(prev => {
    const item = prev.find(i => i.id === id);
    item?.images.forEach(img => URL.revokeObjectURL(img.preview));
    return prev.filter(i => i.id !== id);
  });

  const updateItem = (id, field, value) =>
    setItemsSync(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));

  const addItemImage = (id, files) => {
    const item = itemsRef.current.find(i => i.id === id);
    if (!item) return;
    const remaining = MAX_IMAGES_PER_ITEM - item.images.length;
    if (remaining <= 0) { toast.warning(`Max ${MAX_IMAGES_PER_ITEM} photos per item.`); return; }
    const accepted = [];
    for (const file of Array.from(files).slice(0, remaining)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.warning(`"${file.name}" is not a supported image type.`); continue;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.warning(`"${file.name}" exceeds ${MAX_FILE_SIZE_MB} MB.`); continue;
      }
      accepted.push({ file, preview: URL.createObjectURL(file) });
    }
    if (accepted.length) updateItem(id, 'images', [...item.images, ...accepted]);
  };

  const removeItemImage = (itemId, imgIndex) => setItemsSync(prev =>
    prev.map(item => {
      if (item.id !== itemId) return item;
      URL.revokeObjectURL(item.images[imgIndex].preview);
      return { ...item, images: item.images.filter((_, i) => i !== imgIndex) };
    })
  );

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

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
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
        details: JSON.stringify({ items: serializedItems, event, referralSource: contact.referralSource }),
        image_urls: serializedItems.flatMap(i => i.imageUrls),
        status: 'pending',
      };

      const { error } = await supabase.from('orders').insert([orderData]).select();
      if (error) throw error;

      itemsRef.current.forEach(item => item.images.forEach(img => URL.revokeObjectURL(img.preview)));
      setSlideDir('forward');
      setStep(5);
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

  const handleReset = () => {
    itemsRef.current.forEach(item => item.images.forEach(img => URL.revokeObjectURL(img.preview)));
    itemsRef.current = [];
    setItemsSync([createItem()]);
    setContact({ name: user?.user_metadata?.full_name || '', email: user?.email || '', phone: '', referralSource: '' });
    setEvent({ dueDate: '', eventType: '', fulfillment: 'pickup', deliveryAddress: '' });
    setSlideDir('forward');
    setStep(1);
  };

  /* ── Render ── */
  return (
    <div className="container mx-auto max-w-lg px-4 py-6 pb-16">
      {step <= 4 && (
        <ProgressBar
          step={step}
          total={4}
          onBack={step > 1 ? () => goTo(step - 1) : null}
        />
      )}

      {step === 1 && (
        <StepContact
          contact={contact}
          setContact={setContact}
          onNext={() => goTo(2)}
          user={user}
          slideClass={slideClass}
        />
      )}

      {step === 2 && (
        <StepEvent
          event={event}
          setEvent={setEvent}
          onNext={() => goTo(3)}
          slideClass={slideClass}
        />
      )}

      {step === 3 && (
        <StepItems
          items={items}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
          addItemImage={addItemImage}
          removeItemImage={removeItemImage}
          onNext={() => goTo(4)}
          slideClass={slideClass}
        />
      )}

      {step === 4 && (
        <StepReview
          contact={contact}
          event={event}
          items={items}
          onEdit={goTo}
          onSubmit={handleSubmit}
          submitting={submitting}
          slideClass={slideClass}
        />
      )}

      {step === 5 && (
        <StepSuccess
          contact={contact}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default OrderForm;
