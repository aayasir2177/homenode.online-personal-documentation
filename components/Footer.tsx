'use client';

import Link from 'next/link';
import { CloudUpload, ArrowUp } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t border-[var(--border-color)] bg-[var(--bg-secondary)] py-12 transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-[var(--border-color)]">
          {/* Brand & Bio */}
          <div className="max-w-md">
            <Link href="#hero" className="inline-flex items-center gap-2 font-bold text-lg text-[var(--text-primary)] mb-3">
              <CloudUpload className="w-5 h-5 text-[var(--accent-emerald)]" />
              <span>
                HomeNode<span className="text-[var(--accent-cyan)] text-sm font-medium">.online</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Designed and engineered by <strong className="text-[var(--text-primary)]">{SITE_CONFIG.name}</strong> (@{SITE_CONFIG.handle}). High-performance Next.js App Router architecture with zero bloat and instant responsive rendering.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-8 text-xs sm:text-sm">
            <div className="space-y-2">
              <div className="font-semibold text-[var(--text-primary)] uppercase tracking-wider text-xs">
                Navigation
              </div>
              <ul className="space-y-1.5 text-[var(--text-muted)]">
                <li>
                  <Link href="#featured" className="hover:text-[var(--accent-cyan)] transition-colors">
                    Featured
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="hover:text-[var(--accent-cyan)] transition-colors">
                    All 61 Projects
                  </Link>
                </li>
                <li>
                  <Link href="#homelab" className="hover:text-[var(--accent-cyan)] transition-colors">
                    Homelab Map
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="hover:text-[var(--accent-cyan)] transition-colors">
                    Skills Matrix
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-[var(--text-primary)] uppercase tracking-wider text-xs">
                Connect
              </div>
              <ul className="space-y-1.5 text-[var(--text-muted)]">
                <li>
                  <a
                    href={SITE_CONFIG.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent-cyan)] transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent-cyan)] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-[var(--accent-cyan)] transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-dim)]">
          <div>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Built with Next.js &amp; Tailwind CSS. All systems operational.
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--accent-cyan)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
