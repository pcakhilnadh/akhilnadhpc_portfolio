import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal, User, Clock, Code, Briefcase, Award } from "lucide-react";
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
    { path: "/skills", label: "Skills", icon: <Code size={16} /> },
    { path: "/projects", label: "Projects", icon: <Briefcase size={16} /> },
    { path: "/certifications", label: "Certifications", icon: <Award size={16} /> }
  ];
  
  return (
    <header className="sticky top-0 bg-background/90 backdrop-blur-md border-b border-border z-40 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-mono font-bold text-primary flex items-center gap-2"
        >
          <Terminal size={20} className="text-primary" />
          <div className="w-64 h-8 flex items-center">
            <span className="cursor">{typedText}</span>
            <span className={cn(
              "ml-1 w-0.5 h-5 bg-primary",
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
                "flex items-center gap-1.5 px-4 py-2",
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => navigateToSection(link.path)}
            >
              {link.icon}
              <span>{link.label}</span>
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </Button>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <ul className="py-2 px-4 space-y-3">
          {navLinks.map((link) => (
            <li key={link.path}>
              <a
                href={link.path}
                className={cn(
                  "terminal-text block py-2 transition-colors",
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection(link.path);
                }}
              >
                <span className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}



