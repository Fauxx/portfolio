export interface ExpertiseCard {
  id: string;
  icon: 'cloud' | 'box' | 'shield' | 'chart';
  title: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  badge?: string;
  description: string;
  tags: string[];
  viewLinkText: string;
  hasGithub?: boolean;
  hasDemo?: boolean;
  isLarge?: boolean;
}

export interface TimelineEntry {
  period: string;
  title: string;
  organization: string;
  bullets: string[];
}

export const portfolioConfig = {
  brand: {
    name: "ZET",
    tagline: "ENGINEERING"
  },
  hero: {
    greeting: "Hi, I'm",
    name: "Zet Donaue Samson",
    role: "Software Developer | Cloud & DevOps Engineer",
    summary: "I build applications and the cloud infrastructure behind them, with an emphasis on automation, security, and reliable delivery.",
    avatarInitials: "ZS",
    mantra: ["BUILD", "DEPLOY", "IMPROVE"],
    links: {
      github: "https://github.com/Fauxx",
      linkedin: "https://linkedin.com/in/zet02",
      email: "zetsamson@gmail.com"
    }
  },
  expertise: {
    tag: "ENGINEERING FOCUS",
    title: "Technologies & Expertise",
    subtitle: "Tools and technologies I work with to build, deploy, and maintain modern applications and infrastructure.",
    cards: [
      {
        id: "cloud",
        icon: "cloud",
        title: "Cloud Infrastructure",
        items: ["GKE", "Terraform", "Networking", "IaC"]
      },
      {
        id: "containers",
        icon: "box",
        title: "Containers & Delivery",
        items: ["Kubernetes", "Docker", "GitHub Actions", "Argo CD", "Kustomize"]
      },
      {
        id: "security",
        icon: "shield",
        title: "Security & Reliability",
        items: ["Image Scanning", "Network Policies", "Workload Security", "Troubleshooting"]
      },
      {
        id: "observability",
        icon: "chart",
        title: "Application & Observability",
        items: ["Python", "TypeScript", "APIs", "Metrics", "Logs", "Tracing"]
      }
    ] as ExpertiseCard[]
  },
  projects: {
    tag: "FEATURED PROJECTS",
    title: "Real Projects. Practical Solutions.",
    allProjectsUrl: "https://github.com/Fauxx",
    featured: {
      id: "fire-monitoring",
      title: "FireMonitoringSystem",
      badge: "Featured",
      description: "An IoT fire detection and monitoring platform with cloud infrastructure, telemetry processing, and a command-center dashboard.",
      tags: ["IoT", "Kubernetes", "Terraform", "GitOps", "React"],
      viewLinkText: "View Case Study",
      githubUrl: "https://github.com/Fauxx/FireMonitoringSystem"
    },
    cards: [
      {
        id: "jobflow",
        title: "Jobflow",
        description: "A full-stack job tracking application with AI-assisted résumé tailoring and workflow automation.",
        tags: ["React", "Node.js", "PostgreSQL", "AI"],
        viewLinkText: "View Case Study",
        githubUrl: "https://github.com/Fauxx/jobflow"
      },
      {
        id: "ai-email-agent",
        title: "AI Email Agent",
        description: "An intelligent email classification and notification agent with automated workflows and integrations.",
        tags: ["Python", "Automation", "APIs"],
        viewLinkText: "View Case Study",
        githubUrl: "https://github.com/Fauxx/ai-job-email-agent"
      }
    ]
  },
  about: {
    title: "About Me",
    paragraph: "I'm a Computer Engineering Technology graduate from TUP Manila, with hands-on experience in software development, cloud infrastructure, and automation. I enjoy building practical solutions, learning new technologies, and solving real-world problems through code and infrastructure.",
    highlightQuote: "I'm always open to new challenges, collaborations, and opportunities to grow."
  },
  careerEducation: {
    title: "Career & Education",
    timeline: [
      {
        period: "2026 – Present",
        title: "Software Developer Intern",
        organization: "InfoTouch Corporation",
        bullets: [
          "Developed and maintained web applications using modern technologies",
          "Collaborated with cross-functional teams in an Agile environment"
        ]
      },
      {
        period: "2022 – 2026",
        title: "Computer Engineering Technology",
        organization: "Technological University of the Philippines (TUP) Manila",
        bullets: [
          "Completed a degree in Computer Engineering Technology",
          "Gained foundational knowledge in software, hardware, and networking"
        ]
      },
      {
        period: "2024",
        title: "Customer Service Representative",
        organization: "Concentrix",
        bullets: [
          "Provided technical and customer support",
          "Developed communication and problem-solving skills"
        ]
      }
    ] as TimelineEntry[]
  },
  contact: {
    heading: "Let's connect.",
    subheading: "Feel free to reach out for opportunities, collaborations, or just to say hello.",
    github: "https://github.com/Fauxx",
    linkedin: "https://linkedin.com/in/zet02",
    email: "zetsamson@gmail.com",
    resumeUrl: "#"
  }
};
