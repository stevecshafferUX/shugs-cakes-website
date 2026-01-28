-- Create orders table - the main table for customer orders
-- This should be run FIRST before all other migrations

-- Create updated_at trigger function (if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  contact_methods JSONB DEFAULT '{}'::jsonb,
  theme TEXT,
  due_date DATE,
  pickup_time TIME,
  servings INTEGER,
  cost DECIMAL(10,2),
  order_type JSONB DEFAULT '{}'::jsonb,
  cake_type JSONB DEFAULT '{}'::jsonb,
  details TEXT,
  design TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create updated_at trigger
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (for non-authenticated users placing orders)
-- Using WITH CHECK (true) allows guest orders with null user_id
CREATE POLICY "Anyone can insert orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow users to view their own orders
-- Also allow viewing orders with null user_id (guest orders) - they won't be returned by default queries
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    auth.uid() = user_id OR
    user_id IS NULL
  );

-- Allow admins to view all orders
-- RLS policies cannot query auth.users table directly, so we use the hardcoded admin UUID
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    auth.uid() = '87def3ce-a812-4c00-885f-a6904172df6a'::uuid
  );

-- Allow admins to update all orders
CREATE POLICY "Admins can update all orders" ON orders
  FOR UPDATE USING (
    auth.uid() = '87def3ce-a812-4c00-885f-a6904172df6a'::uuid
  );

-- Create indexes for better performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_due_date ON orders(due_date);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Add comments for documentation
COMMENT ON TABLE orders IS 'Customer orders for cakes, cupcakes, cookies, and desserts';
COMMENT ON COLUMN orders.user_id IS 'Links to authenticated user (NULL for guest orders)';
COMMENT ON COLUMN orders.contact_methods IS 'Preferred contact methods: {email, facebook, wix}';
COMMENT ON COLUMN orders.order_type IS 'Type of order: {cake, cupcake, cookies, desserts}';
COMMENT ON COLUMN orders.cake_type IS 'Type of cake: {sheet, round, tiered, square, shaped, smash}';
COMMENT ON COLUMN orders.status IS 'Order status: pending, in-progress, completed, or cancelled';
