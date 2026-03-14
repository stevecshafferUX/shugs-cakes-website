import './FontPreview.css';

const fonts = [
  { name: 'DM Sans',           family: 'DM Sans',           desc: 'Clean, geometric, modern' },
  { name: 'Nunito',            family: 'Nunito',            desc: 'Rounded, warm, friendly' },
  { name: 'Josefin Sans',      family: 'Josefin Sans',      desc: 'Elegant, thin, high-fashion' },
  { name: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans', desc: 'Modern, slightly rounded' },
  { name: 'Quicksand',         family: 'Quicksand',         desc: 'Soft, playful, rounded' },
  { name: 'Raleway',           family: 'Raleway',           desc: 'Art Deco, elegant, thin' },
  { name: 'Poppins',           family: 'Poppins',           desc: 'Geometric, balanced' },
  { name: 'Mulish',            family: 'Mulish',            desc: 'Minimalist, low contrast' },
  { name: 'Lato',              family: 'Lato',              desc: 'Humanist, warm, approachable' },
  { name: 'Figtree',           family: 'Figtree',           desc: 'Fresh, geometric, boutique' },
];

function FontPreview() {
  return (
    <div className="fp-page">
      <div className="fp-inner">
        <h1 className="fp-title">Font Preview</h1>
        <p className="fp-subtitle">Shug&rsquo;s Cakes &mdash; 10 sans-serif options</p>

        {fonts.map((font, i) => (
          <div key={font.name} className="fp-card">
            <div className="fp-meta">
              <span className="fp-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="fp-name">{font.name}</span>
              <span className="fp-desc">&mdash; {font.desc}</span>
            </div>
            <p className="fp-brand"    style={{ fontFamily: `'${font.family}', sans-serif` }}>Shug&rsquo;s Cakes</p>
            <p className="fp-tagline"  style={{ fontFamily: `'${font.family}', sans-serif` }}>Custom celebration cakes baked fresh for every occasion</p>
            <p className="fp-nav"      style={{ fontFamily: `'${font.family}', sans-serif` }}>Order Now &nbsp;&middot;&nbsp; View Gallery &nbsp;&middot;&nbsp; Contact Us</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FontPreview;
