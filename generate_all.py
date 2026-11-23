import json
import html
import os

with open('projects.json') as f:
    projects = json.load(f)

# Language color mapping
LANG_COLORS = {
    "Python": "#3572A5",
    "JavaScript": "#f1e05a",
    "TypeScript": "#3178c6",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Shell": "#89e051",
    "Dockerfile": "#384d54",
    "Dart": "#00B4AB",
    "PHP": "#4F5D95",
    "CMake": "#DA3434",
    "None": "#6e7681",
    "Other": "#8b949e"
}

def get_lang_color(lang):
    return LANG_COLORS.get(lang, "#8b949e")

# Sort projects: featured first, then pushed_at desc
projects_sorted = sorted(projects, key=lambda x: (not x["featured"], x.get("pushed_at", "")), reverse=True)

# Generate JSON-LD ItemList
json_ld_items = []
for idx, p in enumerate(projects_sorted[:15], 1):
    json_ld_items.append({
        "@type": "ListItem",
        "position": idx,
        "name": p["title"],
        "description": p["description"],
        "url": p["html_url"]
    })

schema_person = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "https://homenode.online/#person",
            "name": "Yasir",
            "alternateName": "aayasir2177",
            "url": "https://homenode.online/",
            "image": "https://avatars.githubusercontent.com/u/44633211?v=4",
            "jobTitle": "DevOps Engineer & Homelab Architect",
            "email": "mailto:aayasir217@gmail.com",
            "sameAs": [
                "https://github.com/aayasir2177",
                "https://linkedin.com/in/aayasir217"
            ],
            "knowsAbout": [
                "DevOps", "Kubernetes", "GitOps", "ArgoCD", "Docker", "Ansible", 
                "Terraform", "Prometheus", "Grafana", "Linux Administration", 
                "Bash Scripting", "Cloudflare QUIC Tunnels", "Python", "TypeScript"
            ]
        },
        {
            "@type": "WebSite",
            "@id": "https://homenode.online/#website",
            "url": "https://homenode.online/",
            "name": "HomeNode | Yasir - DevOps Engineer & Homelab Architect",
            "description": "Personal website & engineering portfolio of Yasir (@aayasir2177). Showcasing 61+ projects across Kubernetes, GitOps, Docker, Ansible, Linux automation, and full-stack development.",
            "publisher": {"@id": "https://homenode.online/#person"}
        },
        {
            "@type": "ItemList",
            "@id": "https://homenode.online/#projects",
            "name": "Featured Engineering Projects by Yasir",
            "description": "Showcase of DevOps, Kubernetes, Linux Automation, and Cloud Infrastructure repositories by Yasir.",
            "itemListElement": json_ld_items
        }
    ]
}

schema_json_str = json.dumps(schema_person, indent=2)

# Generate HTML cards for All Projects
cards_html = []
for p in projects_sorted:
    p_id = html.escape(p["id"])
    title = html.escape(p["title"])
    desc = html.escape(p["description"])
    lang = html.escape(p.get("language") or "DevOps")
    lang_color = get_lang_color(p.get("language"))
    category = html.escape(p.get("category", "devops"))
    stars = p.get("stars", 0)
    forks = p.get("forks", 0)
    url = html.escape(p["html_url"])
    demo_url = p.get("demo")
    featured = p.get("featured", False)
    impact = html.escape(p.get("impact", ""))
    
    tags_html = "".join([f'<span class="project-tag">{html.escape(t)}</span>' for t in p.get("tags", [])[:4]])
    
    demo_btn = f'''<a href="{html.escape(demo_url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline demo-btn" title="Live Preview">
      <svg class="btn-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      <span>Demo</span>
    </a>''' if demo_url else ""
    
    featured_badge = '<span class="featured-badge"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Featured</span>' if featured else ''

    card = f'''
    <article class="project-card {"is-featured" if featured else ""}" 
             data-id="{p_id}" 
             data-category="{category}" 
             data-lang="{lang.lower()}" 
             data-stars="{stars}" 
             data-title="{title.lower()}" 
             data-tags="{' '.join([t.lower() for t in p.get('tags', [])])}"
             data-pushed="{p.get('pushed_at', '')}">
      <div class="card-header">
        <div class="badge-group">
          <span class="category-badge cat-{category}">{category.upper()}</span>
          {featured_badge}
        </div>
        <div class="lang-indicator" title="Language: {lang}">
          <span class="lang-dot" style="background-color: {lang_color};"></span>
          <span class="lang-name">{lang}</span>
        </div>
      </div>
      <h3 class="card-title">
        <a href="{url}" target="_blank" rel="noopener noreferrer">{title}</a>
      </h3>
      <p class="card-desc">{desc}</p>
      {f'<p class="card-impact"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> {impact}</p>' if impact else ''}
      <div class="card-tags">
        {tags_html}
      </div>
      <div class="card-footer">
        <div class="stats-group">
          <span class="stat-item" title="{stars} Stars">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>{stars}</span>
          </span>
          <span class="stat-item" title="{forks} Forks">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
            <span>{forks}</span>
          </span>
        </div>
        <div class="card-actions">
          {demo_btn}
          <button type="button" class="btn btn-sm btn-ghost view-details-btn" data-project-id="{p_id}" title="Quick inspect">
            <span>Details</span>
          </button>
          <a href="{url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary github-link" title="Open GitHub Repo">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>Code</span>
          </a>
        </div>
      </div>
    </article>
    '''
    cards_html.append(card)

