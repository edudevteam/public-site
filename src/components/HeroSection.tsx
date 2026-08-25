import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  Atom, 
  Code2, 
  Activity, 
  PieChart, 
  X
} from 'lucide-react';
import { CATEGORIES } from '../data/appsData';
import { Category } from '../types';

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
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (e.clientY > rect.bottom + 100) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const moveX = (e.clientX - centerX) / (rect.width / 2);
      const moveY = (e.clientY - centerY) / (rect.height / 2);

      setMouseOffset({
        x: Math.max(-1, Math.min(1, moveX)),
        y: Math.max(-1, Math.min(1, moveY)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16 bg-gradient-to-b from-blue-50/50 via-slate-50 to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200"
    >
      {/* Subtle Parallax Floating Abstract Icons */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          style={{
            transform: `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 10}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="absolute top-10 left-[10%] p-3 rounded-2xl bg-blue-100/60 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-700/30 shadow-xs hidden md:block"
        >
          <PieChart size={24} />
        </div>

        <div
          style={{
            transform: `translate3d(${-mouseOffset.x * 12}px, ${-mouseOffset.y * 14}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="absolute top-12 right-[12%] p-3 rounded-2xl bg-purple-100/60 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-700/30 shadow-xs hidden md:block"
        >
          <Atom size={24} />
        </div>

        <div
          style={{
            transform: `translate3d(${mouseOffset.x * 14}px, ${-mouseOffset.y * 10}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="absolute bottom-12 left-[16%] p-2.5 rounded-xl bg-emerald-100/60 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-700/30 shadow-xs hidden lg:block"
        >
          <Activity size={20} />
        </div>

        <div
          style={{
            transform: `translate3d(${-mouseOffset.x * 12}px, ${mouseOffset.y * 12}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="absolute bottom-14 right-[18%] p-2.5 rounded-xl bg-amber-100/60 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-700/30 shadow-xs hidden lg:block"
        >
          <Code2 size={20} />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Subtitle / Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Sparkles size={13} />
          <span>Interactive Learning Tools & STEM Simulations</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Educational Development Portfolio
        </h1>

        {/* Lead description */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore research-grounded web applications designed by the Educational Development Team to make complex mathematical, scientific, and computational ideas intuitive.
        </p>

        {/* Quick Search & Filter Strip */}
        <div className="pt-2 max-w-xl mx-auto space-y-4">
          
          {/* Search input */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 text-slate-400" size={17} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or standard (e.g., NGSS, fractions)..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Clean Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
