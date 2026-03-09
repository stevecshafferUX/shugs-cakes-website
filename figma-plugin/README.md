# Shug's Cakes — Figma Design Plugin

Generates a complete, editable Figma design file from the site.

## How to run

1. **Open Figma desktop app** (download from figma.com if needed)
2. **Create a new empty file** (File → New design file)
3. **Import the plugin:**
   - Menu → Plugins → Development → **Import plugin from manifest…**
   - Select `figma-plugin/manifest.json` from this project folder
4. **Run the plugin:**
   - Menu → Plugins → Development → **Shug's Cakes – Build Design File**
5. Wait ~5 seconds — the plugin will build the file and zoom to fit.

## What gets created

### 🏠 Home page
All six sections stacked at 1440px width, ready to edit:

| Section | Height |
|---|---|
| Navigation | 72px |
| Hero (image + text panel) | 720px |
| About | 500px |
| CTA | 300px |
| Info Cards | 360px |
| Footer | 72px |

### 🎨 Design Tokens page
- **Color Palette** — all 11 brand colours as labelled swatches
- **Typography** — every text style from logo to body copy
- **Buttons** — primary, secondary, outline, and nav variants

## After running

- **Replace the hero image:** select the `Image (replace with cake photo)` rectangle in the Hero frame and use **Fill → Image** to drop in a cake photo.
- **Edit text:** double-click any text layer.
- **Fonts used:** Great Vibes · Bricolage Grotesque · DM Sans (all Google Fonts — available in Figma by default).
- If a font shows as missing, go to **Type → Missing Fonts** and replace with the nearest match.
