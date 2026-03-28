import { useState, useEffect, useRef, useCallback } from 'react';
import './ThemeEditor.css';

// ─── Theme preset imports ────────────────────────────────────────────────────
import warmBakery     from '../themes/warm-bakery.css?raw';
import roseGold       from '../themes/rose-gold-elegance.css?raw';
import lavenderDream  from '../themes/lavender-dream.css?raw';
import modernNoir     from '../themes/modern-noir.css?raw';
import gardenParty    from '../themes/garden-party.css?raw';
import dustyMauve     from '../themes/dusty-mauve.css?raw';

// ─── Token definitions ───────────────────────────────────────────────────────

const PINK_SCALE = [
  { name: '--p50',  label: 'P50  ·  Lightest' },
  { name: '--p100', label: 'P100' },
  { name: '--p200', label: 'P200' },
  { name: '--p300', label: 'P300' },
  { name: '--p400', label: 'P400' },
  { name: '--p500', label: 'P500  ·  Base' },
  { name: '--p600', label: 'P600' },
  { name: '--p700', label: 'P700' },
  { name: '--p800', label: 'P800' },
  { name: '--p900', label: 'P900  ·  Darkest' },
];

const BRAND_TOKENS = [
  { name: '--gold',      label: 'Gold' },
  { name: '--cream',     label: 'Cream' },
  { name: '--off-white', label: 'Off-White' },
  { name: '--dark',      label: 'Dark' },
  { name: '--mid',       label: 'Mid' },
  { name: '--soft',      label: 'Soft' },
];

const SHADCN_TOKENS = [
  { name: '--background',          label: 'Background' },
  { name: '--foreground',          label: 'Foreground' },
  { name: '--card',                label: 'Card' },
  { name: '--card-foreground',     label: 'Card Foreground' },
  { name: '--primary',             label: 'Primary' },
  { name: '--primary-foreground',  label: 'Primary Foreground' },
  { name: '--secondary',           label: 'Secondary' },
  { name: '--secondary-foreground',label: 'Secondary Foreground' },
  { name: '--muted',               label: 'Muted' },
  { name: '--muted-foreground',    label: 'Muted Foreground' },
  { name: '--accent',              label: 'Accent' },
  { name: '--accent-foreground',   label: 'Accent Foreground' },
  { name: '--destructive',         label: 'Destructive' },
  { name: '--border',              label: 'Border' },
  { name: '--input',               label: 'Input' },
  { name: '--ring',                label: 'Ring / Focus' },
];

const BUTTON_TOKENS = [
  { name: '--btn-primary-from',     label: 'Primary — Gradient Start', type: 'hex' },
  { name: '--btn-primary-to',       label: 'Primary — Gradient End',   type: 'hex' },
  { name: '--btn-primary-color',    label: 'Primary — Text Color',     type: 'hex' },
  { name: '--btn-secondary-text',   label: 'Secondary — Text Color',   type: 'hex' },
  { name: '--btn-secondary-border', label: 'Secondary — Border',       type: 'hex' },
  { name: '--btn-secondary-hover',  label: 'Secondary — Hover BG',     type: 'hex' },
  { name: '--btn-radius',           label: 'Border Radius',            type: 'text',
    hints: ['50px — pill', '16px — rounded', '6px — soft square', '0px — square'] },
];

const TOKEN_GROUPS = [
  { id: 'pink',    label: '🌸 Pink Scale',          tokens: PINK_SCALE,    type: 'hex' },
  { id: 'brand',   label: '✨ Brand Colors',          tokens: BRAND_TOKENS,  type: 'hex' },
  { id: 'buttons', label: '🔘 Buttons',               tokens: BUTTON_TOKENS, type: 'hex' },
  { id: 'ui',      label: '🎛 UI Variables (HSL)',    tokens: SHADCN_TOKENS, type: 'hsl' },
];

const PRESETS = [
  { id: 'default',        label: 'Default',        css: '' },
  { id: 'warm-bakery',    label: 'Warm Bakery',    css: warmBakery },
  { id: 'rose-gold',      label: 'Rose Gold',      css: roseGold },
  { id: 'lavender-dream', label: 'Lavender Dream', css: lavenderDream },
  { id: 'modern-noir',    label: 'Modern Noir',    css: modernNoir },
  { id: 'garden-party',   label: 'Garden Party',   css: gardenParty },
  { id: 'dusty-mauve',    label: 'Dusty Mauve',    css: dustyMauve },
];

// ─── Color utilities ─────────────────────────────────────────────────────────

