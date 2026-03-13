# Agricultural AI Portfolio

A modern, Apple-inspired portfolio showcasing AI engineering work in agricultural technology. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Apple-inspired Design**: Clean, minimal aesthetic with smooth animations
- **Agricultural Theme**: Nature-inspired color palette with modern green and tech blue accents
- **Responsive Layout**: Mobile-first design that works beautifully on all devices
- **Project Case Studies**: Detailed pages for AgriSense, ESP32 Leaf Scanner, ARMS, and Realitech projects
- **SEO Optimized**: Server-side rendering, semantic HTML, and optimized metadata
- **Accessibility**: WCAG AA compliant with keyboard navigation and reduced motion support
- **Smooth Animations**: Framer Motion for elegant transitions and interactions

## 🎨 Design System

### Colors
- **Background**: `#F7F9F6` (soft natural white)
- **Green Primary**: `#2E7D32` (deep modern green)
- **Green Accent**: `#3FA34D` (brighter CTA green)
- **Blue Accent**: `#4F7DF3` (soft tech glow)
- **Text**: `#1C1C1C` (primary)
- **Muted**: `#6B7280` (secondary)

### Typography
- **Headings**: Space Grotesk (modern, geometric)
- **Body**: Inter (neutral, readable)
- **Sizes**: H1 56px / H2 36px / H3 24px / Body 16px

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 🔧 Customization Guide

### 1. Update Personal Information

**[app/layout.tsx](app/layout.tsx)** - Update metadata:
```typescript
title: "Your Name — AI Engineer (Agri-AI, Edge AI)",
description: "Your custom description",
```

**[components/Header.tsx](components/Header.tsx)** - Update logo and name

**[components/Hero.tsx](components/Hero.tsx)** - Update headline and tagline

**[components/ContactForm.tsx](components/ContactForm.tsx)** - Update email and social links

**[components/Footer.tsx](components/Footer.tsx)** - Update footer information

### 2. Add Your Content

**Projects** - Edit [lib/projects.ts](lib/projects.ts) with your actual project details

**Publications** - Update [components/Publications.tsx](components/Publications.tsx) with your research

**Skills** - Modify [components/Skills.tsx](components/Skills.tsx) with your tech stack

### 3. Add Your Assets

Replace placeholders in `public/` directory:

```
public/
├── images/projects/
│   ├── agrisense-thumb.jpg
│   ├── agrisense-hero.jpg
│   ├── esp32-thumb.jpg
│   └── ... (see PLACEHOLDER_GUIDE.md)
├── papers/
│   └── your-research-papers.pdf
├── resume.pdf
└── og-image.png (1200x630px)
```

See [public/PLACEHOLDER_GUIDE.md](public/PLACEHOLDER_GUIDE.md) for complete asset list.

### 4. Setup Contact Form (Optional)

To enable email functionality:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Install SDK: `npm install @emailjs/browser`
3. Update [components/ContactForm.tsx](components/ContactForm.tsx) with your credentials

### 5. Update Domain URLs

Replace `yourportfolio.com` in:
- [app/layout.tsx](app/layout.tsx)
- [app/sitemap.ts](app/sitemap.ts)
- [app/robots.ts](app/robots.ts)

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Deploy automatically

### Static Export

For hosting on any static host:

1. Enable in [next.config.ts](next.config.ts):
   ```typescript
   output: 'export',
   ```
2. Build: `npm run build`
3. Deploy the `out/` directory

## 📁 Project Structure

```
RJA_Portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts and SEO
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # SEO robots.txt
│   └── projects/[slug]/    # Dynamic project pages
├── components/
│   ├── Header.tsx          # Navigation
│   ├── Hero.tsx            # Hero section
│   ├── ProjectCard.tsx     # Project cards
│   ├── ProjectsGrid.tsx    # Projects display
│   ├── Skills.tsx          # Skills section
│   ├── Publications.tsx    # Research papers
│   ├── ContactForm.tsx     # Contact form
│   └── Footer.tsx          # Footer
├── lib/
│   ├── projects.ts         # Project data
│   └── utils.ts            # Helper functions
└── public/                 # Static assets
```

## 🎯 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter & Space Grotesk

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## ♿ Accessibility Features

✅ Semantic HTML structure  
✅ ARIA labels on interactive elements  
✅ Keyboard navigation support  
✅ WCAG AA color contrast (4.5:1)  
✅ Focus visible states  
✅ Reduced motion support  

## 🐛 Troubleshooting

**Build Warnings**: Tailwind CSS v4 style suggestions are non-breaking - your site will work perfectly.

**Port in Use**: Run on different port: `npm run dev -- -p 3001`

**Font Issues**: Ensure internet connection for Google Fonts during development.

## 🎨 Customization Tips

**Change Colors** - Edit [tailwind.config.ts](tailwind.config.ts):
```typescript
colors: {
  green: { DEFAULT: "#YOUR_COLOR" },
}
```

**Adjust Animations** - Modify duration in components:
```typescript
transition={{ duration: 0.5, delay: 0.1 }}
```

**Add Projects** - Append to [lib/projects.ts](lib/projects.ts)

## 📄 License

MIT License - Open source and free to use.

## 🙏 Credits

- Design: Apple.com inspiration
- Icons: [Lucide React](https://lucide.dev/)
- Animations: [Framer Motion](https://framer.com/motion/)
- Framework: [Next.js](https://nextjs.org/)

---

**Built for AI Engineers in Agriculture** 🌱

Questions? Use the contact form on the live portfolio.
