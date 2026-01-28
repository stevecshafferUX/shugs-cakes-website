-- Script to update admin email in all RLS policies
-- Run this if you've already created tables with a different admin email
-- and need to change it to a new one

-- INSTRUCTIONS:
-- 1. Replace 'NEW_ADMIN_EMAIL@gmail.com' with your actual admin email
-- 2. Run this script in Supabase SQL Editor
-- 3. This will recreate all admin policies with the new email

-- Set your new admin email here
DO $$
DECLARE
  new_admin_email TEXT := 'NEW_ADMIN_EMAIL@gmail.com'; -- CHANGE THIS!
BEGIN

  -- ==========================================
  -- PROMOTIONS TABLE POLICIES
  -- ==========================================

  DROP POLICY IF EXISTS "Admins can view all promotions" ON promotions;
  EXECUTE format('CREATE POLICY "Admins can view all promotions" ON promotions
    FOR SELECT USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can insert promotions" ON promotions;
  EXECUTE format('CREATE POLICY "Admins can insert promotions" ON promotions
    FOR INSERT WITH CHECK (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can update promotions" ON promotions;
  EXECUTE format('CREATE POLICY "Admins can update promotions" ON promotions
    FOR UPDATE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can delete promotions" ON promotions;
  EXECUTE format('CREATE POLICY "Admins can delete promotions" ON promotions
    FOR DELETE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  -- ==========================================
  -- GALLERY_IMAGES TABLE POLICIES
  -- ==========================================

  DROP POLICY IF EXISTS "Admins can view all gallery images" ON gallery_images;
  EXECUTE format('CREATE POLICY "Admins can view all gallery images" ON gallery_images
    FOR SELECT USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can insert gallery images" ON gallery_images;
  EXECUTE format('CREATE POLICY "Admins can insert gallery images" ON gallery_images
    FOR INSERT WITH CHECK (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can update gallery images" ON gallery_images;
  EXECUTE format('CREATE POLICY "Admins can update gallery images" ON gallery_images
    FOR UPDATE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can delete gallery images" ON gallery_images;
  EXECUTE format('CREATE POLICY "Admins can delete gallery images" ON gallery_images
    FOR DELETE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  -- ==========================================
  -- ORDER_ITEMS TABLE POLICIES
  -- ==========================================

  DROP POLICY IF EXISTS "Admins can view all order items" ON order_items;
  EXECUTE format('CREATE POLICY "Admins can view all order items" ON order_items
    FOR SELECT USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can insert order items" ON order_items;
  EXECUTE format('CREATE POLICY "Admins can insert order items" ON order_items
    FOR INSERT WITH CHECK (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can update order items" ON order_items;
  EXECUTE format('CREATE POLICY "Admins can update order items" ON order_items
    FOR UPDATE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can delete order items" ON order_items;
  EXECUTE format('CREATE POLICY "Admins can delete order items" ON order_items
    FOR DELETE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  -- ==========================================
  -- CONTACT_MESSAGES TABLE POLICIES
  -- ==========================================

  DROP POLICY IF EXISTS "Admins can view all contact messages" ON contact_messages;
  EXECUTE format('CREATE POLICY "Admins can view all contact messages" ON contact_messages
    FOR SELECT USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can update contact messages" ON contact_messages;
  EXECUTE format('CREATE POLICY "Admins can update contact messages" ON contact_messages
    FOR UPDATE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can delete contact messages" ON contact_messages;
  EXECUTE format('CREATE POLICY "Admins can delete contact messages" ON contact_messages
    FOR DELETE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  -- ==========================================
  -- PROMO_USAGE TABLE POLICIES
  -- ==========================================

  DROP POLICY IF EXISTS "Admins can view all promo usage" ON promo_usage;
  EXECUTE format('CREATE POLICY "Admins can view all promo usage" ON promo_usage
    FOR SELECT USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can delete promo usage" ON promo_usage;
  EXECUTE format('CREATE POLICY "Admins can delete promo usage" ON promo_usage
    FOR DELETE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  -- ==========================================
  -- REVIEWS TABLE POLICIES
  -- ==========================================

  DROP POLICY IF EXISTS "Admins can view all reviews" ON reviews;
  EXECUTE format('CREATE POLICY "Admins can view all reviews" ON reviews
    FOR SELECT USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can update reviews" ON reviews;
  EXECUTE format('CREATE POLICY "Admins can update reviews" ON reviews
    FOR UPDATE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can delete reviews" ON reviews;
  EXECUTE format('CREATE POLICY "Admins can delete reviews" ON reviews
    FOR DELETE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  -- ==========================================
  -- SITE_SETTINGS TABLE POLICIES
  -- ==========================================

  DROP POLICY IF EXISTS "Admins can view all settings" ON site_settings;
  EXECUTE format('CREATE POLICY "Admins can view all settings" ON site_settings
    FOR SELECT USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can insert settings" ON site_settings;
  EXECUTE format('CREATE POLICY "Admins can insert settings" ON site_settings
    FOR INSERT WITH CHECK (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can update settings" ON site_settings;
  EXECUTE format('CREATE POLICY "Admins can update settings" ON site_settings
    FOR UPDATE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can delete settings" ON site_settings;
  EXECUTE format('CREATE POLICY "Admins can delete settings" ON site_settings
    FOR DELETE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  -- ==========================================
  -- ORDER_HISTORY TABLE POLICIES
  -- ==========================================

  DROP POLICY IF EXISTS "Admins can view all order history" ON order_history;
  EXECUTE format('CREATE POLICY "Admins can view all order history" ON order_history
    FOR SELECT USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can insert order history" ON order_history;
  EXECUTE format('CREATE POLICY "Admins can insert order history" ON order_history
    FOR INSERT WITH CHECK (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  -- ==========================================
  -- ORDERS TABLE POLICIES (if exists)
  -- ==========================================

  DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
  EXECUTE format('CREATE POLICY "Admins can view all orders" ON orders
    FOR SELECT USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  DROP POLICY IF EXISTS "Admins can update all orders" ON orders;
  EXECUTE format('CREATE POLICY "Admins can update all orders" ON orders
    FOR UPDATE USING (
      auth.uid() IN (
        SELECT id FROM auth.users WHERE email = %L
      )
    )', new_admin_email);

  RAISE NOTICE 'Successfully updated admin email to: %', new_admin_email;
  RAISE NOTICE 'All RLS policies have been recreated with the new admin email.';
  RAISE NOTICE 'IMPORTANT: Also update src/lib/adminCheck.js with the same email!';

END $$;

-- Verify the changes by listing all policies
SELECT
  schemaname,
  tablename,
  policyname,
  'Admin email updated' as status
FROM pg_policies
WHERE schemaname = 'public'
  AND policyname LIKE '%Admin%'
ORDER BY tablename, policyname;
