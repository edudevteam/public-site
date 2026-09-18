export type Category =
  | 'All'
  | '3D Design & Fabrication'
  | 'Arcade Games & Maker Hardware'
  | 'Education & Publishing'
  | 'Media & Transcripts'
  | 'Design Tools for Canva'
  | 'Language Learning & AI';

export type DemoType =
  | 'fractions-visualizer'
  | 'periodic-table'
  | 'pendulum-sim'
  | 'code-blocks';

export interface EducationalApp {
  id: string;
  title: string;
  /** Short line for the card; falls back to `description` when omitted. */
  tagline?: string;
  description: string;
  longDescription?: string;
  category: Category;
  audience?: string;
  status?: string;
  releaseYear?: number;
  /** Stack — shown as "Built with". */
  technologies: string[];
  /** What it does — capability / domain tags. */
  tags: string[];
  /** Short label/value pairs for the detail-page header grid (up to four read best). */
  facts?: { label: string; value: string }[];
  keyHighlights?: { title: string; body?: string }[];
  whoItsFor?: string[];
  learningObjectives?: string[];
  /** A paragraph, or a sequence of blocks: a string is a paragraph, an array is a bulleted list. */
  underTheHood?: string | (string | string[])[];
  standardsAligned?: string[];
  /** Omit when there is no in-page mini demo; the section is hidden. */
  demoType?: DemoType;
  primaryColor: string;
  imageUrl: string;
  /** Resolved gallery URLs: the main screenshot first, then src/assets/gallery/<id>/*. */
  gallery: string[];
  repoUrl?: string;
  liveUrl?: string;
}
