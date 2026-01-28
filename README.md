# Shug's Cakes Website

A modern React-based website for Shug's Cakes featuring an interactive order form, built with **shadcn/ui** and **Tailwind CSS** for maximum AI-friendliness and developer experience.

## Features

- **AI-Optimized Components**: Built with shadcn/ui for easy AI-assisted development
- **Secure Authentication**: Supabase-powered auth for customers and admins
- **Form Validation**: Zod validation with real-time feedback
- **Toast Notifications**: User-friendly notifications with Sonner
- Interactive order form with database integration
- Complete website pages: Home, Gallery, Pricing, Flavors, Contact
- Admin dashboard for order management
- Clean, modern UI with Tailwind CSS
- Fully responsive design
- Accessible components using Radix UI primitives

## Tech Stack

- **React 19** - Latest React with modern features
- **Vite** - Lightning-fast build tool
- **Supabase** - Backend, auth, and PostgreSQL database
- **shadcn/ui** - Copy-paste components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing
- **Zod** - TypeScript-first schema validation
- **Sonner** - Toast notifications

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Supabase credentials and admin emails
4. Set up the database (see `DATABASE_SCHEMA.md`)
5. Set up admin users (see `ADMIN_SETUP.md`)

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
shugs-cakes-website/
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   ├── textarea.jsx
│   │   │   └── dropdown-menu.jsx
│   │   ├── Header.jsx          # Site header with navigation
│   │   ├── Footer.jsx          # Site footer
│   │   └── OrderForm.jsx       # Main order form component
│   ├── pages/
│   │   ├── Home.jsx            # Home/Welcome page
│   │   ├── Gallery.jsx         # Gallery with categories
│   │   ├── Pricing.jsx         # Pricing page
│   │   ├── Flavors.jsx         # Cake flavors page
│   │   └── Contact.jsx         # Contact page
│   ├── lib/
│   │   └── utils.js            # Utility functions (cn helper)
│   ├── App.jsx                 # Main app with routing
│   └── index.css               # Global styles & Tailwind
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── jsconfig.json               # Path aliases (@/...)
└── package.json
```

## Adding shadcn/ui Components

This project uses shadcn/ui components. All components are copied into the codebase for full control.

To add new shadcn/ui components manually:

1. Copy the component code from [ui.shadcn.com](https://ui.shadcn.com)
2. Place it in `src/components/ui/`
3. Import and use in your pages

Example components already included:
- Button
- Card
- Input
- Label
- Textarea
- Dropdown Menu

## AI-Friendly Development

This codebase is optimized for AI-assisted development:

### Using with Claude, ChatGPT, or other AI tools:

```plaintext
Example prompts:

"Add a new section to the Home page with three cards showing our specialties"
"Create a testimonials component using shadcn/ui Card"
"Update the OrderForm to include a delivery option checkbox"
"Add a FAQ page using shadcn/ui Accordion component"
```

### Key Patterns:

1. **Import shadcn/ui components**:
   ```jsx
   import { Button } from '@/components/ui/button'
   import { Card, CardContent } from '@/components/ui/card'
   ```

2. **Use Tailwind classes**:
   ```jsx
   <div className="flex items-center justify-between p-4">
   ```

3. **Follow existing patterns** in pages for consistency

## Customization

### Colors

Primary colors are configured in `src/index.css` using HSL values:
- Primary (Pink): `330 81% 60%` (#ff69b4)
- Secondary (Dark): `0 0% 18%` (#2f2e2e)

To change colors, modify the CSS variables in `:root`.

### Components

All shadcn/ui components can be customized by editing files in `src/components/ui/`.

## Pages

- **Home** (`/`) - Welcome page with business info
- **Gallery** (`/gallery/:category`) - Cake galleries by category
- **Pricing** (`/pricing`) - Pricing information
- **Flavors** (`/flavors`) - Available cake flavors, frostings, and fillings
- **Contact** (`/contact`) - Contact form and business details
- **Order Form** (`/order`) - Custom cake order form

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (automatic configuration)

### Other Platforms

Build command: `npm run build`
Output directory: `dist`

## License

This project is created for Shug's Cakes.
