# Mug Mockup Studio

Browser-based compositor for **finished photographs of printed mugs**, intended for Etsy lifestyle compositions.

## Run

Clone or pull the repository in VS Code, then open the root `index.html` in your browser (or with Live Server).

```powershell
git pull origin main
```

No `npm install` and no Rollup/Vite required.

## Workflow

1. Upload **one or several actual mug mockup images** (PNG, JPG or WebP), preferably against clean white backgrounds. These should already display the correctly printed cartographic design.
2. Upload a **scene photograph** (for example, a kitchen, living room, outdoor table or staged scene containing people). The three preset backgrounds are only colour gradients.
3. Select a mug from the library and **add it to the scene**, up to three at once. You can use a different photograph for each mug.
4. Drag to position; adjust size, rotation, background-removal tolerance and shadow strength.
5. Export the **1400 × 1400 PNG**, or save/load a JSON layout.

## How background removal works

The editor removes only near-white pixels connected to the edges of the original mug photograph. This generally preserves the mug's white ceramic body, since it is separated from the background by darker edge pixels. Some white-on-white images lack enough contrast and may need an externally prepared transparent PNG. Adjust **White-background tolerance** while watching the preview.

This processing **does not recreate any print design**: the original printed mug photo supplies the pixels.

## Important limitations

- This version does **not** generate people or rooms from the dropdown: upload a suitable lifestyle scene image. The demographic selector only records an intent in the layout JSON.
- It does not automatically place fingers in front of a cut-out mug. For a convincingly held mug, source imagery needs either a hand/foreground mask or specialist editing.
- It does not infer 3D lighting, cast realistic contact shadows or match photographic perspective. It adds a simple configurable shadow.
- Background scene photographs are not stored in the JSON file. Re-upload the scene and mug photographs when reopening the project.
- Inspect cut-out edges, handle holes and artwork before using the export in a live product listing.

## Project layout

All current application code is in the **repository root** `index.html`. There is intentionally no nested `Mug_Mockup_Studio` directory.

Please do not commit your private product photos to this public repository unless you intend to publish them.
