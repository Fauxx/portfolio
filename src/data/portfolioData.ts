export interface ProjectPlaceholder {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ExperiencePlaceholder {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  bio: string;
  status: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  skillCategories: SkillCategory[];
  featuredProjects: ProjectPlaceholder[];
  experienceList: ExperiencePlaceholder[];
}

export const profileData: ProfileData = {
  name: "Zet Donaue Samson",
  title: "Software Developer & DevOps Engineer",
  location: "Pasig City, Philippines",
  status: "Available for high-impact software & cloud engineering roles",
  bio: "Software developer and DevOps engineer focused on cloud-native systems, scalable microservice APIs, and AI integrations. Emphasizing clean architecture, zero-trust infrastructure, and end-to-end delivery.",
  socials: {
    github: "https://github.com/Fauxx",
    linkedin: "https://linkedin.com/in/zet02",
    email: "zetsamson@gmail.com"
  },
  skillCategories: [
    {
      category: "Backend & Systems",
      skills: ["Python", "FastAPI", "C# / ASP.NET Core", "Node.js", "Clean Architecture", "PostgreSQL", "Redis"]
    },
    {
      category: "Cloud, DevOps & GitOps",
      skills: ["Kubernetes (AKS/GKE/DOKS)", "Terraform", "Docker", "ArgoCD", "GitHub Actions", "Prometheus & Grafana"]
    },
    {
      category: "AI, Data & Frontend",
      skills: ["Google Gemini API", "Playwright Automation", "React 19", "TypeScript", "Vite", "Tailwind CSS"]
    }
  ],
  featuredProjects: [
    {
      id: "jobflow",
      title: "Jobflow",
      subtitle: "AI-Powered ATS Resume Builder & Job Pipeline",
      description: "Full-stack AI platform automating universal job scraping, structured LLM-driven tailoring, and ATS-compliant PDF generation.",
      tags: ["FastAPI", "React 19", "TypeScript", "Google Gemini", "Playwright", "PostgreSQL"],
      githubUrl: "https://github.com/Fauxx/jobflow",
      featured: true
    },
    {
      id: "fire-monitoring",
      title: "Fire Monitoring & Analytics",
      subtitle: "Cloud-Native IoT Telemetry & Observability Platform",
      description: "4-layer Terraform-managed Kubernetes platform handling real-time MQTT telemetry, WebGL spatial mapping, and full-stack observability.",
      tags: ["Kubernetes", "Terraform", "ArgoCD", "PostgreSQL", "Grafana", "React"],
      githubUrl: "https://github.com/Fauxx/FireMonitoringSystem",
      featured: true
    },
    {
      id: "ai-job-agent",
      title: "Autonomous Job Email Agent",
      subtitle: "Intelligent Email Classifier & Alert Pipeline",
      description: "Automated event-driven workflow parsing recruiter outreach with LLM classification and instant dispatch alerts.",
      tags: ["Python", "Gemini AI", "Telegram Bot API", "Docker"],
      githubUrl: "https://github.com/Fauxx/ai-job-email-agent",
      featured: false
    }
  ],
  experienceList: [
    {
      id: "infotouch",
      role: "Software Developer Intern",
      company: "InfoTouch Corporation",
      period: "Feb 2026 – June 2026",
      location: "Makati, Philippines",
      summary: "Engineered ASP.NET Core REST APIs with Clean Architecture, minimal API endpoints, and transactional concurrency controls.",
      technologies: ["C#", "ASP.NET Core", "Clean Architecture", "REST APIs", "SQL"]
    },
    {
      id: "concentrix",
      role: "Operations & Technical Support Specialist",
      company: "Concentrix",
      period: "July 2024 – Nov 2024",
      location: "Metro Manila, Philippines",
      summary: "Customer-facing technical troubleshooting, SLA adherence, and CRM system operations on enterprise client accounts.",
      technologies: ["Technical Troubleshooting", "Client Support", "CRM Systems", "SLA Delivery"]
    }
  ]
};
