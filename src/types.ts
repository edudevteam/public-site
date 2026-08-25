export type Category = 
  | 'All'
  | 'Mathematics'
  | 'STEM & Science'
  | 'Simulations & Labs'
  | 'Computer Science';

export type DemoType = 
  | 'fractions-visualizer'
  | 'periodic-table'
  | 'pendulum-sim'
  | 'code-blocks';

export interface EducationalApp {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: Category;
  audience: string;
  status: string;
  releaseYear: number;
  iconName: string;
  technologies: string[];
  keyHighlights: string[];
  learningObjectives: string[];
  standardsAligned: string[];
  demoType: DemoType;
  primaryColor: string;
  imageUrl: string;
  repoUrl?: string;
  liveUrl?: string;
}
