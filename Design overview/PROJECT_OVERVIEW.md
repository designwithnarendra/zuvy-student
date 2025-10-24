# Zuvy Student Dashboard - Project Overview

## Table of Contents
- [Project Description](#project-description)
- [Key Achievements](#key-achievements)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Core Features](#core-features)
- [Pages & Routes](#pages--routes)
- [Architecture Patterns](#architecture-patterns)
- [Content Types](#content-types)
- [Data Structures](#data-structures)

---

## Project Description

**Zuvy Student Dashboard** (Neural Nexus Learning Platform) is a sophisticated learning management system (LMS) designed to provide students with an interactive, feature-rich platform for managing their educational journey. The platform enables students to:

- Enroll in multiple courses and track progress
- Access diverse learning materials (videos, articles, live classes)
- Complete assignments and projects
- Take assessments with proctoring features
- Solve coding problems in an interactive environment
- Monitor academic performance and attendance
- Engage with a modern, responsive interface

### Target Users
- Students enrolled in online/hybrid learning programs
- Learners from diverse backgrounds (70%+ women learners)
- Students across India (18 states)
- Bootcamp participants preparing for tech careers

### Purpose
The platform serves as the central hub for students in India's bootcamp ecosystem, focusing on full-stack development education. It provides a comprehensive learning experience from course enrollment through completion, with emphasis on:
- Self-paced learning with structured guidance
- Progress tracking and analytics
- Interactive assessments and coding challenges
- Professional skill development

---

## Key Achievements

- **2000+ Learners** across 18 states in India
- **400+ Internships** secured by students
- **70%+ Women** participation in tech education
- **10-month** intensive bootcamp format
- **Full-stack** development curriculum focus

---

## Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern UI development with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.1** - Fast build tool and development server
- **React Router DOM 6.26.2** - Client-side routing

### UI Component Library
- **Shadcn/UI** - Accessible component library built on Radix UI
- **Radix UI Primitives** - Headless UI components for accessibility
- **40+ Pre-built Components** including:
  - Forms (Input, Textarea, Checkbox, Radio, Select, Date Picker)
  - Navigation (Tabs, Navigation Menu, Breadcrumb, Pagination)
  - Data Display (Table, Card, Badge, Progress, Avatar)
  - Overlays (Dialog, Alert Dialog, Drawer, Sheet, Popover, Tooltip)
  - Advanced (Carousel, Resizable Panels, Scroll Area, Command Menu)

### Styling
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Custom Design System** - Forest Green theme with dark mode
- **CSS Variables** - Dynamic theming

### State Management & Data
- **TanStack React Query 5.56.2** - Server state management
- **React Hook Form 7.53.0** - Form state and validation
- **Zod 3.23.8** - Schema validation
- **Custom Theme Context** - Light/dark mode with locking

### Utilities & Libraries
- **Lucide React 0.462.0** - Icon library (1000+ icons)
- **Recharts 2.12.7** - Data visualization and charts
- **Date-fns 3.6.0** - Date manipulation
- **Sonner 1.5.0** - Toast notifications
- **Next-themes 0.3.0** - Theme management

### Development Tools
- **ESLint** - Code linting
- **Vite React SWC** - Fast refresh
- **TypeScript** - Type checking
- **Lovable Tagger** - Component tagging (development only)

---

## Project Structure

```
zuvy-student-dashboard-idea2/
├── src/
│   ├── pages/                          # Route-level page components
│   │   ├── Index.tsx                  # Landing/redirect page
│   │   ├── Login.tsx                  # Authentication
│   │   ├── StudentDashboard.tsx       # Main course dashboard
│   │   ├── CourseDashboard.tsx        # Single course overview
│   │   ├── CurriculumPage.tsx         # Course curriculum
│   │   ├── CourseSyllabusPage.tsx     # Detailed syllabus
│   │   ├── ModuleContentPage.tsx      # Module content viewer
│   │   ├── AssessmentPage.tsx         # Assessment interface
│   │   ├── CodingProblemPage.tsx      # Coding challenges
│   │   ├── ProjectPage.tsx            # Project management
│   │   ├── SolutionViewerPage.tsx     # Solution comparison
│   │   └── NotFound.tsx               # 404 page
│   │
│   ├── components/                    # Reusable components
│   │   ├── ui/                        # Shadcn/UI components (40+)
│   │   ├── Header.tsx                 # Top navigation
│   │   ├── CourseInfoBanner.tsx       # Course header
│   │   ├── ModuleCard.tsx             # Module display
│   │   ├── ModuleSidebar.tsx          # Module navigation
│   │   ├── ModuleContentRenderer.tsx  # Dynamic content
│   │   ├── AssessmentView.tsx         # Assessment interface
│   │   ├── CodingChallenge.tsx        # Code editor
│   │   ├── WhatsNextCard.tsx          # Upcoming items
│   │   ├── AttendanceCard.tsx         # Attendance stats
│   │   └── [50+ more components]
│   │
│   ├── lib/                           # Utilities and data
│   │   ├── mockData.ts                # Mock course/student data
│   │   ├── ThemeProvider.tsx          # Theme context
│   │   └── utils.ts                   # Utility functions
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── use-mobile.tsx             # Mobile detection
│   │   └── use-toast.ts               # Toast notifications
│   │
│   ├── App.tsx                        # Main app with routing
│   ├── main.tsx                       # React DOM entry
│   ├── index.css                      # Global styles
│   └── App.css                        # App-specific styles
│
├── public/                            # Static assets
│   ├── _redirects                     # Netlify SPA routing
│   ├── favicon.ico
│   └── placeholder.svg
│
├── Design overview/                   # Documentation
│   ├── PROJECT_OVERVIEW.md            # This file
│   └── DESIGN_SYSTEM.md               # Design system guide
│
├── vite.config.ts                     # Vite configuration
├── tailwind.config.ts                 # Tailwind configuration
├── tsconfig.json                      # TypeScript config
├── netlify.toml                       # Netlify deployment
├── package.json                       # Dependencies
└── README.md                          # Quick start guide
```

---

## Core Features

### 1. Dashboard & Course Management

#### Multi-Course Dashboard
- View all enrolled and completed courses
- Filter courses by status (Enrolled/Completed)
- Visual progress tracking for each course
- Quick access to course materials

#### Course Cards
- Course image and branding
- Instructor information with avatar
- Progress bar with percentage
- Batch name, duration, enrollment count
- Action buttons (Start Learning, Resume Learning, View Course)
- Upcoming items preview (3 items)

#### Course Overview
- Comprehensive course information banner
- Module listing with progress indicators
- Project cards with submission status
- Attendance statistics and history
- "What's Next" widget with recommended items

### 2. Learning Modules

#### Module Organization
- Courses divided into modules
- Modules contain multiple topics
- Topics contain various content items
- Hierarchical content structure

#### Module Features
- Progress tracking per module
- Lock/unlock mechanism (prerequisite-based)
- Current module highlighting
- Completion status badges
- Module navigation controls

#### Content Navigation
- Sidebar navigation with topic/item selection
- Breadcrumb navigation
- Previous/Next navigation
- Mobile-responsive drawer
- Auto-expand active topic

### 3. Content Types (9 Types)

The platform supports diverse learning content:

#### 1. **Live Classes**
- Scheduled date/time display
- Meeting link integration
- Attendance tracking
- Duration recording
- Present/Absent status
- Recording availability post-session

#### 2. **Videos**
- Video playback interface
- Progress tracking (watched %)
- Resume from last position
- Duration display
- Completion marking

#### 3. **Articles**
- Text-based learning content
- Read status tracking
- Estimated reading time
- Completion marking

#### 4. **Assignments**
- Due date display and tracking
- Submission link upload
- File attachment support
- Status: Not Started, In Progress, Submitted
- Late submission warnings

#### 5. **Assessments**
- Multiple question types (MCQ, Open-ended)
- Timed assessments
- Proctoring features
- Score calculation
- Multiple attempt support
- Pass/fail status

#### 6. **Quizzes**
- MCQ format
- Instant feedback
- Score display
- Answer review
- Completion tracking

#### 7. **Coding Problems**
- Interactive code editor
- Test case execution
- Difficulty levels (Easy, Medium, Hard)
- Solution submission
- Performance metrics
- Test case results

#### 8. **Feedback Forms**
- Instructor feedback collection
- Question-based forms
- Text input support
- Submission tracking

#### 9. **Recordings**
- Recorded class playback
- Video controls
- Watch percentage tracking
- Duration display

### 4. Assessment & Testing System

#### Assessment Features
- **Multiple Question Types**: MCQ, Open-ended, Coding problems
- **Assessment States**: Not Attempted, Scheduled, In Progress, Completed, Expired
- **Time Management**: Countdown timers, duration tracking, scheduled start times
- **Scoring System**: Pass scores, multiple attempts, score history
- **Results Display**: Score breakdown, question-by-question review

#### Proctoring Features
- **Fullscreen Enforcement**: Detects and warns when exiting fullscreen
- **Theme Locking**: Prevents dark mode toggle during assessment
- **Violation Tracking**: Counts and records violations
- **Tab Switch Monitoring**: Detects focus loss
- **Exit Warnings**: Confirmation dialogs before leaving
- **Academic Integrity**: Violation modals with consequences

#### Assessment Flow
1. View instructions and details
2. Start assessment (with confirmation)
3. Answer questions in timed environment
4. Proctoring enforcement
5. Submit assessment
6. View results and feedback

### 5. Coding Challenge Environment

#### Code Editor Features
- Line-numbered code input
- Syntax highlighting
- Template code with placeholders
- Code submission
- Solution comparison

#### Test Execution
- Run code against test cases
- Real-time results (✓/✗)
- Output display panel
- Memory usage tracking
- Execution time metrics
- Test case visualization

#### Challenge Management
- Difficulty indication
- Problem description
- Input/output examples
- Constraints display
- Test case results
- Solution submission with confirmation

### 6. Progress Tracking & Analytics

#### Student Progress
- **Course-level**: Overall progress percentage, module completion
- **Module-level**: Topic completion, item status
- **Item-level**: Individual completion tracking
- **Visual Indicators**: Progress bars, status badges, checkmarks

#### Attendance System
- Attendance percentage calculation
- Attended vs Total classes
- Recent class attendance list
- Attendance status (Present/Absent)
- Attendance duration tracking

#### Upcoming Items Widget
- Time-aware event display
- Multiple item types (classes, assessments, assignments)
- Countdown timers ("Starts in X days")
- Actionable items with CTAs
- "View All" modal for complete list

#### Submission Statistics
- Total submissions count
- Status breakdown
- Completion metrics
- Visual statistics display

### 7. Project Management

#### Project Features
- Project title and description
- Due date tracking
- Submission status (Not Submitted/Submitted)
- Submission link upload
- File attachments
- Solution viewing for completed projects

#### Project Actions
- View project details
- Submit solution
- View submitted solution
- Track submission status

### 8. User Interface Features

#### Theme System
- **Light Mode**: Warm off-white background, forest green accents
- **Dark Mode**: Deep charcoal background, bright teal accents
- **Theme Toggle**: Header-based theme switcher
- **Theme Persistence**: LocalStorage-based preference saving
- **Theme Locking**: Disabled during assessments/coding challenges
- **System Preference**: Auto-detect system theme

#### Responsive Design
- **Mobile-First**: Optimized for small screens
- **Tablet Support**: Medium breakpoint adjustments
- **Desktop Layouts**: Large screen optimizations
- **Touch-Friendly**: Adequate touch targets
- **Drawer Navigation**: Mobile sidebar drawer

#### Navigation
- **Header**: Logo, Dashboard link, Syllabus link, Theme toggle, Logout
- **Breadcrumbs**: Hierarchical navigation path
- **Sidebar**: Module and topic navigation
- **Tabs**: Content organization
- **Pagination**: Long list navigation

#### Notifications
- **Toast Messages**: Success, error, info notifications
- **Sonner Integration**: Modern toast library
- **Shadcn/UI Toasts**: Alternative toast system
- **Warning Modals**: Critical alerts

#### Visual Components
- **Cards**: Elevation-based card system
- **Badges**: Status indicators with colors
- **Progress Bars**: Visual progress tracking
- **Avatars**: User and instructor images
- **Icons**: Lucide icon library (1000+ icons)
- **Charts**: Recharts for data visualization

---

## Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Login | User authentication with social proof carousel |
| `/home` | Index | Landing page with enrollment-based redirect logic |
| `/dashboard` | StudentDashboard | Multi-course dashboard with filter (enrolled/completed) |
| `/course/:courseId` | CourseDashboard | Course overview with modules, projects, stats, upcoming |
| `/course/:courseId/syllabus` | CourseSyllabusPage | Complete curriculum structure and content outline |
| `/course/:courseId/module/:moduleId` | ModuleContentPage | Module content viewer with sidebar navigation |
| `/course/:courseId/project/:projectId` | ProjectPage | Project details, submission, and solution viewing |
| `/assessment/:courseId/:moduleId/:assessmentId` | AssessmentPage | Assessment taking interface with proctoring |
| `/assessment/:assessmentId` | AssessmentPage | Standalone assessment (alternative route) |
| `/solution-viewer/:itemId` | SolutionViewerPage | Compare submitted vs expected solutions |
| `/coding-problem/:itemId` | CodingProblemPage | Coding challenge environment with editor |
| `*` | NotFound | 404 error page for undefined routes |

---

## Architecture Patterns

### State Management

#### Theme Management
- **Pattern**: Context API with custom provider
- **File**: `src/lib/ThemeProvider.tsx`
- **Features**:
  - Light/Dark theme toggle
  - LocalStorage persistence
  - System preference detection
  - Theme locking mechanism (assessments)
  - Theme-aware components

#### Module Session State
- **Pattern**: useReducer with actions
- **File**: `src/pages/ModuleContentPage.tsx`
- **Actions**:
  - Initialize module with items
  - Update item status
  - Submit assignments/quizzes/feedback
  - Track video/article consumption
  - Manage assessment attempts
  - Record coding problem completions

#### Form State
- **Pattern**: React Hook Form + Zod validation
- **Usage**: Assessment forms, submission forms, feedback forms
- **Benefits**: Type-safe validation, easy error handling

#### Server State (Future)
- **Pattern**: TanStack React Query
- **Current**: Mock data in `src/lib/mockData.ts`
- **Ready for**: API integration with minimal changes

### Security & Proctoring

#### Assessment Security
- **Fullscreen Enforcement**: Browser Fullscreen API
- **Tab Monitoring**: Visibility API for focus tracking
- **Theme Locking**: Disabled theme toggle during exams
- **Violation Tracking**: Count and modal warnings
- **Exit Prevention**: Confirmation dialogs

#### Data Persistence
- **Session Storage**: Quiz/assessment answers per session
- **Local Storage**: Theme preferences
- **URL State**: Query parameters for view modes

### Responsive Design

#### Breakpoint Strategy
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1400px

#### Mobile Patterns
- Drawer-based navigation
- Stacked layouts
- Touch-friendly sizing
- Simplified interfaces
- Mobile-specific components

### Component Architecture

#### Composition Pattern
- Small, focused components
- Prop-based customization
- Children for flexibility
- Compound components

#### Polymorphic Components
- `TopicItem` supports 9+ content types
- Dynamic rendering based on type
- Extensible for new content types

---

## Content Types

### Content Type Matrix

| Type | Status Tracking | Submission | Time-based | Interactive |
|------|----------------|------------|------------|-------------|
| Live Class | Attendance | ✗ | ✓ (Scheduled) | ✓ (Meeting link) |
| Video | Watched % | ✗ | ✗ | ✓ (Playback) |
| Article | Read | ✗ | ✗ | ✗ |
| Assignment | Submitted | ✓ (Link) | ✓ (Due date) | ✗ |
| Assessment | Completed | ✓ (Answers) | ✓ (Duration) | ✓ (Questions) |
| Quiz | Completed | ✓ (Answers) | ✗ | ✓ (MCQ) |
| Coding Problem | Completed | ✓ (Code) | ✗ | ✓ (Editor/Tests) |
| Feedback | Submitted | ✓ (Responses) | ✗ | ✓ (Form) |
| Recording | Watched % | ✗ | ✗ | ✓ (Playback) |

---

## Data Structures

### Key Interfaces

#### Student
```typescript
interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
```

#### Course
```typescript
interface Course {
  id: string;
  name: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
  };
  image: string;
  progress: number;              // 0-100
  status: 'enrolled' | 'completed';
  batchName: string;
  duration: string;
  studentsEnrolled: number;
  upcomingItems: UpcomingItem[];
  modules: Module[];
  projects: Project[];
  attendanceStats: {
    percentage: number;
    attended: number;
    total: number;
    recentClasses: RecentClass[];
  };
  currentModule: {
    id: string;
    name: string;
    currentChapter: string;
    currentItem: string;
    nextItem: string;
    isJustStarting: boolean;
  };
}
```

#### Module
```typescript
interface Module {
  id: string;
  name: string;
  topics: Topic[];
  isLocked?: boolean;
  lockReason?: string;
}
```

#### Topic
```typescript
interface Topic {
  id: string;
  name: string;
  description: string;
  items: TopicItem[];
}
```

#### TopicItem (Polymorphic)
```typescript
interface TopicItem {
  id: string;
  type: 'live-class' | 'video' | 'article' |
        'assignment' | 'assessment' | 'quiz' |
        'feedback' | 'coding-problem' | 'recording';
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';

  // Type-specific properties
  duration?: string;
  dueDate?: Date;
  scheduledDateTime?: Date;
  meetLink?: string;
  videoUrl?: string;
  recordingUrl?: string;
  submissionLink?: string;
  testCasesPassed?: number;
  totalTestCases?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  // ... 20+ optional properties
}
```

#### Project
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  status: 'not-submitted' | 'submitted';
  dueDate: string;
  submissionLink?: string;
  attachments?: string[];
}
```

#### UpcomingItem
```typescript
interface UpcomingItem {
  id: string;
  type: 'class' | 'assessment' | 'assignment';
  title: string;
  dateTime: Date;
  canStart: boolean;
  actionText: string;
}
```

---

## Mock Data Context

The application uses comprehensive mock data to simulate a realistic learning environment:

### Mock Student
- **Name**: Alex Johnson
- **Email**: alex.johnson@example.com
- **Avatar**: Profile image

### Mock Courses (2)
1. **Full Stack JavaScript Development** (Enrolled - 68% progress)
2. **Advanced Web Development** (Completed - 100%)

### Mock Modules (5 per course)
- Module 1: Introduction to Web Development (100%)
- Module 2: JavaScript Fundamentals (65%)
- Module 3: React Basics (0% - Current)
- Module 4: Backend Development (Locked)
- Module 5: Full Stack Projects (Locked)

### Mock Content Items (60+)
- 15+ Live Classes with varied attendance
- 10+ Videos with progress tracking
- 8+ Articles
- 6+ Assignments with due dates
- 5+ Assessments with different states
- 5+ Coding Problems (Easy to Hard)
- 3+ Feedback Forms
- 8+ Recordings

### Mock Projects (Multiple)
- Project 1: Build a Todo App (Submitted)
- Project 2: Weather Dashboard (Not Submitted)
- Project 3: Blog Platform (Not Submitted)

### Mock Upcoming Items
- Live Class: Advanced React Patterns (Starts in 1 day)
- Assessment: React Fundamentals Quiz (Starts in 2 days)
- Assignment: Build a Todo App (Due in 3 days)

---

## Summary

The **Zuvy Student Dashboard** is a modern, comprehensive learning platform built with React, TypeScript, and Vite. It provides:

✅ **Multi-course management** with progress tracking
✅ **9 diverse content types** for flexible learning
✅ **Robust assessment system** with proctoring
✅ **Interactive coding environment** with test execution
✅ **Dark mode support** with custom theming
✅ **Fully responsive** mobile-first design
✅ **Type-safe development** with TypeScript
✅ **Accessible UI** using Shadcn/Radix components
✅ **Modular architecture** for maintainability
✅ **Production-ready** with Netlify deployment config

The platform serves India's bootcamp ecosystem with proven outcomes: **2000+ learners**, **400+ internships secured**, and **70%+ women participation** in tech education.
