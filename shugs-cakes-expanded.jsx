import { useState, useEffect, useRef } from "react";

// ─── PALETTE ────────────────────────────────────────────────────────
const T = {
  p50:  "#FFF0F5",
  p100: "#FFD6E7",
  p200: "#FFB3CE",
  p300: "#FF8FAB",
  p400: "#FF6B8A",
  p500: "#EC4899",
  p600: "#DB2777",
  p700: "#BE185D",
  p800: "#9D174D",
  p900: "#500724",
  gold: "#D4A853",
  cream: "#FFFBFC",
  offWhite: "#FFF5F7",
  dark: "#2A1020",
  mid: "#7D3F5E",
  soft: "#C48BA0",
  white: "#FFFFFF",
};

const FONT_DISPLAY = "'Playfair Display', Georgia, serif";
const FONT_BODY    = "'Outfit', sans-serif";

// ─── GLOBAL STYLES ──────────────────────────────────────────────────
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: ${T.cream}; color: ${T.dark}; }
    ::selection { background: ${T.p200}; color: ${T.p800}; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${T.p50}; }
    ::-webkit-scrollbar-thumb { background: ${T.p300}; border-radius: 3px; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes float    { 0%,100% { transform:translateY(0px) rotate(-2deg); } 50% { transform:translateY(-12px) rotate(2deg); } }
    @keyframes shimmer  { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes spin     { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    @keyframes pulse    { 0%,100% { transform:scale(1); } 50% { transform:scale(1.05); } }
    @keyframes slidein  { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }

    .fade-up   { animation: fadeUp 0.6s ease forwards; }
    .fade-in   { animation: fadeIn 0.5s ease forwards; }
    .float-anim { animation: float 6s ease-in-out infinite; }
    .pulse-anim { animation: pulse 2s ease-in-out infinite; }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 32px; border-radius: 50px; border: none; cursor: pointer;
      font-family: ${FONT_BODY}; font-size: 15px; font-weight: 700;
      background: linear-gradient(135deg, ${T.p500}, ${T.p700});
      color: white; letter-spacing: 0.5px;
      box-shadow: 0 8px 28px ${T.p600}40;
      transition: all 0.25s ease;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px ${T.p600}55; filter: brightness(1.08); }
    .btn-primary:active { transform: translateY(0); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 30px; border-radius: 50px; cursor: pointer;
      font-family: ${FONT_BODY}; font-size: 15px; font-weight: 600;
      background: transparent; color: ${T.p700};
      border: 2px solid ${T.p400};
      transition: all 0.25s ease;
    }
    .btn-outline:hover { background: ${T.p50}; border-color: ${T.p600}; transform: translateY(-1px); }

    .card {
      background: white; border-radius: 24px;
      box-shadow: 0 4px 24px ${T.p800}10, 0 1px 4px ${T.p800}08;
      transition: box-shadow 0.3s ease, transform 0.3s ease;
      overflow: hidden;
    }
    .card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px ${T.p800}18; }

    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: ${FONT_BODY}; font-size: 12px; font-weight: 700;
      letter-spacing: 3px; text-transform: uppercase;
      color: ${T.p600}; margin-bottom: 12px;
    }
    .section-label::before, .section-label::after { content:''; width:24px; height:2px; background:${T.p300}; border-radius:2px; }

    .page-section { padding: 80px 24px; max-width: 1160px; margin: 0 auto; }

    input, select, textarea {
      width: 100%; padding: 14px 18px; border-radius: 14px;
      border: 2px solid ${T.p100}; background: ${T.p50};
      font-family: ${FONT_BODY}; font-size: 15px; color: ${T.dark};
      transition: border-color 0.2s, box-shadow 0.2s; outline: none;
    }
    input:focus, select:focus, textarea:focus {
      border-color: ${T.p400}; box-shadow: 0 0 0 4px ${T.p100};
    }
    label { display: block; font-weight: 600; font-size: 14px; color: ${T.mid}; margin-bottom: 6px; }

    .nav-link { 
      font-family: ${FONT_BODY}; font-size: 14px; font-weight: 600;
      color: ${T.mid}; background: none; border: none; cursor: pointer;
      padding: 8px 16px; border-radius: 30px;
      transition: all 0.2s;
    }
    .nav-link:hover, .nav-link.active { color: ${T.p600}; background: ${T.p50}; }

    .tag {
      display: inline-flex; align-items: center;
      padding: 5px 14px; border-radius: 30px;
      font-size: 12px; font-weight: 600; letter-spacing: 0.3px;
      background: ${T.p100}; color: ${T.p700};
    }

    .star { color: ${T.gold}; font-size: 15px; }

    .divider { width: 60px; height: 3px; background: linear-gradient(90deg, ${T.p400}, ${T.p200}); border-radius: 2px; }
  `}</style>
);

// ─── SVG CAKE ILLUSTRATION ──────────────────────────────────────────
const CakeIllustration = ({ size = 220 }) => (
  <svg width={size} height={size} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ filter: "drop-shadow(0 20px 40px rgba(190,24,93,0.25))" }}>
    {/* Base tier */}
    <ellipse cx="110" cy="190" rx="80" ry="12" fill={T.p200} opacity="0.4"/>
    <rect x="30" y="148" width="160" height="42" rx="12" fill={T.p300}/>
    <rect x="30" y="148" width="160" height="16" rx="12" fill={T.p400}/>
    {/* Frosting drips tier 1 */}
    {[50,72,94,116,138,160].map((x,i) => (
      <ellipse key={i} cx={x} cy="148" rx="10" ry="7" fill="white" opacity="0.85"/>
    ))}
    {[60,85,110,135,155].map((x,i) => (
      <rect key={i} x={x-4} y="148" width="8" height="14" rx="4" fill="white" opacity="0.7"/>
    ))}

    {/* Mid tier */}
    <rect x="50" y="96" width="120" height="52" rx="10" fill={T.p500}/>
    <rect x="50" y="96" width="120" height="14" rx="10" fill={T.p600}/>
    {/* Frosting drips tier 2 */}
    {[65,88,110,132,155].map((x,i) => (
      <ellipse key={i} cx={x} cy="96" rx="9" ry="6" fill="white" opacity="0.9"/>
    ))}
    {[74,98,120,143].map((x,i) => (
      <rect key={i} x={x-3.5} y="96" width="7" height="12" rx="3.5" fill="white" opacity="0.75"/>
    ))}

    {/* Flower decorations mid tier */}
    {[75, 110, 145].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy="122" r="8" fill={T.p100} opacity="0.9"/>
        <circle cx={x} cy="122" r="4" fill={T.p400}/>
      </g>
    ))}

    {/* Top tier */}
    <rect x="72" y="52" width="76" height="44" rx="9" fill={T.p700}/>
    <rect x="72" y="52" width="76" height="12" rx="9" fill={T.p800}/>
    {/* Frosting drips tier 3 */}
    {[84,104,124,140].map((x,i) => (
      <ellipse key={i} cx={x} cy="52" rx="8" ry="5" fill="white" opacity="0.9"/>
    ))}
    {[92,110,130].map((x,i) => (
      <rect key={i} x={x-3} y="52" width="6" height="10" rx="3" fill="white" opacity="0.8"/>
    ))}

    {/* Pearl dots */}
    {[40,60,80,100,120,140,160,180].map((x,i)=> (
      <circle key={i} cx={x} cy="175" r="4" fill="white" opacity="0.7"/>
    ))}
    {[56,80,104,128,152].map((x,i)=> (
      <circle key={i} cx={x} cy="123" r="3" fill="white" opacity="0.6"/>
    ))}

    {/* Candles */}
    {[92, 110, 128].map((x, i) => (
      <g key={i}>
        <rect x={x-4} y="30" width="8" height="22" rx="4" fill={i===0?T.p100:i===1?"white":T.p200}/>
        {/* flame */}
        <ellipse cx={x} cy="27" rx="4.5" ry="7" fill="#FFD700" opacity="0.9"/>
        <ellipse cx={x} cy="29" rx="2.5" ry="4.5" fill="#FF8C00"/>
        <ellipse cx={x} cy="30.5" rx="1.2" ry="2.5" fill="white" opacity="0.8"/>
        {/* wick */}
        <line x1={x} y1="30" x2={x} y2="24" stroke="#555" strokeWidth="1" strokeLinecap="round"/>
      </g>
    ))}

    {/* Sparkles */}
    {[[20,60],[195,80],[15,140],[200,150]].map(([x,y],i)=>(
      <g key={i}>
        <line x1={x} y1={y-8} x2={x} y2={y+8} stroke={T.p300} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1={x-8} y1={y} x2={x+8} y2={y} stroke={T.p300} strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    ))}
  </svg>
);

// ─── LOGO ────────────────────────────────────────────────────────────
const Logo = ({ onClick }) => (
  <button onClick={onClick} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
    <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${T.p400},${T.p700})`,
      display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:`0 4px 12px ${T.p500}40` }}>
      🎂
    </div>
    <div>
      <div style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:20, color:T.p700, lineHeight:1, fontStyle:"italic" }}>
        Shug's
      </div>
      <div style={{ fontFamily:FONT_BODY, fontSize:10, fontWeight:700, letterSpacing:3, color:T.soft, textTransform:"uppercase" }}>
        Cakes
      </div>
    </div>
  </button>
);

