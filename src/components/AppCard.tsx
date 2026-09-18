import React from 'react';
import { EducationalApp } from '../types';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface AppCardProps {
  app: EducationalApp;
  index: number;
  onOpenDetails: (app: EducationalApp) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, index, onOpenDetails }) => {
  return (
    <div
      className="group flex flex-col gap-6 sm:gap-7 p-6 sm:p-9 cursor-pointer text-ink border-2 border-ink"
      style={{ backgroundColor: app.primaryColor }}
      onClick={() => onOpenDetails(app)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetails(app);
        }
      }}
    >
      {/* Index & meta */}
      <div className="flex items-start justify-between gap-5">
        <span className="display text-[3.5rem] sm:text-[4rem] leading-[0.8] tracking-[-0.05em]">
          {String(index).padStart(2, '0')}
        </span>
        <div className="flex flex-col items-end gap-1.5 pt-1.5 text-right">
          <span className="label text-[10px] sm:text-[11px]">{app.category}</span>
          {(app.audience || app.releaseYear) && (
            <span className="label text-[9px] sm:text-[10px] opacity-70">
              {[app.audience, app.releaseYear].filter(Boolean).join(' / ')}
            </span>
          )}
        </div>
      </div>

      {/* Framed preview */}
      <img
        src={app.imageUrl}
        alt={`${app.title} preview`}
        referrerPolicy="no-referrer"
        loading="lazy"
        className="w-full h-44 sm:h-54 object-cover object-top border-2 border-ink"
      />

      <div className="flex flex-col gap-3">
        <h3 className="display text-[1.75rem] sm:text-[2.375rem] leading-[0.92]">{app.title}</h3>
        <p className="text-sm sm:text-[15px] leading-snug max-w-[92%]">{app.tagline ?? app.description}</p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {app.technologies.map((tech) => (
          <span key={tech} className="label text-[9px] sm:text-[10px] border-2 border-ink px-2.5 py-1.5">
            {tech}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-stretch gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => onOpenDetails(app)}
          className="flex-1 flex items-center justify-between gap-4 bg-ink text-paper border-2 border-ink px-5 py-4 group-hover:bg-transparent group-hover:text-ink transition-colors cursor-pointer"
        >
          <span className="display text-[13px] sm:text-sm tracking-normal">Explore project</span>
          <ArrowRight size={19} strokeWidth={2.5} />
        </button>

        {app.liveUrl && (
          <a
            href={app.liveUrl}
            target="_blank"
            rel="noreferrer"
            title="Launch live application"
            aria-label={`Launch ${app.title}`}
            className="flex items-center justify-center w-14 border-2 border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            <ExternalLink size={17} strokeWidth={2.25} />
          </a>
        )}
      </div>
    </div>
  );
};
