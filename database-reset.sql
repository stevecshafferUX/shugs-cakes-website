-- ============================================================================
-- Shug's Cakes Database - COMPLETE RESET
-- ⚠️ WARNING: This will DELETE ALL DATA and recreate fresh tables!
-- ============================================================================

-- This script will:
-- 1. Drop all existing tables, views, triggers, and functions
-- 2. Recreate the schema from scratch
-- 3. Optionally load seed data

-- ============================================================================
-- STEP 1: DROP EVERYTHING
-- ============================================================================

\echo '===================================================='
\echo 'STEP 1: Dropping all existing tables...'
\echo '===================================================='

-- Drop views
DROP VIEW IF EXISTS customer_stats CASCADE;
DROP VIEW IF EXISTS order_summary CASCADE;

-- Drop triggers
DROP TRIGGER IF EXISTS track_order_status_changes ON orders;
DROP TRIGGER IF EXISTS set_order_number ON orders;
DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
DROP TRIGGER IF EXISTS update_coupons_updated_at ON coupons;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

-- Drop functions
DROP FUNCTION IF EXISTS log_order_status_change() CASCADE;
DROP FUNCTION IF EXISTS generate_order_number() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Drop sequences
DROP SEQUENCE IF EXISTS order_number_seq CASCADE;

-- Drop tables (in correct order)
DROP TABLE IF EXISTS coupon_usage CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS order_history CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS flavors CASCADE;
DROP TABLE IF EXISTS cake_types CASCADE;
DROP TABLE IF EXISTS product_categories CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

\echo 'All tables dropped successfully.'
\echo ''

-- ============================================================================
-- STEP 2: RECREATE SCHEMA
-- ============================================================================

\echo '===================================================='
\echo 'STEP 2: Recreating database schema...'
\echo '===================================================='

-- Run the schema creation script
\i database-schema.sql

\echo ''
\echo 'Schema recreated successfully.'
\echo ''

-- ============================================================================
-- STEP 3: LOAD SEED DATA (OPTIONAL)
-- ============================================================================

\echo '===================================================='
\echo 'STEP 3: Loading seed data...'
\echo '===================================================='
\echo 'Uncomment the line below to load seed data:'
\echo '-- \i database-seed-data.sql'
\echo ''

-- Uncomment to load seed data:
-- \i database-seed-data.sql

-- ============================================================================
-- COMPLETION
-- ============================================================================

\echo '===================================================='
\echo 'Database reset complete!'
\echo '===================================================='
\echo 'Next steps:'
\echo '1. If you did not load seed data, uncomment the line above and re-run'
\echo '2. Or manually load data as needed'
\echo '3. Set up admin users in Supabase Auth'
\echo '===================================================='
