# Isometric PEMB Video Build

Interactive **3D pre-engineered metal building (PEMB) erection sequence** for **Stamps Steel Buildings**.

| | |
|--|--|
| **This repo (3D code)** | [SpiderForce-Star/Isometric-PEMB-Video-Build](https://github.com/SpiderForce-Star/Isometric-PEMB-Video-Build) |
| **Marketing website** | [SpiderForce-Star/Stamps-Steel](https://github.com/SpiderForce-Star/Stamps-Steel) |
| **Live erection page** | [erection.html#pemb-3d](https://SpiderForce-Star.github.io/Stamps-Steel/erection.html#pemb-3d) |
| **Live 3D player** | [pemb-3d.html](https://SpiderForce-Star.github.io/Stamps-Steel/pemb-3d.html) |

## Why a separate repo?

3D/animation iteration stays here so it **does not interrupt** static website construction (HTML, SEO, quote form).  
The Stamps Steel **Erection** tab embeds the player via iframe; the website only holds a published copy of the standalone player for GitHub Pages hosting.

```
Isometric-PEMB-Video-Build     →  source of truth (edit 3D here)
        │
        │  copy standalone index.html / embed.html
        ▼
Stamps-Steel/pemb-3d.html      →  published player (GH Pages)
Stamps-Steel/erection.html     →  #pemb-3d iframe + “Open fullscreen”
```

## What it shows

Silent multi-camera isometric-style walkthrough of a **50′ × 100′ × 20′** clear-span gabled metal building:

1. Foundation slab + anchor bolts  
2. Unload / stage with **telehandler**  
3. Raise **columns** (braced-bay-first)  
4. Raise **rafters** + haunch bolt emphasis  
5. Secondary: purlins, girts, bracing  
6. Roll-out **insulation** before sheeting  
7. Wall & roof **sheeting**  
8. **Trim**, gutters, flashings  
9. Overhead doors, walk doors, windows — complete shell  

Aligned with MBMA-informed erection sequencing (educational schematic — not engineering drawings).

## Files

| Path | Purpose |
|------|---------|
| `index.html` / `embed.html` | Standalone Three.js player (CDN three.js) — **copy to Stamps-Steel as `pemb-3d.html` after changes** |
| `src/components/erection/*` | Full React + R3F app (dev / Vercel) |
| `src/lib/stages.ts` | Timeline stages |
| `src/lib/erection-store.ts` | Playhead state |

## Develop (React app)

```bash
npm install
npm run dev      # 0.0.0.0:8080
npm run build
npm run typecheck
```

## Sync player to Stamps Steel website

```bash
# After editing index.html / embed.html in this repo:
cp index.html ../Stamps-Steel/pemb-3d.html
cd ../Stamps-Steel && git add pemb-3d.html && git commit -m "Sync 3D PEMB player" && git push
```

## Optional: GitHub Pages on this repo

If you enable **Settings → Pages → Deploy from branch `main` / root**, this repo can also serve  
`https://SpiderForce-Star.github.io/Isometric-PEMB-Video-Build/` directly.  
Until then, the live embed uses Stamps-Steel Pages (already on).

© 2026 Stamps Steel Buildings · Bethpage, TN
