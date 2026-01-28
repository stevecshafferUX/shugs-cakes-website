import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import './Gallery.css';

// Gallery categories with their images
const galleryData = {
  '3d-cakes': {
    title: '3D Cakes',
    description: 'Stunning sculptured cakes that bring your vision to life',
    images: [
      '/gallery/3d-cakes/IMG_0142.JPG',
      '/gallery/3d-cakes/IMG_1207.jpeg',
      '/gallery/3d-cakes/IMG_1736.jpg',
      '/gallery/3d-cakes/IMG_1890.jpeg',
      '/gallery/3d-cakes/IMG_2230.JPG',
      '/gallery/3d-cakes/IMG_2294.jpeg',
      '/gallery/3d-cakes/IMG_3074.jpeg',
      '/gallery/3d-cakes/IMG_3830.jpeg',
      '/gallery/3d-cakes/IMG_4486.jpeg',
      '/gallery/3d-cakes/IMG_4971.jpeg',
    ]
  },
  'anniversary': {
    title: 'Anniversary Cakes',
    description: 'Celebrate years of love with a beautiful custom cake',
    images: [
      '/gallery/anniversary/IMG_0549.JPG',
      '/gallery/anniversary/IMG_1453.JPG',
      '/gallery/anniversary/IMG_1739.JPG',
      '/gallery/anniversary/IMG_3632.jpeg',
      '/gallery/anniversary/IMG_4371.jpeg',
    ]
  },
  'birthdays': {
    title: 'Birthday Cakes',
    description: 'Custom birthday cakes for all ages and themes',
    images: [
      '/gallery/birthdays/IMG_2440.jpeg',
      '/gallery/birthdays/IMG_2595.jpeg',
      '/gallery/birthdays/IMG_4993.jpeg',
      '/gallery/birthdays/IMG_5075.jpeg',
      '/gallery/birthdays/IMG_5500.jpeg',
      '/gallery/birthdays/IMG_5993.jpeg',
      '/gallery/birthdays/IMG_6749.jpeg',
      '/gallery/birthdays/IMG_6867.jpeg',
      '/gallery/birthdays/IMG_7154.jpeg',
      '/gallery/birthdays/IMG_7168.jpeg',
    ]
  },
  'bridal-shower': {
    title: 'Bridal Shower & Engagement Cakes',
    description: 'Beautiful cakes for celebrating love and upcoming nuptials',
    images: [
      '/gallery/bridal-shower/IMG_0392.JPG',
      '/gallery/bridal-shower/IMG_2576.JPG',
      '/gallery/bridal-shower/IMG_3149.jpeg',
      '/gallery/bridal-shower/IMG_3296.jpeg',
      '/gallery/bridal-shower/IMG_4928.jpeg',
      '/gallery/bridal-shower/IMG_6061.jpeg',
      '/gallery/bridal-shower/IMG_6145.jpeg',
      '/gallery/bridal-shower/IMG_6427.jpeg',
      '/gallery/bridal-shower/IMG_6438.jpeg',
      '/gallery/bridal-shower/IMG_6728.jpeg',
    ]
  },
  'cookies': {
    title: 'Cookies',
    description: 'Delicious decorated cookies for any occasion',
    images: [
      '/gallery/cookies/IMG_4478.jpeg',
      '/gallery/cookies/IMG_5142.jpeg',
      '/gallery/cookies/IMG_5450.jpeg',
      '/gallery/cookies/IMG_5836.jpeg',
      '/gallery/cookies/IMG_5861.jpeg',
      '/gallery/cookies/IMG_6032.jpeg',
      '/gallery/cookies/IMG_6057.jpeg',
      '/gallery/cookies/IMG_6084.jpeg',
      '/gallery/cookies/IMG_6953.jpeg',
      '/gallery/cookies/IMG_7151.jpeg',
    ]
  },
  'cupcakes': {
    title: 'Cupcakes',
    description: 'Perfect treats for parties and events',
    images: [
      '/gallery/cupcakes/IMG_1425.jpg',
      '/gallery/cupcakes/IMG_2798.jpeg',
      '/gallery/cupcakes/IMG_3620.jpeg',
      '/gallery/cupcakes/IMG_4164.jpeg',
      '/gallery/cupcakes/IMG_4165.jpeg',
      '/gallery/cupcakes/IMG_4310.jpeg',
      '/gallery/cupcakes/IMG_4759.jpeg',
      '/gallery/cupcakes/IMG_5034.jpeg',
      '/gallery/cupcakes/IMG_5437.jpeg',
      '/gallery/cupcakes/IMG_6442.jpeg',
    ]
  },
  'first-birthday': {
    title: '1st Birthday Cakes',
    description: "Adorable cakes for celebrating baby's first year",
    images: [
      '/gallery/first-birthday/IMG_2464.jpeg',
      '/gallery/first-birthday/IMG_2964.jpeg',
      '/gallery/first-birthday/IMG_3530.jpeg',
      '/gallery/first-birthday/IMG_4700.jpeg',
      '/gallery/first-birthday/IMG_5229.jpeg',
      '/gallery/first-birthday/IMG_5402.jpeg',
      '/gallery/first-birthday/IMG_5832.jpeg',
      '/gallery/first-birthday/IMG_6286.jpeg',
    ]
  },
  'fun-cakes': {
    title: 'Fun Cakes',
    description: 'Creative and whimsical cake designs',
    images: [
      '/gallery/fun-cakes/IMG_1216.jpeg',
      '/gallery/fun-cakes/IMG_2505.JPG',
      '/gallery/fun-cakes/IMG_2772.jpeg',
      '/gallery/fun-cakes/IMG_2852.jpeg',
      '/gallery/fun-cakes/IMG_4457.jpeg',
      '/gallery/fun-cakes/IMG_5853.jpeg',
      '/gallery/fun-cakes/IMG_5886.jpeg',
      '/gallery/fun-cakes/IMG_6270.jpeg',
      '/gallery/fun-cakes/IMG_6648.jpeg',
      '/gallery/fun-cakes/IMG_7141.jpeg',
    ]
  },
  'graduation': {
    title: 'Graduation Cakes',
    description: 'Celebrating academic achievements',
    images: [
      '/gallery/graduation/IMG_1445.jpg',
      '/gallery/graduation/IMG_2435.jpeg',
      '/gallery/graduation/IMG_2882.jpeg',
      '/gallery/graduation/IMG_2903.jpeg',
      '/gallery/graduation/IMG_2961.jpeg',
      '/gallery/graduation/IMG_3645.jpeg',
      '/gallery/graduation/IMG_3662.jpeg',
      '/gallery/graduation/IMG_4878.jpeg',
      '/gallery/graduation/IMG_4968.jpeg',
      '/gallery/graduation/IMG_5829.jpeg',
    ]
  },
  'holiday': {
    title: 'Holiday Cakes',
    description: 'Festive cakes for every holiday celebration',
    images: [
      '/gallery/holiday/IMG_2575.jpeg',
      '/gallery/holiday/IMG_2787.JPG',
      '/gallery/holiday/IMG_3180.jpeg',
      '/gallery/holiday/IMG_3216.jpeg',
      '/gallery/holiday/IMG_4064.jpeg',
      '/gallery/holiday/IMG_5239.jpeg',
    ]
  },
  'kids-birthday': {
    title: 'Kids Birthday Cakes',
    description: 'Fun birthday cakes for kids of all ages',
    images: [
      '/gallery/kids-birthday/IMG_1578.jpeg',
      '/gallery/kids-birthday/IMG_3547.jpeg',
      '/gallery/kids-birthday/IMG_5318.jpeg',
      '/gallery/kids-birthday/IMG_5597.jpeg',
      '/gallery/kids-birthday/IMG_5811.jpeg',
      '/gallery/kids-birthday/IMG_6367.jpeg',
      '/gallery/kids-birthday/IMG_6532.jpeg',
      '/gallery/kids-birthday/IMG_7048.jpeg',
      '/gallery/kids-birthday/IMG_7127.jpeg',
      '/gallery/kids-birthday/IMG_7215.jpeg',
    ]
  },
  'religious': {
    title: 'Religious Cakes',
    description: 'Cakes for baptisms, confirmations, and religious celebrations',
    images: [
      '/gallery/religious/F12744E2-FA30-437E-9E90-8FAEFCF3ACCE-2750-000004CD5465305D.jpeg',
      '/gallery/religious/IMG_1378.jpg',
      '/gallery/religious/IMG_2043.JPG',
      '/gallery/religious/IMG_2442.JPG',
      '/gallery/religious/IMG_2445.JPG',
      '/gallery/religious/IMG_5104.jpeg',
      '/gallery/religious/IMG_6161.jpeg',
    ]
  },
  'smash-cakes': {
    title: 'Smash Cakes',
    description: 'Perfect little cakes for birthday photo sessions',
    images: [
      '/gallery/smash-cakes/IMG_1385.jpg',
      '/gallery/smash-cakes/IMG_1923.jpeg',
      '/gallery/smash-cakes/IMG_2981.jpeg',
      '/gallery/smash-cakes/IMG_3916.jpeg',
      '/gallery/smash-cakes/IMG_5552.jpeg',
      '/gallery/smash-cakes/IMG_5904.jpeg',
      '/gallery/smash-cakes/IMG_6883.jpeg',
      '/gallery/smash-cakes/IMG_6945.jpeg',
      '/gallery/smash-cakes/IMG_7103.jpeg',
    ]
  }
};

