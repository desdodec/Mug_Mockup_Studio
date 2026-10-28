# Mug Mockup Studio

An Etsy mug mockup editor for original cartographic street-print artwork.

## Install (Windows PowerShell)

Use Node.js 20.19+ or 22.12+.

```powershell
npm install
npm run dev
```

If Rollup reports `MODULE_NOT_FOUND` for a native binary (often `@rollup/rollup-win32-x64-msvc`), remove the possibly incomplete install and reinstall:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install --include=optional
npm run dev
```

Do not commit `node_modules` or your print ZIP. Import your artwork through the browser.

## What the prototype does

- Import your ZIP and filter for street-named wrap-print PNGs.
- Select up to three mugs and show either the face/front or reverse/map side.
- Choose a scene palette or upload a real scene photograph.
- Drag and scale mug illustrations in a square preview; export a 1400px PNG.
- Save a lightweight configuration file.

Artwork is copied from your PNG rather than AI-redrawn. This is a flat/cylindrical-style illustration editor, **not yet a photorealistic photo-compositing pipeline**. It cannot correctly hide mugs behind fingers or insert a print onto an already photographed curved mug without calibrated masks.

## Run in VS Code

Open the repository folder, then use the terminal commands above. Use `npm run build` to create `dist/`.
