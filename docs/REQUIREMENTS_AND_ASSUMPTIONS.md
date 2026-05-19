# Requirements Analysis & Assumptions

This document shows how the brief was understood, where details were missing, and what was (and was not) built beyond the minimum.

## Functional requirements — traceability

| # | Requirement | Implementation | Location |
|---|---------------|----------------|----------|
| 1 | Sign in with Google | `signInWithPopup` + `GoogleAuthProvider`; auth state via `onAuthStateChanged` | `app/page.tsx`, `firebase/config.ts` |
| 2 | Create tasks | Form submits to Firebase `push` on `/tasks` | `app/page.tsx` → `addTask` |
| 3 | View list of tasks | Real-time listener `onValue` on `/tasks`, filtered by `userId` | `app/page.tsx` → `useEffect` |
| 4 | Update task status | `<select>` calls `update` with `Planned` \| `In Progress` \| `Complete` | `app/page.tsx` → `updateStatus` |

All three required statuses are enforced in TypeScript (`TaskStatus`) and in the status dropdown options.

## Ambiguities identified & decisions

| Gap in brief | Reasonable assumption | Rationale |
|--------------|---------------------|-----------|
| Task fields not specified | Title required; status required; optional due date | Title + status satisfy core flows; due date improves usability without new states |
| Delete / edit not required | Included as light UX extras | Common expectations; small code surface; not a separate “product” |
| Filter / search not required | Status filters + search added | Helps usability when lists grow; still one screen |
| Database choice open | Firebase Realtime Database | Fast setup, real-time sync, pairs well with Firebase Auth |
| Hosting not specified | Vercel + Firebase free tier | Standard for Next.js; documented in DEPLOYMENT.md |
| Security rules not specified | Document sample rules filtering by `auth.uid` | Prevents cross-user reads/writes in multi-user demos |
| Logout not listed | Sign out provided | Expected companion to Google sign-in |
| “View tasks” — all vs filtered | Show all user tasks; optional status filter | Default view = full list; filters are additive |


## Usability improvements (within assessment intent)

These support “improve usability and completeness” without turning the app into a large product:

- Consistent UI, loading states, empty states, dismissible errors  
- Optional due date and overdue highlight  
- Inline title edit and delete with confirmation  
- Status filter pills with counts, search, sort, completion summary  

Each extra is documented as non-required in the User Guide.

## Tech stack summary

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| UI | React 18, Tailwind CSS 4 |
| Auth | Firebase Authentication (Google) |
| Data | Firebase Realtime Database |
| Language | TypeScript |

## Evaluation alignment (self-check)

| Criterion | How addressed |
|-----------|----------------|
| Requirement understanding | This document + traceability table |
| AI tool usage | [AI_USAGE_SUMMARY.md](../AI_USAGE_SUMMARY.md) |
| Application functionality | All four flows implemented and testable |
| Problem solving | Firebase env, auth domains, RTDB rules documented |
| Documentation | USER_GUIDE.md, README, deployment guide |
| User experience | Simple single-page flow; clear labels and feedback |
| Deployment | DEPLOYMENT.md + build verified with `npm run build` |
