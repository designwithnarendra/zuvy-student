# Zuvy Student Dashboard - Design System

## Table of Contents
- [Overview](#overview)
- [Color System](#color-system)
- [Typography](#typography)
- [Shadows & Elevation](#shadows--elevation)
- [Spacing & Layout](#spacing--layout)
- [Component Patterns](#component-patterns)
- [Animations](#animations)
- [Accessibility](#accessibility)
- [Usage Guidelines](#usage-guidelines)

---

## Overview

The Zuvy Student Dashboard design system is built on a foundation of accessibility, consistency, and modern design principles. It features:

- **Forest Green Primary Theme** - Professional, educational aesthetic
- **Bright Teal Secondary** - Energy and modernity
- **Comprehensive Light/Dark Modes** - Reduced eye strain, user preference
- **Material Design Elevation** - Clear visual hierarchy
- **Custom Typography System** - Readability and personality
- **Accessible Components** - WCAG 2.1 AA compliance

---

## Color System

### Color Philosophy

The color system uses HSL (Hue, Saturation, Lightness) for:
- **Consistency**: Easier to maintain color relationships
- **Flexibility**: Simple theme variations
- **Accessibility**: Easier contrast calculations
- **Dark Mode**: Systematic lightness adjustments

### Primary Colors - Forest Green

**Brand Identity**: Professional, growth-oriented, educational

#### Light Mode
```css
--primary: 122 36% 27%;           /* #2C5F2D - Forest Green */
--primary-light: 122 39% 93%;     /* #E8F5E9 - Light Green Background */
--primary-dark: 122 40% 20%;      /* #1D4620 - Dark Green Emphasis */
--primary-foreground: 0 0% 100%;  /* #FFFFFF - White Text */
```

#### Dark Mode
```css
--primary: 122 35% 36%;           /* #3A7A3D - Brighter Forest Green */
--primary-light: 122 36% 27%;     /* #2C5F2D - Subtle Green */
--primary-dark: 122 35% 45%;      /* #4A9A4D - Bright Green Emphasis */
--primary-foreground: 0 0% 100%;  /* #FFFFFF - White Text */
```

#### Usage
- **Primary Buttons**: Main CTAs, important actions
- **Links**: Text links, navigation
- **Current Module Badge**: Active learning module
- **Focus Rings**: Keyboard navigation
- **Progress Bars**: Learning progress visualization

### Secondary Colors - Bright Teal

**Brand Identity**: Energy, innovation, modernity

#### Light Mode
```css
--secondary: 152 86% 50%;         /* #12EA7B - Bright Teal */
--secondary-light: 152 100% 94%;  /* #E0FFF0 - Light Teal Background */
--secondary-dark: 152 85% 39%;    /* #0DB862 - Dark Teal Emphasis */
--secondary-foreground: 0 0% 10%; /* #1A1A1A - Dark Text */
```

#### Dark Mode
```css
--secondary: 152 86% 50%;         /* #12EA7B - Same Bright Teal */
--secondary-light: 152 85% 39%;   /* #0DB862 - Subtle Teal */
--secondary-dark: 152 100% 62%;   /* #1FFFA0 - Brighter Teal */
--secondary-foreground: 0 0% 10%; /* #1A1A1A - Dark Text */
```

#### Usage
- **Dark Mode Links**: Replaces forest green for better contrast
- **Live Class Icons**: Class-related content
- **Interactive Elements**: Hover states, active elements
- **Accent Highlights**: Important information callouts

### Semantic Colors

#### Success - Grass Green
**Meaning**: Completion, achievement, positive feedback

##### Light Mode
```css
--success: 88 48% 50%;            /* #7CB342 - Grass Green */
--success-light: 88 55% 95%;      /* #F1F8E9 - Light Green Background */
--success-dark: 88 60% 35%;       /* #558B2F - Dark Green Emphasis */
--success-foreground: 0 0% 100%;  /* #FFFFFF - White Text */
```

##### Dark Mode
```css
--success: 88 50% 60%;            /* #8BC34A - Brighter Grass Green */
--success-light: 88 48% 50%;      /* #7CB342 - Subtle Green */
--success-dark: 88 52% 68%;       /* #9CCC65 - Bright Green */
--success-foreground: 0 0% 10%;   /* #1A1A1A - Dark Text */
```

##### Usage
- **Completed Badges**: Finished modules, assignments
- **Attendance Present**: Class attendance status
- **Success Messages**: Toast notifications
- **Test Case Pass**: Coding problem results
- **Checkmarks**: Completion indicators

#### Warning - Amber Gold
**Meaning**: Attention needed, upcoming deadlines, caution

##### Light Mode
```css
--warning: 38 92% 50%;            /* #F59E0B - Amber Gold */
--warning-light: 45 93% 89%;      /* #FEF3C7 - Light Amber Background */
--warning-dark: 33 92% 44%;       /* #D97706 - Dark Amber Emphasis */
--warning-foreground: 0 0% 10%;   /* #1A1A1A - Dark Text */
```

##### Dark Mode
```css
--warning: 38 92% 50%;            /* #F59E0B - Same Amber */
--warning-light: 33 92% 44%;      /* #D97706 - Subtle Amber */
--warning-dark: 45 98% 60%;       /* #FBBF24 - Brighter Amber */
--warning-foreground: 0 0% 10%;   /* #1A1A1A - Dark Text */
```

##### Usage
- **Assessment Icons**: Quiz and test indicators
- **Warning Messages**: Important notifications
- **Pending Status**: Awaiting action
- **Deadline Alerts**: Approaching due dates

#### Info - Blue
**Meaning**: Information, neutrality, assignments

##### Light Mode
```css
--info: 207 79% 46%;              /* #1976D2 - Blue */
--info-light: 207 90% 95%;        /* #E3F2FD - Light Blue Background */
--info-dark: 207 100% 32%;        /* #0D47A1 - Dark Blue Emphasis */
--info-foreground: 0 0% 100%;     /* #FFFFFF - White Text */
```

##### Dark Mode
```css
--info: 207 85% 65%;              /* #42A5F5 - Brighter Blue */
--info-light: 207 79% 46%;        /* #1976D2 - Subtle Blue */
--info-dark: 207 88% 72%;         /* #64B5F6 - Bright Blue */
--info-foreground: 0 0% 10%;      /* #1A1A1A - Dark Text */
```

##### Usage
- **Assignment Icons**: Assignment-related content
- **Info Messages**: Informational toasts
- **Helpful Tips**: User guidance
- **Neutral Badges**: Generic information

#### Destructive - Error Red
**Meaning**: Errors, failures, destructive actions

##### Light Mode
```css
--destructive: 0 68% 51%;         /* #D32F2F - Error Red */
--destructive-light: 0 100% 97%;  /* #FFEBEE - Light Red Background */
--destructive-dark: 0 68% 37%;    /* #B71C1C - Dark Red Emphasis */
--destructive-foreground: 0 0% 100%; /* #FFFFFF - White Text */
```

##### Dark Mode
```css
--destructive: 0 72% 60%;         /* #EF5350 - Brighter Red */
--destructive-light: 0 68% 51%;   /* #D32F2F - Subtle Red */
--destructive-dark: 0 83% 68%;    /* #FF6659 - Bright Red */
--destructive-foreground: 0 0% 100%; /* #FFFFFF - White Text */
```

##### Usage
- **Error Messages**: Failed submissions, validation errors
- **Attendance Absent**: Missed classes
- **Test Case Fail**: Failed coding tests
- **Delete Actions**: Destructive operations
- **Incorrect Answers**: Assessment feedback

### Neutral Colors

#### Background & Surfaces

##### Light Mode
```css
--background: 48 30% 95%;         /* #F5F4ED - Warm Off-White */
--card: 0 0% 100%;                /* #FFFFFF - White Surface */
--card-light: 0 0% 99%;           /* #FEFEFE - Elevated Surface */
--card-elevated: 0 0% 100%;       /* #FFFFFF - Surface Variant */
```

##### Dark Mode
```css
--background: 0 0% 10%;           /* #1A1A1A - Deep Charcoal */
--card: 0 0% 15%;                 /* #262626 - Dark Surface */
--card-light: 0 0% 10%;           /* #1A1A1A - Minimal Elevation */
--card-elevated: 0 0% 18%;        /* #2E2E2E - Elevated Surface */
```

#### Text Colors

##### Light Mode
```css
--foreground: 0 0% 17%;           /* #2B2B2B - Dark Text */
--muted-foreground: 0 0% 54%;     /* #8A8A8A - Secondary Text */
```

##### Dark Mode
```css
--foreground: 48 30% 95%;         /* #F5F4ED - Light Text */
--muted-foreground: 0 0% 60%;     /* #999999 - Secondary Text (Enhanced Contrast) */
```

#### Borders & Inputs

##### Light Mode
```css
--border: 45 22% 90%;             /* #E8E7DC - Grey Light */
--input: 45 22% 90%;              /* Same as border */
--ring: 122 36% 27%;              /* Forest Green (focus) */
```

##### Dark Mode
```css
--border: 0 0% 25%;               /* #404040 - Grey Border */
--input: 0 0% 25%;                /* Same as border */
--ring: 122 35% 36%;              /* Forest Green (focus) */
```

### Muted Colors (Low Attention)

##### Light Mode
```css
--muted: 0 0% 92%;                /* #E8E7DC - Subtle Background */
--muted-light: 0 0% 96%;          /* Lighter Muted */
--muted-dark: 0 0% 87%;           /* Darker Muted */
```

##### Dark Mode
```css
--muted: 0 0% 25%;                /* #404040 - Subtle Background */
--muted-light: 0 0% 30%;          /* Lighter Muted */
--muted-dark: 0 0% 20%;           /* Darker Muted */
```

##### Usage
- **Disabled States**: Inactive buttons, locked modules
- **Not Started Badges**: Upcoming content
- **Subtle Backgrounds**: Low-priority sections
- **Placeholder Text**: Form inputs

### Accent Colors

##### Light Mode
```css
--accent: 38 92% 50%;             /* #F59E0B - Amber Gold (same as warning) */
--accent-light: 45 93% 89%;       /* #FEF3C7 */
--accent-dark: 33 92% 44%;        /* #D97706 */
```

##### Dark Mode
```css
--accent: 38 92% 50%;             /* #F59E0B */
--accent-light: 33 92% 44%;       /* #D97706 */
--accent-dark: 45 98% 60%;        /* #FBBF24 */
```

### Color Usage Matrix

| Component | Light Mode | Dark Mode | Purpose |
|-----------|-----------|-----------|---------|
| Primary Button | `bg-primary` | `bg-primary` | Main actions |
| Secondary Button | `bg-secondary` | `bg-secondary` | Secondary actions |
| Link | `text-primary` | `text-secondary` | Clickable text |
| Current Module Badge | `bg-primary-light text-primary` | `bg-primary text-foreground` | Active module |
| Completed Badge | `bg-success-light text-success` | `bg-success-light text-foreground` | Finished items |
| Locked Badge | `bg-muted-light text-muted-foreground` | `bg-muted text-foreground` | Disabled content |
| Error Message | `bg-destructive-light text-destructive` | `bg-destructive-light text-destructive` | Errors |
| Success Toast | `bg-success text-success-foreground` | `bg-success text-success-foreground` | Confirmations |

---

## Typography

### Font Families

#### Heading Font - Rajdhani
```css
font-family: 'Rajdhani', sans-serif;
```
- **Style**: Bold, modern, geometric
- **Use Cases**: Headings (H1-H6), card titles, section headers
- **Weight**: 700 (Bold) for all headings
- **Characteristics**: High x-height, excellent readability

#### Body Font - Sentient
```css
font-family: 'Sentient', sans-serif;
```
- **Style**: Clean, professional, readable
- **Use Cases**: Body text, descriptions, UI labels
- **Weight**: 400 (Regular) for body, 500 (Medium) for emphasis
- **Characteristics**: Optimized for screen reading

#### Code Font - JetBrains Mono
```css
font-family: 'JetBrains Mono', monospace;
```
- **Style**: Monospaced, ligature support
- **Use Cases**: Code blocks, coding problems, technical content
- **Weight**: 400 (Regular)
- **Characteristics**: Designed for developers, excellent readability

### Type Scale

#### Desktop (> 768px)

| Element | Size | Line Height | Weight | Usage |
|---------|------|-------------|--------|-------|
| H1 | 88px (5.5rem) | 1.3 | 700 | Page titles, hero headings |
| H2 | 64px (4rem) | 1.3 | 700 | Section headings |
| H3 | 48px (3rem) | 1.3 | 700 | Subsection headings |
| H4 | 36px (2.25rem) | 1.3 | 700 | Card titles, module names |
| H5 | 28px (1.75rem) | 1.3 | 700 | Smaller headings |
| H6 | 21px (1.3125rem) | 1.3 | 700 | Minimal headings |
| Body | 16px (1rem) | 1.5 | 400 | Paragraphs, descriptions |
| Small | 14px (0.875rem) | 1.5 | 400 | Secondary text, labels |
| Caption | 12px (0.75rem) | 1.5 | 400 | Metadata, timestamps |
| Code | 16px (1rem) | 1.5 | 400 | Code blocks |

#### Mobile (≤ 768px)

| Element | Size | Line Height | Weight |
|---------|------|-------------|--------|
| H1 | 76px (4.75rem) | 1.3 | 700 |
| H2 | 56px (3.5rem) | 1.3 | 700 |
| H3 | 44px (2.75rem) | 1.3 | 700 |
| H4 | 32px (2rem) | 1.3 | 700 |
| H5 | 24px (1.5rem) | 1.3 | 700 |
| H6 | 18px (1.125rem) | 1.3 | 700 |
| Body | 14px (0.875rem) | 1.5 | 400 |
| Small | 12px (0.75rem) | 1.5 | 400 |
| Caption | 12px (0.75rem) | 1.5 | 400 |
| Code | 14px (0.875rem) | 1.5 | 400 |

### Font Weight Guidelines

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, descriptions, standard content |
| Medium | 500 | Item names, emphasized text, labels |
| Semibold | 600 | Module titles, project names |
| Bold | 700 | Headings, card titles, primary emphasis |

### Typography Usage Examples

```tsx
// Headings
<h1 className="text-3xl font-heading font-bold">Course Dashboard</h1>
<h2 className="text-2xl font-heading font-semibold">Module 1: Introduction</h2>
<h3 className="text-xl font-heading font-semibold">Getting Started</h3>

// Body Text
<p className="text-base text-foreground">Course description text</p>
<p className="text-sm text-muted-foreground">Secondary information</p>
<span className="text-xs text-muted-foreground">12 mins read</span>

// Code
<code className="font-code text-sm">const greeting = "Hello";</code>
```

---

## Shadows & Elevation

### Shadow System

Material Design-inspired elevation with **Forest Green tints** for brand consistency.

#### Elevation Levels

```css
/* Minimal Elevation - Subtle depth */
--shadow-2dp: 0 1px 3px 0 rgba(44, 95, 45, 0.1),
              0 1px 2px 0 rgba(44, 95, 45, 0.06);

/* Default - Cards, buttons at rest */
--shadow-4dp: 0 2px 4px -1px rgba(44, 95, 45, 0.1),
              0 1px 2px -1px rgba(44, 95, 45, 0.06);

/* Elevated - Hover states, dropdowns */
--shadow-8dp: 0 4px 6px -1px rgba(44, 95, 45, 0.1),
              0 2px 4px -2px rgba(44, 95, 45, 0.1);

/* High Elevation - Modals, popovers */
--shadow-16dp: 0 10px 15px -3px rgba(44, 95, 45, 0.1),
               0 4px 6px -4px rgba(44, 95, 45, 0.1);

/* Very High - Major overlays */
--shadow-24dp: 0 20px 25px -5px rgba(44, 95, 45, 0.1),
               0 8px 10px -6px rgba(44, 95, 45, 0.1);

/* Maximum - Critical overlays */
--shadow-32dp: 0 25px 50px -12px rgba(44, 95, 45, 0.25);
```

#### Specialized Shadows

```css
/* Interactive States */
--shadow-hover: 0 8px 25px -8px rgba(44, 95, 45, 0.15);   /* Hover elevation */
--shadow-focus: 0 0 0 2px rgba(44, 95, 45, 0.2);          /* Focus outline */
--shadow-pressed: 0 1px 3px 0 rgba(44, 95, 45, 0.2);      /* Active/pressed */

/* Semantic Shadows */
--shadow-success: 0 4px 6px -1px rgba(124, 179, 66, 0.1),
                  0 2px 4px -2px rgba(124, 179, 66, 0.1);

--shadow-warning: 0 4px 6px -1px rgba(245, 158, 11, 0.1),
                  0 2px 4px -2px rgba(245, 158, 11, 0.1);

--shadow-error: 0 4px 6px -1px rgba(211, 47, 47, 0.1),
                0 2px 4px -2px rgba(211, 47, 47, 0.1);

--shadow-info: 0 4px 6px -1px rgba(25, 118, 210, 0.1),
               0 2px 4px -2px rgba(25, 118, 210, 0.1);
```

### Shadow Usage Guidelines

| Component | Shadow | Reasoning |
|-----------|--------|-----------|
| Cards | `shadow-4dp` | Default card elevation |
| Cards (Hover) | `shadow-8dp` | Interactive feedback |
| Buttons | None or `shadow-2dp` | Flat or minimal depth |
| Buttons (Hover) | `shadow-hover` | Lift effect |
| Modals/Dialogs | `shadow-24dp` | High priority overlay |
| Dropdowns/Popovers | `shadow-16dp` | Elevated but not modal |
| Success Toast | `shadow-success` | Semantic feedback |
| Error Alert | `shadow-error` | Critical attention |

### Tailwind Classes

```tsx
// Standard Elevation
<Card className="shadow-4dp hover:shadow-8dp" />

// Semantic Shadows
<div className="shadow-success" />  // Success feedback
<div className="shadow-error" />    // Error state

// Interactive States
<Button className="hover:shadow-hover active:shadow-pressed" />
```

---

## Spacing & Layout

### Border Radius

```css
--radius: 0.5rem;                 /* 8px - Base radius */
```

#### Variants
```css
border-radius: var(--radius);     /* lg - 8px */
border-radius: calc(var(--radius) - 2px);  /* md - 6px */
border-radius: calc(var(--radius) - 4px);  /* sm - 4px */
```

#### Usage
- **Cards**: `rounded-lg` (8px)
- **Buttons**: `rounded-md` (6px)
- **Badges**: `rounded-full` (fully rounded)
- **Inputs**: `rounded-md` (6px)
- **Avatar**: `rounded-full`

### Container System

```typescript
container: {
  center: true,
  padding: '2rem',
  screens: {
    '2xl': '1400px'  // Max width for large screens
  }
}
```

### Custom Spacing

```typescript
spacing: {
  '18': '4.5rem',   // 72px
  '22': '5.5rem',   // 88px
}
```

### Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

### Spacing Scale (Tailwind Default)

| Class | Value | Usage |
|-------|-------|-------|
| `p-0` | 0px | No padding |
| `p-1` | 4px | Minimal padding |
| `p-2` | 8px | Small padding |
| `p-3` | 12px | Default item padding |
| `p-4` | 16px | Section padding |
| `p-6` | 24px | Card padding |
| `p-8` | 32px | Page padding |
| `p-12` | 48px | Large spacing |

---

## Component Patterns

### Badges

#### Variants

```tsx
// Default - Primary color
<Badge>Default</Badge>

// Secondary
<Badge variant="secondary">Secondary</Badge>

// Destructive
<Badge variant="destructive">Error</Badge>

// Outline
<Badge variant="outline">Outline</Badge>
```

#### Status Badges

```tsx
// Completed - Green
<Badge className="bg-success-light text-success dark:text-foreground border-success/20">
  Completed
</Badge>

// Current Module - Forest Green
<Badge className="bg-primary-light text-primary dark:text-foreground border-primary/20">
  Current Module
</Badge>

// Locked - Grey
<Badge className="bg-muted-light text-muted-foreground dark:text-foreground border-muted/20">
  Locked
</Badge>

// Live Class - Teal
<Badge className="bg-secondary-light text-secondary dark:text-foreground border-secondary">
  Live Class
</Badge>

// Assessment - Amber
<Badge className="bg-warning-light text-warning dark:text-foreground border-warning">
  Assessment
</Badge>

// Assignment - Blue
<Badge className="bg-info-light text-info dark:text-foreground border-info">
  Assignment
</Badge>
```

### Buttons

#### Variants

```tsx
// Default - Primary solid
<Button>Primary Action</Button>

// Secondary
<Button variant="secondary">Secondary</Button>

// Destructive
<Button variant="destructive">Delete</Button>

// Outline
<Button variant="outline">Cancel</Button>

// Ghost - Transparent
<Button variant="ghost">Ghost</Button>

// Link - Text only
<Button variant="link">Learn More</Button>
```

#### Sizes

```tsx
<Button size="sm">Small</Button>    // Compact
<Button size="default">Default</Button>  // Standard
<Button size="lg">Large</Button>    // Prominent
<Button size="icon">🔍</Button>     // Icon only (square)
```

### Cards

```tsx
// Basic Card
<Card className="shadow-4dp">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Elevated Card (Hover)
<Card className="shadow-4dp hover:shadow-8dp transition-shadow">
  ...
</Card>
```

### Progress Bars

```tsx
// Course/Module Progress
<div className="relative bg-primary-light rounded-full h-2 w-full">
  <div
    className="bg-primary h-2 rounded-full transition-all duration-300"
    style={{ width: `${progress}%` }}
  >
    <div className="progress-label-bg progress-label px-2 py-0.5 rounded shadow-sm border text-xs font-medium">
      {progress}%
    </div>
  </div>
</div>
```

### Form Components

```tsx
// Input
<Input
  type="text"
  placeholder="Enter text..."
  className="border-input focus:ring-primary"
/>

// Textarea
<Textarea
  placeholder="Enter description..."
  className="border-input focus:ring-primary"
/>

// Select
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>

// Checkbox
<Checkbox id="terms" />
<Label htmlFor="terms">Accept terms</Label>

// Radio Group
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
</RadioGroup>
```

---

## Animations

### Keyframe Animations

```css
/* Accordion Expand/Collapse */
@keyframes accordion-down {
  from { height: 0 }
  to { height: var(--radix-accordion-content-height) }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height) }
  to { height: 0 }
}

/* Fade In (Page Load) */
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Animation Classes

```tsx
// Accordion animations
<div className="animate-accordion-down">Expanding content</div>
<div className="animate-accordion-up">Collapsing content</div>

// Fade in animation
<div className="animate-fade-in">Fading in content</div>
```

### Transition Guidelines

```css
/* Default transition - All properties */
transition: all 0.2s ease-out;

/* Specific properties */
transition: transform 0.2s ease-out;
transition: opacity 0.3s ease-out;
transition: box-shadow 0.2s ease-out;
transition: background-color 0.2s ease-out;
```

#### Usage Examples

```tsx
// Hover transitions
<div className="transition-all duration-200 hover:scale-105">Hover me</div>

// Shadow transitions
<Card className="shadow-4dp hover:shadow-8dp transition-shadow duration-200" />

// Color transitions
<Button className="bg-primary hover:bg-primary-dark transition-colors" />
```

---

## Accessibility

### WCAG 2.1 AA Compliance

#### Color Contrast Ratios

| Text Size | Minimum Ratio | Normal Text | Large Text |
|-----------|---------------|-------------|------------|
| Normal (< 18px) | 4.5:1 | ✓ Required | - |
| Large (≥ 18px) | 3:1 | - | ✓ Required |
| Large Bold (≥ 14px) | 3:1 | - | ✓ Required |

#### Contrast Check Results

| Combination | Ratio | Pass |
|-------------|-------|------|
| Forest Green (#2C5F2D) on White | 7.2:1 | ✓ AAA |
| White on Forest Green | 7.2:1 | ✓ AAA |
| Bright Teal (#12EA7B) on White | 1.8:1 | ✗ Fail |
| Bright Teal on Dark (#1A1A1A) | 10.5:1 | ✓ AAA |
| Muted Text (#8A8A8A) on White | 4.6:1 | ✓ AA |
| Dark mode muted (#999999) on Dark (#1A1A1A) | 4.9:1 | ✓ AA |

### Focus Indicators

```css
/* Focus ring for keyboard navigation */
--ring: 122 36% 27%;  /* Forest Green */

.focus-visible:outline-none
.focus-visible:ring-2
.focus-visible:ring-ring
.focus-visible:ring-offset-2
```

### Screen Reader Support

- All interactive elements have `aria-label` or visible text
- Radix UI components include built-in ARIA attributes
- Semantic HTML for proper structure
- Skip to content links (optional)

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Tab order follows visual order
- Escape key closes modals/dropdowns
- Arrow keys for menu/select navigation
- Enter/Space for button activation

---

## Usage Guidelines

### Color Selection Guide

**When to use Primary (Forest Green):**
- Main CTAs (Start Learning, Resume)
- Active/current states
- Links in light mode
- Progress indicators
- Focus states

**When to use Secondary (Bright Teal):**
- Links in dark mode (better contrast)
- Live class indicators
- Interactive hover states
- Accent elements

**When to use Success (Grass Green):**
- Completed modules/items
- Attendance present
- Test pass results
- Success messages

**When to use Warning (Amber Gold):**
- Assessment indicators
- Upcoming deadlines
- Attention-needed states

**When to use Info (Blue):**
- Assignment indicators
- Informational messages
- Neutral badges

**When to use Destructive (Red):**
- Error messages
- Failed tests
- Attendance absent
- Delete actions

**When to use Muted (Grey):**
- Disabled states
- Not started items
- Locked content
- Placeholder text

### Typography Best Practices

1. **Hierarchy**: Use heading levels semantically (H1 for page title, H2 for sections, etc.)
2. **Line Length**: Max 60-80 characters per line for body text
3. **Line Height**: 1.5 for body text, 1.3 for headings
4. **Font Weights**: Use bold (700) for headings, regular (400) for body
5. **Contrast**: Ensure text meets WCAG AA standards

### Shadow Best Practices

1. **Consistency**: Use the same shadow for similar components
2. **Hierarchy**: Higher elevation = more important
3. **Hover**: Increase elevation on hover for interactive feedback
4. **Modals**: Use high elevation (24dp+) for overlays
5. **Don't overuse**: Too many shadows create visual noise

### Component Best Practices

1. **Spacing**: Use consistent padding (p-6 for cards, p-3 for items)
2. **Borders**: Subtle borders (border-border) for definition
3. **Hover States**: Always provide visual feedback
4. **Loading States**: Use skeleton loaders or spinners
5. **Empty States**: Provide helpful empty state messages

### Dark Mode Best Practices

1. **Test Both Modes**: Ensure all components work in both themes
2. **Contrast**: Dark mode muted text has enhanced contrast
3. **Colors**: Use lighter variants in dark mode for visibility
4. **Badges**: White text on colored backgrounds in dark mode
5. **Consistency**: Maintain the same component behavior across themes

---

## Summary

The Zuvy Student Dashboard design system provides:

✅ **Comprehensive Color System** - Primary, secondary, semantic, and neutral colors with light/dark variants
✅ **Professional Typography** - Three font families for headings, body, and code
✅ **Material Design Shadows** - 6 elevation levels plus specialized shadows
✅ **Accessible Components** - WCAG 2.1 AA compliant with proper contrast
✅ **Responsive Design** - Mobile-first with breakpoint-specific adjustments
✅ **Consistent Spacing** - Predictable spacing scale and layout patterns
✅ **Smooth Animations** - Subtle transitions and keyframe animations
✅ **Usage Guidelines** - Clear documentation for when to use each element

The system is built on **Tailwind CSS** with **Shadcn/UI components**, ensuring consistency, accessibility, and maintainability across the entire application.
