import { SITE_CONFIG } from '@/data/siteConfig';
import { Cloud, Cpu, Server, Activity, Code, Database, LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Cloud,
  Cpu,
  Server,
  Activity,
  Code,
  Database,
};

export default function SkillsMatrix() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent-cyan)] mb-2">
            COMPETENCIES
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            Technical Expertise &amp; Tooling
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl">
            Production-tested tools and frameworks utilized across cloud systems, pipelines, and applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.skillCategories.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon] || Server;

            return (
              <div
                key={i}
                className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] text-[var(--accent-cyan)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-2.5 py-1 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
