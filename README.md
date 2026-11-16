# HomeNode Docs (homenode.online)

Personal documentation hub for production-grade DevOps Engineering, Kubernetes GitOps, Infrastructure as Code, Linux Systems Administration, and Observability, engineered and maintained by Yasir (@aayasir2177).

---

## Features

* Built with VitePress 1.6+: Static HTML generation, responsive layout, and instant client-side full-text search.
* Architecture Documentation: Covers homelab topologies, zero-delay ArgoCD GitOps pipelines, Cloudflare QUIC tunnels, and hybrid bare-metal local AI inference.
* Tested Configurations: Contains production-tested YAML manifests, systemd service units, Caddy/Nginx configurations, Bash scripts, and Ansible playbooks.
* Static Cloudflare Pages Ready: Zero runtime container dependencies, optimized for direct static edge hosting.

---

## Documentation Structure

```text
docs/
├── index.md                                 # Landing page with hero and tech stack
├── overview/
│   ├── roadmap.md                           # DevOps Roadmap and verified repos index
│   └── homelab-architecture.md              # Homelab infrastructure map and diagrams
├── kubernetes/
│   ├── argocd-gitops.md                     # Zero-Delay ArgoCD GitOps (<5s sync)
│   ├── local-ai-ramen-openwebui.md          # OpenWebUI and Bare-Metal RAMen AI
│   ├── local-ai-ollama-k8s.md               # Local AI on K8s (Ollama and Kustomize)
│   ├── jellyfin-k8s.md                      # Jellyfin Media Server and GPU Passthrough
│   └── portainer-gitops.md                  # Declarative Compose GitOps via Portainer
├── cicd/
│   ├── mini-uptime-monitor.md               # Mini Uptime Monitor (Next.js and Express)
│   └── dockerizing-nodejs-nginx.md          # Node.js Containerization and NPM Proxy
├── networking/
│   ├── prometheus-grafana.md                # Prometheus, Grafana and Node Exporter
│   ├── pihole-npm.md                        # Local DNS (Pi-hole) and Reverse Proxy (NPM)
│   └── caddy-authelia-sso.md                # Centralized SSO with Caddy and Authelia
├── linux/
│   ├── linux-backup-automation.md           # Automated Backups (rsync, systemd, NFS)
│   ├── nfs-setup.md                         # Enterprise NFS Server and Client Setup
│   ├── ssh-hardening.md                     # Linux SSH Hardening and Client Automation
│   ├── rhcsa-labs.md                        # RHCSA 9 Enterprise Administration Labs
│   ├── wordpress-lemp-stack.md              # High-Performance WordPress on LEMP
│   └── docker-lamp-audiobookshelf.md        # Self-Hosted Docker Services
└── automation/
    ├── ansible-automation.md                # Ansible Playbooks and KVM Automation
    └── bash-scripting.md                    # Production Bash Scripting and Streams
```

---

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` to browse the documentation locally with hot reload.

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

## Cloudflare Pages Deployment

### Option 1: Git Integration (Recommended)
1. Push this repository to GitHub.
2. In the Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this repository.
4. Set the build configuration:
   * **Framework preset**: VitePress (or None)
   * **Build command**: `npm run build`
   * **Build output directory**: `docs/.vitepress/dist`
   * **Root directory**: `/`
5. Click **Save and Deploy**.

### Option 2: Direct Wrangler CLI Deployment
```bash
npm run build
npx wrangler pages deploy docs/.vitepress/dist --project-name=homenode-docs
```
