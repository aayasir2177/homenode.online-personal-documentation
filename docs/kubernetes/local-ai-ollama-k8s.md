# Local AI on Kubernetes: Ollama + Open WebUI

Deploy a self-hosted, private AI infrastructure on Kubernetes using **Ollama** (LLM inference backend) and **Open WebUI** (ChatGPT-style web interface) with persistent storage and single-command deployment via **Kustomize**.

---

## Architecture Overview

```text
[ Browser / User ]
        │
        ▼ NodePort :30080 (or Ingress)
┌───────────────────────────────────────────────┐
│  Service: openwebui-service (NodePort)        │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│  Deployment: openwebui                        │  <─── [openwebui-pvc (1Gi)]
│  Image: ghcr.io/open-webui/open-webui:main    │       (Users, chat history)
└───────────────────────┬───────────────────────┘
                        │ Internal DNS: http://ollama-service:11434
                        ▼
┌───────────────────────────────────────────────┐
│  Service: ollama-service (ClusterIP)          │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│  Deployment: ollama                           │  <─── [ollama-pvc (10Gi)]
│  Image: ollama/ollama:latest                  │       (Model weights)
└───────────────────────────────────────────────┘
```

---

## Repository Structure

```text
k8s-ollama-openwebui/
├── 01-dep-ollama.yaml         # Ollama deployment with CPU/RAM resource limits
├── 02-dep-openwebui.yaml      # Open WebUI deployment pointing to internal Ollama DNS
├── 03-svc-ollama.yaml         # Internal ClusterIP service (port 11434)
├── 04-svc-openwebui.yaml      # NodePort service exposing WebUI on port 30080
├── 05-pvc-ollama.yaml         # 10Gi PersistentVolumeClaim for model weights
├── 06-pvc-openwebui.yaml      # 1Gi PersistentVolumeClaim for user data and chats
├── 07-ingress-openwebui.yaml  # Optional Ingress definition for domain routing
└── kustomization.yaml         # Single-command deployment bundle for namespace local-ai
```

---

## Key Manifests

### 1. Ollama Deployment (`01-dep-ollama.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ollama
  namespace: local-ai
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ollama
  template:
    metadata:
      labels:
        app: ollama
    spec:
      containers:
      - name: ollama
        image: ollama/ollama:latest
        ports:
        - containerPort: 11434
        volumeMounts:
        - name: ollama-storage
          mountPath: /root/.ollama
        resources:
          requests:
            cpu: "2"
            memory: 4Gi
          limits:
            cpu: "4"
            memory: 16Gi
      volumes:
      - name: ollama-storage
        persistentVolumeClaim:
          claimName: ollama-pvc
```

### 2. Open WebUI Deployment (`02-dep-openwebui.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openwebui
  namespace: local-ai
spec:
  replicas: 1
  selector:
    matchLabels:
      app: openwebui
  template:
    metadata:
      labels:
        app: openwebui
    spec:
      containers:
      - name: openwebui
        image: ghcr.io/open-webui/open-webui:main
        ports:
        - containerPort: 8080
        env:
        - name: OLLAMA_BASE_URL
          value: "http://ollama-service:11434"
        volumeMounts:
        - name: webui-storage
          mountPath: /app/backend/data
        resources:
          requests:
            cpu: 250m
            memory: 512Mi
          limits:
            cpu: "1"
            memory: 2Gi
      volumes:
      - name: webui-storage
        persistentVolumeClaim:
          claimName: openwebui-pvc
```

### 3. Kustomization Bundle (`kustomization.yaml`)

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: local-ai

resources:
  - 05-pvc-ollama.yaml
  - 06-pvc-openwebui.yaml
  - 03-svc-ollama.yaml
  - 04-svc-openwebui.yaml
  - 01-dep-ollama.yaml
  - 02-dep-openwebui.yaml
```

---

## Deployment & Operation

### 1. Deploy Stack
```bash
# Create namespace
kubectl create namespace local-ai

# Apply all manifests via Kustomize
kubectl apply -k .
```

### 2. Verify Cluster Resources
```bash
kubectl get pods,svc,pvc -n local-ai
```

### 3. Model Management Inside Pod
Exec into the Ollama container to pull quantized models directly into the 10Gi persistent volume:

```bash
# Pull lightweight performant models
kubectl exec -it -n local-ai deployment/ollama - ollama pull qwen2.5:3b
kubectl exec -it -n local-ai deployment/ollama - ollama pull llama3.2:3b

# Verify downloaded models
kubectl exec -it -n local-ai deployment/ollama - ollama list
```

### 4. Accessing the Web UI
- **Via NodePort**: `http://<NODE_IP>:30080`
- **Via Port Forward**:
  ```bash
  kubectl port-forward -n local-ai svc/openwebui-service 8080:8080
  ```
  Open `http://localhost:8080` in your web browser.
