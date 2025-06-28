import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import EmailModal from './EmailModal';
import { useServicesData } from '@/hooks/useServicesData';
import { getIconComponent } from '@/lib/iconMapping';

export default function ServicesGrid() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  const { data, loading, error } = useServicesData();

  const handleGetQuote = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsEmailModalOpen(true);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="relative space-y-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="relative space-y-8">
        <div className="text-center text-red-500">
          <p>Error loading services: {error}</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!data || !data.services.length) {
    return (
      <div className="relative space-y-8">
        <div className="text-center text-muted-foreground">
          <p>No services available at the moment.</p>
        </div>
      </div>
    );
  }

  const filteredServices = activeFilter === 'All' 
    ? data.services 
    : data.services.filter(service => service.category === activeFilter);

  const categories = ['All', ...data.categories];

  return (
    <div className="relative space-y-8">
      {/* Cross marks background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Additional cross pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 35%, hsl(var(--primary)) 50%, transparent 65%),
            linear-gradient(-45deg, transparent 35%, hsl(var(--primary)) 50%, transparent 65%)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Category Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-wrap justify-center gap-4 mb-8"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`
              px-6 py-3 rounded-lg border-2 transition-all duration-300 font-mono text-sm
              ${activeFilter === category
                ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/25'
                : 'border-muted bg-muted/50 text-muted-foreground hover:border-muted-foreground'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Services Grid */}
      <motion.div 
        layout
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {filteredServices.map((service, index) => {
          const IconComponent = getIconComponent(service.icon_name);
          
          return (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1 
              }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                features={service.features}
                icon={IconComponent}
                gradient={service.gradient}
                onGetQuote={() => handleGetQuote(service.title)}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Email Modal */}
      <div className="relative z-20">
        <EmailModal 
          isOpen={isEmailModalOpen} 
          onClose={() => setIsEmailModalOpen(false)}
          service={selectedService}
        />
      </div>
    </div>
  );
} 