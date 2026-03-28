import { Link } from 'react-router-dom';
import './Home.css';

const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_BODY = "'Outfit', sans-serif";

const STATS = [
  { num: '8+', label: 'Years Baking' },
  { num: '3,000+', label: 'Cakes Made' },
  { num: '100%', label: 'Made From Scratch' },
  { num: '5★', label: 'Rated on Facebook' },
];

const REVIEWS = [
  {
    name: 'Sarah M.',
    text: 'The wedding cake was absolutely stunning. Three tiers of perfection — it looked like art and tasted even better!',
    stars: 5,
    occasion: 'Wedding',
  },
  {
    name: 'Marcus T.',
    text: 'Ordered my daughter\'s birthday cake and she was speechless. Everyone asked where we got it. Will absolutely order again!',
    stars: 5,
    occasion: 'Birthday',
  },
  {
    name: 'Jennifer K.',
    text: 'I\'ve ordered for three office events now and everyone always asks about the cake first. The flavors are incredible!',
    stars: 5,
    occasion: 'Corporate',
  },
  {
    name: 'David R.',
    text: 'Needed an anniversary cake with short notice. Shug\'s came through beautifully. Highly recommend!',
    stars: 5,
    occasion: 'Anniversary',
  },
];

/* ── 3D BENTO ICONS ───────────────────────────── */
function CakeIcon3D() {
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'auto',filter:'drop-shadow(0 8px 16px rgba(80,7,36,0.35))'}}>
      <defs>
        <linearGradient id="cF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F472B6"/><stop offset="100%" stopColor="#BE185D"/></linearGradient>
        <linearGradient id="cT" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FDF2F8"/><stop offset="100%" stopColor="#F9A8D4"/></linearGradient>
        <linearGradient id="cS" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9D174D"/><stop offset="100%" stopColor="#7C1340"/></linearGradient>
      </defs>
      {/* Bottom tier side */}
      <path d="M54 52 L60 48 L60 60 L54 64Z" fill="url(#cS)"/>
      {/* Bottom tier front */}
      <path d="M12 52 L12 64 L54 64 L54 52Z" fill="url(#cF)"/>
      {/* Bottom tier top */}
      <path d="M12 52 L18 48 L60 48 L54 52Z" fill="url(#cT)"/>
      {/* Middle tier side */}
      <path d="M48 36 L54 32 L54 48 L48 52Z" fill="url(#cS)"/>
      {/* Middle tier front */}
      <path d="M18 36 L18 52 L48 52 L48 36Z" fill="url(#cF)"/>
      {/* Middle tier top */}
      <path d="M18 36 L24 32 L54 32 L48 36Z" fill="url(#cT)"/>
      {/* Top tier side */}
      <path d="M44 22 L50 18 L50 32 L44 36Z" fill="url(#cS)"/>
      {/* Top tier front */}
      <path d="M24 22 L24 36 L44 36 L44 22Z" fill="url(#cF)"/>
      {/* Top tier top */}
      <path d="M24 22 L30 18 L50 18 L44 22Z" fill="url(#cT)"/>
      {/* Frosting drips */}
      <path d="M22 52 Q24 56 26 52" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M32 52 Q34 57 36 52" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M42 52 Q44 55 46 52" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M26 36 Q28 40 30 36" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M36 36 Q38 41 40 36" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Candle */}
      <rect x="35" y="10" width="3" height="10" rx="1.5" fill="#FDE68A"/>
      <ellipse cx="36.5" cy="10" rx="2" ry="3" fill="#FCD34D"/>
      <path d="M36.5 8 Q38 5 36.5 3 Q35 5 36.5 8Z" fill="#FB923C"/>
      {/* Highlight edge */}
      <path d="M12 52 L12 64" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <path d="M18 36 L18 52" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
    </svg>
  );
}

