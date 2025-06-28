export interface Education {
  degree: string;
  institution: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  gpa?: number;
  institution_url?: string;
}

export interface WorkExperience {
  company_name: string;
  company_location: string;
  designation: string;
  start_date: string;
  end_date: string;
  company_url?: string;
}

export interface Project {
  title: string;
  short_description: string;
  long_description: string;
  project_type: string;
  status: string;
  start_date: string;
  end_date?: string;
  role: string;
  company?: string;
  github_url?: string;
  live_url?: string;
  hosting_platform?: string;
  cicd_pipeline?: string;
  monitoring_tracking?: string;
  skills?: string[];
}

export interface Skill {
  name: string;
  rating: number;
  description: string;
  category: string;
}

export interface Certification {
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
}

export interface ResumeData {
  personal_info: {
    full_name: string;
    email: string;
    designation: string;
    tagline: string;
    short_summary: string;
    long_descriptive_summary: string;
    resume_summary: string;
    phone_num: string;
    address: string;
    dob: string;
    place_of_birth: string;
    work_start_date: string;
    total_years_of_experience: number;
  };
  education: Education[];
  work_experience: WorkExperience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
}

export interface ResumeResponse {
  success: boolean;
  message: string;
  resume_data: ResumeData;
}

export interface ResumeRequest {
  username: string;
} 