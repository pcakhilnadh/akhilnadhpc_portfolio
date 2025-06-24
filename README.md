# Akhil Nadh PC Portfolio

A modern, full-stack personal portfolio application featuring a React (Vite + TypeScript + Tailwind CSS) frontend and a FastAPI backend. Built with clean architecture, modular design, and a focus on developer experience and maintainability.

## 🚀 Features
- **Dynamic Portfolio**: All content (profile, skills, projects, certifications, timeline) is loaded from a backend API and CSV data
- **Modern UI/UX**: Responsive, accessible, and beautiful design with dark/light mode
- **Profile Image Support**: Dynamic profile images with fallback to initials
- **Welcome Text System**: Personalized welcome text for each page
- **POST-based APIs**: Secure, consistent API design
- **CSV Data Source**: Easily update your data without code changes
- **TypeScript & Pydantic**: Type safety across the stack
- **Clean Architecture**: SOLID principles, separation of concerns, and modularity

## 🏗️ Monorepo Structure

```
akhilnadhpc_portfolio/
├── back_end/      # FastAPI backend (Python)
│   ├── app/       # Application code (models, routers, services, etc.)
│   ├── csv_data/  # CSV data files
│   └── ...
├── front_end/     # React frontend (Vite + TypeScript)
│   ├── src/       # Source code (components, hooks, pages, etc.)
│   └── ...
├── README.md      # Root documentation (this file)
└── ...
```

## 🏛️ Application Architecture

