# Shug's Cakes - Complete Database Schema

## Overview

The Shug's Cakes database consists of 9 tables supporting a full-featured custom cake bakery website with admin panel, customer portal, and business management tools.

## Entity Relationship Diagram

```
users (Supabase Auth)
  ├── orders (one-to-many)
  │   ├── order_items (one-to-many)
  │   ├── order_history (one-to-many)
  │   └── promo_usage (one-to-many)
  ├── reviews (one-to-many)
  ├── contact_messages (one-to-many)
  └── gallery_images (one-to-many, via uploaded_by)

promotions
  └── promo_usage (one-to-many)

site_settings (standalone)
```

## Tables Summary

### 1. orders (Core)
**Purpose:** Primary order management
**Key Features:**
- Customer information and contact preferences
- Order type and cake specifications (JSON)
- Pricing and servings
- Due date and pickup time
- Status tracking (pending, in-progress, completed, cancelled)
- Links to authenticated users

**Relationships:**
- Belongs to User (auth.users)
- Has many OrderItems
- Has many OrderHistory entries
- Has one PromoUsage

### 2. promotions
**Purpose:** Discount code management
**Key Features:**
- Title and unique code
- Percentage or fixed-amount discounts
- Validity date range
- Active/inactive status
- Usage limits and tracking
- Admin-only creation

**Relationships:**
- Has many PromoUsage entries

### 3. gallery_images
**Purpose:** Photo gallery management
**Key Features:**
- Category-based organization (birthday, wedding, etc.)
- Image and thumbnail URLs
- Display ordering
- Active/inactive per image
- Metadata storage (JSONB)
- Public viewing with admin controls

**Relationships:**
- Belongs to User (uploaded_by)

### 4. order_items
**Purpose:** Detailed order line items (future enhancement)
**Key Features:**
- Multiple items per order
- Item type, name, quantity
- Individual pricing
- Customizations (JSONB)
- Item-specific notes

**Relationships:**
- Belongs to Order (CASCADE delete)

### 5. contact_messages
**Purpose:** Contact form submissions
**Key Features:**
- Customer name, email, phone
- Subject and message
- Status workflow (new, read, replied, archived)
- Admin notes and response tracking
- Reply timestamp and admin tracking

**Relationships:**
- Optionally belongs to User

### 6. promo_usage
**Purpose:** Promotional code tracking
**Key Features:**
- Links promo to order
- Discount amount applied
- Original and final amounts
- Usage timestamp
- Automatic counter increment (trigger)

**Relationships:**
- Belongs to Promotion (CASCADE delete)
- Belongs to Order (SET NULL on delete)
- Belongs to User

### 7. reviews
**Purpose:** Customer reviews and testimonials
**Key Features:**
- 1-5 star rating system
- Title and review text
- Moderation workflow (pending, approved, rejected, featured)
- Admin responses
- Image uploads (JSONB array)
- Display controls (show on site, featured)

**Relationships:**
- Belongs to Order
- Belongs to User (reviewer)
- Approved by User (admin)

### 8. site_settings
**Purpose:** Configurable site preferences
**Key Features:**
- Business information (name, phone, email, address)
- Operating hours (JSONB)
- Social media links
- Order parameters (min notice, max advance days)
- Feature flags (maintenance mode, accepting orders)
- Notification email addresses
- Public vs. private settings

**Relationships:**
- Standalone (no foreign keys)

### 9. order_history
**Purpose:** Order audit trail
**Key Features:**
- Automatic status change logging (trigger)
- Change type tracking (status, details, price, notes, email)
- Before/after values (JSONB)
- Admin action tracking
- IP address logging

**Relationships:**
- Belongs to Order (CASCADE delete)
- Changed by User

## Automatic Features

### Triggers

1. **updated_at** - All tables
   - Automatically updates timestamp on record changes
   - Uses shared `update_updated_at_column()` function

2. **increment_promo_usage** - promo_usage table
   - Auto-increments promotions.current_uses
   - Fires after INSERT on promo_usage

3. **log_order_status_change** - orders table
   - Automatically logs to order_history
   - Fires after UPDATE when status changes
   - Records old and new values

### Indexes

All tables include optimized indexes on:
- Primary keys (UUID)
- Foreign keys
- Status fields
- Date/time fields
- Email addresses
- Commonly queried columns

## Security Model

### Row Level Security (RLS)

All tables have RLS enabled with policies:

**Admin Policies:**
- Full CRUD access via email whitelist
- Email check: `auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@example.com')`

