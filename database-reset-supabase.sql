-- ============================================================================
-- Shug's Cakes Database - COMPLETE RESET (Supabase SQL Editor Compatible)
-- WARNING: This will DELETE ALL DATA and recreate fresh tables!
-- Paste this entire script into the Supabase SQL Editor and run it.
-- ============================================================================


-- ============================================================================
-- STEP 1: DROP EVERYTHING
-- ============================================================================

-- Drop views
DROP VIEW IF EXISTS customer_stats CASCADE;
DROP VIEW IF EXISTS order_summary CASCADE;

-- Drop triggers
DROP TRIGGER IF EXISTS track_order_status_changes ON orders;
DROP TRIGGER IF EXISTS set_order_number ON orders;
DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
DROP TRIGGER IF EXISTS update_coupons_updated_at ON coupons;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

-- Drop functions
DROP FUNCTION IF EXISTS log_order_status_change() CASCADE;
DROP FUNCTION IF EXISTS generate_order_number() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Drop sequences
DROP SEQUENCE IF EXISTS order_number_seq CASCADE;

-- Drop tables (foreign key dependents first, then parents)
DROP TABLE IF EXISTS coupon_usage CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS order_history CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS flavors CASCADE;
DROP TABLE IF EXISTS cake_types CASCADE;
DROP TABLE IF EXISTS product_categories CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;


-- ============================================================================
-- STEP 2: RECREATE SCHEMA
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CUSTOMERS TABLE
-- ============================================================================
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    notes TEXT,
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_auth_user_id ON customers(auth_user_id);

-- ============================================================================
-- PRODUCT_CATEGORIES TABLE
-- ============================================================================
CREATE TABLE product_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO product_categories (name, description, display_order) VALUES
    ('Cakes', 'Custom cakes for all occasions', 1),
    ('Cupcakes', 'Delicious cupcakes in various flavors', 2),
    ('Cookies', 'Freshly baked cookies', 3),
    ('Desserts', 'Specialty desserts and treats', 4);

-- ============================================================================
-- PRODUCTS TABLE
-- ============================================================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES product_categories(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    price_per_serving DECIMAL(10, 2),
    min_servings INTEGER DEFAULT 1,
    max_servings INTEGER,
    preparation_days INTEGER DEFAULT 3,
    is_active BOOLEAN DEFAULT true,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);

-- ============================================================================
-- CAKE_TYPES TABLE
-- ============================================================================
CREATE TABLE cake_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price_modifier DECIMAL(10, 2) DEFAULT 0.00,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO cake_types (name, description, price_modifier, display_order) VALUES
    ('Sheet Cake', 'Traditional sheet cake', 0.00, 1),
    ('Round Cake', 'Layered round cake', 10.00, 2),
    ('Tiered Cake', 'Multi-tiered cake for special occasions', 50.00, 3),
    ('Square Cake', 'Square layered cake', 5.00, 4),
    ('Shaped Cake', 'Custom shaped cake', 25.00, 5),
    ('Smash Cake', 'Small cake for baby photos', -10.00, 6);

-- ============================================================================
-- FLAVORS TABLE
-- ============================================================================
CREATE TABLE flavors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price_modifier DECIMAL(10, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO flavors (name, description, price_modifier, display_order) VALUES
    ('Vanilla', 'Classic vanilla cake', 0.00, 1),
    ('Chocolate', 'Rich chocolate cake', 0.00, 2),
    ('Red Velvet', 'Southern red velvet', 5.00, 3),
    ('Marble', 'Vanilla and chocolate swirl', 0.00, 4),
    ('Carrot', 'Moist carrot cake with cream cheese frosting', 5.00, 5),
    ('Lemon', 'Fresh lemon cake', 3.00, 6),
    ('Strawberry', 'Sweet strawberry cake', 3.00, 7),
    ('Funfetti', 'Vanilla with rainbow sprinkles', 2.00, 8);

-- ============================================================================
-- COUPONS TABLE
-- ============================================================================
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),
    discount_value DECIMAL(10, 2) NOT NULL CHECK (discount_value >= 0),
    min_order_amount DECIMAL(10, 2) DEFAULT 0.00,
    max_discount_amount DECIMAL(10, 2),
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT max_uses_check CHECK (max_uses IS NULL OR max_uses > 0),
    CONSTRAINT percentage_check CHECK (
        discount_type != 'percentage' OR
        (discount_value >= 0 AND discount_value <= 100)
    )
);

CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_active ON coupons(is_active);
CREATE INDEX idx_coupons_valid_until ON coupons(valid_until);

-- ============================================================================
-- ORDERS TABLE
-- ============================================================================

