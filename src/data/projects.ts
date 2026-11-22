/**
 * Projects Data
 * Industry-grade project structure for AI/ML projects
 */

export interface Project {
  _id: string;
  username: string;

  // Basic Information
  title: string;
  slug?: string;
  short_description: string;
  long_description?: string;

  project_type: "POC" | "Project" | "Personal";

  domain?: string[];
  industry?: string[];
  skills?: string[];

  status:
  | "Ideation"
  | "Research"
  | "Development"
  | "Completed";

  // Timeline
  start_date: string;
  end_date?: string;
  duration?: string;

  // Ownership
  role: string;
  company?: string;
  team_size?: number;

  // Recruiter Facing Metrics
  highlights?: ProjectHighlight[];

  // Business Context
  problem_statement?: string;
  business_impact?: string[];

  // Architecture
  architecture_overview?: string;
  workflow_steps?: string[];
  architecture_image?: string;

  // Dataset Information
  datasets?: Dataset[];

  // Models
  models?: MLModel[];

  // Deployment
  deployment?: DeploymentConfig;

  // Operations / MLOps
  operations?: OperationsConfig;

  // Technologies
  technologies?: string[];
  frameworks?: string[];
  libraries?: string[];
  cloud_services?: string[];

  // Visualization
  dashboard_tools?: string[];

  // Media
  thumbnail_url?: string;
  images?: string[];
  videos?: string[];

  // External Links
  github_url?: string;
  live_url?: string;
  documentation_url?: string;
  research_paper_url?: string;

  // Search & Filters
  tags?: string[];

}

export interface ProjectHighlight {
  label: string;
  value: string;
  category?:
  | "Performance"
  | "Accuracy"
  | "Scale"
  | "Business"
  | "Cost"
  | "Efficiency";
}

export interface Dataset {
  name: string;
  type?: "Public" | "Private" | "Custom";
  description?: string;
  source?: string;
  size?: string;
}

export interface MLModel {
  component_name: string;
  model_name: string;
  model_type:
  | "Classification"
  | "Detection"
  | "Segmentation"
  | "Regression"
  | "Generation"
  | "Embedding"
  | "LLM"
  | "RAG"
  | "Forecasting"
  | "Recommendation"
  | "Depth Estimation"
  | "OCR";
  purpose?: string;
  framework?: string;
  training_type?:
  | "Pretrained"
  | "Fine-tuned"
  | "Custom Trained"
  | "Transfer Learning";
  dataset_used?: string[];
  metrics?: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1_score?: number;
    latency?: string;
    custom_metrics?: Record<string, string | number>;
  };
  optimization?: string[];
  inference_location?: "Edge" | "Cloud" | "Hybrid";
  training_config?: TrainingConfig;
}

export interface TrainingConfig {
  platform?: string;
  gpu?: string[];
  epochs?: number;
  batch_size?: number;
  optimizer?: string;
  learning_rate?: number;
  scheduler?: string;
  loss_functions?: string[];
  augmentations?: string[];
  quantization?: string[];
  fine_tuning_method?: string;
  max_tokens?: number;
  context_window?: number;
  embedding_dimension?: number;
  experiment_tracking?: string[];
  notes?: string;
}

export interface DeploymentConfig {
  deployment_type?: "Cloud" | "Edge" | "Hybrid";
  edge_device?: string;
  cloud_provider?: string;
  hosting_platform?: string;
  runtime?: string[];
  api_framework?: string;
  ci_cd_tools?: string[];
  scalability?: string[];
  inference_latency?: string;
}

export interface OperationsConfig {
  monitoring?: string[];
  logging?: string[];
  alerting?: string[];
  retraining_strategy?: string;
  experiment_tracking?: string[];
  data_versioning?: string[];
}

