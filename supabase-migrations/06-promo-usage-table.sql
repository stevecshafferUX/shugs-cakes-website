-- Create promo_usage table for tracking promotional code usage
CREATE TABLE IF NOT EXISTS promo_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  promo_id UUID REFERENCES promotions(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id),
  customer_email TEXT NOT NULL,
  discount_applied DECIMAL(10,2) NOT NULL,
  original_amount DECIMAL(10,2),
  final_amount DECIMAL(10,2),
  used_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE promo_usage ENABLE ROW LEVEL SECURITY;

-- Users can view their own promo usage
CREATE POLICY "Users can view own promo usage" ON promo_usage
  FOR SELECT USING (
    auth.uid() = user_id OR
    customer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Admins can view all promo usage
CREATE POLICY "Admins can view all promo usage" ON promo_usage
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- System can insert promo usage (when orders are placed)
CREATE POLICY "Anyone can insert promo usage" ON promo_usage
  FOR INSERT WITH CHECK (true);

-- Admins can delete promo usage records
CREATE POLICY "Admins can delete promo usage" ON promo_usage
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_promo_usage_promo_id ON promo_usage(promo_id);
CREATE INDEX idx_promo_usage_order_id ON promo_usage(order_id);
CREATE INDEX idx_promo_usage_customer_email ON promo_usage(customer_email);
CREATE INDEX idx_promo_usage_used_at ON promo_usage(used_at DESC);

-- Function to automatically increment promo current_uses when usage is recorded
CREATE OR REPLACE FUNCTION increment_promo_usage()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE promotions
  SET current_uses = current_uses + 1
  WHERE id = NEW.promo_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increment usage counter
CREATE TRIGGER increment_promo_usage_trigger
  AFTER INSERT ON promo_usage
  FOR EACH ROW
  EXECUTE FUNCTION increment_promo_usage();

-- Add comments for documentation
COMMENT ON TABLE promo_usage IS 'Tracks each use of promotional codes with discount details';
COMMENT ON COLUMN promo_usage.discount_applied IS 'Amount of discount given (dollar value)';
COMMENT ON COLUMN promo_usage.original_amount IS 'Order total before discount';
COMMENT ON COLUMN promo_usage.final_amount IS 'Order total after discount';
