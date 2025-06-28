import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, ArrowDown, Sparkles } from 'lucide-react';
import { useServicesData } from '@/hooks/useServicesData';

export default function ServicesHero() {
  const { data } = useServicesData();
  
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-grid');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Extract unique features from services data for dynamic highlights
  const getFeatureHighlights = () => {
    if (!data?.services) return [];
    
    const allFeatures = data.services.flatMap(service => service.features);
    const uniqueFeatures = [...new Set(allFeatures)];
    
    // Return first 5 unique features, or fallback to default if no features
    return uniqueFeatures.slice(0, 5).length > 0 
      ? uniqueFeatures.slice(0, 5)
      : ["AI Solutions", "Web Development", "Data Engineering", "Cloud Services", "Consulting"];
  };

  const featureHighlights = getFeatureHighlights();

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Main title with glow effect */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MY SERVICES
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cutting-edge <span className="text-primary font-semibold">AI solutions</span> and 
            <span className="text-secondary font-semibold"> digital services</span> to transform your business
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {featureHighlights.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center gap-2 px-4 py-2 bg-muted/50 border border-primary/30 rounded-full"
                whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary) / 0.6)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="flex flex-col gap-4 justify-center items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              onClick={scrollToServices}
              size="lg"
              className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border border-primary/30 shadow-lg hover:shadow-primary/25 px-8 py-4"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Explore Services
              <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
            
            <div className="text-sm text-muted-foreground font-mono text-center">
              <span className="text-primary">{data?.total_services || 0}+</span> Services Available
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
} 