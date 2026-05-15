# Akhil Nadh PC Portfolio

A modern, responsive personal portfolio application built with React, Vite, TypeScript, and Tailwind CSS. The portfolio is a monolithic, static frontend application where all data is managed via local TypeScript files for fast performance and easy maintenance.

## 🚀 Features
- **Static Monolithic Architecture**: Fast, lightweight, and easily deployable without the need for a backend server.
- **Dynamic Content Management**: Profile, skills, projects, certifications, and timeline are loaded from structured local TypeScript files (`src/data/`).
- **Modern UI/UX**: Responsive, accessible, and beautiful design with dark/light mode switching.
- **TypeScript**: End-to-end type safety.
- **Clean Architecture**: Component-based design, SOLID principles, and separation of concerns.

## 🏗️ Project Structure

```
akhilnadhpc_portfolio/
├── front_end/         # React frontend application
│   ├── src/           
│   │   ├── components/  # Reusable UI components
│   │   ├── data/        # Static data files (personal, projects, etc.)
│   │   ├── pages/       # Application views
│   │   ├── hooks/       # Custom React hooks
│   │   └── types/       # TypeScript definitions
│   ├── package.json
│   ├── tailwind.config.ts
│   └── vite.config.ts
├── Dockerfile         # Docker build for Nginx deployment
├── nginx.conf         # Nginx configuration
└── README.md          # Root documentation (this file)
```

## 🏛️ Application Architecture

The portfolio follows a clean frontend architecture with a clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Frontend Layer                                 │
│                         (React + TypeScript + Vite)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Pages     │  │ Components  │  │    Hooks    │  │    Types    │         │
│  │             │  │             │  │             │  │             │         │
│  │ • Home      │  │ • UI        │  │ • useAbout  │  │ • Data      │         │
│  │ • About     │  │ • Layout    │  │ • useSkills │  │ • API       │         │
│  │ • Skills    │  │ • Cards     │  │ • useProjects│ │ • Components│         │
│  │ • Projects  │  │ • Modals    │  │ • useTimeline│ │             │         │
│  │ • Timeline  │  │ • Charts    │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ 
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Data Layer                                     │
│                            (TypeScript)                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Personal  │  │   Skills    │  │  Projects   │  │Work Experience│       │
│  │             │  │             │  │             │  │             │         │
│  │ • Profile   │  │ • Categories│  │ • Projects  │  │ • Timeline  │         │
│  │ • Education │  │ • Levels    │  │ • Links     │  │ • Companies │         │
│  │ • Social    │  │             │  │ • Tags      │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Architecture Principles:**
- **No Backend**: Removed API calls in favor of local data mapping for improved speed and zero server dependencies.
- **Type Safety**: TypeScript provides complete type safety across components and data files.
- **Component Modularity**: UI is decoupled into reusable, self-contained elements.

## 🐳 Docker & Nginx Deployment

This project is fully containerized using a multi-stage Docker build. It builds the React application and serves the static files using Nginx.

### Quick Start (Docker)

This is the recommended way to run the application for production or local testing.

**1. Build the Docker Image:**
```bash
docker build -t portfolio-static .
```

**2. Run the Docker Container:**
```bash
docker run -d -p 8080:8080 --name my-portfolio portfolio-static
```

**3. Access the Application:**
Open your browser to [`http://localhost:8080`](http://localhost:8080)

## 💻 Local Development

If you want to run the application locally for development:

**1. Navigate to the frontend directory:**
```bash
cd front_end
```

**2. Install dependencies:**
```bash
npm install
```

**3. Start the development server:**
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## 🎨 Modifying Content

To update your portfolio details, you don't need to modify components. Just edit the local data files in `front_end/src/data/`:
- `personal.ts`: Basic profile information, social links, education.
- `skills.ts`: Skill categories and tools.
- `projects.ts`: Your portfolio projects and their associated links/technologies.
- `timeline.ts`: Work experience and career progression.

## 📄 License
This project is part of the personal portfolio of Akhil Nadh PC. Feel free to use as a template for your own portfolio!