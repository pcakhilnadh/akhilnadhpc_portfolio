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

## ⚡ Quick Start

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
2. Follow the existing code style and patterns
3. Add type hints and docstrings (backend) or TypeScript types (frontend)
4. Test your changes
5. Open a pull request with a clear description

## 📄 License
This project is part of the personal portfolio of Akhil Nadh PC. Feel free to use as a template for your own portfolio! 