import React, { useState, useEffect } from 'react'
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
import Projects from '@/pages/Projects'
import Certifications from '@/pages/Certifications'
import { UserProfile } from '@/types/data'
import { cn } from '@/lib/utils'

function AppContent() {
  const { theme, setTheme } = useTheme()
  useCustomCursor() // Enable custom red dot cursor
  
  // Fetch personal data from backend
  const { personalData, welcomeText, loading, error } = usePersonalData()
  
  // State to manage navbar welcome text
  const [navbarWelcomeText, setNavbarWelcomeText] = useState<string>('who_am_i?')
  const [isMobile, setIsMobile] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Check device and orientation
  useEffect(() => {
    const checkDeviceAndOrientation = () => {
      // Better mobile detection that considers both width and user agent
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isNarrowWidth = window.innerWidth < 768;
      const isShortHeight = window.innerHeight < 600; // Increased threshold for better detection
      
      // Consider device mobile if:
      // 1. User agent indicates mobile device, OR
      // 2. Has touch capability AND (narrow width OR short height in any orientation)
      const isMobileDevice = isMobileUA || (hasTouch && (isNarrowWidth || isShortHeight));
      const isLandscapeMode = window.innerWidth > window.innerHeight;
      
      setIsMobile(isMobileDevice);
      setIsLandscape(isLandscapeMode);
    };
    
    checkDeviceAndOrientation();
    window.addEventListener('resize', checkDeviceAndOrientation);
    window.addEventListener('orientationchange', checkDeviceAndOrientation);
    
    return () => {
      window.removeEventListener('resize', checkDeviceAndOrientation);
      window.removeEventListener('orientationchange', checkDeviceAndOrientation);
    };
  }, []);

  // Update navbar welcome text when personalData changes (home page)
  React.useEffect(() => {
    if (welcomeText) {
      setNavbarWelcomeText(welcomeText)
    }
  }, [welcomeText])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm sm:text-base">Loading portfolio data...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !personalData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <p className="text-destructive text-lg">Failed to load portfolio data</p>
          <p className="text-muted-foreground text-sm">{error || 'No data available'}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Navbar */}
      <Navbar personalData={personalData} welcomeText={navbarWelcomeText} setWelcomeText={setNavbarWelcomeText} />

      {/* Main Content with Horizontal Layout */}
      <main className={cn(
        "flex-1",
        // Allow scrolling in mobile landscape mode
        isMobile && isLandscape ? "overflow-y-auto" : "overflow-hidden"
      )}>
        <HorizontalLayout>
          <Routes>
            <Route path="/" element={<Home personalData={personalData} welcomeText={welcomeText} setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="/about" element={<About setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="/timeline" element={<Timeline setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="/projects" element={<Projects setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="/certifications" element={<Certifications setNavbarWelcomeText={setNavbarWelcomeText} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HorizontalLayout>
      </main>

      {/* Footer */}
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