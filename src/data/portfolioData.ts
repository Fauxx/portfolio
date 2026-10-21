export interface ExpertiseCard {
  id: string;
  icon: 'cloud' | 'box' | 'shield' | 'chart';
  title: string;
  items: string[];
}

export interface MediaOption {
  label: string;
  type: 'image' | 'video' | 'placeholder';
  src?: string;
  caption: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  badge?: string;
  pillar: string;
  description: string;
  highlights: string[];
  tags: string[];
  mediaOptions: MediaOption[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyText: string;
}

export interface SecondaryProject {
  id: string;
  title: string;
  pillar: string;
  description: string;
  tags: string[];
  media: {
    type: 'image' | 'placeholder';
    src?: string;
    caption: string;
    mockBadge?: string;
  };
  githubUrl?: string;
  caseStudyText: string;
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
    flagship: {
      id: "fire-monitoring",
      title: "FireMonitoringSystem",
      badge: "Flagship Cloud Architecture",
      pillar: "Cloud Infrastructure • 4-Layer IaC • Full Observability",
      description: "Production-grade IoT telemetry platform on Kubernetes (AKS/GKE). Engineered with 4-layer Terraform IaC, ArgoCD GitOps pipelines, and an end-to-end observability stack querying live Prometheus & Loki metrics without mock data.",
      highlights: [
        "Live 360° multi-tier architecture & latency verification hops",
        "Unified Command Center managing real-time MQTT telemetry nodes",
        "Zero-trust network policies, multi-stage non-root containers & Trivy scanning"
      ],
      tags: ["Kubernetes (AKS)", "Terraform IaC", "ArgoCD", "Prometheus & Loki", "FastAPI ETL", "MapLibre 3D"],
      mediaOptions: [
        {
          label: "360° Architecture & Observability",
          type: "image",
          src: "/media/fire-architecture-modal.png",
          caption: "Live 360° Architecture Modal with real-time multi-tier topology & latency hops"
        },
        {
          label: "Command Center Hub",
          type: "image",
          src: "/media/fire-command-center.png",
          caption: "Unified Command Center managing active sensor fleet and system diagnostics"
        },
        {
          label: "Live Telemetry Drawer",
          type: "image",
          src: "/media/fire-sensor-telemetry.png",
          caption: "Real-time MQTT sensor readings and time-series telemetry drawer"
        }
      ],
      githubUrl: "https://github.com/Fauxx/FireMonitoringSystem",
      liveUrl: "https://dev.fires.systems",
      caseStudyText: "View Case Study"
    } as FeaturedProject,
    secondaryCards: [
      {
        id: "jobflow",
        title: "Jobflow",
        pillar: "AI Product Engineering • Applied Gemini LLM",
        description: "Full-stack AI job tracking & résumé tailoring studio. Integrates Google Gemini API with strict Pydantic JSON validation, Playwright browser cookie scraping, and ATS-compliant pixel-accurate PDF generation.",
        tags: ["FastAPI", "Google Gemini API", "React 19", "Playwright", "PostgreSQL", "TailwindCSS"],
        media: {
          type: "image",
          src: "/media/jobflow-dashboard.png",
          caption: "Jobflow interactive pipeline & AI resume tailoring workspace",
          mockBadge: "LIVE INSTANCE"
        },
        githubUrl: "https://github.com/Fauxx/jobflow",
        caseStudyText: "View Case Study"
      },
      {
        id: "ai-email-agent",
        title: "Autonomous Job Email Agent",
        pillar: "Event-Driven Backend • Serverless Automation",
        description: "Event-driven automation workflow running headless in the cloud. Autonomously ingests incoming recruiter outreach, triggers Gemini LLM intent classification, and dispatches real-time Telegram actionable alerts.",
        tags: ["Python", "Gemini 2.0 Flash", "Telegram Bot API", "GitHub Actions", "Docker"],
        media: {
          type: "placeholder",
          caption: "Awaiting Telegram Alert & GitHub Actions Runner screenshot captures",
          mockBadge: "MEDIA PLACEHOLDER"
        },
        githubUrl: "https://github.com/Fauxx/ai-job-email-agent",
        caseStudyText: "View Architecture"
      }
    ] as SecondaryProject[]
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
