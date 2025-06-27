import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Calendar, 
  Building2, 
  ExternalLink, 
  Hash, 
  Clock, 
  Zap,
  Eye,
  Shield,
  Star,
  Infinity
} from 'lucide-react';
import { Certification } from '@/types/data';
import { cn } from '@/lib/utils';

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

export default function CertificationCard({ certification, index }: CertificationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function to check if certificate has a valid expiry date
  const hasValidExpiryDate = (expiryDate: string | null | undefined) => {
    return expiryDate && 
           expiryDate !== "No Expiry" && 
           expiryDate !== "" && 
           expiryDate.trim() !== "";
  };

  // Calculate if certification is expired (only if it has a valid expiry date)
  const isExpired = hasValidExpiryDate(certification.expiry_date)
    ? new Date(certification.expiry_date!) < new Date()
    : false;

  // Calculate days until expiry (only if it has a valid expiry date)
  const daysUntilExpiry = hasValidExpiryDate(certification.expiry_date)
    ? Math.ceil((new Date(certification.expiry_date!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Determine certificate status
  const getStatus = () => {
    if (!hasValidExpiryDate(certification.expiry_date)) {
      return { type: 'permanent', label: 'PERMANENT', icon: Infinity };
    }
    if (isExpired) {
      return { type: 'expired', label: 'EXPIRED', icon: Shield };
    }
    return { type: 'active', label: 'ACTIVE', icon: Star };
  };

  const status = getStatus();

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.17, 0.67, 0.83, 0.67]
      }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        rotateY: 2
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Cyberpunk Glow Effect */}
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 blur-xl",
        isHovered 
          ? "bg-gradient-to-br from-primary/30 via-accent-foreground/20 to-primary/30" 
          : "bg-gradient-to-br from-primary/10 via-accent-foreground/5 to-primary/10 opacity-0"
      )} />

      {/* Main Card */}
      <Card className={cn(
        "relative border-0 bg-card/80 backdrop-blur-md overflow-hidden transition-all duration-500",
        "transform-gpu perspective-1000 min-h-[400px]",
        isHovered 
          ? "border-primary/60 shadow-2xl shadow-primary/25" 
          : "border-primary/20 shadow-xl shadow-black/25"
      )}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent-foreground/20"
            style={{
              backgroundSize: '100px 100px',
              backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
            }}
          />
        </div>

        {/* Neon Border Effect */}
        <div 
          className={cn(
            "absolute inset-0 rounded-xl p-[2px] transition-all duration-500",
            isHovered 
              ? "bg-gradient-to-r from-primary via-accent-foreground to-primary" 
              : "bg-gradient-to-r from-primary/50 via-accent-foreground/30 to-primary/50"
          )}
          style={{
            backgroundSize: '400% 400%',
            animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none'
          }}
        >
          <div className="h-full w-full rounded-xl bg-card" />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <div className={cn(
            "w-full h-1 transition-all duration-300",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
          <div className={cn(
            "w-1 h-full transition-all duration-300",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
        </div>
        <div className="absolute top-0 right-0 w-8 h-8">
          <div className={cn(
            "w-full h-1 transition-all duration-300",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
          <div className={cn(
            "w-1 h-full ml-auto transition-all duration-300",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
        </div>

        <CardContent className="relative z-10 p-6 h-full flex flex-col">
          {/* Header Section - Redesigned for longer names */}
          <div className="space-y-4 mb-6">
            {/* Icon and Status Row */}
            <div className="flex items-center justify-between">
              <motion.div
                animate={{ 
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "p-3 rounded-lg border transition-all duration-300",
                  "bg-gradient-to-br from-muted/80 to-card/80",
                  "shadow-lg backdrop-blur-sm",
                  isHovered 
                    ? "border-primary/60 bg-gradient-to-br from-primary/20 to-accent-foreground/20 shadow-primary/25" 
                    : "border-muted/50 shadow-black/20"
                )}
              >
                <Award className={cn(
                  "w-6 h-6 transition-colors duration-300",
                  isHovered ? "text-primary" : "text-muted-foreground"
                )} />
              </motion.div>

              {/* Status Badge */}
              <Badge className={cn(
                "text-xs font-mono border-2 transition-all duration-300 flex-shrink-0",
                status.type === 'expired'
                  ? "bg-destructive/20 text-destructive border-destructive/40"
                  : status.type === 'permanent'
                  ? "bg-accent-foreground/20 text-accent-foreground border-accent-foreground/40"
                  : "bg-primary/20 text-primary border-primary/40"
              )}>
                <status.icon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
            </div>

            {/* Certificate Name - Full width with proper wrapping */}
            <div className="space-y-3">
              <h3 className={cn(
                "text-lg sm:text-xl font-bold transition-colors duration-300 leading-tight break-words",
                "min-h-[3rem] flex items-start",
                isHovered ? "text-primary" : "text-foreground"
              )}>
                <span className="block">{certification.name}</span>
              </h3>
              
              {/* Issuer - Below the title */}
              <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/20 border border-muted/30">
                <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground font-medium">
                  {certification.issuer}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Date Information */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                <Calendar className="w-4 h-4 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Issued</p>
                  <p className="text-sm font-mono text-foreground">{formatDate(certification.issue_date)}</p>
                </div>
              </div>

              {/* Expiry Information */}
              <div className={cn(
                "flex items-center space-x-2 p-3 rounded-lg border transition-all duration-300",
                !hasValidExpiryDate(certification.expiry_date)
                  ? "bg-gradient-to-r from-accent-foreground/10 to-accent-foreground/5 border-accent-foreground/20"
                  : status.type === 'expired'
                  ? "bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20"
                  : "bg-gradient-to-r from-accent-foreground/10 to-accent-foreground/5 border-accent-foreground/20"
              )}>
                {!hasValidExpiryDate(certification.expiry_date) ? (
                  <Infinity className="w-4 h-4 text-accent-foreground" />
                ) : (
                  <Clock className={cn(
                    "w-4 h-4",
                    status.type === 'expired' ? "text-destructive" : "text-accent-foreground"
                  )} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Expires</p>
                  {!hasValidExpiryDate(certification.expiry_date) ? (
                    <p className="text-sm font-mono text-accent-foreground">No Expiry</p>
                  ) : (
                    <>
                      <p className="text-sm font-mono text-foreground">{formatDate(certification.expiry_date!)}</p>
                      {daysUntilExpiry !== null && (
                        <p className={cn(
                          "text-xs font-mono",
                          isExpired 
                            ? "text-destructive" 
                            : "text-muted-foreground"
                        )}>
                          {isExpired ? `${Math.abs(daysUntilExpiry)} days ago` : `${daysUntilExpiry} days left`}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Credential ID */}
            {certification.credential_id && (
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-muted/20 to-muted/10 border border-muted/30">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Credential ID</p>
                  <p className="text-xs font-mono text-foreground truncate">{certification.credential_id}</p>
                </div>
              </div>
            )}

            {/* Skills */}
            {certification.skills && certification.skills.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Skills</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {certification.skills.slice(0, isExpanded ? certification.skills.length : 3).map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.05 }}
                    >
                      <Badge className="bg-primary/10 text-primary border-primary/30 text-xs hover:bg-primary/20 transition-colors">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                  {!isExpanded && certification.skills.length > 3 && (
                    <Badge 
                      className="bg-accent-foreground/10 text-accent-foreground border-accent-foreground/30 text-xs cursor-pointer hover:bg-accent-foreground/20 transition-colors"
                      onClick={() => setIsExpanded(true)}
                    >
                      +{certification.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-6 pt-4 border-t border-primary/20">
            <div className="flex items-center justify-between">
              {certification.credential_url && (
                <motion.a
                  href={certification.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg px-3 py-2 hover:bg-primary/30 transition-all duration-300 group"
                >
                  <Eye className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                  <span className="text-primary text-sm font-medium">View Certificate</span>
                  <ExternalLink className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )}
              
              {isExpanded && certification.skills && certification.skills.length > 3 && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 