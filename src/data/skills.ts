/**
 * Skills Data
 * Contains skill categories and individual skills with ratings
 */

export interface SkillCategory {
  _id: string;
  name: string;
  description: string;
}

export interface Skill {
  _id: string;
  name: string;
  rating: number;
  skill_category_id: string;
  description: string;
}

// Skill Categories
export const skillCategories: SkillCategory[] = [
  {
    _id: "skill_category_001",
    name: "Programming Languages",
    description: "Programming languages used for development",
  },
  {
    _id: "skill_category_002",
    name: "Machine Learning Frameworks",
    description: "Frameworks and libraries for ML and DL",
  },
  {
    _id: "skill_category_003",
    name: "Data Processing",
    description: "Data manipulation and analysis tools",
  },
  {
    _id: "skill_category_004",
    name: "Cloud Platforms",
    description: "Cloud and deployment platforms",
  },
  {
    _id: "skill_category_005",
    name: "DevOps & MLOps",
    description: "DevOps and MLOps tools",
  },
  {
    _id: "skill_category_006",
    name: "Databases",
    description: "Database technologies",
  },
  {
    _id: "skill_category_007",
    name: "Visualization",
    description: "Visualization and reporting tools",
  },
  {
    _id: "skill_category_009",
    name: "Web Frameworks",
    description: "Web development frameworks",
  },
  {
    _id: "skill_category_010",
    name: "Other",
    description: "Other relevant skills",
  },
];

