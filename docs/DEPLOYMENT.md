# Deployment Guide

Deploy the Next.js frontend to **Vercel** (or similar) and keep **Firebase** as the backend (Auth + Realtime Database).

## Prerequisites

- GitHub repository with this source code  
- Firebase project with Google Auth and Realtime Database enabled  
- All values from `.env.example` available  

## Step 1 — Firebase configuration

1. [Firebase Console](https://console.firebase.google.com/) → your project.  
2. **Authentication** → Sign-in method → enable **Google**.  
3. **Realtime Database** → Create database (start in **test mode** for quick local dev, then apply rules below).  
4. **Project settings** → Your apps → Web app → copy config into environment variables.



## Step 2 — Deploy to Vercel

1. Push code to GitHub (see README).  
2. [vercel.com](https://vercel.com) → **Add New Project** → import the repo.  
3. Framework preset: **Next.js** (auto-detected).  
4. **Environment variables** — add each `NEXT_PUBLIC_FIREBASE_*` from `.env.local`.  
5. Deploy.

## Step 3 — Authorized domains

After deploy, copy your Vercel URL (e.g. `https://task-manager-xyz.vercel.app`).

Firebase → **Authentication** → **Settings** → **Authorized domains** → add that hostname (without path).

## Step 4 — Verify production

1. Open the live URL.  
2. Sign in with Google.  
3. Create a task, change status, sign out and back in — task should persist.



## Troubleshooting

| Issue | Fix |
|-------|-----|
| `auth/unauthorized-domain` | Add Vercel domain to Firebase authorized domains |
| Tasks not saving | Check RTDB rules and `NEXT_PUBLIC_FIREBASE_DATABASE_URL` |
| Blank page after deploy | Confirm all `NEXT_PUBLIC_*` env vars set on Vercel and redeploy |
| Google popup blocked | Allow pop-ups; try another browser |
