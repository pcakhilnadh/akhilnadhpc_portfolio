import {
  Dialog,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";
import { 
  X, Mail, Github, Linkedin, Twitter, Instagram, Globe, Code, MessageSquare, 
  ExternalLink, Map, Terminal, Zap, User, Briefcase as BriefcaseIcon
} from "lucide-react";
import { UserProfile } from "@/types/data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalData: UserProfile;
}

export default function ContactModal({ isOpen, onClose, personalData }: ContactModalProps) {
  const { 
    personal_info, 
    social_profiles, 
    professional_profiles, 
    coding_profiles, 
    personal_profiles 
  } = personalData;
  
  const [typedText, setTypedText] = useState("");
  const welcomeText = "> ESTABLISHING SECURE CONNECTION WITH AKHIL NADH PC.....";
  
  // Typewriter effect
  useEffect(() => {
    if (!isOpen) {
      setTypedText("");
      return;
    }
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < welcomeText.length) {
        setTypedText(welcomeText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 30);
    
    return () => clearInterval(typing);
  }, [isOpen]);
  
  // Get icon component based on platform name
  const getIconComponent = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'personal_blog':
        return <Globe className="w-5 h-5" />;
      case 'leetcode':
      case 'hackerrank':
      case 'stackoverflow':
      case 'kaggle':
        return <Code className="w-5 h-5" />;
      case 'medium':
        return <MessageSquare className="w-5 h-5" />;
      case 'google map reviewer profile':
        return <Map className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };
  
  // Function to render a single profile link with animation
  const renderProfileLink = (platform: string, profile: { url: string; handler: string }, index: number) => {
    // Format the display name
    const displayName = platform === 'personal_blog' ? 'Personal Blog' : 
                      platform.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return (
      <motion.li 
        key={platform}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group"
      >
        <a 
          href={profile.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 bg-background hover:bg-muted rounded-lg transition-all border border-border hover:border-primary group-hover:shadow-md"
        >
          <div className="flex items-center">
            <span className="text-primary mr-4 flex-shrink-0">
              {getIconComponent(platform)}
            </span>
            <div>
              <div className="font-semibold text-foreground">{displayName}</div>
              <div className="text-sm text-muted-foreground font-mono">{profile.handler}</div>
            </div>
          </div>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
          </span>
        </a>
      </motion.li>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-background border border-border shadow-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="font-mono text-sm text-foreground">
                <span className="text-muted-foreground mr-2">root@akhilnadhpc:~$</span> 
                {typedText}
                <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></span>
              </div>
            </div>
            <DialogClose className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </div>

        {/* Email Contact */}
        <div className="p-6 border-b border-border bg-muted/30">
          <a 
            href={`mailto:${personal_info.email}`} 
            className="flex items-center justify-between p-4 bg-background hover:bg-muted rounded-lg transition-all border border-border hover:border-primary group shadow-sm"
          >
            <div className="flex items-center">
              <span className="text-primary mr-4">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <div className="font-semibold text-foreground">Email</div>
                <div className="text-sm font-mono text-muted-foreground">{personal_info.email}</div>
              </div>
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-5 h-5 text-muted-foreground" />
            </span>
          </a>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="professional" className="w-full">
          <div className="border-b border-border bg-muted/20">
            <div className="px-6 pt-4 pb-2">
              <TabsList className="grid grid-cols-4 w-full bg-background border border-border">
                {Object.keys(social_profiles).length > 0 && (
                  <TabsTrigger value="social" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Zap className="w-4 h-4 mr-2" /> Social
                  </TabsTrigger>
                )}
                {Object.keys(professional_profiles).length > 0 && (
                  <TabsTrigger value="professional" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <BriefcaseIcon className="w-4 h-4 mr-2" /> Professional
                  </TabsTrigger>
                )}
                {Object.keys(coding_profiles).length > 0 && (
                  <TabsTrigger value="coding" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Code className="w-4 h-4 mr-2" /> Coding
                  </TabsTrigger>
                )}
                {Object.keys(personal_profiles).length > 0 && (
                  <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <User className="w-4 h-4 mr-2" /> Personal
                  </TabsTrigger>
                )}
              </TabsList>
            </div>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {/* Social Profiles Tab */}
            <TabsContent value="social" className="mt-0">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(social_profiles).map((entry, index) => 
                      renderProfileLink(entry[0], entry[1], index)
                    )}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            
            {/* Professional Profiles Tab */}
            <TabsContent value="professional" className="mt-0">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(professional_profiles).map((entry, index) => 
                      renderProfileLink(entry[0], entry[1], index)
                    )}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            
            {/* Coding Profiles Tab */}
            <TabsContent value="coding" className="mt-0">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(coding_profiles).map((entry, index) => 
                      renderProfileLink(entry[0], entry[1], index)
                    )}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            
            {/* Personal Profiles Tab */}
            <TabsContent value="personal" className="mt-0">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(personal_profiles).map((entry, index) => 
                      renderProfileLink(entry[0], entry[1], index)
                    )}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}




