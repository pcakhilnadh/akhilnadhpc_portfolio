import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

const Footer: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <footer className="bg-background/90 backdrop-blur-md border-t border-border">
      <div className="container mx-auto px-4 py-3 sm:py-4 relative">
        {/* Mobile layout - stacked vertically with centered text */}
        <div className="flex flex-col items-center gap-2 sm:hidden">
          {/* Theme Toggle Button - First on mobile */}
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:bg-accent transition-colors h-8 w-8"
              style={{
                '--hover-text-color': 'var(--color-bg)'
              } as React.CSSProperties}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
            </Button>
          </div>
          
          {/* Copyright Text - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <p className="text-foreground/80 font-mono text-xs">
              © 2025{' '}
              <a 
                href="https://akhilnadhpc.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors duration-200 font-semibold"
              >
                Akhil Nadh PC
              </a>
              . Built with ❤️ and lots of ☕
            </p>
          </motion.div>
        </div>

        {/* Desktop layout - centered with theme toggle positioned absolutely */}
        <div className="hidden sm:flex items-center justify-center relative">
          {/* Copyright Text - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <p className="text-foreground/80 font-mono text-sm">
              © 2025{' '}
              <a 
                href="https://akhilnadhpc.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors duration-200 font-semibold"
              >
                Akhil Nadh PC
              </a>
              . Built with ❤️ and lots of ☕
            </p>
          </motion.div>
          
          {/* Theme Toggle Button - Positioned on the right */}
          <div className="absolute right-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:bg-accent transition-colors h-9 w-9"
              style={{
                '--hover-text-color': 'var(--color-bg)'
              } as React.CSSProperties}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 