import { Check } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent-cyan)]">
              ENGINEERING PHILOSOPHY
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Automating Everything, Securing by Default
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              I am an aspiring DevOps Engineer and passionate homelab architect based in {SITE_CONFIG.location}. My journey began with web development and has evolved into deep systems engineering, enterprise Linux administration, and Kubernetes GitOps orchestration.
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              I believe in <strong className="text-[var(--text-primary)]">declarative infrastructure</strong>: if it&apos;s not codified in Git, it doesn&apos;t exist. My homelab serves as a live proving ground where enterprise best practices — automated drift correction, zero inbound router ports, hardened SSH authentication, and full observability telemetry — are rigorously tested and iterated upon.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                <span className="p-1 rounded-full bg-emerald-500/10 text-[var(--accent-emerald)] shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-[var(--text-primary)] block">Declarative State over Manual Configuration:</strong>
                  <span>Every service, network rule, and secret is managed as code.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                <span className="p-1 rounded-full bg-emerald-500/10 text-[var(--accent-emerald)] shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-[var(--text-primary)] block">Zero-Trust Network Perimeter:</strong>
                  <span>No router port forwarding. Cloudflare QUIC tunnels + 2FA forward auth.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                <span className="p-1 rounded-full bg-emerald-500/10 text-[var(--accent-emerald)] shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-[var(--text-primary)] block">Continuous Telemetry:</strong>
                  <span>If you can&apos;t measure it, you can&apos;t guarantee its reliability.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Terminal Box */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[var(--border-color)] bg-[#050811] overflow-hidden shadow-2xl">
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-[#0c1220] border-b border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  yasir@homenode: ~/career
                </span>
                <span className="w-8" />
              </div>

              {/* Terminal Output */}
              <pre className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-200 overflow-x-auto">
                <code>
                  <span className="text-[var(--accent-emerald)] font-bold">$ </span>
                  <span>cat profile.json</span>
                  {`\n{\n  `}
                  <span className="text-[var(--accent-cyan)]">&quot;name&quot;</span>
                  {`: `}
                  <span className="text-emerald-400">&quot;${SITE_CONFIG.name}&quot;</span>
                  {`,\n  `}
                  <span className="text-[var(--accent-cyan)]">&quot;handle&quot;</span>
                  {`: `}
                  <span className="text-emerald-400">&quot;@${SITE_CONFIG.handle}&quot;</span>
                  {`,\n  `}
                  <span className="text-[var(--accent-cyan)]">&quot;location&quot;</span>
                  {`: `}
                  <span className="text-emerald-400">&quot;${SITE_CONFIG.location}&quot;</span>
                  {`,\n  `}
                  <span className="text-[var(--accent-cyan)]">&quot;role&quot;</span>
                  {`: `}
                  <span className="text-emerald-400">&quot;DevOps &amp; Homelab Engineer&quot;</span>
                  {`,\n  `}
                  <span className="text-[var(--accent-cyan)]">&quot;status&quot;</span>
                  {`: `}
                  <span className="text-emerald-400">&quot;Available for Full-Time / Contract&quot;</span>
                  {`,\n  `}
                  <span className="text-[var(--accent-cyan)]">&quot;primary_stack&quot;</span>
                  {`: [\n    `}
                  <span className="text-emerald-400">&quot;Kubernetes&quot;</span>
                  {`, `}
                  <span className="text-emerald-400">&quot;Docker&quot;</span>
                  {`,\n    `}
                  <span className="text-emerald-400">&quot;ArgoCD&quot;</span>
                  {`, `}
                  <span className="text-emerald-400">&quot;Ansible&quot;</span>
                  {`,\n    `}
                  <span className="text-emerald-400">&quot;Linux/RHEL&quot;</span>
                  {`, `}
                  <span className="text-emerald-400">&quot;Prometheus&quot;</span>
                  {`\n  ],\n  `}
                  <span className="text-[var(--accent-cyan)]">&quot;uptime&quot;</span>
                  {`: `}
                  <span className="text-emerald-400">&quot;99.98%&quot;</span>
                  {`\n}\n`}
                  <span className="text-[var(--accent-emerald)] font-bold">$ </span>
                  <span>ping -c 1 gitops.homenode.online</span>
                  {`\n`}
                  <span className="text-emerald-400">64 bytes: icmp_seq=1 ttl=64 time=0.842 ms</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
