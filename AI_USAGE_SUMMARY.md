# AI Usage Summary

## Tools used

| Tool | Role |
|------|------|
| **Cursor** (AI-assisted IDE) | Primary development environment — code generation, refactoring, UI improvements, documentation |
| **Composer / Auto agent** | Implemented features, fixed bugs, and produced assessment documentation in this repository |

*If you also used ChatGPT, Copilot, or others, add them here before submission.*

## How AI was used

1. **Scaffolding & integration** — Next.js app structure, Firebase Auth (Google popup), and Realtime Database read/write/listen patterns.  
2. **UI/UX** — Dark-themed dashboard, form layout, status badges, filters, empty/loading states, and responsive layout with Tailwind CSS.  
3. **Type safety** — `TaskStatus` union type, typed Firebase user, typed event handlers.  
4. **Documentation** — User guide, deployment steps, requirements traceability, and this summary.  
5. **Review against brief** — Mapping functional requirements to code and documenting scope boundaries.

## Example prompts (optional)

Examples of prompts used during development (paraphrased):

- *"Enhance the UI and other related features"* — led to unified design, due dates, edit/delete, search, stats, and loading states.  
- *Assessment brief shared* — led to structured documentation aligned with submission requirements.

You may add your own prompts if reviewers ask for process detail.

## AI-generated code modified or corrected manually

| Area | What was changed after AI output |
|------|----------------------------------|
| **Invalid component name** | A mistaken recursive `motionless` wrapper was replaced with standard `div` elements before build. |
| **PowerShell / build** | Build commands adjusted for Windows (`;` instead of `&&`). |
| **Assessment alignment** | Documentation split into README, USER_GUIDE, REQUIREMENTS, DEPLOYMENT to match evaluator checklist. |
| **Scope framing** | Extra features (edit, delete, search) kept minimal and documented as usability extras, not core requirements. |

## Human decisions (not delegated to AI)

- **Firebase** as auth + database (fits 3-hour timeline and free tier).  
- **Per-user task isolation** via `userId` on each task record.  
- **No scope creep** into collaboration, reminders, or offline mode.  
- **Security** — documented RTDB rules; env vars not committed.  

## Honesty statement

AI accelerated implementation and documentation. The candidate should be prepared to explain architecture, Firebase flow, and any line of code in `app/page.tsx` and `firebase/config.ts` in a follow-up discussion.
