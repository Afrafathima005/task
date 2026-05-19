# Pre-Submission Checklist (~3 hour assessment)

Use this before sending your package to the assessors.

## Code & functionality

- [ ] Google sign-in works (local and/or live)
- [ ] Can create a task
- [ ] Task list shows only current user's tasks
- [ ] Can change status: Planned → In Progress → Complete
- [ ] `npm run build` succeeds

## Repository

- [ ] Code pushed to GitHub (or equivalent)
- [ ] `.env.local` **not** committed (`.gitignore` includes it)
- [ ] `.env.example` committed for reviewers who run locally

```bash
git init
git add .
git commit -m "Task manager assessment submission"
git remote add origin https://github.com/YOUR_USERNAME/task-manager-app.git
git push -u origin main
```

## Deployment (recommended)

- [ ] Deployed to Vercel (or similar)
- [ ] All `NEXT_PUBLIC_FIREBASE_*` vars set in hosting dashboard
- [ ] Firebase **Authorized domains** includes your live hostname
- [ ] Realtime Database rules restrict tasks by `userId`

## Documentation to submit

- [ ] [README.md](../README.md) — setup + links
- [ ] [docs/USER_GUIDE.md](./USER_GUIDE.md) — end-user instructions
- [ ] [AI_USAGE_SUMMARY.md](../AI_USAGE_SUMMARY.md) — tools and prompts
- [ ] Live URL and repo URL filled in README submission table

## Email / portal submission template

```
Subject: Task Manager Assessment — [Your Name]

GitHub: https://github.com/...
Live URL: https://....vercel.app

Documentation: See README.md and docs/USER_GUIDE.md in the repository.
AI Usage: See AI_USAGE_SUMMARY.md in the repository.
```

## Optional: tighten scope for interview

If asked "what is the minimum product?", answer:

> Sign in with Google, create tasks, list them, update status among Planned / In Progress / Complete. Everything else (filters, edit, delete, due dates) is documented optional UX.
