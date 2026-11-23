import { PROJECTS } from '@/data/projects';
import { ExternalLink, CheckCircle2, Star, GitFork } from 'lucide-react';

export default function FeaturedProjects() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <section id="featured" className="py-16 md:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent-cyan)] mb-2">
            FLAGSHIP IMPLEMENTATIONS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            Featured Production Architectures
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl">
            Real-world infrastructure, declarative GitOps continuous delivery, and containerized microservices tested and running in production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <article
              key={p.id}
              className="flex flex-col justify-between p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-sky-500/5 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[11px] font-bold tracking-wider px-2 py-0.5 rounded cat-${p.category}`}>
                    {p.category.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors mb-2 leading-snug">
                  <a href={p.html_url} target="_blank" rel="noopener noreferrer">
                    {p.title}
                  </a>
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {p.description}
                </p>

                {p.impact && (
                  <div className="p-3 rounded-md bg-[var(--bg-secondary)] border-l-2 border-[var(--accent-cyan)] text-xs text-[var(--text-muted)] flex items-start gap-2 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                    <span>{p.impact}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.tags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[var(--text-dim)]">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" /> {p.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" /> {p.forks}
                  </span>
                </div>

                <a
                  href={p.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-sky-600/15 text-[var(--accent-cyan)] hover:bg-sky-600 hover:text-white transition-colors"
                >
                  <span>Code</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
