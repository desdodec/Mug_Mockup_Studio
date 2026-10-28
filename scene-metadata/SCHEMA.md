# Calibrated scene contract (version 1)

Production scenes require an independently sourced high-resolution photograph and calibrated per-mug masks. No placeholder photographs are bundled.

Store each photograph under public/scenes/<scene-id>/photo.jpg, with same-sized grayscale PNG masks. White in surface masks indicates printable ceramic; white in occlusion masks indicates foreground that must remain untouched. Both masks must be manually verified. The scene JSON has `version`, `width`, `height`, and `mugs` (1–3). Each mug requires `id`, `quad` (four points in TL/TR/BR/BL order), `surfaceMask`, `occlusionMask`, and optional `arc` and `shading`. The quad is the *printable* patch, not the whole mug including its handle.

The current renderer is an approximation for front-facing, near-upright mugs. Oblique mugs, tapered silhouettes and hand-held scenes require further per-pixel inverse mapping and photographic QA. Do not mark exports as verified merely because a mask exists.
