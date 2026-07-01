# GBP Growth Pro implementation plan

## Phase 1 — Foundation
- Review the existing dashboard shell, mock data store, and API routes.
- Fix the current Next.js route typing issue so the build can complete.
- Introduce a reusable module layout and shared UI primitives.

## Phase 2 — Authentication and app state
- Add lightweight auth API routes with token-based session handling.
- Persist the session in the browser and guard dashboard routes.
- Add toast notifications for success and error states.

## Phase 3 — Core business modules
- Build an AI chatbot experience with conversation history, lead capture and handoff support.
- Build AI lead generation with filtering, pagination, export and duplicate detection.
- Extend CRM, audit, review reply, analytics and reporting pages with richer data and actions.
- Add automation, team and API settings surfaces to cover the operational workflows.

## Phase 4 — Verification
- Run the production build and resolve any TypeScript or runtime issues.
- Check the main flows manually through the updated pages and API endpoints.
