# Mug Mockup Studio

A standalone browser-based editor for creating illustrative Etsy mockups using your original cartographic mug artwork.

## Start (no npm required)

1. Clone or pull the repository in VS Code.
2. Open `index.html` in a web browser. You can also use the VS Code **Live Server** extension.
3. Import your ZIP containing files named `*_wrap_print.png`.

The app loads JSZip from a public CDN, so **internet access is required** when opening it. Artwork is processed locally in your browser and is not uploaded to a server.

### Windows PowerShell

```powershell
git clone https://github.com/desdodec/Mug_Mockup_Studio.git
cd Mug_Mockup_Studio
```

Then open `index.html` in your browser. **You do not need `npm install` or `npm run dev`**, so the earlier native Rollup module error does not apply to this version.

If you already cloned the repository, run:

```powershell
git pull origin main
```

## Current features

- Import street print PNGs from a ZIP and filter out bridges and entries without a recognised street suffix.
- Select up to three different designs and independently choose front (face) or back (map) print sides.
- Preview each side using the actual original image, rather than AI-redrawn artwork.
- Move and resize illustrated mugs in a square 1400px workspace.
- Choose backdrop palettes, upload a background photograph, and store a people demographic as a creative brief.
- Export a 1400×1400 PNG, and save/load configuration JSON.

## Limitations

This is a working **illustration-based MVP**, not a photorealistic replacement for mug photography. Mug shapes and artwork projection are approximations; hand occlusion and real photographed mug surface mapping are **not implemented**. The people choice is metadata and does not generate people. Re-import the ZIP after a page reload; image assets are not persisted. The artwork assumes each print's left half is the front and right half is the back.

Never put your private print ZIP into the public repository unless you intend to share those files.

## Development roadmap

- Use calibrated photographed mug templates and actual surface masks.
- Preserve exact front/back crop boundaries and source artwork.
- Make people/scene generation independent from the print compositing.
- Add hand/foreground masking and verified export quality.
