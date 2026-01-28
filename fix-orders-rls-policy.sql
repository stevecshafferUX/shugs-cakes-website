-- Fix RLS policies for orders table
-- This fixes the error with auth.users table queries in RLS policies
-- RLS policies cannot directly query auth.users - they can only use auth.uid()

-- Drop all existing problematic policies
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update all orders" ON orders;

-- Recreate policies without auth.users queries

-- Allow users to view their own orders (by user_id)
-- Also allow viewing guest orders (user_id IS NULL) so .select() works after INSERT
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    auth.uid() = user_id OR
    user_id IS NULL
  );

-- Allow specific admin user to view all orders
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    auth.uid() = '87def3ce-a812-4c00-885f-a6904172df6a'::uuid
  );

-- Allow specific admin user to update all orders
CREATE POLICY "Admins can update all orders" ON orders
  FOR UPDATE USING (
    auth.uid() = '87def3ce-a812-4c00-885f-a6904172df6a'::uuid
  );
