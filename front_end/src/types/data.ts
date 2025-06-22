export interface BasicInfo {
  full_name: string;
  tagline: string;
  short_summary: string;
  designation: string;
  total_years_of_experiece: string;
  email: string;
  profile_image: string;
  welcome_text?: string;
}

export interface Profile {
  url: string;
  handler: string;
}

export interface PersonalData {
  basic_info: BasicInfo;
  social_profiles: Record<string, Profile>;
  professional_profiles: Record<string, Profile>;
  coding_profiles: Record<string, Profile>;
  personal_profiles: Record<string, Profile>;
}

export interface HomeResponse {
  success: boolean;
  message: string;
  status: string;
  version: string;
  endpoints: Record<string, string>;
  personal_data: PersonalData;
  page_welcome_texts: string;
}

// New simplified domain data types
export interface AboutDomainData {
  personal_info: any;
  family_info: any;
  hobbies: string[];
  skills: any[];
  welcome_text: string;
}

export interface SkillsDomainData {
  skills: any[];
  welcome_text: string;
}

export interface ProjectsDomainData {
  projects: any[];
  welcome_text: string;
}

export interface CertificationsDomainData {
  certifications: any[];
  welcome_text: string;
}

export interface TimelineDomainData {
  experiences: any[];
  welcome_text: string;
}

// Legacy types for backward compatibility (can be removed later)
export interface AboutResponse {
  success: boolean;
  message: string;
  developer: string;
  technology: string;
  description: string;
  features: string[];
  personal_info: any;
  family_info: any;
  hobbies: string[];
  skills: any[];
  page_welcome_texts: string;
}

export interface SkillsResponse {
  success: boolean;
  message: string;
  developer: string;
  technology: string;
  description: string;
  features: string[];
  skills: any[];
  page_welcome_texts: string;
}

export interface ProjectsResponse {
  success: boolean;
  message: string;
  developer: string;
  technology: string;
  description: string;
  features: string[];
  projects: any[];
  page_welcome_texts: string;
}

export interface CertificationsResponse {
  success: boolean;
  message: string;
  developer: string;
  technology: string;
  description: string;
  features: string[];
  certifications: any[];
  page_welcome_texts: string;
}

export interface TimelineResponse {
  success: boolean;
  message: string;
  developer: string;
  technology: string;
  description: string;
  features: string[];
  experiences: any[];
  page_welcome_texts: string;
} 