# Database Scripts Guide

Quick reference for managing your Shug's Cakes database.

---

## 📁 Available Scripts

| Script | Purpose | Danger Level |
|--------|---------|--------------|
| `database-schema.sql` | Create all tables, triggers, and views | ✅ Safe - Only creates |
| `database-seed-data.sql` | Insert test/demo data | ✅ Safe - Only inserts |
| `database-drop-all.sql` | Delete ALL tables and data | 🔴 DESTRUCTIVE |
| `database-reset.sql` | Drop everything and recreate | 🔴 DESTRUCTIVE |

---

## 🚀 Common Use Cases

### 1. Fresh Install (First Time Setup)

```bash
# In Supabase SQL Editor or via psql:

# Step 1: Create all tables
psql -h your-host -U postgres -d postgres -f database-schema.sql

# Step 2: Load test data
psql -h your-host -U postgres -d postgres -f database-seed-data.sql
```

**Or in Supabase Dashboard:**
1. Go to SQL Editor
2. Copy contents of `database-schema.sql` → Run
3. Copy contents of `database-seed-data.sql` → Run

---

### 2. Reset Database (Keep Structure, Clear Data)

```bash
# Clear all data but keep tables
psql -h your-host -U postgres -d postgres <<'SQL'
TRUNCATE TABLE coupon_usage CASCADE;
TRUNCATE TABLE order_items CASCADE;
TRUNCATE TABLE order_history CASCADE;
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE reviews CASCADE;
TRUNCATE TABLE contact_messages CASCADE;
TRUNCATE TABLE gallery_images CASCADE;
TRUNCATE TABLE customers CASCADE;
TRUNCATE TABLE coupons CASCADE;
TRUNCATE TABLE products CASCADE;
SQL

# Reload seed data
psql -h your-host -U postgres -d postgres -f database-seed-data.sql
```

---

### 3. Complete Reset (Nuclear Option)

⚠️ **WARNING**: This deletes EVERYTHING!

```bash
# Option A: Drop and recreate manually
psql -h your-host -U postgres -d postgres -f database-drop-all.sql
psql -h your-host -U postgres -d postgres -f database-schema.sql
psql -h your-host -U postgres -d postgres -f database-seed-data.sql

# Option B: Use the reset script (does all three steps)
psql -h your-host -U postgres -d postgres -f database-reset.sql
```

**In Supabase Dashboard:**
1. SQL Editor → Copy `database-drop-all.sql` → Run
2. SQL Editor → Copy `database-schema.sql` → Run
3. SQL Editor → Copy `database-seed-data.sql` → Run

---

### 4. Production Setup (No Test Data)

```bash
# Only create schema, no seed data
psql -h your-host -U postgres -d postgres -f database-schema.sql

# Schema already includes essential data:
# - Product categories (Cakes, Cupcakes, Cookies, Desserts)
# - Cake types (Sheet, Round, Tiered, etc.)
# - Flavors (Vanilla, Chocolate, etc.)
# - Site settings (business info)
```

---

### 5. Update Schema (Migrations)

If you modify `database-schema.sql`:

```bash
# Check what would change
psql -h your-host -U postgres -d postgres -c "\d orders"

# Apply specific changes only
# Create a migration script for the changes, don't drop everything!

# Example migration:
psql -h your-host -U postgres -d postgres <<'SQL'
ALTER TABLE orders ADD COLUMN IF NOT EXISTS new_field VARCHAR(100);
SQL
```

---

## 🔍 Verification Commands

After running any script, verify it worked:

```sql
-- List all tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Count records in each table
SELECT 'customers' as table_name, COUNT(*) FROM customers
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'coupons', COUNT(*) FROM coupons
UNION ALL
SELECT 'contact_messages', COUNT(*) FROM contact_messages
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews
ORDER BY table_name;

-- Check for foreign key errors
SELECT
    conname AS constraint_name,
    conrelid::regclass AS table_name,
    confrelid::regclass AS foreign_table
FROM pg_constraint
WHERE contype = 'f'
ORDER BY table_name;

-- View sample data
SELECT order_number, status, contact_name, total_amount
FROM orders
ORDER BY created_at DESC
LIMIT 5;
```

---

## ⚠️ Important Notes

### For Development:
- ✅ Safe to use `database-reset.sql` anytime
- ✅ Seed data is designed for testing
- ✅ UUIDs are hardcoded for consistency

### For Production:
- 🔴 NEVER use `database-drop-all.sql`
- 🔴 NEVER use `database-reset.sql`
- ✅ Create proper migration scripts instead
- ✅ Backup data before schema changes

### Supabase Specific:
- RLS policies are included in `database-schema.sql`
- Auth tables (`auth.users`) are managed by Supabase
- Admin emails configured via environment variables
- Foreign keys to `auth.users` require Supabase Auth setup

---

## 🛠️ Troubleshooting

### "relation does not exist"
You need to create the schema first:
```bash
psql -f database-schema.sql
```

### "duplicate key value violates unique constraint"
Data already exists. Either:
1. Drop tables first: `psql -f database-drop-all.sql`
2. Or modify seed data to use different UUIDs

### "permission denied"
You need database owner permissions:
```bash
psql -U postgres  # Use postgres user
```

### In Supabase Dashboard
If SQL Editor shows errors:
1. Run statements one section at a time
2. Check for partial execution
3. Use `database-drop-all.sql` to start fresh

---

## 📋 Quick Command Reference

```bash
# psql connection string for Supabase
psql "postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres"

# Common commands
\dt                    # List tables
\d table_name         # Describe table
\df                   # List functions
\dv                   # List views

# Exit psql
\q

# Run SQL file
\i database-schema.sql

# Export data
\copy orders TO 'orders.csv' CSV HEADER;

# Import data
\copy orders FROM 'orders.csv' CSV HEADER;
```

---

## 🔄 Recommended Workflow

### Local Development:
1. `database-reset.sql` - Start fresh
2. Make changes
3. Test
4. Repeat as needed

### Staging/Production:
1. Create migration script
2. Test on staging
3. Backup production
4. Apply migration
5. Verify

---

## 📞 Need Help?

- Check `SCHEMA_COMPARISON.md` for schema details
- Check `DATABASE_SCHEMA.md` for table documentation
- Check `ADMIN_SETUP.md` for admin user setup

---

## Example: Complete Fresh Install

```bash
# 1. Drop everything (if exists)
psql -h db.xxx.supabase.co -U postgres -d postgres -f database-drop-all.sql

# 2. Create schema
psql -h db.xxx.supabase.co -U postgres -d postgres -f database-schema.sql

# 3. Load test data
psql -h db.xxx.supabase.co -U postgres -d postgres -f database-seed-data.sql

# 4. Verify
psql -h db.xxx.supabase.co -U postgres -d postgres -c "SELECT COUNT(*) FROM orders;"

# Should return: 14
```

---

**Last Updated**: 2026-01-07

✨ Your database is now ready to use!
