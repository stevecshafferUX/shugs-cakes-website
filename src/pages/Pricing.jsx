import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isMissingCredentials } from '@/lib/supabase';
import './Pricing.css';

// Fallback pricing data so the page works without Supabase
const FALLBACK_CATEGORIES = [
  {
    id: 'cat-cakes',
    name: 'Custom Cakes',
    description: 'Made from scratch with real butter and fresh ingredients',
    is_active: true,
    display_order: 1,
  },
  {
    id: 'cat-cupcakes',
    name: 'Cupcakes',
    description: 'Perfect for parties and events',
    is_active: true,
    display_order: 2,
  },
  {
    id: 'cat-cookies',
    name: 'Decorated Cookies',
    description: 'Custom decorated sugar cookies for any occasion',
    is_active: true,
    display_order: 3,
  },
  {
    id: 'cat-desserts',
    name: 'Other Desserts',
    description: 'Cake pops, cake jars, and more',
    is_active: true,
    display_order: 4,
  },
];

const FALLBACK_PRODUCTS = [
  // Cakes
  { id: 'p1', name: 'Sheet Cake (Quarter)', description: 'Serves 12-20', base_price: 45, category_id: 'cat-cakes', is_active: true, min_servings: 12, max_servings: 20 },
  { id: 'p2', name: 'Sheet Cake (Half)', description: 'Serves 24-35', base_price: 65, category_id: 'cat-cakes', is_active: true, min_servings: 24, max_servings: 35 },
  { id: 'p3', name: 'Sheet Cake (Full)', description: 'Serves 48-60', base_price: 85, category_id: 'cat-cakes', is_active: true, min_servings: 48, max_servings: 60 },
  { id: 'p4', name: 'Round Layer Cake (6")', description: 'Serves 8-12', base_price: 50, category_id: 'cat-cakes', is_active: true, min_servings: 8, max_servings: 12 },
  { id: 'p5', name: 'Round Layer Cake (8")', description: 'Serves 16-24', base_price: 70, category_id: 'cat-cakes', is_active: true, min_servings: 16, max_servings: 24 },
  { id: 'p6', name: 'Round Layer Cake (10")', description: 'Serves 28-40', base_price: 90, category_id: 'cat-cakes', is_active: true, min_servings: 28, max_servings: 40 },
  { id: 'p7', name: 'Tiered Cake (2-tier)', description: 'Serves 30-50', base_price: 150, category_id: 'cat-cakes', is_active: true, min_servings: 30, max_servings: 50 },
  { id: 'p8', name: 'Tiered Cake (3-tier)', description: 'Serves 60-100', base_price: 250, category_id: 'cat-cakes', is_active: true, min_servings: 60, max_servings: 100 },
  { id: 'p9', name: 'Smash Cake', description: 'Perfect for 1st birthday photos', base_price: 35, category_id: 'cat-cakes', is_active: true, min_servings: null, max_servings: null },
  { id: 'p10', name: 'Shaped/3D Cake', description: 'Custom sculpted designs', base_price: 75, category_id: 'cat-cakes', is_active: true, min_servings: null, max_servings: null },
  // Cupcakes
  { id: 'p11', name: 'Cupcakes (1 dozen)', description: 'Standard or mini', base_price: 24, category_id: 'cat-cupcakes', is_active: true, min_servings: 12, max_servings: 12 },
  { id: 'p12', name: 'Cupcakes (2 dozen)', description: 'Standard or mini', base_price: 42, category_id: 'cat-cupcakes', is_active: true, min_servings: 24, max_servings: 24 },
  { id: 'p13', name: 'Specialty Cupcakes (1 dozen)', description: 'Filled or topped with extras', base_price: 36, category_id: 'cat-cupcakes', is_active: true, min_servings: 12, max_servings: 12 },
  // Cookies
  { id: 'p14', name: 'Decorated Cookies (1 dozen)', description: 'Royal icing decorated', base_price: 36, category_id: 'cat-cookies', is_active: true, min_servings: null, max_servings: null },
  { id: 'p15', name: 'Decorated Cookies (2 dozen)', description: 'Royal icing decorated', base_price: 60, category_id: 'cat-cookies', is_active: true, min_servings: null, max_servings: null },
  // Desserts
  { id: 'p16', name: 'Cake Pops (1 dozen)', description: 'Assorted flavors', base_price: 30, category_id: 'cat-desserts', is_active: true, min_servings: null, max_servings: null },
  { id: 'p17', name: 'Cake Jars', description: 'Layered cake in a jar', base_price: 8, category_id: 'cat-desserts', is_active: true, min_servings: null, max_servings: null },
];

