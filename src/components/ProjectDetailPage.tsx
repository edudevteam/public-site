import React, { useEffect } from 'react';
import { EducationalApp } from '../types';
import { EDUCATIONAL_APPS } from '../data/appsData';
import { InteractiveAppDemo } from './InteractiveAppDemo';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  Cpu, 
  Layers, 
  Sparkles,
  ArrowRight,
  PieChart,
  Atom,
  Activity,
  Code2
} from 'lucide-react';

interface ProjectDetailPageProps {
  app: EducationalApp;
  onBack: () => void;
  onSelectProject: (app: EducationalApp) => void;
}

const getAppIcon = (iconName: string, className = 'w-6 h-6') => {
  switch (iconName) {
    case 'PieChart': return <PieChart className={className} />;
    case 'Atom': return <Atom className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Code2': return <Code2 className={className} />;
    default: return <Sparkles className={className} />;
  }
};

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
  const prevApp = currentIndex > 0 ? EDUCATIONAL_APPS[currentIndex - 1] : EDUCATIONAL_APPS[EDUCATIONAL_APPS.length - 1];
  const nextApp = currentIndex < EDUCATIONAL_APPS.length - 1 ? EDUCATIONAL_APPS[currentIndex + 1] : EDUCATIONAL_APPS[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb / Back Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-2">
          {app.repoUrl && (
            <a
              href={app.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Github size={14} />
              <span className="hidden sm:inline">Source Code</span>
            </a>
          )}

          {app.liveUrl && (
            <a
              href={app.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all"
            >
              <span>Launch Live Tool</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Project Hero Banner */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Color Accent Bar */}
        <div 
          className="h-2 w-full"
          style={{ backgroundColor: app.primaryColor }}
        />

        <div className="p-6 sm:p-10 space-y-6">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span 
              style={{ backgroundColor: `${app.primaryColor}18`, color: app.primaryColor }}
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-800"
            >
              {getAppIcon(app.iconName, 'w-3.5 h-3.5')}
              <span>{app.category}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
              <GraduationCap size={13} />
              <span>Target: {app.audience}</span>
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
              {app.status}
            </span>

            <span className="text-xs text-slate-400 font-mono ml-auto">
              Released {app.releaseYear}
            </span>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {app.title}
            </h1>
            <p className="text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {app.tagline}
            </p>
          </div>

          {/* Project Preview Image */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
            <img
              src={app.imageUrl}
              alt={app.title}
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-96 object-cover object-center"
            />
          </div>

        </div>
      </div>

      {/* Interactive Live Sandbox Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-1">
              <Sparkles size={12} />
              <span>Interactive Demonstration</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Live Software Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Test and interact with the core simulation mechanics directly in your browser.
            </p>
          </div>
        </div>

        {/* Live Simulator Component */}
        <InteractiveAppDemo
          demoType={app.demoType}
          appTitle={app.title}
          primaryColor={app.primaryColor}
        />
      </div>

      {/* Pedagogical Purpose & Research */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Deep Dive Description */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <BookOpen size={18} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Pedagogical Framework & Research
            </h3>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {app.longDescription}
          </p>

          <div className="pt-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Key Instructional Features
            </h4>
            <div className="space-y-2">
              {app.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 
                    size={16} 
                    className="mt-0.5 flex-shrink-0" 
                    style={{ color: app.primaryColor }} 
                  />
                  <span className="leading-snug">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Objectives & Standards Sidebar */}
        <div className="space-y-6">
          
          {/* Learning Objectives */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Learning Objectives
              </h3>
            </div>
            <ul className="space-y-2">
              {app.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-emerald-500">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards Alignment */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Standards Alignment
              </h3>
            </div>
            <div className="space-y-1.5">
              {app.standardsAligned.map((std, i) => (
                <div 
                  key={i} 
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 text-xs font-mono text-slate-700 dark:text-slate-300"
                >
                  {std}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Tech Architecture Stack Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Software Architecture & Performance
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Engineered for high-frequency 60 FPS rendering and zero-install client execution.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {app.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Navigation Footer (Next / Prev) */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Previous Project */}
        <button
          type="button"
          onClick={() => onSelectProject(prevApp)}
          className="group text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer"
        >
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Previous Project
          </span>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {prevApp.title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {prevApp.category} • {prevApp.audience}
          </p>
        </button>

        {/* Next Project */}
        <button
          type="button"
          onClick={() => onSelectProject(nextApp)}
          className="group text-right p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer"
        >
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center justify-end gap-1">
            Next Project
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {nextApp.title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {nextApp.category} • {nextApp.audience}
          </p>
        </button>

      </div>

    </div>
  );
};
