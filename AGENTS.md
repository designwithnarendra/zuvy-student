# Zuvy Student Dashboard — Project Guidelines

> Single source of truth for all AI coding assistants on this project.
> Referenced by `CLAUDE.md` (Claude Code) and read natively by GitHub Copilot, Cursor, and others.

## Project Overview

Student-facing learning dashboard built as a React SPA using mock data to demonstrate
functionality. Priority: **Beautiful, functional UI** over backend implementation.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 SPA (Vite + SWC, **not** Next.js) |
| Language | TypeScript (strict mode intentionally OFF for rapid dev) |
| Routing | React Router DOM v6 — `useNavigate`, `Link`, `useParams` |
| UI Library | shadcn/ui (Radix UI + Tailwind CSS v3.4) |
| Styling | Tailwind CSS + CSS variables for all design tokens |
| Icons | Lucide React |
| Charts | Recharts |
| Forms | React Hook Form v7 + Zod v3 |
| State | useState/useReducer (local), React Context (theme), TanStack Query (ready, not yet used) |
| Persistence | localStorage (theme, onboarding), sessionStorage (nav state, coding submissions) |
| Toast | Sonner |
| Deployment | Netlify (SPA redirect via `public/_redirects`) |

## Core Principles

### 1. Design Philosophy

- **Visual Hierarchy**: Use Zuvy's design system — Plein headings (`font-heading`), Switzer body (`font-body`), JetBrains Mono code (`font-code`)
- **Brand Colors**: Forest Green primary, Sunset Orange secondary, Bright Teal accent. All via CSS variables — never hardcode hex values.
- **Shadows**: Use named tokens — `shadow-soft`, `shadow-medium`, `shadow-hover`, `shadow-accent` (also `shadow-4dp`–`shadow-32dp`)
- **Consistency**: Match existing patterns in `ModuleCard`, `Header`, `AssessmentView`, and modal components
- **Purposeful Animation**: Subtle transitions (200–300ms) via `tailwindcss-animate`
- **Responsive by Default**: Mobile-first, test at 768px — use `hidden lg:flex` / `lg:hidden` counterparts
- **Dark Mode**: Always test both light and dark — theme via `useTheme()` from `src/lib/ThemeProvider.tsx`

### 2. Component Architecture

- Pages (`src/pages/`) are route containers — wire up data and dispatch handlers
- Components (`src/components/`) receive pure props — no direct mock data imports
- Extract reusable logic into custom hooks (`src/hooks/`)
- Keep pages thin — delegate rendering to feature components

### 3. Code Quality Standards

- **TypeScript**: Strict mode is OFF — but use explicit interfaces for props and data shapes. Avoid silent `any`.
- **Descriptive Names**: `handleAssessmentSubmit` not `handleSubmit`; `isModuleLocked` not `flag`
- **Early Returns**: Reduce nesting, handle loading/error/locked states first
- **Mock Data**: `mockStudent`, `mockCourses` from `src/lib/mockData.ts`; onboarding from `src/lib/onboarding.mockData.ts`

## Problem-Solving Approach

### When Adding Features

1. **Check Existing Patterns**: Search `src/components/` for similar implementations first
2. **Design System First**: Review `src/index.css` for CSS variables, `tailwind.config.ts` for tokens
3. **Mobile + Dark Mode**: Test at 768px and in both light/dark themes
4. **Accessibility**: Radix UI handles most — verify focus management for custom flows

### When Troubleshooting

1. **Check Mock Data**: Verify data structure in `src/lib/mockData.ts`
2. **Routing**: Routes are in `src/App.tsx`. Check `useParams()` key names match route definitions.
3. **Theme Issues**: `ThemeProvider` is the source of truth, not next-themes — check `src/lib/ThemeProvider.tsx`
4. **Console Warnings**: Fix React keys and `useEffect` dependency warnings
5. **Visual Bugs**: Check Tailwind class conflicts with `tailwind-merge` via DevTools

## UI Implementation Patterns

### Styling

```typescript
// Always use cn() for conditional classes
className={cn("base", isActive && "active", isDisabled && "opacity-50 cursor-not-allowed")}

// Status badges
import { getStatusBadgeStyles } from "@/lib/utils"
className={getStatusBadgeStyles(item.status)}
```

