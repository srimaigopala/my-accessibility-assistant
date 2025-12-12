# Design Guidelines: GenAI Accessibility Assistant

## Design Approach
**Accessibility-First Design System** - This application prioritizes WCAG 2.1 AA compliance with high contrast, large typography, and assistive technology support. Drawing inspiration from productivity tools like Notion for clean information architecture, combined with healthcare accessibility standards for universal usability.

## Core Design Principles
1. **Universal Accessibility**: Every element must be perceivable, operable, understandable, and robust
2. **Clarity Over Aesthetics**: Function drives form; visual decisions must enhance usability
3. **Progressive Enhancement**: Features degrade gracefully for different ability levels

---

## Typography

**Font Families:**
- Primary: `Inter` (via Google Fonts) - clean, highly legible
- Alternative: `OpenDyslexic` (user-selectable for dyslexia support)

**Type Scale:**
- Hero Headline: `text-5xl md:text-6xl font-bold` (48px/60px)
- Section Headings: `text-3xl md:text-4xl font-semibold` (30px/36px)
- Subsection: `text-xl md:text-2xl font-medium` (20px/24px)
- Body Text: `text-base md:text-lg` (16px/18px) - minimum for accessibility
- UI Labels: `text-sm md:text-base font-medium` (14px/16px)
- Small Text: `text-sm` (14px) - use sparingly

**Line Height:** 
- Headings: `leading-tight` (1.25)
- Body: `leading-relaxed` (1.75) - enhanced readability

---

## Layout System

**Spacing Units:** Tailwind units of `4, 6, 8, 12, 16, 24`
- Component padding: `p-6` or `p-8`
- Section spacing: `py-12 md:py-16 lg:py-24`
- Card spacing: `space-y-6`
- Button padding: `px-6 py-4`

**Container Widths:**
- Landing page sections: `max-w-7xl mx-auto px-6`
- Workspace panels: Full-width with internal `max-w-6xl`
- Text content: `max-w-4xl` for optimal reading

**Grid System:**
- Features: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- Three-panel workspace: `grid-cols-1 lg:grid-cols-3 gap-6`

---

## Color Palette

**High Contrast Mode (Default):**
- Primary: Blue `#2563EB` (accessible blue)
- Secondary: Purple `#7C3AED`
- Background: White `#FFFFFF`
- Text: Near-black `#1F2937`
- Borders: `#E5E7EB`

**Dark Mode:**
- Background: `#0F172A`
- Text: `#F1F5F9`
- Surface: `#1E293B`
- Borders: `#334155`

**Status Colors (WCAG compliant):**
- Success: `#059669`
- Warning: `#D97706`
- Error: `#DC2626`
- Info: `#0284C7`

---

## Component Library

### Navigation
- **Header:** Full-width sticky header with `backdrop-blur-sm bg-white/90`, height `h-16 md:h-20`
- **Logo:** Left-aligned, `text-2xl font-bold` with accessibility icon
- **Nav Links:** `text-base font-medium` with `hover:text-primary` transition, `px-4 py-2` spacing
- **CTA Button:** Primary button style, right-aligned
- **Mobile:** Hamburger menu (3-line icon), full-screen overlay navigation

### Buttons
- **Primary:** Blue background, white text, `px-6 py-4 text-base md:text-lg font-semibold rounded-lg`
- **Secondary:** White background, blue border, blue text
- **Large CTA:** `px-8 py-5 text-lg`
- **Focus States:** `focus:ring-4 focus:ring-blue-300` for keyboard navigation
- **Disabled:** `opacity-50 cursor-not-allowed`

### Cards
- **Container:** `bg-white rounded-xl shadow-md border border-gray-200 p-8`
- **Dark Mode:** `bg-slate-800 border-slate-700`
- **Hover:** `hover:shadow-lg transition-shadow duration-300`

### Forms & Inputs
- **Text Input:** Large `h-14` minimum, `text-lg`, high contrast borders `border-2`
- **Labels:** `text-base font-medium mb-2` positioned above inputs
- **Focus:** `focus:ring-4 focus:border-blue-500` with clear visual indicator
- **Upload Buttons:** Dashed border `border-2 border-dashed`, drag-and-drop zone `min-h-[200px]`

### Panels (Workspace)
- **Three-Column Layout:** Equal widths on desktop `lg:grid-cols-3`, stack on mobile
- **Left Panel:** Input controls, `bg-gray-50` background, `p-6`
- **Center Panel:** Content preview, white background, `p-8`
- **Right Panel:** AI results with tabbed interface, `bg-gray-50`, `p-6`

### Tabs
- **Active Tab:** `border-b-2 border-blue-600 text-blue-600 font-semibold`
- **Inactive:** `text-gray-600 hover:text-gray-900`
- **Container:** `border-b border-gray-200 mb-6`

---

## Page-Specific Layouts

### Landing Page
1. **Hero Section:** `min-h-screen` with centered content, large headline, subtitle, primary CTA
2. **Features Grid:** 3-column on desktop showcasing key capabilities (Simplify, Summarize, Interpret)
3. **How It Works:** 3-step process with numbered cards
4. **Demo Preview:** Screenshot/mockup of workspace interface
5. **Accessibility Statement:** Dedicated section with WCAG badge
6. **Footer:** Multi-column with links, social, newsletter signup

### Workspace Interface
- **Fixed Header:** Navigation remains accessible
- **Three-Panel Layout:** Fluid, resizable on larger screens
- **Floating Action Buttons:** Voice input, settings (bottom-right on mobile)
- **Results Display:** Scrollable with sticky tab navigation

### Settings Panel
- **Slide-out Drawer:** From right side, `w-full md:w-96`
- **Grouped Controls:** Visual preferences, audio preferences, language
- **Toggles:** Large touch targets `h-12`, clear on/off states
- **Sliders:** Visible current value, `h-2` track, `h-6` thumb

---

## Images

**Hero Section:**
- Large hero image showing diverse users interacting with assistive technology
- Image placement: Full-width background with gradient overlay for text contrast
- Alternative: Illustration of AI assistant helping users with documents/screens

**Feature Sections:**
- Icons for each feature (text simplification, voice control, OCR) - use Heroicons
- Screenshots of workspace showing each AI tool in action
- Before/after examples of text simplification

---

## Accessibility Features

- **ARIA Labels:** Every interactive element
- **Keyboard Navigation:** Visible focus rings `ring-4`, logical tab order
- **Skip Links:** "Skip to main content" at page top
- **Screen Reader Text:** `sr-only` class for context
- **Alt Text:** Descriptive for all images
- **Contrast Ratios:** Minimum 4.5:1 for text, 3:1 for UI components
- **Font Size Controls:** User-adjustable from settings, persist in localStorage
- **Motion Reduction:** Respect `prefers-reduced-motion`

---

## Animations

**Minimal, purposeful only:**
- Page transitions: `transition-opacity duration-300`
- Button interactions: `transition-colors duration-200`
- Panel slides: `transition-transform duration-300`
- NO decorative animations that could distract or disorient

---

## Responsive Breakpoints
- Mobile: Base styles (< 768px)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)
- Large Desktop: `xl:` (1280px+)