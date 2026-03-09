import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const T = {
  p200: '#FFB3CE',
  p300: '#FF8FAB',
  p400: '#FF6B8A',
  p700: '#BE185D',
  p800: '#9D174D',
  p900: '#500724',
};

const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_BODY = "'Outfit', sans-serif";

function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { to: '/', label: 'Welcome' },
    { to: '/gallery', label: 'Cake Gallery' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/flavors', label: 'Cake Flavors' },
    { to: '/contact', label: 'Contact' },
    { to: '/order', label: 'Order a Cake' },
  ];

  const contactItems = [
    { icon: '📍', text: 'Avon, Indiana 46123' },
    { icon: '📞', text: '(317) 373-8828' },
    { icon: '📩', text: 'shugscakes@gmail.com' },
    { icon: '🕐', text: 'By appointment' },
  ];

  const leadTimes = [
    ['Cupcakes & Cookies', '48 hours'],
    ['Sheet Cakes', '3–5 days'],
    ['Custom Cakes', '1+ week'],
    ['Wedding Cakes', '2–4 weeks'],
  ];

  return (
    <footer style={{ background: `linear-gradient(135deg, ${T.p800}, ${T.p900})`, padding: '60px 24px 32px', color: 'white' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 28, fontStyle: 'italic', color: 'white', marginBottom: 8 }}>
              Shug's Cakes
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.p200, lineHeight: 1.7, marginBottom: 20 }}>
              Custom cakes baked with love in Avon, Indiana. Serving Indianapolis and surrounding areas since 2016.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <a
                href="https://www.facebook.com/shugscakes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                style={{ color: T.p300, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = T.p300)}
              >
                <Facebook style={{ width: 18, height: 18 }} />
              </a>
              <a
                href="https://www.instagram.com/shugscakes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
                style={{ color: T.p300, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = T.p300)}
              >
                <Instagram style={{ width: 18, height: 18 }} />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: T.p300, marginBottom: 16 }}>
              Navigate
            </div>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} style={{ display: 'block', fontFamily: FONT_BODY, fontSize: 14, color: T.p200, marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = T.p200)}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: T.p300, marginBottom: 16 }}>
              Contact
            </div>
            {contactItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <span>{item.icon}</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.p200 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Lead Times */}
          <div>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: T.p300, marginBottom: 16 }}>
              Order Lead Times
            </div>
            {leadTimes.map(([type, time], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontFamily: FONT_BODY, fontSize: 13 }}>
                <span style={{ color: T.p200 }}>{type}</span>
                <span style={{ color: T.p300, fontWeight: 600 }}>{time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${T.p700}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: '#9D174D' }}>
            © 2016–{currentYear} Shug's Cakes — All Rights Reserved
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: '#9D174D' }}>
            Baked with 💕 in Indiana
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