function ClockIcon3D() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'auto',filter:'drop-shadow(0 6px 12px rgba(80,7,36,0.25))'}}>
      <defs>
        <linearGradient id="clkRim" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9D174D"/><stop offset="100%" stopColor="#500724"/></linearGradient>
        <linearGradient id="clkFace" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#FFF5F7"/><stop offset="100%" stopColor="#FFD6E7"/></linearGradient>
        <linearGradient id="clkSide" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#BE185D"/><stop offset="100%" stopColor="#831843"/></linearGradient>
      </defs>
      {/* 3D depth - bottom arc */}
      <ellipse cx="32" cy="57" rx="22" ry="5" fill="url(#clkRim)" opacity="0.6"/>
      {/* Clock body side */}
      <path d="M10 32 Q10 52 32 57 Q54 52 54 32" fill="url(#clkSide)" opacity="0.5"/>
      {/* Clock rim */}
      <circle cx="32" cy="32" r="22" fill="url(#clkRim)"/>
      {/* Clock face */}
      <circle cx="32" cy="32" r="18" fill="url(#clkFace)"/>
      {/* Hour marks */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => {
        const r = deg * Math.PI / 180;
        const x1 = 32 + 14*Math.sin(r); const y1 = 32 - 14*Math.cos(r);
        const x2 = 32 + (i%3===0?11:13)*Math.sin(r); const y2 = 32 - (i%3===0?11:13)*Math.cos(r);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i%3===0?"#9D174D":"#F9A8D4"} strokeWidth={i%3===0?2:1}/>;
      })}
      {/* Hands */}
      <line x1="32" y1="32" x2="32" y2="20" stroke="#500724" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="32" y1="32" x2="42" y2="34" stroke="#BE185D" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="2.5" fill="#500724"/>
      {/* Top highlight arc */}
      <path d="M16 22 Q20 12 32 10 Q44 12 48 22" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    </svg>
  );
}

function StarIcon3D() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'auto',filter:'drop-shadow(0 6px 14px rgba(180,120,0,0.4))'}}>
      <defs>
        <linearGradient id="starTop" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#FDE68A"/><stop offset="100%" stopColor="#F59E0B"/></linearGradient>
        <linearGradient id="starSide" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D97706"/><stop offset="100%" stopColor="#92400E"/></linearGradient>
      </defs>
      {/* Shadow/depth layer (slightly offset down) */}
      <path d="M32 14 L36.7 26.5 L50 26.5 L39.5 34.5 L43.5 47 L32 39.5 L20.5 47 L24.5 34.5 L14 26.5 L27.3 26.5 Z"
        fill="url(#starSide)" transform="translate(3,4)"/>
      {/* Main star */}
      <path d="M32 14 L36.7 26.5 L50 26.5 L39.5 34.5 L43.5 47 L32 39.5 L20.5 47 L24.5 34.5 L14 26.5 L27.3 26.5 Z"
        fill="url(#starTop)"/>
      {/* Highlight */}
      <path d="M32 14 L36.7 26.5 L27.3 26.5 Z" fill="rgba(255,255,255,0.35)"/>
      <path d="M32 14 L36.7 26.5 L32 22Z" fill="rgba(255,255,255,0.5)"/>
    </svg>
  );
}

function BowlIcon3D() {
  return (
    <svg viewBox="0 0 72 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'auto',filter:'drop-shadow(0 6px 12px rgba(80,7,36,0.25))'}}>
      <defs>
        <linearGradient id="bowlBody" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#FFF0F5"/><stop offset="100%" stopColor="#F9A8D4"/></linearGradient>
        <linearGradient id="bowlRim" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F9A8D4"/><stop offset="100%" stopColor="#EC4899"/></linearGradient>
        <linearGradient id="bowlSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BE185D"/><stop offset="100%" stopColor="#9D174D"/></linearGradient>
        <linearGradient id="bowlInner" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#BE185D" stopOpacity="0.6"/><stop offset="100%" stopColor="#500724" stopOpacity="0.8"/></linearGradient>
      </defs>
      {/* Bowl body */}
      <path d="M8 22 Q8 54 36 54 Q64 54 64 22 Z" fill="url(#bowlBody)"/>
      {/* Side shading */}
      <path d="M52 22 Q62 30 64 22 Z" fill="url(#bowlSide)" opacity="0.4"/>
      {/* Bowl rim */}
      <ellipse cx="36" cy="22" rx="28" ry="8" fill="url(#bowlRim)"/>
      {/* Bowl opening inner */}
      <ellipse cx="36" cy="22" rx="22" ry="6" fill="url(#bowlInner)"/>
      {/* Contents - batter swirls */}
      <path d="M22 22 Q28 18 34 22 Q40 26 46 22" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M26 25 Q32 21 38 25" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Bottom shadow */}
      <ellipse cx="36" cy="54" rx="20" ry="3" fill="#BE185D" opacity="0.2"/>
      {/* Handle/spoon */}
      <path d="M62 8 L58 26" stroke="#9D174D" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="62" cy="7" rx="4" ry="3" fill="#F9A8D4" stroke="#BE185D" strokeWidth="1.5"/>
    </svg>
  );
}