// Category order for navigation
const categoryOrder = [
  'birthdays',
  'kids-birthday',
  'first-birthday',
  'smash-cakes',
  'graduation',
  'bridal-shower',
  'anniversary',
  'religious',
  'holiday',
  'fun-cakes',
  '3d-cakes',
  'cupcakes',
  'cookies',
];

function Gallery() {
  const { category } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const currentCategory = galleryData[category] || galleryData['birthdays'];
  const images = currentCategory?.images || [];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>{currentCategory.title}</h1>
        <p>{currentCategory.description}</p>
      </div>

      <div className="gallery-container">
        {/* Image Grid */}
        {images.length > 0 ? (
          <div className="gallery-grid">
            {images.map((image, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image}
                  alt={`${currentCategory.title} ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="gallery-notice">
            <h3>No Images Available</h3>
            <p>Check back soon for photos in this category!</p>
          </div>
        )}

        {/* Category Navigation */}
        <div className="category-navigation">
          <h3>Browse Categories</h3>
          <div className="category-grid">
            {categoryOrder.map((key) => (
              <Link
                key={key}
                to={`/gallery/${key}`}
                className={`category-link ${category === key ? 'active' : ''}`}
              >
                {galleryData[key].title}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="gallery-cta">
          <h3>Ready to Order Your Custom Cake?</h3>
          <p>Let's bring your vision to life!</p>
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
            <img src={selectedImage} alt="Full size" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
