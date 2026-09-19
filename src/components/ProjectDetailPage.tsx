import React, { useEffect } from 'react';
import { EducationalApp } from '../types';
import { EDUCATIONAL_APPS } from '../data/appsData';
import { InteractiveAppDemo } from './InteractiveAppDemo';
import { ImageGallery } from './ImageGallery';
import { StatusBadge } from './StatusBadge';
import { ArrowLeft, ArrowRight, ExternalLink, Code } from 'lucide-react';

/**
 * Centred content column. Section backgrounds and borders stay full-bleed; only
 * what sits inside this wrapper is constrained.
 */
const INNER = 'mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12';

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
    // Instant, not smooth: a new page shouldn't animate in from the old scroll position.
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app.id]);

  // Find next and previous projects for quick navigation
  const currentIndex = EDUCATIONAL_APPS.findIndex((a) => a.id === app.id);
  const prevApp =
    currentIndex > 0 ? EDUCATIONAL_APPS[currentIndex - 1] : EDUCATIONAL_APPS[EDUCATIONAL_APPS.length - 1];
  const nextApp =
    currentIndex < EDUCATIONAL_APPS.length - 1 ? EDUCATIONAL_APPS[currentIndex + 1] : EDUCATIONAL_APPS[0];

  const projectNumber = String(currentIndex + 1).padStart(2, '0');

  const keyHighlights = app.keyHighlights ?? [];
  const standardsAligned = app.standardsAligned ?? [];

  // Explicit facts win; otherwise fall back to whichever catalogue fields are set.
  const metaCells = app.facts ?? [
    { label: 'Audience', value: app.audience },
    { label: 'Released', value: app.releaseYear?.toString() },
    { label: 'Standards', value: standardsAligned.length ? `${standardsAligned.length} aligned` : undefined },
  ].filter((cell): cell is { label: string; value: string } => Boolean(cell.value));

  // Section numbers stay sequential when optional sections are hidden.
  let sectionCount = 0;
  const sectionLabel = (name: string) => `${String(++sectionCount).padStart(2, '0')} — ${name}`;

  return (
    <div>
      {/* ── Back bar ─────────────────────────────────── */}
      <div className="border-b-2 border-ink dark:border-paper">
        <div className={`${INNER} py-4`}>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-3 label text-[11px] hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink px-3 py-2 -ml-3 transition-colors cursor-pointer"
          >
            <ArrowLeft size={17} strokeWidth={2.5} />
            <span>All work</span>
          </button>
        </div>
      </div>

      {/* ── Colour header ────────────────────────────── */}
      <div
        className="border-b-2 border-ink dark:border-paper text-ink"
        style={{ backgroundColor: app.primaryColor }}
      >
        <div className={`${INNER} py-10 sm:py-12 flex flex-col gap-9`}>
          <div className="flex items-start justify-between gap-6">
            <span className="display text-[3.5rem] sm:text-[4.5rem] leading-[0.8] tracking-[-0.05em]">
              {projectNumber}
            </span>
            <div className="flex flex-wrap justify-end gap-2">
              <StatusBadge status={app.status} className="text-[10px] sm:text-[11px] px-4 py-2.5" />
              <span className="label text-[10px] sm:text-[11px] border-2 border-ink px-4 py-2.5">
                {app.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="display text-[2.5rem] sm:text-[4rem] lg:text-[6.5rem] leading-[0.95] tracking-[-0.045em]">
              {/* Highlighter block behind the title — box-decoration-clone so every
                  wrapped line keeps its own padded box. */}
              <span className="box-decoration-clone bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 -ml-3">
                {app.title}
              </span>
            </h1>
            {app.tagline && (
              <p className="text-lg sm:text-[22px] font-medium leading-snug max-w-4xl">{app.tagline}</p>
            )}
          </div>

          {/* Meta grid */}
          {metaCells.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[2px] bg-ink border-2 border-ink">
              {metaCells.map((cell) => (
                <MetaCell key={cell.label} label={cell.label} value={cell.value} color={app.primaryColor} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Framed screenshot ────────────────────────── */}
      <div className="border-b-2 border-ink dark:border-paper">
        <div className={`${INNER} py-5 sm:py-8 lg:py-12`}>
          <img
            src={app.imageUrl}
            alt={`${app.title} interface`}
            referrerPolicy="no-referrer"
            className="w-full h-64 sm:h-96 lg:h-125 object-cover object-top border-2 border-ink dark:border-paper"
          />
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="border-b-2 border-ink dark:border-paper">
        <div
          className={`${INNER} py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_25rem] gap-12 lg:gap-18`}
        >
          <div className="flex flex-col gap-14">
            {/* Overview */}
            <section className="flex flex-col gap-5">
              <span className="label text-[11px] text-mute dark:text-void-mute">{sectionLabel('Overview')}</span>
              <p className="text-xl sm:text-2xl font-medium leading-snug">{app.description}</p>
              {app.longDescription && (
                <p className="text-base sm:text-[17px] leading-relaxed text-mute dark:text-void-mute max-w-3xl">
                  {app.longDescription}
                </p>
              )}
            </section>

            {/* Key highlights */}
            <section className="flex flex-col">
              <span className="label text-[11px] text-mute dark:text-void-mute pb-5">
                {sectionLabel('What you can do with it')}
              </span>
              {keyHighlights.map((highlight, i) => (
                <div
                  key={i}
                  className={`flex items-baseline gap-6 border-t-2 border-ink dark:border-paper py-5 ${
                    i === keyHighlights.length - 1 ? 'border-b-2' : ''
                  }`}
                >
                  <span
                    className="display text-[22px] tracking-[-0.02em]"
                    style={{ color: app.primaryColor }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex flex-col gap-2">
                    <span className="text-lg sm:text-xl font-medium leading-snug">{highlight.title}</span>
                    {highlight.body && (
                      <span className="text-base sm:text-[17px] leading-relaxed text-mute dark:text-void-mute max-w-3xl">
                        {highlight.body}
                      </span>
                    )}
                  </span>
                </div>
              ))}
              {app.tags.length > 0 && (
                <div className={`flex flex-wrap gap-2 ${keyHighlights.length ? 'pt-6' : ''}`}>
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className="label text-[11px] border-2 px-3 py-2"
                      style={{ borderColor: app.primaryColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {app.whoItsFor && app.whoItsFor.length > 0 && (
              <BulletSection
                label={sectionLabel("Who it's for")}
                items={app.whoItsFor}
                color={app.primaryColor}
              />
            )}

            {app.learningObjectives && app.learningObjectives.length > 0 && (
              <BulletSection
                label={sectionLabel('Learning objectives')}
                items={app.learningObjectives}
                color={app.primaryColor}
              />
            )}

            {app.underTheHood && (
              <section className="flex flex-col gap-5">
                <span className="label text-[11px] text-mute dark:text-void-mute">
                  {sectionLabel('Under the hood')}
                </span>
                {(typeof app.underTheHood === 'string' ? [app.underTheHood] : app.underTheHood).map((block, i) =>
                  typeof block === 'string' ? (
                    <p key={i} className="text-base sm:text-[17px] leading-relaxed max-w-3xl">
                      {block}
                    </p>
                  ) : (
                    <ul key={i} className="flex flex-col gap-2 max-w-3xl">
                      {block.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-base sm:text-[17px] leading-relaxed">
                          <span
                            className="w-2 h-2 mt-2.5 shrink-0 border-2 border-ink dark:border-paper"
                            style={{ backgroundColor: app.primaryColor }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5">
            <ImageGallery images={app.gallery} title={app.title} color={app.primaryColor} />

            <div className="flex flex-col gap-4 border-2 border-ink dark:border-paper p-6">
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

            {(app.liveUrl || app.repoUrl) && (
              <div className="flex flex-col gap-4 border-2 border-ink dark:border-paper p-6">
                <span className="label text-[10px] text-mute dark:text-void-mute">Links</span>
                <div className="flex flex-col gap-2">
                  {app.liveUrl && (
                    <SidebarLink href={app.liveUrl} label="Website" icon={<ExternalLink size={16} strokeWidth={2.5} />} />
                  )}
                  {app.repoUrl && (
                    <SidebarLink href={app.repoUrl} label="GitHub" icon={<Code size={16} strokeWidth={2.5} />} />
                  )}
                </div>
              </div>
            )}

            {standardsAligned.length > 0 && (
            <div className="flex flex-col gap-4 border-2 border-ink dark:border-paper p-6">
              <span className="label text-[10px] text-mute dark:text-void-mute">Standards aligned</span>
              <div className="flex flex-col gap-2.5">
                {standardsAligned.map((std) => (
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
            )}
          </aside>
        </div>
      </div>

      {/* ── Interactive demo ─────────────────────────── */}
      {app.demoType && (
      <div className="bg-ink text-paper dark:bg-void dark:border-b-2 dark:border-paper">
        <div className={`${INNER} py-12 sm:py-14 flex flex-col gap-7`}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="label text-[11px]" style={{ color: app.primaryColor }}>
                {sectionLabel('Try it here')}
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
      </div>
      )}

      {/* ── Prev / next ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-ink dark:bg-paper border-b-2 border-ink dark:border-paper">
        <ProjectNavButton app={prevApp} direction="prev" onSelect={onSelectProject} />
        <ProjectNavButton app={nextApp} direction="next" onSelect={onSelectProject} />
      </div>
    </div>
  );
};

/** Link row for the sidebar Links box: label, bare URL, and an icon. */
const SidebarLink: React.FC<{ href: string; label: string; icon: React.ReactNode }> = ({
  href,
  label,
  icon,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-between gap-4 bg-ink text-paper dark:bg-paper dark:text-ink border-2 border-ink dark:border-paper px-3 py-2.5 hover:bg-transparent hover:text-ink dark:hover:bg-transparent dark:hover:text-paper transition-colors"
  >
    <span className="flex flex-col gap-1 min-w-0">
      <span className="label text-[11px]">{label}</span>
      <span className="text-xs opacity-70 truncate">{href.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
    </span>
    <span className="shrink-0">{icon}</span>
  </a>
);

const BulletSection: React.FC<{ label: string; items: string[]; color: string }> = ({
  label,
  items,
  color,
}) => (
  <section className="flex flex-col">
    <span className="label text-[11px] text-mute dark:text-void-mute pb-5">{label}</span>
    {items.map((item, i) => (
      <div
        key={i}
        className={`flex items-start gap-4.5 border-t border-hairline dark:border-void-line py-4 ${
          i === items.length - 1 ? 'border-b' : ''
        }`}
      >
        <span
          className="w-3 h-3 border-2 border-ink dark:border-paper mt-2 shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-base sm:text-[17px] leading-relaxed">{item}</span>
      </div>
    ))}
  </section>
);

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
    className="group block w-full py-7 sm:py-9 text-ink text-left cursor-pointer"
    style={{ backgroundColor: app.primaryColor }}
  >
    {/* Half of the 1440px column, hugged to the inner edge so the labels line
        up with the rest of the page content. */}
    <span
      className={`flex items-center gap-7 w-full max-w-[720px] px-7 sm:px-9 ${
        direction === 'prev' ? 'ml-auto justify-start' : 'mr-auto justify-between'
      }`}
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
    </span>
  </button>
);
