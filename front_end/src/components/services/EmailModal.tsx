import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
}

export default function EmailModal({ isOpen, onClose, service }: EmailModalProps) {
  const [copied, setCopied] = React.useState(false);
  
  const email = 'akhilnadhpc@gmail.com';
  const subject = `Service Inquiry: ${service}`;
  const body = `Hi Akhil,

I'm interested in your ${service} service. Could you please provide more details about:
- Service scope and deliverables
- Timeline and pricing
- Next steps to get started

Looking forward to hearing from you!

Best regards,`;

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Handle copy failure silently
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-background/95 backdrop-blur-md border-2 border-primary/30 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl shadow-primary/10"
          >
            {/* Cyberpunk grid background */}
            <div className="absolute inset-0 opacity-10 rounded-lg overflow-hidden">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-muted/50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Content */}
            <div className="relative z-10 space-y-6">
              {/* Header */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Get in Touch</h3>
                <p className="text-sm text-muted-foreground">
                  Ready to discuss <span className="text-primary font-semibold">{service}</span>?
                </p>
              </div>

              {/* Email Section */}
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 border border-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email me at:</p>
                      <p className="font-mono text-primary text-sm">{email}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyEmail}
                      className={cn(
                        "transition-all duration-200",
                        copied 
                          ? "border-primary/60 bg-primary/10" 
                          : "border-primary/30 hover:border-primary/60"
                      )}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => window.open(mailtoLink)}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border border-primary/30"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Open Email App
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="border-muted hover:border-muted-foreground"
                  >
                    Close
                  </Button>
                </div>
              </div>

              {/* Note */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  I typically respond within 24 hours
                </p>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8">
              <div className="absolute top-2 left-2 w-4 h-0.5 bg-primary" />
              <div className="absolute top-2 left-2 w-0.5 h-4 bg-primary" />
            </div>
            <div className="absolute top-0 right-0 w-8 h-8">
              <div className="absolute top-2 right-2 w-4 h-0.5 bg-primary" />
              <div className="absolute top-2 right-2 w-0.5 h-4 bg-primary" />
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8">
              <div className="absolute bottom-2 left-2 w-4 h-0.5 bg-primary" />
              <div className="absolute bottom-2 left-2 w-0.5 h-4 bg-primary" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8">
              <div className="absolute bottom-2 right-2 w-4 h-0.5 bg-primary" />
              <div className="absolute bottom-2 right-2 w-0.5 h-4 bg-primary" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 