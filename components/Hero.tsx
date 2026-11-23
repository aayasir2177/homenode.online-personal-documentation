import Link from 'next/link';
import { SITE_CONFIG } from '@/data/siteConfig';
import { ChevronRight, Server, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] opacity-20 pointer-events-none -z-10 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(129, 140, 248, 0.2) 50%, transparent 80%)'
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Terminal Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] font-mono text-xs sm:text-sm text-[var(--text-secondary)] mb-6 shadow-sm">
          <span className="text-[var(--accent-emerald)] font-bold">$</span>
          <code>whoami</code>
          <span className="text-[var(--text-dim)]">/</span>
          <span className="text-[var(--accent-cyan)] font-medium">DevOps &amp; Homelab Engineer</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-[var(--text-primary)] max-w-4xl mb-5">
          Engineering Resilient Infrastructure,{' '}
          <span className="gradient-text">Kubernetes GitOps</span> &amp; Autonomous Cloud Systems
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-8">
          Hi, I&apos;m <strong className="text-[var(--text-primary)]">{SITE_CONFIG.name}</strong> (
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-cyan)] hover:underline"
          >
            @{SITE_CONFIG.handle}
          </a>
          ). I architect self-healing Kubernetes clusters, declarative GitOps continuous delivery pipelines, zero-inbound-port cloud tunnels, and automated Linux infrastructure.
        </p>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mb-8">
          {SITE_CONFIG.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] transition-all hover:-translate-y-0.5 shadow-sm"
            >
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[var(--accent-cyan)] leading-none mb-1">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 transition-all shadow-md hover:shadow-sky-500/20 hover:-translate-y-0.5"
          >
            <span>Explore 61 Projects</span>
            <ArrowDown className="w-4 h-4" />
          </Link>
          <Link
            href="#homelab"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent-cyan)] text-[var(--text-primary)] transition-all"
          >
            <Server className="w-4 h-4 text-[var(--accent-cyan)]" />
            <span>Homelab Architecture</span>
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
          >
            <span>Get in Touch</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
