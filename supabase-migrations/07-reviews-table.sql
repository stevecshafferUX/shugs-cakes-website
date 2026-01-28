-- Create reviews table for customer reviews and testimonials
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  review_text TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'featured')),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  display_on_site BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  admin_response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create updated_at trigger for reviews
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert reviews
CREATE POLICY "Authenticated users can insert reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Users can view their own reviews
CREATE POLICY "Users can view own reviews" ON reviews
  FOR SELECT USING (
    auth.uid() = user_id OR
    customer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Anyone can view approved reviews that are set to display
CREATE POLICY "Anyone can view approved reviews" ON reviews
  FOR SELECT USING (
    status = 'approved' AND display_on_site = true
  );

-- Admins can view all reviews
CREATE POLICY "Admins can view all reviews" ON reviews
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Admins can update reviews
CREATE POLICY "Admins can update reviews" ON reviews
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Admins can delete reviews
CREATE POLICY "Admins can delete reviews" ON reviews
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_featured ON reviews(featured);
CREATE INDEX idx_reviews_display_on_site ON reviews(display_on_site);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_reviews_order_id ON reviews(order_id);

-- Add comments for documentation
COMMENT ON TABLE reviews IS 'Customer reviews and testimonials for completed orders';
COMMENT ON COLUMN reviews.rating IS 'Rating from 1 to 5 stars';
COMMENT ON COLUMN reviews.status IS 'Review moderation status';
COMMENT ON COLUMN reviews.display_on_site IS 'Whether to show this review on the public website';
COMMENT ON COLUMN reviews.featured IS 'Mark as featured review for homepage';
COMMENT ON COLUMN reviews.images IS 'Array of image URLs uploaded with the review';
