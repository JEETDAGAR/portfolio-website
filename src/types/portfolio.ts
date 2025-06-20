export interface PersonalInfo {
  name: string;
  current_title: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  professional_summary: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  achievement: string;
  type: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  achievements: string[];
  metrics?: {
    [key: string]: string;
  };
}

export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  responsibilities?: string[];
  technologies?: string[];
  achievements?: string[];
  projects?: Project[];
}

export interface PersonalProject {
  name: string;
  type: string;
  description: string;
  technologies: string[];
  key_features: string[];
  achievements: string[];
  metrics: {
    [key: string]: string;
  };
  github_link: string;
}

export interface TechnicalSkills {
  [category: string]: {
    expert?: string[];
    advanced?: string[];
    intermediate?: string[];
  };
}

export interface Certification {
  name: string;
  issuer: string;
  platform: string;
  type: string;
  status: string;
}

export interface LeadershipExperience {
  role: string;
  organization: string;
  duration: string;
  description: string;
  responsibilities: string[];
}

export interface BlogPost {
  title: string;
  description: string;
  publication_date: string;
  tags: string[];
  url: string;
  read_time: string;
}

export interface PortfolioData {
  metadata: {
    generated_date: string;
    version: string;
    format: string;
  };
  personal_info: PersonalInfo;
  education: Education[];
  work_experience: WorkExperience[];
  personal_projects: PersonalProject[];
  technical_skills: TechnicalSkills;
  certifications: Certification[];
  leadership_experience: LeadershipExperience[];
  blog_posts: BlogPost[];
  summary_stats: {
    total_experience_years: string;
    total_projects: number;
    key_technologies: number;
    certifications_count: number;
    aws_certifications_count: number;
    blog_posts_count: number;
  };
}
