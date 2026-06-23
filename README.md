# HireLaw® - Premium Law Firm Landing Page

A modern, high-end, and fully responsive landing page for the fictional law firm **HireLaw®**, built using **React**, **Next.js 16**, and **Tailwind CSS v4**.

This repository is designed to showcase modern premium agency web aesthetics, including glassmorphism, duotone imagery, clean typography, smooth parallax-like sections, and modular components.

---

## 🎨 Design & Aesthetic Style

This landing page follows a curated, professional, and sophisticated design system:
- **Background Palette**: Warm off-white/cream (`#F9F8F3`) for a gentle, luxurious reading experience.
- **Primary / Typography**: Deep charcoal black (`#111111`) for maximum contrast and elegance.
- **Accent Color**: Muted pastel lavender (`#B4ACE3`) for duotone image overlays, client reviews, and interactive hover highlights.
- **Typography**: Clean, bold sans-serif headings paired with lightweight, highly readable body typography.
- **Transitions**: Sleek micro-interactions, scale-ups, color-swaps, and fading effects.

### Design Reference Mockup
The folder includes a design reference image: `design-reference.webp`. The landing page layout and assets have been designed to match the mockup's visual structure.

---

## ✨ Features

- **Sticky Navigation**: Smooth-scrolling, transparent header that transitions into a sticky state, including a fully responsive mobile hamburger menu.
- **Hero Showcase**: A bold legal tagline and CTA combined with a stunning grid of team members featuring alternating pastel duotone cutouts.
- **About Us Section**: Split-grid layout highlighting firm strengths with elegant badges and a minimalist botanical art asset.
- **Corporate Logotypes**: Monochromatic, low-opacity, responsive grid displaying client partners.
- **Our Mission**: A high-impact, full-screen background overlay using neoclassical columns with legible text container overlays.
- **Expertise & Services**: A 3-column service grid (Corporate, Family, and Real Estate Law) featuring custom icons and high-performance interactive states.
- **Client Testimonials**: A lavender-tinted testimonials deck showing quote blocks alongside client avatars.
- **Moody Attorney Cards**: Hover-active profile grids showcasing attorneys with dark/moody backgrounds, text overlays, and responsive slide-in arrow icons.
- **Premium Footer**: Deep black background, minimal links, clean social icons, and a low-opacity watermark logo stretching across the base.
- **Scroll-to-Top**: A floating shortcut button appearing smoothly upon scroll.

---

## 🚀 Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine (v18.x or later is recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/hirelaw.git
   cd hirelaw
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) to view the application in action.

### Production Build

To compile the application for production:
```bash
npm run build
npm run start
```

---

## 📁 Repository Structure

```text
├── public/                 # Static assets (images, logos, icons)
│   └── images/             # Profile pictures, team cutouts, background graphics
├── src/
│   └── app/
│       ├── globals.css     # Tailwind v4 directives & custom animations
│       ├── layout.tsx      # Application layout & metadata
│       └── page.tsx        # Fully componentized Landing Page
├── package.json            # Scripts & project dependencies
├── tsconfig.json           # TypeScript configuration
├── design-reference.webp   # Original visual design spec
└── LICENSE                 # MIT License details
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
