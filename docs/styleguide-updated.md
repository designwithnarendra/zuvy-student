# Zuvy Landing - Style Guide

This document outlines the design system used throughout the Zuvy Landing project, including colors, typography, spacing, and other design tokens.

---

## Table of Contents

1. [Colors](#colors)
2. [Typography](#typography)
3. [Icons](#icons)
4. [Spacing & Layout](#spacing--layout)
5. [Shadows](#shadows)
6. [Border Radius](#border-radius)
7. [Animations](#animations)
8. [Button Variants](#button-variants)

---

## Colors

The design system uses HSL color format with CSS custom properties. All colors support both light and dark themes.

### Primary Colors - Forest Green

| Token | Light Mode | Dark Mode | Hex (Light) |
|-------|-----------|-----------|-------------|
| `--primary` | `120 37% 27%` | `125 37% 36%` | #2C5F2D |
| `--primary-foreground` | `0 0% 100%` | `0 0% 100%` | #FFFFFF |
| `--primary-light` | `130 43% 95%` | `120 37% 27%` | #E8F5E9 |
| `--primary-dark` | `123 40% 20%` | `124 38% 46%` | #1D4620 |

### Secondary Colors - Sunset Orange

| Token | Light Mode | Dark Mode | Hex (Light) |
|-------|-----------|-----------|-------------|
| `--secondary` | `25 80% 52%` | `25 80% 52%` | #EB7E2E |
| `--secondary-foreground` | `0 0% 100%` | `0 0% 100%` | #FFFFFF |
| `--secondary-light` | `25 85% 94%` | `25 80% 42%` | #FDEEE3 |
| `--secondary-dark` | `25 80% 42%` | `25 85% 62%` | #C66418 |

### Accent Colors - Bright Teal

| Token | Light Mode | Dark Mode | Hex (Light) |
|-------|-----------|-----------|-------------|
| `--accent` | `153 91% 49%` | `153 91% 49%` | #12EA7B |
| `--accent-foreground` | `0 0% 10%` | `0 0% 10%` | #1A1A1A |
| `--accent-light` | `153 91% 94%` | `151 91% 39%` | #E0FFF0 |
| `--accent-dark` | `151 91% 39%` | `153 91% 56%` | #0DB862 |

### Semantic Colors

#### Success - Grass Green

| Token | Light Mode | Dark Mode | Hex (Light) |
|-------|-----------|-----------|-------------|
| `--success` | `88 48% 52%` | `88 50% 53%` | #7CB342 |
| `--success-foreground` | `0 0% 100%` | `0 0% 10%` | #FFFFFF |
| `--success-light` | `100 55% 96%` | `88 48% 52%` | #F1F8E9 |
| `--success-dark` | `99 55% 37%` | `88 50% 60%` | #558B2F |

#### Destructive/Error - Red

| Token | Light Mode | Dark Mode | Hex (Light) |
|-------|-----------|-----------|-------------|
| `--destructive` | `4 70% 50%` | `4 73% 60%` | #D32F2F |
| `--destructive-foreground` | `0 0% 100%` | `0 0% 100%` | #FFFFFF |
| `--destructive-light` | `0 100% 97%` | `4 70% 50%` | #FFEBEE |
| `--destructive-dark` | `0 69% 41%` | `3 100% 67%` | #B71C1C |

#### Warning - Amber

| Token | Light Mode | Dark Mode | Hex (Light) |
|-------|-----------|-----------|-------------|
| `--warning` | `38 94% 50%` | `38 94% 50%` | #F59E0B |
| `--warning-light` | `48 97% 88%` | `32 95% 44%` | #FEF3C7 |
| `--warning-dark` | `32 95% 44%` | `42 96% 57%` | #D97706 |

#### Info - Blue

| Token | Light Mode | Dark Mode | Hex (Light) |
|-------|-----------|-----------|-------------|
| `--info` | `211 89% 48%` | `207 90% 61%` | #1976D2 |
| `--info-foreground` | `0 0% 100%` | `0 0% 100%` | #FFFFFF |
| `--info-light` | `207 89% 96%` | `211 89% 48%` | #E3F2FD |
| `--info-dark` | `217 100% 34%` | `207 89% 70%` | #0D47A1 |

### Neutral Colors - Greys

| Token | Light Mode | Dark Mode | Hex (Light) | Usage |
|-------|-----------|-----------|-------------|-------|
| `--grey-light` | `30 15% 88%` | `0 0% 25%` | #E3E1DD | Borders, dividers |
| `--grey` | `150 8% 50%` | `0 0% 45%` | #7B857F | Muted text, icons |
| `--grey-dark` | `150 10% 28%` | `30 15% 88%` | #404945 | Dark backgrounds |

### Background & Surface Colors

| Token | Light Mode | Dark Mode | Hex (Light) | Usage |
|-------|-----------|-----------|-------------|-------|
| `--background` | `30 30% 98%` | `0 0% 10%` | #FAF9F7 | Primary page background (Cream White) |
| `--background-secondary` | `0 0% 100%` | `0 0% 12%` | #FFFFFF | Secondary background (Pure White) |
| `--foreground` | `150 15% 15%` | `30 30% 98%` | #21302B | Primary text |
| `--card` | `0 0% 100%` | `0 0% 15%` | #FFFFFF | Card surfaces |
| `--card-foreground` | `150 15% 15%` | `30 30% 98%` | #21302B | Card text |
| `--muted` | `30 20% 92%` | `0 0% 25%` | #F0EEEB | Muted backgrounds |
| `--muted-foreground` | `150 8% 50%` | `0 0% 72%` | #7B857F | Muted text |
| `--border` | `30 20% 90%` | `0 0% 25%` | #EBE8E3 | Borders |
| `--input` | `30 20% 90%` | `0 0% 25%` | #EBE8E3 | Input borders |
| `--ring` | `120 37% 27%` | `125 37% 36%` | #2C5F2D | Focus rings |

### Text Color System

| Token | Light Mode | Dark Mode | Hex (Light) | Usage |
|-------|-----------|-----------|-------------|-------|
| `--text-primary` | `150 15% 15%` | `30 30% 98%` | #21302B | Headings, primary content, important text |
| `--text-secondary` | `150 10% 35%` | `30 20% 80%` | #505952 | Body text, paragraphs, descriptions |
| `--text-tertiary` | `150 8% 50%` | `30 15% 70%` | #7B857F | Captions, labels, metadata |
| `--text-muted` | `150 6% 65%` | `0 0% 60%` | #A3ABA7 | Placeholders, disabled states, hints |
| `--text-accent` | `120 37% 27%` | `125 37% 36%` | #2C5F2D | Links, emphasized text, CTAs |
| `--text-interactive` | `153 91% 35%` | `153 91% 49%` | #08B35D | Link hover, active states, focus |

---

## Typography

**Font Source:** Both Plein and Switzer are available from [Fontshare](https://www.fontshare.com/) - a free font service by Indian Type Foundry.

### Font Families

| Font | Family | Usage | Weights |
|------|--------|-------|---------|
| **Plein** | `'Plein', sans-serif` | Headings (h1-h6) | 400, 500, 600, 700 |
| **Switzer** | `'Switzer', sans-serif` | Body text, paragraphs, buttons | 300, 400, 500, 600, 700 |
| **Inter** | `'Inter', sans-serif` | Fallback font | Variable |

### Font Sizes - Desktop

| Element/Class | Size (rem) | Size (px) | Line Height | Usage |
|---------------|-----------|----------|-------------|-------|
| `h1` | 5.5 | 88 | 1.3 | Main page headings |
| `h2` | 4 | 64 | 1.3 | Section headings |
| `h3` | 3 | 48 | 1.3 | Subsection headings |
| `h4` | 2.25 | 36 | 1.3 | Component headings |
| `h5` | 1.75 | 28 | 1.3 | Card titles |
| `h6` | 1.3125 | 21 | 1.3 | Small headings |
| `.text-body1` | 1 | 16 | 1.5 | Primary body text |
| `.text-body2` | 0.875 | 14 | 1.5 | Secondary body text |
| `.text-caption` | 0.75 | 12 | 1.5 | Captions, labels |
| `.text-small` | 0.875 | 14 | 1.5 | Small text |
| `.text-xs` | 0.75 | 12 | 1.5 | Extra small text |

### Font Sizes - Mobile (max-width: 768px)

| Element/Class | Size (rem) | Size (px) |
|---------------|-----------|----------|
| `body` | 0.875 | 14 |
| `h1` | 4.75 | 76 |
| `h2` | 3.5 | 56 |
| `h3` | 2.75 | 44 |
| `h4` | 2 | 32 |
| `h5` | 1.5 | 24 |
| `h6` | 1.125 | 18 |
| `.text-body1` | 0.875 | 14 |
| `.text-body2` | 0.75 | 12 |
| `.text-caption` | 0.75 | 12 |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Delicate text (Switzer only) |
| Regular | 400 | Body text default |
| Medium | 500 | Emphasis, subheadings |
| Semi-bold | 600 | Strong subheadings |
| Bold | 700 | Headings, strong emphasis |

---

## Icons

**Icon Library:** [Lucide React](https://lucide.dev/)

### Overview

The project uses **Lucide React** (v0.462.0), an open-source icon library that provides clean, consistent SVG icons as React components. Icons are tree-shakeable and only used icons are included in the bundle.

### Installation

```bash
npm install lucide-react
```

### Usage

Icons are imported as named React components:

```tsx
import { Sun, Moon, LogOut, ChevronRight } from "lucide-react"

// Use in components
<Sun className="h-4 w-4" />
<Moon className="h-4 w-4 text-primary" />
```

### Icon Categories

**Navigation Icons:**
- `ArrowLeft`, `ArrowRight`, `ChevronDown`, `ChevronLeft`, `ChevronRight`, `PanelLeft`

**UI State Icons:**
- `Check`, `CheckCircle`, `Circle`, `Dot`, `X`, `XCircle`, `MoreHorizontal`

**Action Icons:**
- `Copy`, `Search`, `GripVertical`, `LogOut`, `RotateCcw`

**Content Type Icons:**
- `Video`, `Play`, `BookOpen`, `FileText`, `Calendar`, `Clock`

**Status/Semantic Icons:**
- `AlertTriangle`, `Lock`, `List`, `User`, `Users`, `GraduationCap`, `Monitor`, `Info`

**Theme Icons:**
- `Sun`, `Moon`

**Technical Icons:**
- `MemoryStick`

### Styling

Icons inherit their color from the text color and can be styled using Tailwind classes:

```tsx
// Size control
<Check className="h-4 w-4" />  // 16x16px
<Check className="h-6 w-6" />  // 24x24px

// Color control
<Check className="text-success" />
<Check className="text-primary" />
<Check className="text-muted-foreground" />

// Combined styling
<CheckCircle className="w-5 h-5 text-success" />
```

### Common Patterns

```tsx
// Theme toggle
<Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
<Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

// Menu indicators
<Check className="ml-auto h-4 w-4" />
<ChevronRight className="ml-2 h-4 w-4" />

// Status indicators
<Circle className="h-2 w-2 fill-current" />
<CheckCircle className="h-4 w-4 text-success" />
```

### Resources

- **Official Website:** [https://lucide.dev/](https://lucide.dev/)
- **Icon Browser:** [https://lucide.dev/icons/](https://lucide.dev/icons/)
- **GitHub:** [https://github.com/lucide-icons/lucide](https://github.com/lucide-icons/lucide)
- **NPM Package:** [https://www.npmjs.com/package/lucide-react](https://www.npmjs.com/package/lucide-react)

---

## Spacing & Layout

### Container

| Property | Value |
|----------|-------|
| Max Width (2xl) | 1400px |
| Padding | 2rem (32px) |
| Alignment | Centered |

### Usage

```html
<div class="container">
  <!-- Content with max-width 1400px and 32px padding -->
</div>
```

---

## Shadows

| Name | CSS Class | Value | Usage |
|------|-----------|-------|-------|
| Soft | `shadow-soft` | `0 2px 8px hsl(120 37% 27% / 0.06)` | Subtle elevation |
| Medium | `shadow-medium` | `0 4px 16px hsl(120 37% 27% / 0.1)` | Cards, modals |
| Strong | `shadow-strong` | `0 8px 32px hsl(120 37% 27% / 0.15)` | Prominent elements |
| Accent | `shadow-accent` | `0 4px 16px hsl(153 91% 49% / 0.2)` | Accent highlights (teal) |
| Secondary | `shadow-secondary` | `0 4px 16px hsl(25 80% 52% / 0.2)` | Secondary highlights (orange) |

---

## Border Radius

| Token | CSS Variable | Value |
|-------|--------------|-------|
| Large | `--radius` | 0.5rem (8px) |
| Medium | `calc(var(--radius) - 2px)` | 6px |
| Small | `calc(var(--radius) - 4px)` | 4px |

### Usage

```html
<div class="rounded-lg">Large radius (8px)</div>
<div class="rounded-md">Medium radius (6px)</div>
<div class="rounded-sm">Small radius (4px)</div>
```

---

## Animations

### Transition Utilities

| Name | CSS Class | Value |
|------|-----------|-------|
| Smooth | `transition-smooth` | `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` |
| Bounce | `transition-bounce` | `all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)` |

### Animation Classes

| Name | Duration | Timing | Description |
|------|----------|--------|-------------|
| `animate-accordion-down` | 0.2s | ease-out | Radix accordion expand |
| `animate-accordion-up` | 0.2s | ease-out | Radix accordion collapse |
| `animate-scroll-left` | 30s | linear infinite | Horizontal marquee |
| `animate-scroll-left-fast` | 15s | linear infinite | Fast marquee |
| `animate-scroll-left-mobile` | 10s | linear infinite | Mobile marquee |
| `animate-fade-in` | 0.3s | ease-out | Fade in with Y-transform |
| `animate-scale-in` | 0.2s | ease-out | Scale in with opacity |

### Custom Keyframe Animations

```css
/* Floating animation */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Slow floating */
.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

/* Slow rotation */
.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

/* Drifting motion */
.animate-drift {
  animation: drift 10s ease-in-out infinite;
}

/* Subtle pulse */
.animate-pulse-subtle {
  animation: pulse-subtle 4s ease-in-out infinite;
}
```

---

## Button Variants

### Style Variants

| Variant | Background | Text | Hover |
|---------|------------|------|-------|
| `default` | `bg-primary` | `text-primary-foreground` | `hover:bg-primary-dark` |
| `destructive` | `bg-destructive` | `text-destructive-foreground` | Opacity change |
| `outline` | `bg-background` | Border only | `hover:bg-accent` |
| `secondary` | `bg-secondary` | `text-secondary-foreground` | Opacity change |
| `ghost` | Transparent | Inherit | `hover:bg-accent` |
| `link` | Transparent | `text-primary` | Underline |

### Size Variants

| Size | Height | Padding |
|------|--------|---------|
| `default` | h-12 (48px) | px-4 py-2 |
| `sm` | h-10 (40px) | px-3 |
| `lg` | h-12 (48px) | px-8 |
| `icon` | h-12 w-12 (48px) | Square |

### Usage

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default" size="lg">Get Started</Button>
<Button variant="outline" size="sm">Learn More</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
```

---

## File References

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Tailwind configuration with custom theme |
| `app/globals.css` | CSS variables, typography, animations |
| `app/layout.tsx` | Font imports (Plein, Switzer from Fontshare) |
| `src/components/ui/button.tsx` | Button component with variants |

---

## Dark Mode Support

The design system supports both light and dark themes using the `next-themes` package. Colors automatically adjust based on the `.dark` class applied to the document.

```tsx
// Theme is managed via ThemeProvider
import { ThemeProvider } from "next-themes"

<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
```

---

## Quick Reference - Common Patterns

### Primary CTA Button
```tsx
<Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
  Get Started
</Button>
```

### Secondary CTA Button
```tsx
<Button className="bg-secondary hover:bg-secondary-dark text-secondary-foreground">
  Learn More
</Button>
```

### Section Heading
```tsx
<h2 className="text-primary">Section Title</h2>
<p className="text-secondary text-body1">Description text</p>
```

### Card with Shadow
```tsx
<div className="bg-card rounded-lg shadow-medium p-6">
  <h3 className="text-primary">Card Title</h3>
  <p className="text-secondary">Card description</p>
</div>
```

### Accent Highlight
```tsx
<span className="text-accent">Highlighted text with teal accent</span>
<div className="bg-accent-light p-4 rounded-md">
  Highlighted section with teal background
</div>
```

### Secondary Highlight
```tsx
<span className="text-secondary">Emphasized with sunset orange</span>
<div className="bg-secondary-light p-4 rounded-md">
  Warm highlighted section
</div>
```
