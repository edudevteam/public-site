/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { EducationalApp, Category } from './types';
import { EDUCATIONAL_APPS } from './data/appsData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AppCard } from './components/AppCard';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { Footer } from './components/Footer';
import { SearchX, RotateCcw } from 'lucide-react';

export default function App() {
  // Theme state: default to light mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('edt_theme');
      if (saved) return saved === 'dark';
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('edt_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('edt_theme', 'light');
      }
    } catch (e) {
      console.warn(e);
    }
  }, [darkMode]);

  // Page view routing state: 'portfolio' or 'project-detail'
  const [selectedApp, setSelectedApp] = useState<EducationalApp | null>(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const matched = EDUCATIONAL_APPS.find(
          (a) => a.id === hash || a.title.toLowerCase().replace(/\s+/g, '-') === hash
        );
        if (matched) return matched;
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Sync hash on popstate / hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setSelectedApp(null);
      } else {
        const matched = EDUCATIONAL_APPS.find(
          (a) => a.id === hash || a.title.toLowerCase().replace(/\s+/g, '-') === hash
        );
        if (matched) {
          setSelectedApp(matched);
        } else {
          setSelectedApp(null);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  // Search input ref for quick keyboard shortcuts
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const focusSearch = () => {
    if (selectedApp) {
      // Navigate back to catalog first, then focus
      setSelectedApp(null);
      window.location.hash = '';
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Global Keyboard shortcuts: '/' or 'Cmd+K' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        focusSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedApp]);

  // Navigate to Project Detail Page
  const handleOpenProjectPage = (app: EducationalApp) => {
    setSelectedApp(app);
    window.location.hash = app.id;
  };

  // Navigate Back to Portfolio Catalog
  const handleBackToPortfolio = () => {
    setSelectedApp(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Apps
  const filteredApps = useMemo(() => {
    return EDUCATIONAL_APPS.filter((app) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = app.title.toLowerCase().includes(q);
        const matchesTagline = app.tagline.toLowerCase().includes(q);
        const matchesDesc = app.description.toLowerCase().includes(q);
        const matchesTech = app.technologies.some((t) => t.toLowerCase().includes(q));
        const matchesStandards = app.standardsAligned.some((s) => s.toLowerCase().includes(q));
        const matchesObjectives = app.learningObjectives.some((o) => o.toLowerCase().includes(q));

        if (!matchesTitle && !matchesTagline && !matchesDesc && !matchesTech && !matchesStandards && !matchesObjectives) {
          return false;
        }
      }

      if (selectedCategory !== 'All' && app.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onFocusSearch={focusSearch}
        onNavigateHome={handleBackToPortfolio}
      />

      {/* Main Content: Either Project Detail Page OR Portfolio Catalog */}
      {selectedApp ? (
        <main id="main-content" className="flex-1 w-full">
          <ProjectDetailPage
            app={selectedApp}
            onBack={handleBackToPortfolio}
            onSelectProject={handleOpenProjectPage}
          />
        </main>
      ) : (
        <>
          {/* Hero Section with Search & Category Filter */}
          <HeroSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchInputRef={searchInputRef}
            totalAppsCount={EDUCATIONAL_APPS.length}
          />

          {/* Main Portfolio Grid */}
          <main id="main-content" className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
            
            {filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {filteredApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onOpenDetails={handleOpenProjectPage}
                    onOpenDemo={handleOpenProjectPage}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search State */
              <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 max-w-md mx-auto space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
                  <SearchX size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No matching applications found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We couldn&apos;t find any tools matching &ldquo;{searchQuery}&rdquo; in this category.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset filter</span>
                </button>
              </div>
            )}

          </main>
        </>
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}
