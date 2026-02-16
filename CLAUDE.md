# Zuvy Student Dashboard — Claude Code Guidelines

See @AGENTS.md for full project guidelines.

## Claude Code-Specific Notes

- **Search before creating**: Use Glob and Grep to find existing patterns in `src/components/` before writing new code.
- **Route definitions**: All routes are in `src/App.tsx` — check here before adding or modifying pages.
- **Mock data location**: `src/lib/mockData.ts` for student/course data; `src/lib/onboarding.mockData.ts` for onboarding.
- **Utils**: `cn()`, `getStatusBadgeStyles()`, `formatDate()` are in `src/lib/utils.ts` — use these, don't recreate.
- **Commit discipline**: Only commit when explicitly asked. Stage specific files, not `git add -A`.
- **Plan before executing**: For tasks with 3+ steps, create a task list and confirm before starting.
