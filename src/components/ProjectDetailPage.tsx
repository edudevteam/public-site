import React, { useEffect } from 'react';
import { EducationalApp } from '../types';
import { EDUCATIONAL_APPS } from '../data/appsData';
import { InteractiveAppDemo } from './InteractiveAppDemo';
import { ArrowLeft, ArrowRight, ExternalLink, Code } from 'lucide-react';

interface ProjectDetailPageProps {
  app: EducationalApp;
  onBack: () => void;
  onSelectProject: (app: EducationalApp) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  app,
  onBack,
  onSelectProject,
}) => {
  // Scroll to top when opening a project detail page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [app.id]);

  // Find next and previous projects for quick navigation
  const currentIndex = EDUCATIONAL_APPS.findIndex((a) => a.id === app.id);
  const prevApp =
    currentIndex > 0 ? EDUCATIONAL_APPS[currentIndex - 1] : EDUCATIONAL_APPS[EDUCATIONAL_APPS.length - 1];
  const nextApp =
    currentIndex < EDUCATIONAL_APPS.length - 1 ? EDUCATIONAL_APPS[currentIndex + 1] : EDUCATIONAL_APPS[0];

  const projectNumber = String(currentIndex + 1).padStart(2, '0');

  return (
    <div>
      {/* ── Back bar ─────────────────────────────────── */}
      <div className="border-b-2 border-ink dark:border-paper px-5 sm:px-8 lg:px-12 py-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-3 label text-[11px] hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink px-3 py-2 -ml-3 transition-colors cursor-pointer"
        >
          <ArrowLeft size={17} strokeWidth={2.5} />
          <span>All work</span>
        </button>
      </div>

      {/* ── Colour header ────────────────────────────── */}
      <div
        className="border-b-2 border-ink dark:border-paper px-5 sm:px-8 lg:px-12 py-10 sm:py-12 flex flex-col gap-9 text-ink"
        style={{ backgroundColor: app.primaryColor }}
      >
        <div className="flex items-start justify-between gap-6">
          <span className="display text-[3.5rem] sm:text-[4.5rem] leading-[0.8] tracking-[-0.05em]">
            {projectNumber}
          </span>
          <span className="label text-[10px] sm:text-[11px] border-2 border-ink px-4 py-2.5">
            {app.category}
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="display text-[2.5rem] sm:text-[4rem] lg:text-[6.5rem] leading-[0.86] tracking-[-0.045em]">
            {app.title}
          </h1>
          <p className="text-lg sm:text-[22px] font-medium leading-snug max-w-4xl">{app.tagline}</p>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[2px] bg-ink border-2 border-ink">
          <MetaCell label="Audience" value={app.audience} color={app.primaryColor} />
          <MetaCell label="Status" value={app.status} color={app.primaryColor} />
          <MetaCell label="Released" value={String(app.releaseYear)} color={app.primaryColor} />
          <MetaCell
            label="Standards"
            value={`${app.standardsAligned.length} aligned`}
            color={app.primaryColor}
          />
        </div>
      </div>

      {/* ── Framed screenshot ────────────────────────── */}
      <div className="border-b-2 border-ink dark:border-paper p-5 sm:p-8 lg:p-12">
        <img
          src={app.imageUrl}
          alt={`${app.title} interface`}
          referrerPolicy="no-referrer"
          className="w-full h-64 sm:h-96 lg:h-125 object-cover object-top border-2 border-ink dark:border-paper"
        />
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="border-b-2 border-ink dark:border-paper px-5 sm:px-8 lg:px-12 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_25rem] gap-12 lg:gap-18">
        <div className="flex flex-col gap-14">
          {/* Overview */}
          <section className="flex flex-col gap-5">
            <span className="label text-[11px] text-mute dark:text-void-mute">01 — Overview</span>
            <p className="text-xl sm:text-2xl font-medium leading-snug">{app.description}</p>
            <p className="text-base sm:text-[17px] leading-relaxed text-mute dark:text-void-mute max-w-3xl">
              {app.longDescription}
            </p>
          </section>

          {/* Key highlights */}
          <section className="flex flex-col">
            <span className="label text-[11px] text-mute dark:text-void-mute pb-5">
              02 — What it does
            </span>
            {app.keyHighlights.map((highlight, i) => (
              <div
                key={i}
                className={`flex items-baseline gap-6 border-t-2 border-ink dark:border-paper py-5 ${
                  i === app.keyHighlights.length - 1 ? 'border-b-2' : ''
                }`}
              >
                <span
                  className="display text-[22px] tracking-[-0.02em]"
                  style={{ color: app.primaryColor }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-lg sm:text-xl font-medium leading-snug">{highlight}</span>
              </div>
            ))}
          </section>

          {/* Learning objectives */}
          <section className="flex flex-col">
            <span className="label text-[11px] text-mute dark:text-void-mute pb-5">
              03 — Learning objectives
            </span>
            {app.learningObjectives.map((objective, i) => (
              <div
                key={i}
                className={`flex items-start gap-4.5 border-t border-hairline dark:border-void-line py-4 ${
                  i === app.learningObjectives.length - 1 ? 'border-b' : ''
                }`}
              >
                <span
                  className="w-3 h-3 border-2 border-ink dark:border-paper mt-2 shrink-0"
                  style={{ backgroundColor: app.primaryColor }}
                />
                <span className="text-base sm:text-[17px] leading-relaxed">{objective}</span>
              </div>
            ))}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">
          {app.liveUrl && (
            <a
              href={app.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 bg-ink text-paper dark:bg-paper dark:text-ink border-2 border-ink dark:border-paper px-6 py-5 hover:bg-paper hover:text-ink dark:hover:bg-void dark:hover:text-paper transition-colors"
            >
              <span className="display text-base tracking-normal">Launch the tool</span>
              <ExternalLink size={19} strokeWidth={2.5} />
            </a>
          )}

          {app.repoUrl && (
            <a
              href={app.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 border-2 border-ink dark:border-paper px-6 py-5 hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors"
            >
              <span className="display text-base tracking-normal">Source code</span>
              <Code size={19} strokeWidth={2.5} />
            </a>
          )}

          <div className="flex flex-col gap-4 border-2 border-ink dark:border-paper p-6 mt-3">
            <span className="label text-[10px] text-mute dark:text-void-mute">Built with</span>
            <div className="flex flex-wrap gap-2">
              {app.technologies.map((tech) => (
                <span
                  key={tech}
                  className="label text-[11px] bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-2 border-ink dark:border-paper p-6">
            <span className="label text-[10px] text-mute dark:text-void-mute">Standards aligned</span>
            <div className="flex flex-col gap-2.5">
              {app.standardsAligned.map((std) => (
                <span
                  key={std}
                  className="label text-xs pl-3 border-l-[6px]"
                  style={{ borderColor: app.primaryColor }}
                >
                  {std}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ── Interactive demo ─────────────────────────── */}
      <div className="bg-ink text-paper dark:bg-void dark:border-b-2 dark:border-paper px-5 sm:px-8 lg:px-12 py-12 sm:py-14 flex flex-col gap-7">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="label text-[11px]" style={{ color: app.primaryColor }}>
              04 — Try it here
            </span>
            <h2 className="display text-4xl sm:text-5xl leading-[0.9]">Mini demo, no install</h2>
          </div>
          <span className="label text-[10px] text-void-mute sm:text-right max-w-xs leading-relaxed">
            A cut-down build of the real tool, embedded in the page
          </span>
        </div>

        <div className="demo-shell border-2 border-paper">
          <InteractiveAppDemo
            demoType={app.demoType}
            appTitle={app.title}
            primaryColor={app.primaryColor}
          />
        </div>
      </div>

      {/* ── Prev / next ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-ink dark:bg-paper border-b-2 border-ink dark:border-paper">
        <ProjectNavButton app={prevApp} direction="prev" onSelect={onSelectProject} />
        <ProjectNavButton app={nextApp} direction="next" onSelect={onSelectProject} />
      </div>
    </div>
  );
};

const MetaCell: React.FC<{ label: string; value: string; color: string }> = ({
  label,
  value,
  color,
}) => (
  <div className="flex flex-col gap-2 p-5" style={{ backgroundColor: color }}>
    <span className="label text-[10px] opacity-70">{label}</span>
    <span className="display text-[17px] tracking-[-0.01em]">{value}</span>
  </div>
);

const ProjectNavButton: React.FC<{
  app: EducationalApp;
  direction: 'prev' | 'next';
  onSelect: (app: EducationalApp) => void;
}> = ({ app, direction, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(app)}
    className={`group flex items-center gap-7 p-7 sm:p-9 text-ink text-left cursor-pointer ${
      direction === 'prev' ? 'justify-start' : 'justify-between'
    }`}
    style={{ backgroundColor: app.primaryColor }}
  >
    {direction === 'prev' && (
      <ArrowLeft
        size={48}
        strokeWidth={2}
        className="shrink-0 group-hover:-translate-x-1.5 transition-transform"
      />
    )}

    <span className="flex flex-col gap-3">
      <span className="label text-[11px]">
        {direction === 'prev' ? 'Previous project' : 'Next project'}
      </span>
      <span className="display text-2xl sm:text-4xl leading-[0.9]">{app.title}</span>
    </span>

    {direction === 'next' && (
      <ArrowRight
        size={48}
        strokeWidth={2}
        className="shrink-0 group-hover:translate-x-1.5 transition-transform"
      />
    )}
  </button>
);
