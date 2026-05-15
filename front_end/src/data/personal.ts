/**
 * Personal Data
 * Contains personal profile information, education, family, hobbies, and social profiles
 */

export interface PersonalProfile {
  _id: string;
  full_name: string;
  dob: string;
  place_of_birth: string;
  email: string;
  work_start_date: string;
  tagline: string;
  designation: string;
  short_summary: string;
  long_descriptive_summary: string;
  profile_image: string;
  marital_status: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_country: string;
  address_postal_code: string;
  resume_summary: string;
  phone_num: string;
}

export interface Education {
  _id: string;
  personal_profile_id: string;
  degree: string;
  institution: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  gpa: number;
  institution_url: string;
}

export interface FamilyMember {
  _id: string;
  personal_profile_id: string;
  relationship: string;
  full_name: string;
  occupation: string;
  dob: string;
  profile_url: string | null;
}

export interface SocialProfile {
  _id: string;
  personal_profile_id: string;
  platform: string;
  profile_url: string;
  username: string;
  is_primary: boolean;
}

export interface Hobby {
  _id: string;
  personal_profile_id: string;
  hobby_name: string;
  description: string;
  skill_level?: string;
}

// Personal Data
export const personalProfile: PersonalProfile = {
  _id: "akhilnadhpc",
  full_name: "Akhil Nadh PC",
  dob: "1994-05-24",
  place_of_birth: "Thrissur Kerala",
  email: "akhilnadhpc@gmail.com",
  work_start_date: "2019-12-03",
  tagline: "Lead Data Scientist at Air India",
  designation: "Lead Data Scientist",
  short_summary: "Experienced ML engineer. \nSpecialized in GenAI and Machine Learning Solutions.",
  long_descriptive_summary: `A highly driven and passionate Machine Learning Engineer with a strong inclination towards applying AI to real-world problems, particularly in the domains of Computer Vision and Natural Language Processing.

With over 6.5 years of experience spanning the aviation, automotive, and industrial sectors, I have successfully built and deployed AI-powered solutions that contribute to operational efficiency, automation, and better decision making. My expertise lies in translating complex business requirements into impactful, scalable solutions while addressing performance, efficiency, and scalability challenges.

Currently working as a Lead Data Scientist at AIR INDIA, I am actively involved in developing and deploying computer vision and LLM-based systems. Key projects include queue and passenger behavior analysis, LLM-powered passport and visa verification, AI-based food waste assessment & volumetric prediction, and facial recognition systems for VIP passenger identification. I also work on LLaMA fine-tuning with LoRA for building domain-specific language  and vision models.

Prior to this, my professional journey includes impactful contributions in the automotive and oil industries, where I developed solutions in gesture navigation, drowsiness detection, collision prediction, and predictive maintenance.

My technical expertise lies in Python, Deep Learning, TensorFlow, PyTorch, OpenCV, and deploying models at scale.`,
  profile_image: "https://d2ajlz7o3p8ddv.cloudfront.net/media/user_profile/profile-img.jpg",
  marital_status: "Married",
  address_street: "Pullolikkal House",
  address_city: "Thrissur",
  address_state: "Kerala",
  address_country: "India",
  address_postal_code: "680121",
  resume_summary:
    "A passionate machine learning engineer having 4+ years of experience in computer vision and artificial intelligence. I've worked in the automotive division solving challenging problems and building solutions related to gesture navigation; drowsiness detection; vehicle collision warning; radar camera fusion etc. Seeking a challenging position where my knowledge; talent; hard work; dedication and sincerity can create a significat value.",
  phone_num: "9633311164",
};

export const education: Education[] = [
  {
    _id: "edu_001",
    personal_profile_id: "akhilnadhpc",
    degree: "M.Tech",
    institution: "National Institute of Technology Jalandhar",
    field_of_study: "Computer Science and Information Security",
    start_date: "2017-01-01",
    end_date: "2019-12-31",
    gpa: 7.5,
    institution_url: "https://www.nitj.ac.in/",
  },
  {
    _id: "edu_002",
    personal_profile_id: "akhilnadhpc",
    degree: "B.Tech",
    institution: "College of Engineering Chengannur",
    field_of_study: "Computer Science and Engineering",
    start_date: "2011-01-01",
    end_date: "2015-12-31",
    gpa: 72,
    institution_url: "https://www.ceconline.edu/",
  },
  {
    _id: "edu_003",
    personal_profile_id: "akhilnadhpc",
    degree: "12th",
    institution: "Don bosco HSS Irinjalakuda",
    field_of_study: "Computer Science",
    start_date: "2009-01-01",
    end_date: "2011-12-31",
    gpa: 92,
    institution_url: "https://www.donboscoirinjalakuda.com/",
  },
];

