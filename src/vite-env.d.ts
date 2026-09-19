/// <reference types="vite/client" />

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module 'virtual:gallery' {
  /** public/apps/<folder>/ → image URLs, sorted by filename. See galleryPlugin.ts. */
  const galleries: Record<string, string[]>;
  export default galleries;
}
