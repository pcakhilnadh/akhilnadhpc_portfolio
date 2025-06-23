import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { useCustomCursor } from '@/hooks/useCustomCursor'
import usePersonalData from '@/hooks/usePersonalData'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Loader2 } from 'lucide-react'
import { Navbar, HorizontalLayout, Footer } from '@/components/common/index'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Timeline from '@/pages/Timeline'
import Skills from '@/pages/Skills'
import Projects from '@/pages/Projects'
import Certifications from '@/pages/Certifications'
import { PersonalData } from '@/types/data'

function AppContent() {
  const { theme, setTheme } = useTheme()
  useCustomCursor() // Enable custom red dot cursor
  
  // Fetch personal data from backend
  const { personalData, welcomeText, loading, error } = usePersonalData()
  
  // State to manage navbar welcome text
  const [navbarWelcomeText, setNavbarWelcomeText] = useState<string>('who_am_i?')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Update navbar welcome text when personalData changes (home page)
  React.useEffect(() => {
    if (welcomeText) {
      setNavbarWelcomeText(welcomeText)
    }
  }, [welcomeText])

  // Loading state
  if (loading) {
    return (
      <div className="h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading portfolio data...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !personalData) {
    return (
      <div className="h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-destructive text-lg">Failed to load portfolio data</p>
          <p className="text-muted-foreground">{error || 'No data available'}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <Navbar personalData={personalData} welcomeText={navbarWelcomeText} setWelcomeText={setNavbarWelcomeText} />

      {/* Main Content with Horizontal Layout */}
      <div className="h-[calc(100vh-120px)]">
        <HorizontalLayout>
          <Routes>
            <Route path="/" element={<Home personalData={personalData} welcomeText={welcomeText} setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="/about" element={<About setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="/timeline" element={<Timeline setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="/skills" element={<Skills setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="/projects" element={<Projects setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="/certifications" element={<Certifications setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HorizontalLayout>
      </div>

      {/* Sticky Footer */}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App 