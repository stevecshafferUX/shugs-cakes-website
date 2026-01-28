import { Link } from 'react-router-dom';
import './Pricing.css';

function Pricing() {
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
          <div className="pricing-card">
            <h3>Sheet Cakes</h3>
            <div className="price-details">
              <div className="price-row">
                <span>Quarter Sheet (serves 12-15)</span>
                <span className="price">Starting at $45</span>
              </div>
              <div className="price-row">
                <span>Half Sheet (serves 24-30)</span>
                <span className="price">Starting at $75</span>
              </div>
              <div className="price-row">
                <span>Full Sheet (serves 48-60)</span>
                <span className="price">Starting at $135</span>
              </div>
            </div>
          </div>

          <div className="pricing-card">
            <h3>Round Cakes</h3>
            <div className="price-details">
              <div className="price-row">
                <span>6" (serves 8-10)</span>
                <span className="price">Starting at $40</span>
              </div>
              <div className="price-row">
                <span>8" (serves 12-16)</span>
                <span className="price">Starting at $55</span>
              </div>
              <div className="price-row">
                <span>10" (serves 20-25)</span>
                <span className="price">Starting at $75</span>
              </div>
              <div className="price-row">
                <span>12" (serves 30-35)</span>
                <span className="price">Starting at $95</span>
              </div>
            </div>
          </div>

          <div className="pricing-card">
            <h3>Tiered Cakes</h3>
            <div className="price-details">
              <div className="price-row">
                <span>2-Tier (6" + 8")</span>
                <span className="price">Starting at $95</span>
              </div>
              <div className="price-row">
                <span>2-Tier (8" + 10")</span>
                <span className="price">Starting at $130</span>
              </div>
              <div className="price-row">
                <span>3-Tier (6" + 8" + 10")</span>
                <span className="price">Starting at $170</span>
              </div>
            </div>
            <p className="note">Custom tiered cakes available - contact for quote</p>
          </div>

          <div className="pricing-card">
            <h3>Cupcakes</h3>
            <div className="price-details">
              <div className="price-row">
                <span>Standard (per dozen)</span>
                <span className="price">$30</span>
              </div>
              <div className="price-row">
                <span>Custom Decorated (per dozen)</span>
                <span className="price">$36+</span>
              </div>
            </div>
          </div>

          <div className="pricing-card">
            <h3>Specialty Items</h3>
            <div className="price-details">
              <div className="price-row">
                <span>Cookies (per dozen)</span>
                <span className="price">$30+</span>
              </div>
              <div className="price-row">
                <span>Smash Cakes</span>
                <span className="price">$35+</span>
              </div>
              <div className="price-row">
                <span>Shaped/Sculpted Cakes</span>
                <span className="price">Custom Quote</span>
              </div>
            </div>
          </div>

          <div className="pricing-card featured">
            <h3>Additional Services</h3>
            <div className="price-details">
              <div className="price-row">
                <span>Edible Images</span>
                <span className="price">+$15</span>
              </div>
              <div className="price-row">
                <span>Custom Toppers</span>
                <span className="price">+$10+</span>
              </div>
              <div className="price-row">
                <span>Premium Decorations</span>
                <span className="price">Varies</span>
              </div>
            </div>
          </div>
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
