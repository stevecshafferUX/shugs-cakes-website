import { useState, useEffect } from 'react';

// Import all theme CSS as raw strings
import warmBakery from '../themes/warm-bakery.css?raw';
import roseGoldElegance from '../themes/rose-gold-elegance.css?raw';
import lavenderDream from '../themes/lavender-dream.css?raw';
import modernNoir from '../themes/modern-noir.css?raw';
import gardenParty from '../themes/garden-party.css?raw';
import dustyMauve from '../themes/dusty-mauve.css?raw';

const themes = [
  { id: 'default', name: 'Current (Sky Blue)', color: '#6495ed', css: null },
  { id: 'warm-bakery', name: 'Warm Bakery', color: '#b8860b', css: warmBakery },
  { id: 'rose-gold-elegance', name: 'Rose Gold Elegance', color: '#b76e79', css: roseGoldElegance },
  { id: 'lavender-dream', name: 'Lavender Dream', color: '#9370db', css: lavenderDream },
  { id: 'modern-noir', name: 'Modern Noir', color: '#c5a55a', css: modernNoir },
  { id: 'garden-party', name: 'Garden Party', color: '#6b8f71', css: gardenParty },
  { id: 'dusty-mauve', name: 'Dusty Mauve', color: '#9c7c8c', css: dustyMauve },
];

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Remove any existing theme style tag
    const existing = document.getElementById('theme-override');
    if (existing) {
      existing.remove();
    }

    const selected = themes.find(t => t.id === currentTheme);
    if (!selected || !selected.css) return;

    // Inject theme CSS as a style tag
    const style = document.createElement('style');
    style.id = 'theme-override';
    style.textContent = selected.css;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById('theme-override');
      if (el) el.remove();
    };
  }, [currentTheme]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      fontFamily: 'system-ui, sans-serif',
    }}>
      {isOpen && (
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          padding: '16px',
          marginBottom: '12px',
          width: '240px',
        }}>
          <p style={{
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#666',
            marginBottom: '12px',
          }}>
            Theme Preview
          </p>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setCurrentTheme(theme.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '8px 10px',
                border: currentTheme === theme.id ? '2px solid #333' : '2px solid transparent',
                borderRadius: '8px',
                background: currentTheme === theme.id ? '#f5f5f5' : 'transparent',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: currentTheme === theme.id ? 600 : 400,
                color: '#333',
                marginBottom: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: theme.color,
                flexShrink: 0,
                border: '2px solid rgba(0,0,0,0.1)',
              }} />
              {theme.name}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: '#333',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',
        }}
        title="Toggle theme switcher"
      >
        {isOpen ? '\u2715' : '\uD83C\uDFA8'}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