// ─── NAV ─────────────────────────────────────────────────────────────
const Nav = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id:"home", label:"Home" },
    { id:"menu", label:"Our Cakes" },
    { id:"flavors", label:"Flavors" },
    { id:"gallery", label:"Gallery" },
    { id:"about", label:"Our Story" },
    { id:"order", label:"Order" },
  ];

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: scrolled ? "rgba(255,245,247,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.p100}` : "none",
      transition: "all 0.3s ease",
      padding: "0 24px",
    }}>
      <div style={{ maxWidth:1160, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:72 }}>
        <Logo onClick={() => setPage("home")} />

        {/* Desktop links */}
        <div style={{ display:"flex", alignItems:"center", gap:4 }} className="desktop-nav">
          {links.map(l => (
            <button key={l.id} className={`nav-link${page===l.id?" active":""}`} onClick={() => setPage(l.id)}>
              {l.label}
            </button>
          ))}
        </div>

        <button className="btn-primary" style={{ padding:"10px 22px", fontSize:14 }} onClick={() => setPage("order")}>
          Order Now 🎀
        </button>
      </div>
    </nav>
  );
};

// ─── HERO ────────────────────────────────────────────────────────────
const Hero = ({ setPage }) => (
  <section style={{
    minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
    background:`radial-gradient(ellipse 80% 80% at 60% 50%, ${T.p100} 0%, ${T.cream} 70%)`,
    position:"relative", overflow:"hidden", paddingTop:72,
  }}>
    {/* Background orbs */}
    <div style={{ position:"absolute", top:"-10%", right:"-5%", width:480, height:480, borderRadius:"50%",
      background:`radial-gradient(circle, ${T.p200}60 0%, transparent 70%)`, pointerEvents:"none" }}/>
    <div style={{ position:"absolute", bottom:"0%", left:"-8%", width:360, height:360, borderRadius:"50%",
      background:`radial-gradient(circle, ${T.p100}80 0%, transparent 70%)`, pointerEvents:"none" }}/>

    {/* Floating dots */}
    {[[15,25],[85,15],[8,75],[90,60],[50,90]].map(([l,t],i) => (
      <div key={i} style={{
        position:"absolute", left:`${l}%`, top:`${t}%`,
        width: [14,10,18,12,8][i], height: [14,10,18,12,8][i],
        borderRadius:"50%", background:T.p300, opacity:[0.4,0.3,0.2,0.35,0.25][i],
        animation:`float ${[5,7,6,8,5.5][i]}s ease-in-out infinite`,
        animationDelay:`${[0,1.5,0.8,2.2,0.4][i]}s`,
      }}/>
    ))}

    <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center",
      gap:64, flexWrap:"wrap", justifyContent:"center" }}>

      {/* Text */}
      <div style={{ flex:"1 1 420px", maxWidth:560 }}>
        <div className="section-label fade-up" style={{ animationDelay:"0.1s", opacity:0 }}>
          Indianapolis' Sweetest Spot
        </div>

        <h1 style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:"clamp(42px,6vw,72px)",
          lineHeight:1.05, color:T.dark, margin:"16px 0", animationDelay:"0.2s" }}
          className="fade-up">
          Cakes Made{" "}
          <span style={{
            background:`linear-gradient(135deg, ${T.p500}, ${T.p800})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            fontStyle:"italic",
          }}>
            with Love
          </span>
        </h1>

        <p style={{ fontFamily:FONT_BODY, fontSize:18, color:T.mid, lineHeight:1.7,
          marginBottom:36, maxWidth:440, animationDelay:"0.3s" }} className="fade-up">
          Custom celebration cakes, cupcakes, and sweet treats — baked fresh for every occasion.
          From birthdays to weddings, we make every moment delicious.
        </p>

        <div style={{ display:"flex", gap:14, flexWrap:"wrap", animationDelay:"0.4s" }} className="fade-up">
          <button className="btn-primary" onClick={() => setPage("order")}>Order a Custom Cake 🎂</button>
          <button className="btn-outline" onClick={() => setPage("gallery")}>View Gallery</button>
        </div>

        {/* Trust badges */}
        <div style={{ display:"flex", gap:24, marginTop:44, flexWrap:"wrap", animationDelay:"0.5s" }} className="fade-up">
          {[
            { icon:"⭐", label:"500+ 5-star reviews" },
            { icon:"🎂", label:"Custom designs" },
            { icon:"🚚", label:"Local delivery" },
          ].map((b,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:18 }}>{b.icon}</span>
              <span style={{ fontFamily:FONT_BODY, fontSize:13, fontWeight:600, color:T.mid }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Illustration */}
      <div style={{ flex:"0 0 auto", display:"flex", alignItems:"center", justifyContent:"center",
        position:"relative", width:300, animationDelay:"0.35s" }} className="fade-up">
        <div style={{ position:"absolute", inset:-32, borderRadius:"50%",
          background:`radial-gradient(circle, ${T.p100} 0%, transparent 70%)` }}/>
        <div className="float-anim">
          <CakeIllustration size={260} />
        </div>
      </div>
    </div>
  </section>
);

// ─── STATS STRIP ────────────────────────────────────────────────────
const StatsStrip = () => (
  <div style={{ background:`linear-gradient(135deg, ${T.p700}, ${T.p900})`, padding:"36px 24px" }}>
    <div style={{ maxWidth:1160, margin:"0 auto", display:"flex", justifyContent:"space-around",
      flexWrap:"wrap", gap:24 }}>
      {[
        { num:"8+", label:"Years Baking" },
        { num:"3,200+", label:"Cakes Made" },
        { num:"500+", label:"Happy Customers" },
        { num:"100%", label:"Made From Scratch" },
      ].map((s,i) => (
        <div key={i} style={{ textAlign:"center" }}>
          <div style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:40, color:"white", lineHeight:1 }}>{s.num}</div>
          <div style={{ fontFamily:FONT_BODY, fontSize:13, fontWeight:600, color:T.p200, letterSpacing:1,
            textTransform:"uppercase", marginTop:4 }}>{s.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// ─── MENU / CAKE CATEGORIES ──────────────────────────────────────────
const CAKES = [
  {
    name: "Birthday Cakes",
    desc: "Towering, colorful, and dripping with personality. Every birthday deserves something unforgettable.",
    price: "From $85",
    tags: ["Custom", "Any Size", "Pick Your Flavor"],
    emoji: "🎉",
    bg: T.p100,
    accent: T.p500,
  },
  {
    name: "Wedding Cakes",
    desc: "Elegant, tiered creations that become the centerpiece of your most important day.",
    price: "From $295",
    tags: ["Tiered", "Custom Design", "Tasting Included"],
    emoji: "💍",
    bg: T.p50,
    accent: T.p700,
  },
  {
    name: "Cupcake Towers",
    desc: "Perfect for events and parties. Mix flavors, toppings, and decorations across a stunning display.",
    price: "From $48/doz",
    tags: ["Mix & Match", "12–120 count", "Event Ready"],
    emoji: "🧁",
    bg: T.p100,
    accent: T.p600,
  },
  {
    name: "Specialty Cakes",
    desc: "Drip cakes, geode cakes, sculpted cakes — our artisan creations push the boundaries.",
    price: "From $120",
    tags: ["Artisan", "Sculpted", "Showcase"],
    emoji: "✨",
    bg: T.p50,
    accent: T.p800,
  },
  {
    name: "Sheet Cakes",
    desc: "Office parties, school events, reunions — classic flavors in practical, crowd-pleasing sizes.",
    price: "From $55",
    tags: ["Feeds 20–50", "Quick Turnaround", "Classic"],
    emoji: "🎊",
    bg: T.p100,
    accent: T.p500,
  },
  {
    name: "Cake Pops & Truffles",
    desc: "One-bite wonders. Gorgeous, custom-decorated pops for favors, gifts, and giveaways.",
    price: "From $36/doz",
    tags: ["Party Favor", "Giftable", "Made to Order"],
    emoji: "🍬",
    bg: T.p50,
    accent: T.p600,
  },
];

const MenuPage = ({ setPage }) => (
  <div style={{ paddingTop:88, background:T.cream, minHeight:"100vh" }}>
    <div className="page-section">
      <div style={{ textAlign:"center", marginBottom:56 }}>
        <div className="section-label" style={{ justifyContent:"center" }}>What We Bake</div>
        <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:"clamp(32px,4vw,52px)", color:T.dark, marginTop:12 }}>
          Our Cake <span style={{ color:T.p600, fontStyle:"italic" }}>Collection</span>
        </h2>
        <p style={{ fontFamily:FONT_BODY, fontSize:17, color:T.mid, marginTop:12, maxWidth:480, margin:"12px auto 0" }}>
          Every cake is baked to order using real butter, fresh eggs, and ingredients we're proud of.
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:24 }}>
        {CAKES.map((c, i) => (
          <div key={i} className="card" style={{ background:c.bg }}>
            <div style={{ padding:32 }}>
              <div style={{ fontSize:48, marginBottom:16 }}>{c.emoji}</div>
              <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:22, color:T.dark, marginBottom:8 }}>{c.name}</h3>
              <p style={{ fontFamily:FONT_BODY, fontSize:15, color:T.mid, lineHeight:1.6, marginBottom:16 }}>{c.desc}</p>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
                {c.tags.map((t,j) => <span key={j} className="tag">{t}</span>)}
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:20, color:c.accent }}>{c.price}</span>
                <button className="btn-primary" style={{ padding:"10px 20px", fontSize:13 }} onClick={() => setPage("order")}>
                  Order →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── FLAVORS ─────────────────────────────────────────────────────────
const FLAVORS = [
  { name:"Classic Vanilla Bean", desc:"Madagascar vanilla with silky buttercream", cat:"Classic", popular:true },
  { name:"Dark Chocolate Fudge", desc:"Double dark cocoa with ganache filling", cat:"Classic", popular:true },
  { name:"Strawberry Champagne", desc:"Fresh strawberry cake with champagne buttercream", cat:"Fruity", popular:true },
  { name:"Lemon Lavender", desc:"Bright lemon sponge, lavender honey cream", cat:"Fruity", popular:false },
  { name:"Red Velvet", desc:"Classic southern recipe with cream cheese frosting", cat:"Classic", popular:true },
  { name:"Salted Caramel", desc:"Brown sugar sponge, caramel drizzle, sea salt", cat:"Indulgent", popular:false },
  { name:"Funfetti Confetti", desc:"Vanilla cake loaded with rainbow sprinkles", cat:"Fun", popular:false },
  { name:"Cookies & Cream", desc:"Chocolate cake, Oreo buttercream, cookie crumble", cat:"Indulgent", popular:true },
  { name:"Peach Bellini", desc:"Summer peach sponge, prosecco frosting", cat:"Fruity", popular:false },
  { name:"Spiced Chai", desc:"Cinnamon and cardamom cake, vanilla chai cream", cat:"Seasonal", popular:false },
  { name:"Pumpkin Spice", desc:"Autumn spice sponge, maple cream cheese", cat:"Seasonal", popular:false },
  { name:"Pineapple Coconut", desc:"Tropical sponge, toasted coconut, pineapple curd", cat:"Fruity", popular:false },
];

const CATS = ["All", "Classic", "Fruity", "Indulgent", "Fun", "Seasonal"];

const FlavorsPage = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? FLAVORS : FLAVORS.filter(f => f.cat === active);

  return (
    <div style={{ paddingTop:88, background:T.cream, minHeight:"100vh" }}>
      <div className="page-section">
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div className="section-label" style={{ justifyContent:"center" }}>Taste Everything</div>
          <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:"clamp(32px,4vw,52px)", color:T.dark, marginTop:12 }}>
            Flavor <span style={{ color:T.p600, fontStyle:"italic" }}>Menu</span>
          </h2>
          <p style={{ fontFamily:FONT_BODY, fontSize:16, color:T.mid, marginTop:10 }}>
            All flavors available in any cake size. Seasonal flavors rotate throughout the year.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:40 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              padding:"9px 20px", borderRadius:30, border:`2px solid ${active===c?T.p500:T.p200}`,
              background: active===c ? `linear-gradient(135deg,${T.p500},${T.p700})` : "white",
              color: active===c ? "white" : T.mid,
              fontFamily:FONT_BODY, fontWeight:600, fontSize:14, cursor:"pointer",
              transition:"all 0.2s",
            }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:20 }}>
          {filtered.map((f, i) => (
            <div key={i} className="card" style={{ padding:24, position:"relative", background:f.popular?T.p50:"white" }}>
              {f.popular && (
                <div style={{ position:"absolute", top:16, right:16 }}>
                  <span className="tag" style={{ background:T.p700, color:"white", fontSize:11 }}>⭐ Popular</span>
                </div>
              )}
              <div style={{ marginBottom:8 }}>
                <span className="tag" style={{ fontSize:11, marginRight:8 }}>{f.cat}</span>
              </div>
              <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:19, color:T.dark, marginBottom:6 }}>{f.name}</h3>
              <p style={{ fontFamily:FONT_BODY, fontSize:14, color:T.mid, lineHeight:1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center", marginTop:48, padding:32, borderRadius:24,
          background:`linear-gradient(135deg, ${T.p50}, ${T.p100})`,
          border:`2px solid ${T.p200}` }}>
          <div style={{ fontSize:32, marginBottom:12 }}>🌟</div>
          <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:22, color:T.dark, marginBottom:8 }}>
            Can't decide? Book a Tasting!
          </h3>
          <p style={{ fontFamily:FONT_BODY, fontSize:15, color:T.mid, marginBottom:20 }}>
            Wedding and large order clients can schedule a complimentary tasting session at our bakery.
          </p>
          <a href="mailto:hello@shugscakes.com" style={{
            display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px",
            borderRadius:50, background:`linear-gradient(135deg,${T.p500},${T.p700})`,
            color:"white", fontFamily:FONT_BODY, fontWeight:700, fontSize:15,
            textDecoration:"none", boxShadow:`0 8px 24px ${T.p600}40`,
          }}>
            Schedule a Tasting 📩
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── GALLERY ─────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { label:"3-Tier Wedding", emoji:"💍", tags:["Wedding","White","Gold"], size:"tall" },
  { label:"Birthday Drip", emoji:"🎉", tags:["Birthday","Drip","Pink"], size:"wide" },
  { label:"Geode Cake", emoji:"💎", tags:["Specialty","Crystal","Artisan"], size:"normal" },
  { label:"Cupcake Tower", emoji:"🧁", tags:["Event","Cupcakes","Display"], size:"normal" },
  { label:"Floral Buttercream", emoji:"🌸", tags:["Floral","Wedding","Elegant"], size:"wide" },
  { label:"Unicorn Cake", emoji:"🦄", tags:["Kids","Fun","Colorful"], size:"normal" },
  { label:"Naked Cake", emoji:"🌿", tags:["Rustic","Wedding","Fresh"], size:"tall" },
  { label:"Galaxy Drip", emoji:"🌌", tags:["Specialty","Galaxy","Dark"], size:"normal" },
  { label:"Macaron Tower", emoji:"🍬", tags:["French","Event","Pastels"], size:"normal" },
];

const GalleryPage = () => {
  const [selected, setSelected] = useState(null);
  const GRADIENTS = [
    `linear-gradient(135deg, ${T.p200}, ${T.p400})`,
    `linear-gradient(135deg, ${T.p300}, ${T.p600})`,
    `linear-gradient(135deg, ${T.p100}, ${T.p300})`,
    `linear-gradient(135deg, ${T.p400}, ${T.p800})`,
    `linear-gradient(135deg, ${T.p200}, ${T.p500})`,
    `linear-gradient(135deg, ${T.p100}, ${T.p400})`,
    `linear-gradient(135deg, ${T.p300}, ${T.p700})`,
    `linear-gradient(135deg, ${T.p600}, ${T.p900})`,
    `linear-gradient(135deg, ${T.p200}, ${T.p600})`,
  ];

  return (
    <div style={{ paddingTop:88, background:T.cream, minHeight:"100vh" }}>
      <div className="page-section">
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div className="section-label" style={{ justifyContent:"center" }}>Our Work</div>
          <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:"clamp(32px,4vw,52px)", color:T.dark, marginTop:12 }}>
            The <span style={{ color:T.p600, fontStyle:"italic" }}>Gallery</span>
          </h2>
          <p style={{ fontFamily:FONT_BODY, fontSize:16, color:T.mid, marginTop:10 }}>
            Every cake in our gallery was designed, baked, and decorated in-house.
          </p>
        </div>

        <div style={{ columns:"3 320px", gap:20 }}>
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} onClick={() => setSelected(i)} style={{
              breakInside:"avoid", marginBottom:20, borderRadius:20, overflow:"hidden",
              background:GRADIENTS[i], cursor:"pointer",
              height: item.size==="tall" ? 340 : item.size==="wide" ? 200 : 260,
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              position:"relative", transition:"transform 0.3s, box-shadow 0.3s",
              boxShadow:`0 4px 20px ${T.p800}15`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform="scale(1.02)"; e.currentTarget.style.boxShadow=`0 12px 40px ${T.p800}30`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow=`0 4px 20px ${T.p800}15`; }}
            >
              <div style={{ fontSize:52, marginBottom:12 }}>{item.emoji}</div>
              <div style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:18, color:"white",
                textShadow:"0 2px 8px rgba(0,0,0,0.3)", marginBottom:10 }}>{item.label}</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center", padding:"0 16px" }}>
                {item.tags.map((t,j) => (
                  <span key={j} style={{ padding:"3px 10px", borderRadius:20, background:"rgba(255,255,255,0.3)",
                    backdropFilter:"blur(8px)", fontSize:11, fontWeight:600, fontFamily:FONT_BODY, color:"white" }}>{t}</span>
                ))}
              </div>
              <div style={{ position:"absolute", inset:0, borderRadius:20, border:"2px solid rgba(255,255,255,0.2)" }}/>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selected !== null && (
          <div onClick={() => setSelected(null)} style={{
            position:"fixed", inset:0, background:"rgba(80,7,36,0.7)", backdropFilter:"blur(12px)",
            zIndex:200, display:"flex", alignItems:"center", justifyContent:"center",
          }} className="fade-in">
            <div style={{ background:"white", borderRadius:28, padding:40, maxWidth:480, width:"90%",
              textAlign:"center", boxShadow:`0 32px 80px rgba(0,0,0,0.35)` }}
              onClick={e => e.stopPropagation()}>
              <div style={{ fontSize:80, marginBottom:16 }}>{GALLERY_ITEMS[selected].emoji}</div>
              <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:28, color:T.dark, marginBottom:8 }}>
                {GALLERY_ITEMS[selected].label}
              </h3>
              <p style={{ fontFamily:FONT_BODY, color:T.mid, marginBottom:24 }}>
                Interested in a similar cake? Place a custom order and we'll create something just for you.
              </p>
              <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                <button className="btn-primary">Order Something Similar</button>
                <button className="btn-outline" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── REVIEWS ─────────────────────────────────────────────────────────
const REVIEWS = [
  { name:"Sarah M.", text:"Shug's made our wedding cake and it was STUNNING. Three tiers of floral buttercream, exactly what we wanted. Tasted even better than it looked.", stars:5, occasion:"Wedding" },
  { name:"Marcus T.", text:"Ordered my daughter's 5th birthday cake — a unicorn theme. She was speechless. Everyone asked where we got it. Will absolutely order again!", stars:5, occasion:"Birthday" },
  { name:"Jennifer K.", text:"The lemon lavender flavor is absolutely divine. I've ordered for three office events now and everyone always asks about the cake first!", stars:5, occasion:"Corporate" },
  { name:"David R.", text:"Needed a last-minute anniversary cake. Shug's came through with 48 hours notice and it was gorgeous. Can't recommend highly enough.", stars:5, occasion:"Anniversary" },
];

const Reviews = () => (
  <section style={{ padding:"80px 24px", background:`linear-gradient(180deg, ${T.p50} 0%, ${T.cream} 100%)` }}>
    <div style={{ maxWidth:1160, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <div className="section-label" style={{ justifyContent:"center" }}>What People Say</div>
        <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:"clamp(28px,3.5vw,44px)", color:T.dark, marginTop:12 }}>
          Sweet <span style={{ color:T.p600, fontStyle:"italic" }}>Reviews</span>
        </h2>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:20 }}>
        {REVIEWS.map((r, i) => (
          <div key={i} className="card" style={{ padding:28 }}>
            <div style={{ display:"flex", gap:2, marginBottom:12 }}>
              {"★★★★★".split("").map((s,j) => <span key={j} className="star">{s}</span>)}
            </div>
            <p style={{ fontFamily:FONT_BODY, fontSize:15, color:T.dark, lineHeight:1.7, marginBottom:20, fontStyle:"italic" }}>
              "{r.text}"
            </p>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontFamily:FONT_BODY, fontWeight:700, fontSize:14, color:T.dark }}>{r.name}</div>
              </div>
              <span className="tag">{r.occasion}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── ABOUT ───────────────────────────────────────────────────────────
const AboutPage = () => (
  <div style={{ paddingTop:88, background:T.cream, minHeight:"100vh" }}>
    <div className="page-section">
      <div style={{ display:"flex", gap:64, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ flex:"0 0 auto", width:280, height:340, borderRadius:32, overflow:"hidden",
          background:`linear-gradient(135deg, ${T.p200}, ${T.p500})`, display:"flex",
          alignItems:"center", justifyContent:"center" }}>
          <div className="float-anim" style={{ textAlign:"center" }}>
            <div style={{ fontSize:90 }}>👩‍🍳</div>
            <div style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:22, color:"white", marginTop:12 }}>Shug</div>
            <div style={{ fontFamily:FONT_BODY, fontSize:13, color:T.p100, letterSpacing:1 }}>Head Baker & Owner</div>
          </div>
        </div>

        <div style={{ flex:"1 1 380px" }}>
          <div className="section-label">Our Story</div>
          <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:"clamp(30px,4vw,48px)", color:T.dark, margin:"12px 0" }}>
            Baked with Love{" "}
            <span style={{ color:T.p600, fontStyle:"italic" }}>since 2016</span>
          </h2>

          <p style={{ fontFamily:FONT_BODY, fontSize:16, color:T.mid, lineHeight:1.8, marginBottom:16 }}>
            What started as a passion project in a home kitchen became Indianapolis' most-loved custom cake bakery.
            Shug — that's what everyone calls me — grew up baking with her grandmother every Sunday morning.
          </p>
          <p style={{ fontFamily:FONT_BODY, fontSize:16, color:T.mid, lineHeight:1.8, marginBottom:24 }}>
            Every cake we make starts with real ingredients, a real vision, and real love.
            We don't use box mixes, artificial flavorings, or shortcuts. Your celebration deserves better.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {[
              { icon:"🧈", label:"Real Butter Always" },
              { icon:"🥚", label:"Farm Fresh Eggs" },
              { icon:"🌸", label:"Hand-Decorated" },
              { icon:"📦", label:"Made To Order" },
            ].map((v, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:16,
                borderRadius:16, background:T.p50, border:`1px solid ${T.p100}` }}>
                <span style={{ fontSize:22 }}>{v.icon}</span>
                <span style={{ fontFamily:FONT_BODY, fontWeight:600, fontSize:14, color:T.dark }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── ORDER FORM ──────────────────────────────────────────────────────
const OrderPage = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    type:"", flavor:"", size:"", occasion:"", date:"", name:"", email:"", phone:"", notes:"", delivery:""
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const steps = ["Cake Details", "Your Info", "Confirm"];
  const isStep1Complete = form.type && form.flavor && form.size && form.occasion && form.date;
  const isStep2Complete = form.name && form.email && form.phone;

  if (submitted) return (
    <div style={{ paddingTop:88, minHeight:"100vh", background:T.cream, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center", padding:48, maxWidth:480 }} className="fade-up">
        <div style={{ fontSize:80, marginBottom:20 }} className="pulse-anim">🎂</div>
        <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:36, color:T.dark, marginBottom:12 }}>
          Order Received!
        </h2>
        <p style={{ fontFamily:FONT_BODY, fontSize:16, color:T.mid, lineHeight:1.7, marginBottom:28 }}>
          Thank you, {form.name}! We'll reach out to <strong>{form.email}</strong> within 24 hours to confirm details and discuss your custom design.
        </p>
        <div style={{ padding:20, borderRadius:20, background:T.p50, border:`2px solid ${T.p200}`, marginBottom:24 }}>
          <div style={{ fontFamily:FONT_BODY, fontSize:14, color:T.mid }}>
            <div><strong>Cake:</strong> {form.type} · {form.flavor}</div>
            <div><strong>Occasion:</strong> {form.occasion}</div>
            <div><strong>Date Needed:</strong> {form.date}</div>
          </div>
        </div>
        <button className="btn-primary" onClick={() => { setSubmitted(false); setStep(1); setForm({type:"",flavor:"",size:"",occasion:"",date:"",name:"",email:"",phone:"",notes:"",delivery:""}); }}>
          Place Another Order
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop:88, background:T.cream, minHeight:"100vh", paddingBottom:60 }}>
      <div style={{ maxWidth:640, margin:"0 auto", padding:"40px 24px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div className="section-label" style={{ justifyContent:"center" }}>Let's Get Baking</div>
          <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:"clamp(28px,4vw,44px)", color:T.dark, marginTop:12 }}>
            Order a Custom <span style={{ color:T.p600, fontStyle:"italic" }}>Cake</span>
          </h2>
        </div>

        {/* Step indicator */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom:36, gap:0 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{
                  width:40, height:40, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                  background: i+1 < step ? `linear-gradient(135deg,${T.p500},${T.p700})` :
                               i+1 === step ? `linear-gradient(135deg,${T.p400},${T.p600})` : T.p100,
                  color: i+1 <= step ? "white" : T.soft,
                  fontFamily:FONT_BODY, fontWeight:700, fontSize:16,
                  boxShadow: i+1 === step ? `0 4px 16px ${T.p500}40` : "none",
                  transition:"all 0.3s",
                }}>
                  {i+1 < step ? "✓" : i+1}
                </div>
                <div style={{ fontFamily:FONT_BODY, fontSize:12, fontWeight:600, color: i+1<=step?T.p600:T.soft }}>
                  {s}
                </div>
              </div>
              {i < steps.length-1 && (
                <div style={{ width:80, height:2, background: i+1 < step ? T.p400 : T.p100, margin:"0 8px", marginBottom:20, transition:"background 0.3s" }}/>
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="card" style={{ padding:36 }}>

          {/* Step 1 */}
          {step === 1 && (
            <div style={{ animation:"slidein 0.4s ease" }}>
              <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:22, color:T.dark, marginBottom:24 }}>Cake Details</h3>

              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <div>
                  <label>What type of cake?</label>
                  <select value={form.type} onChange={e => set("type", e.target.value)}>
                    <option value="">Select a cake type…</option>
                    {CAKES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label>Flavor</label>
                  <select value={form.flavor} onChange={e => set("flavor", e.target.value)}>
                    <option value="">Choose a flavor…</option>
                    {FLAVORS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                  </select>
                </div>

                <div>
                  <label>Size / Serves</label>
                  <select value={form.size} onChange={e => set("size", e.target.value)}>
                    <option value="">Choose a size…</option>
                    <option>6" Round (Serves 8–10)</option>
                    <option>8" Round (Serves 14–18)</option>
                    <option>10" Round (Serves 22–28)</option>
                    <option>2-Tier (Serves 35–50)</option>
                    <option>3-Tier (Serves 60–90)</option>
                    <option>Sheet Cake (Serves 20–50)</option>
                    <option>Cupcakes (1 dozen)</option>
                    <option>Cupcakes (2+ dozen)</option>
                  </select>
                </div>

                <div>
                  <label>Occasion</label>
                  <select value={form.occasion} onChange={e => set("occasion", e.target.value)}>
                    <option value="">Select an occasion…</option>
                    {["Birthday","Wedding","Anniversary","Baby Shower","Graduation","Corporate Event","Just Because","Other"].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Date Needed</label>
                  <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                    min={new Date(Date.now()+3*24*60*60*1000).toISOString().split("T")[0]}/>
                  <div style={{ fontFamily:FONT_BODY, fontSize:12, color:T.soft, marginTop:4 }}>
                    Please allow at least 3–5 days for custom cakes; 2+ weeks for wedding cakes.
                  </div>
                </div>

                <div>
                  <label>Delivery or Pickup?</label>
                  <select value={form.delivery} onChange={e => set("delivery", e.target.value)}>
                    <option value="">Select…</option>
                    <option>Pickup (Avon, IN)</option>
                    <option>Local Delivery (+$15–$35)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop:28, display:"flex", justifyContent:"flex-end" }}>
                <button className="btn-primary" disabled={!isStep1Complete}
                  style={{ opacity: isStep1Complete ? 1 : 0.5 }}
                  onClick={() => isStep1Complete && setStep(2)}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={{ animation:"slidein 0.4s ease" }}>
              <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:22, color:T.dark, marginBottom:24 }}>Your Information</h3>

              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <div>
                  <label>Your Name</label>
                  <input placeholder="Full name" value={form.name} onChange={e => set("name", e.target.value)}/>
                </div>
                <div>
                  <label>Email Address</label>
                  <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)}/>
                </div>
                <div>
                  <label>Phone Number</label>
                  <input type="tel" placeholder="(317) 555-0100" value={form.phone} onChange={e => set("phone", e.target.value)}/>
                </div>
                <div>
                  <label>Special Requests / Design Notes</label>
                  <textarea rows={4} placeholder="Colors, themes, personalization, dietary needs, inspiration photos to share later…"
                    value={form.notes} onChange={e => set("notes", e.target.value)}
                    style={{ resize:"vertical" }}/>
                </div>
              </div>

              <div style={{ marginTop:28, display:"flex", gap:12, justifyContent:"space-between" }}>
                <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary" disabled={!isStep2Complete}
                  style={{ opacity: isStep2Complete ? 1 : 0.5 }}
                  onClick={() => isStep2Complete && setStep(3)}>
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div style={{ animation:"slidein 0.4s ease" }}>
              <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:22, color:T.dark, marginBottom:20 }}>Review & Confirm</h3>

              <div style={{ background:T.p50, borderRadius:16, padding:24, marginBottom:24,
                border:`2px solid ${T.p100}` }}>
                {[
                  ["Cake Type", form.type],
                  ["Flavor", form.flavor],
                  ["Size", form.size],
                  ["Occasion", form.occasion],
                  ["Date Needed", form.date],
                  ["Delivery", form.delivery],
                  ["Name", form.name],
                  ["Email", form.email],
                  ["Phone", form.phone],
                  form.notes ? ["Notes", form.notes] : null,
                ].filter(Boolean).map(([k,v], i) => (
                  <div key={i} style={{ display:"flex", gap:12, padding:"8px 0",
                    borderBottom: i < 8 ? `1px solid ${T.p100}` : "none" }}>
                    <span style={{ fontFamily:FONT_BODY, fontSize:13, fontWeight:700, color:T.mid, minWidth:100 }}>{k}</span>
                    <span style={{ fontFamily:FONT_BODY, fontSize:13, color:T.dark }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding:16, borderRadius:14, background:`linear-gradient(135deg,${T.p50},${T.p100})`,
                border:`1px solid ${T.p200}`, marginBottom:24 }}>
                <p style={{ fontFamily:FONT_BODY, fontSize:13, color:T.mid, lineHeight:1.6 }}>
                  💌 After submitting, we'll contact you within <strong>24 hours</strong> to discuss pricing, confirm details, and collect a 50% deposit to hold your date.
                </p>
              </div>

              <div style={{ display:"flex", gap:12, justifyContent:"space-between" }}>
                <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                <button className="btn-primary" onClick={() => setSubmitted(true)}>
                  Submit Order 🎀
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── FOOTER ──────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer style={{ background:`linear-gradient(135deg, ${T.p800}, ${T.p900})`, padding:"60px 24px 32px", color:"white" }}>
    <div style={{ maxWidth:1160, margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:40, marginBottom:48 }}>

        <div>
          <div style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:28, fontStyle:"italic", color:"white", marginBottom:8 }}>
            Shug's Cakes
          </div>
          <p style={{ fontFamily:FONT_BODY, fontSize:14, color:T.p200, lineHeight:1.7 }}>
            Custom cakes baked with love in Avon, Indiana. Serving Indianapolis and surrounding areas.
          </p>
        </div>

        <div>
          <div style={{ fontFamily:FONT_BODY, fontWeight:700, fontSize:13, letterSpacing:2, textTransform:"uppercase",
            color:T.p300, marginBottom:16 }}>Navigate</div>
          {["home","menu","flavors","gallery","about","order"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              display:"block", background:"none", border:"none", cursor:"pointer",
              fontFamily:FONT_BODY, fontSize:14, color:T.p200, marginBottom:8,
              textTransform:"capitalize", padding:0, transition:"color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color="white"}
              onMouseLeave={e => e.currentTarget.style.color=T.p200}
            >
              {p === "menu" ? "Our Cakes" : p}
            </button>
          ))}
        </div>

        <div>
          <div style={{ fontFamily:FONT_BODY, fontWeight:700, fontSize:13, letterSpacing:2, textTransform:"uppercase",
            color:T.p300, marginBottom:16 }}>Contact</div>
          {[
            { icon:"📍", text:"Avon, Indiana 46123" },
            { icon:"📞", text:"(317) 555-0182" },
            { icon:"📩", text:"hello@shugscakes.com" },
            { icon:"🕐", text:"Tue–Sat, 9am–5pm" },
          ].map((c,i) => (
            <div key={i} style={{ display:"flex", gap:8, marginBottom:10 }}>
              <span>{c.icon}</span>
              <span style={{ fontFamily:FONT_BODY, fontSize:14, color:T.p200 }}>{c.text}</span>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontFamily:FONT_BODY, fontWeight:700, fontSize:13, letterSpacing:2, textTransform:"uppercase",
            color:T.p300, marginBottom:16 }}>Order Lead Times</div>
          {[
            ["Cupcakes", "48 hours"],
            ["Sheet Cakes", "3–5 days"],
            ["Custom Cakes", "1+ week"],
            ["Wedding Cakes", "2–4 weeks"],
          ].map(([k,v],i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:10,
              fontFamily:FONT_BODY, fontSize:13 }}>
              <span style={{ color:T.p200 }}>{k}</span>
              <span style={{ color:T.p300, fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop:`1px solid ${T.p700}`, paddingTop:24, display:"flex",
        justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div style={{ fontFamily:FONT_BODY, fontSize:13, color:T.p400 }}>
          © 2024 Shug's Cakes. All rights reserved. Baked with 💕 in Indiana.
        </div>
        <div style={{ fontFamily:FONT_BODY, fontSize:13, color:T.p400 }}>
          Follow us: 📷 @shugscakes · 👍 /shugscakes
        </div>
      </div>
    </div>
  </footer>
);

// ─── HOME PAGE ───────────────────────────────────────────────────────
const HomePage = ({ setPage }) => (
  <>
    <Hero setPage={setPage} />
    <StatsStrip />
    <Reviews />
    {/* CTA Band */}
    <section style={{ padding:"60px 24px", background:`linear-gradient(135deg,${T.p600},${T.p900})`, textAlign:"center" }}>
      <div style={{ fontSize:40, marginBottom:16 }}>🎂</div>
      <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:"clamp(28px,4vw,44px)", color:"white", marginBottom:12 }}>
        Ready to Order?
      </h2>
      <p style={{ fontFamily:FONT_BODY, fontSize:16, color:T.p200, marginBottom:28, maxWidth:440, margin:"0 auto 28px" }}>
        Every cake is a celebration. Let's make yours unforgettable.
      </p>
      <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
        <button className="btn-primary" style={{ background:"white", color:T.p700, boxShadow:"0 8px 28px rgba(0,0,0,0.2)" }}
          onClick={() => setPage("order")}>
          Start My Order 🎀
        </button>
        <button onClick={() => setPage("flavors")} style={{
          display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", borderRadius:50,
          border:"2px solid rgba(255,255,255,0.4)", background:"transparent", color:"white",
          fontFamily:FONT_BODY, fontWeight:600, fontSize:15, cursor:"pointer", transition:"all 0.2s",
        }}>
          Browse Flavors
        </button>
      </div>
    </section>
  </>
);

// ─── APP ─────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top:0, behavior:"smooth" });
  }, [page]);

  const goTo = (p) => setPage(p);

  return (
    <>
      <G />
      <Nav page={page} setPage={goTo} />
      {page === "home"    && <HomePage setPage={goTo} />}
      {page === "menu"    && <MenuPage setPage={goTo} />}
      {page === "flavors" && <FlavorsPage />}
      {page === "gallery" && <GalleryPage />}
      {page === "about"   && <AboutPage />}
      {page === "order"   && <OrderPage />}
      <Footer setPage={goTo} />
    </>
  );
}