/** Convert "H S% L%" string → "#rrggbb" using a canvas pixel read. */
function hslToHex(hslStr) {
  if (!hslStr) return '#888888';
  const parts = hslStr.trim().split(/\s+/);
  if (parts.length < 3) return '#888888';
  const [h, s, l] = parts.map(parseFloat);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

/** Convert "#rrggbb" → "H S% L%" string. */
function hexToHsl(hex) {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return '0 0% 50%';
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Snapshot all token values from the live computed style. */
function readCurrentTokens() {
  const cs = getComputedStyle(document.documentElement);
  const tokens = {};
  [...PINK_SCALE, ...BRAND_TOKENS, ...BUTTON_TOKENS, ...SHADCN_TOKENS].forEach(({ name }) => {
    tokens[name] = cs.getPropertyValue(name).trim();
  });
  return tokens;
}

/** Inject/update a named <style> tag in <head>. */
function upsertStyle(id, css) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = css;
}

/** Build a `:root {}` CSS block from the current token state. */
function buildRootCSS(tokens) {
  const hexLines = [...PINK_SCALE, ...BRAND_TOKENS, ...BUTTON_TOKENS]
    .map(({ name }) => `  ${name}: ${tokens[name] || ''};`)
    .join('\n');
  const hslLines = SHADCN_TOKENS
    .map(({ name }) => `  ${name}: ${tokens[name] || ''};`)
    .join('\n');
  return `:root {\n${hexLines}\n${hslLines}\n}`;
}

/** Generate a full exportable CSS theme file string. */
function buildExportCSS(tokens) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const hslBlock = SHADCN_TOKENS
    .map(({ name }) => `  ${name}: ${tokens[name] || ''};`)
    .join('\n');
  const hexBlock = [...PINK_SCALE, ...BRAND_TOKENS]
    .map(({ name }) => `  ${name}: ${tokens[name] || ''};`)
    .join('\n');
  const btnBlock = BUTTON_TOKENS
    .map(({ name }) => `  ${name}: ${tokens[name] || ''};`)
    .join('\n');

  return `/*
 * Theme: My Custom Theme
 * Generated by Shug's Cakes Theme Editor — ${date}
 */

/* === Shadcn/Tailwind UI Variables === */
:root {
${hslBlock}
}

/* === Pink Scale + Brand Colors === */
:root {
${hexBlock}
}

/* === Button Tokens === */
:root {
${btnBlock}
}
`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// token.type overrides the group-level type (e.g. --btn-radius is 'text' inside a 'hex' group)
function TokenRow({ token, value, groupType, onChange }) {
  const type = token.type ?? groupType;
  const isText = type === 'text';
  const colorInputRef = useRef(null);

  const swatchHex = type === 'hsl' ? hslToHex(value) : (value || '#000000');
  const isValidHex = /^#[0-9a-fA-F]{6}$/.test(swatchHex);

  const handleColorPicker = (e) => {
    const hex = e.target.value;
    onChange(token.name, type === 'hsl' ? hexToHsl(hex) : hex);
  };

  const handleTextChange = (e) => onChange(token.name, e.target.value);

  return (
    <div className="te-token-row">
      {/* Swatch / placeholder */}
      {isText ? (
        <div className="te-swatch te-swatch--text" title="Non-color value">
          <span className="te-swatch-icon">Aa</span>
        </div>
      ) : (
        <>
          <button
            className="te-swatch"
            style={{ background: isValidHex ? swatchHex : '#ccc' }}
            onClick={() => colorInputRef.current?.click()}
            title={`Click to open color picker\n${token.name}: ${value}`}
            aria-label={`Color picker for ${token.name}`}
          />
          <input
            ref={colorInputRef}
            type="color"
            value={isValidHex ? swatchHex : '#888888'}
            onChange={handleColorPicker}
            className="te-color-input-hidden"
          />
        </>
      )}

      <div className="te-token-meta">
        <code className="te-token-name">{token.name}</code>
        <span className="te-token-label">{token.label}</span>
        {/* Quick-pick hints for text tokens (e.g. border-radius presets) */}
        {isText && token.hints && (
          <div className="te-hints">
            {token.hints.map(h => {
              const val = h.split(' — ')[0];
              return (
                <button
                  key={h}
                  className={`te-hint-chip ${value === val ? 'te-hint-chip--active' : ''}`}
                  onClick={() => onChange(token.name, val)}
                  title={h}
                >
                  {val}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={handleTextChange}
        className="te-value-input"
        spellCheck={false}
      />
    </div>
  );
}

function LivePreview() {
  return (
    <div className="te-preview-inner">
      {/* Color palettes */}
      <section className="te-section">
        <h4 className="te-section-label">Color Scale</h4>
        <div className="te-palette-strip">
          {['--p50','--p100','--p200','--p300','--p400','--p500','--p600','--p700','--p800','--p900'].map(v => (
            <div key={v} className="te-palette-cell" style={{ background: `var(${v})` }}>
              <span className="te-palette-label">{v.replace('--','')}</span>
            </div>
          ))}
        </div>
        <div className="te-palette-strip" style={{ marginTop: 4 }}>
          {[
            { name: '--gold', label: 'gold' },
            { name: '--cream', label: 'cream' },
            { name: '--off-white', label: 'off-white' },
            { name: '--dark', label: 'dark' },
            { name: '--mid', label: 'mid' },
            { name: '--soft', label: 'soft' },
          ].map(({ name, label }) => (
            <div key={name} className="te-palette-cell te-palette-cell--brand" style={{ background: `var(${name})`, border: '1px solid rgba(0,0,0,0.1)' }}>
              <span className="te-palette-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="te-section">
        <h4 className="te-section-label">Typography</h4>
        <div className="te-preview-card">
          <h1 style={{ color: 'hsl(var(--foreground))', fontSize: 28, fontWeight: 800, margin: '0 0 4px' }}>
            Custom Cakes & Confections
          </h1>
          <h2 style={{ color: 'hsl(var(--primary))', fontSize: 18, fontWeight: 600, margin: '0 0 10px' }}>
            Made Fresh. Made to Order.
          </h2>
          <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Every cake is hand-crafted for your special occasion. From birthday cakes to wedding tiers — if you can dream it, Shug can bake it.
          </p>
        </div>
      </section>

      {/* Buttons */}
      <section className="te-section">
        <h4 className="te-section-label">Buttons</h4>
        <div className="te-preview-card">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn-primary">Order Now</button>
            <button className="btn-secondary">View Gallery</button>
            <button style={{
              background: 'transparent',
              border: '1.5px solid hsl(var(--border))',
              color: 'hsl(var(--foreground))',
              padding: '8px 20px',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
              fontSize: 14,
              fontFamily: 'inherit',
              fontWeight: 600,
            }}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Card */}
      <section className="te-section">
        <h4 className="te-section-label">Cards</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="te-preview-card" style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}>
            <p style={{ color: 'hsl(var(--primary))', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
              🎂 Birthday Cake
            </p>
            <h3 style={{ color: 'hsl(var(--card-foreground))', margin: '0 0 6px', fontSize: 16 }}>Classic Vanilla</h3>
            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: 13, margin: 0 }}>Starting at $65 · Serves 12–16</p>
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              <span className="tag">Custom Design</span>
              <span className="tag">Gluten-Free</span>
            </div>
          </div>
          <div className="te-preview-card" style={{
            background: 'hsl(var(--secondary))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}>
            <p style={{ color: 'hsl(var(--secondary-foreground))', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
              ✨ Featured
            </p>
            <h3 style={{ color: 'hsl(var(--secondary-foreground))', margin: '0 0 6px', fontSize: 16 }}>Red Velvet Tier</h3>
            <p style={{ color: 'hsl(var(--secondary-foreground))', fontSize: 13, margin: 0, opacity: 0.8 }}>3-tier · Serves 60+</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="te-section">
        <h4 className="te-section-label">Form Elements</h4>
        <div className="te-preview-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ display: 'block', color: 'hsl(var(--foreground))', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>
                Flavor *
              </label>
              <input
                readOnly
                placeholder="e.g. Chocolate Hazelnut"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--input))',
                  borderRadius: 'calc(var(--radius) * 0.6)',
                  padding: '8px 12px',
                  color: 'hsl(var(--foreground))',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'hsl(var(--foreground))', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>
                Servings
              </label>
              <select
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--input))',
                  borderRadius: 'calc(var(--radius) * 0.6)',
                  padding: '8px 12px',
                  color: 'hsl(var(--foreground))',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              >
                <option>12–16 servings</option>
                <option>24–30 servings</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* UI token swatches */}
      <section className="te-section">
        <h4 className="te-section-label">UI Tokens</h4>
        <div className="te-preview-card">
          <div className="te-ui-swatches">
            {[
              { v: '--background',          label: 'bg' },
              { v: '--card',               label: 'card' },
              { v: '--primary',            label: 'primary' },
              { v: '--secondary',          label: 'secondary' },
              { v: '--muted',              label: 'muted' },
              { v: '--accent',             label: 'accent' },
              { v: '--destructive',        label: 'destruct' },
              { v: '--border',             label: 'border' },
            ].map(({ v, label }) => (
              <div key={v} className="te-ui-swatch">
                <div className="te-ui-swatch-box" style={{ background: `hsl(var(${v}))`, border: '1px solid hsl(var(--border))' }} />
                <span className="te-ui-swatch-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ThemeEditor() {
  const [tokens, setTokens]           = useState(() => readCurrentTokens());
  const [activePreset, setActivePreset] = useState('default');
  const [openGroups, setOpenGroups]   = useState({ pink: true, brand: true, buttons: true, ui: true });
  const [showExport, setShowExport]   = useState(false);
  const [copied, setCopied]           = useState(false);

  // ── Apply every token change directly on <html> inline style ────────────
  // Inline custom properties sit above ALL stylesheet rules (including @layer)
  // and are immune to Vite HMR re-injecting style tags after ours.
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(tokens).forEach(([name, value]) => {
      if (value !== undefined && value !== '') {
        root.style.setProperty(name, value);
      }
    });
  }, [tokens]);

  // ── Cleanup: remove every inline property we set when leaving the editor ─
  useEffect(() => {
    const allTokenNames = [
      ...PINK_SCALE, ...BRAND_TOKENS, ...BUTTON_TOKENS, ...SHADCN_TOKENS,
    ].map(t => t.name);
    return () => {
      const root = document.documentElement;
      allTokenNames.forEach(name => root.style.removeProperty(name));
      document.getElementById('te-preset')?.remove();
    };
  }, []);

  // ── Preset loading ────────────────────────────────────────────────────────
  const applyPreset = useCallback((preset) => {
    setActivePreset(preset.id);

    // 1. Inject the full preset CSS (class-level overrides with !important)
    upsertStyle('te-preset', preset.css || '');

    // 2. After the browser has computed the preset's :root vars,
    //    read them back and update editor state (which re-triggers the
    //    inline-style useEffect above with the fresh values).
    requestAnimationFrame(() => {
      // Temporarily clear our inline overrides so we read pure preset values
      const root = document.documentElement;
      [...PINK_SCALE, ...BRAND_TOKENS, ...BUTTON_TOKENS, ...SHADCN_TOKENS]
        .forEach(({ name }) => root.style.removeProperty(name));

      const fresh = readCurrentTokens();
      setTokens(fresh); // triggers the useEffect to re-apply via setProperty
    });
  }, []);

  // ── Token update ──────────────────────────────────────────────────────────
  const updateToken = useCallback((name, value) => {
    setTokens(prev => ({ ...prev, [name]: value }));
  }, []);

  // ── Copy CSS ──────────────────────────────────────────────────────────────
  const copyExport = async () => {
    await navigator.clipboard.writeText(buildExportCSS(tokens));
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const toggleGroup = (id) =>
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));

  const exportCSS = buildExportCSS(tokens);

  return (
    <div className="te-root">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="te-topbar">
        <div className="te-brand">
          <span className="te-brand-icon">🎂</span>
          <div>
            <div className="te-brand-name">Theme Editor</div>
            <div className="te-brand-sub">Shug&rsquo;s Cakes Design System</div>
          </div>
        </div>

        <div className="te-preset-strip">
          <span className="te-preset-label">Preset:</span>
          {PRESETS.map(p => (
            <button
              key={p.id}
              className={`te-preset-btn ${activePreset === p.id ? 'te-preset-btn--active' : ''}`}
              onClick={() => applyPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="te-topbar-actions">
          <button
            className={`te-action-btn ${showExport ? 'te-action-btn--active' : ''}`}
            onClick={() => setShowExport(v => !v)}
          >
            {showExport ? '✕ Close' : '↓ Export CSS'}
          </button>
        </div>
      </header>

      {/* ── Export panel ─────────────────────────────────────────────────── */}
      {showExport && (
        <div className="te-export-panel">
          <div className="te-export-header">
            <span>
              Save this as a file in <code>src/themes/my-theme.css</code> and add it to ThemeSwitcher.jsx
            </span>
            <button onClick={copyExport} className="te-copy-btn">
              {copied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          <textarea
            className="te-export-textarea"
            value={exportCSS}
            readOnly
            rows={14}
            spellCheck={false}
          />
        </div>
      )}

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="te-body">

        {/* Left sidebar: token editor */}
        <aside className="te-sidebar">
          <div className="te-sidebar-inner">
            {TOKEN_GROUPS.map(group => (
              <div key={group.id} className="te-group">
                <button
                  className="te-group-header"
                  onClick={() => toggleGroup(group.id)}
                >
                  <span>{group.label}</span>
                  <span className={`te-chevron ${openGroups[group.id] ? 'te-chevron--open' : ''}`}>
                    ›
                  </span>
                </button>

                {openGroups[group.id] && (
                  <div className="te-token-list">
                    {group.tokens.map(token => (
                      <TokenRow
                        key={token.name}
                        token={token}
                        value={tokens[token.name] || ''}
                        groupType={group.type}
                        onChange={updateToken}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Right panel: live preview */}
        <main className="te-preview-pane">
          <div className="te-preview-header">
            <span>Live Preview</span>
            <span className="te-preview-hint">Changes apply instantly across all tokens</span>
          </div>
          <div className="te-preview-scroll">
            <LivePreview />
          </div>
        </main>

      </div>
    </div>
  );
}
