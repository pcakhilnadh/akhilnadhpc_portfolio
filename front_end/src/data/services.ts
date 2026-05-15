/**
 * Services Data
 * Contains service offerings and their details
 */

export interface Service {
  id: string | number;
  title: string;
  description: string;
  category: string;
  email: string;
  icon_name: string;
  gradient: string;
  features: string[];
}

// Services
export const services: Service[] = [
  {
    id: 1,
    title: "AI/ML Development",
    description: "Custom machine learning models and AI solutions tailored to your business needs.",
    category: "AI/ML",
    email: "akhilnadhpc@gmail.com",
    icon_name: "Brain",
    gradient: "bg-gradient-to-br from-primary/20 to-secondary/20",
    features: [
      "Predictive Analytics",
      "Computer Vision",
      "Natural Language Processing",
      "Recommendation Systems",
      "Model Optimization",
      "Production Deployment",
    ],
  },
  {
    id: 2,
    title: "Full-Stack Development",
    description: "End-to-end web and mobile applications with modern technologies.",
    category: "Development",
    email: "akhilnadhpc@gmail.com",
    icon_name: "Code",
    gradient: "bg-gradient-to-br from-secondary/20 to-accent-indigo/20",
    features: [
      "React/Next.js Frontend",
      "Node.js/Python Backend",
      "Database Design",
      "API Development",
      "Cloud Deployment",
      "Performance Optimization",
    ],
  },
  {
    id: 3,
    title: "Data Engineering",
    description: "Scalable data pipelines and infrastructure for big data processing.",
    category: "AI/ML",
    email: "akhilnadhpc@gmail.com",
    icon_name: "Database",
    gradient: "bg-gradient-to-br from-primary/20 to-secondary/20",
    features: [
      "ETL Pipeline Design",
      "Data Warehousing",
      "Real-time Processing",
      "Data Quality Assurance",
      "Monitoring & Alerting",
      "Cost Optimization",
    ],
  },
  {
    id: 4,
    title: "DevOps & Cloud",
    description: "Infrastructure automation and cloud-native solutions.",
    category: "Development",
    email: "akhilnadhpc@gmail.com",
    icon_name: "Cloud",
    gradient: "bg-gradient-to-br from-secondary/20 to-primary/20",
    features: [
      "CI/CD Pipeline Setup",
      "Container Orchestration",
      "Cloud Architecture",
      "Monitoring & Logging",
      "Security Best Practices",
      "Cost Management",
    ],
  },
  {
    id: 5,
    title: "Technical Consulting",
    description: "Strategic guidance for technology decisions and architecture.",
    category: "Consulting",
    email: "akhilnadhpc@gmail.com",
    icon_name: "Users",
    gradient: "bg-gradient-to-br from-accent-indigo/20 to-secondary/20",
    features: [
      "Technology Assessment",
      "Architecture Design",
      "Performance Audits",
      "Security Reviews",
      "Team Training",
      "Project Planning",
    ],
  },
  {
    id: 6,
    title: "API Development",
    description: "Robust and scalable APIs for seamless integration.",
    category: "Development",
    email: "akhilnadhpc@gmail.com",
    icon_name: "Zap",
    gradient: "bg-gradient-to-br from-secondary/20 to-primary/20",
    features: [
      "RESTful API Design",
      "GraphQL Implementation",
      "Authentication & Authorization",
      "Rate Limiting",
      "Documentation",
      "Testing & Monitoring",
    ],
  },
];

// Helper function to get service by ID
export const getServiceById = (serviceId: string | number): Service | undefined => {
  return services.find((service) => service.id === serviceId);
};

// Helper function to get services by category
export const getServicesByCategory = (category: string): Service[] => {
  return services.filter((service) => service.category === category);
};

// Helper function to get all unique categories
export const getAllCategories = (): string[] => {
  const categories = new Set(services.map((service) => service.category));
  return Array.from(categories);
};
