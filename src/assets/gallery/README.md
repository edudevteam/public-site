# Project galleries

Extra images for a project's detail-page Gallery. Make a folder named after the app's
`id` in `src/data/apps.json` and drop images into it:

```
src/assets/gallery/track-maker/02-print-tab.png
src/assets/gallery/track-maker/03-driving.jpg
```

- The main screenshot (`image` in apps.json) is always shown first.
- Images are ordered by filename, so number them to control the order.
- Accepted: png, jpg, jpeg, webp, gif, avif.
- A folder whose name doesn't match an app id stops the build with an error.
