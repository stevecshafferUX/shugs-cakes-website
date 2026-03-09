import { Link } from 'react-router-dom';
import './Gallery.css';

const galleryCategories = [
  { slug: 'birthdays', title: 'Birthday Cakes', description: 'Custom birthday cakes for all ages and themes', thumbnail: '/gallery/birthdays/IMG_5993.jpeg' },
  { slug: 'kids-birthday', title: 'Kids Birthday', description: 'Fun birthday cakes for kids of all ages', thumbnail: '/gallery/kids-birthday/IMG_7127.jpeg' },
  { slug: 'first-birthday', title: '1st Birthday', description: "Adorable cakes for baby's first year", thumbnail: '/gallery/first-birthday/IMG_5229.jpeg' },
  { slug: 'smash-cakes', title: 'Smash Cakes', description: 'Perfect for birthday photo sessions', thumbnail: '/gallery/smash-cakes/IMG_6883.jpeg' },
  { slug: 'graduation', title: 'Graduation', description: 'Celebrating academic achievements', thumbnail: '/gallery/graduation/IMG_3662.jpeg' },
  { slug: 'bridal-shower', title: 'Bridal & Engagement', description: 'Beautiful cakes for celebrating love', thumbnail: '/gallery/bridal-shower/IMG_6061.jpeg' },
  { slug: 'anniversary', title: 'Anniversary', description: 'Celebrate years of love', thumbnail: '/gallery/anniversary/IMG_4371.jpeg' },
  { slug: 'religious', title: 'Religious', description: 'Baptisms, confirmations, and celebrations', thumbnail: '/gallery/religious/IMG_6161.jpeg' },
  { slug: 'holiday', title: 'Holiday', description: 'Festive cakes for every season', thumbnail: '/gallery/holiday/IMG_3180.jpeg' },
  { slug: 'fun-cakes', title: 'Fun Cakes', description: 'Creative and whimsical designs', thumbnail: '/gallery/fun-cakes/IMG_6270.jpeg' },
  { slug: '3d-cakes', title: '3D Cakes', description: 'Stunning sculptured creations', thumbnail: '/gallery/3d-cakes/IMG_3074.jpeg' },
  { slug: 'cupcakes', title: 'Cupcakes', description: 'Perfect treats for parties', thumbnail: '/gallery/cupcakes/IMG_5034.jpeg' },
  { slug: 'cookies', title: 'Cookies', description: 'Delicious decorated cookies', thumbnail: '/gallery/cookies/IMG_5142.jpeg' },
];

function GalleryIndex() {
  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Cake Gallery</h1>
        <p>Browse our work by category — every cake is custom-made with love</p>
      </div>
      <div className="gallery-container">
        <div className="gallery-categories-grid">
          {galleryCategories.map((cat) => (
            <Link key={cat.slug} to={`/gallery/${cat.slug}`} className="gallery-category-card">
              <div className="gallery-category-thumb">
                <img src={cat.thumbnail} alt={cat.title} loading="lazy" />
              </div>
              <div className="gallery-category-info">
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="gallery-cta">
          <h3>Love what you see?</h3>
          <p>Every cake is custom-made. Let us create something special for you!</p>
          <div className="cta-buttons">
            <Link to="/order" className="btn-primary">Order Form</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryIndex;
