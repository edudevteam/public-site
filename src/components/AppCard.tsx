import React from 'react';
import { EducationalApp } from '../types';
import { 
  PieChart, 
  Atom, 
  Activity, 
  Code2, 
  Sparkles,
  ExternalLink,
  Play,
  CheckCircle2,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

interface AppCardProps {
  app: EducationalApp;
  onOpenDetails: (app: EducationalApp) => void;
  onOpenDemo: (app: EducationalApp) => void;
}

const getAppIcon = (iconName: string, className = 'w-5 h-5') => {
  switch (iconName) {
    case 'PieChart': return <PieChart className={className} />;
    case 'Atom': return <Atom className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Code2': return <Code2 className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onOpenDetails,
  onOpenDemo,
}) => {
  return (
    <div 
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => onOpenDetails(app)}
    >
      
      {/* Top Accent Line */}
      <div 
        className="h-1.5 w-full transition-all duration-300"
        style={{ backgroundColor: app.primaryColor }}
      />

      {/* Card Image Thumbnail */}
      <div className="relative w-full h-48 sm:h-56 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={app.imageUrl}
          alt={`${app.title} preview`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Floating Category & Audience Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <span 
            style={{ backgroundColor: `${app.primaryColor}E6` }}
            className="px-2.5 py-1 rounded-lg text-white text-[11px] font-bold shadow-xs backdrop-blur-xs flex items-center gap-1.5"
          >
            {getAppIcon(app.iconName, 'w-3.5 h-3.5')}
            <span>{app.category}</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-slate-950/75 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1 shadow-xs border border-white/10">
            <GraduationCap size={12} />
            <span>{app.audience}</span>
          </span>
        </div>

        {/* Hover Quick Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/40 backdrop-blur-[2px] transition-all duration-300">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <span>View Project Details</span>
            <ArrowRight size={13} className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
        
        {/* Content Details */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {app.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1 leading-snug">
              {app.tagline}
            </p>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {app.description}
          </p>

          {/* Key Pedagogical Highlights */}
          <div className="pt-2 space-y-1.5 border-t border-slate-100 dark:border-slate-800/80">
            {app.keyHighlights.slice(0, 2).map((highlight, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 
                  size={13} 
                  className="mt-0.5 flex-shrink-0" 
                  style={{ color: app.primaryColor }} 
                />
                <span className="leading-tight">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Area: Technologies & Actions */}
        <div className="space-y-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5">
            {app.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onOpenDetails(app)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Play size={12} className="fill-current" />
              <span>Explore Project</span>
            </button>

            {app.liveUrl && (
              <a
                href={app.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Launch Live Application"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