-- Sequence must be created before the trigger that uses it
CREATE SEQUENCE order_number_seq START 1;

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL DEFAULT '',

    -- Contact Information
    contact_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,

    -- Order Details
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'ready', 'completed', 'cancelled')),
    order_type JSONB NOT NULL,
    cake_type JSONB,
    flavor_id UUID REFERENCES flavors(id),

    -- Pricing
    subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    tax_amount DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,

    -- Coupon
    coupon_id UUID REFERENCES coupons(id),
    coupon_code VARCHAR(50),

    -- Details
    servings INTEGER,
    delivery_date DATE NOT NULL,
    theme VARCHAR(255),
    special_requests TEXT,
    internal_notes TEXT,

    -- Legacy fields used by the frontend OrderForm
    customer_name VARCHAR(100),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    due_date DATE,
    cost DECIMAL(10, 2),
    details TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_delivery_date ON orders(delivery_date);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_order_number ON orders(order_number);

-- Generate unique order number trigger
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
    BEFORE INSERT ON orders
    FOR EACH ROW
    WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
    EXECUTE FUNCTION generate_order_number();

-- ============================================================================
-- ORDER_ITEMS TABLE
-- ============================================================================
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    cake_type_id UUID REFERENCES cake_types(id),
    flavor_id UUID REFERENCES flavors(id),

    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    servings INTEGER,

    customizations JSONB,
    notes TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT quantity_positive CHECK (quantity > 0),
    CONSTRAINT prices_positive CHECK (unit_price >= 0 AND total_price >= 0)
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ============================================================================
-- COUPON_USAGE TABLE
-- ============================================================================
CREATE TABLE coupon_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id),
    discount_applied DECIMAL(10, 2) NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(coupon_id, order_id)
);

CREATE INDEX idx_coupon_usage_coupon_id ON coupon_usage(coupon_id);
CREATE INDEX idx_coupon_usage_customer_id ON coupon_usage(customer_id);

-- ============================================================================
-- ORDER_HISTORY TABLE
-- ============================================================================
CREATE TABLE order_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    changed_by UUID REFERENCES auth.users(id),
    previous_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    notes TEXT,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_history_order_id ON order_history(order_id);
CREATE INDEX idx_order_history_changed_at ON order_history(changed_at);

-- Trigger to log status changes
CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO order_history (order_id, previous_status, new_status, changed_at)
        VALUES (NEW.id, OLD.status, NEW.status, NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_order_status_changes
    AFTER UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION log_order_status_change();

-- ============================================================================
-- GALLERY_IMAGES TABLE
-- ============================================================================
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    tags TEXT[],
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_gallery_images_category ON gallery_images(category);
CREATE INDEX idx_gallery_images_featured ON gallery_images(is_featured);

-- ============================================================================
-- CONTACT_MESSAGES TABLE
-- ============================================================================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(200) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    user_id UUID REFERENCES auth.users(id),
    replied_at TIMESTAMP WITH TIME ZONE,
    replied_by UUID REFERENCES auth.users(id),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

-- ============================================================================
-- REVIEWS TABLE
-- ============================================================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    is_approved BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reviews_approved ON reviews(is_approved);
CREATE INDEX idx_reviews_featured ON reviews(is_featured);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- ============================================================================
-- SITE_SETTINGS TABLE
-- ============================================================================
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) NOT NULL UNIQUE,
    value TEXT,
    data_type VARCHAR(50) DEFAULT 'string',
    description TEXT,
    updated_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO site_settings (key, value, data_type, description) VALUES
    ('business_name', 'Shug''s Cakes', 'string', 'Business name'),
    ('owner_name', 'Chris Shaffer', 'string', 'Owner name'),
    ('contact_phone', '317-373-8828', 'string', 'Contact phone number'),
    ('contact_email', 'shugscakes@gmail.com', 'string', 'Contact email'),
    ('location_city', 'Avon', 'string', 'Business city'),
    ('location_state', 'IN', 'string', 'Business state'),
    ('location_zip', '46123', 'string', 'Business zip code'),
    ('min_order_days', '3', 'number', 'Minimum days notice for orders'),
    ('tax_rate', '7.0', 'number', 'Sales tax rate percentage'),
    ('pickup_hours_weekday', '7:00am - 6:00pm', 'string', 'Weekday pickup hours'),
    ('pickup_hours_weekend', '7:00am - 10:00am', 'string', 'Weekend pickup hours'),
    ('facebook_url', 'https://www.facebook.com/shugscakes', 'string', 'Facebook page URL'),
    ('instagram_url', 'https://www.instagram.com/shugscakes', 'string', 'Instagram profile URL');

