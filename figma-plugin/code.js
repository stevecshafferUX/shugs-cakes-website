// ============================================================
//  Shug's Cakes – Figma Design File Builder
//  Generates a complete, editable design file from the site.
// ============================================================

(async () => {

  // ── COLOUR TOKENS ────────────────────────────────────────
  const C = {
    cream:     { r: 0.933, g: 0.953, b: 0.992 }, // #eef3fd  — page background
    warmWhite: { r: 0.961, g: 0.973, b: 1.000 }, // #f5f8ff  — section background
    brown:     { r: 0.227, g: 0.373, b: 0.627 }, // #3a5fa0  — body text / links
    darkBrown: { r: 0.102, g: 0.188, b: 0.400 }, // #1a3066  — headings
    gold:      { r: 0.392, g: 0.584, b: 0.929 }, // #6495ed  — accent / cornflower
    mutedGold: { r: 0.576, g: 0.706, b: 0.961 }, // #93b4f5  — muted accent
    linen:     { r: 0.784, g: 0.851, b: 0.961 }, // #c8d9f5  — borders
    pink:      { r: 1.000, g: 0.431, b: 0.706 }, // #ff6eb4  — CTA primary
    pinkDark:  { r: 0.878, g: 0.259, b: 0.557 }, // #e0428e  — CTA hover
    sage:      { r: 0.431, g: 0.494, b: 0.549 }, // #6e7e8c  — muted text
    footer:    { r: 0.051, g: 0.102, b: 0.200 }, // #0d1a33  — footer bg
    white:     { r: 1.000, g: 1.000, b: 1.000 },
  };

  // ── FONT DEFINITIONS ─────────────────────────────────────
  const F = {
    logo:       { family: 'Great Vibes',           style: 'Regular'   },
    headXL:     { family: 'Bricolage Grotesque',   style: 'ExtraBold' },
    headLg:     { family: 'Bricolage Grotesque',   style: 'Bold'      },
    headMd:     { family: 'Bricolage Grotesque',   style: 'SemiBold'  },
    bodyReg:    { family: 'DM Sans',               style: 'Regular'   },
    bodyMed:    { family: 'DM Sans',               style: 'Medium'    },
    bodySemi:   { family: 'DM Sans',               style: 'SemiBold'  },
    bodyItal:   { family: 'DM Sans',               style: 'Italic'    },
  };

  // Load all fonts; fall back to Inter if unavailable
  const loaded = {};
  for (const [key, font] of Object.entries(F)) {
    try {
      await figma.loadFontAsync(font);
      loaded[key] = font;
    } catch {
      await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
      loaded[key] = { family: 'Inter', style: 'Regular' };
      console.warn(`Font unavailable: ${font.family} ${font.style} — using Inter`);
    }
  }

  // ── HELPERS ──────────────────────────────────────────────
  const W = 1440; // canvas width

  function solidFill(c, a = 1) {
    return [{ type: 'SOLID', color: c, opacity: a }];
  }

  function makeFrame(name, w, h, bg) {
    const f = figma.createFrame();
    f.name = name;
    f.resize(w, h);
    f.fills = bg ? solidFill(bg) : [];
    f.clipsContent = true;
    return f;
  }

  function makeRect(name, w, h, bg, radius = 0) {
    const r = figma.createRectangle();
    r.name = name;
    r.resize(w, h);
    r.fills = solidFill(bg);
    r.cornerRadius = radius;
    return r;
  }

  function makeText(chars, fontKey, size, color, opts = {}) {
    const t = figma.createText();
    t.fontName = loaded[fontKey];
    t.fontSize = size;
    t.fills = solidFill(color);
    if (opts.width) {
      t.textAutoResize = 'HEIGHT';
      t.resize(opts.width, 200);
    }
    t.characters = chars;
    if (opts.align)         t.textAlignHorizontal = opts.align;
    if (opts.name)          t.name = opts.name;
    if (opts.letterSpacing) t.letterSpacing = { value: opts.letterSpacing, unit: 'PERCENT' };
    if (opts.lineHeight)    t.lineHeight    = { value: opts.lineHeight,    unit: 'PERCENT' };
    return t;
  }

  function place(node, x, y) { node.x = x; node.y = y; }

  function add(parent, node, x, y) {
    parent.appendChild(node);
    place(node, x, y);
  }

  // ── REUSABLE BUTTON BUILDER ───────────────────────────────
  function makeButton(label, style = 'primary', w = 160) {
    const bg   = style === 'primary'   ? C.pink  :
                 style === 'secondary' ? C.pink  : null;
    const fc   = style === 'outline'   ? C.brown : C.white;
    const btn  = makeFrame(`Button / ${label}`, w, 48, bg);
    btn.cornerRadius = 8;
    if (style === 'outline') {
      btn.fills   = [];
      btn.strokes = solidFill(C.brown);
      btn.strokeWeight = 2;
      btn.strokeAlign = 'INSIDE';
    }
    const lbl = makeText(label.toUpperCase(), 'bodySemi', 12, fc, {
      letterSpacing: 10, align: 'CENTER', width: w,
    });
    lbl.name = 'Label';
    btn.appendChild(lbl);
    lbl.y = Math.round((48 - lbl.height) / 2);
    return btn;
  }

  // ── PAGE SETUP ───────────────────────────────────────────
  const homePage = figma.currentPage;
  homePage.name = '🏠 Home';

  let curY = 0;
  function addSection(frame) {
    homePage.appendChild(frame);
    frame.x = 0;
    frame.y = curY;
    curY += frame.height;
  }

  // ════════════════════════════════════════════════════════
  //  SECTION 1 — NAVIGATION
  // ════════════════════════════════════════════════════════
  {
    const nav = makeFrame('Navigation', W, 72, { r: 0.933, g: 0.953, b: 0.992 });

    // Bottom border
    const border = makeRect('Border', W, 1, C.linen);
    add(nav, border, 0, 71);

    // Logo
    const logo = makeText("Shug's Cakes", 'logo', 34, C.brown, { name: 'Logo' });
    add(nav, logo, 56, 13);

    // Nav links
    const links = ['Welcome', 'Cake Gallery', 'Pricing', 'Cake Flavors', 'Contact'];
    let lx = 480;
    for (const link of links) {
      const t = makeText(link, 'bodySemi', 11, C.brown, {
        letterSpacing: 8, name: `Link / ${link}`,
      });
      add(nav, t, lx, Math.round((72 - t.height) / 2));
      lx += t.width + 44;
    }

    // Order Form button
    const orderBtn = makeButton('Order Form', 'primary', 136);
    add(nav, orderBtn, W - 56 - 136, 12);

    addSection(nav);
  }

  // ════════════════════════════════════════════════════════
  //  SECTION 2 — HERO  (image left · text panel right)
  // ════════════════════════════════════════════════════════
  {
    const H    = 720;
    const imgW = Math.round(W * 0.55); // 792
    const txtW = W - imgW;             // 648

    const hero = makeFrame('Hero', W, H, null);

    // — left: image placeholder —
    const imgPanel = makeRect('Image (replace with cake photo)', imgW, H, C.linen);
    add(hero, imgPanel, 0, 0);

    const camIcon = makeText('🎂', 'bodyReg', 72, C.gold, { name: 'Placeholder Icon' });
    add(hero, camIcon, Math.round((imgW - 72) / 2), Math.round((H - 72) / 2) - 28);

    const imgHint = makeText('Replace with cake photo', 'bodyMed', 15, C.brown, {
      align: 'CENTER', width: 300, name: 'Placeholder Label',
    });
    add(hero, imgHint, Math.round((imgW - 300) / 2), Math.round(H / 2) + 56);

    // — right: dark text panel —
    const panel = makeFrame('Text Panel', txtW, H, C.darkBrown);
    add(hero, panel, imgW, 0);

    const eyebrow = makeText('Est. 2016  ·  Avon, Indiana', 'bodyMed', 11, C.mutedGold, {
      letterSpacing: 25, name: 'Eyebrow',
    });
    add(panel, eyebrow, 56, 200);

    const h1 = makeText("Welcome to\nShug's Cakes", 'logo', 72, C.white, {
      lineHeight: 115, width: txtW - 112, name: 'Headline',
    });
    add(panel, h1, 56, 246);

    const tagline = makeText('Homemade with Love', 'bodyItal', 14, C.mutedGold, {
      letterSpacing: 15, name: 'Tagline',
    });
    add(panel, tagline, 56, 414);

    const viewBtn  = makeButton('View Gallery', 'primary',  160);
    const orderBtn = makeButton('Order Now',    'secondary', 140);
    add(panel, viewBtn,  56, 480);
    add(panel, orderBtn, 232, 480);

    // Pink bottom border
    const heroBar = makeRect('Accent Border', W, 3, C.pink);
    add(hero, heroBar, 0, H - 3);

    addSection(hero);
  }

  // ════════════════════════════════════════════════════════
  //  SECTION 3 — ABOUT
  // ════════════════════════════════════════════════════════
  {
    const about = makeFrame('About', W, 500, C.cream);

    const h2 = makeText("About Shug's Cakes", 'headLg', 36, C.darkBrown, {
      align: 'CENTER', width: 640, name: 'Section Title',
    });
    add(about, h2, Math.round((W - 640) / 2), 64);

    const rule = makeRect('Rule', 60, 2, C.gold);
    add(about, rule, Math.round((W - 60) / 2), 120);

    const paras = [
      "Hi, I'm Chris! I started baking as a young girl and decided to make a business out of it. My love for decorating cakes began with my first job in high school at Baskin Robbins.",
      "I believe that cakes should taste as good as they look. That's why I focus on creating moist cakes with buttercream made from real butter. All our cakes, cupcakes, and other desserts are homemade with love and care.",
      "This business is named after my grandmother Helen, affectionately nicknamed \"Shug.\" She was known for her warm hospitality and amazing cooking skills. She continues to be my inspiration in everything I create.",
    ];

    let py = 148;
    for (const p of paras) {
      const body = makeText(p, 'bodyReg', 17, C.brown, {
        lineHeight: 190, width: 720, name: 'Paragraph',
      });
      add(about, body, Math.round((W - 720) / 2), py);
      py += body.height + 18;
    }

    addSection(about);
  }

  // ════════════════════════════════════════════════════════
  //  SECTION 4 — CTA
  // ════════════════════════════════════════════════════════
  {
    const cta = makeFrame('CTA', W, 300, C.warmWhite);

    const topLine = makeRect('Top Border', W, 1, C.linen);
    add(cta, topLine, 0, 0);
    const botLine = makeRect('Bottom Border', W, 1, C.linen);
    add(cta, botLine, 0, 299);

    const h2 = makeText('Ready to Order?', 'headLg', 36, C.darkBrown, {
      align: 'CENTER', width: 600, name: 'CTA Title',
    });
    add(cta, h2, Math.round((W - 600) / 2), 52);

    const sub = makeText(
      'Browse our gallery for inspiration or contact us to discuss your custom cake design.',
      'bodyReg', 17, C.brown, { align: 'CENTER', lineHeight: 170, width: 640, name: 'CTA Subtitle' },
    );
    add(cta, sub, Math.round((W - 640) / 2), 104);

    const btns = [
      makeButton('View Gallery', 'primary',   160),
      makeButton('Order Now',    'secondary', 140),
      makeButton('Contact Us',   'outline',   140),
    ];
    const totalBtnW = btns.reduce((sum, b) => sum + b.width, 0) + 16 * (btns.length - 1);
    let bx = Math.round((W - totalBtnW) / 2);
    for (const b of btns) {
      add(cta, b, bx, 210);
      bx += b.width + 16;
    }

    addSection(cta);
  }

  // ════════════════════════════════════════════════════════
  //  SECTION 5 — INFO CARDS
  // ════════════════════════════════════════════════════════
  {
    const cards = [
      { title: 'Custom Orders Only',
        body:  'We operate from a commercial bakery and only fill custom orders. Each cake is made specifically for you!' },
      { title: 'Pickup Hours',
        body:  'Weekends:  7:00am – 10:00am\nWeekdays:  7:00am – 6:00pm' },
      { title: 'Location',
        body:  'Avon, IN 46123\nDirections provided upon ordering' },
    ];

    const cardW   = 380;
    const gap     = Math.round((W - 112 - cardW * 3) / 2);
    const section = makeFrame('Info Cards', W, 360, C.cream);

    let cx = 56;
    for (const c of cards) {
      const card = makeFrame(`Card / ${c.title}`, cardW, 248, C.warmWhite);
      card.cornerRadius = 8;
      card.strokes      = solidFill(C.linen);
      card.strokeWeight = 1;
      card.strokeAlign  = 'INSIDE';

      const title = makeText(c.title, 'headLg', 18, C.darkBrown, {
        align: 'CENTER', width: cardW - 48, name: 'Title',
      });
      card.appendChild(title);
      title.x = 24;
      title.y = 40;

      const body = makeText(c.body, 'bodyReg', 15, C.brown, {
        align: 'CENTER', lineHeight: 170, width: cardW - 48, name: 'Body',
      });
      card.appendChild(body);
      body.x = 24;
      body.y = title.y + title.height + 16;

      add(section, card, cx, 56);
      cx += cardW + gap;
    }

    addSection(section);
  }

  // ════════════════════════════════════════════════════════
  //  SECTION 6 — FOOTER
  // ════════════════════════════════════════════════════════
  {
    const footer = makeFrame('Footer', W, 72, C.footer);

    const logo = makeText("Shug's Cakes", 'logo', 26, C.mutedGold, { name: 'Footer Logo' });
    add(footer, logo, 56, Math.round((72 - logo.height) / 2));

    const copy = makeText(
      `© 2016–${new Date().getFullYear()} Shug's Cakes — All Rights Reserved`,
      'bodyReg', 12, C.brown, { name: 'Copyright' },
    );
    add(footer, copy, Math.round((W - copy.width) / 2), Math.round((72 - copy.height) / 2));

    // Social icon placeholders
    const fb = makeRect('Facebook Icon', 28, 28, C.brown, 14);
    add(footer, fb, W - 56 - 28 - 16 - 28, Math.round((72 - 28) / 2));

    const ig = makeRect('Instagram Icon', 28, 28, C.brown, 14);
    add(footer, ig, W - 56 - 28, Math.round((72 - 28) / 2));

    addSection(footer);
  }

  // ════════════════════════════════════════════════════════
  //  PAGE 2 — DESIGN TOKENS
  // ════════════════════════════════════════════════════════
  const tokensPage = figma.createPage();
  tokensPage.name = '🎨 Design Tokens';

  // — Color Palette ——————————————————————————————————————
  const palette = [
    ['Cream',              C.cream,     '#eef3fd', false],
    ['Warm White',         C.warmWhite, '#f5f8ff', false],
    ['Brown / Links',      C.brown,     '#3a5fa0', true ],
    ['Dark Brown / Heads', C.darkBrown, '#1a3066', true ],
    ['Gold / Accent',      C.gold,      '#6495ed', true ],
    ['Muted Gold',         C.mutedGold, '#93b4f5', false],
    ['Linen / Borders',    C.linen,     '#c8d9f5', false],
    ['Pink / CTA',         C.pink,      '#ff6eb4', true ],
    ['Pink Dark / Hover',  C.pinkDark,  '#e0428e', true ],
    ['Sage / Muted',       C.sage,      '#6e7e8c', true ],
    ['Footer BG',          C.footer,    '#0d1a33', true ],
  ];

  const colFrame = makeFrame('Color Palette', W, 320, C.white);
  tokensPage.appendChild(colFrame);
  colFrame.x = 0; colFrame.y = 0;

  const colTitle = makeText('Color Palette', 'headLg', 28, C.darkBrown, { name: 'Section Title' });
  add(colFrame, colTitle, 56, 24);

  let sx = 56;
  const swW = 96, swH = 96, swGap = 20;
  for (const [name, color, hex, dark] of palette) {
    const swatch = makeRect(`Swatch / ${name}`, swW, swH, color, 10);
    if (!dark) { swatch.strokes = solidFill(C.linen); swatch.strokeWeight = 1; }
    add(colFrame, swatch, sx, 76);

    const lbl = makeText(name, 'bodyMed', 11, C.darkBrown, { align: 'CENTER', width: swW });
    add(colFrame, lbl, sx, 184);

    const hex_ = makeText(hex, 'bodyReg', 10, C.sage, { align: 'CENTER', width: swW });
    add(colFrame, hex_, sx, 184 + lbl.height + 2);

    sx += swW + swGap;
  }

  // — Typography ————————————————————————————————————————
  const typoFrame = makeFrame('Typography', W, 560, C.white);
  tokensPage.appendChild(typoFrame);
  typoFrame.x = 0; typoFrame.y = 340;

  const typoTitle = makeText('Typography', 'headLg', 28, C.darkBrown, { name: 'Section Title' });
  add(typoFrame, typoTitle, 56, 24);

  const samples = [
    ["Shug's Cakes",                             'logo',    56, C.brown,     'Great Vibes 56 — Logo'],
    ['Page Heading — Bricolage Grotesque XBold', 'headXL',  36, C.darkBrown, 'Heading 1 / 36px'],
    ['Section Title — Bricolage Grotesque Bold', 'headLg',  28, C.darkBrown, 'Heading 2 / 28px'],
    ['Card Title — Bricolage Grotesque SemiBold','headMd',  20, C.darkBrown, 'Heading 3 / 20px'],
    ['Body copy — DM Sans Regular. Custom cakes made from scratch with real butter.', 'bodyReg', 17, C.brown, 'Body / 17px'],
    ['EST. 2016 · AVON, INDIANA  ·  DM Sans Italic', 'bodyItal', 13, C.mutedGold, 'Eyebrow / Tagline'],
    ['BUTTON LABEL',                             'bodySemi', 12, C.white,    'Button / 12px'],
  ];

  let ty = 80;
  const labelCol = 56, sampleCol = 300;
  for (const [chars, fk, size, color, roleName] of samples) {
    const role = makeText(roleName, 'bodyReg', 11, C.sage, { name: `Role / ${roleName}` });
    add(typoFrame, role, labelCol, ty + Math.max(0, Math.round((size - 14) / 2)));

    const sample = makeText(chars, fk, size, color, { name: roleName, width: W - sampleCol - 56 });
    add(typoFrame, sample, sampleCol, ty);

    ty += Math.max(size + 24, 44);
  }

  // — Component Buttons ————————————————————————————————
  const btnFrame = makeFrame('Buttons', W, 160, C.white);
  tokensPage.appendChild(btnFrame);
  btnFrame.x = 0; btnFrame.y = 920;

  const btnTitle = makeText('Buttons', 'headLg', 28, C.darkBrown, { name: 'Section Title' });
  add(btnFrame, btnTitle, 56, 16);

  const btnSamples = [
    makeButton('Primary CTA',  'primary',   180),
    makeButton('Secondary CTA','secondary', 180),
    makeButton('Outline',      'outline',   160),
    makeButton('Order Form',   'primary',   160),
  ];
  let bx2 = 56;
  for (const b of btnSamples) {
    add(btnFrame, b, bx2, 72);
    bx2 += b.width + 20;
  }

  // ════════════════════════════════════════════════════════
  //  FINISH — zoom to home page
  // ════════════════════════════════════════════════════════
  figma.currentPage = homePage;

  const allNodes = homePage.children.filter(n => n.type === 'FRAME');
  if (allNodes.length) figma.viewport.scrollAndZoomIntoView(allNodes);

  figma.notify("✅ Shug's Cakes design file built successfully!", { timeout: 5000 });
  figma.closePlugin();

})();
