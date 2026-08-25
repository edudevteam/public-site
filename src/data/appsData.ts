import { EducationalApp, Category } from '../types';
import appsJson from './apps.json';

/**
 * Content lives in apps.json. Images can't be referenced from JSON directly — Vite needs
 * a static import to hash and bundle them — so the JSON stores a bare filename and we
 * resolve it against everything in assets/images at build time.
 */
const imageUrls = import.meta.glob('../assets/images/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const imagesByFileName = new Map(
  Object.entries(imageUrls).map(([filePath, url]) => [filePath.split('/').pop()!, url]),
);

function resolveImage(fileName: string, appId: string): string {
  const url = imagesByFileName.get(fileName);
  if (!url) {
    throw new Error(
      `apps.json: app "${appId}" references image "${fileName}", which is not in src/assets/images/`,
    );
  }
  return url;
}

export const CATEGORIES = appsJson.categories as Category[];

export const EDUCATIONAL_APPS: EducationalApp[] = appsJson.apps.map(({ image, ...app }) => ({
  ...app,
  imageUrl: resolveImage(image, app.id),
})) as EducationalApp[];
