---
layout: home

hero:
  name: "HomeNode Docs"
  text: "DevOps, Kubernetes & Homelab Engineering"
  tagline: "High-performance GitOps, bare-metal local AI, automated CI/CD pipelines, and robust Linux infrastructure engineered by Yasir (@aayasir2177)."
  actions:
    - theme: brand
      text: 🚀 Explore Documentation
      link: /overview/roadmap
    - theme: alt
      text: ☸️ Zero-Delay GitOps
      link: /kubernetes/argocd-gitops
    - theme: alt
      text: 🐙 GitHub Profile
      link: https://github.com/aayasir2177

features:
  - icon: ⚡
    title: Zero-Delay GitOps Pipeline
    details: Webhook-triggered ArgoCD continuous delivery reconciling cluster state in sub-5 seconds with automated drift correction and self-healing.
    link: /kubernetes/argocd-gitops

  - icon: 🛡️
    title: Zero Inbound Ports
    details: Secure ingress via Cloudflare QUIC Tunnels with no public router port forwarding, backed by Caddy forward authentication and Authelia SSO.
    link: /overview/homelab-architecture

  - icon: 🤖
    title: Kubernetes & Bare-Metal AI
    details: Dual-stack AI orchestration featuring OpenWebUI on K8s paired with bare-metal RAMen engine KV-cache SSD snapshotting, plus Ollama with Kustomize.
    link: /kubernetes/local-ai-ramen-openwebui

  - icon: 🔄
    title: Microservices CI/CD
    details: Full-stack uptime monitoring platform built with Next.js 15 & Express TypeScript, tested via GitHub Actions parallel pipelines and published to GHCR.
    link: /cicd/mini-uptime-monitor

  - icon: 📈
    title: Observability & DNS
    details: Prometheus metrics gathering, Grafana dashboards, systemd Node Exporter, Pi-hole local DNS routing, and Nginx Proxy Manager virtual hosts.
    link: /networking/prometheus-grafana

  - icon: 🐧
    title: Linux Systems & Storage
    details: Automated rsync/systemd backup solutions with healthchecks.io integration, multi-node NFS network storage, SSH key hardening, and RHCSA 9 labs.
    link: /linux/linux-backup-automation
---

<div style="margin-top: 3rem; text-align: center;">
  <h2>🛠️ Core Technology Stack</h2>
  <p style="color: var(--vp-c-text-2); max-width: 650px; margin: 0.5rem auto 1.5rem auto;">
    Every architecture documented in this knowledge base is tested, deployed, and verified in real-world homelab and cloud environments.
  </p>
  <p align="center">
    <a href="https://skillicons.dev">
      <img src="https://skillicons.dev/icons?i=linux,bash,git,github,githubactions,docker,kubernetes,ansible,terraform,aws,cloudflare,nginx,prometheus,grafana,py,postgres,mysql,redis&perline=9" alt="DevOps Skills" />
    </a>
  </p>
</div>

<div class="custom-card" style="margin-top: 3rem;">
  <h3>🌟 Quick Documentation Map</h3>
  <ul>
    <li><strong><a href="/overview/roadmap">Roadmap & Journey</a></strong>: The progressive DevOps learning path and active production competencies.</li>
    <li><strong><a href="/overview/homelab-architecture">Homelab Architecture</a></strong>: Complete topology diagrams, hardware layout, and security boundaries.</li>
    <li><strong><a href="/kubernetes/argocd-gitops">Kubernetes & GitOps</a></strong>: ArgoCD webhook synchronization, GPU acceleration, and containerized AI stacks.</li>
    <li><strong><a href="/cicd/mini-uptime-monitor">CI/CD Pipelines</a></strong>: Multi-stage Docker builds, automated test suites, and GitHub Container Registry.</li>
    <li><strong><a href="/networking/prometheus-grafana">Observability & Networking</a></strong>: Metrics collection, reverse proxy routing, and local DNS mapping.</li>
    <li><strong><a href="/linux/linux-backup-automation">Linux Engineering & Storage</a></strong>: Incremental backup automation, NFS shares, and system security.</li>
    <li><strong><a href="/automation/ansible-automation">Ansible & Bash Automation</a></strong>: Infrastructure as Code, playbooks, and shell scripting mastery.</li>
  </ul>
</div>
