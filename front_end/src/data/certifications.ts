/**
 * Certifications Data
 * Contains certifications and their relationships to skills
 */

export interface Certification {
  _id: string;
  username: string;
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  description: string;
}

export interface CertificationSkill {
  _id: string;
  certification_id: string;
  skill_id: string;
}

// Certifications
export const certifications: Certification[] = [
  {
    _id: "cert_001",
    username: "akhilnadhpc",
    name: "Machine Learning Deep Learning Model Deployment",
    issuer: "Udemy",
    issue_date: "2023-06-15",
    expiry_date: undefined,
    credential_id: undefined,
    credential_url: "https://www.udemy.com/course/machine-learning-deep-learning-model-deployment/",
    description: "Completed Udemy course on ML and DL model deployment",
  },
  {
    _id: "cert_002",
    username: "akhilnadhpc",
    name: "Android Machine Learning with TensorFlow lite in Java/Kotlin",
    issuer: "Udemy",
    issue_date: "2023-03-20",
    expiry_date: undefined,
    credential_id: undefined,
    credential_url: "https://www.udemy.com/course/android-machine-learning-tensorflow-lite/",
    description: "Completed Udemy course on Android ML with TensorFlow Lite",
  },
  {
    _id: "cert_003",
    username: "akhilnadhpc",
    name: "Blockchain Essentials",
    issuer: "IBM Cognitive Class",
    issue_date: "2022-11-10",
    expiry_date: undefined,
    credential_id: undefined,
    credential_url: "https://cognitiveclass.ai/courses/blockchain-essentials/",
    description: "Completed IBM Cognitive Class on Blockchain Essentials",
  },
  {
    _id: "cert_004",
    username: "akhilnadhpc",
    name: "Cyber Security Awareness",
    issuer: "Udemy",
    issue_date: "2022-08-05",
    expiry_date: undefined,
    credential_id: undefined,
    credential_url: "https://www.udemy.com/course/cyber-security-awareness/",
    description: "Completed Udemy course on Cyber Security Awareness",
  },
  {
    _id: "cert_005",
    username: "akhilnadhpc",
    name: "Introduction to SQL",
    issuer: "Datacamp",
    issue_date: "2022-05-12",
    expiry_date: undefined,
    credential_id: undefined,
    credential_url: "https://www.datacamp.com/courses/introduction-to-sql",
    description: "Completed Datacamp course on SQL",
  },
];

// Certification Skills (junction table)
export const certificationSkills: CertificationSkill[] = [
  { _id: "cert_skill_001", certification_id: "cert_001", skill_id: "skill_006" },
  { _id: "cert_skill_002", certification_id: "cert_001", skill_id: "skill_007" },
  { _id: "cert_skill_003", certification_id: "cert_001", skill_id: "skill_037" },
  { _id: "cert_skill_004", certification_id: "cert_002", skill_id: "skill_006" },
  { _id: "cert_skill_005", certification_id: "cert_002", skill_id: "skill_007" },
  { _id: "cert_skill_006", certification_id: "cert_002", skill_id: "skill_009" },
  { _id: "cert_skill_007", certification_id: "cert_003", skill_id: "skill_032" },
  { _id: "cert_skill_008", certification_id: "cert_003", skill_id: "skill_033" },
  { _id: "cert_skill_009", certification_id: "cert_003", skill_id: "skill_034" },
  { _id: "cert_skill_010", certification_id: "cert_004", skill_id: "skill_041" },
  { _id: "cert_skill_011", certification_id: "cert_004", skill_id: "skill_042" },
  { _id: "cert_skill_012", certification_id: "cert_005", skill_id: "skill_002" },
];

// Helper function to get certification by ID
export const getCertificationById = (certId: string): Certification | undefined => {
  return certifications.find((cert) => cert._id === certId);
};

// Helper function to get skills for a certification
export const getSkillsForCertification = (certId: string): string[] => {
  return certificationSkills.filter((cs) => cs.certification_id === certId).map((cs) => cs.skill_id);
};

// Helper function to get certifications for a skill
export const getCertificationsForSkill = (skillId: string): Certification[] => {
  const certIds = certificationSkills
    .filter((cs) => cs.skill_id === skillId)
    .map((cs) => cs.certification_id);
  return certifications.filter((cert) => certIds.includes(cert._id));
};
