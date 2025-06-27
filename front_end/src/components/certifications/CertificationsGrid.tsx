import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Shield, Star } from 'lucide-react';
import { Certification } from '@/types/data';
import CertificationCard from './CertificationCard';
import { cn } from '@/lib/utils';

interface CertificationsGridProps {
  certifications: Certification[];
}

type FilterType = 'all' | 'active' | 'expired';

export default function CertificationsGrid({ certifications }: CertificationsGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Helper function to check if certificate has a valid expiry date
  const hasValidExpiryDate = (expiryDate: string | null | undefined) => {
    return expiryDate && 
           expiryDate !== "No Expiry" && 
           expiryDate !== "" && 
           expiryDate.trim() !== "";
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = certifications.length;
    const active = certifications.filter(cert => {
      if (!hasValidExpiryDate(cert.expiry_date)) return true; // Certificates without expiry are always active
      const isExpired = new Date(cert.expiry_date!) < new Date();
      return !isExpired;
    }).length;
    const expired = certifications.filter(cert => {
      if (!hasValidExpiryDate(cert.expiry_date)) return false; // Certificates without expiry cannot be expired
      return new Date(cert.expiry_date!) < new Date();
    }).length;

    return { total, active, expired };
  }, [certifications]);

  // Filter certifications based on active filter
  const filteredCertifications = useMemo(() => {
    if (activeFilter === 'all') return certifications;
    
    return certifications.filter(cert => {
      if (activeFilter === 'active') {
        if (!hasValidExpiryDate(cert.expiry_date)) return true; // Certificates without expiry are always active
        return new Date(cert.expiry_date!) >= new Date();
      } else if (activeFilter === 'expired') {
        if (!hasValidExpiryDate(cert.expiry_date)) return false; // Certificates without expiry cannot be expired
        return new Date(cert.expiry_date!) < new Date();
      }
      return true;
    });
  }, [certifications, activeFilter]);

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  return (
    <div className="w-full space-y-8 relative">
      {/* 3D Sky Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full opacity-20",
              i % 3 === 0 && "bg-gradient-to-br from-primary/30 to-primary/10",
              i % 3 === 1 && "bg-gradient-to-br from-accent-foreground/30 to-accent-foreground/10", 
              i % 3 === 2 && "bg-gradient-to-br from-secondary-foreground/30 to-secondary-foreground/10"
            )}
            style={{
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Floating cubes with CSS 3D transforms */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`cube-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 180],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          >
            <div 
              className={cn(
                "w-8 h-8 opacity-10",
                i % 2 === 0 
                  ? "bg-gradient-to-br from-primary/50 to-primary/20 border border-primary/30" 
                  : "bg-gradient-to-br from-accent-foreground/50 to-accent-foreground/20 border border-accent-foreground/30"
              )}
              style={{
                transform: 'rotateX(45deg) rotateY(45deg)',
                filter: 'blur(0.5px)',
              }}
            />
          </motion.div>
        ))}

        {/* Layered gradient clouds */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute opacity-5"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              background: `radial-gradient(ellipse, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.3) 40%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(3px)',
            }}
            animate={{
              x: [0, 100, 0],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Subtle particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(var(--primary))`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Ambient light orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${80 + Math.random() * 120}px`,
              height: `${80 + Math.random() * 120}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, hsl(var(--accent-foreground) / 0.2) 50%, transparent 100%)`,
              filter: 'blur(4px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 30 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Statistics Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-3 gap-4 relative z-10"
      >
        {[
          { label: 'Total', value: stats.total, icon: Award, color: 'primary', filter: 'all' as FilterType },
          { label: 'Active', value: stats.active, icon: Star, color: 'primary', filter: 'active' as FilterType },
          { label: 'Expired', value: stats.expired, icon: Shield, color: 'destructive', filter: 'expired' as FilterType }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={() => handleFilterClick(stat.filter)}
          >
            <div className={cn(
              "absolute inset-0 rounded-xl blur-lg transition-opacity duration-500",
              activeFilter === stat.filter
                ? "bg-gradient-to-br from-primary/20 via-accent-foreground/10 to-primary/20 opacity-100"
                : "bg-gradient-to-br from-primary/10 via-accent-foreground/5 to-primary/10 opacity-0 group-hover:opacity-100"
            )} />
            <div className={cn(
              "relative bg-card/80 border rounded-xl p-4 backdrop-blur-sm transition-all duration-300",
              activeFilter === stat.filter
                ? "border-primary/60 shadow-xl shadow-primary/20 scale-105"
                : "border-primary/20 hover:border-primary/40 hover:scale-102"
            )}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={cn(
                    "text-sm font-mono transition-colors duration-300",
                    activeFilter === stat.filter ? "text-primary" : "text-muted-foreground"
                  )}>{stat.label}</p>
                </div>
                <div className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  stat.color === 'primary' && (
                    activeFilter === stat.filter 
                      ? "bg-primary/30 text-primary shadow-lg" 
                      : "bg-primary/20 text-primary"
                  ),
                  stat.color === 'destructive' && (
                    activeFilter === stat.filter 
                      ? "bg-destructive/30 text-destructive shadow-lg" 
                      : "bg-destructive/20 text-destructive"
                  )
                )}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              
              {/* Active indicator */}
              {activeFilter === stat.filter && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent-foreground rounded-b-xl"
                />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter indicator */}
      {activeFilter !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center relative z-10"
        >
          <div className="bg-gradient-to-r from-primary/20 to-accent-foreground/20 border border-primary/30 rounded-lg px-4 py-2 backdrop-blur-sm">
            <p className="text-sm text-primary font-medium">
              Showing {filteredCertifications.length} {activeFilter} certificate{filteredCertifications.length !== 1 ? 's' : ''}
              <button
                onClick={() => setActiveFilter('all')}
                className="ml-3 text-xs text-muted-foreground hover:text-primary transition-colors underline"
              >
                Clear filter
              </button>
            </p>
          </div>
        </motion.div>
      )}

      {/* Certifications Grid */}
      <motion.div
        key={activeFilter} // Re-render when filter changes
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 relative z-10"
      >
        {filteredCertifications.map((certification, index) => (
          <CertificationCard
            key={certification.id}
            certification={certification}
            index={index}
          />
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredCertifications.length === 0 && activeFilter !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 relative z-10"
        >
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent-foreground/10 rounded-xl blur-lg" />
            <div className="relative bg-card/70 border border-primary/30 rounded-xl p-8 backdrop-blur-sm">
              <div className="text-4xl mb-4">📜</div>
              <p className="text-foreground text-lg mb-2 font-medium">No {activeFilter} certificates found</p>
              <p className="text-muted-foreground text-sm mb-4">
                Try selecting a different filter or view all certificates
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="bg-primary/20 border border-primary/40 text-primary px-4 py-2 rounded-lg hover:bg-primary/30 transition-colors"
              >
                Show All Certificates
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 