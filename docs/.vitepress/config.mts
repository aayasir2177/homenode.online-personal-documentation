import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'HomeNode Docs',
  description: 'DevOps, Kubernetes and Homelab Engineering Documentation by Yasir',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
    ['meta', { name: 'author', content: 'Yasir' }]
  ],
  markdown: {
    config: (md) => {
      const defaultFence = md.renderer.rules.fence!
      md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx]
        if (token.info.trim() === 'mermaid') {
          return `<div class="mermaid">${token.content}</div>`
        }
        return defaultFence(tokens, idx, options, env, slf)
      }
    }
  },
  themeConfig: {
    siteTitle: 'HomeNode Docs',
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/overview/roadmap' },
      { text: 'Architecture', link: '/overview/homelab-architecture' },
      { text: 'GitHub', link: 'https://github.com/aayasir2177' }
    ],
    sidebar: [
      {
        text: 'Overview and Architecture',
        collapsed: false,
        items: [
          { text: 'DevOps Roadmap and Journey', link: '/overview/roadmap' },
          { text: 'Homelab Infrastructure Map', link: '/overview/homelab-architecture' }
        ]
      },
      {
        text: 'Kubernetes and GitOps',
        collapsed: false,
        items: [
          { text: 'Zero-Delay ArgoCD GitOps', link: '/kubernetes/argocd-gitops' },
          { text: 'OpenWebUI and Bare-Metal RAMen AI', link: '/kubernetes/local-ai-ramen-openwebui' },
          { text: 'Local AI on K8s (Ollama Stack)', link: '/kubernetes/local-ai-ollama-k8s' },
          { text: 'Jellyfin Media Cluster and GPU Pass', link: '/kubernetes/jellyfin-k8s' },
          { text: 'Declarative Compose GitOps (Portainer)', link: '/kubernetes/portainer-gitops' }
        ]
      },
      {
        text: 'CI/CD and Microservices',
        collapsed: false,
        items: [
          { text: 'Mini Uptime Monitor CI/CD', link: '/cicd/mini-uptime-monitor' },
          { text: 'Dockerizing Node.js and Nginx Proxy', link: '/cicd/dockerizing-nodejs-nginx' }
        ]
      },
      {
        text: 'Observability and Networking',
        collapsed: false,
        items: [
          { text: 'Prometheus and Grafana Monitoring', link: '/networking/prometheus-grafana' },
          { text: 'Pi-hole Local DNS and NPM Proxy', link: '/networking/pihole-npm' },
          { text: 'Caddy and Authelia SSO Architecture', link: '/networking/caddy-authelia-sso' }
        ]
      },
      {
        text: 'Linux Systems and Storage',
        collapsed: false,
        items: [
          { text: 'Automated Linux Backups (rsync and systemd)', link: '/linux/linux-backup-automation' },
          { text: 'Enterprise NFS Server and Client Setup', link: '/linux/nfs-setup' },
          { text: 'SSH Hardening and Client Config', link: '/linux/ssh-hardening' },
          { text: 'RHCSA 9 Exam Preparation Labs', link: '/linux/rhcsa-labs' },
          { text: 'LEMP Stack WordPress Deployment', link: '/linux/wordpress-lemp-stack' },
          { text: 'Self-Hosted Docker Services (Audiobookshelf and LAMP)', link: '/linux/docker-lamp-audiobookshelf' }
        ]
      },
      {
        text: 'Automation and Scripting',
        collapsed: false,
        items: [
          { text: 'Ansible Playbooks and KVM Automation', link: '/automation/ansible-automation' },
          { text: 'Production Bash Scripting and Streams', link: '/automation/bash-scripting' }
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
      message: 'Self-hosted and documented with VitePress on homenode.online',
      copyright: 'Copyright (c) 2026 Yasir (@aayasir2177)'
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
