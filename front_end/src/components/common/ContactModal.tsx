import {
  Dialog,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";
import { 
  X, Mail, Github, Linkedin, Twitter, Instagram, Globe, Code, MessageSquare, 
  ExternalLink, Map, Terminal, Zap, User, Briefcase as BriefcaseIcon
} from "lucide-react";
import { PersonalData } from "@/types/data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalData: PersonalData;
}

export default function ContactModal({ isOpen, onClose, personalData }: ContactModalProps) {
  const { 
    basic_info, 
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
          className="flex items-center justify-between p-3 hover:bg-primary/5 rounded-md transition-all border border-transparent hover:border-primary/20 group-hover:pl-4"
        >
          <div className="flex items-center">
            <span className="text-primary mr-3 flex-shrink-0">
              {getIconComponent(platform)}
            </span>
            <div>
              <div className="font-medium">{displayName}</div>
              <div className="text-xs text-muted-foreground font-mono">{profile.handler}</div>
            </div>
          </div>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </span>
        </a>
      </motion.li>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl backdrop-blur-xl bg-background/90 shadow-green-500/10 border-primary/20 p-0 overflow-hidden">
        <div className="bg-primary/5 border-b border-primary/20 p-0.5 flex items-center">
          <div className="flex space-x-1.5 px-3 py-2">
            <div className="w-3 h-3 rounded-full bg-red-500" onClick={onClose}></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center font-mono text-xs text-primary">
            <span className="mr-1.5 opacity-60">root@akhilnadhpc:~$</span> 
            {typedText}
            <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></span>
          </div>
          <DialogClose className="p-2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="border-b border-primary/10">
            <div className="px-6 pt-4 pb-2">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary/10">
                  <Terminal className="w-4 h-4 mr-2" /> All
                </TabsTrigger>
                {Object.keys(social_profiles).length > 0 && (
                  <TabsTrigger value="social" className="data-[state=active]:bg-primary/10">
                    <Zap className="w-4 h-4 mr-2" /> Social
                  </TabsTrigger>
                )}
                {Object.keys(professional_profiles).length > 0 && (
                  <TabsTrigger value="professional" className="data-[state=active]:bg-primary/10">
                    <BriefcaseIcon className="w-4 h-4 mr-2" /> Professional
                  </TabsTrigger>
                )}
                {Object.keys(coding_profiles).length > 0 && (
                  <TabsTrigger value="coding" className="data-[state=active]:bg-primary/10">
                    <Code className="w-4 h-4 mr-2" /> Coding
                  </TabsTrigger>
                )}
                {Object.keys(personal_profiles).length > 0 && (
                  <TabsTrigger value="personal" className="data-[state=active]:bg-primary/10">
                    <User className="w-4 h-4 mr-2" /> Personal
                  </TabsTrigger>
                )}
              </TabsList>
            </div>
          </div>
          
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {/* All Profiles Tab */}
            <TabsContent value="all" className="mt-0 space-y-6">
              {/* Social Profiles */}
              {Object.keys(social_profiles).length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="h-px flex-1 bg-primary/20"></div>
                    <h3 className="font-mono text-xs uppercase text-primary mx-2 flex items-center">
                      <Zap className="w-3.5 h-3.5 mr-1.5" /> Social Profiles
                    </h3>
                    <div className="h-px flex-1 bg-primary/20"></div>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(social_profiles).map((entry, index) => 
                      renderProfileLink(entry[0], entry[1], index)
                    )}
                  </ul>
                </div>
              )}
              
              {/* Professional Profiles */}
              {Object.keys(professional_profiles).length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="h-px flex-1 bg-primary/20"></div>
                    <h3 className="font-mono text-xs uppercase text-primary mx-2 flex items-center">
                      <BriefcaseIcon className="w-3.5 h-3.5 mr-1.5" /> Professional Profiles
                    </h3>
                    <div className="h-px flex-1 bg-primary/20"></div>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(professional_profiles).map((entry, index) => 
                      renderProfileLink(entry[0], entry[1], index)
                    )}
                  </ul>
                </div>
              )}
              
              {/* Coding Profiles */}
              {Object.keys(coding_profiles).length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="h-px flex-1 bg-primary/20"></div>
                    <h3 className="font-mono text-xs uppercase text-primary mx-2 flex items-center">
                      <Code className="w-3.5 h-3.5 mr-1.5" /> Coding Profiles
                    </h3>
                    <div className="h-px flex-1 bg-primary/20"></div>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(coding_profiles).map((entry, index) => 
                      renderProfileLink(entry[0], entry[1], index)
                    )}
                  </ul>
                </div>
              )}
              
              {/* Personal Profiles */}
              {Object.keys(personal_profiles).length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="h-px flex-1 bg-primary/20"></div>
                    <h3 className="font-mono text-xs uppercase text-primary mx-2 flex items-center">
                      <User className="w-3.5 h-3.5 mr-1.5" /> Personal Profiles
                    </h3>
                    <div className="h-px flex-1 bg-primary/20"></div>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(personal_profiles).map((entry, index) => 
                      renderProfileLink(entry[0], entry[1], index)
                    )}
                  </ul>
                </div>
              )}
            </TabsContent>
            
            {/* Social Profiles Tab */}
            <TabsContent value="social" className="mt-0">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(personal_profiles).map((entry, index) => 
                      renderProfileLink(entry[0], entry[1], index)
                    )}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </div>
          
          {/* Email Contact */}
          <div className="p-6 pt-0 border-t border-primary/10">
            <h3 className="font-mono text-xs uppercase text-primary mb-3 flex items-center">
              <Mail className="w-3.5 h-3.5 mr-1.5" /> Direct Contact
            </h3>
            <a 
              href={`mailto:${basic_info.email}`} 
              className="flex items-center justify-between p-3 hover:bg-primary/5 rounded-md transition-all border border-dashed border-primary/30 hover:border-primary group"
            >
              <div className="flex items-center">
                <span className="text-primary mr-3">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-xs font-mono text-muted-foreground">{basic_info.email}</div>
                </div>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </span>
            </a>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}




