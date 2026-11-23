# HomeNode // Yasir Personal Engineering Portfolio 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![GitHub](https://img.shields.io/badge/GitHub-aayasir2177-181717?style=flat&logo=github)](https://github.com/aayasir2177)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-aayasir217-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/aayasir217)

A modern, fast, SEO-optimized, and fully responsive personal portfolio website engineered with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, showcasing **61+ repositories** extracted from [@aayasir2177](https://github.com/aayasir2177).

---

## ⚡ Key Highlights

* **Next.js 16 App Router & React 19**: Server-rendered and pre-generated static pages (`output: 'export'`) for sub-50ms instantaneous initial paint and zero runtime hydration issues.
* **SEO & Crawler Optimized**:
  * Semantic HTML5 structure with native Next.js Metadata API.
  * Open Graph and Twitter Card tags with responsive avatar embeds.
  * Schema.org Structured Data (`Person`, `WebSite`, and `ItemList`) with featured project rich snippets.
  * Dynamic native Next.js metadata routes: `app/sitemap.ts`, `app/robots.ts`, and `app/manifest.ts`.
* **All 61 Repositories Cataloged & Interactive**:
  * Live debounced search across repository titles, descriptions, technologies, and languages.
  * Category filter tabs with live counts: **All (61)**, **DevOps & Cloud (9)**, **Linux & Automation (7)**, **Web & Full-Stack (26)**, **Mobile & Flutter (14)**, **AI & Systems (5)**.
  * Real-time sorting: Recommended / Featured, Recently Pushed, Alphabetical (A–Z), and Stars.
  * Interactive Project Modal with architecture impact statement and **1-click copyable `git clone` command**.
* **Flagship Implementations Section**:
  * In-depth showcase cards for top DevOps achievements:
    1. Homelab GitOps (Portainer CE + Docker Compose)
    2. Jellyfin Media Server on K8s (GPU Hardware Transcoding + persistent volumes)
    3. Prometheus & Grafana Observability Pipeline (Node Exporter + Pi-hole DNS)
    4. Kubernetes AI Stack (RAMen KV-cache engine + OpenWebUI)
    5. Enterprise Linux Backup Automation (rsync + systemd timers + NFS)
    6. Caddy + Authelia Zero-Trust SSO (2FA forward authentication)
* **Homelab Topology Map**:
  * Visual topology diagram illustrating Zero Inbound Ports via Cloudflare QUIC Tunnels, sub-5s GitOps reconciliation, and telemetry scraping.
* **Dark / Light Theme Engine**:
  * Inline script preventing theme flash (FOUC), system preference detection (`prefers-color-scheme`), and persistent `localStorage` storage.
* **Mobile-First Responsive UX**:
  * Mobile drawer navigation, fluid typography, accessible tap targets, and 1-click clipboard email utility.

---

## 🛠️ Project Structure

```text
.
├── app/
│   ├── layout.tsx              # Root layout with Metadata, Schema.org JSON-LD & theme provider
│   ├── page.tsx                # Home page composing all showcase sections
│   ├── globals.css             # Tailwind CSS v4 & theme design tokens
│   ├── sitemap.ts              # Native dynamic XML sitemap
│   ├── robots.ts               # Native search crawler configuration
│   └── manifest.ts             # Native Progressive Web App manifest
├── components/
│   ├── Navbar.tsx              # Sticky header with navigation, theme toggle, and status pill
│   ├── Hero.tsx                # Hero section with whoami terminal prompt & live metrics
│   ├── FeaturedProjects.tsx    # Standout flagship architectures (top 6 projects)
│   ├── ProjectsExplorer.tsx    # Interactive client-side explorer (search, category tabs, sort)
│   ├── ProjectCard.tsx         # Responsive repository card with live links & tags
│   ├── ProjectModal.tsx        # Project detail modal with 1-click git clone copy
│   ├── HomelabArchitecture.tsx # Architecture visualization with 3 topology pillars
│   ├── SkillsMatrix.tsx        # 6-domain categorized technical competency grid
│   ├── AboutSection.tsx        # Engineering philosophy, bio & interactive terminal
│   ├── ContactSection.tsx      # Contact cards with 1-click email copy button
│   ├── Footer.tsx              # Brand footer with navigation & scroll-to-top button
│   └── ThemeToggle.tsx         # Dark/Light mode switcher with persistence
├── data/
│   ├── projects.ts             # Type-safe dataset of all 61 GitHub repositories
│   └── siteConfig.ts           # Site-wide constants, social links, bio & metrics
├── public/
│   ├── logo.svg                # Brand icon and favicon
│   └── images/
│       ├── hero_diagram.svg    # Homelab and Cloudflare QUIC topology diagram
│       ├── homelab_architecture.gif
│       └── gitops_pipeline.gif
├── next.config.mjs             # Next.js configuration (static export & image optimization)
├── postcss.config.mjs          # PostCSS configuration with @tailwindcss/postcss
├── tsconfig.json               # TypeScript configuration with @/* path aliases
├── package.json                # Project dependencies and run scripts
└── projects.json               # Raw enriched JSON dataset
```

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates a static export in the `out/` folder ready for zero-latency hosting anywhere!

### 4. Preview the Production Build Locally
```bash
npx serve out
```

---

## ☁️ Deployment

### Option 1: Cloudflare Pages (Recommended)
1. Push this repository to GitHub.
2. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this repository.
4. Set build settings:
   * **Framework preset**: `Next.js (Static HTML Export)` or `None`
   * **Build command**: `npm run build`
   * **Build output directory**: `out`
5. Click **Save and Deploy**.

### Option 2: GitHub Pages
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** or use `npm run build` with `gh-pages -d out`.

### Option 3: Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Framework Preset: **Next.js**.
3. Click **Deploy**.

---

## 👤 Author

**Yasir**
* GitHub: [@aayasir2177](https://github.com/aayasir2177)
* LinkedIn: [in/aayasir217](https://linkedin.com/in/aayasir217)
* Email: [aayasir217@gmail.com](mailto:aayasir217@gmail.com)
* Domain: [homenode.online](https://homenode.online)
