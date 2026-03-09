import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const GALLERY_LINKS = [
  ['/gallery/birthdays', 'Birthday Cakes'],
  ['/gallery/kids-birthday', 'Kids Birthday Cakes'],
  ['/gallery/first-birthday', '1st Birthday Cakes'],
  ['/gallery/smash-cakes', 'Smash Cakes'],
  ['/gallery/graduation', 'Graduation Cakes'],
  ['/gallery/bridal-shower', 'Bridal Shower & Engagement'],
  ['/gallery/anniversary', 'Anniversary Cakes'],
  ['/gallery/religious', 'Religious Cakes'],
  ['/gallery/holiday', 'Holiday Cakes'],
  ['/gallery/fun-cakes', 'Fun Cakes'],
  ['/gallery/3d-cakes', '3D Cakes'],
  ['/gallery/cupcakes', 'Cupcakes'],
  ['/gallery/cookies', 'Cookies'],
];

function Header() {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: scrolled ? '#7D3F5E' : '#7D3F5E',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '30px',
    transition: 'all 0.2s',
    textDecoration: 'none',
    backgroundColor: isActive(path) ? '#FFF0F5' : 'transparent',
  });

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255, 245, 247, 0.94)' : 'rgba(255, 251, 252, 0.90)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid #FFD6E7' : '1px solid rgba(255,214,231,0.4)',
        transition: 'all 0.3s ease',
        padding: '0 24px',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B8A, #BE185D)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, boxShadow: '0 4px 12px rgba(190,24,93,0.3)',
          }}>
            🎂
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: '#BE185D', lineHeight: 1, fontStyle: 'italic' }}>
              Shug's
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#C48BA0', textTransform: 'uppercase' }}>
              Cakes
            </div>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#BE185D', padding: 8 }}
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center" style={{ gap: 4 }}>
          <Link to="/" style={navLinkStyle('/')}
            onMouseEnter={e => { e.currentTarget.style.color = '#BE185D'; e.currentTarget.style.backgroundColor = '#FFF0F5'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#7D3F5E'; e.currentTarget.style.backgroundColor = isActive('/') ? '#FFF0F5' : 'transparent'; }}
          >Welcome</Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link to="/gallery" style={{ ...navLinkStyle('/gallery'), display: 'flex', alignItems: 'center', gap: 4 }}
                onMouseEnter={e => { e.currentTarget.style.color = '#BE185D'; e.currentTarget.style.backgroundColor = '#FFF0F5'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#7D3F5E'; e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                Cake Gallery
                <ChevronDown style={{ width: 12, height: 12 }} />
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              {GALLERY_LINKS.map(([to, label]) => (
                <DropdownMenuItem key={to} asChild>
                  <Link to={to} className="cursor-pointer">{label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/pricing" style={navLinkStyle('/pricing')}
            onMouseEnter={e => { e.currentTarget.style.color = '#BE185D'; e.currentTarget.style.backgroundColor = '#FFF0F5'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#7D3F5E'; e.currentTarget.style.backgroundColor = isActive('/pricing') ? '#FFF0F5' : 'transparent'; }}
          >Pricing</Link>

          <Link to="/flavors" style={navLinkStyle('/flavors')}
            onMouseEnter={e => { e.currentTarget.style.color = '#BE185D'; e.currentTarget.style.backgroundColor = '#FFF0F5'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#7D3F5E'; e.currentTarget.style.backgroundColor = isActive('/flavors') ? '#FFF0F5' : 'transparent'; }}
          >Cake Flavors</Link>

          <Link to="/contact" style={navLinkStyle('/contact')}
            onMouseEnter={e => { e.currentTarget.style.color = '#BE185D'; e.currentTarget.style.backgroundColor = '#FFF0F5'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#7D3F5E'; e.currentTarget.style.backgroundColor = isActive('/contact') ? '#FFF0F5' : 'transparent'; }}
          >Contact</Link>

          <Link
            to="/order"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: 'white',
              background: 'linear-gradient(135deg, #EC4899, #BE185D)',
              padding: '10px 22px',
              borderRadius: 50,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(190,24,93,0.3)',
              transition: 'all 0.25s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginLeft: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(190,24,93,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(190,24,93,0.3)'; }}
          >
            Order Now 🎀
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#7D3F5E', padding: '8px 12px', borderRadius: 30, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600 }}>
                  <User style={{ width: 14, height: 14 }} />
                  {user.user_metadata?.full_name?.split(' ')[0] || 'Account'}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/my-orders" className="cursor-pointer">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" className="cursor-pointer">Account Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                  <LogOut style={{ width: 14, height: 14, marginRight: 8 }} />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#BE185D',
              border: '2px solid #FFB3CE',
              padding: '7px 16px',
              borderRadius: 30,
              textDecoration: 'none',
              transition: 'all 0.2s',
              marginLeft: 4,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FFF0F5'; e.currentTarget.style.borderColor = '#BE185D'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#FFB3CE'; }}
            >Login</Link>
          )}
        </nav>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div
            className="absolute md:hidden"
            style={{
              top: 72, left: 0, right: 0,
              background: 'rgba(255, 245, 247, 0.98)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid #FFD6E7',
            }}
          >
            <nav style={{ maxWidth: 1160, margin: '0 auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[['/', 'Welcome'], ['/pricing', 'Pricing'], ['/flavors', 'Cake Flavors'], ['/contact', 'Contact']].map(([to, label]) => (
                <Link key={to} to={to}
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: '#7D3F5E', padding: '10px 16px', borderRadius: 12, textDecoration: 'none' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <Link to="/gallery" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: '#7D3F5E', padding: '10px 16px', borderRadius: 12, textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
                Cake Gallery
              </Link>
              <div style={{ paddingLeft: 32, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {GALLERY_LINKS.map(([to, label]) => (
                  <Link key={to} to={to}
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500, color: '#C48BA0', padding: '6px 8px', textDecoration: 'none' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <Link to="/order"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: 'white', background: 'linear-gradient(135deg, #EC4899, #BE185D)', padding: '14px 24px', borderRadius: 50, textDecoration: 'none', textAlign: 'center', marginTop: 8 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Order Now 🎀
              </Link>

              {user ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 12, borderTop: '1px solid #FFD6E7', marginTop: 8 }}>
                    <User style={{ width: 14, height: 14, color: '#BE185D' }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#7D3F5E' }}>
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>
                  <Link to="/my-orders" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: '#7D3F5E', padding: '8px 16px', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
                  <button onClick={() => { signOut(); setMobileMenuOpen(false); }}
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: '#BE185D', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <LogOut style={{ width: 12, height: 12 }} /> Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: '#BE185D', textAlign: 'center', padding: '10px', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
