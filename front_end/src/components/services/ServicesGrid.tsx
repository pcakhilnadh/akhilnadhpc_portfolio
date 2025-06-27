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
  MessageSquare
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
    title: "Machine Learning Consultancy",
    description: "Transform your business with cutting-edge AI solutions. From strategy to implementation, I'll guide your ML journey.",
    features: [
      "Custom ML model development",
      "Data strategy & architecture",
      "Performance optimization",
      "Model deployment & monitoring"
    ],
    icon: Brain,
    gradient: "bg-gradient-to-br from-primary/20 to-accent-foreground/20",
    category: "AI/ML"
  },
  {
    title: "Natural Language Processing",
    description: "Unlock insights from text data with advanced NLP solutions for classification, sentiment analysis, and more.",
    features: [
      "Text classification & sentiment analysis",
      "Named entity recognition",
      "Chatbot development",
      "Language translation services"
    ],
    icon: MessageSquare,
    gradient: "bg-gradient-to-br from-accent-foreground/20 to-secondary-foreground/20",
    category: "AI/ML"
  },
  {
    title: "Document Data Extraction",
    description: "Automate document processing with AI-powered extraction for invoices, forms, and structured documents.",
    features: [
      "OCR & text extraction",
      "Structured data parsing",
      "Invoice & form processing",
      "Custom template creation"
    ],
    icon: FileSearch,
    gradient: "bg-gradient-to-br from-primary/20 to-accent-foreground/20",
    category: "AI/ML"
  },
  {
    title: "Traffic Vehicle Identification",
    description: "Advanced computer vision solutions for traffic monitoring, vehicle detection, and smart city applications.",
    features: [
      "Real-time vehicle detection",
      "License plate recognition",
      "Traffic flow analysis",
      "Custom vision models"
    ],
    icon: Car,
    gradient: "bg-gradient-to-br from-secondary-foreground/20 to-primary/20",
    category: "AI/ML"
  },
  {
    title: "Resume Rewriting",
    description: "Professional resume optimization to help you stand out in competitive job markets with ATS-friendly formats.",
    features: [
      "ATS optimization",
      "Industry-specific formatting",
      "Keyword optimization",
      "Cover letter writing"
    ],
    icon: FileText,
    gradient: "bg-gradient-to-br from-accent-foreground/20 to-primary/20",
    category: "Consulting"
  },
  {
    title: "Portfolio Building",
    description: "Create stunning, responsive portfolios that showcase your skills and attract clients or employers.",
    features: [
      "Custom design & development",
      "Responsive layouts",
      "SEO optimization",
      "Content strategy"
    ],
    icon: PenTool,
    gradient: "bg-gradient-to-br from-primary/20 to-secondary-foreground/20",
    category: "Development"
  },
  {
    title: "Website Development",
    description: "Full-stack web development services for modern, scalable applications that drive business growth.",
    features: [
      "React/Next.js development",
      "Backend API development",
      "Database design",
      "Cloud deployment"
    ],
    icon: Globe,
    gradient: "bg-gradient-to-br from-secondary-foreground/20 to-accent-foreground/20",
    category: "Development"
  },
  {
    title: "Business Problem Solving",
    description: "Strategic consultation to identify, analyze, and solve complex business challenges with data-driven approaches.",
    features: [
      "Process optimization",
      "Data analysis & insights",
      "Strategic planning",
      "Custom solution development"
    ],
    icon: Lightbulb,
    gradient: "bg-gradient-to-br from-accent-foreground/20 to-primary/20",
    category: "Consulting"
  },
  {
    title: "AI Solutions & Automation",
    description: "End-to-end AI implementation for business automation, efficiency improvement, and competitive advantage.",
    features: [
      "Process automation",
      "Predictive analytics",
      "AI chatbots",
      "Custom AI integrations"
    ],
    icon: Bot,
    gradient: "bg-gradient-to-br from-primary/20 to-accent-foreground/20",
    category: "AI/ML"
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