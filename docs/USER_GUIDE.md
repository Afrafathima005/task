# User Guide — Task Manager

## 1. How to access and use the application

### Live deployment (recommended for reviewers)

If a live URL was submitted with your assessment, open that link in a modern browser (Chrome, Edge, Firefox, or Safari).

### Run locally

1. Follow [Setup instructions](../README.md#setup-instructions) in the README.
2. Start the app: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

### Using the app after sign-in

| Action | How |
|--------|-----|
| **Create a task** | Enter a title in **New task**, optionally pick a **due date**, then click **Add task**. New tasks start as **Planned**. |
| **View tasks** | Your tasks appear in the list below the form. Only tasks you created are shown. |
| **Update status** | Use the **status dropdown** on each task card to set **Planned**, **In Progress**, or **Complete**. |
| **Filter by status** | Click filter pills: **All**, **Planned**, **In Progress**, or **Complete**. |
| **Search** | Type in the search box to filter tasks by title. |
| **Sort** | Choose **Newest first** or **Due date** from the sort dropdown. |
| **Edit a task** | Click **Edit** on a task, change the title, then **Save** (or press Enter). Press Escape or **Cancel** to discard. |
| **Delete a task** | Click **Delete** and confirm in the browser dialog. |
| **Sign out** | Click **Sign out** in the top-right corner. |

The dashboard also shows summary counts and a completion progress bar to help you track work at a glance. These are usability extras; the core assessment flows are sign-in, create, view, and update status.

---

## 2. Login instructions

1. Open the application (live URL or `http://localhost:3000`).
2. On the welcome screen, click **Sign in with Google**.
3. Choose a Google account when prompted and approve access if asked.
4. After a successful sign-in, you are taken to your personal task dashboard.
5. To leave the app, use **Sign out**. Your tasks remain stored and will appear when you sign in again with the same Google account.

**Requirements**

- A valid Google account.
- An active internet connection.
- Pop-ups must be allowed for Google sign-in (the app uses a sign-in popup).

**If sign-in fails**

- Confirm Firebase Google Authentication is enabled in the project console.
- For local development, ensure `.env.local` contains correct Firebase values.
- For deployed apps, add your hosting domain (e.g. `your-app.vercel.app`) under Firebase → Authentication → Settings → **Authorized domains**.

---

## 3. Important assumptions made

| Topic | Assumption |
|-------|------------|
| **Identity** | Each user signs in with Google; no email/password or other providers. |
| **Task ownership** | Tasks are private per user (`userId` matches the signed-in user). |
| **Task fields** | A task has at minimum: **title** and **status**. Optional: **due date**, **createdAt** (for sorting). |
| **Default status** | New tasks are created with status **Planned**. |
| **Status values** | Only three statuses exist, exactly as specified: Planned, In Progress, Complete. |
| **Persistence** | Tasks are stored in Firebase Realtime Database under `/tasks`. |
| **Scope** | No teams, sharing, reminders, or offline mode—by design for this assessment. |
| **Browser** | Modern desktop or mobile browser with JavaScript enabled. |

See [REQUIREMENTS_AND_ASSUMPTIONS.md](./REQUIREMENTS_AND_ASSUMPTIONS.md) for how ambiguous requirements were interpreted.

---

## 4. Known limitations

- **No collaboration** — tasks cannot be shared with other users.
- **No reminders or notifications** — due dates are display-only.
- **No offline support** — requires network access to Firebase.
- **No task descriptions or attachments** — title and status only (plus optional due date).
- **Basic security model** — relies on Firebase Auth + database rules; not enterprise-hardened.
- **Delete is permanent** — no trash or undo.
- **Single-page app** — all functionality on one screen; no separate admin or settings pages.

---

## 5. Important notes and warnings for users

- **Do not share Firebase API keys publicly** in screenshots or repos; use environment variables (`.env.local` is git-ignored).
- **Pop-up blockers** may prevent Google sign-in; allow pop-ups for this site.
- **Third-party services**: Google (authentication) and Firebase (data) process your sign-in and task data according to their terms.
- **Assessment demo data**: If using a shared Firebase project, other testers with access could theoretically see data unless database rules restrict reads/writes by `auth.uid` (recommended for production; see README Firebase section).

---

## 6. Setup instructions (for developers / reviewers)

Full developer setup is in the [README](../README.md#setup-instructions).

Quick checklist:

1. `npm install`
2. Create a Firebase project with **Google Auth** and **Realtime Database**
3. Copy `.env.example` → `.env.local` and fill Firebase config
4. Configure Realtime Database rules (see README)
5. `npm run dev` → open http://localhost:3000

To deploy: see [DEPLOYMENT.md](./DEPLOYMENT.md).
