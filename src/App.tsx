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
        const searchable = [
          app.title,
          app.tagline ?? '',
          app.description,
          ...app.technologies,
          ...app.tags,
          ...(app.standardsAligned ?? []),
          ...(app.learningObjectives ?? []),
        ];

        if (!searchable.some((s) => s.toLowerCase().includes(q))) {
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
    <div className="min-h-screen flex flex-col bg-paper dark:bg-void text-ink dark:text-paper">
      
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

          {/* Main Portfolio Grid — each project block sits on its own */}
          <main id="main-content" className="flex-1 w-full scroll-mt-[78px]">

            {filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 px-5 sm:px-8 lg:px-12 py-8 sm:py-10 border-b-2 border-ink dark:border-paper">
                {filteredApps.map((app, i) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    index={i + 1}
                    onOpenDetails={handleOpenProjectPage}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search State */
              <div className="border-b-2 border-ink dark:border-paper px-5 sm:px-8 lg:px-12 py-20 flex flex-col items-center gap-6 text-center">
                <SearchX size={40} strokeWidth={2} />
                <h3 className="display text-3xl sm:text-4xl leading-[0.9]">Nothing matches</h3>
                <p className="text-sm sm:text-base max-w-md leading-relaxed text-mute dark:text-void-mute">
                  No tools match &ldquo;{searchQuery}&rdquo; in this category.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-3 bg-ink text-paper dark:bg-paper dark:text-ink border-2 border-ink dark:border-paper px-6 py-4 hover:bg-paper hover:text-ink dark:hover:bg-void dark:hover:text-paper transition-colors cursor-pointer"
                >
                  <RotateCcw size={16} strokeWidth={2.5} />
                  <span className="display text-[13px] tracking-normal">Reset filters</span>
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
