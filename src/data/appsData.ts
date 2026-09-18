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

/**
 * Gallery images need no JSON entry: drop files into src/assets/gallery/<app id>/ and
 * they appear on that app's detail page, sorted by filename, after the main screenshot.
 */
const galleryUrls = import.meta.glob('../assets/gallery/*/*.{png,jpg,jpeg,webp,gif,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const galleryByAppId = new Map<string, string[]>();
for (const filePath of Object.keys(galleryUrls).sort()) {
  const appId = filePath.split('/').at(-2)!;
  galleryByAppId.set(appId, [...(galleryByAppId.get(appId) ?? []), galleryUrls[filePath]]);
}

const appIds = new Set(appsJson.apps.map((app) => app.id));
for (const folder of galleryByAppId.keys()) {
  if (!appIds.has(folder)) {
    throw new Error(`src/assets/gallery/${folder}/ does not match any app id in apps.json`);
  }
}

export const CATEGORIES = appsJson.categories as Category[];

export const EDUCATIONAL_APPS: EducationalApp[] = appsJson.apps.map(({ image, ...app }) => {
  const imageUrl = resolveImage(image, app.id);
  return {
    ...app,
    imageUrl,
    gallery: [imageUrl, ...(galleryByAppId.get(app.id) ?? [])],
  };
}) as EducationalApp[];
