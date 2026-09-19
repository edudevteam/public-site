import { EducationalApp, Category } from '../types';
import appsJson from './apps.json';
import galleries from 'virtual:gallery';

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
 * Gallery images need no JSON entry: drop files into public/apps/<folder>/ and they appear
 * on that app's detail page, sorted by filename, after the main screenshot. <folder> is the
 * app's `galleryFolder` if set, otherwise its `id`.
 */
const galleryFolderOf = (app: { id: string; galleryFolder?: string }) => app.galleryFolder ?? app.id;

const knownFolders = new Set(appsJson.apps.map(galleryFolderOf));
for (const folder of Object.keys(galleries)) {
  if (!knownFolders.has(folder)) {
    throw new Error(
      `public/apps/${folder}/ does not match any app in apps.json (set "galleryFolder" or rename the folder)`,
    );
  }
}

export const CATEGORIES = appsJson.categories as Category[];

export const EDUCATIONAL_APPS: EducationalApp[] = appsJson.apps.map(({ image, ...app }) => {
  const imageUrl = resolveImage(image, app.id);
  return {
    ...app,
    imageUrl,
    gallery: [imageUrl, ...(galleries[galleryFolderOf(app)] ?? [])],
  };
}) as EducationalApp[];