### Forms & Inputs

- shadcn `Input`, `Select`, `Textarea` from `src/components/ui/`
- React Hook Form + Zod (see `src/pages/OnboardingPage.tsx` for reference)
- Inline validation errors. Disable submit during loading. Toast via `sonner`.

### Modals & Dialogs

- `Dialog` for standard modals, `Sheet` for mobile slide-over panels (see `ModuleSheet`, `MobileSidebar`)
- One purpose per modal. Escape key handled by Radix automatically.

### Loading States

```typescript
if (isLoading) {
  return <div className="animate-pulse space-y-4"><Skeleton className="h-12 w-full" /></div>
}
```

### Empty States

```typescript
{items.length === 0 && (
  <div className="text-center py-12">
    <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
    <h3 className="font-heading text-lg font-semibold">No items yet</h3>
    <Button onClick={handleCreate} className="mt-4">Get Started</Button>
  </div>
)}
```

### State Management

- **Local state**: `useState` / `useReducer`. For complex session flows, follow the `useReducer` pattern in `src/pages/ModuleContentPage.tsx` (12 typed actions).
- **Global theme**: `const { theme, toggleTheme, isThemeLocked } = useTheme()` from `src/lib/ThemeProvider.tsx`
- **Persistence**: `localStorage` for preferences (`zuvy_theme`, onboarding); `sessionStorage` for transient nav/submission state.

### Navigation

Use `useNavigate()` / `Link` / `useParams()` from `react-router-dom`. All routes defined in `src/App.tsx`.

## File Organization

| Path | Purpose |
|---|---|
| `src/pages/` | Route-level containers — wire up data and handlers |
| `src/components/` | Feature components — receive props, no direct data imports |
| `src/components/ui/` | shadcn/ui primitives — do not modify directly |
| `src/hooks/` | Custom React hooks |
| `src/lib/mockData.ts` | TypeScript interfaces + mock data (`mockStudent`, `mockCourses`) |
| `src/lib/onboarding.types.ts` | Onboarding TypeScript interfaces |
| `src/lib/onboarding.mockData.ts` | Onboarding mock data |
| `src/lib/utils.ts` | `cn()`, `getStatusBadgeStyles()`, `formatDate()`, `formatDateTime()` |
| `src/lib/ThemeProvider.tsx` | Theme context — dark/light + assessment lock |
| `src/index.css` | All design tokens as CSS custom properties |
| `src/App.tsx` | Root component, React Router routes, global providers |

## Common Hooks Reference

| Hook | Location | Purpose |
|---|---|---|
| `useIsMobile()` | `src/hooks/use-mobile.tsx` | `boolean` — true if viewport < 768px |
| `useOnboardingStorage()` | `src/hooks/use-onboarding.ts` | CRUD for onboarding data in localStorage |
| `useOnboardingStatus()` | `src/hooks/use-onboarding.ts` | `{ isCompleted, hasSkipped, currentStep, progress }` |
| `useFirstTimeLogin()` | `src/hooks/use-onboarding.ts` | First login detection via localStorage flag |
| `useTheme()` | `src/lib/ThemeProvider.tsx` | `{ theme, toggleTheme, isThemeLocked, lockTheme, unlockTheme }` |

## Quality Checklist

- [ ] Works at mobile width (768px) — check `useIsMobile()` responsive branches
- [ ] Correct in both light and dark mode
- [ ] No TypeScript errors (avoid unchecked `any` even with strict mode OFF)
- [ ] No console warnings (React keys, useEffect dependencies)
- [ ] Follows existing design patterns (check similar components first)
- [ ] Uses design system colors/shadows (CSS variables, not hardcoded hex)
- [ ] Handles loading and empty states
- [ ] Uses `cn()` for all conditional className logic
- [ ] Status badges via `getStatusBadgeStyles()` from `src/lib/utils.ts`
- [ ] Keyboard accessible
- [ ] `useMemo`/`useCallback` for expensive computations or handlers passed to children

## When in Doubt

1. Look at existing components — there is almost certainly a pattern to follow
2. Keep it simple — this is a design showcase, not a production backend
3. Prioritize aesthetics — professional and polished
4. Ask clarifying questions — understand requirements before assuming

---

*Every component should feel intentional, responsive, and aligned with the Zuvy design system.*
