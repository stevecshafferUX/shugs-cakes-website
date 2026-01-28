-- ============================================================================
-- Shug's Cakes Database - DROP ALL TABLES
-- ⚠️ WARNING: This will delete ALL data and tables!
-- Use this to completely reset your database
-- ============================================================================

-- ============================================================================
-- SAFETY CHECK
-- ============================================================================
-- Uncomment the following line to confirm you want to drop everything:
-- DO $$ BEGIN RAISE NOTICE 'DROPPING ALL TABLES - THIS WILL DELETE ALL DATA!'; END $$;

-- ============================================================================
-- DROP VIEWS FIRST
-- ============================================================================
DROP VIEW IF EXISTS customer_stats CASCADE;
DROP VIEW IF EXISTS order_summary CASCADE;

-- ============================================================================
-- DROP TRIGGERS
-- ============================================================================
DROP TRIGGER IF EXISTS track_order_status_changes ON orders;
DROP TRIGGER IF EXISTS set_order_number ON orders;
DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
DROP TRIGGER IF EXISTS update_coupons_updated_at ON coupons;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

-- ============================================================================
-- DROP FUNCTIONS
-- ============================================================================
DROP FUNCTION IF EXISTS log_order_status_change() CASCADE;
DROP FUNCTION IF EXISTS generate_order_number() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ============================================================================
-- DROP SEQUENCES
-- ============================================================================
DROP SEQUENCE IF EXISTS order_number_seq CASCADE;

-- ============================================================================
-- DROP TABLES (in order to respect foreign key constraints)
-- ============================================================================

-- Drop tables with foreign keys first
DROP TABLE IF EXISTS coupon_usage CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS order_history CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- Drop reference tables
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Drop lookup tables
DROP TABLE IF EXISTS flavors CASCADE;
DROP TABLE IF EXISTS cake_types CASCADE;
DROP TABLE IF EXISTS product_categories CASCADE;

-- Drop customer and settings tables
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- ============================================================================
-- OPTIONAL: Drop the UUID extension
-- ============================================================================
-- Uncomment if you want to remove the UUID extension as well:
-- DROP EXTENSION IF EXISTS "uuid-ossp";

-- ============================================================================
-- VERIFICATION
-- ============================================================================
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    -- Count remaining tables (excluding system tables)
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE';

    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Database cleanup complete!';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Remaining tables in public schema: %', table_count;

    IF table_count = 0 THEN
        RAISE NOTICE 'All tables successfully dropped.';
        RAISE NOTICE 'You can now run database-schema.sql to recreate tables.';
    ELSE
        RAISE NOTICE 'Some tables still remain. They may be system tables.';
    END IF;

    RAISE NOTICE '==================================================';
END $$;
