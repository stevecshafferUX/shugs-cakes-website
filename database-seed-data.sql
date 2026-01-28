-- ============================================================================
-- Shug's Cakes Database - Seed Data
-- Comprehensive dummy data for testing and development
-- ============================================================================

-- Note: Run database-schema.sql first before running this script

-- ============================================================================
-- CLEAR EXISTING DATA (Optional - use with caution)
-- ============================================================================
-- Uncomment the following lines if you want to start fresh
-- TRUNCATE TABLE coupon_usage CASCADE;
-- TRUNCATE TABLE order_items CASCADE;
-- TRUNCATE TABLE order_history CASCADE;
-- TRUNCATE TABLE orders CASCADE;
-- TRUNCATE TABLE reviews CASCADE;
-- TRUNCATE TABLE contact_messages CASCADE;
-- TRUNCATE TABLE gallery_images CASCADE;
-- TRUNCATE TABLE customers CASCADE;
-- TRUNCATE TABLE coupons CASCADE;
-- TRUNCATE TABLE products CASCADE;
-- DELETE FROM product_categories WHERE name NOT IN ('Cakes', 'Cupcakes', 'Cookies', 'Desserts');
-- DELETE FROM cake_types WHERE name NOT IN ('Sheet Cake', 'Round Cake', 'Tiered Cake', 'Square Cake', 'Shaped Cake', 'Smash Cake');
-- DELETE FROM flavors WHERE name NOT IN ('Vanilla', 'Chocolate', 'Red Velvet', 'Marble', 'Carrot', 'Lemon', 'Strawberry', 'Funfetti');

-- ============================================================================
-- CUSTOMERS
-- ============================================================================
INSERT INTO customers (id, email, full_name, phone, address_line1, city, state, zip_code, total_orders, total_spent) VALUES
    ('11111111-1111-1111-1111-111111111111', 'sarah.johnson@email.com', 'Sarah Johnson', '317-555-0101', '123 Maple Street', 'Avon', 'IN', '46123', 5, 375.00),
    ('22222222-2222-2222-2222-222222222222', 'michael.brown@email.com', 'Michael Brown', '317-555-0102', '456 Oak Avenue', 'Indianapolis', 'IN', '46240', 3, 215.00),
    ('33333333-3333-3333-3333-333333333333', 'emily.davis@email.com', 'Emily Davis', '317-555-0103', '789 Pine Road', 'Plainfield', 'IN', '46168', 8, 650.00),
    ('44444444-4444-4444-4444-444444444444', 'james.wilson@email.com', 'James Wilson', '317-555-0104', '321 Elm Street', 'Brownsburg', 'IN', '46112', 2, 180.00),
    ('55555555-5555-5555-5555-555555555555', 'jennifer.martinez@email.com', 'Jennifer Martinez', '317-555-0105', '654 Birch Lane', 'Danville', 'IN', '46122', 4, 420.00),
    ('66666666-6666-6666-6666-666666666666', 'david.anderson@email.com', 'David Anderson', '317-555-0106', '987 Cedar Drive', 'Avon', 'IN', '46123', 1, 95.00),
    ('77777777-7777-7777-7777-777777777777', 'amanda.taylor@email.com', 'Amanda Taylor', '317-555-0107', '147 Spruce Court', 'Indianapolis', 'IN', '46268', 6, 510.00),
    ('88888888-8888-8888-8888-888888888888', 'robert.thomas@email.com', 'Robert Thomas', '317-555-0108', '258 Willow Way', 'Avon', 'IN', '46123', 3, 285.00),
    ('99999999-9999-9999-9999-999999999999', 'lisa.jackson@email.com', 'Lisa Jackson', '317-555-0109', '369 Ash Boulevard', 'Plainfield', 'IN', '46168', 7, 595.00),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'christopher.white@email.com', 'Christopher White', '317-555-0110', '741 Hickory Street', 'Brownsburg', 'IN', '46112', 2, 165.00)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PRODUCTS
