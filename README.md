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
| `vercel.json` | Vercel build + env keys (`VITE_AUTH_*`, Neon `DATABASE_URL*`) |

## Develop (React app)

```bash
npm install
npm run dev      # 0.0.0.0:8080
npm run build
npm run typecheck
```

## Deploy (Vercel)

Prefer **Vercel** (TanStack Start + Nitro preset in `vite.config.ts`).

### 1. Env keys in `vercel.json`

| Variable | Default in file | Why |
|----------|-----------------|-----|
| `VITE_AUTH_ENABLED` | `"false"` | Public 3D embed — no sign-in |
| `DATABASE_URL` | `""` (placeholder) | Neon **pooled** connection — set real value in Vercel / Neon integration |
| `DATABASE_URL_UNPOOLED` | `""` (placeholder) | Neon **direct** connection — preferred for `npm run build` migrations |

Empty strings mean “unset” at runtime (app uses PGLite fallback; migrate skips).  
**Project Settings / Neon integration override** these placeholders with real secrets.  
**Never commit a real connection string** — Vercel encrypts secrets only when set in the dashboard.

### 2. Wire Neon (recommended)

1. In Vercel: **Storage → Create / Connect → Neon** (or Neon Marketplace integration).  
2. Confirm these appear under **Settings → Environment Variables** for Production + Preview:

| Variable | Scope | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | Runtime (+ Build) | Pooled Postgres URL — app queries |
| `DATABASE_URL_UNPOOLED` | Runtime (+ Build) | Direct URL — deploy migrations |
| `VITE_AUTH_ENABLED` | Build + Runtime | Keep `"false"` for public embed |

3. Redeploy so build-time migrate can reach Neon.

### 3. Optional auth secrets (only if you turn accounts on)

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `BETTER_AUTH_URL` | If auth on | Public origin, e.g. `https://your-app.vercel.app` |
| `BETTER_AUTH_SECRET` | If auth on | `openssl rand -hex 32` |
| `GROK_AUTH_ISSUER` | Optional | Defaults to `https://auth.grok.me` |
| `GROK_AUTH_CLIENT_ID` / `GROK_AUTH_CLIENT_SECRET` | If auth on | Broker client |
| `VITE_STUN_URLS` | Optional | Comma-separated STUN URLs |

### 4. Dashboard checklist

1. Import this GitHub repo into Vercel.  
2. Build command: `npm run build`.  
3. Connect Neon → confirm `DATABASE_URL` + `DATABASE_URL_UNPOOLED`.  
4. Deploy → paste production URL into Stamps Steel `erection.html` iframe (`?embed=1`).

### 5. CLI (optional)

```bash
vercel login
vercel link
# Prefer Neon integration; or set secrets manually:
# printf '%s' "$DATABASE_URL" | vercel env add DATABASE_URL production
# printf '%s' "$DATABASE_URL_UNPOOLED" | vercel env add DATABASE_URL_UNPOOLED production
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