// Inflight Meal Consumption Analytics Project
export const inflightMealConsumptionAnalytics: Project = {
  _id: "project_011",
  username: "akhilnadhpc",
  title: "End-to-End Inflight Meal Consumption Analytics",
  slug: "end-to-end-inflight-meal-consumption-analytics",
  short_description:
    "AI-powered computer vision platform for automated inflight food waste analytics using edge AI and Azure cloud infrastructure.",
  long_description:
    "Designed and developed an end-to-end inflight meal consumption analytics platform for automated food waste analysis in airline catering operations. The solution leveraged edge AI using NVIDIA Jetson Orin Nano for real-time tray detection and cloud-based AI pipelines for food classification, depth estimation, and regional consumption analytics. The system automated manual auditing workflows and enabled data-driven catering optimization.",
  project_type: "Project",
  domain: [
    "Computer Vision",
    "Edge AI",
    "MLOps",
    "Cloud AI",
    "Deep Learning",
  ],
  industry: [
    "Aviation",
    "Airline Catering",
    "Sustainability Analytics",
  ],
  skills: [
    "Computer Vision",
    "Deep Learning",
    "Object Detection",
    "Image Classification",
    "Depth Estimation",
    "Edge Deployment",
    "Model Optimization",
    "MLOps",
    "Cloud Deployment",
    "Real-Time Inference",
  ],
  status: "Completed",
  start_date: "2024-01-01",
  end_date: "2024-08-31",
  duration: "8 Months",
  role: "Data Scientist",
  company: "work_exp_002",
  team_size: 6,
  highlights: [
    {
      label: "Food Classification Accuracy",
      value: "92%",
      category: "Accuracy",
    },
    {
      label: "Edge Inference Latency",
      value: "<50 ms",
      category: "Performance",
    },
    {
      label: "Manual Auditing Reduction",
      value: "80%",
      category: "Business",
    },
    {
      label: "Tray Processing Capacity",
      value: "50K+ trays/day",
      category: "Scale",
    },
  ],
  problem_statement:
    "Airline catering teams lacked visibility into meal consumption patterns and inflight food wastage. Existing manual auditing processes were inconsistent, expensive, and non-scalable across multiple regions. The project aimed to automate tray analysis and generate actionable waste analytics using computer vision and cloud AI.",
  business_impact: [
    "Enabled automated inflight food waste analytics",
    "Reduced catering overproduction through consumption insights",
    "Improved sustainability and waste reporting",
    "Automated manual meal auditing workflows",
    "Provided region-wise food consumption trends for operational optimization",
  ],
  architecture_overview:
    "Built a hybrid edge-cloud AI pipeline where conveyor belt tray images were processed on NVIDIA Jetson Orin Nano using YOLOv8 for tray detection and OpenCV for plate validation. Validated images were uploaded to Azure Blob Storage for cloud-based food classification and volumetric estimation pipelines, followed by analytics dashboard generation using Power BI.",
  workflow_steps: [
    "Industrial camera mounted above conveyor belt captures tray movement",
    "YOLOv8 Nano running on Jetson Orin Nano detects trays in real time",
    "OpenCV validates fully visible tray boundaries",
    "Validated tray images uploaded to Azure Blob Storage",
    "Cloud pipeline performs food classification using EfficientNet",
    "Depth estimation model predicts remaining food volume",
    "Waste analytics aggregated region-wise and stored in cloud databases",
    "Power BI dashboards visualize operational insights",
  ],
  architecture_image: "/assets/projects/inflight-meal-analytics/architecture.png",
  datasets: [
    {
      name: "FoodNet",
      type: "Public",
      description:
        "Public food image dataset used for food classification model training",
      source: "FoodNet",
    },
    {
      name: "Airline Tray Dataset",
      type: "Custom",
      description:
        "Custom annotated tray images collected from inflight catering operations",
      size: "50K+ annotated tray images",
    },
  ],
  models: [
    {
      component_name: "Tray Detection",
      model_name: "YOLOv8 Nano",
      model_type: "Detection",
      purpose: "Real-time tray and plate detection on conveyor belt images",
      framework: "PyTorch",
      training_type: "Fine-tuned",
      dataset_used: ["Airline Tray Dataset"],
      metrics: {
        accuracy: 0.94,
        precision: 0.91,
        recall: 0.9,
        latency: "<30 ms",
        custom_metrics: {
          mAP50: 0.94,
        },
      },
      optimization: ["TensorRT Optimization", "FP16 Quantization", "ONNX Conversion"],
      inference_location: "Edge",
      training_config: {
        platform: "Azure ML",
        gpu: ["NVIDIA A100"],
        epochs: 100,
        batch_size: 32,
        optimizer: "AdamW",
        learning_rate: 0.001,
        augmentations: [
          "Rotation",
          "Motion Blur",
          "Brightness Variation",
          "Occlusion",
        ],
        experiment_tracking: ["MLflow"],
        notes: "Model optimized for low-latency edge inference on Jetson Orin Nano",
      },
    },
    {
      component_name: "Food Classification",
      model_name: "EfficientNet-B3",
      model_type: "Classification",
      purpose: "Classify food categories from tray images",
      framework: "PyTorch",
      training_type: "Transfer Learning",
      dataset_used: ["FoodNet"],
      metrics: {
        accuracy: 0.92,
        latency: "<100 ms",
      },
      optimization: ["Mixed Precision Inference"],
      inference_location: "Cloud",
      training_config: {
        platform: "Azure ML",
        gpu: ["NVIDIA V100"],
        epochs: 50,
        batch_size: 64,
        optimizer: "Adam",
        learning_rate: 0.0005,
        scheduler: "Cosine Annealing",
        augmentations: [
          "Random Crop",
          "Color Jitter",
          "Illumination Correction",
        ],
        experiment_tracking: ["MLflow"],
      },
    },
    {
      component_name: "Food Volume Estimation",
      model_name: "MiDaS",
      model_type: "Depth Estimation",
      purpose:
        "Estimate remaining food volume using monocular depth estimation",
      framework: "PyTorch",
      training_type: "Fine-tuned",
      metrics: {
        latency: "<150 ms",
      },
      optimization: ["FP16 Inference"],
      inference_location: "Cloud",
      training_config: {
        platform: "Azure ML",
        gpu: ["NVIDIA A100"],
        epochs: 80,
        batch_size: 16,
        optimizer: "AdamW",
        learning_rate: 0.0001,
        loss_functions: ["RMSE Loss", "Scale Invariant Depth Loss"],
      },
    },
  ],
  deployment: {
    deployment_type: "Hybrid",
    edge_device: "NVIDIA Jetson Orin Nano",
    cloud_provider: "Microsoft Azure",
    hosting_platform: "Azure Kubernetes Service",
    runtime: ["TensorRT", "DeepStream SDK", "Docker", "CUDA"],
    api_framework: "FastAPI",
    ci_cd_tools: ["Azure DevOps"],
    scalability: [
      "Event-Driven Architecture",
      "Cloud Horizontal Scaling",
      "Asynchronous Inference Pipeline",
    ],
    inference_latency: "<500 ms end-to-end pipeline latency",
  },
  operations: {
    monitoring: [
      "Azure ML Monitoring",
      "Prediction Drift Monitoring",
      "Inference Latency Monitoring",
      "Model Accuracy Tracking",
    ],
    logging: ["Azure Application Insights", "Centralized Cloud Logging"],
    alerting: [
      "Inference Failure Alerts",
      "Data Drift Alerts",
      "Pipeline Health Alerts",
    ],
    retraining_strategy:
      "Monthly retraining using newly collected tray images and human-reviewed low-confidence predictions",
    experiment_tracking: ["MLflow"],
    data_versioning: ["DVC"],
  },
  technologies: [
    "Python",
    "Azure",
    "Docker",
    "TensorRT",
    "CUDA",
    "FastAPI",
  ],
  frameworks: [
    "PyTorch",
    "YOLOv8",
    "EfficientNet",
    "MiDaS",
  ],
  libraries: [
    "OpenCV",
    "NumPy",
    "Pandas",
  ],
  cloud_services: [
    "Azure Blob Storage",
    "Azure Functions",
    "Azure ML",
    "Azure Kubernetes Service",
    "Azure SQL Database",
  ],
  dashboard_tools: [
    "Power BI",
  ],
  thumbnail_url: "/assets/projects/inflight-meal-analytics/thumbnail.png",
  images: [
    "/assets/projects/inflight-meal-analytics/architecture.png",
    "/assets/projects/inflight-meal-analytics/dashboard.png",
    "/assets/projects/inflight-meal-analytics/detection-output.png",
  ],
  tags: [
    "Computer Vision",
    "Edge AI",
    "Deep Learning",
    "Azure",
    "MLOps",
    "Food Analytics",
    "Real-Time Inference",
    "Object Detection",
  ],
};