function PipingBagIcon3D() {
  return (
    <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'auto',filter:'drop-shadow(0 8px 16px rgba(80,7,36,0.3))'}}>
      <defs>
        <linearGradient id="bagFront" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FDF2F8"/><stop offset="100%" stopColor="#F472B6"/></linearGradient>
        <linearGradient id="bagSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#EC4899"/><stop offset="100%" stopColor="#BE185D"/></linearGradient>
        <linearGradient id="tipMetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E5E7EB"/><stop offset="100%" stopColor="#9CA3AF"/></linearGradient>
        <linearGradient id="tipSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9CA3AF"/><stop offset="100%" stopColor="#6B7280"/></linearGradient>
      </defs>
      {/* Bag body (main cone) */}
      <path d="M14 10 L50 10 L38 60 L26 60 Z" fill="url(#bagFront)"/>
      {/* Bag side shading */}
      <path d="M40 10 L50 10 L38 60 L36 60 Z" fill="url(#bagSide)" opacity="0.6"/>
      {/* Twist/tie at top */}
      <ellipse cx="32" cy="10" rx="18" ry="5" fill="#BE185D"/>
      <path d="M28 5 Q32 2 36 5 Q32 8 28 5Z" fill="#9D174D"/>
      <path d="M24 8 Q32 4 40 8" stroke="#F9A8D4" strokeWidth="1.5" fill="none"/>
      {/* Fold crease lines on bag */}
      <path d="M22 20 L28 58" stroke="rgba(190,24,93,0.2)" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M30 12 L30 58" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      {/* Metal tip - side face */}
      <path d="M30 60 L28 72 L28 76 L32 76 Z" fill="url(#tipSide)"/>
      {/* Metal tip - front face */}
      <path d="M26 60 L28 72 L36 72 L34 60 Z" fill="url(#tipMetal)"/>
      {/* Tip ring */}
      <path d="M26 60 L34 60 L30 64 Z" fill="#D1D5DB"/>
      {/* Icing coming out */}
      <path d="M28 76 Q32 80 36 76 Q34 72 32 74 Q30 72 28 76Z" fill="white" opacity="0.9"/>
    </svg>
  );
}

function PinIcon3D() {
  return (
    <svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'auto',filter:'drop-shadow(0 8px 14px rgba(80,7,36,0.3))'}}>
      <defs>
        <linearGradient id="pinFront" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#F9A8D4"/><stop offset="100%" stopColor="#EC4899"/></linearGradient>
        <linearGradient id="pinSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#DB2777"/><stop offset="100%" stopColor="#9D174D"/></linearGradient>
        <linearGradient id="pinStem" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BE185D"/><stop offset="100%" stopColor="#831843"/></linearGradient>
      </defs>
      {/* Pin head shadow/depth */}
      <path d="M26 4 Q42 4 42 20 Q42 34 26 44 Q26 44 24 42 Q38 32 38 20 Q38 8 26 8Z" fill="url(#pinSide)"/>
      {/* Pin head front */}
      <path d="M24 4 Q8 4 8 20 Q8 36 24 44 Q40 36 40 20 Q40 4 24 4Z" fill="url(#pinFront)"/>
      {/* Inner hole */}
      <circle cx="24" cy="20" r="7" fill="rgba(80,7,36,0.5)"/>
      <circle cx="24" cy="20" r="5" fill="rgba(80,7,36,0.7)"/>
      {/* Highlight */}
      <ellipse cx="18" cy="13" rx="5" ry="4" fill="rgba(255,255,255,0.3)" transform="rotate(-15,18,13)"/>
      {/* Stem */}
      <path d="M26 44 L28 62" stroke="url(#pinStem)" strokeWidth="4" strokeLinecap="round"/>
      <path d="M24 44 L24 62" stroke="url(#pinFront)" strokeWidth="4" strokeLinecap="round"/>
      {/* Stem tip shadow */}
      <ellipse cx="25" cy="62" rx="6" ry="2" fill="#500724" opacity="0.3"/>
    </svg>
  );
}

