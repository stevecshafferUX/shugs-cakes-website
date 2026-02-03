-- Add image_urls column to orders table for customer-uploaded reference images
ALTER TABLE orders ADD COLUMN IF NOT EXISTS image_urls JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN orders.image_urls IS 'Array of public Storage URLs for customer-uploaded reference images';

-- Create the storage bucket (anyone can upload; URLs are publicly readable)
INSERT INTO storage.buckets (id, name, public)
VALUES ('order-images', 'order-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: anyone (including anonymous) can upload into order-images
CREATE POLICY "Anyone can upload order images"
  ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'order-images');

-- Policy: anyone can read (bucket is public, but explicit policy required by some setups)
CREATE POLICY "Anyone can read order images"
  ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'order-images');
