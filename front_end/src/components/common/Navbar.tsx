import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal, User, Clock, Code, Briefcase, Award, Zap, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/data";

interface NavbarProps {
  personalData: UserProfile;
  welcomeText: string;
  setWelcomeText: (text: string) => void;
}

export default function Navbar({ personalData, welcomeText, setWelcomeText }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Typewriter effect for name
  useEffect(() => {
    setIsTyping(true);
    setTypedText("");
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < welcomeText.length) {
        setTypedText(welcomeText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, 100);
    
    return () => {
      clearInterval(typing);
      setIsTyping(false);
    };
  }, [welcomeText]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navigateToSection = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };
  
  const navLinks = [
    { path: "/", label: "Home", icon: <Terminal size={16} /> },
    { path: "/about", label: "About", icon: <User size={16} /> },
    { path: "/timeline", label: "Timeline", icon: <Clock size={16} /> },
    { path: "/projects", label: "Projects", icon: <Briefcase size={16} /> },
    { path: "/certifications", label: "Certifications", icon: <Award size={16} /> },
    { path: "/services", label: "Services", icon: <Zap size={16} /> }
  ];
  
  return (
    <header className="sticky top-0 bg-background/90 backdrop-blur-md border-b border-border z-50 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-lg sm:text-xl font-mono font-bold text-primary flex items-center gap-2 min-w-0"
          onClick={closeMobileMenu}
        >
          <Terminal size={18} className="text-primary flex-shrink-0" />
          <div className="min-w-0 flex-1 sm:w-64 h-6 sm:h-8 flex items-center overflow-hidden">
            <span className="cursor truncate text-sm sm:text-base">{typedText}</span>
            <span className={cn(
              "ml-1 w-0.5 h-4 sm:h-5 bg-primary flex-shrink-0",
              isTyping ? "animate-pulse" : "opacity-0"
            )}></span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Button
              key={link.path}
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center gap-1.5 px-3 lg:px-4 py-2 relative",
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => navigateToSection(link.path)}
            >
              {link.icon}
              <span className="text-xs lg:text-sm">{link.label}</span>
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </Button>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-background backdrop-blur-md border-b border-border transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="py-4 px-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.path}
              className={cn(
                "w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 flex items-center gap-3",
                location.pathname === link.path 
                  ? "text-primary bg-primary/10 border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              onClick={() => navigateToSection(link.path)}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
              {location.pathname === link.path && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}



