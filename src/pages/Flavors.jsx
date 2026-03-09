import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Flavors.css';

const CAKE_FLAVORS = [
  { name: 'Classic Vanilla', desc: 'Light and fluffy vanilla cake made with real vanilla extract', cat: 'Cake', popular: true },
  { name: 'Rich Chocolate', desc: 'Decadent chocolate cake with deep cocoa flavor', cat: 'Cake', popular: true },
  { name: 'Red Velvet', desc: 'Classic red velvet with a hint of cocoa', cat: 'Cake', popular: true },
  { name: 'Marble', desc: 'Perfect blend of vanilla and chocolate swirled together', cat: 'Cake', popular: false },
  { name: 'Lemon', desc: 'Fresh lemon cake with a light citrus flavor', cat: 'Cake', popular: false },
  { name: 'Strawberry', desc: 'Moist strawberry cake with real strawberry flavor', cat: 'Cake', popular: true },
  { name: 'Funfetti', desc: 'Vanilla cake loaded with colorful sprinkles', cat: 'Cake', popular: false },
  { name: 'Carrot Cake', desc: 'Spiced carrot cake with walnuts and pineapple', cat: 'Cake', popular: false },
  { name: 'Cookies & Cream', desc: 'Vanilla cake with crushed Oreo cookies', cat: 'Cake', popular: true },
  { name: 'Almond', desc: 'Delicate almond-flavored cake', cat: 'Cake', popular: false },
  { name: 'Coconut', desc: 'Tropical coconut cake with coconut flakes', cat: 'Cake', popular: false },
  { name: 'Banana', desc: 'Moist banana cake with real banana', cat: 'Cake', popular: false },
];

const FROSTING_FLAVORS = [
  { name: 'Vanilla Buttercream', desc: 'Smooth and creamy vanilla buttercream made with real butter', cat: 'Frosting', popular: true },
  { name: 'Chocolate Buttercream', desc: 'Rich chocolate buttercream', cat: 'Frosting', popular: true },
  { name: 'Cream Cheese', desc: 'Tangy cream cheese frosting — perfect for red velvet and carrot cake', cat: 'Frosting', popular: true },
  { name: 'Strawberry Buttercream', desc: 'Sweet strawberry-flavored buttercream', cat: 'Frosting', popular: false },
  { name: 'Lemon Buttercream', desc: 'Zesty lemon buttercream', cat: 'Frosting', popular: false },
  { name: 'Almond Buttercream', desc: 'Buttercream with almond extract', cat: 'Frosting', popular: false },
  { name: 'Cookies & Cream', desc: 'Vanilla buttercream with crushed Oreos', cat: 'Frosting', popular: false },
  { name: 'Peanut Butter', desc: 'Creamy peanut butter frosting', cat: 'Frosting', popular: false },
  { name: 'Mocha', desc: 'Coffee and chocolate flavored buttercream', cat: 'Frosting', popular: false },
  { name: 'Coconut', desc: 'Coconut-flavored buttercream', cat: 'Frosting', popular: false },
];

const FILLINGS = [
  'Strawberry', 'Raspberry', 'Lemon Curd', 'Chocolate Ganache',
  'Bavarian Cream', 'Caramel', 'Cream Cheese', 'Fruit Preserves',
];

const COMBOS = [
  { name: 'Classic Birthday', cake: 'Funfetti', frosting: 'Vanilla Buttercream', filling: 'Strawberry' },
  { name: 'Chocolate Lovers', cake: 'Rich Chocolate', frosting: 'Chocolate Buttercream', filling: 'Chocolate Ganache' },
  { name: 'Southern Classic', cake: 'Red Velvet', frosting: 'Cream Cheese', filling: 'Cream Cheese' },
  { name: 'Cookies & Cream Dream', cake: 'Cookies & Cream', frosting: 'Cookies & Cream', filling: 'Bavarian Cream' },
];

const ALL_FLAVORS = [...CAKE_FLAVORS, ...FROSTING_FLAVORS];
const CATS = ['All', 'Cake', 'Frosting'];

function Flavors() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All' ? ALL_FLAVORS : ALL_FLAVORS.filter(f => f.cat === activeTab);

  return (
    <div className="flavors-page">
      {/* Header */}
      <div className="flavors-header">
        <h1>Cake Flavors</h1>
        <p>All our cakes are made from scratch with real ingredients</p>
      </div>

      <div className="page-section">

        {/* Intro */}
        <div className="flavors-intro">
          <div className="section-label" style={{ justifyContent: 'center' }}>Taste Everything</div>
          <h2 className="flavors-main-heading">
            Flavor <span className="heading-accent">Menu</span>
          </h2>
          <p>
            All our cakes are made from scratch using real butter, fresh ingredients, and no artificial flavors.
            Mix and match your favorite cake, frosting, and filling to create your perfect custom cake.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flavor-tabs">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flavor-tab${activeTab === cat ? ' active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Flavor cards grid */}
        <div className="flavor-grid">
          {filtered.map((flavor, i) => (
            <div key={i} className={`flavor-card card${flavor.popular ? ' popular' : ''}`}>
              {flavor.popular && (
                <div className="popular-badge">⭐ Popular</div>
              )}
              <span className="tag" style={{ marginBottom: 10, display: 'inline-flex' }}>{flavor.cat}</span>
              <h3>{flavor.name}</h3>
              <p>{flavor.desc}</p>
            </div>
          ))}
        </div>

        {/* Fillings */}
        <section className="fillings-section">
          <div className="section-label" style={{ justifyContent: 'center' }}>Between the Layers</div>
          <h2 className="flavors-sub-heading">
            Filling <span className="heading-accent">Options</span>
          </h2>
          <p className="section-note">Add a delicious filling between your cake layers</p>
          <div className="fillings-grid">
            {FILLINGS.map((filling, i) => (
              <div key={i} className="filling-chip">{filling}</div>
            ))}
          </div>
        </section>

        {/* Popular Combinations */}
        <section className="combos-section">
          <div className="section-label" style={{ justifyContent: 'center' }}>Fan Favorites</div>
          <h2 className="flavors-sub-heading">
            Popular <span className="heading-accent">Combinations</span>
          </h2>
          <div className="combos-grid">
            {COMBOS.map((combo, i) => (
              <div key={i} className="combo-card card">
                <h3>{combo.name}</h3>
                <div className="combo-details">
                  <div className="combo-row"><span className="combo-label">Cake</span><span>{combo.cake}</span></div>
                  <div className="combo-row"><span className="combo-label">Frosting</span><span>{combo.frosting}</span></div>
                  <div className="combo-row"><span className="combo-label">Filling</span><span>{combo.filling}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Requests CTA */}
        <div className="flavors-cta">
          <div style={{ fontSize: 32, marginBottom: 12 }}>🌟</div>
          <h3>Don't see what you're looking for?</h3>
          <p>
            We're happy to accommodate special flavor requests!
            Contact us to discuss your custom flavor combination.
          </p>
          <Link to="/contact" className="btn-primary">Get in Touch 📩</Link>
        </div>

      </div>
    </div>
  );
}

export default Flavors;
