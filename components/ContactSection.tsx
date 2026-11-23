'use client';

import { useState } from 'react';
import { Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 text-center">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent-cyan)] mb-2">
            COLLABORATION
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            Let&apos;s Build Something Resilient
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            Interested in discussing Kubernetes, infrastructure automation, or full-time DevOps engineering opportunities? Reach out directly.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Email Card */}
          <div className="flex flex-col items-center p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all shadow-sm">
            <div className="p-3 rounded-full bg-[var(--bg-surface)] text-[var(--accent-cyan)] mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Email Directly</h3>
            <p className="font-mono text-xs text-[var(--text-muted)] mb-5">{SITE_CONFIG.email}</p>
            <div className="flex items-center gap-2 mt-auto">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
              >
                Send Email
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--accent-cyan)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                title="Copy Email Address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="flex flex-col items-center p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all shadow-sm">
            <div className="p-3 rounded-full bg-[var(--bg-surface)] text-[var(--accent-cyan)] mb-4">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">LinkedIn Profile</h3>
            <p className="font-mono text-xs text-[var(--text-muted)] mb-5">linkedin.com/in/aayasir217</p>
            <div className="mt-auto">
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--accent-cyan)] text-[var(--text-primary)] transition-colors"
              >
                <span>Connect</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="flex flex-col items-center p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all shadow-sm">
            <div className="p-3 rounded-full bg-[var(--bg-surface)] text-[var(--accent-cyan)] mb-4">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">GitHub Profile</h3>
            <p className="font-mono text-xs text-[var(--text-muted)] mb-5">github.com/{SITE_CONFIG.handle}</p>
            <div className="mt-auto">
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--accent-cyan)] text-[var(--text-primary)] transition-colors"
              >
                <span>Follow &amp; Star</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
