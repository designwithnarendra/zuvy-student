# Zuvy Student Dashboard

A modern, feature-rich learning management system (LMS) built with React, TypeScript, and Vite. Designed for students in India's bootcamp ecosystem to manage their educational journey with an intuitive, accessible interface.

## ✨ Key Features

- **Multi-Course Dashboard** - Manage multiple courses with progress tracking and filtering
- **9 Content Types** - Videos, articles, live classes, assessments, coding problems, assignments, quizzes, feedback forms, and recordings
- **Assessment System** - Proctored assessments with MCQ, open-ended questions, and coding challenges
- **Interactive Coding Environment** - Built-in code editor with test case execution and performance metrics
- **Dark Mode** - Custom Forest Green theme with full dark mode support
- **Progress Analytics** - Track course progress, attendance, and submission statistics
- **Fully Responsive** - Mobile-first design optimized for all screen sizes
- **Mock Data** - Ready-to-use mock data for development and demos

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: Shadcn/UI (Radix UI + Tailwind CSS)
- **Routing**: React Router DOM v6
- **State Management**: TanStack React Query + React Hook Form
- **Styling**: Tailwind CSS with custom theme system
- **Icons**: Lucide React (1000+ icons)
- **Charts**: Recharts for data visualization
- **Validation**: Zod for schema validation

## 📋 Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

## 🛠️ Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd zuvy-student-dashboard-idea2

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at **http://localhost:8081**

### Available Scripts

```bash
npm run dev          # Start development server (port 8081)
npm run build        # Build for production
npm run build:dev    # Build with development mode
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── pages/              # Route-level page components
│   ├── StudentDashboard.tsx
│   ├── CourseDashboard.tsx
│   ├── ModuleContentPage.tsx
│   ├── AssessmentPage.tsx
│   └── ...
├── components/         # Reusable UI components
│   ├── ui/            # Shadcn/UI components (40+)
│   ├── Header.tsx
│   ├── ModuleCard.tsx
│   ├── AssessmentView.tsx
│   └── ...
├── lib/               # Utilities and mock data
│   ├── mockData.ts
│   ├── ThemeProvider.tsx
│   └── utils.ts
├── hooks/             # Custom React hooks
└── index.css          # Global styles and theme
```

## 🎨 Design System

The project uses a comprehensive design system featuring:

- **Primary Color**: Forest Green (#2C5F2D)
- **Secondary Color**: Bright Teal (#12EA7B)
- **Typography**: Rajdhani (headings), Sentient (body), JetBrains Mono (code)
- **Shadows**: Material Design-inspired elevation system (2dp to 32dp)
- **Dark Mode**: Full support with enhanced contrast

For detailed design system documentation, see:
- **[Design System Guide](Design%20overview/DESIGN_SYSTEM.md)** - Colors, typography, shadows, components
- **[Project Overview](Design%20overview/PROJECT_OVERVIEW.md)** - Features, architecture, data structures

## 🚢 Deployment

The project is configured for **Netlify** deployment:

### Deploy to Netlify

1. **Via Netlify UI**:
   - Connect your Git repository
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Drag & Drop**:
   ```bash
   npm run build
   # Drag the 'dist' folder to netlify.com/drop
   ```

### Deployment Files

- **`netlify.toml`** - Build configuration
- **`public/_redirects`** - SPA routing configuration

For detailed deployment instructions, see [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md)

## 📚 Key Technologies

### Core Framework
- **React 18** - Modern UI with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server with HMR

### UI Components
- **Shadcn/UI** - Accessible, customizable components
- **Radix UI** - Headless UI primitives
- **Tailwind CSS** - Utility-first styling

### Additional Libraries
- **React Router DOM** - Client-side routing
- **TanStack React Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Date-fns** - Date utilities
- **Sonner** - Toast notifications
- **Recharts** - Data visualization

## 📖 Documentation

- **[Project Overview](Design%20overview/PROJECT_OVERVIEW.md)** - Comprehensive project documentation
- **[Design System](Design%20overview/DESIGN_SYSTEM.md)** - Design tokens and usage guidelines
- **[Netlify Deployment](NETLIFY_DEPLOYMENT.md)** - Deployment guide

## 🎯 Features Breakdown

### Dashboard
- Multi-course management
- Course filtering (Enrolled/Completed)
- Progress tracking
- Upcoming items widget

### Learning Content
- Live classes with attendance tracking
- Video lectures with progress
- Articles and readings
- Assignments with submissions
- Assessments with proctoring
- Interactive coding challenges
- Quizzes and feedback forms

### Assessment Features
- Multiple question types (MCQ, open-ended, coding)
- Timed assessments with countdown
- Proctoring (fullscreen, tab monitoring, theme locking)
- Violation tracking
- Score calculation and feedback

### Coding Environment
- Syntax-highlighted code editor
- Test case execution
- Performance metrics (time, memory)
- Solution comparison
- Difficulty levels

### Progress Tracking
- Course-level progress
- Module completion tracking
- Attendance statistics
- Submission statistics

## 🔑 Login Credentials (Mock Data)

The application uses mock data. You can login with any credentials or click "Continue as Guest" on the login page.

**Mock Student**: Alex Johnson (alex.johnson@example.com)

## 🤝 Contributing

This is a demonstration project showcasing modern React development practices and LMS features. The codebase uses:

- TypeScript for type safety
- ESLint for code quality
- Prettier-compatible formatting
- Component-based architecture
- Mock data for easy development

## 📄 License

[Specify your license here]

## 🎓 About

Built for India's bootcamp ecosystem, serving 2000+ learners across 18 states with a focus on full-stack development education.

**Achievements**:
- 2000+ Learners
- 400+ Internships Secured
- 70%+ Women Participation
- 10-month Intensive Bootcamp Format

---

**Built with ❤️ using React, TypeScript, and Vite**