const ICON_STROKE = { fill: 'none', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' };

function BakingIcon({ type, color }) {
  const p = { ...ICON_STROKE, stroke: color };
  switch (type) {
    case 'whisk': return (
      <svg viewBox="0 0 22 28" {...p} style={{ width: '100%', height: 'auto' }}>
        <line x1="11" y1="17" x2="11" y2="28"/>
        <path d="M7 2 C3 6 3 13 7 16 L11 17 L15 16 C19 13 19 6 15 2"/>
        <line x1="11" y1="2" x2="11" y2="17"/>
        <path d="M8 4 C5 7 5 12 8 16"/>
        <path d="M14 4 C17 7 17 12 14 16"/>
        <path d="M6 8 Q11 6 16 8"/>
        <path d="M5 12 Q11 10 17 12"/>
      </svg>
    );
    case 'rollingPin': return (
      <svg viewBox="0 0 44 16" {...p} style={{ width: '100%', height: 'auto' }}>
        <rect x="10" y="3" width="24" height="10" rx="5"/>
        <line x1="1" y1="8" x2="10" y2="8"/>
        <line x1="34" y1="8" x2="43" y2="8"/>
        <circle cx="2" cy="8" r="2"/>
        <circle cx="42" cy="8" r="2"/>
      </svg>
    );
    case 'cupcake': return (
      <svg viewBox="0 0 22 22" {...p} style={{ width: '100%', height: 'auto' }}>
        <path d="M4 12 L2 21 L20 21 L18 12"/>
        <path d="M4 12 Q4 5 11 5 Q18 5 18 12"/>
        <path d="M7 12 Q7 8 11 7 Q15 8 15 12"/>
        <circle cx="11" cy="3" r="2"/>
        <path d="M11 5 Q13 3 14 1"/>
      </svg>
    );
    case 'spatula': return (
      <svg viewBox="0 0 10 26" {...p} style={{ width: '100%', height: 'auto' }}>
        <rect x="2" y="1" width="6" height="9" rx="1"/>
        <line x1="2" y1="4" x2="8" y2="4"/>
        <line x1="2" y1="7" x2="8" y2="7"/>
        <line x1="5" y1="10" x2="5" y2="26"/>
        <line x1="3" y1="14" x2="7" y2="14"/>
        <line x1="3" y1="18" x2="7" y2="18"/>
        <line x1="3" y1="22" x2="7" y2="22"/>
      </svg>
    );
    case 'star': return (
      <svg viewBox="0 0 24 24" {...p} style={{ width: '100%', height: 'auto' }}>
        <path d="M12 2 L14.5 9.5 H22 L16 14.5 L18.5 22 L12 17 L5.5 22 L8 14.5 L2 9.5 H9.5 Z"/>
      </svg>
    );
    case 'egg': return (
      <svg viewBox="0 0 14 18" {...p} style={{ width: '100%', height: 'auto' }}>
        <path d="M7 1 Q13 5 13 10 Q13 17 7 17 Q1 17 1 10 Q1 5 7 1Z"/>
      </svg>
    );
    case 'bowl': return (
      <svg viewBox="0 0 24 18" {...p} style={{ width: '100%', height: 'auto' }}>
        <path d="M2 4 Q2 16 12 16 Q22 16 22 4"/>
        <line x1="0" y1="4" x2="24" y2="4"/>
        <path d="M7 8 Q12 6 17 8"/>
        <path d="M8 11 Q12 9 16 11"/>
        <line x1="18" y1="0" x2="21" y2="12"/>
      </svg>
    );
    case 'spoon': return (
      <svg viewBox="0 0 12 26" {...p} style={{ width: '100%', height: 'auto' }}>
        <path d="M2 6 Q2 12 6 12 Q10 12 10 6 Q10 2 6 2 Q2 2 2 6Z"/>
        <line x1="6" y1="12" x2="6" y2="26"/>
      </svg>
    );
    case 'butter': return (
      <svg viewBox="0 0 24 12" {...p} style={{ width: '100%', height: 'auto' }}>
        <rect x="2" y="2" width="20" height="8" rx="2"/>
        <line x1="2" y1="6" x2="22" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="10"/>
      </svg>
    );
    case 'cherry': return (
      <svg viewBox="0 0 20 18" {...p} style={{ width: '100%', height: 'auto' }}>
        <circle cx="6" cy="14" r="3"/>
        <circle cx="14" cy="13" r="3"/>
        <path d="M6 11 Q8 6 11 5 Q14 4 14 10"/>
        <path d="M11 5 Q12 3 14 2"/>
      </svg>
    );
    case 'slice': return (
      <svg viewBox="0 0 20 22" {...p} style={{ width: '100%', height: 'auto' }}>
        <path d="M10 1 L20 19 L0 19 Z"/>
        <line x1="2" y1="13" x2="18" y2="13"/>
        <path d="M3 10 Q10 8 17 10"/>
        <circle cx="10" cy="0" r="1.5"/>
      </svg>
    );
    case 'cookie': return (
      <svg viewBox="0 0 20 20" {...p} style={{ width: '100%', height: 'auto' }}>
        <circle cx="10" cy="10" r="9"/>
        <circle cx="7" cy="8" r="1.5"/>
        <circle cx="13" cy="8" r="1.5"/>
        <circle cx="10" cy="13" r="1.5"/>
      </svg>
    );
    default: return null;
  }
}

const BAKING_ICONS = [
  // Large
  { type: 'whisk',      pos: { top: '9%',  left: '6%'   }, size: 70, rot: -20, anim: 'icon-float-1', dur: '8s',   delay: '0s',   color: '#EC4899', op: 0.70 },
  { type: 'rollingPin', pos: { bottom: '9%', right: '4%' }, size: 88, rot:  15, anim: 'icon-float-2', dur: '11s',  delay: '1.2s', color: '#BE185D', op: 0.65 },
  // Medium
  { type: 'cupcake',    pos: { top: '13%', right: '10%' }, size: 36, rot:  -5, anim: 'icon-float-3', dur: '9s',   delay: '0.5s', color: '#F472B6', op: 0.65 },
  { type: 'bowl',       pos: { top: '60%', left: '6%'   }, size: 38, rot:   5, anim: 'icon-float-1', dur: '10s',  delay: '2s',   color: '#BE185D', op: 0.60 },
  { type: 'spatula',    pos: { top: '28%', right: '7%'  }, size: 30, rot: -35, anim: 'icon-float-2', dur: '12s',  delay: '0.8s', color: '#EC4899', op: 0.60 },
  { type: 'spoon',      pos: { top: '79%', left: '11%'  }, size: 30, rot: -10, anim: 'icon-float-3', dur: '9.5s', delay: '1.5s', color: '#F472B6', op: 0.55 },
  // Small
  { type: 'cherry',     pos: { top: '11%', right: '24%' }, size: 26, rot:  -5, anim: 'icon-float-1', dur: '8.5s', delay: '3s',   color: '#BE185D', op: 0.50 },
  { type: 'egg',        pos: { top: '77%', right: '17%' }, size: 26, rot:  10, anim: 'icon-float-2', dur: '13s',  delay: '0.3s', color: '#F472B6', op: 0.50 },
  { type: 'star',       pos: { top: '44%', left: '10%'  }, size: 24, rot:   0, anim: 'icon-float-3', dur: '11s',  delay: '2.5s', color: '#F9A8D4', op: 0.55 },
  { type: 'butter',     pos: { top: '54%', right: '9%'  }, size: 28, rot:   8, anim: 'icon-float-1', dur: '14s',  delay: '1s',   color: '#F9A8D4', op: 0.50 },
  { type: 'slice',      pos: { top: '24%', left: '11%'  }, size: 32, rot:  15, anim: 'icon-float-2', dur: '10.5s',delay: '1.8s', color: '#EC4899', op: 0.55 },
  { type: 'cookie',     pos: { top: '91%', left: '42%'  }, size: 22, rot:  20, anim: 'icon-float-3', dur: '9s',   delay: '2.2s', color: '#F9A8D4', op: 0.45 },
];

function HeroCakeGraphic() {
  return (
    <div className="cake-graphic">
      {/* Background blobs */}
      <div className="cake-blob cake-blob-1" />
      <div className="cake-blob cake-blob-2" />
      <div className="cake-blob cake-blob-3" />

      {/* Orbiting rings */}
      <div className="cake-ring cake-ring-1" />
      <div className="cake-ring cake-ring-2" />

      {/* Single-line baking icons */}
      {BAKING_ICONS.map(({ type, pos, size, rot, anim, dur, delay, color, op }) => (
        <div
          key={type}
          className={`baking-icon ${anim}`}
          style={{
            position: 'absolute',
            ...pos,
            width: size,
            opacity: op,
            '--rot': `${rot}deg`,
            animationDuration: dur,
            animationDelay: delay,
            filter: 'drop-shadow(0 3px 8px rgba(190,24,93,0.18))',
          }}
        >
          <BakingIcon type={type} color={color} />
        </div>
      ))}

      {/* Real cake photo */}
      <img src="/cake-hero.png" className="hero-cake-img" alt="Shug's custom celebration cake" />

      {/* Floating label bubbles */}
      <div className="cake-label cake-label-1"><span>🧈</span> Real Butter</div>
      <div className="cake-label cake-label-2"><span>✨</span> Handcrafted</div>
      <div className="cake-label cake-label-3"><span>🌸</span> Made Fresh</div>
    </div>
  );
}

function Home() {
  return (
    <div className="home-page">

      {/* ── BENTO GRID (starts right after header) ── */}
      <section className="bento-section">
        <div className="bento-grid">

          {/* Cell: Hero text (top-left, tall) */}
          <div className="bento-cell bento-hero-text">
            {/* Floating decoration dots */}
            {[[88,12],[6,78],[92,55],[52,92]].map(([l,t],i) => (
              <div key={i} className="hero-dot" style={{
                left:`${l}%`, top:`${t}%`,
                width:[14,18,12,8][i], height:[14,18,12,8][i],
                animationDuration:`${[7,6,8,5.5][i]}s`,
                animationDelay:`${[1.5,0.8,2.2,0.4][i]}s`,
                opacity:[0.3,0.2,0.35,0.25][i],
              }}/>
            ))}
            <p className="hero-eyebrow bento-hero-eyebrow">Est. 2016 · Avon, Indiana</p>
            <h1 className="bento-hero-h1">
              Cakes Made{' '}
              <span className="hero-italic-accent">with Love</span>
            </h1>
            <p className="bento-hero-tagline">Custom celebration cakes baked fresh for every occasion</p>
            <div className="hero-actions bento-hero-actions">
              <Link to="/gallery" className="btn-primary">View Gallery</Link>
              <Link to="/order" className="btn-secondary">Order Now</Link>
            </div>
            <div className="hero-badges bento-hero-badges">
              {[
                { icon: '⭐', label: '5-star rated' },
                { icon: '🎂', label: 'Custom designs' },
                { icon: '🧈', label: 'Real butter always' },
              ].map((b,i) => (
                <div key={i} className="hero-badge bento-hero-badge">
                  <span>{b.icon}</span><span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cell: Hero video */}
          <div className="bento-cell bento-hero-video">
            <video autoPlay muted loop playsInline>
              <source src="/sh1.mp4" type="video/mp4" />
            </video>
            <div className="hero-video-overlay" />
            <div className="hero-video-badge">🎂 Custom Cakes</div>
          </div>

          {/* Cell: Story (row 3, left) */}
          <div className="bento-cell bento-story">
            <div className="bento-story-icon"><CakeIcon3D /></div>
            <div className="bento-eyebrow">Our Story</div>
            <h3 className="bento-story-heading">Named After<br/><em>Grandma Shug</em></h3>
            <p className="bento-story-text">
              Named after my grandmother Helen — "Shug" — whose warm hospitality and amazing cooking
              inspires everything I create. Every cake is made with real butter and fresh ingredients.
            </p>
            <div className="bento-values-row">
              {['🧈 Real Butter', '🥚 Fresh Eggs', '🌸 Handcrafted'].map(v => (
                <span key={v} className="bento-value-pill">{v}</span>
              ))}
            </div>
          </div>

          {/* Cell: Years stat */}
          <div className="bento-cell bento-stat bento-stat-years">
            <div className="bento-stat-icon"><ClockIcon3D /></div>
            <div className="bento-stat-num">8+</div>
            <div className="bento-stat-label">Years Baking</div>
          </div>

          {/* Cell: Cakes stat */}
          <div className="bento-cell bento-stat bento-stat-cakes">
            <div className="bento-stat-num bento-stat-num--alt">3,000+</div>
            <div className="bento-stat-label">Cakes Made</div>
            <div className="bento-stat-sub">and counting</div>
          </div>

          {/* Cell: Scratch stat */}
          <div className="bento-cell bento-stat bento-stat-scratch">
            <div className="bento-stat-icon bento-stat-icon--sm"><BowlIcon3D /></div>
            <div className="bento-stat-num">100%</div>
            <div className="bento-stat-label">From Scratch</div>
          </div>

          {/* Cell: Rating stat */}
          <div className="bento-cell bento-stat bento-stat-rating">
            <div className="bento-stat-icon bento-stat-icon--sm"><StarIcon3D /></div>
            <div className="bento-stat-num bento-stat-num--gold">5★</div>
            <div className="bento-stat-label">Facebook Rated</div>
          </div>

          {/* Cell: Custom Orders (wide) */}
          <div className="bento-cell bento-custom">
            <div className="bento-custom-icon"><PipingBagIcon3D /></div>
            <div className="bento-custom-content">
              <div className="bento-eyebrow bento-eyebrow--light">How It Works</div>
              <h3 className="bento-custom-heading">Custom Orders Only</h3>
              <p className="bento-custom-text">
                We operate from a commercial bakery and only fill custom orders.
                Every cake is made specifically for you — no shelf products, no shortcuts.
              </p>
              <Link to="/order" className="bento-cta-btn">Order Now →</Link>
            </div>
          </div>

          {/* Cell: Hours */}
          <div className="bento-cell bento-hours">
            <div className="bento-hours-icon"><ClockIcon3D /></div>
            <div className="bento-eyebrow">Pickup Times</div>
            <div className="bento-hours-list">
              <div className="bento-hours-row">
                <span className="bento-hours-day">Weekdays</span>
                <span className="bento-hours-time">7am – 6pm</span>
              </div>
              <div className="bento-hours-row">
                <span className="bento-hours-day">Weekends</span>
                <span className="bento-hours-time">7am – 10am</span>
              </div>
            </div>
          </div>

          {/* Cell: Location */}
          <div className="bento-cell bento-location">
            <div className="bento-location-icon"><PinIcon3D /></div>
            <div className="bento-eyebrow">Find Us</div>
            <div className="bento-location-city">Avon, IN<br/>46123</div>
            <div className="bento-location-note">Directions given at order time</div>
          </div>

        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────── */}
      <section className="reviews-section">
        <div className="reviews-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>What People Say</div>
          <h2 className="reviews-heading">Sweet <span className="heading-accent">Reviews</span></h2>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card card">
                <div className="review-stars">{'★★★★★'}</div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-footer">
                  <div className="review-name">{r.name}</div>
                  <span className="tag">{r.occasion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA BAND ─────────────────────────── */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <div style={{ fontSize: 40, marginBottom: 16 }}>🎂</div>
          <h2>Ready to Order?</h2>
          <p>Every cake is a celebration. Let's make yours unforgettable.</p>
          <div className="cta-buttons">
            <Link to="/order" className="cta-band-btn-primary">Start My Order</Link>
            <Link to="/flavors" className="cta-band-btn-outline">Browse Flavors</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
