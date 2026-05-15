/**
 * Projects Data
 * Contains projects and their relationships to skills, achievements, and ML models
 */

export interface Project {
  _id: string;
  username: string;
  title: string;
  short_description: string;
  long_description: string;
  project_type: string;
  status: string;
  github_url?: string;
  live_url?: string;
  notion_url?: string;
  start_date: string;
  end_date?: string;
  role: string;
  company: string;
  hosting_platform?: string;
  cicd_pipeline?: string;
  monitoring_tracking?: string;
}

export interface ProjectSkill {
  _id: string;
  project_id: string;
  skill_id: string;
}

export interface ProjectAchievement {
  _id: string;
  project_id: string;
  achievement_title: string;
  achievement_description: string;
}

export interface MLModel {
  _id: string;
  name: string;
  model_type: string;
  framework: string;
  version: string;
  training_data_size: string;
  deployment_status: string;
  description: string;
}

export interface ProjectMLModel {
  _id: string;
  project_id: string;
  ml_model_id: string;
  model_role: string;
  model_version: string;
}

export interface MLModelEvaluationMetric {
  _id: string;
  ml_model_id: string;
  metric_name: string;
  metric_value: string | number;
  metric_type: string;
}

export interface MLModelTrainingParameter {
  _id: string;
  ml_model_id: string;
  parameter_name: string;
  parameter_value: string | number;
  parameter_type: string;
}

export interface MLModelUseCase {
  _id: string;
  ml_model_id: string;
  use_case_name: string;
  business_impact: string;
}

