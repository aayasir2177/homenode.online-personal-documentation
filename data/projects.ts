export interface Project {
  id: string;
  name: string;
  title: string;
  category: 'devops' | 'linux' | 'ai';
  description: string;
  tags: string[];
  language: string;
  stars: number;
  forks: number;
  html_url: string;
  demo?: string | null;
  featured: boolean;
  impact?: string;
  created_at?: string;
  pushed_at?: string;
}

export const PROJECTS: Project[] = [
  {
    "id": "homenode.online-personal-documentation",
    "name": "homenode.online-personal-documentation",
    "title": "HomeNode Documentation Hub",
    "category": "devops",
    "description": "Personal engineering documentation hub covering Kubernetes GitOps, Cloudflare QUIC tunnels, Linux administration, and homelab architecture.",
    "tags": [
      "DevOps",
      "Documentation",
      "VitePress",
      "Cloudflare Pages"
    ],
    "language": "Dockerfile",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/homenode.online-personal-documentation",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2026-11-16T11:03:34Z",
    "pushed_at": "2026-11-16T11:04:47Z"
  },
  {
    "id": "aayasir2177",
    "name": "aayasir2177",
    "title": "GitHub Profile Readme & Homelab Blueprint",
    "category": "devops",
    "description": "GitHub profile repository showcasing homelab architecture, GitOps sync details, skills toolbox, and verified workflows.",
    "tags": [
      "GitHub",
      "Markdown",
      "GitOps",
      "Homelab"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/aayasir2177",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2026-06-29T17:10:27Z",
    "pushed_at": "2026-11-14T15:12:15Z"
  },
  {
    "id": "k8s-ollama-openwebui",
    "name": "k8s-ollama-openwebui",
    "title": "Kubernetes Ollama & OpenWebUI Deployment",
    "category": "ai",
    "description": "Declarative Kustomize manifests for deploying self-hosted private LLMs on Kubernetes with Ollama runtime and OpenWebUI interface.",
    "tags": [
      "Kubernetes",
      "Kustomize",
      "Ollama",
      "OpenWebUI",
      "Local AI"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/k8s-ollama-openwebui",
    "demo": null,
    "featured": false,
    "impact": "Self-hosted offline conversational AI cluster.",
    "created_at": "2026-11-06T11:01:17Z",
    "pushed_at": "2026-11-06T11:01:46Z"
  },
  {
    "id": "Wordpress-Docker-Lamp-Stack",
    "name": "Wordpress-Docker-Lamp-Stack",
    "title": "Containerized WordPress LAMP Stack",
    "category": "devops",
    "description": "Docker Compose orchestration for multi-container WordPress environment with Apache, MySQL, persistent storage volumes, and environment isolation.",
    "tags": [
      "Docker",
      "Compose",
      "WordPress",
      "MySQL",
      "Apache"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/Wordpress-Docker-Lamp-Stack",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2026-08-12T15:01:48Z",
    "pushed_at": "2026-08-12T15:03:02Z"
  },
  {
    "id": "Dockerizing-a-NodeJS-WebApp",
    "name": "Dockerizing-a-NodeJS-WebApp",
    "title": "Dockerized Node.js Microservice with Nginx",
    "category": "devops",
    "description": "Multi-stage Docker containerization of a Node.js web application coupled with Nginx reverse proxy for production-grade caching and routing.",
    "tags": [
      "Docker",
      "Node.js",
      "Nginx",
      "Reverse Proxy",
      "Multi-stage Build"
    ],
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/Dockerizing-a-NodeJS-WebApp",
    "demo": null,
    "featured": false,
    "impact": "Optimized image layers and isolated networking for Node services.",
    "created_at": "2026-06-30T11:28:03Z",
    "pushed_at": "2026-07-01T00:12:05Z"
  },
  {
    "id": "Local-LLM-with-Ollama-and-OpenWebUI",
    "name": "Local-LLM-with-Ollama-and-OpenWebUI",
    "title": "Local LLM Lab (Ollama & Docker)",
    "category": "ai",
    "description": "Hands-on lab deploying, managing, and experimenting with local LLMs (Llama 3, Mistral) using Ollama, Docker containers, and Open WebUI.",
    "tags": [
      "Ollama",
      "OpenWebUI",
      "Docker",
      "LLM",
      "Local AI"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/Local-LLM-with-Ollama-and-OpenWebUI",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2026-06-29T12:49:07Z",
    "pushed_at": "2026-06-29T12:56:32Z"
  },
  {
    "id": "Bash-Practice",
    "name": "Bash-Practice",
    "title": "Production Bash Scripting & Streams",
    "category": "linux",
    "description": "Collection of robust Shell scripts demonstrating POSIX conventions, text stream processing (awk/sed/grep), automation tasks, and error handling.",
    "tags": [
      "Bash",
      "Shell",
      "CLI",
      "Automation",
      "Linux"
    ],
    "language": "Shell",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/Bash-Practice",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2026-06-26T18:07:51Z",
    "pushed_at": "2026-06-27T17:34:12Z"
  },
  {
    "id": "NFS-Setup",
    "name": "NFS-Setup",
    "title": "Enterprise NFS Server & Persistent Mounts",
    "category": "linux",
    "description": "Linux NFS network storage architecture configuring an NFS server on Fedora and multi-client mounts on Ubuntu with persistent /etc/fstab exports.",
    "tags": [
      "NFS",
      "Storage",
      "Fedora",
      "Ubuntu",
      "Linux SysAdmin"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/NFS-Setup",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2026-06-25T13:00:42Z",
    "pushed_at": "2026-06-25T13:10:18Z"
  },
  {
    "id": "Ansible-Practice",
    "name": "Ansible-Practice",
    "title": "Ansible Infrastructure Automation & IaC",
    "category": "linux",
    "description": "Infrastructure as Code hands-on repository covering automated playbooks, reusable roles, dynamic inventories, variables, and ad-hoc Linux management.",
    "tags": [
      "Ansible",
      "IaC",
      "YAML",
      "Configuration Management",
      "Linux"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/Ansible-Practice",
    "demo": null,
    "featured": false,
    "impact": "Automated multi-node provisioning and configuration enforcement.",
    "created_at": "2026-06-24T12:32:10Z",
    "pushed_at": "2026-06-24T20:05:30Z"
  },
  {
    "id": "Self-Hosted-Audiobookshelf-Docker",
    "name": "Self-Hosted-Audiobookshelf-Docker",
    "title": "Self-Hosted Audiobookshelf Server",
    "category": "devops",
    "description": "Containerized deployment of Audiobookshelf in Docker for managing and streaming personal audiobook libraries and podcasts with volume persistence.",
    "tags": [
      "Docker",
      "Self-Hosted",
      "Media",
      "Homelab"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/Self-Hosted-Audiobookshelf-Docker",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2026-05-13T22:11:09Z",
    "pushed_at": "2026-05-13T22:25:17Z"
  },
  {
    "id": "Wordpress-Hosting-on-LEMP-Stack",
    "name": "Wordpress-Hosting-on-LEMP-Stack",
    "title": "High-Performance WordPress on LEMP Stack",
    "category": "linux",
    "description": "Production-hardened LEMP (Linux, Nginx, MariaDB, PHP-FPM) server setup with fastcgi caching, database optimization, and SSL security.",
    "tags": [
      "LEMP",
      "Nginx",
      "MariaDB",
      "PHP-FPM",
      "Linux"
    ],
    "language": "PHP",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/Wordpress-Hosting-on-LEMP-Stack",
    "demo": null,
    "featured": false,
    "impact": "Bare-metal high-throughput web server architecture.",
    "created_at": "2026-04-14T22:02:47Z",
    "pushed_at": "2026-04-14T22:44:38Z"
  },
  {
    "id": "ssh-configuration-Linux",
    "name": "ssh-configuration-Linux",
    "title": "Linux SSH Security Hardening",
    "category": "linux",
    "description": "Enterprise SSH hardening configuration guide covering ed25519 key-based authentication, non-standard port isolation, disabled root login, and client automation.",
    "tags": [
      "SSH",
      "Security",
      "Hardening",
      "Linux",
      "SysAdmin"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/ssh-configuration-Linux",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2026-01-01T19:19:27Z",
    "pushed_at": "2026-01-01T19:59:27Z"
  },
  {
    "id": "RHCSA-9-Exam-Preparation-Labs",
    "name": "RHCSA-9-Exam-Preparation-Labs",
    "title": "RHCSA 9 Enterprise Administration Labs",
    "category": "linux",
    "description": "Comprehensive practical labs for Red Hat Certified System Administrator 9: LVM partitioning, SELinux policies, firewall configuration, and systemd units.",
    "tags": [
      "RHCSA",
      "RHEL",
      "SELinux",
      "systemd",
      "Firewalld"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/RHCSA-9-Exam-Preparation-Labs",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2025-12-22T19:11:32Z",
    "pushed_at": "2025-12-22T19:11:33Z"
  },
  {
    "id": "fizz-buzz-python",
    "name": "fizz-buzz-python",
    "title": "Python Algorithmic FizzBuzz & Tests",
    "category": "ai",
    "description": "Clean Pythonic implementation of the classic FizzBuzz interview algorithm accompanied by automated unit tests.",
    "tags": [
      "Python",
      "Algorithms",
      "Unit Testing"
    ],
    "language": "Python",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/fizz-buzz-python",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2023-08-19T13:46:25Z",
    "pushed_at": "2023-08-19T13:53:07Z"
  },
  {
    "id": "unit-converter-python",
    "name": "unit-converter-python",
    "title": "Python Measurement Unit Converter",
    "category": "ai",
    "description": "Command-line utility written in Python for converting metric and imperial units across length, weight, volume, and temperature.",
    "tags": [
      "Python",
      "CLI",
      "Utility",
      "Automation"
    ],
    "language": "Python",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/unit-converter-python",
    "demo": null,
    "featured": false,
    "impact": "",
    "created_at": "2023-08-17T16:49:30Z",
    "pushed_at": "2023-08-17T16:50:49Z"
  },
  {
    "id": "k8s-ramen-openwebui",
    "name": "k8s-ramen-openwebui",
    "title": "Kubernetes AI Stack (RAMen + OpenWebUI)",
    "category": "ai",
    "description": "Lightweight zero-recomputation private AI stack combining Kubernetes-hosted OpenWebUI with bare-metal RAMen engine for ultra-fast SSD KV-cache snapshotting.",
    "tags": [
      "Kubernetes",
      "AI Inference",
      "RAMen Engine",
      "OpenWebUI",
      "Python"
    ],
    "language": "Python",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/k8s-ramen-openwebui",
    "demo": null,
    "featured": true,
    "impact": "Zero-recomputation private AI inference stack with instant context restoration.",
    "created_at": "2026-11-14T14:03:47Z",
    "pushed_at": "2026-11-14T14:09:59Z"
  },
  {
    "id": "homelab-gitops",
    "name": "homelab-gitops",
    "title": "Homelab GitOps & Portainer Compose",
    "category": "devops",
    "description": "Declarative Docker Compose stack definitions for self-hosted services managed via Portainer CE on Fedora Server with automated webhook triggers.",
    "tags": [
      "Docker",
      "GitOps",
      "Portainer",
      "Fedora",
      "Compose"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/homelab-gitops",
    "demo": null,
    "featured": true,
    "impact": "Automated deployment of 15+ homelab microservices with zero manual intervention.",
    "created_at": "2026-09-24T14:08:11Z",
    "pushed_at": "2026-09-27T19:53:15Z"
  },
  {
    "id": "caddy-authelia-sso",
    "name": "caddy-authelia-sso",
    "title": "Caddy + Authelia Zero-Trust SSO",
    "category": "devops",
    "description": "Centralized Single Sign-On (SSO) forward-authentication architecture securing local network services behind Caddy reverse proxy with two-factor authentication (2FA).",
    "tags": [
      "Caddy",
      "Authelia",
      "SSO",
      "2FA",
      "Zero-Trust",
      "Security"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/caddy-authelia-sso",
    "demo": null,
    "featured": true,
    "impact": "Zero-trust forward authentication protecting all internal endpoints.",
    "created_at": "2026-09-21T12:31:43Z",
    "pushed_at": "2026-09-21T12:42:24Z"
  },
  {
    "id": "Jellyfin-on-Kubernetes-Cluster",
    "name": "Jellyfin-on-Kubernetes-Cluster",
    "title": "Jellyfin Private Cloud on Kubernetes",
    "category": "devops",
    "description": "Production Kubernetes deployment for Jellyfin media server featuring persistent hostPath storage, NodePort service routing, and Intel/NVIDIA GPU hardware transcoding passthrough.",
    "tags": [
      "Kubernetes",
      "GPU Passthrough",
      "Hardware Transcoding",
      "HostPath",
      "YAML"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/Jellyfin-on-Kubernetes-Cluster",
    "demo": null,
    "featured": true,
    "impact": "Hardware-accelerated media streaming cluster with persistent volume claims.",
    "created_at": "2026-08-19T20:30:52Z",
    "pushed_at": "2026-09-03T09:47:49Z"
  },
  {
    "id": "Prometheus-Grafana-Infra-Monitoring",
    "name": "Prometheus-Grafana-Infra-Monitoring",
    "title": "Prometheus & Grafana Observability Pipeline",
    "category": "devops",
    "description": "Full-stack monitoring architecture using Prometheus, Grafana, Node Exporter, Pi-hole DNS, and Nginx Proxy Manager, eliminating raw IP:port exposure.",
    "tags": [
      "Prometheus",
      "Grafana",
      "Node Exporter",
      "Pi-hole",
      "NPM",
      "Observability"
    ],
    "language": "Other",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/Prometheus-Grafana-Infra-Monitoring",
    "demo": null,
    "featured": true,
    "impact": "Real-time metrics, system telemetry, and centralized dashboard for cluster health.",
    "created_at": "2026-07-12T14:41:28Z",
    "pushed_at": "2026-07-12T15:42:51Z"
  },
  {
    "id": "Linux-Backup-Automation",
    "name": "Linux-Backup-Automation",
    "title": "Enterprise Linux Backup Automation",
    "category": "linux",
    "description": "Automated incremental backup solution using Bash, rsync, NFS, and systemd timers with automated log rotation and health verification.",
    "tags": [
      "Bash",
      "systemd",
      "rsync",
      "NFS",
      "Automation"
    ],
    "language": "Shell",
    "stars": 0,
    "forks": 0,
    "html_url": "https://github.com/aayasir2177/Linux-Backup-Automation",
    "demo": null,
    "featured": true,
    "impact": "Zero-touch daily incremental backups with automated retention policy.",
    "created_at": "2026-06-25T19:04:40Z",
    "pushed_at": "2026-06-25T20:43:58Z"
  }
];
