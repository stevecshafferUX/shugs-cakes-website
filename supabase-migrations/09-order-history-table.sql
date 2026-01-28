-- Create order_history table for tracking order status changes and updates
CREATE TABLE IF NOT EXISTS order_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  change_type TEXT NOT NULL CHECK (change_type IN ('status_change', 'details_updated', 'price_updated', 'note_added', 'email_sent')),
  old_value JSONB,
  new_value JSONB,
  notes TEXT,
  ip_address TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE order_history ENABLE ROW LEVEL SECURITY;

-- Users can view history for their own orders
CREATE POLICY "Users can view own order history" ON order_history
  FOR SELECT USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- Admins can view all order history
CREATE POLICY "Admins can view all order history" ON order_history
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- System and admins can insert order history
CREATE POLICY "Admins can insert order history" ON order_history
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_order_history_order_id ON order_history(order_id);
CREATE INDEX idx_order_history_change_type ON order_history(change_type);
CREATE INDEX idx_order_history_created_at ON order_history(created_at DESC);

-- Function to automatically log order status changes
CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO order_history (order_id, changed_by, change_type, old_value, new_value)
    VALUES (
      NEW.id,
      auth.uid(),
      'status_change',
      jsonb_build_object('status', OLD.status),
      jsonb_build_object('status', NEW.status)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically log status changes
CREATE TRIGGER log_order_status_change_trigger
  AFTER UPDATE ON orders
  FOR EACH ROW
  WHEN (NEW.status IS DISTINCT FROM OLD.status)
  EXECUTE FUNCTION log_order_status_change();

-- Add comments for documentation
COMMENT ON TABLE order_history IS 'Audit log of all changes made to orders';
COMMENT ON COLUMN order_history.change_type IS 'Type of change made to the order';
COMMENT ON COLUMN order_history.old_value IS 'Previous value before the change';
COMMENT ON COLUMN order_history.new_value IS 'New value after the change';
