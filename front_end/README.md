# Portfolio Frontend

A modern, responsive React portfolio application built with TypeScript, Vite, and Tailwind CSS. Features a beautiful UI with dynamic content from the backend API.

## 🏗️ Architecture

The frontend follows modern React patterns with a clean, component-based architecture:

```
front_end/src/
├── components/          # Reusable UI components
│   ├── about/          # About page components
│   ├── common/         # Shared components (Navbar, Footer, etc.)
│   ├── home/           # Home page components
│   ├── projects/       # Projects page components
│   ├── skills/         # Skills page components
│   ├── timeline/       # Timeline page components
│   └── ui/             # Base UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

### Design Patterns
- **Component-Based Architecture**: Modular, reusable components
- **Custom Hooks**: Data fetching and state management
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme Support**: Dark/Light mode with smooth transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd front_end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the application:**
   Edit `src/config.yml` to set your username:
   ```yaml
   username: "your_username"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Alternative Commands

**Development with auto-reload:**
```bash
npm run dev
```

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
- **Hero Section**: Dynamic profile image with fallback to initials
- **Personal Information**: Name, tagline, summary, and experience
- **Contact Button**: Modal with contact information
- **Responsive Design**: Optimized for all screen sizes

### 👤 About Page
- **User Profile Card**: Complete personal information with profile image
- **Biography Card**: Detailed personal story and background
- **Skills Overview**: Categorized skills with radar chart
- **Family Information**: Parents' details
- **Hobbies & Interests**: Personal interests display

### 🛠️ Skills Page
- **Skills Categories**: Organized by skill type
- **Skill Ratings**: Visual representation of skill levels
- **Interactive Charts**: Radar charts for skill visualization
- **Responsive Grid**: Adaptive layout for different screen sizes

### 📁 Projects Page
- **Project Cards**: Detailed project information
- **Technology Tags**: Skills used in each project
- **Live Links**: GitHub and live demo links
- **Project Categories**: Organized by project type

### 🏆 Certifications Page
- **Certification Cards**: Professional certifications
- **Credential Links**: Direct links to verify credentials
- **Issue/Expiry Dates**: Certification validity information
- **Skills Covered**: Related skills for each certification

### 📅 Timeline Page
- **Work Experience**: Chronological work history
- **Company Details**: Role, duration, and achievements
- **Project Highlights**: Key projects at each company
- **Interactive Timeline**: Visual representation of career progression

## 🎨 UI Components

### Base Components (shadcn/ui)
- **Button**: Styled buttons with variants
- **Card**: Content containers with shadows
- **Dialog**: Modal dialogs and popups
- **Badge**: Status and category indicators
- **Skeleton**: Loading placeholders
- **Tabs**: Tabbed content organization

### Custom Components
- **Navbar**: Navigation with dynamic welcome text
- **Footer**: Application footer
- **ContactModal**: Contact information modal
- **ThemeProvider**: Dark/Light mode management
- **UserProfileCard**: Profile information display
- **SkillsRadarChart**: Skills visualization
- **BiographyCard**: Personal story display

## 🔧 Configuration

### Environment Setup
The application uses a `config.yml` file for configuration:

```yaml
# src/config.yml
username: "akhilnadhpc"
```

### API Configuration
- **Base URL**: `http://localhost:8000` (configurable)
- **Endpoints**: All endpoints use POST method
- **CORS**: Configured for backend communication

### Theme Configuration
- **Dark Mode**: Automatic theme detection
- **Light Mode**: Clean, modern design
- **Custom Colors**: Primary, secondary, and accent colors
- **Smooth Transitions**: Theme switching animations

## 📊 Data Management

### Custom Hooks
- **useHomeData**: Home page data fetching
- **useAboutData**: About page data fetching
- **useSkillsData**: Skills page data fetching
- **useProjectsData**: Projects page data fetching
- **useCertificationsData**: Certifications page data fetching
- **useTimelineData**: Timeline page data fetching
- **useTheme**: Theme management
- **useCustomCursor**: Custom cursor effects

### Data Flow
1. **Config Loading**: Username loaded from `config.yml`
2. **API Calls**: POST requests to backend with username
3. **State Management**: React hooks for data and loading states
4. **Component Rendering**: Dynamic content based on API responses
5. **Error Handling**: Graceful fallbacks for failed requests

## 🎯 Key Features

### ✅ Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized for tablets and desktops

### ✅ Dynamic Content
- Real-time data from backend API
- Profile images with fallback to initials
- Dynamic welcome texts per page
- Loading states and error handling

### ✅ Modern UI/UX
- Smooth animations with Framer Motion
- Dark/Light theme support
- Custom cursor effects
- Professional typography

### ✅ Performance
- Code splitting and lazy loading
- Optimized bundle size
- Fast development server with Vite
- Efficient re-rendering

### ✅ Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## 🛠️ Development

### Project Structure
```
src/
├── components/          # UI components
│   ├── about/          # About page components
│   ├── common/         # Shared components
│   ├── home/           # Home page components
│   ├── projects/       # Projects components
│   ├── skills/         # Skills components
│   ├── timeline/       # Timeline components
│   └── ui/             # Base UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript definitions
├── lib/                # Utility functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles
└── config.yml          # Configuration file
```

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Component-specific styles
- **CSS Variables**: Theme-aware styling
- **Responsive Utilities**: Mobile-first responsive design

### State Management
- **React Hooks**: useState, useEffect, useContext
- **Custom Hooks**: Data fetching and state management
- **Context API**: Theme and global state
- **Local Storage**: Theme persistence

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables
For production deployment, set environment variables:
```bash
VITE_API_BASE_URL=https://your-api-domain.com
```

## 🔄 Recent Updates

### v2.0.0 - Complete Frontend Overhaul
- ✅ **Dynamic Profile Images**: Profile images with fallback to initials
- ✅ **Welcome Text System**: Page-specific welcome texts from backend
- ✅ **New Pages**: Skills, Projects, Certifications, and Timeline pages
- ✅ **POST-based APIs**: Updated to use POST requests with username
- ✅ **Enhanced UI**: Improved components and animations
- ✅ **Better Error Handling**: Graceful fallbacks and loading states
- ✅ **Theme Improvements**: Enhanced dark/light mode support

### v1.0.0 - Initial Release
- ✅ **React + TypeScript**: Modern frontend framework
- ✅ **Vite Build Tool**: Fast development and building
- ✅ **Tailwind CSS**: Utility-first styling
- ✅ **Component Architecture**: Modular, reusable components

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

### Manual Testing
- Test all pages on different screen sizes
- Verify theme switching functionality
- Check API integration with backend
- Test error handling scenarios

## 🤝 Contributing

1. Follow the existing component patterns
2. Maintain TypeScript type safety
3. Add proper error handling
4. Include loading states
5. Test responsive design
6. Update documentation

## 📄 License

This project is part of the portfolio application.

## 🔗 Related

- **Backend API**: [Portfolio API Backend](../back_end/README.md)
- **Design System**: shadcn/ui components
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion 