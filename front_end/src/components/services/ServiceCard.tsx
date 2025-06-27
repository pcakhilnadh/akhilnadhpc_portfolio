import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight, Zap } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  gradient: string;
  onGetQuote?: () => void;
}

export default function ServiceCard({ 
  title, 
  description, 
  features, 
  icon: Icon, 
  gradient,
  onGetQuote 
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className={cn(
        "relative h-full border transition-all duration-500 group overflow-hidden",
        "bg-gradient-to-br from-card/90 to-muted/90 backdrop-blur-sm",
        "transform-gpu perspective-1000",
        isHovered 
          ? "border-primary/60 shadow-2xl shadow-primary/25 -translate-y-2 scale-[1.02]" 
          : "border-muted/30 shadow-xl shadow-black/25"
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}>
        {/* 3D depth layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-card/50 rounded-lg transform translate-z-[-10px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-card/30 rounded-lg transform translate-z-[-20px]" />
        
        {/* Animated background gradient */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-lg transition-opacity duration-300",
            gradient
          )}
          animate={{
            opacity: isHovered ? 0.15 : 0.05,
          }}
        />

        {/* Glowing edge highlight */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Inner highlight */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 via-transparent to-transparent" />

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className={cn(
                "p-3 rounded-lg border transition-all duration-500 relative",
                "bg-gradient-to-br from-muted/80 to-card/80",
                "shadow-lg backdrop-blur-sm",
                isHovered 
                  ? "border-primary/60 bg-gradient-to-br from-primary/20 to-accent-foreground/20 shadow-primary/25" 
                  : "border-muted/50 shadow-black/20"
              )}
              whileHover={{ 
                rotate: 360,
                scale: 1.1,
                z: 20
              }}
              transition={{ duration: 0.5 }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <Icon className={cn(
                "w-6 h-6 transition-colors duration-300",
                isHovered ? "text-primary" : "text-muted-foreground"
              )} />
            </motion.div>
            <div className="flex-1">
              <CardTitle className={cn(
                "text-xl font-bold transition-colors duration-300",
                isHovered ? "text-primary" : "text-foreground"
              )}>
                {title}
              </CardTitle>
              <div className="text-sm text-primary font-mono mt-1">
                Contact for pricing
              </div>
            </div>
          </div>
          <CardDescription className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Key Features
            </h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="relative z-10 pt-4">
          <Button
            onClick={onGetQuote}
            className={cn(
              "w-full group transition-all duration-300",
              "bg-gradient-to-r from-primary to-accent-foreground",
              "hover:from-primary/90 hover:to-accent-foreground/90",
              "border border-primary/30 hover:border-primary/60",
              "shadow-lg hover:shadow-primary/25"
            )}
          >
            <span className="flex items-center gap-2">
              Get Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </CardFooter>

        {/* Modern corner highlights */}
        <motion.div 
          className="absolute top-0 left-0 w-8 h-8"
          animate={{
            opacity: isHovered ? 1 : 0.6,
          }}
        >
          <div className={cn(
            "absolute top-2 left-2 w-4 h-0.5 rounded-full transition-all duration-300",
            "shadow-sm",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
          <div className={cn(
            "absolute top-2 left-2 w-0.5 h-4 rounded-full transition-all duration-300",
            "shadow-sm",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
        </motion.div>
        <motion.div 
          className="absolute top-0 right-0 w-8 h-8"
          animate={{
            opacity: isHovered ? 1 : 0.6,
          }}
        >
          <div className={cn(
            "absolute top-2 right-2 w-4 h-0.5 rounded-full transition-all duration-300",
            "shadow-sm",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
          <div className={cn(
            "absolute top-2 right-2 w-0.5 h-4 rounded-full transition-all duration-300",
            "shadow-sm",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
        </motion.div>
        <motion.div 
          className="absolute bottom-0 left-0 w-8 h-8"
          animate={{
            opacity: isHovered ? 1 : 0.6,
          }}
        >
          <div className={cn(
            "absolute bottom-2 left-2 w-4 h-0.5 rounded-full transition-all duration-300",
            "shadow-sm",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
          <div className={cn(
            "absolute bottom-2 left-2 w-0.5 h-4 rounded-full transition-all duration-300",
            "shadow-sm",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
        </motion.div>
        <motion.div 
          className="absolute bottom-0 right-0 w-8 h-8"
          animate={{
            opacity: isHovered ? 1 : 0.6,
          }}
        >
          <div className={cn(
            "absolute bottom-2 right-2 w-4 h-0.5 rounded-full transition-all duration-300",
            "shadow-sm",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
          <div className={cn(
            "absolute bottom-2 right-2 w-0.5 h-4 rounded-full transition-all duration-300",
            "shadow-sm",
            isHovered ? "bg-primary shadow-primary/50" : "bg-muted-foreground"
          )} />
        </motion.div>
      </Card>
    </motion.div>
  );
} 