// Projects
export const projects: Project[] = [inflightMealConsumptionAnalytics];

// Helper Functions

// Get project by ID
export const getProjectById = (projectId: string): Project | undefined => {
  return projects.find((proj) => proj._id === projectId);
};

// Get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((proj) => proj.slug === slug);
};

// Get projects by username
export const getProjectsByUsername = (username: string): Project[] => {
  return projects.filter((proj) => proj.username === username);
};

// Get projects by status
export const getProjectsByStatus = (status: Project["status"]): Project[] => {
  return projects.filter((proj) => proj.status === status);
};

// Get projects by domain
export const getProjectsByDomain = (domain: string): Project[] => {
  return projects.filter((proj) => proj.domain?.includes(domain));
};

// Get projects by industry
export const getProjectsByIndustry = (industry: string): Project[] => {
  return projects.filter((proj) => proj.industry?.includes(industry));
};

// Get projects by tag
export const getProjectsByTag = (tag: string): Project[] => {
  return projects.filter((proj) => proj.tags?.includes(tag));
};

// Get unique domains from all projects
export const getAllDomains = (): string[] => {
  const domains = new Set<string>();
  projects.forEach((proj) => {
    proj.domain?.forEach((d) => domains.add(d));
  });
  return Array.from(domains).sort();
};

