import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

const VIRTUAL_ID = 'virtual:gallery';
const RESOLVED_ID = '\0' + VIRTUAL_ID;
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

/**
 * Files in public/ are served as-is, so Vite can't glob them. This plugin reads
 * public/apps/<folder>/ at build time and exposes the image URLs as
 * `virtual:gallery` — a map of folder name → URLs, sorted by filename. In dev it
 * watches the folder so adding or removing an image reloads the page.
 */
export function galleryPlugin(): Plugin {
  let appsDir = '';

  const readGalleries = (): Record<string, string[]> => {
    if (!fs.existsSync(appsDir)) return {};
    const galleries: Record<string, string[]> = {};
    for (const entry of fs.readdirSync(appsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const files = fs
        .readdirSync(path.join(appsDir, entry.name))
        .filter((file) => IMAGE_EXT.test(file))
        .sort();
      if (files.length) {
        galleries[entry.name] = files.map(
          (file) => `/apps/${encodeURIComponent(entry.name)}/${encodeURIComponent(file)}`,
        );
      }
    }
    return galleries;
  };

  return {
    name: 'edt-gallery',
    configResolved(config) {
      appsDir = path.join(config.publicDir, 'apps');
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      return id === RESOLVED_ID ? `export default ${JSON.stringify(readGalleries())};` : undefined;
    },
    configureServer(server) {
      server.watcher.add(appsDir);
      const refresh = (file: string) => {
        if (!file.startsWith(appsDir)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh);
      server.watcher.on('unlink', refresh);
      server.watcher.on('addDir', refresh);
      server.watcher.on('unlinkDir', refresh);
    },
  };
}