export const familyMembers: FamilyMember[] = [
  {
    _id: "family_001",
    personal_profile_id: "akhilnadhpc",
    relationship: "Father",
    full_name: "Chandran PP",
    occupation: "Doctor",
    dob: "1959-11-07",
    profile_url: "https://www.instagram.com/drchandranpp",
  },
  {
    _id: "family_002",
    personal_profile_id: "akhilnadhpc",
    relationship: "Mother",
    full_name: "Preethy KS",
    occupation: "Retired Teacher",
    dob: "1966-06-01",
    profile_url: "https://www.instagram.com/preethychandran",
  },
  {
    _id: "family_003",
    personal_profile_id: "akhilnadhpc",
    relationship: "Wife",
    full_name: "Sethulakshmi R",
    occupation: "Senior Design Engineer",
    dob: "",
    profile_url: null,
  },
];

export const hobbies: Hobby[] = [
  {
    _id: "hobby_001",
    personal_profile_id: "akhilnadhpc",
    hobby_name: "NFT Photography",
    description: "",
    skill_level: "",
  },
  {
    _id: "hobby_002",
    personal_profile_id: "akhilnadhpc",
    hobby_name: "Occasional Travelling",
    description: "",
    skill_level: "",
  },
  {
    _id: "hobby_003",
    personal_profile_id: "akhilnadhpc",
    hobby_name: "Watching Sci-Fi movies",
    description: "",
    skill_level: "",
  },
];

export const socialProfiles: SocialProfile[] = [
  {
    _id: "social_001",
    personal_profile_id: "akhilnadhpc",
    platform: "LinkedIn",
    profile_url: "https://www.linkedin.com/in/akhilnadhpc",
    username: "akhilnadhpc",
    is_primary: true,
  },
  {
    _id: "social_002",
    personal_profile_id: "akhilnadhpc",
    platform: "GitHub",
    profile_url: "https://github.com/pcakhilnadh",
    username: "pcakhilnadh",
    is_primary: false,
  },
  {
    _id: "social_003",
    personal_profile_id: "akhilnadhpc",
    platform: "Twitter",
    profile_url: "https://x.com/akhilnadhpc",
    username: "akhilnadhpc",
    is_primary: false,
  },
  {
    _id: "social_004",
    personal_profile_id: "akhilnadhpc",
    platform: "Instagram",
    profile_url: "https://www.instagram.com/framesbyakhil/",
    username: "framesbyakhil",
    is_primary: false,
  },
  {
    _id: "social_005",
    personal_profile_id: "akhilnadhpc",
    platform: "Tripoto",
    profile_url: "https://www.tripoto.com/profile/akhilnadhpc",
    username: "akhilnadhpc",
    is_primary: false,
  },
  {
    _id: "social_006",
    personal_profile_id: "akhilnadhpc",
    platform: "Medium",
    profile_url: "https://medium.com/@akhilnadhpc",
    username: "akhilnadhpc",
    is_primary: false,
  },
  {
    _id: "social_007",
    personal_profile_id: "akhilnadhpc",
    platform: "Portfolio Website",
    profile_url: "https://akhilnadhpc.in/",
    username: "akhilnadhpc",
    is_primary: false,
  },
  {
    _id: "social_008",
    personal_profile_id: "akhilnadhpc",
    platform: "Google Map Reviewer Profile",
    profile_url:
      "https://www.google.com/maps/contrib/111662560312968745680/reviews/@10.9928783,76.338947,8z/data=!3m1!4b1!4m3!8m2!3m1!1e1?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D",
    username: "111662560312968745680",
    is_primary: false,
  },
  {
    _id: "social_009",
    personal_profile_id: "akhilnadhpc",
    platform: "HackerRank",
    profile_url: "https://www.hackerrank.com/profile/itzpc",
    username: "itzpc",
    is_primary: false,
  },
  {
    _id: "social_010",
    personal_profile_id: "akhilnadhpc",
    platform: "HackerEarth",
    profile_url: "https://www.hackerearth.com/@akhilnadhpc/",
    username: "akhilnadhpc",
    is_primary: false,
  },
  {
    _id: "social_011",
    personal_profile_id: "akhilnadhpc",
    platform: "LeetCode",
    profile_url: "https://leetcode.com/u/pcakhilnadh/",
    username: "pcakhilnadh",
    is_primary: false,
  },
  {
    _id: "social_012",
    personal_profile_id: "akhilnadhpc",
    platform: "Stack Overflow",
    profile_url: "https://stackoverflow.com/users/3539865/akhil-nadh-pc",
    username: "akhil-nadh-pc",
    is_primary: false,
  },
  {
    _id: "social_013",
    personal_profile_id: "akhilnadhpc",
    platform: "CS Stack Exchange",
    profile_url: "https://cs.stackexchange.com/users/42509/akhil-nadh-pc",
    username: "akhil-nadh-pc",
    is_primary: false,
  },
  {
    _id: "social_014",
    personal_profile_id: "akhilnadhpc",
    platform: "GATE Overflow",
    profile_url: "https://gateoverflow.in/user/pC",
    username: "pC",
    is_primary: false,
  },
];
