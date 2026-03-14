import { Link } from 'react-router-dom';
import './Home.css';

const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_BODY = "'Outfit', sans-serif";

const STATS = [
  { num: '8+', label: 'Years Baking' },
  { num: '3,000+', label: 'Cakes Made' },
  { num: '100%', label: 'Made From Scratch' },
  { num: '5★', label: 'Rated on Facebook' },
];

const REVIEWS = [
  {
    name: 'Sarah M.',
    text: 'The wedding cake was absolutely stunning. Three tiers of perfection — it looked like art and tasted even better!',
    stars: 5,
    occasion: 'Wedding',
  },
  {
    name: 'Marcus T.',
    text: 'Ordered my daughter\'s birthday cake and she was speechless. Everyone asked where we got it. Will absolutely order again!',
    stars: 5,
    occasion: 'Birthday',
  },
  {
    name: 'Jennifer K.',
    text: 'I\'ve ordered for three office events now and everyone always asks about the cake first. The flavors are incredible!',
    stars: 5,
    occasion: 'Corporate',
  },
  {
    name: 'David R.',
    text: 'Needed an anniversary cake with short notice. Shug\'s came through beautifully. Highly recommend!',
    stars: 5,
    occasion: 'Anniversary',
  },
];

function Home() {
  return (
    <div className="home-page">

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero">
        <div className="hero-image-panel">
          <img
            src="https://placehold.co/800x900/fce7f3/be185d?text=Cake+Photo"
            alt="Placeholder cake photo"
            className="hero-photo"
          />
        </div>

        <div className="hero-text-panel">
          {/* Floating decoration dots */}
          {[[85,15],[8,75],[90,60],[50,90]].map(([l,t],i) => (
            <div key={i} className="hero-dot" style={{
              left: `${l}%`, top: `${t}%`,
              width: [14,18,12,8][i], height: [14,18,12,8][i],
              animationDuration: `${[7,6,8,5.5][i]}s`,
              animationDelay: `${[1.5,0.8,2.2,0.4][i]}s`,
              opacity: [0.3,0.2,0.35,0.25][i],
            }} />
          ))}

          <p className="hero-eyebrow fade-up">Est. 2016 · Avon, Indiana</p>
          <h1 className="fade-up-delay-1">
            Cakes Made{' '}
            <span className="hero-italic-accent">with Love</span>
          </h1>
          <p className="tagline fade-up-delay-2">Custom celebration cakes baked fresh for every occasion</p>

          <div className="hero-actions fade-up-delay-3">
            <Link to="/gallery" className="btn-primary">View Gallery 🎂</Link>
            <Link to="/order" className="btn-secondary">Order Now</Link>
          </div>

          {/* Trust badges */}
          <div className="hero-badges">
            {[
              { icon: '⭐', label: '5-star rated' },
              { icon: '🎂', label: 'Custom designs' },
              { icon: '🧈', label: 'Real butter always' },
            ].map((b, i) => (
              <div key={i} className="hero-badge">
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────── */}
      <div className="stats-strip">
        {STATS.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT ────────────────────────────── */}
      <section className="about-section">
        <div className="about-content">
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Story</div>
          <h2>About Shug's <span className="heading-accent">Cakes</span></h2>
          <div className="about-text">
            <p>
              Hi, I'm Chris! I started baking as a young girl and decided to make a business out of it.
              My love for decorating cakes began with my first job in high school at Baskin Robbins.
            </p>
            <p>
              I believe that cakes should taste as good as they look. That's why I focus on creating
              moist cakes with buttercream made from real butter. All our cakes, cupcakes, and other
              desserts are homemade with love and care.
            </p>
            <p>
              This business is named after my grandmother Helen, affectionately nicknamed "Shug."
              She was known for her warm hospitality and amazing cooking skills. She continues to
              be my inspiration in everything I create.
            </p>
          </div>
          <div className="about-values">
            {[
              { icon: '🧈', label: 'Real Butter Always' },
              { icon: '🥚', label: 'Fresh Ingredients' },
              { icon: '🌸', label: 'Hand-Decorated' },
              { icon: '📦', label: 'Made To Order' },
            ].map((v, i) => (
              <div key={i} className="value-chip">
                <span>{v.icon}</span>
                <span>{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────── */}
      <section className="reviews-section">
        <div className="reviews-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>What People Say</div>
          <h2 className="reviews-heading">Sweet <span className="heading-accent">Reviews</span></h2>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card card">
                <div className="review-stars">{'★★★★★'}</div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-footer">
                  <div className="review-name">{r.name}</div>
                  <span className="tag">{r.occasion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFO CARDS ───────────────────────── */}
      <section className="info-section">
        <div className="info-grid">
          <div className="info-card card">
            <div className="info-icon">🎂</div>
            <h3>Custom Orders Only</h3>
            <p>
              We operate from a commercial bakery and only fill custom orders.
              Each cake is made specifically for you!
            </p>
          </div>
          <div className="info-card card">
            <div className="info-icon">🕐</div>
            <h3>Pickup Hours</h3>
            <p>
              <strong>Weekends:</strong> 7:00am – 10:00am<br />
              <strong>Weekdays:</strong> 7:00am – 6:00pm
            </p>
          </div>
          <div className="info-card card">
            <div className="info-icon">📍</div>
            <h3>Location</h3>
            <p>
              Avon, IN 46123<br />
              Directions provided upon ordering
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────── */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <div style={{ fontSize: 40, marginBottom: 16 }}>🎂</div>
          <h2>Ready to Order?</h2>
          <p>Every cake is a celebration. Let's make yours unforgettable.</p>
          <div className="cta-buttons">
            <Link to="/order" className="cta-band-btn-primary">Start My Order 🎀</Link>
            <Link to="/flavors" className="cta-band-btn-outline">Browse Flavors</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
