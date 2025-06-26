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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center sm:text-left order-2 sm:order-1"
          >
            <p className="text-foreground/80 font-mono text-xs sm:text-sm">
              © 2025{' '}
              <a 
                href="https://akhilnadhpc.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition-colors duration-200 font-semibold"
              >
                Akhil Nadh PC
              </a>
              . Built with ❤️ and lots of ☕
            </p>
          </motion.div>
          
          {/* Theme Toggle Button */}
          <div className="order-1 sm:order-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary transition-colors h-8 w-8 sm:h-9 sm:w-9"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 