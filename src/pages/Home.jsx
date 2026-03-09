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

function HeroCakeGraphic() {
  return (
    <div className="cake-graphic">
      {/* Background blobs */}
      <div className="cake-blob cake-blob-1" />
      <div className="cake-blob cake-blob-2" />
      <div className="cake-blob cake-blob-3" />

      {/* Orbiting rings */}
      <div className="cake-ring cake-ring-1" />
      <div className="cake-ring cake-ring-2" />

      {/* ── Animated Piping Bag ── */}
      <svg className="deco-piping-bag" viewBox="0 0 80 175" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Twisted knot at top */}
        <ellipse cx="40" cy="13" rx="11" ry="7" fill="#9D174D"/>
        <path d="M29 13 Q35 6 40 10 Q45 6 51 13 Q45 10 40 12 Q35 10 29 13Z" fill="#7C1230" opacity="0.7"/>
        {/* Gather band */}
        <ellipse cx="40" cy="27" rx="19" ry="8" fill="#EC4899"/>
        {/* Bag body */}
        <path d="M21 27 Q7 78 37 140 Q38.5 143 40 144 Q41.5 143 43 140 Q73 78 59 27 Q51 21 40 19 Q29 21 21 27Z" fill="#F472B6"/>
        {/* Highlight sheen */}
        <path d="M29 33 Q21 74 30 122" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.28" fill="none"/>
        {/* Metal coupler */}
        <ellipse cx="40" cy="144" rx="9" ry="5" fill="#D1D5DB"/>
        <ellipse cx="40" cy="142" rx="7" ry="3.5" fill="#E5E7EB"/>
        {/* Star tip */}
        <path d="M34 147 L37 152 L40 155 L43 152 L46 147 L40 149 Z" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.8"/>
        <line x1="40" y1="147" x2="40" y2="155" stroke="#9CA3AF" strokeWidth="0.8"/>
        <line x1="34" y1="149" x2="46" y2="153" stroke="#9CA3AF" strokeWidth="0.5"/>
        <line x1="46" y1="149" x2="34" y2="153" stroke="#9CA3AF" strokeWidth="0.5"/>
        {/* Frosting rosette being piped */}
        <path d="M40 155 Q46 161 41 166 Q36 161 40 155Z" fill="white" opacity="0.9"/>
        <path d="M40 158 Q45 165 40 170 Q35 165 40 158Z" fill="white" opacity="0.75"/>
        <circle cx="40" cy="163" r="3.5" fill="white" opacity="0.6"/>
      </svg>

      {/* ── Animated Stand Mixer ── */}
      <svg className="deco-mixer" viewBox="0 0 110 132" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Drop shadow */}
        <ellipse cx="56" cy="126" rx="33" ry="5" fill="rgba(80,7,36,0.12)"/>
        {/* Bowl */}
        <path d="M22 93 Q22 118 56 118 Q90 118 90 93 Z" fill="#FBCFE8"/>
        <ellipse cx="56" cy="93" rx="34" ry="10" fill="#F9A8D4"/>
        {/* Bowl rim highlight */}
        <path d="M28 98 Q28 112 56 112" stroke="white" strokeWidth="2.5" fill="none" opacity="0.4" strokeLinecap="round"/>
        {/* Bowl handle */}
        <path d="M90 100 Q100 100 100 106 Q100 112 90 112" stroke="#F9A8D4" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* Stand column */}
        <rect x="50" y="63" width="13" height="34" rx="5" fill="#EC4899"/>
        {/* Mixer head */}
        <rect x="22" y="10" width="64" height="50" rx="16" fill="#EC4899"/>
        {/* Head top shine */}
        <path d="M30 17 Q30 13 56 13 Q78 13 82 21" stroke="white" strokeWidth="2" fill="none" opacity="0.22" strokeLinecap="round"/>
        {/* Speed knob */}
        <circle cx="76" cy="35" r="9" fill="#BE185D"/>
        <circle cx="76" cy="35" r="5.5" fill="#9D174D"/>
        <line x1="76" y1="29" x2="76" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        {/* Brand S */}
        <text x="41" y="42" fontFamily="Georgia, serif" fontSize="15" fontWeight="900" fill="white" opacity="0.3">S</text>
        {/* Mixer arm */}
        <path d="M38 58 Q27 71 31 86 Q34 95 50 97" stroke="#BE185D" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <path d="M38 58 Q27 71 31 86 Q34 95 50 97" stroke="#F9A8D4" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.45"/>
        {/* Whisk — spins via CSS */}
        <g className="mixer-whisk">
          <line x1="56" y1="97" x2="56" y2="76" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="56" y1="97" x2="65" y2="79" stroke="#BE185D" strokeWidth="2" strokeLinecap="round"/>
          <line x1="56" y1="97" x2="47" y2="79" stroke="#BE185D" strokeWidth="2" strokeLinecap="round"/>
          <line x1="56" y1="97" x2="66" y2="90" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="56" y1="97" x2="46" y2="90" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        {/* Batter swirl */}
        <path d="M43 108 Q50 103 56 108 Q62 103 69 108" stroke="#F472B6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55"/>
      </svg>

      {/* Floating confetti dots */}
      {[
        { cx: '15%', cy: '18%', r: 6, delay: '0s',   dur: '4.2s', color: '#F9A8D4' },
        { cx: '82%', cy: '22%', r: 4, delay: '0.7s', dur: '3.8s', color: '#FCD34D' },
        { cx: '10%', cy: '65%', r: 5, delay: '1.1s', dur: '5s',   color: '#A78BFA' },
        { cx: '88%', cy: '58%', r: 7, delay: '0.3s', dur: '4.6s', color: '#6EE7B7' },
        { cx: '50%', cy: '8%',  r: 4, delay: '1.8s', dur: '3.5s', color: '#FCA5A5' },
        { cx: '70%', cy: '80%', r: 5, delay: '0.9s', dur: '4.9s', color: '#F9A8D4' },
        { cx: '25%', cy: '88%', r: 4, delay: '1.4s', dur: '4.3s', color: '#FCD34D' },
        { cx: '92%', cy: '38%', r: 3, delay: '2.1s', dur: '3.7s', color: '#A78BFA' },
      ].map((p, i) => (
        <div key={i} className="cake-particle" style={{
          left: p.cx, top: p.cy,
          width: p.r * 2, height: p.r * 2,
          background: p.color,
          animationDuration: p.dur,
          animationDelay: p.delay,
        }} />
      ))}

      {/* Floating sparkle stars */}
      {[
        { x: '20%', y: '30%', delay: '0s',   size: 18 },
        { x: '75%', y: '15%', delay: '1.2s', size: 14 },
        { x: '85%', y: '70%', delay: '0.5s', size: 16 },
        { x: '12%', y: '50%', delay: '1.8s', size: 12 },
        { x: '55%', y: '85%', delay: '0.8s', size: 10 },
      ].map((s, i) => (
        <svg key={i} className="cake-sparkle" style={{ left: s.x, top: s.y, width: s.size, height: s.size, animationDelay: s.delay }} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="#FCD34D" opacity="0.9"/>
        </svg>
      ))}

      {/* Real cake photo */}
      <img src="/cake-hero.png" className="hero-cake-img" alt="Shug's custom celebration cake" />

      {/* Floating label bubbles */}
      <div className="cake-label cake-label-1"><span>🧈</span> Real Butter</div>
      <div className="cake-label cake-label-2"><span>✨</span> Handcrafted</div>
      <div className="cake-label cake-label-3"><span>🌸</span> Made Fresh</div>
    </div>
  );
}

function Home() {
  return (
    <div className="home-page">

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero">
        <div className="hero-motion-panel">
          <HeroCakeGraphic />
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
