# JKPG Ops Dashboard — GitHub Pages Hosting

## What this is
A read-only, public ops dashboard for JK Powerguard. It shows live sales/ops
data by calling a Supabase Edge Function (`dashboard-proxy`) — the dashboard
itself holds **no credentials**, so it's safe to host on a public GitHub Pages
repo.

## Files
- `jkpg-dashboard.html` — the dashboard itself. Deploy this to GitHub Pages.
- `index.ts` — the Edge Function source (reference only). **Already deployed**
  to Supabase project `pbwhnzaluhsltcmvptwg` as `dashboard-proxy`. You do NOT
  need to redeploy this unless you're changing its logic — if you do, deploy
  it via Supabase, not GitHub.

## How to host `jkpg-dashboard.html` on GitHub Pages
1. Create (or reuse) a GitHub repo.
2. Add `jkpg-dashboard.html` to the repo root (or rename to `index.html` if
   you want it at the bare domain root instead of `/jkpg-dashboard.html`).
3. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch:
   `main` (or whichever) → `/ (root)` → Save.
4. GitHub gives you a URL like `https://<username>.github.io/<repo>/`.
   Share that with your admin team.

## Before giving anyone the link — read this
- **Anyone with the link can view live sales/ops data.** There's no login.
  Treat the link itself as the access control — don't post it anywhere public.
- **It's read-only.** The Edge Function only allows `GET` on a fixed table
  list — no writes possible even if someone messes with the URL directly.
- **It's egress-protected by design**, not by trusting admin behavior:
  - The Edge Function caches responses for **50 seconds**. No matter how many
    people open the link or refresh, the actual database is read at most once
    every 50 seconds — system-wide, across every browser/tab/admin.
  - The dashboard's own Refresh button also throttles itself client-side
    (30s), but this is just a UX nicety — the 50s server cache is the real
    protection and works even if that's somehow bypassed.
  - The salesperson roster (`users` table) is cached in the browser for 24h
    since it almost never changes — one less thing hitting the DB on every
    load.
- **Not a secret:** no Supabase URL/key/password of any kind lives in
  `jkpg-dashboard.html`. It only knows the public Edge Function URL, which by
  design carries no credential.

## If something looks wrong
If numbers look stale for more than ~1 minute after a known data change, hit
Refresh. If they're still stale after that, the Edge Function itself may be
down — check the Supabase dashboard, function `dashboard-proxy`, project
`pbwhnzaluhsltcmvptwg`.
