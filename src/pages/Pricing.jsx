import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pricingApi } from '@/api/pricing';
import './Pricing.css';

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
    try {
      const [productsData, cakeTypesData, flavorsData, categoriesData] = await Promise.all([
        pricingApi.getActiveProducts(),
        pricingApi.getActiveCakeTypes(),
        pricingApi.getActiveFlavors(),
        pricingApi.getCategories(),
      ]);

      setProducts(productsData);
      setCakeTypes(cakeTypesData);
      setFlavors(flavorsData);
      setCategories(categoriesData.filter(c => c.is_active));
    } catch (err) {
      console.error('Error fetching pricing data:', err);
      setError('Unable to load pricing information.');
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

  if (error) {
    return (
      <div className="pricing-page">
        <div className="pricing-header">
          <h1>Pricing</h1>
          <p>Custom cakes made with love</p>
        </div>
        <div className="pricing-container">
          <div className="pricing-error">{error}</div>
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
              <h3>Cake Types</h3>
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
          <h3>Important Notes:</h3>
          <ul>
            <li>All prices are starting prices and may vary based on design complexity</li>
            <li>Custom designs, fondant work, and specialty decorations may incur additional charges</li>
            <li>A 50% deposit is required to secure your order date</li>
            <li>Orders should be placed at least 2 weeks in advance</li>
            <li>Rush orders may be available with an additional fee</li>
          </ul>
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
