# Isometric PEMB Video Build

Interactive **3D pre-engineered metal building (PEMB) erection sequence** for **Stamps Steel Buildings**.

**Repo:** [SpiderForce-Star/Isometric-PEMB-Video-Build](https://github.com/SpiderForce-Star/Isometric-PEMB-Video-Build)  
**Website (host page):** [Stamps Steel · Erection](https://SpiderForce-Star.github.io/Stamps-Steel/erection.html)

This project is intentionally **separate** from the static Stamps Steel marketing site so 3D/animation work can iterate without blocking HTML page edits.

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

## Stack

- React 19 + TypeScript + Vite  
- TanStack Start / Router  
- Three.js + React Three Fiber + Drei  
- Tailwind CSS v4  
- Zustand (timeline state)

## Embed on Stamps Steel

On the erection page, use an iframe pointing at this app with `?embed=1`:

```html
<iframe
  src="https://YOUR-DEPLOY-URL/?embed=1"
  title="Stamps Steel 3D metal building erection sequence"
  class="w-full rounded-2xl border border-slate-700"
  style="min-height: 560px; height: 70vh;"
  allow="fullscreen"
  loading="lazy"
></iframe>
```

`?embed=1` tightens chrome for in-page embedding.

## Develop

```bash
npm install
npm run dev      # 0.0.0.0:8080
npm run build
npm run typecheck
```

## Deploy

- Prefer **Vercel** (TanStack Start + Nitro preset in `vite.config.ts`).
- Or any Node host running the Vite/Nitro build output.
- After deploy, paste the production URL into `Stamps-Steel/erection.html` iframe `src`.

## Connection map

| Piece | Location |
|-------|----------|
| 3D viewer source | this repo |
| Marketing / SEO / quote form | `SpiderForce-Star/Stamps-Steel` → `erection.html` |
| Embed | iframe + “Open 3D viewer” link on Erection page |

© 2026 Stamps Steel Buildings · Bethpage, TN
