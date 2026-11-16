# Mini Uptime Monitor Microservices CI/CD

A modern, production-pattern microservices application designed for practicing **CI/CD with GitHub Actions**, multi-stage **Docker containerization**, automated test pipelines, and container registry publishing.

---

## Architecture & Component Topology

```mermaid
flowchart TD
    subgraph ClientLayer["User Interface"]
        UI["Next.js 15 App Router (Port 3000)<br/>TypeScript and Tailwind CSS"]
    end

    subgraph ServiceLayer["API and Probe Engine"]
        API["Express.js Service (Port 5001)<br/>TypeScript Engine"]
        Engine["30s Background Health Check and Latency Timer"]
    end

    subgraph TargetLayer["Monitored Targets"]
        T1["Target Website A (HTTP 200 OK)"]
        T2["Target Website B (Latency and Health)"]
    end

    UI - "REST API / Status Fetch" --> API
    API --> Engine
    Engine - "HTTP Probes" --> T1
    Engine - "HTTP Probes" --> T2
```

* **Frontend (Next.js 15)**: Modern status dashboard displaying real-time target status (`UP` / `DOWN`), latency in milliseconds, HTTP response codes, and manual probe trigger buttons.
* **Backend (Express.js + TypeScript)**: REST endpoints handling monitor CRUD operations, automated 30s background ping loops, and health checks (`/health`).
* **Automated Unit & Integration Testing**: 6 unit & integration tests covering `/health`, URL format validation, monitor listing, and deletion.
* **Continuous Integration**: GitHub Actions workflow orchestrating parallel test jobs, Docker Buildx multi-stage image generation, and automated pushes to **GitHub Container Registry (GHCR)**.

---

## GitHub Actions CI/CD Pipeline

The pipeline is defined in `.github/workflows/ci.yml` and is triggered on every `push` and `pull_request` against `main`.

```mermaid
flowchart LR
    Push["git push origin main"] --> J1["backend-ci<br/>Node 22, npm ci, npm test, tsc build"]
    Push --> J2["frontend-ci<br/>Node 22, npm ci, next build"]
    J1 --> J3{"Both Passed?"}
    J2 --> J3
    J3 - Yes --> J4["docker-build (Docker Buildx)<br/>Build multi-stage containers and push to ghcr.io"]
    J3 - No --> Fail["Pipeline Fails and Blocks Merge"]
```

### Complete Workflow Definition:

```yaml
# .github/workflows/ci.yml
name: CI/CD Microservices Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  # Job 1: Validate and Test Backend
  backend-ci:
    name: Backend CI (Express)
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "npm"
          cache-dependency-path: backend/package-lock.json

      - name: Install Dependencies
        run: npm ci

      - name: Run Backend Unit Tests
        run: npm test

      - name: Build TypeScript Code
        run: npm run build

  # Job 2: Validate and Build Frontend (Runs in Parallel)
  frontend-ci:
    name: Frontend CI (Next.js)
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "npm"
          cache-dependency-path: frontend/package-lock.json

      - name: Install Dependencies
        run: npm ci

      - name: Build Next.js Application
        run: npm run build

  # Job 3: Build & Package Docker Images (Triggered upon test success)
  docker-build:
    name: Build Docker Images
    needs: [backend-ci, frontend-ci]
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GHCR
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build Backend Docker Image
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: ${{ github.event_name == 'push' && github.ref == 'refs/heads/main' }}
          tags: ghcr.io/${{ github.repository }}/backend:latest

      - name: Build Frontend Docker Image
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: ${{ github.event_name == 'push' && github.ref == 'refs/heads/main' }}
          tags: ghcr.io/${{ github.repository }}/frontend:latest
```

---

## Docker Compose Multi-Container Orchestration

```yaml
version: "3.8"

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: devops-backend
    ports:
      - "5001:5001"
    environment:
      - PORT=5001
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:5001/health"]
      interval: 10s
      timeout: 5s
      retries: 3

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: devops-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
    depends_on:
      backend:
        condition: service_healthy
```

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/aayasir2177/devops-microservices-cicd.git
cd devops-microservices-cicd

# Launch entire microservice stack with live health checks
docker compose up --build
```
Access the application:
* Frontend Dashboard: `http://localhost:3000`
* Backend Health Probe: `http://localhost:5001/health`
