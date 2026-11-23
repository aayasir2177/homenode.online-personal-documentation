'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/data/projects';
import { X, Copy, Check, ExternalLink, GitBranch } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Dart: '#00B4AB',
  PHP: '#4F5D95',
  CMake: '#DA3434',
  None: '#6e7681',
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const cloneCmd = `git clone ${project.html_url}.git`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const langColor = LANG_COLORS[project.language] || '#8b949e';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className={`text-xs font-bold tracking-wider px-2 py-0.5 rounded cat-${project.category}`}>
              {project.category.toUpperCase()}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: langColor }} />
              <span>{project.language || 'DevOps'}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mb-3 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Impact if available */}
        {project.impact && (
          <div className="mb-5">
            <div className="text-xs uppercase tracking-wider font-bold text-[var(--accent-cyan)] mb-1.5">
              Architecture Impact
            </div>
            <div className="p-3 rounded-md bg-[var(--bg-secondary)] border-l-2 border-[var(--accent-emerald)] text-xs sm:text-sm text-[var(--text-secondary)]">
              {project.impact}
            </div>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="mb-5">
          <div className="text-xs uppercase tracking-wider font-bold text-[var(--accent-cyan)] mb-2">
            Technologies &amp; Topics
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--bg-surface)] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Git Clone Command */}
        <div className="mb-6">
          <div className="text-xs uppercase tracking-wider font-bold text-[var(--accent-cyan)] mb-2">
            Quick Clone
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-color)] font-mono text-xs text-[var(--accent-emerald)] overflow-hidden">
            <span className="truncate mr-2">{cloneCmd}</span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[var(--bg-surface)] hover:bg-[var(--accent-cyan)] hover:text-black text-[var(--text-secondary)] font-sans text-xs transition-colors shrink-0"
              title="Copy git clone command"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-end gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent-cyan)] text-[var(--text-primary)] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md bg-sky-600 hover:bg-sky-500 text-white transition-colors"
          >
            <GitBranch className="w-4 h-4" />
            <span>Open on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