cards_joined = "\n".join(cards_html)

# Category counts
cat_counts = {
    "all": len(projects),
    "devops": len([p for p in projects if p["category"] == "devops"]),
    "linux": len([p for p in projects if p["category"] == "linux"]),
    "web": len([p for p in projects if p["category"] == "web"]),
    "mobile": len([p for p in projects if p["category"] == "mobile"]),
    "ai": len([p for p in projects if p["category"] == "ai"]),
}

# HTML Template
html_content = f'''<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yasir | DevOps Engineer &amp; Homelab Architect — Portfolio &amp; Projects</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="Personal engineering portfolio of Yasir (@aayasir2177). Showcasing 61+ projects across Kubernetes, GitOps, Docker, Ansible, Linux automation, and full-stack development.">
  <meta name="keywords" content="DevOps Engineer, Kubernetes, GitOps, ArgoCD, Docker, Ansible, Terraform, Linux Administration, Prometheus, Grafana, Cloudflare Tunnel, Homelab, Python, Portfolio, Yasir, aayasir2177, homenode.online">
  <meta name="author" content="Yasir (@aayasir2177)">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://homenode.online/">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://homenode.online/">
  <meta property="og:title" content="Yasir | DevOps Engineer &amp; Homelab Architect — Portfolio &amp; Projects">
  <meta property="og:description" content="Explore 61+ projects across Kubernetes GitOps, Linux automation, CI/CD pipelines, container orchestration, and full-stack engineering.">
  <meta property="og:image" content="https://avatars.githubusercontent.com/u/44633211?v=4">
  <meta property="og:site_name" content="HomeNode | Yasir">
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://homenode.online/">
  <meta name="twitter:title" content="Yasir | DevOps Engineer &amp; Homelab Architect — Portfolio &amp; Projects">
  <meta name="twitter:description" content="Explore 61+ projects across Kubernetes GitOps, Linux automation, CI/CD pipelines, container orchestration, and full-stack engineering.">
  <meta name="twitter:image" content="https://avatars.githubusercontent.com/u/44633211?v=4">
  
  <!-- Favicon and Manifest -->
  <link rel="icon" type="image/svg+xml" href="assets/logo.svg">
  <link rel="manifest" href="site.webmanifest">
  <meta name="theme-color" content="#090d16">
  
  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
{schema_json_str}
  </script>
  
  <!-- Stylesheet -->
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Header & Navigation -->
  <header class="site-header" id="site-header">
    <div class="container header-container">
      <a href="#hero" class="brand-logo" aria-label="HomeNode Homepage">
        <svg class="brand-icon" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
          <path d="M12 12v9"/>
          <path d="m8 17 4 4 4-4"/>
        </svg>
        <span class="brand-text">HomeNode<span class="brand-sub">.online</span></span>
      </a>

      <!-- Desktop Nav -->
      <nav class="nav-links" id="nav-links" aria-label="Main Navigation">
        <a href="#featured" class="nav-link">Featured</a>
        <a href="#projects" class="nav-link">Projects <span class="nav-count">61</span></a>
        <a href="#homelab" class="nav-link">Homelab</a>
        <a href="#skills" class="nav-link">Skills</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>

      <div class="header-actions">
        <!-- Live Status Pill -->
        <div class="status-pill" title="Currently open to DevOps and Cloud roles">
          <span class="pulse-dot"></span>
          <span class="status-text">Available for Work</span>
        </div>

        <!-- Theme Toggle -->
        <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle light/dark theme" title="Toggle Theme">
          <svg class="sun-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="moon-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>

        <!-- GitHub Profile Button -->
        <a href="https://github.com/aayasir2177" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost github-btn" title="View GitHub Profile">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span class="github-handle">@aayasir2177</span>
        </a>

        <!-- Mobile Nav Toggle -->
        <button type="button" class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded="false">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </div>
  </header>

  <main id="main-content">
    <!-- Hero Section -->
    <section class="hero-section" id="hero">
      <div class="container hero-container">
        <div class="hero-badge">
          <span class="terminal-prompt">$</span>
          <code>whoami</code>
          <span class="badge-separator">/</span>
          <span class="hero-role">DevOps &amp; Homelab Engineer</span>
        </div>

        <h1 class="hero-title">
          Engineering Resilient Infrastructure, <span class="gradient-text">Kubernetes GitOps</span> &amp; Autonomous Cloud Systems
        </h1>

        <p class="hero-description">
          Hi, I'm <strong>Yasir</strong> (<a href="https://github.com/aayasir2177" target="_blank" rel="noopener">@aayasir2177</a>). I design and orchestrate self-healing Kubernetes clusters, declarative GitOps continuous delivery workflows, zero-inbound-port cloud tunnels, and automated Linux infrastructure.
        </p>

        <!-- Quick Metrics -->
        <div class="metrics-grid">
          <div class="metric-card">
            <span class="metric-value" id="stat-repos">61</span>
            <span class="metric-label">Repositories</span>
          </div>
          <div class="metric-card">
            <span class="metric-value">&lt;5s</span>
            <span class="metric-label">GitOps Reconcile</span>
          </div>
          <div class="metric-card">
            <span class="metric-value">0</span>
            <span class="metric-label">Inbound Ports</span>
          </div>
          <div class="metric-card">
            <span class="metric-value">100%</span>
            <span class="metric-label">Declarative State</span>
          </div>
        </div>

        <!-- CTA Action Buttons -->
        <div class="hero-actions">
          <a href="#projects" class="btn btn-lg btn-primary">
            <span>Explore Projects</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/></svg>
          </a>
          <a href="#homelab" class="btn btn-lg btn-outline">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
            <span>Homelab Architecture</span>
          </a>
          <a href="#contact" class="btn btn-lg btn-ghost">
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Featured Projects Showcase -->
    <section class="section-featured" id="featured">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">FLAGSHIP IMPLEMENTATIONS</div>
          <h2 class="section-title">Featured Production Architectures</h2>
          <p class="section-subtitle">Real-world infrastructure, declarative GitOps pipelines, and containerized microservices tested and running in production.</p>
        </div>

        <div class="featured-grid">
          <!-- Featured 1: Homelab GitOps -->
          <article class="featured-card">
            <div class="featured-card-inner">
              <div class="featured-meta">
                <span class="category-badge cat-devops">DEVOPS &amp; GITOPS</span>
                <span class="featured-pill">Sub-5s Sync</span>
              </div>
              <h3 class="featured-title">
                <a href="https://github.com/aayasir2177/homelab-gitops" target="_blank" rel="noopener">Homelab GitOps &amp; Portainer Compose</a>
              </h3>
              <p class="featured-desc">
                Declarative Docker Compose stack definitions for self-hosted infrastructure on Fedora Server. Integrated with GitHub Webhooks and Portainer CE for continuous zero-touch deployments and automated drift correction.
              </p>
              <div class="featured-highlights">
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Webhook-triggered automated stack sync without manual SSH</span>
                </div>
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Isolated bridge networks and volume persistence architecture</span>
                </div>
              </div>
              <div class="card-tags">
                <span class="project-tag">Docker Compose</span>
                <span class="project-tag">Portainer CE</span>
                <span class="project-tag">GitOps</span>
                <span class="project-tag">Fedora Server</span>
              </div>
              <div class="featured-actions">
                <a href="https://github.com/aayasir2177/homelab-gitops" target="_blank" rel="noopener" class="btn btn-primary">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </article>

          <!-- Featured 2: Jellyfin on Kubernetes Cluster -->
          <article class="featured-card">
            <div class="featured-card-inner">
              <div class="featured-meta">
                <span class="category-badge cat-devops">KUBERNETES</span>
                <span class="featured-pill">GPU Hardware Transcoding</span>
              </div>
              <h3 class="featured-title">
                <a href="https://github.com/aayasir2177/Jellyfin-on-Kubernetes-Cluster" target="_blank" rel="noopener">Jellyfin Private Cloud on Kubernetes</a>
              </h3>
              <p class="featured-desc">
                Kubernetes deployment manifest for Jellyfin media server featuring persistent hostPath storage, NodePort service routing, and GPU hardware device pass-through (`/dev/dri`) for high-throughput video transcoding.
              </p>
              <div class="featured-highlights">
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Direct GPU device passthrough eliminating CPU bottlenecks</span>
                </div>
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Persistent volume claims securing 100+ GB media library</span>
                </div>
              </div>
              <div class="card-tags">
                <span class="project-tag">Kubernetes</span>
                <span class="project-tag">GPU Transcoding</span>
                <span class="project-tag">Stateful Workloads</span>
                <span class="project-tag">YAML</span>
              </div>
              <div class="featured-actions">
                <a href="https://github.com/aayasir2177/Jellyfin-on-Kubernetes-Cluster" target="_blank" rel="noopener" class="btn btn-primary">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </article>

          <!-- Featured 3: Prometheus & Grafana Monitoring -->
          <article class="featured-card">
            <div class="featured-card-inner">
              <div class="featured-meta">
                <span class="category-badge cat-devops">OBSERVABILITY</span>
                <span class="featured-pill">Full Telemetry</span>
              </div>
              <h3 class="featured-title">
                <a href="https://github.com/aayasir2177/Prometheus-Grafana-Infra-Monitoring" target="_blank" rel="noopener">Prometheus &amp; Grafana Observability Pipeline</a>
              </h3>
              <p class="featured-desc">
                Production monitoring architecture pairing Prometheus and Grafana with systemd Node Exporter, Pi-hole local DNS, and Nginx Proxy Manager. Ensures every internal service is monitored and routed by hostname rather than bare IP:port.
              </p>
              <div class="featured-highlights">
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Real-time CPU, RAM, disk I/O and network scraping via Node Exporter</span>
                </div>
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Pi-hole local DNS resolution preventing split-brain routing</span>
                </div>
              </div>
              <div class="card-tags">
                <span class="project-tag">Prometheus</span>
                <span class="project-tag">Grafana</span>
                <span class="project-tag">Pi-hole</span>
                <span class="project-tag">Node Exporter</span>
              </div>
              <div class="featured-actions">
                <a href="https://github.com/aayasir2177/Prometheus-Grafana-Infra-Monitoring" target="_blank" rel="noopener" class="btn btn-primary">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </article>

          <!-- Featured 4: K8s AI Stack -->
          <article class="featured-card">
            <div class="featured-card-inner">
              <div class="featured-meta">
                <span class="category-badge cat-ai">AI &amp; INFERENCE</span>
                <span class="featured-pill">Zero-Recomputation</span>
              </div>
              <h3 class="featured-title">
                <a href="https://github.com/aayasir2177/k8s-ramen-openwebui" target="_blank" rel="noopener">Kubernetes AI Stack (RAMen + OpenWebUI)</a>
              </h3>
              <p class="featured-desc">
                High-efficiency private AI infrastructure marrying Kubernetes-hosted OpenWebUI with a bare-metal RAMen inference engine, enabling ultra-fast NVMe KV-cache snapshotting for instant local LLM interaction.
              </p>
              <div class="featured-highlights">
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Instant KV-cache resumption from NVMe storage</span>
                </div>
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Private and air-gapped LLM operations with no external data leakage</span>
                </div>
              </div>
              <div class="card-tags">
                <span class="project-tag">Kubernetes</span>
                <span class="project-tag">RAMen Engine</span>
                <span class="project-tag">OpenWebUI</span>
                <span class="project-tag">Python</span>
              </div>
              <div class="featured-actions">
                <a href="https://github.com/aayasir2177/k8s-ramen-openwebui" target="_blank" rel="noopener" class="btn btn-primary">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </article>

          <!-- Featured 5: Linux Backup Automation -->
          <article class="featured-card">
            <div class="featured-card-inner">
              <div class="featured-meta">
                <span class="category-badge cat-linux">LINUX SYSADMIN</span>
                <span class="featured-pill">Automated Retention</span>
              </div>
              <h3 class="featured-title">
                <a href="https://github.com/aayasir2177/Linux-Backup-Automation" target="_blank" rel="noopener">Enterprise Linux Backup Automation</a>
              </h3>
              <p class="featured-desc">
                Automated incremental backup solution using Bash, rsync, NFS, and systemd timers. Features automated snapshot rotation, differential compression, and health verification logs.
              </p>
              <div class="featured-highlights">
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>systemd timer units delivering deterministic cron-free scheduling</span>
                </div>
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>NFS target failover with rsync hard-link preservation</span>
                </div>
              </div>
              <div class="card-tags">
                <span class="project-tag">Bash</span>
                <span class="project-tag">systemd</span>
                <span class="project-tag">rsync</span>
                <span class="project-tag">NFS</span>
              </div>
              <div class="featured-actions">
                <a href="https://github.com/aayasir2177/Linux-Backup-Automation" target="_blank" rel="noopener" class="btn btn-primary">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </article>

          <!-- Featured 6: Caddy Authelia SSO -->
          <article class="featured-card">
            <div class="featured-card-inner">
              <div class="featured-meta">
                <span class="category-badge cat-devops">ZERO-TRUST SECURITY</span>
                <span class="featured-pill">2FA Forward Auth</span>
              </div>
              <h3 class="featured-title">
                <a href="https://github.com/aayasir2177/caddy-authelia-sso" target="_blank" rel="noopener">Caddy + Authelia Zero-Trust SSO</a>
              </h3>
              <p class="featured-desc">
                Centralized Single Sign-On (SSO) forward-authentication architecture securing local network services behind Caddy reverse proxy with two-factor authentication (2FA), session tokens, and strict access control lists (ACLs).
              </p>
              <div class="featured-highlights">
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Forward authentication intercepting all HTTP requests before proxy</span>
                </div>
                <div class="highlight-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Duo/TOTP hardware 2FA protecting sensitive dashboards</span>
                </div>
              </div>
              <div class="card-tags">
                <span class="project-tag">Caddy</span>
                <span class="project-tag">Authelia</span>
                <span class="project-tag">2FA</span>
                <span class="project-tag">Zero-Trust</span>
              </div>
              <div class="featured-actions">
                <a href="https://github.com/aayasir2177/caddy-authelia-sso" target="_blank" rel="noopener" class="btn btn-primary">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Complete Projects Explorer Section (All 61 Repos) -->
    <section class="section-projects" id="projects">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">COMPLETE REPOSITORY INDEX</div>
          <h2 class="section-title">All GitHub Repositories</h2>
          <p class="section-subtitle">Comprehensive directory of all 61 open-source repositories from <a href="https://github.com/aayasir2177" target="_blank" rel="noopener">@aayasir2177</a>. Filter, search, and inspect in real-time.</p>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="explorer-toolbar">
          <!-- Search Input -->
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="project-search" placeholder="Search by name, technology (e.g. Docker, Ansible, React), or description..." aria-label="Search repositories">
            <button type="button" id="search-clear" class="search-clear-btn" aria-label="Clear search" style="display: none;">&times;</button>
          </div>

          <!-- Sort Select -->
          <div class="sort-box">
            <label for="project-sort" class="sort-label">Sort by:</label>
            <select id="project-sort" class="sort-select" aria-label="Sort repositories">
              <option value="featured">Recommended / Featured</option>
              <option value="recent">Recently Pushed</option>
              <option value="name">Alphabetical (A-Z)</option>
              <option value="stars">Most Stars</option>
            </select>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="category-tabs" role="tablist" aria-label="Filter by project category">
          <button type="button" class="category-tab active" data-filter="all" role="tab" aria-selected="true">
            <span>All</span>
            <span class="count-badge">{cat_counts['all']}</span>
          </button>
          <button type="button" class="category-tab" data-filter="devops" role="tab" aria-selected="false">
            <span>DevOps &amp; Cloud</span>
            <span class="count-badge">{cat_counts['devops']}</span>
          </button>
          <button type="button" class="category-tab" data-filter="linux" role="tab" aria-selected="false">
            <span>Linux &amp; Automation</span>
            <span class="count-badge">{cat_counts['linux']}</span>
          </button>
          <button type="button" class="category-tab" data-filter="web" role="tab" aria-selected="false">
            <span>Web &amp; Full-Stack</span>
            <span class="count-badge">{cat_counts['web']}</span>
          </button>
          <button type="button" class="category-tab" data-filter="mobile" role="tab" aria-selected="false">
            <span>Mobile (Flutter)</span>
            <span class="count-badge">{cat_counts['mobile']}</span>
          </button>
          <button type="button" class="category-tab" data-filter="ai" role="tab" aria-selected="false">
            <span>AI &amp; Systems</span>
            <span class="count-badge">{cat_counts['ai']}</span>
          </button>
        </div>

        <!-- Live Results Counter -->
        <div class="results-summary">
          <span id="results-count">Showing <strong>61</strong> of 61 repositories</span>
          <span class="live-sync-indicator" id="live-sync-indicator" title="Synced with GitHub API">
            <span class="sync-dot"></span> GitHub Verified
          </span>
        </div>

        <!-- Projects Grid (Pre-rendered for Instant SEO & Speed) -->
        <div class="projects-grid" id="projects-grid">
{cards_joined}
        </div>

        <!-- Empty Results Fallback -->
        <div class="empty-state" id="empty-state" style="display: none;">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <h3>No repositories match your criteria</h3>
          <p>Try searching for a different keyword or resetting your filter tabs.</p>
          <button type="button" class="btn btn-outline" id="reset-filters-btn">Reset All Filters</button>
        </div>
      </div>
    </section>

    <!-- Homelab Architecture Section -->
    <section class="section-homelab" id="homelab">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">SYSTEMS TOPOLOGY</div>
          <h2 class="section-title">Homelab &amp; Network Architecture</h2>
          <p class="section-subtitle">Self-hosted infrastructure engineered for high availability, zero public exposure, and automated GitOps synchronization.</p>
        </div>

        <div class="architecture-card">
          <div class="architecture-diagram-wrapper">
            <img src="assets/images/hero_diagram.svg" alt="HomeNode DevOps and Homelab Architecture Diagram" class="diagram-img" loading="lazy">
          </div>
          <div class="architecture-details">
            <div class="arch-col">
              <h4>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Zero Inbound Ports
              </h4>
              <p>Ingress traffic arrives through encrypted Cloudflare QUIC Tunnels with no public port forwarding on the home router. Caddy forward-authenticates every request via Authelia 2FA.</p>
            </div>
            <div class="arch-col">
              <h4>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                Zero-Delay GitOps
              </h4>
              <p>Webhook-triggered continuous delivery reconciles Git commits in sub-5 seconds. Workload states are declared in Git with automated drift detection and self-healing.</p>
            </div>
            <div class="arch-col">
              <h4>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>
                Unified Observability
              </h4>
              <p>Prometheus scrapes metrics across physical hosts and container runtimes, rendered in customizable Grafana dashboards with Pi-hole DNS routing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Skills Matrix Section -->
    <section class="section-skills" id="skills">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">COMPETENCIES</div>
          <h2 class="section-title">Technical Expertise &amp; Tooling</h2>
          <p class="section-subtitle">Production-tested tools and frameworks utilized across cloud systems, pipelines, and applications.</p>
        </div>

        <div class="skills-grid">
          <!-- Skill Card 1: Cloud & Containers -->
          <div class="skill-category-card">
            <div class="skill-cat-header">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
              <h3>Cloud &amp; Containers</h3>
            </div>
            <div class="skill-chips">
              <span class="skill-chip">Kubernetes (K8s)</span>
              <span class="skill-chip">Docker</span>
              <span class="skill-chip">Docker Compose</span>
              <span class="skill-chip">ArgoCD</span>
              <span class="skill-chip">Portainer CE</span>
              <span class="skill-chip">Cloudflare Tunnels</span>
              <span class="skill-chip">AWS</span>
            </div>
          </div>

          <!-- Skill Card 2: IaC & Automation -->
          <div class="skill-category-card">
            <div class="skill-cat-header">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <h3>IaC &amp; Automation</h3>
            </div>
            <div class="skill-chips">
              <span class="skill-chip">Ansible Playbooks</span>
              <span class="skill-chip">Terraform</span>
              <span class="skill-chip">Bash Scripting</span>
              <span class="skill-chip">GitHub Actions CI/CD</span>
              <span class="skill-chip">GitOps Pipelines</span>
              <span class="skill-chip">systemd Timers</span>
            </div>
          </div>

          <!-- Skill Card 3: Linux Systems -->
          <div class="skill-category-card">
            <div class="skill-cat-header">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              <h3>Linux Administration</h3>
            </div>
            <div class="skill-chips">
              <span class="skill-chip">Red Hat Enterprise Linux</span>
              <span class="skill-chip">Fedora Server</span>
              <span class="skill-chip">Ubuntu Server</span>
              <span class="skill-chip">SELinux</span>
              <span class="skill-chip">NFS Storage</span>
              <span class="skill-chip">SSH Hardening</span>
              <span class="skill-chip">rsync Backups</span>
            </div>
          </div>

          <!-- Skill Card 4: Observability & Ingress -->
          <div class="skill-category-card">
            <div class="skill-cat-header">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              <h3>Observability &amp; Networking</h3>
            </div>
            <div class="skill-chips">
              <span class="skill-chip">Prometheus</span>
              <span class="skill-chip">Grafana</span>
              <span class="skill-chip">Node Exporter</span>
              <span class="skill-chip">Pi-hole DNS</span>
              <span class="skill-chip">Caddy Server</span>
              <span class="skill-chip">Nginx Reverse Proxy</span>
              <span class="skill-chip">Authelia SSO</span>
            </div>
          </div>

          <!-- Skill Card 5: Languages & Frameworks -->
          <div class="skill-category-card">
            <div class="skill-cat-header">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              <h3>Languages &amp; Stacks</h3>
            </div>
            <div class="skill-chips">
              <span class="skill-chip">Python</span>
              <span class="skill-chip">TypeScript</span>
              <span class="skill-chip">JavaScript (ES6+)</span>
              <span class="skill-chip">Dart &amp; Flutter</span>
              <span class="skill-chip">Node.js / Express</span>
              <span class="skill-chip">React / Next.js</span>
              <span class="skill-chip">HTML5 / Modern CSS</span>
            </div>
          </div>

          <!-- Skill Card 6: Databases & Storage -->
          <div class="skill-category-card">
            <div class="skill-cat-header">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
              <h3>Databases &amp; Storage</h3>
            </div>
            <div class="skill-chips">
              <span class="skill-chip">PostgreSQL</span>
              <span class="skill-chip">MariaDB / MySQL</span>
              <span class="skill-chip">Redis</span>
              <span class="skill-chip">MongoDB</span>
              <span class="skill-chip">SQLite</span>
              <span class="skill-chip">NFS / Persistent Volumes</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About & Philosophy Section -->
    <section class="section-about" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <div class="section-tag">ENGINEERING PHILOSOPHY</div>
            <h2 class="section-title">Automating Everything, Securing by Default</h2>
            <p class="about-lead">
              I am an aspiring DevOps Engineer and passionate homelab architect based in Pakistan. My journey started with web development and has evolved into deep systems engineering, enterprise Linux administration, and Kubernetes GitOps orchestration.
            </p>
            <p>
              I believe in <strong>declarative infrastructure</strong>: if it's not codified in Git, it doesn't exist. My homelab serves as a live proving ground where enterprise best practices — automated drift correction, zero inbound router ports, hardened SSH authentication, and full observability telemetry — are rigorously tested and iterated upon.
            </p>
            <div class="about-bullets">
              <div class="about-bullet">
                <span class="bullet-check">✓</span>
                <div>
                  <strong>Declarative State over Manual Configuration:</strong>
                  <span>Every service, network rule, and secret is managed as code.</span>
                </div>
              </div>
              <div class="about-bullet">
                <span class="bullet-check">✓</span>
                <div>
                  <strong>Zero-Trust Network Perimeter:</strong>
                  <span>No router port forwarding. Cloudflare QUIC tunnels + 2FA forward auth.</span>
                </div>
              </div>
              <div class="about-bullet">
                <span class="bullet-check">✓</span>
                <div>
                  <strong>Continuous Telemetry:</strong>
                  <span>If you can't measure it, you can't guarantee its reliability.</span>
                </div>
              </div>
            </div>
          </div>

          <div class="about-card">
            <div class="terminal-box">
              <div class="terminal-bar">
                <span class="term-dot red"></span>
                <span class="term-dot yellow"></span>
                <span class="term-dot green"></span>
                <span class="term-title">yasir@homenode: ~/career</span>
              </div>
              <pre class="terminal-code"><code><span class="term-prompt">$</span> cat profile.json
{{
  <span class="tok-key">"name"</span>: <span class="tok-val">"Yasir"</span>,
  <span class="tok-key">"handle"</span>: <span class="tok-val">"@aayasir2177"</span>,
  <span class="tok-key">"location"</span>: <span class="tok-val">"Pakistan"</span>,
  <span class="tok-key">"role"</span>: <span class="tok-val">"DevOps Engineer &amp; Homelabber"</span>,
  <span class="tok-key">"status"</span>: <span class="tok-val">"Available for Full-Time / Contract"</span>,
  <span class="tok-key">"primary_stack"</span>: [
    <span class="tok-val">"Kubernetes"</span>, <span class="tok-val">"Docker"</span>,
    <span class="tok-val">"ArgoCD"</span>, <span class="tok-val">"Ansible"</span>,
    <span class="tok-val">"Linux/RHEL"</span>, <span class="tok-val">"Prometheus"</span>
  ],
  <span class="tok-key">"uptime"</span>: <span class="tok-val">"99.98%"</span>
}}
<span class="term-prompt">$</span> ping -c 1 gitops.homenode.online
<span class="tok-val">64 bytes: icmp_seq=1 ttl=64 time=0.842 ms</span></code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact & Collaboration Section -->
    <section class="section-contact" id="contact">
      <div class="container contact-container">
        <div class="contact-header">
          <div class="section-tag">COLLABORATION</div>
          <h2 class="section-title">Let's Build Something Resilient</h2>
          <p class="section-subtitle">Interested in discussing Kubernetes, infrastructure automation, or full-time DevOps engineering opportunities? Reach out directly.</p>
        </div>

        <div class="contact-cards-grid">
          <!-- Email Card -->
          <div class="contact-card">
            <div class="contact-card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h3>Email Directly</h3>
            <p class="contact-val">aayasir217@gmail.com</p>
            <div class="contact-btn-group">
              <a href="mailto:aayasir217@gmail.com" class="btn btn-primary btn-sm">
                <span>Send Email</span>
              </a>
              <button type="button" class="btn btn-outline btn-sm copy-email-btn" data-email="aayasir217@gmail.com">
                <span>Copy</span>
              </button>
            </div>
          </div>

          <!-- LinkedIn Card -->
          <div class="contact-card">
            <div class="contact-card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </div>
            <h3>LinkedIn Profile</h3>
            <p class="contact-val">linkedin.com/in/aayasir217</p>
            <div class="contact-btn-group">
              <a href="https://linkedin.com/in/aayasir217" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
                <span>Connect</span>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>

          <!-- GitHub Card -->
          <div class="contact-card">
            <div class="contact-card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </div>
            <h3>GitHub Profile</h3>
            <p class="contact-val">github.com/aayasir2177</p>
            <div class="contact-btn-group">
              <a href="https://github.com/aayasir2177" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
                <span>Follow &amp; Star</span>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Project Details Modal -->
  <div class="modal-backdrop" id="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" style="display: none;">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-badges">
          <span class="category-badge" id="modal-category">DEVOPS</span>
          <span class="lang-indicator">
            <span class="lang-dot" id="modal-lang-dot"></span>
            <span class="lang-name" id="modal-lang">Language</span>
          </span>
        </div>
        <button type="button" class="modal-close-btn" id="modal-close-btn" aria-label="Close dialog">&times;</button>
      </div>
      
      <h3 class="modal-title" id="modal-title">Project Title</h3>
      
      <p class="modal-desc" id="modal-desc">Project Description goes here.</p>
      
      <div class="modal-section" id="modal-impact-section">
        <h4 class="modal-subheading">Architecture Impact</h4>
        <p class="modal-impact" id="modal-impact">Impact details.</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-subheading">Technologies</h4>
        <div class="modal-tags" id="modal-tags"></div>
      </div>

      <div class="modal-section">
        <h4 class="modal-subheading">Quick Clone</h4>
        <div class="clone-box">
          <code id="modal-clone-cmd">git clone https://github.com/aayasir2177/...</code>
          <button type="button" class="copy-clone-btn" id="copy-clone-btn" title="Copy git clone command">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy</span>
          </button>
        </div>
      </div>

      <div class="modal-footer">
        <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-outline" id="modal-demo-btn" style="display: none;">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          <span>Live Demo</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-primary" id="modal-github-btn">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          <span>Open on GitHub</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Toast Notification Feedback -->
  <div class="toast" id="toast" role="status" aria-live="polite">Copied to clipboard!</div>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container footer-container">
      <div class="footer-left">
        <a href="#hero" class="brand-logo" aria-label="HomeNode Homepage">
          <svg class="brand-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
            <path d="M12 12v9"/>
            <path d="m8 17 4 4 4-4"/>
          </svg>
          <span class="brand-text">HomeNode</span>
        </a>
        <p class="footer-copy">
          Designed and engineered by <strong>Yasir</strong> (<a href="https://github.com/aayasir2177" target="_blank" rel="noopener">@aayasir2177</a>). High-performance static architecture with zero framework overhead.
        </p>
      </div>

      <div class="footer-links">
        <a href="#featured">Featured</a>
        <a href="#projects">All Projects</a>
        <a href="#homelab">Architecture</a>
        <a href="#skills">Skills</a>
        <a href="https://github.com/aayasir2177" target="_blank" rel="noopener">GitHub</a>
        <a href="https://linkedin.com/in/aayasir217" target="_blank" rel="noopener">LinkedIn</a>
      </div>

      <div class="footer-bottom">
        <span>&copy; 2026 Yasir. All systems operational.</span>
        <button type="button" class="back-to-top-btn" id="back-to-top-btn" aria-label="Back to top">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
          <span>Top</span>
        </button>
      </div>
    </div>
  </footer>

  <!-- Embedded Project Dataset for Dynamic JS Filter/Modal -->
  <script>
    window.__PROJECTS_DATA__ = {json.dumps(projects, separators=(',', ':'))};
  </script>
  
  <!-- Client Engine Script -->
  <script src="app.js"></script>
</body>
</html>
'''

with open('index.html', 'w') as f:
    f.write(html_content)

print("Generated index.html successfully.")
