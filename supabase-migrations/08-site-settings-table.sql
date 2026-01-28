-- Create site_settings table for configurable site-wide settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  setting_type TEXT NOT NULL CHECK (setting_type IN ('text', 'number', 'boolean', 'json', 'array')),
  description TEXT,
  category TEXT DEFAULT 'general',
  is_public BOOLEAN DEFAULT false,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create updated_at trigger for site_settings
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view public settings
CREATE POLICY "Anyone can view public settings" ON site_settings
  FOR SELECT USING (is_public = true);

-- Admins can view all settings
CREATE POLICY "Admins can view all settings" ON site_settings
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Admins can insert settings
CREATE POLICY "Admins can insert settings" ON site_settings
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Admins can update settings
CREATE POLICY "Admins can update settings" ON site_settings
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Admins can delete settings
CREATE POLICY "Admins can delete settings" ON site_settings
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_site_settings_key ON site_settings(setting_key);
CREATE INDEX idx_site_settings_category ON site_settings(category);
CREATE INDEX idx_site_settings_public ON site_settings(is_public);

-- Insert default settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, description, category, is_public) VALUES
  ('business_name', '"Shug''s Cakes"', 'text', 'Business name displayed on the site', 'general', true),
  ('business_phone', '"(317) 555-0123"', 'text', 'Primary business phone number', 'contact', true),
  ('business_email', '"info@shugscakes.com"', 'text', 'Primary business email', 'contact', true),
  ('business_address', '{"street": "123 Main St", "city": "Indianapolis", "state": "IN", "zip": "46201"}', 'json', 'Business physical address', 'contact', true),
  ('business_hours', '{"monday": "9am-5pm", "tuesday": "9am-5pm", "wednesday": "9am-5pm", "thursday": "9am-5pm", "friday": "9am-5pm", "saturday": "10am-4pm", "sunday": "Closed"}', 'json', 'Business operating hours', 'general', true),
  ('social_media', '{"facebook": "https://facebook.com/shugscakes", "instagram": "https://instagram.com/shugscakes"}', 'json', 'Social media links', 'general', true),
  ('accepting_orders', 'true', 'boolean', 'Whether the site is accepting new orders', 'orders', true),
  ('min_order_notice_days', '7', 'number', 'Minimum days notice required for orders', 'orders', true),
  ('max_advance_order_days', '90', 'number', 'Maximum days in advance orders can be placed', 'orders', true),
  ('featured_review_ids', '[]', 'array', 'Array of review IDs to feature on homepage', 'content', false),
  ('homepage_banner_text', '"Custom Cakes Made with Love"', 'text', 'Hero banner text on homepage', 'content', true),
  ('order_confirmation_message', '"Thank you for your order! We will contact you within 24 hours to confirm details."', 'text', 'Message shown after order submission', 'orders', true),
  ('maintenance_mode', 'false', 'boolean', 'Put site in maintenance mode', 'general', false),
  ('notification_emails', '["admin@shugscakes.com"]', 'array', 'Email addresses to receive order notifications', 'notifications', false)
ON CONFLICT (setting_key) DO NOTHING;

-- Add comments for documentation
COMMENT ON TABLE site_settings IS 'Configurable site-wide settings and preferences';
COMMENT ON COLUMN site_settings.setting_key IS 'Unique identifier for the setting (snake_case)';
COMMENT ON COLUMN site_settings.setting_value IS 'JSON value of the setting';
COMMENT ON COLUMN site_settings.setting_type IS 'Data type of the setting for validation';
COMMENT ON COLUMN site_settings.is_public IS 'Whether this setting can be viewed by non-authenticated users';
