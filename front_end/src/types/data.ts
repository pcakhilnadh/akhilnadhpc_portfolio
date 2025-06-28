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

// Updated to match new backend structure
export interface PersonalInfo {
  full_name: string;
  tagline: string;
  designation: string;
  email: string;
  profile_image?: string;
  short_summary: string;
  long_descriptive_summary?: string;
  total_years_of_experience?: string;
  current_company?: string;
  average_time_in_company?: string;
  dob?: string;
  place_of_birth?: string;
  address?: string;
}

export interface FamilyMember {
  relationship: string;
  full_name: string;
  occupation: string;
  age: number | null;
  profile_url: string | null;
}

export interface UserProfile {
  personal_info: PersonalInfo;
  social_profiles: Record<string, Profile>;
  professional_profiles: Record<string, Profile>;
  coding_profiles: Record<string, Profile>;
  personal_profiles: Record<string, Profile>;
  family_info?: FamilyMember[];
  hobbies?: string[];
}

export interface HomeResponse {
  success: boolean;
  message: string;
  status: string;
  version: string;
  endpoints: Record<string, string>;
  personal_data: UserProfile;
  page_welcome_texts: string;
}

// New domain data types matching backend structure
export interface SkillCategory {
  id: string;
  name: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  rating: number;
  description: string;
  category: SkillCategory;
}

export interface SkillsDomainData {
  skills: Skill[];
  welcome_text: string;
}

export interface CompanyBase {
  name: string;
  location: string;
}

export interface MLModelUseCase {
  id: string;
  use_case_name: string;
  business_impact: string;
}

export interface MLModelTrainingParameter {
  id: string;
  parameter_name: string;
  parameter_value: string;
  parameter_type: string;
}

export interface MLModel {
  id: string;
  name: string;
  model_type: string;
  framework: string;
  version: string;
  accuracy: number;
  training_data_size: string;
  deployment_status: string;
  use_cases?: MLModelUseCase[];
  training_parameters?: MLModelTrainingParameter[];
}

export interface ProjectAchievement {
  id: string;
  achievement_title: string;
  achievement_description: string;
  impact_metrics: string;
  recognition: string;
}

export interface Project {
  id: string;
  title: string;
  short_description: string;
  project_type: string;
  status: string;
  github_url?: string;
  live_url?: string;
  notion_url?: string;
  duration?: string;
  start_date?: string;
  end_date?: string;
  role?: string;
  company?: CompanyBase;
  ml_models?: MLModel;
  skills?: Skill[];
  achievements?: ProjectAchievement[];
  deployment?: string;
  hosting_platform?: string;
  cicd_pipeline?: string;
  monitoring_tracking?: string;
}

export interface ProjectsDomainData {
  projects: Project[];
  welcome_text: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  skills: string[];
}

export interface CertificationsDomainData {
  certifications: Certification[];
  welcome_text: string;
}

export interface CompanyReference {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  linkedin_url?: string;
  relationship: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  company_url?: string;
  start_date: string;
  end_date?: string;
  references?: CompanyReference[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  institution_url?: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  gpa?: number;
}

export interface TimelineDomainData {
  experiences: Experience[];
  education: Education[];
  welcome_text: string;
}

export interface AboutDomainData {
  personal_info: PersonalInfo;
  family_info?: FamilyMember[];
  hobbies?: string[];
  skills: SkillCategory[];
  welcome_text: string;
}

// Corrected response type to match the backend's AboutDomainData
export interface AboutResponse extends AboutDomainData {
  // The backend directly returns the AboutDomainData structure.
  // We can extend it if there were additional metadata, but for now, it's identical.
}

// Corrected response types to match the backend's DomainData structures
export interface SkillsResponse extends SkillsDomainData {}
export interface ProjectsResponse extends ProjectsDomainData {}
export interface CertificationsResponse extends CertificationsDomainData {}
export interface TimelineResponse extends TimelineDomainData {} 