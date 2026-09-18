import React from 'react';
import { Sun, Moon, Search } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onFocusSearch: () => void;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onFocusSearch,
  onNavigateHome,
}) => {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-paper label focus:text-[11px]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full bg-paper dark:bg-void border-b-2 border-ink dark:border-paper">
        <div className="h-[78px] px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Wordmark */}
          <div
            onClick={onNavigateHome}
            className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 cursor-pointer select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigateHome?.();
              }
            }}
          >
            <span className="display text-[30px] leading-none md:leading-normal tracking-[-0.03em] font-stretch-118%">EDT</span>
            <span className="label text-[9px] md:text-[10px] text-mute dark:text-void-mute">
              Educational Development Team
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onFocusSearch}
              aria-label="Search apps"
              className="hidden sm:flex items-center gap-2.5 border-2 border-ink dark:border-paper px-4 h-11 text-ink dark:text-paper hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors cursor-pointer"
            >
              <Search size={15} strokeWidth={2.25} />
              <span className="label text-[10px]">Search</span>
              <span className="label text-[10px] opacity-60">/</span>
            </button>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="flex items-center justify-center w-11 h-11 border-2 border-ink dark:border-paper text-ink dark:text-paper hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors cursor-pointer"
            >
              {darkMode ? <Sun size={18} strokeWidth={2.25} /> : <Moon size={18} strokeWidth={2.25} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
