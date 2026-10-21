export interface ExpertiseCard {
  id: string;
  icon: 'cloud' | 'box' | 'shield' | 'chart';
  title: string;
  items: string[];
}

export interface MediaSlide {
  id: string;
  label: string;
  type: 'image' | 'gif' | 'placeholder';
  src?: string;
  badge?: string;
  title: string;
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
  slides: MediaSlide[];
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
  slides: MediaSlide[];
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
      description: "Production-grade IoT fire monitoring platform on Azure AKS & Kubernetes. Engineered with 4-layer modular Terraform IaC, GitOps deployment via ArgoCD, and a live observability stack with Loki log streaming and Prometheus scrape tuning.",
      highlights: [
        "Live 360° multi-tier architecture & latency verification hops",
        "Grafana Loki log aggregation with Cloud SQL sidecar stream aliasing",
        "Animated real-time telemetry streaming over MQTT & WebGL map canvas",
        "Zero-trust network policies, multi-stage non-root containers & Trivy scanning"
      ],
      tags: ["Kubernetes (AKS)", "Terraform IaC", "ArgoCD", "Prometheus & Loki", "FastAPI ETL", "MapLibre 3D"],
      slides: [
        {
          id: "arch",
          label: "360° Architecture",
          type: "image",
          src: "/media/fire-architecture-modal.png",
          badge: "MULTI-TIER TOPOLOGY",
          title: "Live End-to-End System Topology",
          caption: "Live 360° architecture modal showing broker, InfluxDB buffer, FastAPI ETL, and storage nodes"
        },
        {
          id: "loki",
          label: "Loki Logs Stream",
          type: "image",
          src: "/media/fire-loki-logs.png",
          badge: "LOG AGGREGATION",
          title: "Cluster Logs (Loki Live Stream)",
          caption: "Real-time structured log aggregation with container stream alias mapping and level filtering"
        },
        {
          id: "telemetry-gif",
          label: "Live Telemetry (GIF)",
          type: "gif",
          src: "/media/fire-live-telemetry.gif",
          badge: "MQTT TELEMETRY",
          title: "Real-Time Telemetry & Radar",
          caption: "Live pulsing telemetry markers, anomaly indicators, and MQTT sensor heartbeat streams"
        },
        {
          id: "command-center",
          label: "Command Center",
          type: "image",
          src: "/media/fire-command-center.png",
          badge: "FLEET MANAGEMENT",
          title: "Unified Command Center",
          caption: "Fleet diagnostics, hardware health status indicators, and workstation navigation suite"
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
        description: "Full-stack AI job tracking & ATS resume tailoring studio. Combines Google Gemini LLMs with strict Pydantic JSON schema fallback chains, Playwright browser cookie scraping, and ATS-compliant pixel-accurate PDF rendering.",
        tags: ["FastAPI", "Google Gemini API", "React 19", "Playwright", "PostgreSQL", "WeasyPrint"],
        slides: [
          {
            id: "jobflow-preview-modal",
            label: "Preview & Print Modal",
            type: "image",
            src: "/media/jobflow-preview-modal.png",
            badge: "PDF PREVIEW MODAL",
            title: "Web-Based Resume Preview & Print Modal",
            caption: "Interactive A4 preview modal with zoom controls, pixel overflow detection, and direct PDF print"
          },
          {
            id: "jobflow-builder",
            label: "Resume Studio Builder",
            type: "image",
            src: "/media/jobflow-resume-builder.png",
            badge: "AI TAILOR STUDIO",
            title: "Interactive Resume Builder",
            caption: "Live resume editor with split-screen tailoring, Gemini AI bullet suggestions, and skill matching"
          },
          {
            id: "jobflow-profile",
            label: "Master Profile",
            type: "image",
            src: "/media/jobflow-master-profile.png",
            badge: "MASTER REPOSITORY",
            title: "Master Profile Data Engine",
            caption: "Centralized repository for skills, career accomplishments, and project telemetry data"
          },
          {
            id: "jobflow-dash",
            label: "Pipeline Dashboard",
            type: "image",
            src: "/media/jobflow-dashboard.png",
            badge: "JOB PIPELINE",
            title: "Application Tracking Studio",
            caption: "Universal scraper ingestion, status tracking lanes, and cover letter generator"
          }
        ],
        githubUrl: "https://github.com/Fauxx/jobflow",
        caseStudyText: "View Case Study"
      },
      {
        id: "ai-email-agent",
        title: "Autonomous Job Email Agent",
        pillar: "Event-Driven Backend • Serverless Automation",
        description: "Event-driven cloud automation pipeline. Autonomously monitors incoming recruiter outreach, triggers Gemini LLM intent classification, and dispatches real-time Telegram alerts with instant action links.",
        tags: ["Python", "Gemini 2.0 Flash", "Telegram Bot API", "GitHub Actions", "Docker"],
        slides: [
          {
            id: "email-placeholder",
            label: "Alert Pipeline",
            type: "placeholder",
            badge: "MEDIA PLACEHOLDER",
            title: "Telegram Alert & Actions Runner",
            caption: "Awaiting Telegram notification & GitHub Actions runner execution captures"
          }
        ],
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