// Projects
export const projects: Project[] = [
  {
    _id: "project_001",
    username: "akhilnadhpc",
    title: "Sensor Fusion For Virtual Turn Assist",
    short_description: "ML-based POC for real-time car detection and collision probability using radar and camera fusion",
    long_description:
      "Led a team of 5; contributed to ROS2 node design; custom message formats; real-time performance; ML prediction code using Pytorch",
    project_type: "POC",
    status: "Completed",
    github_url: undefined,
    live_url: undefined,
    notion_url: undefined,
    start_date: "2023-01-01",
    end_date: undefined,
    role: "Technical Lead",
    company: "work_exp_001",
    hosting_platform: undefined,
    cicd_pipeline: undefined,
    monitoring_tracking: undefined,
  },
  {
    _id: "project_002",
    username: "akhilnadhpc",
    title: "Radar Solution For Virtual Turn Assist",
    short_description: "Radar-based real-time automobile detection and collision estimation",
    long_description:
      "Developed code for concurrent sensor data reading; OBD async speed parsing; TCP comms between Unity and Python; codebase design and tuning",
    project_type: "POC",
    status: "Completed",
    github_url: undefined,
    live_url: undefined,
    notion_url: undefined,
    start_date: "2023-01-01",
    end_date: undefined,
    role: "Developer",
    company: "work_exp_001",
    hosting_platform: undefined,
    cicd_pipeline: undefined,
    monitoring_tracking: undefined,
  },
  {
    _id: "project_003",
    username: "akhilnadhpc",
    title: "Gesture and Drowsiness Detection To Assist Driver",
    short_description: "ML model for gesture and drowsiness detection in vehicles",
    long_description: "Integrated head pose recognition; OpenCV UI; gesture model; LSTM-based sequential model",
    project_type: "POC",
    status: "Completed",
    github_url: undefined,
    live_url: undefined,
    notion_url: undefined,
    start_date: "2022-01-01",
    end_date: "2023-12-31",
    role: "Developer",
    company: "work_exp_001",
    hosting_platform: undefined,
    cicd_pipeline: undefined,
    monitoring_tracking: undefined,
  },
  {
    _id: "project_004",
    username: "akhilnadhpc",
    title: "Issue Prediction Tool",
    short_description: "NLP-based tool for predicting system/component damage",
    long_description: "Custom ML models for text input; context evaluation; system prediction",
    project_type: "POC",
    status: "Completed",
    github_url: undefined,
    live_url: undefined,
    notion_url: undefined,
    start_date: "2021-01-01",
    end_date: "2022-12-31",
    role: "Developer",
    company: "work_exp_001",
    hosting_platform: undefined,
    cicd_pipeline: undefined,
    monitoring_tracking: undefined,
  },
  {
    _id: "project_005",
    username: "akhilnadhpc",
    title: "PDF Data Digitization Tool",
    short_description: "AI tool for parsing and digitizing PDF documents",
    long_description: "NLP search engine; PDF-to-text; NER; vector space model; MongoDB storage",
    project_type: "POC",
    status: "Completed",
    github_url: undefined,
    live_url: undefined,
    notion_url: undefined,
    start_date: "2020-01-01",
    end_date: "2021-12-31",
    role: "Developer",
    company: "work_exp_001",
    hosting_platform: undefined,
    cicd_pipeline: undefined,
    monitoring_tracking: undefined,
  },
  {
    _id: "project_006",
    username: "akhilnadhpc",
    title: "AR Navigation",
    short_description: "Android app for AR-based navigation",
    long_description: "ML models for road boundary/flood detection; precise navigation",
    project_type: "POC",
    status: "Completed",
    github_url: undefined,
    live_url: undefined,
    notion_url: undefined,
    start_date: "2019-01-01",
    end_date: "2020-12-31",
    role: "Developer",
    company: "work_exp_001",
    hosting_platform: undefined,
    cicd_pipeline: undefined,
    monitoring_tracking: undefined,
  },
  {
    _id: "project_007",
    username: "akhilnadhpc",
    title: "HMI Surface Projection and HVPA",
    short_description: "Camera-based HMI for menu projection and holographic assistant",
    long_description: "Hand detection; menu projection; Unity-based holographic assistant",
    project_type: "POC",
    status: "Completed",
    github_url: undefined,
    live_url: undefined,
    notion_url: undefined,
    start_date: "2019-01-01",
    end_date: "2020-12-31",
    role: "Developer",
    company: "work_exp_001",
    hosting_platform: undefined,
    cicd_pipeline: undefined,
    monitoring_tracking: undefined,
  },
  {
    _id: "project_008",
    username: "akhilnadhpc",
    title: "Mid Air Haptics in Unity & Hand Tracking",
    short_description: "Hand tracking and haptics in Unity",
    long_description: "Hand tracking and mid-air haptics in Unity",
    project_type: "POC",
    status: "Completed",
    github_url: undefined,
    live_url: undefined,
    notion_url: undefined,
    start_date: "2019-01-01",
    end_date: "2020-12-31",
    role: "Developer",
    company: "work_exp_001",
    hosting_platform: undefined,
    cicd_pipeline: undefined,
    monitoring_tracking: undefined,
  },
  {
    _id: "project_009",
    username: "akhilnadhpc",
    title: "Portfolio WebApp",
    short_description:
      "Modern full-stack personal portfolio application with React frontend and FastAPI backend",
    long_description:
      "A comprehensive portfolio website featuring dynamic content loading from CSV data; modern UI/UX with dark/light mode; responsive design; Docker containerization; and clean architecture principles. Built with React TypeScript Vite Tailwind CSS frontend and FastAPI Python backend",
    project_type: "Project",
    status: "In Progress",
    github_url: "https://github.com/pcakhilnadh/akhilnadhpc_portfolio",
    live_url: "https://akhilnadhpc.in/",
    notion_url: "https://github.com/pcakhilnadh/akhilnadhpc_portfolio/blob/main/README.md",
    start_date: "2025-06-15",
    end_date: undefined,
    role: "Full Stack Developer",
    company: "work_exp_002",
    hosting_platform: "Google Cloud Run",
    cicd_pipeline: "Docker GitHub Actions",
    monitoring_tracking: undefined,
  },
];