const FALLBACK_CAKE_TYPES = [
  { id: 'ct1', name: 'Buttercream', description: 'Our signature real-butter frosting', price_modifier: 0, is_active: true, display_order: 1 },
  { id: 'ct2', name: 'Fondant', description: 'Smooth fondant covering', price_modifier: 25, is_active: true, display_order: 2 },
  { id: 'ct3', name: 'Naked/Semi-Naked', description: 'Minimal frosting for a rustic look', price_modifier: 0, is_active: true, display_order: 3 },
  { id: 'ct4', name: 'Drip Cake', description: 'Ganache drip decoration', price_modifier: 15, is_active: true, display_order: 4 },
];

const FALLBACK_FLAVORS = [
  { id: 'f1', name: 'Vanilla', description: 'Classic vanilla with real extract', price_modifier: 0, is_active: true, display_order: 1 },
  { id: 'f2', name: 'Chocolate', description: 'Rich cocoa flavor', price_modifier: 0, is_active: true, display_order: 2 },
  { id: 'f3', name: 'Red Velvet', description: 'Classic with cream cheese frosting', price_modifier: 5, is_active: true, display_order: 3 },
  { id: 'f4', name: 'Marble', description: 'Vanilla and chocolate swirl', price_modifier: 0, is_active: true, display_order: 4 },
  { id: 'f5', name: 'Lemon', description: 'Fresh citrus flavor', price_modifier: 0, is_active: true, display_order: 5 },
  { id: 'f6', name: 'Strawberry', description: 'Real strawberry flavor', price_modifier: 5, is_active: true, display_order: 6 },
  { id: 'f7', name: 'Funfetti', description: 'Vanilla with colorful sprinkles', price_modifier: 0, is_active: true, display_order: 7 },
  { id: 'f8', name: 'Carrot Cake', description: 'Spiced with walnuts and pineapple', price_modifier: 10, is_active: true, display_order: 8 },
  { id: 'f9', name: 'Cookies & Cream', description: 'With crushed Oreo cookies', price_modifier: 5, is_active: true, display_order: 9 },
];

