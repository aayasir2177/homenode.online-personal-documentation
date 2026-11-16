import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'HomeNode Docs',
  description: 'Production-Grade DevOps, Kubernetes & Homelab Engineering Documentation by Yasir',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'author', content: 'Yasir' }]
  ],
  themeConfig: {
    siteTitle: '⚡ HomeNode Docs',
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Roadmap & Architecture', link: '/overview/roadmap' },
      { text: 'Kubernetes & GitOps', link: '/kubernetes/argocd-gitops' },
      { text: 'CI/CD & Microservices', link: '/cicd/mini-uptime-monitor' },
      { text: 'Observability & Net', link: '/networking/prometheus-grafana' },
      { text: 'Linux & Storage', link: '/linux/linux-backup-automation' },
      { text: 'Automation', link: '/automation/ansible-automation' }
    ],
    sidebar: [
      {
        text: 'Overview & Architecture',
        collapsed: false,
        items: [
          { text: 'DevOps Roadmap & Journey', link: '/overview/roadmap' },
          { text: 'Homelab Infrastructure Map', link: '/overview/homelab-architecture' }
        ]
      },
      {
        text: 'Kubernetes & GitOps',
        collapsed: false,
        items: [
          { text: 'Zero-Delay ArgoCD GitOps', link: '/kubernetes/argocd-gitops' },
          { text: 'OpenWebUI + Bare-Metal RAMen AI', link: '/kubernetes/local-ai-ramen-openwebui' },
          { text: 'Local AI on K8s (Ollama Stack)', link: '/kubernetes/local-ai-ollama-k8s' },
          { text: 'Jellyfin Media Cluster + GPU Pass', link: '/kubernetes/jellyfin-k8s' },
          { text: 'Declarative Compose GitOps (Portainer)', link: '/kubernetes/portainer-gitops' }
        ]
      },
      {
        text: 'CI/CD & Microservices',
        collapsed: false,
        items: [
          { text: 'Mini Uptime Monitor CI/CD', link: '/cicd/mini-uptime-monitor' },
          { text: 'Dockerizing Node.js + Nginx Proxy', link: '/cicd/dockerizing-nodejs-nginx' }
        ]
      },
      {
        text: 'Observability & Networking',
        collapsed: false,
        items: [
          { text: 'Prometheus & Grafana Monitoring', link: '/networking/prometheus-grafana' },
          { text: 'Pi-hole Local DNS & NPM Proxy', link: '/networking/pihole-npm' },
          { text: 'Caddy + Authelia SSO Architecture', link: '/networking/caddy-authelia-sso' }
        ]
      },
      {
        text: 'Linux Systems & Storage',
        collapsed: false,
        items: [
          { text: 'Automated Linux Backups (rsync + systemd)', link: '/linux/linux-backup-automation' },
          { text: 'Enterprise NFS Server & Client Setup', link: '/linux/nfs-setup' },
          { text: 'SSH Hardening & Client Config', link: '/linux/ssh-hardening' },
          { text: 'RHCSA 9 Exam Preparation Labs', link: '/linux/rhcsa-labs' },
          { text: 'LEMP Stack WordPress Deployment', link: '/linux/wordpress-lemp-stack' },
          { text: 'Self-Hosted Docker Services (Audiobookshelf & LAMP)', link: '/linux/docker-lamp-audiobookshelf' }
        ]
      },
      {
        text: 'Automation & Scripting',
        collapsed: false,
        items: [
          { text: 'Ansible Playbooks & KVM Automation', link: '/automation/ansible-automation' },
          { text: 'Production Bash Scripting & Streams', link: '/automation/bash-scripting' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aayasir2177' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/aayasir217' }
    ],
    footer: {
      message: 'Self-hosted and documented with VitePress • homenode.online',
      copyright: 'Copyright © 2026 Yasir (@aayasir2177)'
    },
    docFooter: {
      prev: 'Previous Page',
      next: 'Next Page'
    },
    outline: {
      level: [2, 3],
      label: 'On this page'
    }
  }
})