The portfolio follows a clean, layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Frontend Layer                                  │
│                         (React + TypeScript + Vite)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Pages     │  │ Components  │  │    Hooks    │  │    Types    │        │
│  │             │  │             │  │             │  │             │        │
│  │ • Home      │  │ • UI        │  │ • useAbout  │  │ • Data      │        │
│  │ • About     │  │ • Layout    │  │ • useSkills │  │ • API       │        │
│  │ • Skills    │  │ • Cards     │  │ • useProjects│ │ • Components│        │
│  │ • Projects  │  │ • Modals    │  │ • useTimeline│ │             │        │
│  │ • Timeline  │  │ • Charts    │  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ HTTP POST /api/*
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Backend Layer                                   │
│                           (FastAPI + Python)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Routers   │  │  Services   │  │Repositories │  │   Models    │        │
│  │             │  │             │  │             │  │             │        │
│  │ • /api/     │  │ • Business  │  │ • Data      │  │ • Pydantic  │        │
│  │ • /api/about│  │ • Logic     │  │ • Access    │  │ • Validation│        │
│  │ • /api/skills│ │ • Processing│  │ • CSV       │  │ • Serialization│      │
│  │ • /api/projects│ │             │  │ • Reading   │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ CSV Files
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Data Layer                                      │
│                              (CSV Files)                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Personal  │  │   Skills    │  │  Projects   │  │Work Experience│       │
│  │             │  │             │  │             │  │             │        │
│  │ • Profile   │  │ • Skills    │  │ • Projects  │  │ • Experience│        │
│  │ • Education │  │ • Categories│  │ • Achievements│ │ • Companies │        │
│  │ • Hobbies   │  │ • Levels    │  │ • ML Models │  │ • References │        │
│  │ • Social    │  │             │  │ • Skills    │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Architecture Principles:**
- **Separation of Concerns**: Each layer has a specific responsibility
- **Clean Architecture**: Dependencies flow inward (Frontend → Backend → Data)
- **Type Safety**: TypeScript frontend + Pydantic backend models
- **Data-Driven**: All content comes from CSV files, no hardcoded data
- **Modular Design**: Components, services, and repositories are loosely coupled
- **API-First**: Backend provides consistent POST-based API endpoints

## ✨ Key Advantages & Achievements

### 🏗️ **Architecture Benefits**
- **Clean Architecture**: Follows SOLID principles with clear separation of concerns
- **Scalable Design**: Easy to add new features without affecting existing code
- **Type Safety**: End-to-end type safety with TypeScript + Pydantic validation
- **Modular Components**: Loosely coupled, reusable components and services
- **API-First Approach**: Consistent, well-documented REST API endpoints

### 🔄 **Data Layer Flexibility**
- **Database Agnostic**: CSV layer can be easily replaced with any database system
- **Cloud Integration Ready**: Can switch to Google Drive, AWS S3, or other cloud storage
- **No Code Changes**: Data updates require only CSV file modifications
- **Version Control Friendly**: CSV files can be tracked in Git for data history
- **Easy Migration**: Simple adapter pattern allows switching data sources

### 🚀 **Development Experience**
- **Hot Reload**: Fast development with Vite's instant refresh
- **Auto-Generated Docs**: FastAPI automatically generates interactive API documentation
- **TypeScript Integration**: Full IntelliSense and compile-time error checking
- **Modern Tooling**: ESLint, Prettier, and modern build tools
- **Docker Ready**: Production-ready containerization with multi-stage builds

### 🎨 **User Experience**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme switching with system preferences
- **Smooth Animations**: Framer Motion for polished user interactions
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Lazy loading, code splitting, and optimized builds

### 🔧 **Maintenance & Operations**
- **Single Container Deployment**: Easy deployment with Docker
- **Nginx Reverse Proxy**: High-performance static file serving and API routing
- **Health Checks**: Built-in container health monitoring
- **Environment Agnostic**: Works in development, staging, and production
- **Easy Updates**: Update content without redeploying the application

### 📊 **Data Management**
- **Structured Data**: Well-organized CSV files with clear relationships
- **No Database Setup**: Zero configuration required for data storage
- **Easy Backup**: Simple file-based backup and restore
- **Collaborative Editing**: Multiple people can edit CSV files simultaneously
- **Data Validation**: Pydantic models ensure data integrity

### 🌟 **Technical Achievements**
- **Full-Stack TypeScript**: Type safety from frontend to backend
- **Modern React Patterns**: Custom hooks, context, and functional components
- **FastAPI Best Practices**: Dependency injection, middleware, and error handling
- **Production Ready**: Docker, Nginx, and cloud deployment ready
- **SEO Friendly**: Server-side rendering capabilities with React

## 🎓 What I Learned

### 🐍 **Backend Development**
- **FastAPI Mastery**: Built robust APIs with automatic documentation, validation, and error handling
- **Clean Architecture**: Implemented SOLID principles with proper separation of concerns
- **Pydantic Models**: Created type-safe data validation and serialization
- **Repository Pattern**: Designed data access layer for easy database switching
- **Dependency Injection**: Used FastAPI's dependency system for clean service management

### ⚛️ **Frontend Development**
- **Modern React**: Mastered hooks, context, and functional components
- **TypeScript**: Implemented end-to-end type safety across the application
- **Vite Build System**: Optimized development experience with fast hot reload
- **Custom Hooks**: Created reusable data fetching and state management hooks
- **Component Architecture**: Built modular, reusable UI components

### 🎨 **UI/UX Design**
- **Tailwind CSS**: Built responsive, accessible designs with utility-first CSS
- **shadcn/ui**: Integrated modern component library with consistent design system
- **Framer Motion**: Added smooth animations and micro-interactions
- **Dark/Light Mode**: Implemented theme switching with system preference detection
- **Responsive Design**: Created mobile-first, cross-device compatible layouts

### 🐳 **DevOps & Deployment**
- **Docker**: Created multi-stage builds for optimized production images
- **Nginx Configuration**: Set up reverse proxy and static file serving
- **Container Orchestration**: Managed multiple services in single container
- **Health Checks**: Implemented container monitoring and reliability
- **Cloud Deployment**: Prepared for Google Cloud Run and other cloud platforms

### 📊 **Data Management**
- **CSV Processing**: Built efficient data access layer for structured files
- **Data Modeling**: Designed normalized data structures with relationships
- **Type Safety**: Ensured data integrity with Pydantic validation
- **File Organization**: Created maintainable data structure with clear naming

### 🔧 **Development Tools**
- **ESLint & Prettier**: Maintained consistent code quality and formatting
- **Git Workflow**: Managed version control with proper branching and commits
- **Package Management**: Handled dependencies for both Python and Node.js
- **Build Optimization**: Optimized bundle sizes and loading performance

### 🏗️ **System Design**
- **API Design**: Created RESTful endpoints with consistent patterns
- **Error Handling**: Implemented comprehensive error management
- **Performance Optimization**: Applied lazy loading and code splitting
- **Security Best Practices**: Used proper CORS, validation, and input sanitization

### 🚀 **Problem Solving**
- **Debugging**: Resolved complex issues across frontend, backend, and deployment
- **Integration**: Connected multiple technologies seamlessly
- **Performance Tuning**: Optimized both development and production environments
- **User Experience**: Focused on creating intuitive, accessible interfaces

### 📚 **Learning Methodology**
- **Documentation**: Created comprehensive READMEs and inline documentation
- **Code Organization**: Structured large codebases with clear architecture
- **Testing Strategies**: Implemented type safety as testing methodology
- **Continuous Learning**: Adapted to new technologies and best practices

## 🐳 Docker & Nginx

This project is fully containerized with a multi-stage Docker build, using Nginx for high-performance static file serving and as a reverse proxy to the FastAPI backend.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Container                         │
│                     (Port 8080)                            │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │     Nginx       │    │    FastAPI      │                │
│  │   (Port 8080)   │    │   (Port 8000)   │                │
│  │                 │    │                 │                │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │                │
│  │ │   React     │ │    │ │   API       │ │                │
│  │ │  Frontend   │ │    │ │ Endpoints   │ │                │
│  │ │  (Static)   │ │    │ │             │ │                │
│  │ └─────────────┘ │    │ └─────────────┘ │                │
│  │                 │    │                 │                │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │                │
│  │ │   Reverse   │ │    │ │   CSV       │ │                │
│  │ │   Proxy     │ │    │ │   Data      │ │                │
│  │ │  (/api/*)   │ │    │ │             │ │                │
│  │ └─────────────┘ │    │ └─────────────┘ │                │
│  └─────────────────┘    └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   External      │
                    │   Requests      │
                    │                 │
                    │ GET /           │ → React App
                    │ GET /about      │ → React App (Client-side routing)
                    │ POST /api/      │ → FastAPI Home
                    │ POST /api/about │ → FastAPI About
                    │ GET /api/docs   │ → FastAPI Swagger UI
                    └─────────────────┘
```

**How it works:**
- **Nginx** handles all incoming traffic on port `8080`
- **Static files** (React app) are served directly by Nginx
- **API requests** (`/api/*`) are proxied to FastAPI running on internal port `8000`
- **Single container** contains both services for easy deployment

## ⚡ Quick Start (Docker)

This is the recommended way to run the application.

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/) installed and running.

### 1. Build the Docker Image
This command builds the final, production-ready image, which includes building the frontend, installing backend dependencies, and setting up Nginx.

```bash
docker build -t akhilnadhpc-portfolio:final .
```

### 2. Run the Docker Container
This command starts the container, mapping your local port `8080` to the container's port `8080`.

```bash
docker run --name portfolio-app -p 8080:8080 akhilnadhpc-portfolio:final
```

### 3. Access the Application
- **Frontend**: Open your browser to [`http://localhost:8080`](http://localhost:8080)
- **Backend API Docs**: Access the Swagger UI at [`http://localhost:8080/api/docs`](http://localhost:8080/api/docs)

---

## 💻 Local Development (Without Docker)

Use this method if you want to run the frontend and backend services separately for development.

### 1. Backend (FastAPI)

```bash
cd back_end
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

- The backend will be available at `http://localhost:8000`
- See [back_end/README.md](./back_end/README.md) for full API docs and configuration

### 2. Frontend (React)

```bash
cd front_end
npm install
npm run dev
```

- The frontend will be available at `http://localhost:5173`
- Edit `front_end/src/config.yml` to set your username
- See [front_end/README.md](./front_end/README.md) for full usage and customization

## 📚 Documentation
- **Backend**: [back_end/README.md](./back_end/README.md)
- **Frontend**: [front_end/README.md](./front_end/README.md)

## 🧩 Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: FastAPI, Pydantic, Python, CSV data
- **Dev Tools**: ESLint, Prettier, Docker (optional)

## 🤝 Contributing
1. Read the frontend and backend READMEs for architecture and guidelines
2. For development, use the "Local Development (Without Docker)" method
3. Follow the existing code style and patterns
4. Add type hints and docstrings (backend) or TypeScript types (frontend)
5. Test your changes
6. Open a pull request with a clear description

## 📄 License
This project is part of the personal portfolio of Akhil Nadh PC. Feel free to use as a template for your own portfolio! 