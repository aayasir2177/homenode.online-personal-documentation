import Image from 'next/image';
import { ShieldCheck, GitPullRequest, Activity } from 'lucide-react';

export default function HomelabArchitecture() {
  return (
    <section id="homelab" className="py-16 md:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent-cyan)] mb-2">
            SYSTEMS TOPOLOGY
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            Homelab &amp; Network Architecture
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl">
            Self-hosted infrastructure engineered for high availability, zero public exposure, and automated GitOps synchronization.
          </p>
        </div>

        {/* Architecture Card */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-sm">
          {/* Architecture Diagram */}
          <div className="p-4 sm:p-8 bg-white flex items-center justify-center border-b border-[var(--border-color)] overflow-x-auto">
            <Image
              src="/images/hero_diagram.svg"
              alt="HomeNode DevOps and Homelab Topology Map"
              width={1000}
              height={650}
              className="max-w-full h-auto rounded"
              priority={false}
            />
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8">
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--accent-cyan)] shrink-0" />
                <span>Zero Inbound Ports</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Ingress traffic arrives through encrypted Cloudflare QUIC Tunnels with no public port forwarding on the home router. Caddy forward-authenticates requests via Authelia 2FA.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-[var(--accent-cyan)] shrink-0" />
                <span>Zero-Delay GitOps</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Webhook-triggered continuous delivery reconciles Git commits in sub-5 seconds. Workload states are declared in Git with automated drift detection and self-healing.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[var(--accent-cyan)] shrink-0" />
                <span>Unified Observability</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Prometheus scrapes metrics across physical hosts and container runtimes, rendered in customizable Grafana dashboards with Pi-hole DNS routing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
