# Mug Mockup Studio — Scene & Wrap Editor

A browser-only prototype for your cartographic Etsy mugs. Runs directly from the repository root; **no npm, Vite or Rollup**.

## Start

Open `index.html` in your web browser, or use VS Code Live Server.

To update an existing local clone:

```powershell
cd D:\Python_Stuff\Mug_Mockup_Studio
git pull origin main
```

## Current workflow

1. Choose one of twelve scene presets, inspired by your reference photographs. For photographic scenes, download the companion scene-pack ZIP from the ChatGPT conversation, extract it, then select all twelve JPGs under **Import photorealistic scenes** in the app. The photographic assets are not embedded in the GitHub repository.
2. Upload one or several **original flat wrap-print PNGs**. The editor assumes the left half contains the front face and the right half contains the reverse map.
3. Choose up to three mugs and independently select a print and visible side for each mug.
4. Drag virtual mugs within the scene, adjust size, rotation and artwork coverage.
5. Export a 1400×1400 PNG or save/load JSON layout.
6. Optionally upload a **scene photograph** as the background instead of the illustrated layout.

Your print artwork is sampled directly from the image; it is **not redrawn by AI**.

## Important distinction

The twelve **built-in** scene templates currently use simple illustrated layouts until you import the separately supplied scene photographs. They do **not** yet include the photographic source scenes supplied as visual references or the generated contact sheet. That contact sheet is unsuitable as a printable asset because its labelled tiles are not full-resolution independent scene photographs.

This release demonstrates interaction, street-print selection, one-side-only rendering, and approximate cylindrical artwork warping. It is **not a completed photorealistic mug replacement system**. In particular it lacks:

- calibrated printable surface coordinates for individual photographic mug templates;
- depth/foreground masks to preserve fingers in front of the mug;
- true perspective and lighting matching;
- a bundled set of high-resolution blank-mug lifestyle photographs.

For a production system, each selected photo scene must have an associated mug-surface mapping and hand/foreground masks. Do not use the illustrated outputs as factual product photographs.

## Files

The project remains at the **repository root** (`index.html`, `README.md`). There is no nested duplicate project folder.

Do not commit private original artwork or customer photos to the public repo unless intended.

## Photographic scene-pack note

The downloadable pack is derived by cropping a generated 3×4 contact sheet. It is **low-resolution prototype material**, not independent high-resolution production photography. Scene images are selected by their numbered filenames from `01_` through `12_`. The imported photos contain blank white mugs but are **not calibrated with surface or hand masks**, so the exported result may display duplicate or misaligned mugs. Use the scene pack for evaluating the user interface only, not final Etsy product listings.
