/**
 * Data Export Index
 * Central export point for all frontend data
 */

// Local imports for use in allData below
import { personalProfile, education, familyMembers, hobbies, socialProfiles } from "./personal";
import { skillCategories, skills } from "./skills";
import { certifications, certificationSkills } from "./certifications";
import { workExperience, companyReferences, workExperienceProjects } from "./experience";
import {
  projects, projectSkills, projectAchievements, mlModels,
  projectMLModels, mlModelEvaluationMetrics, mlModelTrainingParameters, mlModelUseCases,
} from "./projects";
import { services } from "./services";

// Personal Data Exports
export {
  personalProfile,
  education,
  familyMembers,
  hobbies,
  socialProfiles,
  type PersonalProfile,
  type Education,
  type FamilyMember,
  type Hobby,
  type SocialProfile,
} from "./personal";

// Skills Data Exports
export {
  skillCategories,
  skills,
  getSkillCategory,
  getSkillsByCategory,
  getSkillById,
  type SkillCategory,
  type Skill,
} from "./skills";

// Certifications Data Exports
export {
  certifications,
  certificationSkills,
  getCertificationById,
  getSkillsForCertification,
  getCertificationsForSkill,
  type Certification,
  type CertificationSkill,
} from "./certifications";

// Experience Data Exports
export {
  workExperience,
  companyReferences,
  workExperienceProjects,
  getWorkExperienceById,
  getReferencesForExperience,
  getWorkExperienceByUsername,
  calculateExperienceDuration,
  isCurrentExperience,
  type WorkExperience,
  type CompanyReference,
  type WorkExperienceProject,
} from "./experience";

// Projects Data Exports
export {
  projects,
  projectSkills,
  projectAchievements,
  mlModels,
  projectMLModels,
  mlModelEvaluationMetrics,
  mlModelTrainingParameters,
  mlModelUseCases,
  getProjectById,
  getSkillsForProject,
  getProjectsByUsername,
  getProjectsByStatus,
  calculateProjectDuration,
  isCurrentProject,
  type Project,
  type ProjectSkill,
  type ProjectAchievement,
  type MLModel,
  type ProjectMLModel,
  type MLModelEvaluationMetric,
  type MLModelTrainingParameter,
  type MLModelUseCase,
} from "./projects";

// Services Data Exports
export {
  services,
  getServiceById,
  getServicesByCategory,
  getAllCategories,
  type Service,
} from "./services";

// Composite Data Types
export interface AllData {
  personal: {
    profile: typeof personalProfile;
    education: typeof education;
    family: typeof familyMembers;
    hobbies: typeof hobbies;
    socialProfiles: typeof socialProfiles;
  };
  skills: {
    categories: typeof skillCategories;
    skills: typeof skills;
  };
  certifications: {
    certifications: typeof certifications;
    certificationSkills: typeof certificationSkills;
  };
  experience: {
    workExperience: typeof workExperience;
    companyReferences: typeof companyReferences;
    workExperienceProjects: typeof workExperienceProjects;
  };
  projects: {
    projects: typeof projects;
    projectSkills: typeof projectSkills;
    projectAchievements: typeof projectAchievements;
    mlModels: typeof mlModels;
    projectMLModels: typeof projectMLModels;
    mlModelEvaluationMetrics: typeof mlModelEvaluationMetrics;
    mlModelTrainingParameters: typeof mlModelTrainingParameters;
    mlModelUseCases: typeof mlModelUseCases;
  };
  services: {
    services: typeof services;
  };
}

// Consolidated data object for easy access
export const allData: AllData = {
  personal: {
    profile: personalProfile,
    education,
    family: familyMembers,
    hobbies,
    socialProfiles,
  },
  skills: {
    categories: skillCategories,
    skills,
  },
  certifications: {
    certifications,
    certificationSkills,
  },
  experience: {
    workExperience,
    companyReferences,
    workExperienceProjects,
  },
  projects: {
    projects,
    projectSkills,
    projectAchievements,
    mlModels,
    projectMLModels,
    mlModelEvaluationMetrics,
    mlModelTrainingParameters,
    mlModelUseCases,
  },
  services: {
    services,
  },
};

/**
 * Data Structure Documentation
 *
 * This folder contains TypeScript data files that replicate the CSV data structure from the backend.
 *
 * File Structure:
 * - personal.ts: Personal profile, education, family, hobbies, social profiles
 * - skills.ts: Skill categories and individual skills with ratings
 * - certifications.ts: Professional certifications and their relationships to skills
 * - experience.ts: Work experience and company references
 * - projects.ts: Projects and their relationships to skills, achievements, and ML models
 * - services.ts: Service offerings
 * - index.ts: Central export point (this file)
 *
 * Data Relationships:
 *
 * Personal Data:
 * - personalProfile (1) --> education (many)
 * - personalProfile (1) --> familyMembers (many)
 * - personalProfile (1) --> hobbies (many)
 * - personalProfile (1) --> socialProfiles (many)
 *
 * Skills & Certifications:
 * - skillCategories (1) --> skills (many)
 * - certifications (many) <--> skills (many) via certificationSkills
 *
 * Work Experience:
 * - workExperience (1) --> companyReferences (many)
 * - workExperience (many) --> projects (many) via workExperienceProjects (currently empty)
 *
 * Projects:
 * - projects (many) <--> skills (many) via projectSkills
 * - projects (1) --> projectAchievements (many)
 * - projects (many) <--> mlModels (many) via projectMLModels
 * - mlModels (1) --> mlModelEvaluationMetrics (many)
 * - mlModels (1) --> mlModelTrainingParameters (many)
 * - mlModels (1) --> mlModelUseCases (many)
 *
 * Usage Examples:
 * ```
 * import { personalProfile, getProjectsByUsername, getSkillsForProject } from '@/data';
 *
 * // Get all projects for a user
 * const userProjects = getProjectsByUsername('akhilnadhpc');
 *
 * // Get skills for a specific project
 * const projectSkills = getSkillsForProject('project_001');
 *
 * // Access consolidated data
 * import { allData } from '@/data';
 * console.log(allData.personal.profile.full_name);
 * console.log(allData.projects.projects);
 * ```
 */
