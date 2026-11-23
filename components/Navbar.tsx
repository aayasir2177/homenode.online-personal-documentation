'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { Menu, X, CloudUpload } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#featured', label: 'Featured' },
    { href: '#projects', label: 'Projects', count: '21' },
    { href: '#homelab', label: 'Homelab' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-primary)]/85 border-b border-[var(--border-color)] transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="#hero" className="inline-flex items-center gap-2 font-bold text-lg text-[var(--text-primary)] tracking-tight">
          <CloudUpload className="w-6 h-6 text-[var(--accent-emerald)]" />
          <span>
            HomeNode<span className="text-[var(--accent-cyan)] text-sm font-medium">.online</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.count && (
                <span className="font-mono text-xs px-1.5 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--accent-cyan)]">
                  {link.count}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {/* Status Pill */}
          <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/25 bg-emerald-500/10 text-[var(--accent-emerald)]" title="Open to DevOps & Cloud Opportunities">
            <span className="pulse-dot" />
            <span>Available for Work</span>
          </div>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* GitHub Profile Button */}
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent-cyan)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            title="GitHub Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>@{SITE_CONFIG.handle}</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"
            >
              <span>{link.label}</span>
              {link.count && (
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--accent-cyan)]">
                  {link.count}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
            <span className="text-xs text-[var(--accent-emerald)] font-medium flex items-center gap-2">
              <span className="pulse-dot" /> Available for DevOps roles
            </span>
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--accent-cyan)]"
            >
              @{SITE_CONFIG.handle}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
