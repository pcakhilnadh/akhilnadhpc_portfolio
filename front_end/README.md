# Portfolio Frontend

A modern, responsive React portfolio application built with TypeScript, Vite, and Tailwind CSS. Features a beautiful UI with static content driven by local TypeScript data files, meaning no backend server is required.

## 🏗️ Architecture

The frontend follows modern React patterns with a clean, component-based architecture:

```
src/
├── components/          # Reusable UI components
│   ├── about/          # About page components
│   ├── common/         # Shared components (Navbar, Footer, etc.)
│   ├── home/           # Home page components
│   ├── projects/       # Projects page components
│   ├── skills/         # Skills page components
│   ├── timeline/       # Timeline page components
│   └── ui/             # Base UI components (shadcn/ui)
├── data/               # Static data configurations (TypeScript)
├── hooks/              # Custom React hooks (for mapping data)
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

### Design Patterns
- **Static Monolithic App**: No external API or backend needed. Data is compiled into the app.
- **Component-Based Architecture**: Modular, reusable components.
- **TypeScript**: Full type safety throughout the application.
- **Responsive Design**: Mobile-first approach with Tailwind CSS.
- **Theme Support**: Dark/Light mode with smooth transitions.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Alternative Commands

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Lint and fix:**
```bash
npm run lint
```

## 📱 Pages & Features

### 🏠 Home Page
- **Hero Section**: Dynamic profile image with fallback to initials.
- **Personal Information**: Name, tagline, summary, and experience.
- **Contact Button**: Modal with contact information.

### 👤 About Page
- **User Profile Card**: Complete personal information with profile image.
- **Biography Card**: Detailed personal story and background.
- **Skills Overview**: Categorized skills with radar chart.
- **Hobbies & Interests**: Personal interests display.

### 🛠️ Skills Page
- **Skills Categories**: Organized by skill type.
- **Skill Ratings**: Visual representation of skill levels.
- **Interactive Charts**: Radar charts for skill visualization.

### 📁 Projects Page
- **Project Cards**: Detailed project information.
- **Technology Tags**: Skills used in each project.
- **Live Links**: GitHub and live demo links.

### 📅 Timeline Page
- **Work Experience**: Chronological work history.
- **Company Details**: Role, duration, and achievements.
- **Interactive Timeline**: Visual representation of career progression.

## 🎨 UI Components

### Base Components (shadcn/ui)
- **Button**: Styled buttons with variants.
- **Card**: Content containers with shadows.
- **Dialog**: Modal dialogs and popups.
- **Badge**: Status and category indicators.

### Custom Components
- **Navbar**: Navigation with dynamic welcome text.
- **Footer**: Application footer.
- **ContactModal**: Contact information modal.
- **ThemeProvider**: Dark/Light mode management.

## 📊 Data Management

Content is managed entirely through local TypeScript files located in `src/data/`:
- `personal.ts`: Updates your name, contact info, bio, and family details.
- `skills.ts`: Updates the list of your technical and soft skills.
- `projects.ts`: Your personal and professional projects.
- `timeline.ts`: Your work history.

### Custom Hooks
- **usePersonalData**: Fetches and formats data from `personal.ts`.
- **useSkillsData**: Fetches data from `skills.ts`.
- **useProjectsData**: Fetches data from `projects.ts`.
- **useTimelineData**: Fetches data from `timeline.ts`.
- **useTheme**: Theme management.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The resulting `dist/` directory can be hosted on any static site host (Vercel, Netlify, GitHub Pages, or an Nginx container).

### Docker Deployment
You can use the `Dockerfile` at the root of the project to build an Nginx container serving the static assets:
```bash
docker build -t portfolio-static .
docker run -p 8080:8080 portfolio-static
```

## 🧪 Testing

### Development Testing
```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build testing
npm run build
```

## 🤝 Contributing

1. Follow the existing component patterns.
2. Maintain TypeScript type safety.
3. Test responsive design.
4. Update documentation.

## 📄 License

This project is part of the portfolio application.