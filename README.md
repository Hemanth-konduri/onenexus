# ⚡ oneNexus Studio — Digital Experience & Engineering Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-blue?style=for-the-badge&logo=three.js)](https://threejs.org)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-green?style=for-the-badge&logo=greensock)](https://greensock.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

An Awwwards-level digital agency platform and interactive client discovery portal for **oneNexus Studio** — a founder-led strategic design and engineering firm connecting brand strategy, 3D web graphics, and high-performance digital products.

---

## ✨ Core Highlights & Key Features

### 🎨 1. Interactive 3D GLTF Scene (`Contact3DScene.tsx`)
* **Dynamic 3D Geometry**: Renders `/models/3d_scene_for_onenexus.gltf` with `@react-three/fiber` and `@react-three/drei`.
* **Cinematic Breathing & Parallax**: Real-time camera breathing combined with subtle mouse parallax depth.
* **Vibrant Brand Palette Materials**: Customized MeshStandardMaterials with Cobalt Blue (`#2554E8`), Electric Cyan (`#0EA5E9`), and Indigo (`#6366F1`) glowing emissive highlights.
* **100% Offline Local Studio Lighting**: Multi-directional lighting rig operating completely local with zero CDN external asset dependencies.

### 📋 2. Step-by-Step Discovery Questionnaire (`/contact`)
* **Strategic Client Onboarding**: 5-step guided project discovery wizard asking targeted questions (Profile, Scope, Goals, Budget, Brief).
* **Progress Telemetry Tracker**: Real-time percentage progress bar and completed step navigation pills.
* **Dynamic Ticket Receipt**: Generates a unique inquiry code (e.g. `NEX-L83F91A-4921`) with full summary breakdown upon completion.

### 🎯 3. Telemetry HUD Custom Cursor (`CustomCursor.tsx`)
* **Real-time Coordinate Tracking**: Monospace X/Y telemetry HUD floating smoothly alongside cursor.
* **Interactive Reticle Corners**: 4 corner L-brackets that expand into a focused target reticle with dynamic action badges (`START ↗`, `SELECT`, `COPY`) when hovering over interactive elements.
* **Click Shockwave**: Concentric animated ring ripple wave on click.

### 🧭 4. Smart Auto-Hiding Navbar (`Navbar.tsx`)
* **Scroll-Direction Awareness**: Smoothly translates upward out of view (`-translate-y-full`) on scroll-down, and reveals instantly (`translate-y-0`) on scroll-up.
* **Warm Cream Brand Palette (`#EFECE6`)**: Translucent backdrop-blur header styled to match the studio's signature warm cream aesthetic.

### 📧 5. Production Nodemailer API Engine (`/api/contact.ts`)
* **Automated Email Dispatch**: Sends luxury HTML email templates with client brief summaries directly to studio founders.
* **Zero-Config Setup**: Works with Gmail App Passwords, custom SMTP servers, or Resend API key fallback.

---

## 🛠️ Tech Stack & Architecture

* **Framework**: Next.js 16 (Pages Router, Turbopack) & React 19
* **3D Engine**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
* **Animations**: GSAP (GreenSock), Framer Motion
* **Styling**: TailwindCSS, Vanilla CSS, Lucide Icons
* **Email Dispatch**: Nodemailer, Next.js API Routes

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js 18+ installed on your machine.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Hemanth-konduri/onenexus.git
cd onenexus
npm install
```

### 3. Environment Variables Setup (`.env.local`)
Create a `.env.local` file in the root directory and configure your email credentials:

```env
# SMTP Configuration (Gmail App Password or Custom SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
CONTACT_NOTIFICATION_EMAIL=hello@onenexus.studio
```

### 4. Run Development Server
Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment

To verify TypeScript compilation and create an optimized production build:

```bash
npm run build
npm run start
```

---

## 📄 License

Copyright © 2026 **oneNexus Studio**. All rights reserved.
