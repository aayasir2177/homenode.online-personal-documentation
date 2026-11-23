# HomeNode // Yasir Personal Engineering Portfolio 🚀

[![GitHub](https://img.shields.io/badge/GitHub-aayasir2177-181717?style=flat&logo=github)](https://github.com/aayasir2177)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-aayasir217-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/aayasir217)
[![Status](https://img.shields.io/badge/Status-Operational-10b981?style=flat)](#)
[![Performance](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=flat)](#)

A modern, fast, SEO-optimized, and fully responsive personal portfolio website showcasing **61+ real-world repositories** from [@aayasir2177](https://github.com/aayasir2177).

Engineered with high performance, semantic HTML5, zero framework overhead, instant sub-millisecond filtering, and dark/light mode adaptability.

---

## ⚡ Key Highlights

* **100/100 Performance & Zero Framework Bloat**: Pure vanilla modern HTML5, CSS3, and ES6+ JavaScript. No bulky runtimes, zero render-blocking dependencies, and instantaneous page paint (< 50ms).
* **SEO & Crawler Optimized**:
  * Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
  * Open Graph and Twitter Cards for social link previews.
  * Schema.org Structured Data (`Person`, `WebSite`, and `ItemList`) for rich search engine indexing.
  * Search engine `robots.txt` and `sitemap.xml` included.
  * Pre-rendered HTML cards for all 61 projects ensuring web crawlers parse repository titles, descriptions, and tags without needing JavaScript execution.
* **All 61 Repositories Cataloged**:
  * Extracted and enriched directly from the GitHub API (`https://api.github.com/users/aayasir2177`).
  * Instant debounced real-time search across titles, technologies, tags, and descriptions.
  * Filter tabs: **All (61)**, **DevOps & Cloud (9)**, **Linux & Automation (7)**, **Web & Full-Stack (26)**, **Mobile & Flutter (14)**, **AI & Systems (5)**.
  * Sorting options: Featured/Recommended, Most Recent (by push date), Alphabetical (A-Z), and Stars.
  * Quick inspect modal dialog with 1-click `git clone` command copying.
* **Homelab & DevOps Architecture Showcase**:
  * Visual topology diagram highlighting Zero Inbound Ports via Cloudflare QUIC Tunnels, sub-5 second ArgoCD GitOps reconciliation, and unified Prometheus observability.
* **Dark / Light Theme Engine**:
  * System preference detection (`prefers-color-scheme`) with persistent `localStorage` preference and smooth color palette transitions.
* **Mobile-First Responsive Layout**:
  * Fluid typography using `clamp()`, adaptable CSS grid (1 col mobile, 2 col tablet, 3 col desktop), touch-friendly targets, and accessible ARIA attributes.

---

## 🛠️ Repository & Architecture Structure

```text
.
├── index.html              # Pre-rendered, semantic, SEO-optimized HTML entry point
├── styles.css              # Modular CSS design system with light/dark theme tokens
├── app.js                  # Lightweight client-side engine (search, filter, sort, modal, toast)
├── projects.json           # Curated and enriched dataset of all 61 GitHub repositories
├── repos_data.json         # Raw GitHub API extract from @aayasir2177
├── assets/
│   ├── logo.svg            # Crisp vector brand icon & favicon
│   └── images/
│       ├── hero_diagram.svg       # Homelab & Cloudflare QUIC architecture diagram
│       ├── homelab_architecture.gif # Dynamic pipeline animation
│       └── gitops_pipeline.gif    # GitOps deployment flow
├── robots.txt              # Search engine crawler permissions
├── sitemap.xml             # XML sitemap for Google/Bing indexing
├── site.webmanifest        # Progressive Web App manifest
├── generate_projects.py    # Python script parsing and tagging repos from GitHub API
├── generate_all.py         # Static generation script compiling projects.json into index.html
└── package.json            # Local dev scripts
```

---

## 💻 Local Development

### Option 1: Using Python (Recommended - Zero Install)
```bash
python3 -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Using Node / npx
```bash
npx serve .
```

### Option 3: Refresh GitHub Data & Rebuild
To refresh the repository dataset from GitHub API:
```bash
npm run build:data
# or directly:
python3 generate_projects.py && python3 generate_all.py
```

---

## ☁️ Deployment Guides

### Cloudflare Pages (Recommended)
1. Push this repository to your GitHub account.
2. In the Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this repository.
4. Set build settings:
   * **Framework preset**: None
   * **Build command**: *(leave empty or `python3 generate_all.py`)*
   * **Build output directory**: `/` (root)
5. Click **Save and Deploy**.

### GitHub Pages
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment**, select **Source: Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`.
4. Click **Save**.

### Vercel / Netlify
1. Import the repository in Vercel or Netlify.
2. Root Directory: `./`
3. Output Directory: `./` (pure static files).
4. Deploy!

---

## 👤 Author

**Yasir**
* GitHub: [@aayasir2177](https://github.com/aayasir2177)
* LinkedIn: [in/aayasir217](https://linkedin.com/in/aayasir217)
* Email: [aayasir217@gmail.com](mailto:aayasir217@gmail.com)
* Domain: [homenode.online](https://homenode.online)
