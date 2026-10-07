# HireLaw® - Premium Law Firm Landing Page

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/tests-4%20passed-brightgreen?style=flat-square)](https://github.com/aeskafi/HireLaw)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

A modern, high-end, and fully responsive landing page for the fictional law firm **HireLaw®**, built using **React 19**, **Next.js 16 (App Router)**, and **Tailwind CSS v4**.

Designed to showcase modern agency web aesthetics, including glassmorphism, duotone imagery, clean typography, smooth scroll observers, and modular component architecture.

---

## 🎨 Design & Aesthetic Style

This landing page follows a curated, professional, and sophisticated design system:

- **Background Palette**: Warm off-white/cream (`#F9F8F3`) for a gentle, luxurious reading experience.
- **Primary / Typography**: Deep charcoal black (`#111111`) for maximum contrast and elegance.
- **Accent Color**: Muted pastel lavender (`#B4ACE3`) for duotone image overlays, client reviews, and interactive hover highlights.
- **Typography**: Clean, bold headings in *Plus Jakarta Sans* paired with readable body typography in *Inter*.
- **Transitions**: Sleek micro-interactions, scale-ups, color-swaps, and fading effects.

### Visual Spec Reference
A high-fidelity design mockup is preserved in the repository root as `design-reference.webp`.

---

## ✨ Features

- **Sticky Navigation**: Smooth-scrolling, transparent header transitioning into a sticky frosted-glass state with active section highlighting and responsive mobile menu.
- **Hero Showcase**: Bold legal tagline and CTA combined with a 6-portrait grid featuring alternating pastel duotone cutouts.
- **About Us Section**: Split-grid layout highlighting firm strengths with elegant badges and minimalist botanical art.
- **Corporate Logotypes**: Monochromatic, low-opacity, infinitely scrolling brand track displaying corporate partners.
- **Our Mission**: Full-width architectural backdrop featuring neoclassical law columns with legible typography overlays.
- **Expertise & Services**: 3-column service grid (Corporate, Family, and Real Estate Law) featuring custom SVG icons and interactive hover states.
- **Client Testimonials**: Lavender-tinted testimonial cards displaying quote blocks alongside verified client avatars.
- **Moody Attorney Cards**: Hover-active profile grids showcasing senior attorneys with dark backgrounds, practice badges, and slide-in arrow indicators.
- **Premium Footer**: Deep black backdrop, minimal navigational links, social icons, and a low-opacity watermark logo.
- **Scroll-to-Top**: Smooth floating shortcut button appearing conditionally based on scroll depth.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Test Runner**: Node.js native test runner (`node:test`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (recommended Node.js 22+)
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/aeskafi/HireLaw.git
cd HireLaw

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Assurance & Build

```bash
# Run automated test suite
npm test

# Run ESLint checks
npm run lint

# Build production bundle
npm run build

# Start production server
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
├── tests/
│   └── landing.test.mjs    # Node.js automated test suite
├── package.json            # Scripts & project dependencies
├── tsconfig.json           # TypeScript configuration
├── design-reference.webp   # Original visual design spec
└── LICENSE                 # MIT License details
```

---

## 👤 Author & Curator

**Arham Eskafi (ارحام اسکافی)**
*Rapid MVP Specialist & Tech Nomad*

- 🌐 Website: [arham.dev](https://arham.dev)
- 🎥 YouTube: [Walk Cook Live (@walkcooklive)](https://youtube.com/@walkcooklive)
- 🐙 GitHub: [@aeskafi](https://github.com/aeskafi)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
