'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Search, X, CheckCircle, SlidersHorizontal } from 'lucide-react';

interface ProjectsExplorerProps {
  initialProjects: Project[];
}

export default function ProjectsExplorer({ initialProjects }: ProjectsExplorerProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'devops' | 'linux' | 'web' | 'mobile' | 'ai'>('all');
  const [sort, setSort] = useState<'featured' | 'recent' | 'name' | 'stars'>('featured');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Category counts
  const counts = useMemo(() => {
    return {
      all: initialProjects.length,
      devops: initialProjects.filter((p) => p.category === 'devops').length,
      linux: initialProjects.filter((p) => p.category === 'linux').length,
      web: initialProjects.filter((p) => p.category === 'web').length,
      mobile: initialProjects.filter((p) => p.category === 'mobile').length,
      ai: initialProjects.filter((p) => p.category === 'ai').length,
    };
  }, [initialProjects]);

  // Filtered and Sorted list
  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();

    return initialProjects
      .filter((p) => {
        const matchesCategory = category === 'all' || p.category === category;
        const matchesSearch =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.language.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sort === 'featured') {
          if (a.featured !== b.featured) return b.featured ? 1 : -1;
          return (b.pushed_at || '').localeCompare(a.pushed_at || '');
        }
        if (sort === 'recent') {
          return (b.pushed_at || '').localeCompare(a.pushed_at || '');
        }
        if (sort === 'name') {
          return a.title.localeCompare(b.title);
        }
        if (sort === 'stars') {
          return b.stars - a.stars;
        }
        return 0;
      });
  }, [initialProjects, search, category, sort]);

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setSort('featured');
  };

  const categories: Array<{ id: 'all' | 'devops' | 'linux' | 'web' | 'mobile' | 'ai'; label: string; count: number }> = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'devops', label: 'DevOps & Cloud', count: counts.devops },
    { id: 'linux', label: 'Linux & Automation', count: counts.linux },
    { id: 'web', label: 'Web & Full-Stack', count: counts.web },
    { id: 'mobile', label: 'Mobile (Flutter)', count: counts.mobile },
    { id: 'ai', label: 'AI & Systems', count: counts.ai },
  ];

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent-cyan)] mb-2">
            COMPLETE REPOSITORY INDEX
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            All GitHub Repositories
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl">
            Browse and search all 61 public projects from{' '}
            <a
              href="https://github.com/aayasir2177"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-cyan)] hover:underline"
            >
              @aayasir2177
            </a>
            . Instant real-time filtering with architectural breakdowns.
          </p>
        </div>

        {/* Toolbar: Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, technology (Docker, Ansible, React, Python), or keywords..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] transition-all"
              aria-label="Search repositories"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-[var(--text-muted)] hidden sm:inline-block" />
            <label htmlFor="sort-select" className="text-xs text-[var(--text-muted)] hidden sm:inline-block">
              Sort:
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="px-3 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer"
              aria-label="Sort repositories"
            >
              <option value="featured">Recommended / Featured</option>
              <option value="recent">Recently Pushed</option>
              <option value="name">Alphabetical (A-Z)</option>
              <option value="stars">Most Stars</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none" role="tablist">
          {categories.map((cat) => {
            const isActive = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                role="tab"
                aria-selected={isActive}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-sky-500 text-black border-sky-500 font-bold'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-xs font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/20 text-black' : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-muted)]">
          <div>
            Showing <strong className="text-[var(--text-primary)]">{filteredProjects.length}</strong> of{' '}
            {initialProjects.length} repositories
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-emerald)] font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>GitHub Verified</span>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} onOpenDetails={setSelectedProject} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--bg-card)]">
            <Search className="w-10 h-10 text-[var(--text-dim)] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">No repositories found</h3>
            <p className="text-sm text-[var(--text-muted)] mb-5 max-w-sm mx-auto">
              No repositories matched your search query or selected filter. Try searching for another keyword.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center px-4 py-2 rounded-md text-xs font-medium border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)] text-[var(--text-primary)] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
