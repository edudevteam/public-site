import React from 'react';
import { GraduationCap, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          
          {/* Brand Info */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <GraduationCap size={15} />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Educational Development Team
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Open Learning Tools Portfolio</span>
          </div>

          {/* Back to top */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp size={12} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
