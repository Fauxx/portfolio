export interface ExpertiseCard {
  id: string;
  icon: 'cloud' | 'box' | 'server' | 'shield' | 'chart';
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

export interface ProjectShowcase {
  id: string;
  title: string;
  badge: string;
  pillar: string;
  description: string;
  highlights: string[];
  tags: string[];
  slides: MediaSlide[];
  githubUrl?: string;
  liveUrl?: string;
  reversed?: boolean;
}

export interface TimelineEntry {
  period: string;
  title: string;
  organization: string;
  roleTag: string;
  bullets: string[];
}

export const portfolioConfig = {
  brand: {
    name: "ZET",
    tagline: "ENGINEERING"
  },
  hero: {
    statusPill: "Available for Software Developer & Cloud/DevOps Roles",
    location: "Pasig City, Metro Manila • UTC+8",
    greeting: "Hi, I'm",
    name: "Zet Donaue Samson",
    role: "Software Developer | Cloud & DevOps Engineer",
    summary: "I build end-to-end applications and the cloud-native infrastructure behind them — from 4-layer Terraform Kubernetes platforms and C# Clean Architecture APIs to reactive AI systems and event-driven automation pipelines.",
    monogram: "ZS",
    mantra: ["BUILD", "DEPLOY", "IMPROVE"],
    terminalSpecs: [
      { label: "ENGINEERING", value: "Full-Lifecycle (Code to Cloud)" },
      { label: "CLOUD & IAC", value: "Azure AKS • GKE • Terraform (4-Layer)" },
      { label: "BACKEND STACK", value: "Python • C# / ASP.NET Core 8 • Node.js" },
      { label: "DELIVERY & OPS", value: "ArgoCD GitOps • Prometheus • Loki" }
    ],
    stats: [
      { label: "Cloud Platform", value: "4-Layer IaC" },
      { label: "Delivery Engine", value: "ArgoCD GitOps" },
      { label: "Observability Stack", value: "Prometheus & Loki" }
    ],
    links: {
      github: "https://github.com/Fauxx",
      linkedin: "https://linkedin.com/in/zet02",
      email: "zetsamson@gmail.com"
    }
  },
  showcases: [
    {
      id: "fire-monitoring",
      title: "FireMonitoringSystem",
      badge: "Cloud & DevOps (Thesis Lab)",
      pillar: "Cloud Infrastructure • 4-Layer Modular IaC • Observability & Network Policies",
      description: "Cloud-native IoT telemetry & fire monitoring platform on Azure AKS & Kubernetes, engineered as a full-lifecycle university thesis & cloud lab. Built with 4-layer modular Terraform IaC, automated GitOps delivery via ArgoCD, and an end-to-end observability stack querying live Prometheus metrics and Grafana Loki log streams without mock data.",
      highlights: [
        "End-to-end multi-tier topology (Edge MQTT ➔ Mosquitto ➔ Pandas ETL ➔ InfluxDB & PostgreSQL)",
        "Grafana Loki log aggregation with Cloud SQL sidecar stream aliasing & level filtering",
        "Animated real-time telemetry streaming over MQTT & WebGL 3D map canvas",
        "Zero-trust network policies (Calico), non-root containers & Trivy vulnerability scanning"
      ],
      tags: ["Kubernetes (AKS)", "Terraform IaC", "ArgoCD GitOps", "Prometheus & Loki", "FastAPI ETL", "MapLibre 3D", "PostgreSQL"],
      slides: [
        {
          id: "arch",
          label: "360° Architecture",
          type: "image",
          src: "./media/fire-architecture-modal.png",
          badge: "MULTI-TIER TOPOLOGY",
          title: "Live End-to-End System Topology",
          caption: "Multi-tier architecture topology showing broker, InfluxDB buffer, FastAPI ETL, and storage nodes"
        },
        {
          id: "loki",
          label: "Loki Logs Stream",
          type: "image",
          src: "./media/fire-loki-logs.png",
          badge: "LOG AGGREGATION",
          title: "Cluster Logs (Loki Live Stream)",
          caption: "Real-time structured log aggregation with container stream alias mapping and level filtering"
        },
        {
          id: "telemetry-gif",
          label: "Live Telemetry (GIF)",
          type: "gif",
          src: "./media/fire-live-telemetry.gif",
          badge: "MQTT TELEMETRY",
          title: "Real-Time Telemetry & Radar",
          caption: "Live pulsing telemetry markers, anomaly indicators, and MQTT sensor heartbeat streams"
        },
        {
          id: "command-center",
          label: "Command Center",
          type: "image",
          src: "./media/fire-command-center.png",
          badge: "FLEET MANAGEMENT",
          title: "Unified Command Center",
          caption: "Fleet diagnostics, hardware health status indicators, and workstation navigation suite"
        }
      ],
      githubUrl: "https://github.com/Fauxx/FireMonitoringSystem",
      reversed: false
    },
    {
      id: "jobflow",
      title: "Jobflow",
      badge: "AI Product Engineering",
      pillar: "Applied Generative AI • Full-Stack Studio • ATS Layout Engine",
      description: "Full-stack AI job tracking & ATS resume tailoring studio. Combines Google Gemini LLMs with strict Pydantic JSON schema fallback validation, Playwright browser cookie scraping, and ATS-compliant pixel-accurate PDF rendering with typographic scale constraints.",
      highlights: [
        "Web-based A4 ATS print preview modal with zoom controls and dynamic pixel overflow detection",
        "Interactive Resume Studio with real-time draft tailoring, skill extraction, and AI bullet suggestions",
        "Comprehensive Master Profile data engine centralizing skills, projects, and career records",
        "Universal job scraper via Playwright with session cookie persistence for LinkedIn & job boards"
      ],
      tags: ["FastAPI", "Google Gemini API", "React 19", "TypeScript", "Playwright", "PostgreSQL", "WeasyPrint"],
      slides: [
        {
          id: "jobflow-preview-modal",
          label: "Preview & Print Modal",
          type: "image",
          src: "./media/jobflow-preview-modal.png",
          badge: "PDF PREVIEW MODAL",
          title: "Web-Based Resume Preview & Print Modal",
          caption: "Interactive A4 preview modal with zoom controls, pixel overflow detection, and direct PDF print"
        },
        {
          id: "jobflow-builder",
          label: "Resume Studio Builder",
          type: "image",
          src: "./media/jobflow-resume-builder.png",
          badge: "AI TAILOR STUDIO",
          title: "Interactive Resume Builder",
          caption: "Live resume editor with split-screen tailoring, Gemini AI bullet suggestions, and skill matching"
        },
        {
          id: "jobflow-profile",
          label: "Master Profile",
          type: "image",
          src: "./media/jobflow-master-profile.png",
          badge: "MASTER REPOSITORY",
          title: "Master Profile Data Engine",
          caption: "Centralized repository for skills, career accomplishments, and project telemetry data"
        },
        {
          id: "jobflow-dash",
          label: "Pipeline Dashboard",
          type: "image",
          src: "./media/jobflow-dashboard.png",
          badge: "JOB PIPELINE",
          title: "Application Tracking Studio",
          caption: "Universal scraper ingestion, status tracking lanes, and cover letter generator"
        }
      ],
      githubUrl: "https://github.com/Fauxx/jobflow",
      reversed: true
    },
    {
      id: "ai-email-agent",
      title: "Autonomous Job Email Agent",
      badge: "Event-Driven Automation",
      pillar: "Serverless Workflow • Automated Batch LLM • Real-Time Telegram Alerting",
      description: "Event-driven background automation pipeline running on scheduled cloud runners. Autonomously connects to Gmail over IMAP, extracts recruiter communications, executes structured Gemini 2.0 Flash LLM intent classification, and forwards actionable mobile alerts to Telegram.",
      highlights: [
        "Automated GitHub Actions cron scheduler executing batch AI analysis with zero monthly server overhead",
        "Structured Telegram bot alerting with company name, role, status summary, and direct Gmail deep links",
        "Idempotent UID caching mechanism preventing duplicate notifications across daily scheduled runs",
        "Declarative Terraform IaC bootstrap managing repository secrets with Libsodium encrypted vault"
      ],
      tags: ["Python 3.10", "Gemini 2.0 Flash", "Telegram Bot API", "GitHub Actions", "Terraform IaC", "IMAP4 SSL"],
      slides: [
        {
          id: "email-telegram",
          label: "Telegram Mobile Alert",
          type: "image",
          src: "./media/email-agent-telegram.jpg",
          badge: "LIVE TELEGRAM BOT",
          title: "Telegram Alert Notification",
          caption: "Real-time structured alert with company, role, application status, and direct Gmail action link"
        },
        {
          id: "email-runner",
          label: "Actions Runner (Forwarding)",
          type: "image",
          src: "./media/email-agent-runner.png",
          badge: "GITHUB ACTIONS RUNNER",
          title: "CI/CD Scheduled Runner Execution",
          caption: "Automated cron execution: IMAP polling, Gemini structured batch classification, and Telegram API forward"
        }
      ],
      githubUrl: "https://github.com/Fauxx/ai-job-email-agent",
      reversed: false
    }
  ] as ProjectShowcase[],
  expertise: {
    tag: "ENGINEERING FOCUS",
    title: "Technologies & Expertise",
    subtitle: "Tools and technologies I work with to build, deploy, and maintain modern applications and infrastructure.",
    cards: [
      {
        id: "cloud",
        icon: "cloud",
        title: "Cloud Infrastructure & IaC",
        items: ["GKE", "Azure AKS", "Terraform (Modular 4-Layer)", "VNet / VPC Networking", "Helm"]
      },
      {
        id: "containers",
        icon: "box",
        title: "Containers, CI/CD & GitOps",
        items: ["Kubernetes", "Docker Buildx", "ArgoCD", "GitHub Actions", "Kustomize (v5)"]
      },
      {
        id: "backend",
        icon: "server",
        title: "Backend APIs & Architecture",
        items: ["Python / FastAPI", "C# / ASP.NET Core 8 Minimal APIs", "Clean Architecture", "PostgreSQL", "Redis"]
      },
      {
        id: "security",
        icon: "shield",
        title: "Security & Observability",
        items: ["Trivy CVE Scanning", "Calico NetworkPolicies", "Prometheus", "Loki Logs", "Grafana Alloy"]
      }
    ] as ExpertiseCard[]
  },
  about: {
    title: "About Me",
    paragraph: "I'm a Computer Engineering Technology graduate from TUP Manila, with hands-on experience in backend engineering, cloud infrastructure, and intelligent automation. I enjoy designing clean architectures, solving concurrency challenges, and operationalizing zero-trust cloud platforms.",
    highlightQuote: "Building reliable, scalable systems through disciplined code, immutable infrastructure, and full-stack observability."
  },
  careerEducation: {
    title: "Career & Education",
    timeline: [
      {
        period: "Feb 2026 – June 2026",
        title: "Software Developer Intern",
        organization: "InfoTouch Corporation • Makati, Philippines",
        roleTag: "Backend & Systems",
        bullets: [
          "Built and structured ASP.NET Core 8.0 REST API endpoints following Clean Architecture (Domain, Application, Infrastructure layers)",
          "Refactored legacy C# MVC controllers into ASP.NET Core Minimal APIs, reducing boilerplate code and improving endpoint maintainability",
          "Implemented database concurrency controls using SELECT FOR UPDATE within Wallet Service transactions to eliminate race conditions under concurrent operations",
          "Engineered idempotent wallet transaction endpoints enforcing strict state transitions to guarantee transaction safety"
        ]
      },
      {
        period: "2022 – 2026",
        title: "Bachelor of Engineering Technology — Computer Engineering Technology",
        organization: "Technological University of the Philippines (TUP) • Manila, Philippines",
        roleTag: "Degree",
        bullets: [
          "Graduated with core competencies in computer systems, digital logic, and network communications",
          "Lead Developer & Cloud Infrastructure Engineer for the university thesis: Cloud-Native IoT Fire Monitoring & Observability Platform"
        ]
      },
      {
        period: "July 2024 – Nov 2024",
        title: "Adviser I, Technical Support & Sales (AT&T MSS Account)",
        organization: "Concentrix • Metro Manila, Philippines",
        roleTag: "Enterprise Operations",
        bullets: [
          "Handled high-volume inbound technical troubleshooting, network connectivity issues, and billing diagnostics under strict SLA targets",
          "Navigated complex AT&T internal CRM platforms and technical diagnostic databases simultaneously during live customer engagements",
          "Developed high-pressure KPI execution and client-facing communication skills that reinforce delivery discipline"
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
    resumeUrl: "./media/Resume_Zet_Samson_1.pdf"
  }
};
