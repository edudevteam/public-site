import React from 'react';
import { AppStatus } from '../types';

interface StatusBadgeProps {
  status: AppStatus;
  className?: string;
}

/**
 * Sits on an app's primaryColor background, so it always uses ink/paper rather than
 * theme colours. Active is filled; Complete is outlined.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => (
  <span
    className={`label inline-flex items-center gap-2 border-2 border-ink ${
      status === 'Active' ? 'bg-ink text-paper' : 'text-ink'
    } ${className}`}
  >
    <span
      aria-hidden
      className={`size-1.5 rounded-full ${status === 'Active' ? 'bg-paper' : 'bg-ink'}`}
    />
    {status}
  </span>
);