// Project Skills (junction table)
export const projectSkills: ProjectSkill[] = [
  { _id: "proj_skill_001", project_id: "project_001", skill_id: "skill_037" },
  { _id: "proj_skill_002", project_id: "project_001", skill_id: "skill_007" },
  { _id: "proj_skill_003", project_id: "project_001", skill_id: "skill_006" },
  { _id: "proj_skill_004", project_id: "project_001", skill_id: "skill_030" },
  { _id: "proj_skill_005", project_id: "project_002", skill_id: "skill_037" },
  { _id: "proj_skill_006", project_id: "project_002", skill_id: "skill_009" },
  { _id: "proj_skill_007", project_id: "project_002", skill_id: "skill_012" },
  { _id: "proj_skill_008", project_id: "project_003", skill_id: "skill_037" },
  { _id: "proj_skill_009", project_id: "project_003", skill_id: "skill_041" },
  { _id: "proj_skill_010", project_id: "project_003", skill_id: "skill_007" },
  { _id: "proj_skill_011", project_id: "project_003", skill_id: "skill_006" },
  { _id: "proj_skill_012", project_id: "project_003", skill_id: "skill_011" },
  { _id: "proj_skill_013", project_id: "project_004", skill_id: "skill_041" },
  { _id: "proj_skill_014", project_id: "project_004", skill_id: "skill_042" },
  { _id: "proj_skill_015", project_id: "project_004", skill_id: "skill_002" },
  { _id: "proj_skill_016", project_id: "project_005", skill_id: "skill_041" },
  { _id: "proj_skill_017", project_id: "project_005", skill_id: "skill_042" },
  { _id: "proj_skill_018", project_id: "project_005", skill_id: "skill_011" },
  { _id: "proj_skill_019", project_id: "project_005", skill_id: "skill_017" },
  { _id: "proj_skill_020", project_id: "project_006", skill_id: "skill_037" },
  { _id: "proj_skill_021", project_id: "project_006", skill_id: "skill_006" },
  { _id: "proj_skill_022", project_id: "project_007", skill_id: "skill_037" },
  { _id: "proj_skill_023", project_id: "project_007", skill_id: "skill_025" },
  { _id: "proj_skill_024", project_id: "project_008", skill_id: "skill_037" },
  { _id: "proj_skill_025", project_id: "project_008", skill_id: "skill_038" },
];

// Project Achievements (junction table - currently empty in CSV)
export const projectAchievements: ProjectAchievement[] = [];

// ML Models (currently empty in CSV)
export const mlModels: MLModel[] = [];

// Project ML Models (junction table - currently empty in CSV)
export const projectMLModels: ProjectMLModel[] = [];

// ML Model Evaluation Metrics (currently empty in CSV)
export const mlModelEvaluationMetrics: MLModelEvaluationMetric[] = [];

// ML Model Training Parameters (currently empty in CSV)
export const mlModelTrainingParameters: MLModelTrainingParameter[] = [];

// ML Model Use Cases (currently empty in CSV)
export const mlModelUseCases: MLModelUseCase[] = [];

// Helper function to get project by ID
export const getProjectById = (projectId: string): Project | undefined => {
  return projects.find((proj) => proj._id === projectId);
};

// Helper function to get skills for a project
export const getSkillsForProject = (projectId: string): string[] => {
  return projectSkills.filter((ps) => ps.project_id === projectId).map((ps) => ps.skill_id);
};

// Helper function to get projects by username
export const getProjectsByUsername = (username: string): Project[] => {
  return projects.filter((proj) => proj.username === username);
};

// Helper function to get projects by status
export const getProjectsByStatus = (status: string): Project[] => {
  return projects.filter((proj) => proj.status === status);
};

// Helper function to calculate project duration
export const calculateProjectDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
  
  if (months === 0) {
    return "< 1 month";
  }
  if (months === 1) {
    return "1 month";
  }
  if (months < 12) {
    return `${months} months`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }
  
  return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
};

// Helper function to check if project is current
export const isCurrentProject = (proj: Project): boolean => {
  return !proj.end_date;
};
