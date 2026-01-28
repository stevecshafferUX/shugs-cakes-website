-- Create promotions table
CREATE TABLE IF NOT EXISTS promotions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  description TEXT,
  valid_from DATE DEFAULT CURRENT_DATE,
  valid_until DATE NOT NULL,
  active BOOLEAN DEFAULT true,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create updated_at trigger for promotions
CREATE TRIGGER update_promotions_updated_at
  BEFORE UPDATE ON promotions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active promotions (for applying codes in order form)
CREATE POLICY "Anyone can view active promotions" ON promotions
  FOR SELECT USING (active = true AND valid_until >= CURRENT_DATE);

-- Allow admins to view all promotions
CREATE POLICY "Admins can view all promotions" ON promotions
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Allow admins to insert promotions
CREATE POLICY "Admins can insert promotions" ON promotions
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Allow admins to update promotions
CREATE POLICY "Admins can update promotions" ON promotions
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Allow admins to delete promotions
CREATE POLICY "Admins can delete promotions" ON promotions
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Create index for faster code lookups
CREATE INDEX idx_promotions_code ON promotions(code);
CREATE INDEX idx_promotions_active ON promotions(active, valid_until);
