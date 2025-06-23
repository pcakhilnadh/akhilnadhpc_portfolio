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
    <footer className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border z-40">
      <div className="container mx-auto px-4 py-3 relative">
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
              className="text-green-500 hover:text-green-400 transition-colors duration-200 font-semibold"
            >
              Akhil Nadh PC
            </a>
            . Built with ❤️ and lots of ☕
          </p>
        </motion.div>
        
        {/* Theme Toggle Button - Right Aligned */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer 