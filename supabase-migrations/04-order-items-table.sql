-- Create order_items table for detailed order line items (future enhancement)
-- This allows for multiple items per order and better inventory tracking
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  item_type TEXT NOT NULL, -- 'cake', 'cupcake', 'cookie', 'dessert'
  item_name TEXT,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2),
  total_price DECIMAL(10,2),
  customizations JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create updated_at trigger for order_items
CREATE TRIGGER update_order_items_updated_at
  BEFORE UPDATE ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Users can view their own order items
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- Admins can view all order items
CREATE POLICY "Admins can view all order items" ON order_items
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Admins can insert order items
CREATE POLICY "Admins can insert order items" ON order_items
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Admins can update order items
CREATE POLICY "Admins can update order items" ON order_items
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Admins can delete order items
CREATE POLICY "Admins can delete order items" ON order_items
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_item_type ON order_items(item_type);

-- Add comments for documentation
COMMENT ON TABLE order_items IS 'Line items for orders, allowing multiple items per order';
COMMENT ON COLUMN order_items.order_id IS 'Reference to the parent order';
COMMENT ON COLUMN order_items.customizations IS 'JSON object with flavor, frosting, filling, decorations, etc.';
