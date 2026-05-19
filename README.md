# Task Manager — Assessment Submission

A simple task management web app built for an AI-assisted development assessment. It meets all required functional flows and adds light usability improvements without expanding into a large product.

## Submission links 

| Item | Link |
|------|------|
| **Source code** | https://github.com/Afrafathima005/task |
| **Live app** | https://task-jtcs.vercel.app|
| **User documentation** | [docs/USER_GUIDE.md](./docs/USER_GUIDE.md) |
| **AI usage summary** | [AI_USAGE_SUMMARY.md](./AI_USAGE_SUMMARY.md) |

## Functional requirements (core)

| Requirement | Status |
|-------------|--------|
| Sign in with Google | ✅ |
| Create tasks | ✅ |
| View task list | ✅ |
| Update status (Planned / In Progress / Complete) | ✅ |

**Optional UX (documented as extras):** filters, search, sort, due dates, edit title, delete, stats bar, sign out.

See [docs/REQUIREMENTS_AND_ASSUMPTIONS.md](./docs/REQUIREMENTS_AND_ASSUMPTIONS.md) for requirement gaps, assumptions, and scope decisions.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 4**
- **Firebase Authentication** (Google)
- **Firebase Realtime Database**

## Setup instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Firebase project

In [Firebase Console](https://console.firebase.google.com/):

1. Create a project (or use existing).
2. **Authentication** → Sign-in method → enable **Google**.
3. **Realtime Database** → Create database.
4. **Project settings** → Your apps → Add web app → copy config values.

### 3. Environment variables

Copy the example file and fill in your Firebase web app config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```



### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Production build (verify)

```bash
npm run build
npm start
```

## Deploy

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for Vercel + Firebase authorized domains.

## Documentation index

| Document | Purpose |
|----------|---------|
| [docs/USER_GUIDE.md](./docs/USER_GUIDE.md) | How to use the app, login, assumptions, limitations, warnings |
| [docs/REQUIREMENTS_AND_ASSUMPTIONS.md](./docs/REQUIREMENTS_AND_ASSUMPTIONS.md) | Requirement traceability and scope decisions |
| [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Hosting and submission checklist |
| [AI_USAGE_SUMMARY.md](./AI_USAGE_SUMMARY.md) | AI tools, usage, prompts, manual corrections |

## Assumptions (summary)

- Users sign in with **Google only**.
- Tasks belong to the **signed-in user** (`userId`).
- New tasks default to status **Planned**.
- **Internet required**; no offline mode.

Full list: [docs/USER_GUIDE.md § Assumptions](./docs/USER_GUIDE.md#3-important-assumptions-made).

## Known limitations

- No collaboration, reminders, offline support, or task descriptions/attachments.
- Delete is permanent.
- Depends on Firebase and Google availability.

Full list: [docs/USER_GUIDE.md § Limitations](./docs/USER_GUIDE.md#4-known-limitations).


```

## Quick test script (for reviewers)

1. Open app → **Sign in with Google**.
2. Add task "Review assessment" → appears as **Planned**.
3. Change status to **In Progress**, then **Complete**.
4. Refresh page → task still present.
5. **Sign out** → sign in again → task still present.

---

Built with AI-assisted development (Cursor). See [AI_USAGE_SUMMARY.md](./AI_USAGE_SUMMARY.md).
