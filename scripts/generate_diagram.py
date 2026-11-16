#!/usr/bin/env python3
"""
HomeNode Architecture Diagram and Flow GIF Generator
Uses diagrams.py to generate architecture components and renders
an animated GIF depicting live data flow across the pipeline.
"""

import os
import re
import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw

from diagrams import Diagram, Cluster, Edge
from diagrams.onprem.vcs import Github
from diagrams.saas.cdn import Cloudflare
from diagrams.onprem.gitops import Argocd
from diagrams.onprem.monitoring import Prometheus, Grafana
from diagrams.onprem.client import User
from diagrams.k8s.compute import Deployment
from diagrams.generic.storage import Storage

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(ROOT_DIR, "docs", "public", "images")
os.makedirs(OUTPUT_DIR, exist_ok=True)

OUT_BASE = os.path.join(OUTPUT_DIR, "hero_diagram")
PNG_PATH = f"{OUT_BASE}.png"
SVG_PATH = f"{OUT_BASE}.svg"
GIF_PATH = f"{OUT_BASE}.gif"

GRAPH_ATTR = {
    "fontsize": "13",
    "bgcolor": "#ffffff",
    "fontcolor": "#0f172a",
    "fontname": "Helvetica-Bold",
    "pad": "0.3",
    "splines": "spline",
    "nodesep": "0.6",
    "ranksep": "0.8",
    "direction": "LR"
}

NODE_ATTR = {
    "fontcolor": "#0f172a",
    "fontsize": "10",
    "fontname": "Helvetica-Bold",
}

EDGE_ATTR = {
    "color": "#0284c7",
    "fontsize": "9",
    "fontname": "Helvetica",
}

def build_diagrams():
    for fmt in ["png", "svg"]:
        with Diagram(
            "HomeNode Architecture",
            filename=OUT_BASE,
            outformat=fmt,
            show=False,
            graph_attr=GRAPH_ATTR,
            node_attr=NODE_ATTR,
            edge_attr=EDGE_ATTR
        ):
            dev = User("DevOps Engineer")

            with Cluster("Version Control & CI/CD"):
                gh = Github("GitHub Repository\n(Manifests & Code)")

            with Cluster("Edge Ingress"):
                cf = Cloudflare("Cloudflare Edge\n& QUIC Tunnel")

            with Cluster("Homelab Cluster (Zero Inbound Ports)"):
                with Cluster("GitOps Control"):
                    argo = Argocd("ArgoCD\n(< 5s Sync)")

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

    print(f"Generated base diagram: {PNG_PATH} and {SVG_PATH}")

def parse_bezier_segments(d):
    tokens = re.findall(r"([A-Za-z])|(-?[0-9]+\.?[0-9]*)", d)
    cmd = ""
    coords = []
    segments = []
    current_pt = (0.0, 0.0)
    for c, val in tokens:
        if c:
            cmd = c
            coords = []
        else:
            coords.append(float(val))
            if cmd == "M" and len(coords) == 2:
                current_pt = (coords[0], coords[1])
                coords = []
            elif cmd == "C" and len(coords) == 6:
                p0 = current_pt
                p1 = (coords[0], coords[1])
                p2 = (coords[2], coords[3])
                p3 = (coords[4], coords[5])
                segments.append((p0, p1, p2, p3))
                current_pt = p3
                coords = []
    return segments

def sample_bezier(p0, p1, p2, p3, num_points=15):
    points = []
    for i in range(num_points + 1):
        u = i / num_points
        u2 = u * u
        u3 = u2 * u
        mu = 1 - u
        mu2 = mu * mu
        mu3 = mu2 * mu
        x = mu3 * p0[0] + 3 * mu2 * u * p1[0] + 3 * mu * u2 * p2[0] + u3 * p3[0]
        y = mu3 * p0[1] + 3 * mu2 * u * p1[1] + 3 * mu * u2 * p2[1] + u3 * p3[1]
        points.append((x, y))
    return points

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip("#")
    if len(hex_str) == 6:
        return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))
    return (37, 99, 235)

def build_animated_gif():
    tree = ET.parse(SVG_PATH)
    root = tree.getroot()

    tx, ty = 0.0, 0.0
    for g in root.iter("{http://www.w3.org/2000/svg}g"):
        if g.attrib.get("id") == "graph0":
            transform = g.attrib.get("transform", "")
            m = re.search(r"translate\(([-0-9.]+)\s+([-0-9.]+)\)", transform)
            if m:
                tx, ty = float(m.group(1)), float(m.group(2))
            break

    viewbox = root.attrib.get("viewBox", "0 0 1000 1000").split()
    vb_w, vb_h = float(viewbox[2]), float(viewbox[3])

    edges = []
    for g in root.iter("{http://www.w3.org/2000/svg}g"):
        if g.attrib.get("class") == "edge":
            path = g.find("{http://www.w3.org/2000/svg}path")
            if path is not None:
                edges.append({
                    "d": path.attrib.get("d", ""),
                    "color": path.attrib.get("stroke", "#2563eb")
                })

    base_img = Image.open(PNG_PATH).convert("RGBA")
    target_width = 1100
    scale_factor = target_width / base_img.width
    target_height = int(base_img.height * scale_factor)
    base_resized = base_img.resize((target_width, target_height), Image.Resampling.LANCZOS)

    sx = (base_img.width / vb_w) * scale_factor
    sy = (base_img.height / vb_h) * scale_factor

    edge_polylines = []
    for edge in edges:
        segments = parse_bezier_segments(edge["d"])
        full_pts = []
        for p0, p1, p2, p3 in segments:
            full_pts.extend(sample_bezier(p0, p1, p2, p3, num_points=15))
        pixel_pts = []
        for x, y in full_pts:
            px = (x + tx) * sx
            py = (ty + y) * sy
            pixel_pts.append((px, py))
        if pixel_pts:
            edge_polylines.append({
                "points": pixel_pts,
                "color": hex_to_rgb(edge["color"])
            })

    total_frames = 20
    frames = []
    for frame_idx in range(total_frames):
        t = frame_idx / total_frames
        frame = base_resized.copy()
        overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)

        for poly in edge_polylines:
            pts = poly["points"]
            if len(pts) < 2:
                continue
            color = poly["color"]
            for offset in [0.0, 0.5]:
                progress = (t + offset) % 1.0
                idx_float = progress * (len(pts) - 1)
                i0 = int(idx_float)
                i1 = min(i0 + 1, len(pts) - 1)
                frac = idx_float - i0
                x = pts[i0][0] + frac * (pts[i1][0] - pts[i0][0])
                y = pts[i0][1] + frac * (pts[i1][1] - pts[i0][1])

                draw.ellipse([x - 7, y - 7, x + 7, y + 7], fill=(color[0], color[1], color[2], 60))
                draw.ellipse([x - 4, y - 4, x + 4, y + 4], fill=(color[0], color[1], color[2], 180))
                draw.ellipse([x - 2, y - 2, x + 2, y + 2], fill=(255, 255, 255, 255))

        frame = Image.alpha_composite(frame, overlay)
        frames.append(frame.convert("RGB"))

    frames[0].save(
        GIF_PATH,
        save_all=True,
        append_images=frames[1:],
        duration=75,
        loop=0,
        optimize=True
    )
    print(f"Generated animated GIF: {GIF_PATH}")

if __name__ == "__main__":
    build_diagrams()
    build_animated_gif()