function Pricing() {
  const [products, setProducts] = useState([]);
  const [cakeTypes, setCakeTypes] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    // If Supabase isn't configured, use fallback data immediately
    if (isMissingCredentials) {
      setProducts(FALLBACK_PRODUCTS);
      setCakeTypes(FALLBACK_CAKE_TYPES);
      setFlavors(FALLBACK_FLAVORS);
      setCategories(FALLBACK_CATEGORIES);
      setLoading(false);
      return;
    }

    try {
      const { pricingApi } = await import('@/api/pricing');
      const [productsData, cakeTypesData, flavorsData, categoriesData] = await Promise.all([
        pricingApi.getActiveProducts(),
        pricingApi.getActiveCakeTypes(),
        pricingApi.getActiveFlavors(),
        pricingApi.getCategories(),
      ]);

      setProducts(productsData.length > 0 ? productsData : FALLBACK_PRODUCTS);
      setCakeTypes(cakeTypesData.length > 0 ? cakeTypesData : FALLBACK_CAKE_TYPES);
      setFlavors(flavorsData.length > 0 ? flavorsData : FALLBACK_FLAVORS);
      setCategories(
        categoriesData.filter(c => c.is_active).length > 0
          ? categoriesData.filter(c => c.is_active)
          : FALLBACK_CATEGORIES
      );
    } catch (err) {
      console.error('Error fetching pricing data, using fallback:', err);
      // Fall back to hardcoded data instead of showing error
      setProducts(FALLBACK_PRODUCTS);
      setCakeTypes(FALLBACK_CAKE_TYPES);
      setFlavors(FALLBACK_FLAVORS);
      setCategories(FALLBACK_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined) return 'Custom Quote';
    const num = parseFloat(price);
    if (num === 0) return 'Included';
    return `$${num.toFixed(2)}`;
  };

  // Group products by category
  const productsByCategory = categories.reduce((acc, category) => {
    const categoryProducts = products.filter(p => p.category_id === category.id);
    if (categoryProducts.length > 0) {
      acc.push({ ...category, products: categoryProducts });
    }
    return acc;
  }, []);

  if (loading) {
    return (
      <div className="pricing-page">
        <div className="pricing-header">
          <h1>Pricing</h1>
          <p>Custom cakes made with love</p>
        </div>
        <div className="pricing-container">
          <div className="pricing-loading">Loading pricing information...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Pricing</h1>
        <p>Custom cakes made with love</p>
      </div>

      <div className="pricing-container">
        <div className="pricing-intro">
          <p>
            All our cakes are custom-made to order. Pricing varies based on size, design complexity,
            and special requirements. Below are our base pricing guidelines.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Products by Category */}
          {productsByCategory.map((category) => (
            <div className="pricing-card" key={category.id}>
              <h3>{category.name}</h3>
              {category.description && (
                <p className="category-description">{category.description}</p>
              )}
              <div className="price-details">
                {category.products.map((product) => (
                  <div className="price-row" key={product.id}>
                    <div className="price-item-info">
                      <span className="price-item-name">{product.name}</span>
                      {product.description && (
                        <span className="price-item-desc">{product.description}</span>
                      )}
                      {product.min_servings && (
                        <span className="price-item-servings">
                          Serves {product.min_servings}
                          {product.max_servings ? `–${product.max_servings}` : '+'}
                        </span>
                      )}
                    </div>
                    <span className="price">
                      {product.base_price > 0
                        ? `Starting at ${formatPrice(product.base_price)}`
                        : 'Custom Quote'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Cake Types */}
          {cakeTypes.length > 0 && (
            <div className="pricing-card">
              <h3>Cake Styles</h3>
              <div className="price-details">
                {cakeTypes.map((type) => (
                  <div className="price-row" key={type.id}>
                    <div className="price-item-info">
                      <span className="price-item-name">{type.name}</span>
                      {type.description && (
                        <span className="price-item-desc">{type.description}</span>
                      )}
                    </div>
                    <span className="price">
                      {type.price_modifier > 0
                        ? `+${formatPrice(type.price_modifier)}`
                        : type.price_modifier < 0
                        ? `-${formatPrice(Math.abs(type.price_modifier))}`
                        : 'Base Price'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flavors with price modifiers */}
          {flavors.length > 0 && (
            <div className="pricing-card featured">
              <h3>Flavors</h3>
              <div className="price-details">
                {flavors.map((flavor) => (
                  <div className="price-row" key={flavor.id}>
                    <div className="price-item-info">
                      <span className="price-item-name">{flavor.name}</span>
                      {flavor.description && (
                        <span className="price-item-desc">{flavor.description}</span>
                      )}
                    </div>
                    <span className="price">
                      {flavor.price_modifier > 0
                        ? `+${formatPrice(flavor.price_modifier)}`
                        : 'Included'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pricing-notes">
          <h3>Important Notes</h3>
          <p className="pricing-notes-text">
            All prices are starting prices and may vary based on design complexity.
            Custom designs, fondant work, and specialty decorations may incur additional charges.
            A 50% deposit is required to secure your order date. Orders should be placed at least
            2 weeks in advance. Rush orders may be available with an additional fee.
          </p>
        </div>

        <div className="pricing-cta">
          <h3>Ready to order?</h3>
          <p>Contact us for a custom quote or fill out our order form</p>
          <div className="cta-buttons">
            <Link to="/order" className="btn-primary">
              Order Form
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
