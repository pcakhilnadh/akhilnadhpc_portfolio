import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import EmailModal from './EmailModal';
import { 
  Brain, 
  FileText, 
  Car, 
  FileSearch, 
  PenTool, 
  Globe, 
  Lightbulb,
  Bot,
  MessageSquare,
  Code,
  Database,
  Cloud,
  Users,
  Zap
} from 'lucide-react';

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: any;
  gradient: string;
  category: 'AI/ML' | 'Development' | 'Consulting';
}

const services: Service[] = [
  {
    title: "AI/ML Development",
    description: "Custom machine learning models and AI solutions tailored to your business needs.",
    features: [
      "Predictive Analytics",
      "Computer Vision",
      "Natural Language Processing",
      "Recommendation Systems",
      "Model Optimization",
      "Production Deployment"
    ],
    icon: Brain,
    gradient: "bg-gradient-to-br from-primary/20 to-secondary/20",
    category: 'AI/ML'
  },
  {
    title: "Full-Stack Development",
    description: "End-to-end web and mobile applications with modern technologies.",
    features: [
      "React/Next.js Frontend",
      "Node.js/Python Backend",
      "Database Design",
      "API Development",
      "Cloud Deployment",
      "Performance Optimization"
    ],
    icon: Code,
    gradient: "bg-gradient-to-br from-secondary/20 to-accent-indigo/20",
    category: 'Development'
  },
  {
    title: "Data Engineering",
    description: "Scalable data pipelines and infrastructure for big data processing.",
    features: [
      "ETL Pipeline Design",
      "Data Warehousing",
      "Real-time Processing",
      "Data Quality Assurance",
      "Monitoring & Alerting",
      "Cost Optimization"
    ],
    icon: Database,
    gradient: "bg-gradient-to-br from-primary/20 to-secondary/20",
    category: 'AI/ML'
  },
  {
    title: "DevOps & Cloud",
    description: "Infrastructure automation and cloud-native solutions.",
    features: [
      "CI/CD Pipeline Setup",
      "Container Orchestration",
      "Cloud Architecture",
      "Monitoring & Logging",
      "Security Best Practices",
      "Cost Management"
    ],
    icon: Cloud,
    gradient: "bg-gradient-to-br from-secondary/20 to-primary/20",
    category: 'Development'
  },
  {
    title: "Technical Consulting",
    description: "Strategic guidance for technology decisions and architecture.",
    features: [
      "Technology Assessment",
      "Architecture Design",
      "Performance Audits",
      "Security Reviews",
      "Team Training",
      "Project Planning"
    ],
    icon: Users,
    gradient: "bg-gradient-to-br from-accent-indigo/20 to-secondary/20",
    category: 'Consulting'
  },
  {
    title: "API Development",
    description: "Robust and scalable APIs for seamless integration.",
    features: [
      "RESTful API Design",
      "GraphQL Implementation",
      "Authentication & Authorization",
      "Rate Limiting",
      "Documentation",
      "Testing & Monitoring"
    ],
    icon: Zap,
    gradient: "bg-gradient-to-br from-secondary/20 to-primary/20",
    category: 'Development'
  }
];

export default function ServicesGrid() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI/ML' | 'Development' | 'Consulting'>('All');

  const handleGetQuote = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsEmailModalOpen(true);
  };

  const filteredServices = activeFilter === 'All' 
    ? services 
    : services.filter(service => service.category === activeFilter);

  const categories = ['All', 'AI/ML', 'Development', 'Consulting'];

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
            onClick={() => setActiveFilter(category as any)}
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
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.title}
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
              icon={service.icon}
              gradient={service.gradient}
              onGetQuote={() => handleGetQuote(service.title)}
            />
          </motion.div>
        ))}
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