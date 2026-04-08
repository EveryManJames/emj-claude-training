# Deploy to Vercel — 60-Second Guide

## Option A: Drag & Drop (Easiest)
1. Open your terminal and `cd` into this folder
2. Run: `npm install && npm run build`
3. Go to **vercel.com** → Log in → **Add New Project**
4. Drag the `dist/` folder onto the upload area
5. Done — live URL in ~10 seconds ✅

## Option B: Vercel CLI (One command)
```bash
cd emj-claude-training
npm install
npx vercel --yes
```
Vercel will open a browser to log you in, then deploy automatically.

## Option C: GitHub + Vercel (Best for updates)
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import from GitHub
3. Select the repo — Vercel auto-detects Vite config
4. Click Deploy ✅

Future pushes to `main` will auto-redeploy.
