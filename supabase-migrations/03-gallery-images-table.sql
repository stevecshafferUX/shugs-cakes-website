-- Create gallery_images table for storing cake photos
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  uploaded_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create updated_at trigger for gallery_images
CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active gallery images (for public gallery)
CREATE POLICY "Anyone can view active gallery images" ON gallery_images
  FOR SELECT USING (active = true);

-- Allow admins to view all gallery images
CREATE POLICY "Admins can view all gallery images" ON gallery_images
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Allow admins to insert gallery images
CREATE POLICY "Admins can insert gallery images" ON gallery_images
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Allow admins to update gallery images
CREATE POLICY "Admins can update gallery images" ON gallery_images
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Allow admins to delete gallery images
CREATE POLICY "Admins can delete gallery images" ON gallery_images
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_gallery_images_category ON gallery_images(category);
CREATE INDEX idx_gallery_images_active ON gallery_images(active);
CREATE INDEX idx_gallery_images_display_order ON gallery_images(display_order);

-- Add comments for documentation
COMMENT ON TABLE gallery_images IS 'Stores gallery images for the cake gallery organized by category';
COMMENT ON COLUMN gallery_images.category IS 'Gallery category (birthday, wedding, baby-shower, etc.)';
COMMENT ON COLUMN gallery_images.image_url IS 'Full-size image URL from Supabase Storage';
COMMENT ON COLUMN gallery_images.thumbnail_url IS 'Thumbnail image URL for performance';
COMMENT ON COLUMN gallery_images.display_order IS 'Order for displaying images (lower numbers first)';
COMMENT ON COLUMN gallery_images.metadata IS 'Additional metadata (dimensions, file size, etc.)';
