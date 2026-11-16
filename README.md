# ⚡ HomeNode Docs (`homenode.online`)

Personal documentation hub for production-grade **DevOps Engineering, Kubernetes GitOps, Infrastructure as Code, Linux Systems Administration, and Observability**, engineered and maintained by [Yasir (@aayasir2177)](https://github.com/aayasir2177).

---

## 🚀 Features

* **Built with VitePress 1.6+**: Blazingly fast static HTML generation, responsive mobile-ready layout, and instant client-side full-text search.
* **Deep Architectural Documentation**: Covers real homelab topologies, zero-delay ArgoCD GitOps pipelines, Cloudflare QUIC tunnels, and hybrid bare-metal local AI inference.
* **Production Configurations Included**: Contains production-tested YAML manifests, systemd service units, Caddy/Nginx configurations, Bash scripts, and Ansible playbooks.
* **Containerized Deployment**: Includes multi-stage Alpine Dockerfile and Docker Compose definitions for easy homelab or cloud hosting.

---

## 📁 Documentation Structure

```text
docs/
├── index.md                                 # Landing page with hero & tech stack
├── overview/
│   ├── roadmap.md                           # DevOps Roadmap & verified repos index
│   └── homelab-architecture.md              # Homelab infrastructure map & diagrams
├── kubernetes/
│   ├── argocd-gitops.md                     # Zero-Delay ArgoCD GitOps (<5s sync)
│   ├── local-ai-ramen-openwebui.md          # OpenWebUI + Bare-Metal RAMen AI
│   ├── local-ai-ollama-k8s.md               # Local AI on K8s (Ollama + Kustomize)
│   ├── jellyfin-k8s.md                      # Jellyfin Media Server + GPU Passthrough
│   └── portainer-gitops.md                  # Declarative Compose GitOps via Portainer
├── cicd/
│   ├── mini-uptime-monitor.md               # Mini Uptime Monitor (Next.js + Express)
│   └── dockerizing-nodejs-nginx.md          # Node.js Containerization + NPM Proxy
├── networking/
│   ├── prometheus-grafana.md                # Prometheus, Grafana & Node Exporter
│   ├── pihole-npm.md                        # Local DNS (Pi-hole) & Reverse Proxy (NPM)
│   └── caddy-authelia-sso.md                # Centralized SSO with Caddy & Authelia
├── linux/
│   ├── linux-backup-automation.md           # Automated Backups (rsync + systemd + NFS)
│   ├── nfs-setup.md                         # Enterprise NFS Server & Client Setup
│   ├── ssh-hardening.md                     # Linux SSH Hardening & Client Automation
│   ├── rhcsa-labs.md                        # RHCSA 9 Enterprise Administration Labs
│   ├── wordpress-lemp-stack.md              # High-Performance WordPress on LEMP
│   └── docker-lamp-audiobookshelf.md        # Self-Hosted Docker Services
└── automation/
    ├── ansible-automation.md                # Ansible Playbooks & KVM Automation
    └── bash-scripting.md                    # Production Bash Scripting & Streams
```

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` to browse the documentation locally with instant hot reload.

### 3. Build Static Production Site
```bash
npm run build
```
Static artifacts will be compiled into `docs/.vitepress/dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🐳 Docker Deployment

### Run with Docker Compose
```bash
docker compose up -d --build
```
The documentation will be served over high-performance Nginx Alpine on `http://localhost:8080` (or behind your reverse proxy on `https://homenode.online`).
