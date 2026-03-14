const fonts = [
  { name: 'DM Sans',           family: "'DM Sans', sans-serif",           desc: 'Clean, geometric, modern' },
  { name: 'Nunito',            family: "'Nunito', sans-serif",            desc: 'Rounded, warm, friendly' },
  { name: 'Josefin Sans',      family: "'Josefin Sans', sans-serif",      desc: 'Elegant, thin, high-fashion' },
  { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif", desc: 'Modern, slightly rounded' },
  { name: 'Quicksand',         family: "'Quicksand', sans-serif",         desc: 'Soft, playful, rounded' },
  { name: 'Raleway',           family: "'Raleway', sans-serif",           desc: 'Art Deco, elegant, thin' },
  { name: 'Poppins',           family: "'Poppins', sans-serif",           desc: 'Geometric, balanced' },
  { name: 'Mulish',            family: "'Mulish', sans-serif",            desc: 'Minimalist, low contrast' },
  { name: 'Lato',              family: "'Lato', sans-serif",              desc: 'Humanist, warm, approachable' },
  { name: 'Figtree',           family: "'Figtree', sans-serif",           desc: 'Fresh, geometric, boutique' },
];

function FontPreview() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#2A1020', marginBottom: '0.25rem' }}>
          Font Preview
        </h1>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#9D174D', marginBottom: '3rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Shug's Cakes — 10 sans-serif options
        </p>

        {fonts.map((font, i) => (
          <div key={font.name} style={{
            borderBottom: '1px solid #FFD6E7',
            paddingBottom: '2rem',
            marginBottom: '2rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: '0.7rem', color: '#C48BA0', fontWeight: 700, minWidth: 20 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: 'sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#EC4899', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {font.name}
              </span>
              <span style={{ fontFamily: 'sans-serif', fontSize: '0.75rem', color: '#C48BA0' }}>
                — {font.desc}
              </span>
            </div>

            <p style={{ fontFamily: font.family, fontSize: '1.75rem', fontWeight: 700, color: '#2A1020', margin: '0 0 0.25rem 0', lineHeight: 1.2 }}>
              Shug's Cakes
            </p>
            <p style={{ fontFamily: font.family, fontSize: '1.1rem', fontWeight: 400, color: '#7D3F5E', margin: '0 0 0.5rem 0' }}>
              Custom celebration cakes baked fresh for every occasion
            </p>
            <p style={{ fontFamily: font.family, fontSize: '0.85rem', fontWeight: 500, color: '#EC4899', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Order Now &nbsp;·&nbsp; View Gallery &nbsp;·&nbsp; Contact Us
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FontPreview;
