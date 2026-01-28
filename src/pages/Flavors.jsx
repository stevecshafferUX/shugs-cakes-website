import './Flavors.css';

function Flavors() {
  const cakeFlavors = [
    { name: 'Classic Vanilla', description: 'Light and fluffy vanilla cake made with real vanilla extract' },
    { name: 'Rich Chocolate', description: 'Decadent chocolate cake with deep cocoa flavor' },
    { name: 'Red Velvet', description: 'Classic red velvet with a hint of cocoa' },
    { name: 'Marble', description: 'Perfect blend of vanilla and chocolate swirled together' },
    { name: 'Lemon', description: 'Fresh lemon cake with a light citrus flavor' },
    { name: 'Strawberry', description: 'Moist strawberry cake with real strawberry flavor' },
    { name: 'Funfetti', description: 'Vanilla cake loaded with colorful sprinkles' },
    { name: 'Carrot Cake', description: 'Spiced carrot cake with walnuts and pineapple' },
    { name: 'Cookies & Cream', description: 'Vanilla cake with crushed Oreo cookies' },
    { name: 'Almond', description: 'Delicate almond-flavored cake' },
    { name: 'Coconut', description: 'Tropical coconut cake with coconut flakes' },
    { name: 'Banana', description: 'Moist banana cake with real banana' },
  ];

  const frostingFlavors = [
    { name: 'Vanilla Buttercream', description: 'Smooth and creamy vanilla buttercream made with real butter' },
    { name: 'Chocolate Buttercream', description: 'Rich chocolate buttercream' },
    { name: 'Cream Cheese', description: 'Tangy cream cheese frosting - perfect for red velvet and carrot cake' },
    { name: 'Strawberry Buttercream', description: 'Sweet strawberry-flavored buttercream' },
    { name: 'Lemon Buttercream', description: 'Zesty lemon buttercream' },
    { name: 'Almond Buttercream', description: 'Buttercream with almond extract' },
    { name: 'Cookies & Cream', description: 'Vanilla buttercream with crushed Oreos' },
    { name: 'Peanut Butter', description: 'Creamy peanut butter frosting' },
    { name: 'Mocha', description: 'Coffee and chocolate flavored buttercream' },
    { name: 'Coconut', description: 'Coconut-flavored buttercream' },
  ];

  const fillings = [
    'Strawberry',
    'Raspberry',
    'Lemon Curd',
    'Chocolate Ganache',
    'Bavarian Cream',
    'Caramel',
    'Cream Cheese',
    'Fruit Preserves',
  ];

  return (
    <div className="flavors-page">
      <div className="flavors-header">
        <h1>Cake Flavors</h1>
        <p>All our cakes are made from scratch with real ingredients</p>
      </div>

      <div className="flavors-container">
        <div className="flavors-intro">
          <p>
            We believe cakes should taste as good as they look! All our cakes are made from scratch
            using real butter, fresh ingredients, and no artificial flavors. Mix and match your
            favorite cake flavor, frosting, and filling to create your perfect custom cake.
          </p>
        </div>

        <section className="flavor-section">
          <h2>Cake Flavors</h2>
          <div className="flavor-grid">
            {cakeFlavors.map((flavor, index) => (
              <div key={index} className="flavor-card">
                <h3>{flavor.name}</h3>
                <p>{flavor.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flavor-section">
          <h2>Frosting Flavors</h2>
          <p className="section-note">All buttercream frostings are made with real butter</p>
          <div className="flavor-grid">
            {frostingFlavors.map((frosting, index) => (
              <div key={index} className="flavor-card">
                <h3>{frosting.name}</h3>
                <p>{frosting.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flavor-section">
          <h2>Fillings</h2>
          <p className="section-note">Add a delicious filling between your cake layers</p>
          <div className="fillings-list">
            {fillings.map((filling, index) => (
              <div key={index} className="filling-item">
                {filling}
              </div>
            ))}
          </div>
        </section>

        <section className="popular-combos">
          <h2>Popular Combinations</h2>
          <div className="combo-grid">
            <div className="combo-card">
              <h3>Classic Birthday</h3>
              <p><strong>Cake:</strong> Funfetti</p>
              <p><strong>Frosting:</strong> Vanilla Buttercream</p>
              <p><strong>Filling:</strong> Strawberry</p>
            </div>
            <div className="combo-card">
              <h3>Chocolate Lovers</h3>
              <p><strong>Cake:</strong> Rich Chocolate</p>
              <p><strong>Frosting:</strong> Chocolate Buttercream</p>
              <p><strong>Filling:</strong> Chocolate Ganache</p>
            </div>
            <div className="combo-card">
              <h3>Southern Classic</h3>
              <p><strong>Cake:</strong> Red Velvet</p>
              <p><strong>Frosting:</strong> Cream Cheese</p>
              <p><strong>Filling:</strong> Cream Cheese</p>
            </div>
            <div className="combo-card">
              <h3>Cookies & Cream Dream</h3>
              <p><strong>Cake:</strong> Cookies & Cream</p>
              <p><strong>Frosting:</strong> Cookies & Cream</p>
              <p><strong>Filling:</strong> Bavarian Cream</p>
            </div>
          </div>
        </section>

        <div className="flavors-note">
          <h3>Custom Requests</h3>
          <p>
            Don't see what you're looking for? We're happy to accommodate special flavor requests!
            Contact us to discuss your custom flavor combination.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Flavors;
