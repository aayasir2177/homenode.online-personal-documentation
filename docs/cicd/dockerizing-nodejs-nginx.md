# Containerizing Node.js WebApps with Nginx Reverse Proxy

A step-by-step hands-on guide documenting the containerization of an Express/Node.js web application with Docker, orchestration via Docker Compose, and integration with Nginx Proxy Manager (NPM) for local virtual-host domain routing.

---

## Architecture & Network Flow

```mermaid
flowchart LR
    Client["Browser / Host (/etc/hosts)"]
    NPM["Nginx Proxy Manager (:80 / :443)"]
    NodeApp["Node.js Container (:8080)"]
    Bridge["Docker Bridge Network ('web')"]

    Client - "http://nodejs-webapp.local" --> NPM
    NPM - "Upstream: nodejs-webapp:8080" --> Bridge
    Bridge --> NodeApp
```

* **Network Isolation**: The Node.js application only exposes its port to the internal Docker bridge network (`expose: 8080`). It is never directly exposed to the host interface.
* **Unified Entrypoint**: All incoming traffic enters through Nginx Proxy Manager on ports 80/443, routing based on HTTP `Host` headers.

---

## Application & Dockerfile Implementation

### 1. Minimal Express Application (`server.js`)
```javascript
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    message: "Containerized Node.js application routed via Nginx Proxy Manager!"
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

### 2. Multi-Layer Alpine Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Optimize layer caching: copy dependency manifests first
COPY package*.json ./
RUN npm install

# Bundle application source
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
```

### 3. Docker Ignore Configuration (`.dockerignore`)
```text
node_modules
data
letsencrypt
.git
.env
```

---

## Docker Compose Stack (`compose.yaml`)

```yaml
services:
  nginx-pm:
    image: 'jc21/nginx-proxy-manager:2.15.1'
    container_name: nginx-pm
    restart: unless-stopped
    ports:
      - '80:80'      # HTTP traffic
      - '443:443'    # HTTPS traffic
      - '81:81'      # NPM Admin UI
    environment:
      TZ: "Asia/Karachi"
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    networks:
      - web

  nodejs-webapp:
    build: .
    container_name: nodejs-webapp
    restart: unless-stopped
    expose: 
      - "8080"
    networks:
      - web

networks:
  web:
    name: web
```

---

## Local DNS / Hosts Routing

Map the custom domain locally in `/etc/hosts`:

```bash
sudo vim /etc/hosts
# Add record:
127.0.0.1 nodejs-webapp.local
```

Inside Nginx Proxy Manager Admin Console (`http://localhost:81`):
1. Navigate to **Proxy Hosts** > **Add Proxy Host**.
2. **Domain Names**: `nodejs-webapp.local`
3. **Forward Hostname / IP**: `nodejs-webapp` (resolved automatically by Docker's internal DNS engine).
4. **Forward Port**: `8080`
5. Enable **Block Common Exploits** and **Websockets Support**.

Verify resolution and response:
```bash
curl -i http://nodejs-webapp.local
```
Expected response:
```text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
{"status":"healthy","message":"Containerized Node.js application routed via Nginx Proxy Manager!"}
```
