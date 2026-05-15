/**
 * Work Experience Data
 * Contains work experience, company references, and relationships
 */

export interface WorkExperience {
  _id: string;
  username: string;
  company_name: string;
  company_location: string;
  designation: string;
  start_date: string;
  end_date?: string;
  company_url: string;
  references?: string;
}

export interface CompanyReference {
  _id: string;
  username: string;
  company_id: string;
  reference_name: string;
  designation: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  relationship: string;
}

export interface WorkExperienceProject {
  _id: string;
  work_experience_id: string;
  project_id: string;
}

// Work Experience
export const workExperience: WorkExperience[] = [
  {
    _id: "work_exp_001",
    username: "akhilnadhpc",
    company_name: "NEST DIGITAL PVT LTD",
    company_location: "Kochi",
    designation: "Senior Software Engineer",
    start_date: "2019-12-03",
    end_date: "2024-10-02",
    company_url: "https://www.nestdigital.com",
    references: "ref_001;ref_002",
  },
  {
    _id: "work_exp_002",
    username: "akhilnadhpc",
    company_name: "Air India",
    company_location: "Kochi",
    designation: "Lead Data Scientist",
    start_date: "2024-10-03",
    end_date: undefined,
    company_url: "https://www.airindia.com",
    references: undefined,
  },
];

// Company References
export const companyReferences: CompanyReference[] = [
  {
    _id: "ref_001",
    username: "akhilnadhpc",
    company_id: "work_exp_001",
    reference_name: "Rameel Rahman",
    designation: "Principal Architect at NeST",
    email: undefined,
    phone: undefined,
    linkedin_url: "https://www.linkedin.com/in/rameelrahman/",
    relationship: "Manager",
  },
  {
    _id: "ref_002",
    username: "akhilnadhpc",
    company_id: "work_exp_001",
    reference_name: "Mohammed Riyaz Srambikkal",
    designation: "Associate Delivery Manager",
    email: undefined,
    phone: undefined,
    linkedin_url: "https://www.linkedin.com/in/mohammed-riyaz-srambikkal/",
    relationship: "Manager",
  },
];

// Work Experience Projects (junction table - currently empty in CSV)
export const workExperienceProjects: WorkExperienceProject[] = [];

// Helper function to get work experience by ID
export const getWorkExperienceById = (expId: string): WorkExperience | undefined => {
  return workExperience.find((exp) => exp._id === expId);
};

// Helper function to get references for a work experience
export const getReferencesForExperience = (expId: string): CompanyReference[] => {
  return companyReferences.filter((ref) => ref.company_id === expId);
};

// Helper function to get all work experience for a user
export const getWorkExperienceByUsername = (username: string): WorkExperience[] => {
  return workExperience.filter((exp) => exp.username === username);
};

// Helper function to calculate duration (in years)
export const calculateExperienceDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  
  if (months < 0) {
    return `${years - 1} year${years - 1 !== 1 ? "s" : ""}`;
  }
  
  if (years === 0) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }
  
  return `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`;
};

// Helper function to check if experience is current
export const isCurrentExperience = (exp: WorkExperience): boolean => {
  return !exp.end_date;
};