// Skills
export const skills: Skill[] = [
  {
    _id: "skill_001",
    name: "Python",
    rating: 5,
    skill_category_id: "skill_category_001",
    description: "Primary programming language for data science and ML",
  },
  {
    _id: "skill_002",
    name: "SQL",
    rating: 4,
    skill_category_id: "skill_category_001",
    description: "Database querying and data manipulation",
  },
  {
    _id: "skill_003",
    name: "HTML",
    rating: 3,
    skill_category_id: "skill_category_001",
    description: "Markup language for web development",
  },
  {
    _id: "skill_004",
    name: "PHP",
    rating: 3,
    skill_category_id: "skill_category_001",
    description: "Server-side scripting language",
  },
  {
    _id: "skill_005",
    name: "C#",
    rating: 3,
    skill_category_id: "skill_category_001",
    description: "General-purpose programming language",
  },
  {
    _id: "skill_006",
    name: "TensorFlow",
    rating: 4,
    skill_category_id: "skill_category_002",
    description: "Deep learning framework",
  },
  {
    _id: "skill_007",
    name: "PyTorch",
    rating: 4,
    skill_category_id: "skill_category_002",
    description: "Deep learning framework",
  },
  {
    _id: "skill_008",
    name: "Keras",
    rating: 4,
    skill_category_id: "skill_category_002",
    description: "Deep learning API",
  },
  {
    _id: "skill_009",
    name: "Ultralytics",
    rating: 3,
    skill_category_id: "skill_category_002",
    description: "YOLO object detection library",
  },
  {
    _id: "skill_010",
    name: "Scikit-learn",
    rating: 4,
    skill_category_id: "skill_category_002",
    description: "Traditional machine learning library",
  },
  {
    _id: "skill_011",
    name: "Pandas",
    rating: 5,
    skill_category_id: "skill_category_003",
    description: "Data manipulation and analysis",
  },
  {
    _id: "skill_012",
    name: "Numpy",
    rating: 5,
    skill_category_id: "skill_category_003",
    description: "Numerical computing library",
  },
  {
    _id: "skill_013",
    name: "Matplotlib",
    rating: 4,
    skill_category_id: "skill_category_007",
    description: "Data visualization library",
  },
  {
    _id: "skill_014",
    name: "Seaborn",
    rating: 4,
    skill_category_id: "skill_category_007",
    description: "Statistical data visualization",
  },
  {
    _id: "skill_015",
    name: "PostgreSQL",
    rating: 3,
    skill_category_id: "skill_category_006",
    description: "Relational database",
  },
  {
    _id: "skill_016",
    name: "MySQL",
    rating: 3,
    skill_category_id: "skill_category_006",
    description: "Relational database",
  },
  {
    _id: "skill_017",
    name: "MongoDB",
    rating: 3,
    skill_category_id: "skill_category_006",
    description: "NoSQL database",
  },
  {
    _id: "skill_018",
    name: "sqlite",
    rating: 3,
    skill_category_id: "skill_category_006",
    description: "Embedded database",
  },
  {
    _id: "skill_019",
    name: "psycopg2",
    rating: 3,
    skill_category_id: "skill_category_006",
    description: "PostgreSQL adapter for Python",
  },
  {
    _id: "skill_020",
    name: "SQLAlchemy",
    rating: 3,
    skill_category_id: "skill_category_006",
    description: "Python SQL toolkit",
  },
  {
    _id: "skill_021",
    name: "FastAPI",
    rating: 3,
    skill_category_id: "skill_category_009",
    description: "Web framework for APIs",
  },
  {
    _id: "skill_022",
    name: "Django",
    rating: 3,
    skill_category_id: "skill_category_009",
    description: "Web framework",
  },
  {
    _id: "skill_023",
    name: "Django REST",
    rating: 3,
    skill_category_id: "skill_category_009",
    description: "REST API framework",
  },
  {
    _id: "skill_024",
    name: "Angular",
    rating: 3,
    skill_category_id: "skill_category_009",
    description: "Frontend web framework",
  },
  {
    _id: "skill_025",
    name: "BeautifulSoup",
    rating: 3,
    skill_category_id: "skill_category_009",
    description: "Web scraping library",
  },
  {
    _id: "skill_026",
    name: "ML Flow",
    rating: 3,
    skill_category_id: "skill_category_005",
    description: "ML lifecycle management",
  },
  {
    _id: "skill_027",
    name: "AWS",
    rating: 3,
    skill_category_id: "skill_category_004",
    description: "Cloud platform",
  },
  {
    _id: "skill_028",
    name: "Heroku",
    rating: 3,
    skill_category_id: "skill_category_004",
    description: "Cloud platform",
  },
  {
    _id: "skill_029",
    name: "Docker",
    rating: 3,
    skill_category_id: "skill_category_005",
    description: "Containerization platform",
  },
  {
    _id: "skill_030",
    name: "ROS2 Humble",
    rating: 2,
    skill_category_id: "skill_category_010",
    description: "Robotic Operating System",
  },
  {
    _id: "skill_031",
    name: "ROS2 Eloquent",
    rating: 2,
    skill_category_id: "skill_category_010",
    description: "Robotic Operating System",
  },
  {
    _id: "skill_032",
    name: "IBM Blockchain",
    rating: 2,
    skill_category_id: "skill_category_010",
    description: "Blockchain platform",
  },
  {
    _id: "skill_033",
    name: "Smart contract",
    rating: 2,
    skill_category_id: "skill_category_010",
    description: "Blockchain smart contracts",
  },
  {
    _id: "skill_034",
    name: "NFT",
    rating: 2,
    skill_category_id: "skill_category_010",
    description: "Non-fungible tokens",
  },
  {
    _id: "skill_035",
    name: "GIT",
    rating: 3,
    skill_category_id: "skill_category_005",
    description: "Version control system",
  },
  {
    _id: "skill_036",
    name: "SVN",
    rating: 2,
    skill_category_id: "skill_category_005",
    description: "Version control system",
  },
  {
    _id: "skill_037",
    name: "OpenCV",
    rating: 4,
    skill_category_id: "skill_category_002",
    description: "Computer vision library",
  },
  {
    _id: "skill_038",
    name: "Mediapipe",
    rating: 3,
    skill_category_id: "skill_category_002",
    description: "Computer vision library",
  },
  {
    _id: "skill_039",
    name: "Word2Vec",
    rating: 3,
    skill_category_id: "skill_category_002",
    description: "Word embedding technique",
  },
  {
    _id: "skill_040",
    name: "Gensim",
    rating: 3,
    skill_category_id: "skill_category_002",
    description: "Topic modeling and document similarity",
  },
  {
    _id: "skill_041",
    name: "Spacy",
    rating: 3,
    skill_category_id: "skill_category_002",
    description: "NLP library",
  },
  {
    _id: "skill_042",
    name: "NLTK",
    rating: 3,
    skill_category_id: "skill_category_002",
    description: "NLP library",
  },
];

// Helper function to get skill category by ID
export const getSkillCategory = (categoryId: string): SkillCategory | undefined => {
  return skillCategories.find((cat) => cat._id === categoryId);
};

// Helper function to get skills by category
export const getSkillsByCategory = (categoryId: string): Skill[] => {
  return skills.filter((skill) => skill.skill_category_id === categoryId);
};

// Helper function to get skill by ID
export const getSkillById = (skillId: string): Skill | undefined => {
  return skills.find((skill) => skill._id === skillId);
};
