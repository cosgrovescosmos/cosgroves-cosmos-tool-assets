# Telescope Platform Card Builder

Standalone GitHub Pages version of Cosgrove's Cosmos Telescope Platform Card Builder.

## What Changed

- Runs as a normal static `index.html`, so it can be hosted from GitHub Pages.
- Adds a `Download Print PNG` export that renders the same card layout with a white background, dark text, and dark graphics for printing.
- Adds a camera preset dropdown using the same camera-style fields as the system comparison tools: camera name, mono/OSC type, pixel size, and sensor dimensions.
- Adds a filter family preset dropdown with a custom/manual option.
- Keeps the live card preview dark; print styling is applied only to the export clone.

## GitHub Pages Hosting

1. Create a GitHub repository, for example `telescope-card-builder`.
2. Add `index.html` and this `README.md` to the repository root.
3. In GitHub, open `Settings -> Pages`.
4. Set `Source` to `Deploy from a branch`.
5. Choose the default branch and `/root`.
6. Save. GitHub will provide the public Pages URL.

## Notes

Uploaded hero/logo images and saved rigs are stored locally in the visitor's browser. JSON export/import transfers field values, but not uploaded images.
