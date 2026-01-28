-- Test Script for Order Submission
-- This script verifies that the orders table is set up correctly
-- and tests the RLS policies for order submission

-- ========================================
-- PART 1: Verify Table Exists
-- ========================================

SELECT
  'Orders table exists: ' ||
  CASE
    WHEN EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'orders'
    ) THEN '✅ YES'
    ELSE '❌ NO - Run migration 01-orders-table.sql first!'
  END as status;

-- ========================================
-- PART 2: Verify Table Structure
-- ========================================

SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;

-- ========================================
-- PART 3: Verify RLS Policies
-- ========================================

SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY policyname;

-- Expected policies:
-- 1. "Anyone can insert orders" - FOR INSERT - allows public inserts
-- 2. "Users can view own orders" - FOR SELECT - user can see their orders
-- 3. "Admins can view all orders" - FOR SELECT - admin can see all orders
-- 4. "Admins can update all orders" - FOR UPDATE - admin can update orders

-- ========================================
-- PART 4: Verify Indexes
-- ========================================

SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'orders'
ORDER BY indexname;

-- ========================================
-- PART 5: Test Insert (Anonymous User)
-- ========================================

-- This simulates what happens when a non-authenticated user submits an order
-- through the order form. The RLS policy "Anyone can insert orders" should allow this.

DO $$
DECLARE
  test_order_id UUID;
BEGIN
  -- Insert a test order
  INSERT INTO orders (
    user_id,
    customer_name,
    customer_email,
    customer_phone,
    contact_methods,
    theme,
    due_date,
    pickup_time,
    servings,
    cost,
    order_type,
    cake_type,
    details,
    design,
    status
  ) VALUES (
    NULL, -- No user_id for anonymous orders
    'Test Customer',
    'test@example.com',
    '555-1234',
    '{"email": true, "facebook": false, "wix": false}'::jsonb,
    'Birthday Party',
    CURRENT_DATE + INTERVAL '7 days',
    '14:00:00',
    24,
    75.00,
    '{"cake": true, "cupcake": false, "cookies": false, "desserts": false}'::jsonb,
    '{"round": true, "sheet": false, "tiered": false}'::jsonb,
    'Chocolate cake with vanilla frosting',
    'Blue and white colors, "Happy Birthday" text',
    'pending'
  )
  RETURNING id INTO test_order_id;

  RAISE NOTICE '✅ Test order created successfully with ID: %', test_order_id;

  -- Verify the order was inserted
  IF EXISTS (SELECT 1 FROM orders WHERE id = test_order_id) THEN
    RAISE NOTICE '✅ Test order verified in database';
  ELSE
    RAISE NOTICE '❌ Test order not found in database';
  END IF;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE '❌ Error inserting test order: %', SQLERRM;
    RAISE NOTICE 'Error Code: %', SQLSTATE;
    RAISE NOTICE '';
    RAISE NOTICE 'Common causes:';
    RAISE NOTICE '1. Orders table does not exist - Run migration 01-orders-table.sql';
    RAISE NOTICE '2. RLS policy "Anyone can insert orders" is missing';
    RAISE NOTICE '3. Column name mismatch or data type issue';
END $$;

-- ========================================
-- PART 6: View Recent Orders
-- ========================================

SELECT
  id,
  created_at,
  customer_name,
  customer_email,
  customer_phone,
  theme,
  due_date,
  status,
  cost
FROM orders
ORDER BY created_at DESC
LIMIT 5;

-- ========================================
-- PART 7: Count Orders by Status
-- ========================================

SELECT
  status,
  COUNT(*) as count
FROM orders
GROUP BY status
ORDER BY status;

-- ========================================
-- PART 8: Clean Up Test Data (Optional)
-- ========================================

-- Uncomment the following lines to delete test orders
-- WARNING: This will delete ALL orders with email 'test@example.com'

-- DELETE FROM orders
-- WHERE customer_email = 'test@example.com';
--
-- SELECT 'Test orders cleaned up' as status;

-- ========================================
-- PART 9: Quick Diagnostic Summary
-- ========================================

SELECT
  '=== DIAGNOSTIC SUMMARY ===' as section
UNION ALL
SELECT
  'Table exists: ' ||
  CASE
    WHEN EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'orders'
    ) THEN '✅'
    ELSE '❌'
  END
UNION ALL
SELECT
  'RLS enabled: ' ||
  CASE
    WHEN (
      SELECT relrowsecurity
      FROM pg_class
      WHERE relname = 'orders' AND relnamespace = 'public'::regnamespace
    ) THEN '✅'
    ELSE '❌'
  END
UNION ALL
SELECT
  'Insert policy exists: ' ||
  CASE
    WHEN EXISTS (
      SELECT FROM pg_policies
      WHERE tablename = 'orders' AND policyname = 'Anyone can insert orders'
    ) THEN '✅'
    ELSE '❌'
  END
UNION ALL
SELECT
  'Admin policy exists: ' ||
  CASE
    WHEN EXISTS (
      SELECT FROM pg_policies
      WHERE tablename = 'orders' AND policyname = 'Admins can view all orders'
    ) THEN '✅'
    ELSE '❌'
  END
UNION ALL
SELECT
  'Total orders: ' || COUNT(*)::text
FROM orders;

-- ========================================
-- INSTRUCTIONS
-- ========================================

/*
HOW TO USE THIS TEST SCRIPT:

1. Open Supabase Dashboard → SQL Editor
2. Click "+ New query"
3. Paste this entire script
4. Click "Run"

WHAT TO EXPECT:

✅ If everything is set up correctly:
   - You'll see "Orders table exists: ✅ YES"
   - Table structure will be displayed
   - RLS policies will be listed (should see 4 policies)
   - Test order will insert successfully
   - Diagnostic summary will show all ✅

❌ If there are issues:
   - Error messages will indicate what's missing
   - Follow the suggestions in the error messages
   - Most likely: Run migration 01-orders-table.sql first

TROUBLESHOOTING:

Issue: "Orders table exists: ❌ NO"
Fix: Run supabase-migrations/01-orders-table.sql

Issue: "Error inserting test order"
Fix: Check that RLS policy "Anyone can insert orders" exists

Issue: No policies shown
Fix: Re-run the migration file to create RLS policies

Issue: "permission denied for table orders"
Fix: Verify RLS is enabled and policies are correct

CLEANUP:

To remove test data, uncomment the DELETE statement in PART 8
*/