-- ============================================================================
-- UPDATE TRIGGERS
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Customers: view/edit own data
CREATE POLICY customers_select_own ON customers FOR SELECT USING (auth_user_id = auth.uid());
CREATE POLICY customers_update_own ON customers FOR UPDATE USING (auth_user_id = auth.uid());

-- Orders: customers see own, admins see all
CREATE POLICY orders_select_own ON orders FOR SELECT USING (
    user_id = auth.uid() OR
    auth.jwt() ->> 'email' = ANY(string_to_array(current_setting('app.admin_emails', true), ','))
);

-- Orders: anyone can insert (allows anonymous orders from the form)
CREATE POLICY orders_insert_all ON orders FOR INSERT WITH CHECK (true);

-- Orders: admins can update
CREATE POLICY orders_update_admin ON orders FOR UPDATE USING (
    auth.jwt() ->> 'email' = ANY(string_to_array(current_setting('app.admin_emails', true), ','))
);

-- Orders: admins can delete
CREATE POLICY orders_delete_admin ON orders FOR DELETE USING (
    auth.jwt() ->> 'email' = ANY(string_to_array(current_setting('app.admin_emails', true), ','))
);

-- Contact messages: anyone can insert
CREATE POLICY contact_messages_insert_all ON contact_messages FOR INSERT WITH CHECK (true);

-- Contact messages: admins can view all
CREATE POLICY contact_messages_select_admin ON contact_messages FOR SELECT USING (
    auth.jwt() ->> 'email' = ANY(string_to_array(current_setting('app.admin_emails', true), ','))
);

-- Contact messages: admins can update
CREATE POLICY contact_messages_update_admin ON contact_messages FOR UPDATE USING (
    auth.jwt() ->> 'email' = ANY(string_to_array(current_setting('app.admin_emails', true), ','))
);

-- Contact messages: admins can delete
CREATE POLICY contact_messages_delete_admin ON contact_messages FOR DELETE USING (
    auth.jwt() ->> 'email' = ANY(string_to_array(current_setting('app.admin_emails', true), ','))
);

-- Reviews: public read for approved
CREATE POLICY reviews_select_approved ON reviews FOR SELECT USING (is_approved = true);

-- Coupons: public can view active coupons
CREATE POLICY coupons_select_active ON coupons FOR SELECT USING (
    is_active = true AND
    (valid_until IS NULL OR valid_until > NOW())
);

-- Gallery images: public can view all
CREATE POLICY gallery_images_select_all ON gallery_images FOR SELECT USING (true);

-- ============================================================================
-- VIEWS
-- ============================================================================

CREATE OR REPLACE VIEW order_summary AS
SELECT
    o.id,
    o.order_number,
    o.contact_name,
    o.contact_email,
    o.contact_phone,
    o.status,
    o.total_amount,
    o.delivery_date,
    o.created_at,
    c.full_name as customer_name,
    c.email as customer_email,
    f.name as flavor_name,
    co.code as coupon_code,
    co.discount_value as coupon_discount
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
LEFT JOIN flavors f ON o.flavor_id = f.id
LEFT JOIN coupons co ON o.coupon_id = co.id;

CREATE OR REPLACE VIEW customer_stats AS
SELECT
    c.id,
    c.full_name,
    c.email,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_spent,
    MAX(o.created_at) as last_order_date,
    AVG(o.total_amount) as avg_order_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.full_name, c.email;

-- ============================================================================
-- SAMPLE PRODUCTS
-- ============================================================================
INSERT INTO products (category_id, name, description, base_price, price_per_serving, min_servings, max_servings) VALUES
    ((SELECT id FROM product_categories WHERE name = 'Cakes'), 'Custom Sheet Cake', 'Full or half sheet cake with custom decorations', 45.00, 2.00, 12, 96),
    ((SELECT id FROM product_categories WHERE name = 'Cakes'), 'Tiered Wedding Cake', 'Multi-tiered cake for weddings and special events', 200.00, 3.50, 50, 200),
    ((SELECT id FROM product_categories WHERE name = 'Cupcakes'), 'Dozen Cupcakes', 'One dozen decorated cupcakes', 24.00, 2.00, 12, 144),
    ((SELECT id FROM product_categories WHERE name = 'Cookies'), 'Decorated Sugar Cookies', 'Custom decorated sugar cookies', 18.00, 1.50, 12, 100);

-- ============================================================================
-- DONE
-- ============================================================================
DO $$
BEGIN
    RAISE NOTICE 'Database reset complete! All tables recreated successfully.';
END $$;
