# Supabase Database Migrations

This directory contains SQL migration files for the Shug's Cakes website database schema.

## Migration Order

Execute these migrations in order:

1. **01-orders-table.sql** - Core orders table (REQUIRED - run this first!)
2. **02-promotions-table.sql** - Promotional codes and discounts
3. **03-gallery-images-table.sql** - Gallery image storage
4. **04-order-items-table.sql** - Order line items (future enhancement)
5. **05-contact-messages-table.sql** - Contact form submissions
6. **06-promo-usage-table.sql** - Promotional code usage tracking
7. **07-reviews-table.sql** - Customer reviews and testimonials
8. **08-site-settings-table.sql** - Configurable site settings
9. **09-order-history-table.sql** - Order audit trail

## How to Run Migrations

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **+ New query**
4. Copy and paste the contents of each migration file
5. **IMPORTANT**: Replace all instances of `'your-admin-email@gmail.com'` with your actual admin email
6. Click **Run** to execute the migration
7. Repeat for each migration file in order

### Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Tables Overview

### Core Tables

#### orders
- Primary order storage
- Contains customer info, order details, pricing
- Status tracking (pending, in-progress, completed, cancelled)
- Linked to authenticated users

#### promotions
- Promotional codes and discounts
- Percentage or fixed-amount discounts
- Expiration dates and usage limits
- Active/inactive status

#### gallery_images
- Stores gallery photos by category
- Supports thumbnails and full-size images
- Display ordering and metadata
- Public visibility with admin controls

### Supporting Tables

#### order_items
- Detailed line items for orders
- Multiple items per order support
- Individual pricing and customizations
- Future enhancement for inventory tracking

#### contact_messages
- Contact form submissions
- Status tracking (new, read, replied, archived)
- Admin notes and responses
- Email tracking

#### promo_usage
- Tracks each promotional code use
- Links to orders and customers
- Discount amount tracking
- Automatic usage counter increment

#### reviews
- Customer reviews and ratings (1-5 stars)
- Moderation workflow (pending, approved, rejected, featured)
- Admin responses
- Optional images with reviews

#### site_settings
- Configurable site-wide settings
- Business hours, contact info
- Order parameters (min notice, max advance)
- Feature flags (maintenance mode, accepting orders)

#### order_history
- Audit trail of all order changes
- Automatic status change logging
- Admin action tracking
- Change history with before/after values

## Security Features

All tables include:
- **Row Level Security (RLS)** enabled
- **Admin-only policies** for sensitive operations
- **User-specific policies** for viewing own data
- **Public read policies** where appropriate (gallery, reviews)

## Automatic Features

### Triggers
- **updated_at**: Automatically updates on record changes (all tables)
- **promo usage counter**: Auto-increments when codes are used
- **order status logging**: Automatically logs to order_history

### Indexes
Optimized indexes on:
- Foreign keys
- Status fields
- Date/time fields
- Email addresses
- Frequently queried columns

## Configuration Required

Before running migrations, update in **each file**:

```sql
WHERE email = 'your-admin-email@gmail.com'
```

Replace with your actual Google email used for admin access.

## Default Data

**site_settings** includes default values for:
- Business name and contact info
- Operating hours
- Social media links
- Order parameters
- Notification settings

Update these after migration to match your business.

## Migration Status Tracking

After running migrations, you can verify with:

```sql
-- List all tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- View policies
SELECT tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

## Rollback (if needed)

To remove a table:

```sql
DROP TABLE IF EXISTS table_name CASCADE;
```

**WARNING**: This will delete all data in the table and dependent objects.

## Future Enhancements

Planned migrations:
- Product catalog table (predefined cake options)
- Email templates table
- Notification preferences table
- Admin activity log
- Customer favorites/wishlist
- Payment transactions table

## Support

For issues with migrations:
1. Check Supabase dashboard logs
2. Verify admin email is correctly set
3. Ensure migrations run in order
4. Check for syntax errors in SQL Editor
5. Review [Supabase Docs](https://supabase.com/docs/guides/database)

## Notes

- All timestamps use UTC timezone
- UUIDs are auto-generated for primary keys
- JSONB fields allow flexible schema evolution
- Soft deletes not implemented (use status fields)
- Foreign key constraints include CASCADE or SET NULL as appropriate
