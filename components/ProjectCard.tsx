import { Project } from '@/data/projects';
import { Star, GitFork, ExternalLink, Code } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
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

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const langColor = LANG_COLORS[project.language] || '#8b949e';

  return (
    <article className="flex flex-col justify-between p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-bold tracking-wider px-2 py-0.5 rounded cat-${project.category}`}>
            {project.category.toUpperCase()}
          </span>

          <div className="flex items-center gap-1.5 text-xs text-[var(--text-dim)]" title={`Language: ${project.language}`}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: langColor }} />
            <span>{project.language || 'DevOps'}</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors mb-2 leading-snug">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h3>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 text-[var(--text-dim)]">
          <span className="flex items-center gap-1" title={`${project.stars} Stars`}>
            <Star className="w-3.5 h-3.5" /> {project.stars}
          </span>
          <span className="flex items-center gap-1" title={`${project.forks} Forks`}>
            <GitFork className="w-3.5 h-3.5" /> {project.forks}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[var(--border-color)] hover:border-[var(--accent-cyan)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Demo</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            title="Inspect project details"
          >
            <span>Details</span>
          </button>
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-sky-600/15 text-[var(--accent-cyan)] hover:bg-sky-600 hover:text-white transition-colors"
            title="View Code on GitHub"
          >
            <Code className="w-3 h-3" />
            <span>Code</span>
          </a>
        </div>
      </div>
    </article>
  );
}