// Get unique industries from all projects
export const getAllIndustries = (): string[] => {
  const industries = new Set<string>();
  projects.forEach((proj) => {
    proj.industry?.forEach((i) => industries.add(i));
  });
  return Array.from(industries).sort();
};

// Get unique technologies from all projects
export const getAllTechnologies = (): string[] => {
  const techs = new Set<string>();
  projects.forEach((proj) => {
    proj.technologies?.forEach((t) => techs.add(t));
    proj.frameworks?.forEach((f) => techs.add(f));
    proj.libraries?.forEach((l) => techs.add(l));
  });
  return Array.from(techs).sort();
};

// Get unique tags from all projects
export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  projects.forEach((proj) => {
    proj.tags?.forEach((t) => tags.add(t));
  });
  return Array.from(tags).sort();
};

// Calculate project duration in months
export const calculateProjectDuration = (startDate: string, endDate?: string): number => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
};

// Format duration string
export const formatDurationString = (months: number): string => {
  if (months === 0) return "< 1 month";
  if (months === 1) return "1 month";
  if (months < 12) return `${months} months`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
};

// Check if project is current
export const isCurrentProject = (proj: Project): boolean => {
  return !proj.end_date;
};

// Get all project highlights
export const getProjectHighlights = (projectId: string): ProjectHighlight[] => {
  const project = getProjectById(projectId);
  return project?.highlights || [];
};

// Get all models for a project
export const getProjectModels = (projectId: string): MLModel[] => {
  const project = getProjectById(projectId);
  return project?.models || [];
};

// Get all datasets for a project
export const getProjectDatasets = (projectId: string): Dataset[] => {
  const project = getProjectById(projectId);
  return project?.datasets || [];
};

// Get all skills for a project
export const getProjectSkills = (projectId: string): string[] => {
  const project = getProjectById(projectId);
  return project?.skills || [];
};
