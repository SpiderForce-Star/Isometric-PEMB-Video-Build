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
| `index.html` / `embed.html` / `public/standalone-pemb.html` | Standalone Three.js player — **copy to Stamps-Steel as `pemb-3d.html` after changes** |
| `src/components/erection/*` | Full React + R3F app (dev / Vercel) |
| `src/lib/stages.ts` | Timeline stages |
| `src/lib/erection-store.ts` | Playhead state |
| `vercel.json` | Vercel build + default env (`VITE_AUTH_ENABLED=false`) |

## Develop (React app)

```bash
npm install
npm run dev      # 0.0.0.0:8080
npm run build
npm run typecheck
```

## Deploy (Vercel)

Prefer **Vercel** (TanStack Start + Nitro preset in `vite.config.ts`).

### 1. Default env (already in `vercel.json`)

This is a **public embed** — no accounts. Defaults are checked in:

| Variable | Value | Why |
|----------|-------|-----|
| `VITE_AUTH_ENABLED` | `false` | Public 3D demo; no sign-in UI |

`vercel.json` sets this for **build** and **runtime** so production builds bake the flag correctly.

### 2. Optional env (Vercel → Project → Settings → Environment Variables)

Add these only if you enable Neon / federated auth later. Apply to **Production**, **Preview**, and **Development** as needed.

| Variable | Required? | Scope | Purpose |
|----------|-----------|-------|---------|
| `VITE_AUTH_ENABLED` | Recommended | Build + Runtime | `"false"` for public embed; omit or `"true"` when wiring accounts |
| `DATABASE_URL` | Optional | Runtime (+ build migrates) | Neon Postgres connection string; omit → no migrate, PGLite only in preview |
| `BETTER_AUTH_URL` | If auth on | Runtime | Public app origin, e.g. `https://your-app.vercel.app` |
| `BETTER_AUTH_SECRET` | If auth on | Runtime | Long random secret (`openssl rand -hex 32`) |
| `GROK_AUTH_ISSUER` | If auth on | Runtime | Defaults to `https://auth.grok.me` if unset |
| `GROK_AUTH_CLIENT_ID` | If auth on | Runtime | Per-app OAuth client from the auth broker |
| `GROK_AUTH_CLIENT_SECRET` | If auth on | Runtime | Matching client secret |
| `VITE_STUN_URLS` | Optional | Build | Comma-separated STUN URLs for multiplayer ICE (defaults exist) |

**Secrets never go in git.** Set them only in the Vercel dashboard (or `vercel env add` after `vercel login`).

### 3. Dashboard checklist

1. Import this GitHub repo into Vercel (or link an existing project).
2. Confirm **Build Command**: `npm run build` (matches `vercel.json` / `package.json`).
3. Confirm **Environment Variables** include at least `VITE_AUTH_ENABLED=false` (or rely on `vercel.json`).
4. Deploy → copy the production URL.
5. Point Stamps Steel `erection.html` iframe at:

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

### 4. CLI (optional)

```bash
vercel login
vercel link
# Only if you need secrets beyond vercel.json:
# printf 'false' | vercel env add VITE_AUTH_ENABLED production
# printf 'false' | vercel env add VITE_AUTH_ENABLED preview
# printf '%s' "$DATABASE_URL" | vercel env add DATABASE_URL production
vercel --prod
```

## Sync player to Stamps Steel website

```bash
# After editing the standalone player in this repo:
cp public/standalone-pemb.html ../Stamps-Steel/pemb-3d.html
# or: cp index.html ../Stamps-Steel/pemb-3d.html
cd ../Stamps-Steel && git add pemb-3d.html && git commit -m "Sync 3D PEMB player" && git push
```

## Optional: GitHub Pages on this repo

If you enable **Settings → Pages → Deploy from branch `main` / root**, this repo can also serve  
`https://SpiderForce-Star.github.io/Isometric-PEMB-Video-Build/` directly.  
Until then, the live embed uses Stamps-Steel Pages (already on).

© 2026 Stamps Steel Buildings · Bethpage, TN
