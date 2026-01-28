import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Shug's Cakes</h1>
          <p className="tagline">Homemade with Love</p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>About Shug's Cakes</h2>
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
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Order?</h2>
          <p>Browse our gallery for inspiration or contact us to discuss your custom cake design.</p>
          <div className="cta-buttons">
            <Link to="/gallery/birthday" className="cta-button primary">
              View Gallery
            </Link>
            <Link to="/order" className="cta-button secondary">
              Order Now
            </Link>
            <Link to="/contact" className="cta-button">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-grid">
          <div className="info-card">
            <h3>Custom Orders Only</h3>
            <p>
              We operate from a commercial bakery and only fill custom orders.
              Each cake is made specifically for you!
            </p>
          </div>
          <div className="info-card">
            <h3>Pickup Hours</h3>
            <p>
              <strong>Weekends:</strong> 7:00am - 10:00am<br />
              <strong>Weekdays:</strong> 7:00am - 6:00pm
            </p>
          </div>
          <div className="info-card">
            <h3>Location</h3>
            <p>
              Avon, IN 46123<br />
              Directions provided upon ordering
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
