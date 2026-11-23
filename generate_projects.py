import json

with open('repos_data.json') as f:
    repos = json.load(f)

# Curated metadata dictionary for known repos
custom_meta = {
    "homelab-gitops": {
        "title": "Homelab GitOps & Portainer Compose",
        "category": "devops",
        "description": "Declarative Docker Compose stack definitions for self-hosted services managed via Portainer CE on Fedora Server with automated webhook triggers.",
        "tags": ["Docker", "GitOps", "Portainer", "Fedora", "Compose"],
        "featured": True,
        "impact": "Automated deployment of 15+ homelab microservices with zero manual intervention."
    },
    "Jellyfin-on-Kubernetes-Cluster": {
        "title": "Jellyfin Private Cloud on Kubernetes",
        "category": "devops",
        "description": "Production Kubernetes deployment for Jellyfin media server featuring persistent hostPath storage, NodePort service routing, and Intel/NVIDIA GPU hardware transcoding passthrough.",
        "tags": ["Kubernetes", "GPU Passthrough", "Hardware Transcoding", "HostPath", "YAML"],
        "featured": True,
        "impact": "Hardware-accelerated media streaming cluster with persistent volume claims."
    },
    "Prometheus-Grafana-Infra-Monitoring": {
        "title": "Prometheus & Grafana Observability Pipeline",
        "category": "devops",
        "description": "Full-stack monitoring architecture using Prometheus, Grafana, Node Exporter, Pi-hole DNS, and Nginx Proxy Manager, eliminating raw IP:port exposure.",
        "tags": ["Prometheus", "Grafana", "Node Exporter", "Pi-hole", "NPM", "Observability"],
        "featured": True,
        "impact": "Real-time metrics, system telemetry, and centralized dashboard for cluster health."
    },
    "k8s-ramen-openwebui": {
        "title": "Kubernetes AI Stack (RAMen + OpenWebUI)",
        "category": "ai",
        "description": "Lightweight zero-recomputation private AI stack combining Kubernetes-hosted OpenWebUI with bare-metal RAMen engine for ultra-fast SSD KV-cache snapshotting.",
        "tags": ["Kubernetes", "AI Inference", "RAMen Engine", "OpenWebUI", "Python"],
        "featured": True,
        "impact": "Zero-recomputation private AI inference stack with instant context restoration."
    },
    "k8s-ollama-openwebui": {
        "title": "Kubernetes Ollama & OpenWebUI Deployment",
        "category": "ai",
        "description": "Declarative Kustomize manifests for deploying self-hosted private LLMs on Kubernetes with Ollama runtime and OpenWebUI interface.",
        "tags": ["Kubernetes", "Kustomize", "Ollama", "OpenWebUI", "Local AI"],
        "featured": False,
        "impact": "Self-hosted offline conversational AI cluster."
    },
    "caddy-authelia-sso": {
        "title": "Caddy + Authelia Zero-Trust SSO",
        "category": "devops",
        "description": "Centralized Single Sign-On (SSO) forward-authentication architecture securing local network services behind Caddy reverse proxy with two-factor authentication (2FA).",
        "tags": ["Caddy", "Authelia", "SSO", "2FA", "Zero-Trust", "Security"],
        "featured": True,
        "impact": "Zero-trust forward authentication protecting all internal endpoints."
    },
    "Linux-Backup-Automation": {
        "title": "Enterprise Linux Backup Automation",
        "category": "linux",
        "description": "Automated incremental backup solution using Bash, rsync, NFS, and systemd timers with automated log rotation and health verification.",
        "tags": ["Bash", "systemd", "rsync", "NFS", "Automation"],
        "featured": True,
        "impact": "Zero-touch daily incremental backups with automated retention policy."
    },
    "Ansible-Practice": {
        "title": "Ansible Infrastructure Automation & IaC",
        "category": "linux",
        "description": "Infrastructure as Code hands-on repository covering automated playbooks, reusable roles, dynamic inventories, variables, and ad-hoc Linux management.",
        "tags": ["Ansible", "IaC", "YAML", "Configuration Management", "Linux"],
        "featured": False,
        "impact": "Automated multi-node provisioning and configuration enforcement."
    },
    "Dockerizing-a-NodeJS-WebApp": {
        "title": "Dockerized Node.js Microservice with Nginx",
        "category": "devops",
        "description": "Multi-stage Docker containerization of a Node.js web application coupled with Nginx reverse proxy for production-grade caching and routing.",
        "tags": ["Docker", "Node.js", "Nginx", "Reverse Proxy", "Multi-stage Build"],
        "featured": False,
        "impact": "Optimized image layers and isolated networking for Node services."
    },
    "Wordpress-Hosting-on-LEMP-Stack": {
        "title": "High-Performance WordPress on LEMP Stack",
        "category": "linux",
        "description": "Production-hardened LEMP (Linux, Nginx, MariaDB, PHP-FPM) server setup with fastcgi caching, database optimization, and SSL security.",
        "tags": ["LEMP", "Nginx", "MariaDB", "PHP-FPM", "Linux"],
        "featured": False,
        "impact": "Bare-metal high-throughput web server architecture."
    },
    "Wordpress-Docker-Lamp-Stack": {
        "title": "Containerized WordPress LAMP Stack",
        "category": "devops",
        "description": "Docker Compose orchestration for multi-container WordPress environment with Apache, MySQL, persistent storage volumes, and environment isolation.",
        "tags": ["Docker", "Compose", "WordPress", "MySQL", "Apache"],
        "featured": False
    },
    "Local-LLM-with-Ollama-and-OpenWebUI": {
        "title": "Local LLM Lab (Ollama & Docker)",
        "category": "ai",
        "description": "Hands-on lab deploying, managing, and experimenting with local LLMs (Llama 3, Mistral) using Ollama, Docker containers, and Open WebUI.",
        "tags": ["Ollama", "OpenWebUI", "Docker", "LLM", "Local AI"],
        "featured": False
    },
    "NFS-Setup": {
        "title": "Enterprise NFS Server & Persistent Mounts",
        "category": "linux",
        "description": "Linux NFS network storage architecture configuring an NFS server on Fedora and multi-client mounts on Ubuntu with persistent /etc/fstab exports.",
        "tags": ["NFS", "Storage", "Fedora", "Ubuntu", "Linux SysAdmin"],
        "featured": False
    },
    "Self-Hosted-Audiobookshelf-Docker": {
        "title": "Self-Hosted Audiobookshelf Server",
        "category": "devops",
        "description": "Containerized deployment of Audiobookshelf in Docker for managing and streaming personal audiobook libraries and podcasts with volume persistence.",
        "tags": ["Docker", "Self-Hosted", "Media", "Homelab"],
        "featured": False
    },
    "ssh-configuration-Linux": {
        "title": "Linux SSH Security Hardening",
        "category": "linux",
        "description": "Enterprise SSH hardening configuration guide covering ed25519 key-based authentication, non-standard port isolation, disabled root login, and client automation.",
        "tags": ["SSH", "Security", "Hardening", "Linux", "SysAdmin"],
        "featured": False
    },
    "RHCSA-9-Exam-Preparation-Labs": {
        "title": "RHCSA 9 Enterprise Administration Labs",
        "category": "linux",
        "description": "Comprehensive practical labs for Red Hat Certified System Administrator 9: LVM partitioning, SELinux policies, firewall configuration, and systemd units.",
        "tags": ["RHCSA", "RHEL", "SELinux", "systemd", "Firewalld"],
        "featured": False
    },
    "Bash-Practice": {
        "title": "Production Bash Scripting & Streams",
        "category": "linux",
        "description": "Collection of robust Shell scripts demonstrating POSIX conventions, text stream processing (awk/sed/grep), automation tasks, and error handling.",
        "tags": ["Bash", "Shell", "CLI", "Automation", "Linux"],
        "featured": False
    },
    "homenode.online-personal-documentation": {
        "title": "HomeNode Documentation Hub",
        "category": "devops",
        "description": "Personal engineering documentation hub covering Kubernetes GitOps, Cloudflare QUIC tunnels, Linux administration, and homelab architecture.",
        "tags": ["DevOps", "Documentation", "VitePress", "Cloudflare Pages"],
        "featured": False
    },
    "corsentri-website": {
        "title": "CorSentri Platform Website",
        "category": "web",
        "description": "Modern responsive Next.js App Router website built with TypeScript, custom modular styling, and optimized performance.",
        "tags": ["Next.js", "TypeScript", "React", "Tailwind/CSS", "Web"],
        "featured": False
    },
    "corsentri-progress": {
        "title": "CorSentri Product Showcase",
        "category": "web",
        "description": "Frontend showcase and interactive progress dashboard built with Next.js, modern CSS layout, and TypeScript.",
        "tags": ["Next.js", "TypeScript", "CSS", "UI/UX"],
        "featured": False
    },
    "sarasota-mold-help": {
        "title": "Sarasota Mold Help - Local Service Site",
        "category": "web",
        "description": "Fast, responsive local business service landing page optimized for lead conversion and high Lighthouse performance.",
        "tags": ["HTML5", "CSS3", "JavaScript", "Responsive", "SEO"],
        "featured": False,
        "demo": "https://aayasir2177.github.io/sarasota-mold-help/"
    },
    "shipping-calculator-dart": {
        "title": "Dart Shipping & Logistics Calculator",
        "category": "mobile",
        "description": "Algorithmic shipping rate, distance, and parcel dimension calculator built with pure Dart with online DartPad execution.",
        "tags": ["Dart", "Algorithms", "CLI", "DartPad"],
        "featured": False,
        "demo": "https://dartpad.dev/?id=52a77787b72789caaef7ab816025be52"
    },
    "auth-app-flutterfire": {
        "title": "FlutterFire Authentication Suite",
        "category": "mobile",
        "description": "Cross-platform mobile authentication application using Flutter and Firebase, featuring secure token storage, email/password validation, and routing.",
        "tags": ["Flutter", "Firebase", "Dart", "Auth", "Mobile"],
        "featured": False
    },
    "api-integration-with-models-flutter": {
        "title": "Flutter REST API & Type-Safe Models",
        "category": "mobile",
        "description": "Clean architecture Flutter mobile application demonstrating asynchronous REST API consumption, error handling, and type-safe JSON serialization.",
        "tags": ["Flutter", "Dart", "REST API", "JSON", "Architecture"],
        "featured": False
    },
    "weather-app-flutter": {
        "title": "Flutter Real-Time Weather Application",
        "category": "mobile",
        "description": "Cross-platform weather application built with Flutter, consuming OpenWeather API with geolocation sensing and custom weather visualizers.",
        "tags": ["Flutter", "Dart", "OpenWeather", "API", "Mobile"],
        "featured": False
    },
    "shopping_app_flutter": {
        "title": "Flutter E-Commerce Store & Cart",
        "category": "mobile",
        "description": "Mobile shopping experience built with Flutter, featuring product browsing, categorized catalog, item details, and interactive shopping cart state.",
        "tags": ["Flutter", "Dart", "E-Commerce", "State Management"],
        "featured": False
    },
    "wallet-app-typescript-oop": {
        "title": "TypeScript OOP Finance Logger",
        "category": "web",
        "description": "Object-Oriented personal finance logger and budget tracker built with TypeScript classes, interfaces, DOM rendering, and LocalStorage persistence.",
        "tags": ["TypeScript", "OOP", "LocalStorage", "Web App"],
        "featured": False
    },
    "wallet-app-js-oop": {
        "title": "Vanilla JS OOP Expense Tracker",
        "category": "web",
        "description": "Object-oriented expense tracking web application with dynamic balance calculations, transaction logging, and browser storage.",
        "tags": ["JavaScript", "OOP", "LocalStorage", "DOM"],
        "featured": False
    },
    "book-library-js-oop": {
        "title": "Vanilla JS OOP Book Library App",
        "category": "web",
        "description": "Object-Oriented book cataloging application with reading status tracking, dynamic form validation, and LocalStorage persistence.",
        "tags": ["JavaScript", "OOP", "LocalStorage", "CSS3"],
        "featured": False
    },
    "todo-js": {
        "title": "Object-Oriented Todo App",
        "category": "web",
        "description": "Vanilla JavaScript OOP task manager featuring task filtering (All, Active, Completed), inline editing, and persistent browser storage.",
        "tags": ["JavaScript", "OOP", "LocalStorage", "CSS3"],
        "featured": False
    },
    "tic-tac-toe-js": {
        "title": "Interactive Tic-Tac-Toe Game",
        "category": "web",
        "description": "Web-based Tic-Tac-Toe game featuring custom sketchy hand-drawn UI styling and minimax-style algorithmic winner detection.",
        "tags": ["JavaScript", "Game Dev", "CSS Grid", "UI Design"],
        "featured": False
    },
    "flitering-js": {
        "title": "Instant Client-Side User Filter",
        "category": "web",
        "description": "Real-time client-side search and filtering interface consuming JSONPlaceholder API with responsive styling and debounce optimization.",
        "tags": ["JavaScript", "REST API", "Search", "DOM"],
        "featured": False
    },
    "grocery-store-react": {
        "title": "React Grocery Store SPA",
        "category": "web",
        "description": "Single-page grocery e-commerce storefront built with React, Chakra UI component library, and React Router navigation.",
        "tags": ["React", "Chakra UI", "React Router", "SPA"],
        "featured": False
    },
    "mvc-crud-express": {
        "title": "Express.js MVC CRUD Application",
        "category": "web",
        "description": "Backend CRUD web application implementing the Model-View-Controller design pattern in Express.js with database integration.",
        "tags": ["Express.js", "Node.js", "MVC", "CRUD", "REST"],
        "featured": False
    },
    "todo-react-redux": {
        "title": "React Redux Task Manager",
        "category": "web",
        "description": "Predictable state-managed Todo web application built with React and Redux Toolkit showcasing unidirectional data flow.",
        "tags": ["React", "Redux", "State Management", "JavaScript"],
        "featured": False
    },
    "saylani-website-react-ts": {
        "title": "Institutional Portal (React & TS)",
        "category": "web",
        "description": "Responsive web portal built using React and TypeScript with modular components, type-safe props, and clean UX layout.",
        "tags": ["React", "TypeScript", "Frontend", "Component Architecture"],
        "featured": False
    },
    "vps-stash-bootstrap": {
        "title": "VPS Stash Cloud Landing Page",
        "category": "web",
        "description": "High-converting cloud hosting landing page designed with Bootstrap 5, AOS scroll animations, and EmailJS integration.",
        "tags": ["Bootstrap 5", "HTML5", "CSS3", "AOS", "EmailJS"],
        "featured": False
    },
    "desversa-v3-bootstrap": {
        "title": "Desversa Creative Agency Portal v3",
        "category": "web",
        "description": "Production agency portal featuring Bootstrap 4, Express backend, AOS scroll triggers, Slick Carousel, and Filterizr dynamic filtering.",
        "tags": ["Bootstrap", "Express", "Slick", "Filterizr", "CSS3"],
        "featured": False
    },
    "desversa-v2-bootstrap": {
        "title": "Desversa Creative Agency Portal v2",
        "category": "web",
        "description": "Interactive agency website featuring Swiper JS slider, LightBox image viewing, Isotope grid sorting, and custom responsive styling.",
        "tags": ["Bootstrap", "Swiper JS", "Isotope", "LightBox"],
        "featured": False
    },
    "currency-converter-app-flutter": {
        "title": "Flutter Currency Converter",
        "category": "mobile",
        "description": "Mobile exchange rate calculator consuming real-time foreign currency APIs with smooth input animations and quick swap functionality.",
        "tags": ["Flutter", "Dart", "Exchange Rates", "Mobile API"],
        "featured": False
    },
    "provider-practice-flutter": {
        "title": "Flutter Provider Reactive State",
        "category": "mobile",
        "description": "Mobile application demonstrating reactive state management patterns and ChangeNotifier architecture with the Provider package.",
        "tags": ["Flutter", "Dart", "Provider", "State Management"],
        "featured": False
    },
    "theme-switcher-app-flutter": {
        "title": "Flutter Dynamic Theme Switcher",
        "category": "mobile",
        "description": "Mobile UI utility app with instant light/dark theme toggling and persistent system theme adaptation in Flutter.",
        "tags": ["Flutter", "Dart", "Theme Engine", "UI/UX"],
        "featured": False
    },
    "population-app-flutter": {
        "title": "Flutter Demographics Explorer",
        "category": "mobile",
        "description": "Demographic and global population data explorer consuming public statistics endpoints with dynamic charts.",
        "tags": ["Flutter", "Dart", "Data Visualization", "REST API"],
        "featured": False
    },
    "wish-list-app-flutter": {
        "title": "Flutter Wishlist Tracker",
        "category": "mobile",
        "description": "Personal product wishlist mobile application built with Flutter featuring item status management and clean card UI.",
        "tags": ["Flutter", "Dart", "State Management", "Mobile"],
        "featured": False
    },
    "open_weather_api_dart": {
        "title": "Dart OpenWeather API Client",
        "category": "mobile",
        "description": "Pure command-line Dart interface consuming the OpenWeatherMap API to parse JSON responses and print weather forecasts.",
        "tags": ["Dart", "CLI", "HTTP", "REST API"],
        "featured": False
    },
    "guess-game-flutter": {
        "title": "Flutter Number Guess Game",
        "category": "mobile",
        "description": "Interactive mobile guessing game in Flutter with score counters, random number generators, and game state feedback.",
        "tags": ["Flutter", "Dart", "Game", "UI Animation"],
        "featured": False
    },
    "bmi-calculator-flutter": {
        "title": "Flutter BMI Health Calculator",
        "category": "mobile",
        "description": "Body Mass Index mobile health calculator with custom interactive gender selectors, height sliders, and health score feedback.",
        "tags": ["Flutter", "Dart", "Health Tech", "Sliders"],
        "featured": False
    },
    "sum-dart": {
        "title": "Dart Algorithmic Calculation Suite",
        "category": "mobile",
        "description": "Dart algorithms and computation scripts exploring recursive data operations and mathematical processing.",
        "tags": ["Dart", "Algorithms", "Mathematics"],
        "featured": False
    },
    "unit-converter-python": {
        "title": "Python Measurement Unit Converter",
        "category": "ai",
        "description": "Command-line utility written in Python for converting metric and imperial units across length, weight, volume, and temperature.",
        "tags": ["Python", "CLI", "Utility", "Automation"],
        "featured": False
    },
    "fizz-buzz-python": {
        "title": "Python Algorithmic FizzBuzz & Tests",
        "category": "ai",
        "description": "Clean Pythonic implementation of the classic FizzBuzz interview algorithm accompanied by automated unit tests.",
        "tags": ["Python", "Algorithms", "Unit Testing"],
        "featured": False
    },
    "saylani-whatsapp-web-task-2022": {
        "title": "WhatsApp Web Responsive Clone",
        "category": "web",
        "description": "Pixel-accurate responsive frontend clone of the WhatsApp Web chat interface built using HTML5, CSS3, and Flexbox.",
        "tags": ["HTML5", "CSS3", "Flexbox", "UI Clone"],
        "featured": False
    },
    "saylani-website-task-2022": {
        "title": "Institutional Multi-Page Web Layout",
        "category": "web",
        "description": "Multi-page semantic institutional website layout built with HTML5, CSS3, responsive grids, and clean navigation.",
        "tags": ["HTML5", "CSS3", "Responsive", "Web Layout"],
        "featured": False
    },
    "saylani-js-tasks-2022": {
        "title": "JavaScript DOM & Algorithm Lab",
        "category": "web",
        "description": "Comprehensive practical lab covering core JavaScript concepts: array methods, DOM event handlers, closures, and async patterns.",
        "tags": ["JavaScript", "DOM", "Algorithms", "Vanilla JS"],
        "featured": False
    },
    "api-js": {
        "title": "Vanilla JS REST Client & DOM Renderer",
        "category": "web",
        "description": "Vanilla JavaScript REST client practicing Fetch API calls, asynchronous promise resolution, and dynamic DOM rendering.",
        "tags": ["JavaScript", "Fetch API", "DOM", "Asynchronous"],
        "featured": False
    },
    "routes-practice-express": {
        "title": "Express.js RESTful Routing Practice",
        "category": "web",
        "description": "Express.js server architecture exploring modular router middlewares, query string parsing, and route controllers.",
        "tags": ["Express.js", "Node.js", "REST API", "Routing"],
        "featured": False
    },
    "ecommerce-store-react": {
        "title": "React Interactive E-Commerce Prototype",
        "category": "web",
        "description": "Interactive e-commerce storefront prototype built with React functional components, hooks, and client-side filtering.",
        "tags": ["React", "JavaScript", "Hooks", "E-Commerce"],
        "featured": False
    },
    "desversa-v1-bootstrap": {
        "title": "Desversa Agency Portfolio v1",
        "category": "web",
        "description": "Initial design prototype of the Desversa digital agency landing page built with modern HTML5, CSS3, and Bootstrap.",
        "tags": ["HTML5", "CSS3", "Bootstrap", "Web Design"],
        "featured": False
    },
    "aptech-js-tasks-2020": {
        "title": "Aptech Web Development Labs (2020)",
        "category": "web",
        "description": "Early milestone repository containing Aptech web curriculum tasks across HTML, CSS, Bootstrap, JavaScript, and PHP scripting.",
        "tags": ["HTML", "CSS", "JavaScript", "PHP", "Milestone"],
        "featured": False
    },
    "AboutCS-Website-2018": {
        "title": "Counter-Strike Gaming Community Portal",
        "category": "web",
        "description": "Milestone tribute web portal dedicated to Counter-Strike game history, strategy guides, and weapon mechanics built in 2018.",
        "tags": ["HTML", "CSS", "Gaming", "Milestone (2018)"],
        "featured": False
    },
    "FamSoft-Website": {
        "title": "FamSoft Genesis Website (2018)",
        "category": "web",
        "description": "Historical first website coded in HTML4 & CSS3 in 2018, representing the humble beginnings of the engineering journey.",
        "tags": ["HTML4", "CSS3", "First Project", "Milestone (2018)"],
        "featured": False
    },
    "aayasir2177": {
        "title": "GitHub Profile Readme & Homelab Blueprint",
        "category": "devops",
        "description": "GitHub profile repository showcasing homelab architecture, GitOps sync details, skills toolbox, and verified workflows.",
        "tags": ["GitHub", "Markdown", "GitOps", "Homelab"],
        "featured": False
    }
}

