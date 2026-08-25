import React from 'react';
import { Search, X, ArrowDown } from 'lucide-react';
import { CATEGORIES, EDUCATIONAL_APPS } from '../data/appsData';
import { Category } from '../types';

/**
 * Category → swatch colour, derived from the apps themselves so the legend can never
 * drift from the tiles. A category with several apps takes the first one's colour.
 */
const CATEGORY_COLORS = new Map(
  EDUCATIONAL_APPS.map((app) => [app.category, app.primaryColor] as const).reverse(),
);

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  totalAppsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  searchInputRef,
  totalAppsCount,
}) => {
  return (
    <section>
      {/* ── Hero ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-linear-to-br from-[#0ea5e9] dark:from-[#9c27b0] from-50% to-paper dark:to-void to-50% text-ink dark:text-paper border-b-2 border-ink dark:border-paper px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-10 sm:pb-12 flex flex-col gap-8 sm:gap-10">
        {/* Light teal corner block */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute top-0 right-0 w-44 h-36 sm:w-64 sm:h-52 lg:w-88 lg:h-68 drop-shadow-[-3px_4px_3.5px_rgba(16,14,12,0.52)] dark:drop-shadow-[-3px_4px_4.5px_rgba(0,0,0,1)]"
        >
          <polygon points="0,0 100,0 100,100" className="fill-[#ff5ecc]" />
        </svg>

        <span className="relative label text-[10px] sm:text-[11px] opacity-70">
          Portfolio / 2024—2025 / {String(totalAppsCount).padStart(2, '0')} live tools
        </span>

        <h1 className="relative display font-bold text-[2.25rem] sm:text-[4rem] lg:text-[6rem] leading-[1.05] tracking-[0.015em] max-w-[16ch]">
          Interactive
          <br />
          <span className="marker-drift">
            <span className="marker">
              Useful + Fun
              <span className="marker-fill" aria-hidden="true">
                Useful + Fun
              </span>
            </span>
          </span>
        </h1>

        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
          <div className="flex flex-col gap-6 max-w-152">
            <p className="text-base sm:text-lg leading-loose">
              <span className="highlight">
                Marble runs, speed readers, games, and visualisers — small web apps from the
                Educational Development Team. Free to use, nothing to install, no sign-up.
              </span>
            </p>

            <a
              href="#main-content"
              className="self-start inline-flex items-center gap-3.5 bg-ink text-paper dark:bg-paper dark:text-ink px-6 py-4 border-2 border-ink dark:border-paper hover:bg-transparent hover:text-ink dark:hover:bg-transparent dark:hover:text-paper transition-colors"
            >
              <span className="display text-[15px] tracking-normal">Browse the tools</span>
              <ArrowDown size={19} strokeWidth={2.5} />
            </a>
          </div>

          {/* Category legend — the palette doubles as the taxonomy */}
          <div className="hidden lg:flex flex-col min-w-84">
            {CATEGORIES.filter((c) => c !== 'All').map((category, i, arr) => (
              <div
                key={category}
                className={`flex items-center gap-3.5 py-2.5 ${
                  i < arr.length - 1 ? 'border-b border-ink/25 dark:border-paper/25' : ''
                }`}
              >
                <span
                  className="w-4 h-4 border-2 border-ink dark:border-paper"
                  style={{ backgroundColor: CATEGORY_COLORS.get(category) }}
                />
                <span className="label text-[11px]">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter strip ─────────────────────────────── */}
      <div className="border-y-2 border-ink dark:border-paper px-5 sm:px-8 lg:px-12 py-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div className="relative flex items-center border-2 border-ink dark:border-paper bg-white dark:bg-void xl:min-w-100">
          <Search className="absolute left-4 text-ink dark:text-paper" size={17} strokeWidth={2.25} />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic, keyword, or standard"
            className="label w-full pl-12 pr-11 py-3.5 bg-transparent text-[11px] text-ink dark:text-paper placeholder:text-mute dark:placeholder:text-void-mute focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2 p-2 text-ink dark:text-paper hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors cursor-pointer"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`label text-[10px] sm:text-[11px] px-4 py-3 border-2 border-ink dark:border-paper transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-ink text-paper dark:bg-paper dark:text-ink'
                    : 'text-ink dark:text-paper hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