-- ============================================================================
INSERT INTO products (id, category_id, name, description, base_price, price_per_serving, min_servings, max_servings, preparation_days) VALUES
    ('p1111111-1111-1111-1111-111111111111', (SELECT id FROM product_categories WHERE name = 'Cakes'), 'Quarter Sheet Cake', 'Perfect for small gatherings, serves 12-20 people', 45.00, 2.00, 12, 20, 3),
    ('p2222222-2222-2222-2222-222222222222', (SELECT id FROM product_categories WHERE name = 'Cakes'), 'Half Sheet Cake', 'Great for parties, serves 30-40 people', 65.00, 2.00, 30, 40, 3),
    ('p3333333-3333-3333-3333-333333333333', (SELECT id FROM product_categories WHERE name = 'Cakes'), 'Full Sheet Cake', 'Large gatherings, serves 60-80 people', 95.00, 2.00, 60, 80, 4),
    ('p4444444-4444-4444-4444-444444444444', (SELECT id FROM product_categories WHERE name = 'Cakes'), '2-Layer Round Cake', '8 or 9 inch round layered cake', 55.00, 2.50, 10, 16, 3),
    ('p5555555-5555-5555-5555-555555555555', (SELECT id FROM product_categories WHERE name = 'Cakes'), '3-Tier Wedding Cake', 'Beautiful tiered wedding cake', 300.00, 4.00, 50, 150, 7),
    ('p6666666-6666-6666-6666-666666666666', (SELECT id FROM product_categories WHERE name = 'Cupcakes'), 'Standard Cupcakes', 'Decorated cupcakes, sold by the dozen', 24.00, 2.00, 12, 144, 2),
    ('p7777777-7777-7777-7777-777777777777', (SELECT id FROM product_categories WHERE name = 'Cupcakes'), 'Premium Cupcakes', 'Elaborate decorations and premium fillings', 36.00, 3.00, 12, 144, 3),
    ('p8888888-8888-8888-8888-888888888888', (SELECT id FROM product_categories WHERE name = 'Cookies'), 'Sugar Cookies', 'Decorated sugar cookies, sold by the dozen', 18.00, 1.50, 12, 100, 2),
    ('p9999999-9999-9999-9999-999999999999', (SELECT id FROM product_categories WHERE name = 'Cookies'), 'Premium Decorated Cookies', 'Intricately decorated themed cookies', 30.00, 2.50, 12, 100, 3),
    ('paaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', (SELECT id FROM product_categories WHERE name = 'Desserts'), 'Cake Pops', 'Decorated cake pops, sold by the dozen', 24.00, 2.00, 12, 60, 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- COUPONS
-- ============================================================================
INSERT INTO coupons (id, code, description, discount_type, discount_value, min_order_amount, max_uses, current_uses, valid_from, valid_until, is_active) VALUES
    ('c1111111-1111-1111-1111-111111111111', 'WELCOME10', 'Welcome discount - 10% off first order', 'percentage', 10.00, 50.00, 100, 15, NOW() - INTERVAL '30 days', NOW() + INTERVAL '60 days', true),
    ('c2222222-2222-2222-2222-222222222222', 'SAVE20', '20% off orders over $100', 'percentage', 20.00, 100.00, 50, 8, NOW() - INTERVAL '15 days', NOW() + INTERVAL '45 days', true),
    ('c3333333-3333-3333-3333-333333333333', 'BIRTHDAY15', 'Birthday special - $15 off', 'fixed_amount', 15.00, 75.00, NULL, 23, NOW() - INTERVAL '60 days', NOW() + INTERVAL '30 days', true),
    ('c4444444-4444-4444-4444-444444444444', 'WEDDING25', '25% off wedding cakes', 'percentage', 25.00, 200.00, 20, 5, NOW() - INTERVAL '90 days', NOW() + INTERVAL '90 days', true),
    ('c5555555-5555-5555-5555-555555555555', 'SUMMER2026', 'Summer special - $25 off', 'fixed_amount', 25.00, 100.00, 75, 12, NOW() - INTERVAL '5 days', NOW() + INTERVAL '85 days', true),
    ('c6666666-6666-6666-6666-666666666666', 'EXPIRED50', 'Expired coupon - 50% off', 'percentage', 50.00, 50.00, 10, 10, NOW() - INTERVAL '120 days', NOW() - INTERVAL '30 days', false),
    ('c7777777-7777-7777-7777-777777777777', 'VIP30', 'VIP customer - 30% off', 'percentage', 30.00, 150.00, 10, 7, NOW() - INTERVAL '10 days', NOW() + INTERVAL '80 days', true),
    ('c8888888-8888-8888-8888-888888888888', 'FREESHIP', 'Free local delivery', 'free_shipping', 0.00, 75.00, NULL, 45, NOW() - INTERVAL '45 days', NOW() + INTERVAL '45 days', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- ORDERS
-- ============================================================================
INSERT INTO orders (id, customer_id, order_number, contact_name, contact_email, contact_phone, status, order_type, cake_type, flavor_id, subtotal, discount_amount, tax_amount, total_amount, coupon_id, coupon_code, servings, delivery_date, theme, special_requests, created_at) VALUES
    -- Recent pending orders
    ('o1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'ORD-20260107-000001', 'Sarah Johnson', 'sarah.johnson@email.com', '317-555-0101', 'pending', '{"type": "cake"}', '{"type": "sheet", "size": "half"}', (SELECT id FROM flavors WHERE name = 'Vanilla'), 65.00, 0.00, 4.55, 69.55, NULL, NULL, 35, CURRENT_DATE + 5, 'Birthday - Unicorns', 'Please write "Happy 5th Birthday Emma!"', NOW() - INTERVAL '2 hours'),

    ('o2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'ORD-20260107-000002', 'Michael Brown', 'michael.brown@email.com', '317-555-0102', 'pending', '{"type": "cupcakes"}', NULL, (SELECT id FROM flavors WHERE name = 'Chocolate'), 48.00, 4.80, 3.02, 46.22, 'c1111111-1111-1111-1111-111111111111', 'WELCOME10', 24, CURRENT_DATE + 3, 'Office Party', 'Need 24 cupcakes, assorted decorations', NOW() - INTERVAL '5 hours'),

    -- Confirmed orders
    ('o3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'ORD-20260106-000003', 'Emily Davis', 'emily.davis@email.com', '317-555-0103', 'confirmed', '{"type": "cake"}', '{"type": "round", "layers": 2}', (SELECT id FROM flavors WHERE name = 'Red Velvet'), 70.00, 0.00, 4.90, 74.90, NULL, NULL, 14, CURRENT_DATE + 7, 'Anniversary', 'Heart shaped if possible, write "Happy 10th Anniversary"', NOW() - INTERVAL '1 day'),

    ('o4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'ORD-20260105-000004', 'James Wilson', 'james.wilson@email.com', '317-555-0104', 'confirmed', '{"type": "cookies"}', NULL, NULL, 60.00, 12.00, 3.36, 51.36, 'c2222222-2222-2222-2222-222222222222', 'SAVE20', 40, CURRENT_DATE + 4, 'Baby Shower - Blue', '40 cookies shaped like baby bottles and onesies', NOW() - INTERVAL '2 days'),

    -- In progress orders
    ('o5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'ORD-20260104-000005', 'Jennifer Martinez', 'jennifer.martinez@email.com', '317-555-0105', 'in_progress', '{"type": "cake"}', '{"type": "sheet", "size": "full"}', (SELECT id FROM flavors WHERE name = 'Chocolate'), 95.00, 15.00, 5.60, 85.60, 'c3333333-3333-3333-3333-333333333333', 'BIRTHDAY15', 70, CURRENT_DATE + 2, 'Graduation Party', 'Blue and gold school colors, write "Congratulations Graduate 2026"', NOW() - INTERVAL '3 days'),

    ('o6666666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', 'ORD-20260103-000006', 'David Anderson', 'david.anderson@email.com', '317-555-0106', 'in_progress', '{"type": "cupcakes"}', NULL, (SELECT id FROM flavors WHERE name = 'Funfetti'), 36.00, 0.00, 2.52, 38.52, NULL, NULL, 18, CURRENT_DATE + 1, 'Kids Birthday Party', 'Bright rainbow colors, 18 cupcakes', NOW() - INTERVAL '4 days'),

    -- Ready for pickup
    ('o7777777-7777-7777-7777-777777777777', '77777777-7777-7777-7777-777777777777', 'ORD-20260102-000007', 'Amanda Taylor', 'amanda.taylor@email.com', '317-555-0107', 'ready', '{"type": "cake"}', '{"type": "round", "layers": 2}', (SELECT id FROM flavors WHERE name = 'Lemon'), 60.00, 0.00, 4.20, 64.20, NULL, NULL, 12, CURRENT_DATE, 'Bridal Shower', 'Elegant white and pink, write "Bride to Be"', NOW() - INTERVAL '5 days'),

    -- Completed orders (past dates)
    ('o8888888-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', 'ORD-20251228-000008', 'Robert Thomas', 'robert.thomas@email.com', '317-555-0108', 'completed', '{"type": "cake"}', '{"type": "tiered", "tiers": 3}', (SELECT id FROM flavors WHERE name = 'Vanilla'), 350.00, 87.50, 18.38, 280.88, 'c4444444-4444-4444-4444-444444444444', 'WEDDING25', 100, CURRENT_DATE - 10, 'Wedding', 'White fondant with fresh flowers, 3 tiers: 6", 8", 10"', NOW() - INTERVAL '15 days'),

    ('o9999999-9999-9999-9999-999999999999', '99999999-9999-9999-9999-999999999999', 'ORD-20251220-000009', 'Lisa Jackson', 'lisa.jackson@email.com', '317-555-0109', 'completed', '{"type": "cake"}', '{"type": "sheet", "size": "quarter"}', (SELECT id FROM flavors WHERE name = 'Carrot'), 50.00, 0.00, 3.50, 53.50, NULL, NULL, 15, CURRENT_DATE - 18, 'Holiday Party', 'Christmas theme with red and green, write "Merry Christmas"', NOW() - INTERVAL '23 days'),

    ('oaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ORD-20251215-000010', 'Christopher White', 'christopher.white@email.com', '317-555-0110', 'completed', '{"type": "cookies"}', NULL, NULL, 45.00, 0.00, 3.15, 48.15, NULL, NULL, 30, CURRENT_DATE - 23, 'Holiday Cookies', '30 cookies - snowflakes, Christmas trees, gingerbread men', NOW() - INTERVAL '28 days'),

    -- Cancelled order
    ('obbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'ORD-20260101-000011', 'Michael Brown', 'michael.brown@email.com', '317-555-0102', 'cancelled', '{"type": "cake"}', '{"type": "sheet", "size": "half"}', (SELECT id FROM flavors WHERE name = 'Marble'), 65.00, 0.00, 4.55, 69.55, NULL, NULL, 35, CURRENT_DATE + 10, 'Birthday', 'Customer changed plans', NOW() - INTERVAL '6 days'),

    -- Additional completed orders for variety
    ('occcccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'ORD-20251210-000012', 'Emily Davis', 'emily.davis@email.com', '317-555-0103', 'completed', '{"type": "cupcakes"}', NULL, (SELECT id FROM flavors WHERE name = 'Strawberry'), 72.00, 0.00, 5.04, 77.04, NULL, NULL, 36, CURRENT_DATE - 28, 'Baby Shower - Pink', 'Pink frosting with baby decorations', NOW() - INTERVAL '33 days'),

    ('oddddddd-dddd-dddd-dddd-dddddddddddd', '55555555-5555-5555-5555-555555555555', 'ORD-20251205-000013', 'Jennifer Martinez', 'jennifer.martinez@email.com', '317-555-0105', 'completed', '{"type": "cake"}', '{"type": "shaped", "shape": "dinosaur"}', (SELECT id FROM flavors WHERE name = 'Chocolate'), 85.00, 0.00, 5.95, 90.95, NULL, NULL, 20, CURRENT_DATE - 33, 'Kids Birthday', 'T-Rex shape, green and brown colors', NOW() - INTERVAL '38 days'),

    ('oeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '77777777-7777-7777-7777-777777777777', 'ORD-20251201-000014', 'Amanda Taylor', 'amanda.taylor@email.com', '317-555-0107', 'completed', '{"type": "desserts"}', NULL, NULL, 48.00, 0.00, 3.36, 51.36, NULL, NULL, 24, CURRENT_DATE - 37, 'Corporate Event', '24 cake pops with company logo', NOW() - INTERVAL '42 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- ORDER_ITEMS (for orders with multiple products)
-- ============================================================================
INSERT INTO order_items (order_id, product_id, cake_type_id, flavor_id, item_name, description, quantity, unit_price, total_price, servings) VALUES
    -- Wedding cake order items
    ('o8888888-8888-8888-8888-888888888888', 'p5555555-5555-5555-5555-555555555555', (SELECT id FROM cake_types WHERE name = 'Tiered Cake'), (SELECT id FROM flavors WHERE name = 'Vanilla'), '3-Tier Wedding Cake', 'Bottom tier: Vanilla with raspberry filling', 1, 350.00, 350.00, 100),

    -- Birthday party with mixed items
    ('o5555555-5555-5555-5555-555555555555', 'p3333333-3333-3333-3333-333333333333', (SELECT id FROM cake_types WHERE name = 'Sheet Cake'), (SELECT id FROM flavors WHERE name = 'Chocolate'), 'Full Sheet Cake', 'Chocolate cake with chocolate buttercream', 1, 95.00, 95.00, 70),

    -- Cupcake variety order
    ('occcccc-cccc-cccc-cccc-cccccccccccc', 'p6666666-6666-6666-6666-666666666666', NULL, (SELECT id FROM flavors WHERE name = 'Strawberry'), 'Strawberry Cupcakes', 'Pink frosting with sprinkles', 2, 24.00, 48.00, 24),
    ('occcccc-cccc-cccc-cccc-cccccccccccc', 'p6666666-6666-6666-6666-666666666666', NULL, (SELECT id FROM flavors WHERE name = 'Vanilla'), 'Vanilla Cupcakes', 'Baby themed decorations', 1, 24.00, 24.00, 12)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- COUPON_USAGE
-- ============================================================================
INSERT INTO coupon_usage (coupon_id, order_id, customer_id, discount_applied) VALUES
    ('c1111111-1111-1111-1111-111111111111', 'o2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 4.80),
    ('c2222222-2222-2222-2222-222222222222', 'o4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 12.00),
    ('c3333333-3333-3333-3333-333333333333', 'o5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 15.00),
    ('c4444444-4444-4444-4444-444444444444', 'o8888888-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', 87.50)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- CONTACT_MESSAGES
-- ============================================================================
INSERT INTO contact_messages (name, email, phone, subject, message, status, created_at) VALUES
    ('Karen Peterson', 'karen.p@email.com', '317-555-0201', 'Question about wedding cake pricing', 'Hi, I am getting married in June and would like to know more about your wedding cake options and pricing for 150 guests.', 'unread', NOW() - INTERVAL '3 hours'),
    ('Tom Harrison', 'tom.h@email.com', '317-555-0202', 'Dietary restrictions', 'Do you offer gluten-free or vegan cake options? My daughter has celiac disease.', 'read', NOW() - INTERVAL '1 day'),
    ('Michelle Rodriguez', 'michelle.r@email.com', '317-555-0203', 'Custom shaped cake inquiry', 'I am looking for a custom shaped cake in the form of a fire truck for my sons 4th birthday. Is this something you can do?', 'replied', NOW() - INTERVAL '2 days'),
    ('Brian Cooper', 'brian.c@email.com', '317-555-0204', 'Delivery options', 'Do you deliver to Indianapolis? What are the delivery fees?', 'read', NOW() - INTERVAL '3 days'),
    ('Susan Miller', 'susan.m@email.com', '317-555-0205', 'Last minute order', 'Is it possible to place an order for this weekend? I know it is short notice.', 'replied', NOW() - INTERVAL '5 days'),
    ('Paul Wright', 'paul.w@email.com', '317-555-0206', 'Bulk order for corporate event', 'We need 200 cupcakes for a company event. Can you handle that volume and what would be the pricing?', 'unread', NOW() - INTERVAL '8 hours'),
    ('Rachel Green', 'rachel.g@email.com', '317-555-0207', 'Thank you!', 'Just wanted to say thank you for the amazing birthday cake last week! Everyone loved it and asked where we got it. Will definitely order again!', 'read', NOW() - INTERVAL '7 days'),
    ('Mark Stevens', 'mark.s@email.com', '317-555-0208', 'Flavor recommendations', 'What flavor combinations do you recommend for a summer outdoor wedding?', 'unread', NOW() - INTERVAL '12 hours')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- REVIEWS
-- ============================================================================
INSERT INTO reviews (order_id, customer_id, rating, title, comment, is_approved, is_featured, approved_at, created_at) VALUES
    ('o8888888-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', 5, 'Perfect Wedding Cake!', 'The wedding cake was absolutely stunning and tasted even better than it looked! All of our guests raved about it. Chris was so easy to work with and brought our vision to life perfectly. Highly recommend!', true, true, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

    ('o9999999-9999-9999-9999-999999999999', '99999999-9999-9999-9999-999999999999', 5, 'Best Carrot Cake Ever', 'I have been ordering cakes from Shug''s Cakes for years and they never disappoint. The carrot cake with cream cheese frosting is to die for. Everyone at our Christmas party loved it!', true, true, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),

    ('occcccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 5, 'Beautiful and Delicious', 'The cupcakes for my baby shower were adorable and tasted amazing. The decorations were exactly what I asked for. Thank you so much!', true, false, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),

    ('oddddddd-dddd-dddd-dddd-dddddddddddd', '55555555-5555-5555-5555-555555555555', 5, 'Kids Loved It!', 'The dinosaur shaped cake was a huge hit at my son''s birthday party. All the kids (and adults) were impressed. It looked professional and tasted great. Worth every penny!', true, true, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),

    ('oaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 4, 'Great Holiday Cookies', 'The Christmas cookies were delicious and beautifully decorated. Only giving 4 stars because delivery was a bit late, but the quality made up for it!', true, false, NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days'),

    (NULL, '11111111-1111-1111-1111-111111111111', 5, 'Always My Go-To Bakery', 'I have ordered from Shug''s Cakes multiple times now and they are always consistent with quality and taste. The staff is friendly and accommodating. My favorite local bakery!', true, true, NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),

    (NULL, '77777777-7777-7777-7777-777777777777', 5, 'Exceeded Expectations', 'I was nervous ordering a cake online without tasting it first, but Shug''s Cakes exceeded all my expectations. The lemon cake was moist and flavorful. Will definitely order again!', true, false, NOW() - INTERVAL '35 days', NOW() - INTERVAL '35 days'),

    -- Pending approval review
    (NULL, '66666666-6666-6666-6666-666666666666', 5, 'Highly Recommend', 'Great experience from start to finish. The cake was delicious and looked beautiful.', false, false, NULL, NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GALLERY_IMAGES
-- ============================================================================
INSERT INTO gallery_images (category, title, description, image_url, display_order, is_featured, tags) VALUES
    ('birthday', 'Unicorn Birthday Cake', '3-layer rainbow cake with unicorn decoration', 'https://placehold.co/800x600/FFB6C1/FFFFFF?text=Unicorn+Cake', 1, true, ARRAY['birthday', 'kids', 'unicorn', 'rainbow']),
    ('birthday', 'Superhero Cake', 'Sheet cake with superhero theme', 'https://placehold.co/800x600/4169E1/FFFFFF?text=Superhero+Cake', 2, true, ARRAY['birthday', 'kids', 'superhero']),
    ('wedding', 'Classic White Wedding Cake', '3-tier white wedding cake with fresh flowers', 'https://placehold.co/800x600/FFFAF0/D3D3D3?text=Wedding+Cake', 1, true, ARRAY['wedding', 'elegant', 'tiered']),
    ('wedding', 'Rustic Wedding Cake', 'Semi-naked cake with berries and greenery', 'https://placehold.co/800x600/DEB887/FFFFFF?text=Rustic+Wedding', 2, true, ARRAY['wedding', 'rustic', 'berries']),
    ('graduation', 'Graduation Cap Cake', 'Sheet cake decorated as a graduation cap', 'https://placehold.co/800x600/000080/FFD700?text=Grad+Cap+Cake', 1, false, ARRAY['graduation', 'school']),
    ('baby_shower', 'Pink Baby Shower Cake', 'Round cake with baby-themed decorations', 'https://placehold.co/800x600/FFB6C1/FFFFFF?text=Baby+Shower', 1, false, ARRAY['baby_shower', 'pink', 'baby']),
    ('cupcakes', 'Assorted Cupcakes', 'Variety of decorated cupcakes', 'https://placehold.co/800x600/FFA500/FFFFFF?text=Cupcakes', 1, true, ARRAY['cupcakes', 'variety']),
    ('cupcakes', 'Wedding Cupcake Tower', 'Elegant cupcake tower for wedding', 'https://placehold.co/800x600/E6E6FA/FFFFFF?text=Cupcake+Tower', 2, false, ARRAY['cupcakes', 'wedding', 'tower']),
    ('specialty', 'Fire Truck Cake', 'Custom 3D fire truck shaped cake', 'https://placehold.co/800x600/DC143C/FFFFFF?text=Fire+Truck', 1, true, ARRAY['specialty', 'kids', 'shaped', '3D']),
    ('specialty', 'Mermaid Cake', 'Mermaid themed layered cake', 'https://placehold.co/800x600/00CED1/FFFFFF?text=Mermaid+Cake', 2, true, ARRAY['specialty', 'mermaid', 'kids']),
    ('anniversary', 'Golden Anniversary Cake', 'Elegant cake for 50th anniversary', 'https://placehold.co/800x600/FFD700/FFFFFF?text=50th+Anniversary', 1, false, ARRAY['anniversary', 'golden', 'elegant']),
    ('seasonal', 'Christmas Cake', 'Festive holiday cake with decorations', 'https://placehold.co/800x600/228B22/DC143C?text=Christmas+Cake', 1, false, ARRAY['seasonal', 'christmas', 'holiday'])
ON CONFLICT DO NOTHING;

-- ============================================================================
-- UPDATE CUSTOMER STATISTICS
-- ============================================================================
-- This would normally be handled by triggers, but we'll update manually for seed data
UPDATE customers c
SET
    total_orders = (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id AND o.status = 'completed'),
    total_spent = (SELECT COALESCE(SUM(o.total_amount), 0) FROM orders o WHERE o.customer_id = c.id AND o.status = 'completed');

-- ============================================================================
-- UPDATE COUPON USAGE COUNTS
-- ============================================================================
UPDATE coupons c
SET current_uses = (SELECT COUNT(*) FROM coupon_usage cu WHERE cu.coupon_id = c.id);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
DO $$
DECLARE
    customer_count INTEGER;
    order_count INTEGER;
    coupon_count INTEGER;
    review_count INTEGER;
    message_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO customer_count FROM customers;
    SELECT COUNT(*) INTO order_count FROM orders;
    SELECT COUNT(*) INTO coupon_count FROM coupons;
    SELECT COUNT(*) INTO review_count FROM reviews;
    SELECT COUNT(*) INTO message_count FROM contact_messages;

    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Seed data loaded successfully!';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Customers: %', customer_count;
    RAISE NOTICE 'Orders: %', order_count;
    RAISE NOTICE 'Coupons: %', coupon_count;
    RAISE NOTICE 'Reviews: %', review_count;
    RAISE NOTICE 'Contact Messages: %', message_count;
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Order Status Distribution:';
    RAISE NOTICE '  Pending: %', (SELECT COUNT(*) FROM orders WHERE status = 'pending');
    RAISE NOTICE '  Confirmed: %', (SELECT COUNT(*) FROM orders WHERE status = 'confirmed');
    RAISE NOTICE '  In Progress: %', (SELECT COUNT(*) FROM orders WHERE status = 'in_progress');
    RAISE NOTICE '  Ready: %', (SELECT COUNT(*) FROM orders WHERE status = 'ready');
    RAISE NOTICE '  Completed: %', (SELECT COUNT(*) FROM orders WHERE status = 'completed');
    RAISE NOTICE '  Cancelled: %', (SELECT COUNT(*) FROM orders WHERE status = 'cancelled');
    RAISE NOTICE '==================================================';
END $$;