processed = []
for r in repos:
    name = r["name"]
    meta = custom_meta.get(name, {})
    
    # Category fallback
    cat = meta.get("category")
    lang = r.get("language") or "Other"
    if not cat:
        if lang in ["Python"]:
            cat = "ai"
        elif lang in ["Dart", "CMake"]:
            cat = "mobile"
        elif lang in ["JavaScript", "TypeScript", "HTML", "CSS", "PHP"]:
            cat = "web"
        elif lang in ["Shell", "Dockerfile"]:
            cat = "linux"
        else:
            cat = "devops"
            
    title = meta.get("title", name.replace("-", " ").replace("_", " "))
    desc = meta.get("description") or r.get("description") or f"Repository {name} built with {lang}."
    tags = meta.get("tags") or ([lang] if lang != "None" else ["DevOps"])
    featured = meta.get("featured", False)
    impact = meta.get("impact", "")
    demo = meta.get("demo") or (r.get("homepage") if r.get("homepage") and r.get("homepage").startswith("http") else None)
    
    processed.append({
        "id": name,
        "name": name,
        "title": title,
        "category": cat,
        "description": desc,
        "tags": tags,
        "language": lang,
        "stars": r.get("stars", 0),
        "forks": r.get("forks", 0),
        "html_url": r["html_url"],
        "demo": demo,
        "featured": featured,
        "impact": impact,
        "created_at": r.get("created_at"),
        "pushed_at": r.get("pushed_at")
    })

# Sort: featured first, then pushed_at desc
processed.sort(key=lambda x: (not x["featured"], x.get("pushed_at", "")), reverse=True)

with open("projects.json", "w") as f:
    json.dump(processed, f, indent=2)

print(f"Successfully generated projects.json with {len(processed)} repositories!")
categories_count = {}
for p in processed:
    c = p["category"]
    categories_count[c] = categories_count.get(c, 0) + 1
print("Categories breakdown:", categories_count)
print("Featured projects:", len([p for p in processed if p["featured"]]))
