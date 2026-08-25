import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink text-paper dark:bg-void dark:border-t-2 dark:border-paper">
      <div className="px-5 sm:px-8 lg:px-12 pt-12 sm:pt-14 pb-8 flex flex-col gap-9">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <span className="display text-[2.25rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[0.85] tracking-[-0.045em] font-stretch-112%">
            Educational
            <br />
            Development
            <br />
            Team
          </span>

          <div className="flex gap-12 sm:gap-18 lg:pt-2">
            <div className="flex flex-col gap-3">
              <span className="label text-[10px] text-void-mute">Site</span>
              <span className="label text-xs">Open learning tools</span>
              <span className="label text-xs">Free for classrooms</span>
            </div>

            <div className="flex flex-col gap-3">
              <span className="label text-[10px] text-void-mute">Elsewhere</span>
              <a
                href="https://github.com/educational-development-team"
                target="_blank"
                rel="noreferrer"
                className="label text-xs hover:text-void-mute transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-paper pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="label text-[10px] text-void-mute">
            © {new Date().getFullYear()} Educational Development Team
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2.5 label text-[10px] hover:bg-paper hover:text-ink px-3 py-2 -mr-3 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </footer>
  );
};