**User Policies:**
- View own records (orders, reviews, messages, promo usage)
- Insert own records where appropriate

**Public Policies:**
- View active gallery images
- View approved reviews (display_on_site = true)
- View public site settings
- Insert contact messages
- Insert orders (for non-authenticated users)

### Authentication

- Uses Supabase Auth with Google OAuth
- Admin access controlled by email whitelist
- Customer access via Google sign-in
- Anonymous order submission supported

## Data Types

### JSONB Fields

**orders:**
- `contact_methods` - {email: bool, facebook: bool, wix: bool}
- `order_type` - {cake: bool, cupcake: bool, cookies: bool, desserts: bool}
- `cake_type` - {sheet: bool, round: bool, tiered: bool, square: bool, shaped: bool, smash: bool}

**gallery_images:**
- `metadata` - {width: int, height: int, size: int, format: string, ...}

**order_items:**
- `customizations` - {flavor: string, frosting: string, filling: string, decorations: array, ...}

**site_settings:**
- `setting_value` - Any JSON value based on setting_type
- `business_address` - {street: string, city: string, state: string, zip: string}
- `business_hours` - {monday: string, tuesday: string, ...}
- `social_media` - {facebook: string, instagram: string, ...}

**reviews:**
- `images` - Array of image URLs

**order_history:**
- `old_value` - Previous state
- `new_value` - New state

## Migration Order

1. 01-orders-table.sql (in SUPABASE_SETUP.md)
2. 02-promotions-table.sql
3. 03-gallery-images-table.sql
4. 04-order-items-table.sql
5. 05-contact-messages-table.sql
6. 06-promo-usage-table.sql
7. 07-reviews-table.sql
8. 08-site-settings-table.sql
9. 09-order-history-table.sql

## Default Data

**site_settings** pre-populated with:
- Business name: "Shug's Cakes"
- Placeholder contact information
- Default business hours
- Order parameters (7 days min notice, 90 days max advance)
- Feature flags (accepting_orders: true, maintenance_mode: false)
- Empty social media links
- Notification email placeholders

**All default values should be updated after migration.**

## Future Enhancements

Planned tables:
- **products** - Predefined cake options and pricing
- **email_templates** - Customizable email notifications
- **user_preferences** - Customer notification preferences
- **admin_activity** - Comprehensive admin action logging
- **customer_favorites** - Saved/favorited gallery items
- **payment_transactions** - Stripe payment records
- **inventory** - Ingredient and supply tracking

## API Usage Examples

### Fetch Active Promotions
```javascript
const { data, error } = await supabase
  .from('promotions')
  .select('*')
  .eq('active', true)
  .gte('valid_until', new Date().toISOString())
  .order('created_at', { ascending: false });
```

### Get Customer Orders with History
```javascript
const { data, error } = await supabase
  .from('orders')
  .select(`
    *,
    order_history (
      created_at,
      change_type,
      old_value,
      new_value
    )
  `)
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
```

### Fetch Gallery by Category
```javascript
const { data, error } = await supabase
  .from('gallery_images')
  .select('*')
  .eq('category', 'birthday')
  .eq('active', true)
  .order('display_order', { ascending: true });
```

### Get Site Settings
```javascript
const { data, error } = await supabase
  .from('site_settings')
  .select('setting_key, setting_value')
  .eq('is_public', true);
```

## Maintenance

### Cleanup Queries

```sql
-- Delete old order history (keep 1 year)
DELETE FROM order_history
WHERE created_at < NOW() - INTERVAL '1 year';

-- Archive old contact messages
UPDATE contact_messages
SET status = 'archived'
WHERE created_at < NOW() - INTERVAL '6 months'
  AND status = 'replied';

-- Deactivate expired promotions
UPDATE promotions
SET active = false
WHERE valid_until < CURRENT_DATE
  AND active = true;
```

### Backup Recommendations

- Daily automated backups via Supabase
- Weekly manual exports of critical tables
- Pre-deployment backup before schema changes
- Test restore procedures monthly

## Performance Considerations

- Use indexes for all foreign keys
- JSONB columns indexed with GIN where needed
- Limit SELECT * queries in production
- Use pagination for large result sets
- Monitor slow query log in Supabase dashboard
- Consider materialized views for complex aggregations

## Support

For schema questions:
1. Review migration files in `supabase-migrations/`
2. Check Supabase dashboard Table Editor
3. Review RLS policies in Authentication > Policies
4. Consult [Supabase PostgreSQL Docs](https://supabase.com/docs/guides/database)
