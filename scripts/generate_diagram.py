#!/usr/bin/env python3
"""
HomeNode Architecture Diagram Generator using diagrams.py
Generates the hero architecture diagram for homenode.online
"""

import os
from diagrams import Diagram, Cluster, Edge
from diagrams.onprem.vcs import Github
from diagrams.saas.cdn import Cloudflare
from diagrams.onprem.gitops import Argocd
from diagrams.onprem.monitoring import Prometheus, Grafana
from diagrams.onprem.client import User
from diagrams.k8s.compute import Deployment
from diagrams.generic.storage import Storage

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "docs", "public", "images")
os.makedirs(OUTPUT_DIR, exist_ok=True)
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "hero_diagram")

graph_attr = {
    "fontsize": "14",
    "bgcolor": "#ffffff",
    "fontcolor": "#0f172a",
    "fontname": "Helvetica-Bold",
    "pad": "0.3",
    "splines": "spline",
    "nodesep": "0.6",
    "ranksep": "0.8",
    "direction": "LR"
}

node_attr = {
    "fontcolor": "#0f172a",
    "fontsize": "10",
    "fontname": "Helvetica-Bold",
}

edge_attr = {
    "color": "#0284c7",
    "fontsize": "9",
    "fontname": "Helvetica",
}

def generate():
    with Diagram(
        "HomeNode Architecture",
        filename=OUTPUT_FILE,
        outformat="png",
        show=False,
        graph_attr=graph_attr,
        node_attr=node_attr,
        edge_attr=edge_attr
    ):
        dev = User("DevOps Engineer")

        with Cluster("Version Control & CI/CD"):
            gh = Github("GitHub Repository\n(Manifests & Code)")

        with Cluster("Edge Network"):
            cf = Cloudflare("Cloudflare Edge\n& QUIC Tunnel")

        with Cluster("Homelab Cluster (No Open Inbound Ports)"):
            with Cluster("GitOps Control"):
                argo = Argocd("ArgoCD\n(< 5s Webhook Sync)")

            with Cluster("Workloads"):
                ai_pod = Deployment("Local AI Stack\n(OpenWebUI + RAMen)")
                app_pod = Deployment("Microservices\n& Media Services")

            with Cluster("Observability & Storage"):
                mon = Prometheus("Prometheus\n& Grafana")
                nfs = Storage("NFS / NVMe\nStorage")

        dev >> Edge(color="#16a34a", label="git push") >> gh
        gh >> Edge(color="#16a34a", style="dashed", label="Webhook") >> cf
        cf >> Edge(color="#ea580c", label="QUIC Stream") >> argo
        argo >> Edge(color="#2563eb", label="Reconcile") >> [ai_pod, app_pod]
        mon >> Edge(color="#9333ea", style="dotted", label="Scrapes") >> [ai_pod, app_pod]
        ai_pod >> Edge(color="#059669", style="dashed", label="KV Cache") >> nfs

    print(f"Generated hero diagram: {OUTPUT_FILE}.png")

if __name__ == "__main__":
    generate()
