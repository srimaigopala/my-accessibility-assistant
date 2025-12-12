# GenAI Accessibility Assistant

## Overview

This is an AI-powered accessibility assistant web application designed to help users with visual, cognitive, reading, or motor impairments interact with digital content. The application provides text simplification, summarization, image interpretation with OCR, and voice-assisted navigation. Built with accessibility-first principles targeting WCAG 2.1 AA compliance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: React Context for global state (ThemeContext, AccessibilityContext) and TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming, supporting light/dark modes
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful API with `/api` prefix
- **Static Serving**: Express serves built frontend assets in production

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains database table definitions
- **Migrations**: Drizzle Kit manages database migrations in `./migrations`
- **Current Storage**: In-memory storage implementation (`MemStorage`) for development, ready for PostgreSQL connection via `DATABASE_URL`

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # UI components (feature + shadcn/ui)
│   │   ├── contexts/     # React contexts (Theme, Accessibility)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and query client
│   │   └── pages/        # Route pages (Landing, Workspace)
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data storage interface
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between frontend/backend
│   └── schema.ts     # Drizzle database schema
└── migrations/       # Database migration files
```

### Key Design Patterns
- **Accessibility-First**: All components support screen readers, keyboard navigation, high contrast modes, and adjustable font sizes
- **Three-Panel Workspace**: Input panel, preview panel, and results panel layout for the main workspace
- **Progressive Enhancement**: Features degrade gracefully for different ability levels
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## External Dependencies

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library
- **wouter**: Lightweight routing
- **radix-ui/***: Accessible UI primitives (dialog, dropdown, tabs, etc.)
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Backend Libraries
- **express**: Web server framework
- **drizzle-orm**: Database ORM
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

### AI/Processing (To Be Integrated)
- **@google/generative-ai**: Google Gemini API (listed in dependencies)
- **openai**: OpenAI API (listed in dependencies)
- Browser Web Speech API for voice input/output

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **drizzle-kit**: Database migration tool

### Development Tools
- **Vite**: Development server with HMR
- **TypeScript**: Type checking
- **esbuild**: Production bundling for server