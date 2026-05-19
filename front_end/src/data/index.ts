/**
 * Data Export Index
 * Central export point for all frontend data
 */

// Local imports for use in allData below
import { personalProfile, education, familyMembers, hobbies, socialProfiles } from "./personal";
import { skillCategories, skills } from "./skills";
import { certifications, certificationSkills } from "./certifications";
import { workExperience, companyReferences, workExperienceProjects } from "./experience";
import { projects } from "./projects";
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
  getProjectById,
  getProjectBySlug,
  getProjectsByUsername,
  getProjectsByStatus,
  getProjectsByDomain,
  getProjectsByIndustry,
  getProjectsByTag,
  getAllDomains,
  getAllIndustries,
  getAllTechnologies,
  getAllTags,
  calculateProjectDuration,
  formatDurationString,
  isCurrentProject,
  getProjectHighlights,
  getProjectModels,
  getProjectDatasets,
  getProjectSkills,
  type Project,
  type ProjectHighlight,
  type Dataset,
  type MLModel,
  type TrainingConfig,
  type DeploymentConfig,
  type OperationsConfig,
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
  },
  services: {
    services,
  },
};
