import React, { useState, useEffect } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  Clock,
  Mail,
  Cpu,
  Send,
  Database,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Zap,
  Code2,
  Activity,
  Layers,
  Radio,
  GitBranch,
  Printer,
  Sparkles,
  Search,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

export type ProjectId = 'fire-monitoring' | 'jobflow' | 'ai-email-agent';

interface ProjectFlowchartModalProps {
  isOpen: boolean;
  initialProjectId?: ProjectId;
  onClose: () => void;
  onOpenTerminal?: (cmd?: string) => void;
}

interface FlowStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  summary: string;
  codeFile: string;
  codeSnippet: string;
  specs: string[];
}

interface ProjectPipeline {
  id: ProjectId;
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  icon: string;
  summary: string;
  steps: FlowStep[];
}

const pipelines: Record<ProjectId, ProjectPipeline> = {
    'fire-monitoring': {
      id: 'fire-monitoring',
      name: 'FireMonitoringSystem',
      tagline: 'GitOps Continuous Delivery & Cloud IoT Telemetry Architecture',
      badge: 'GITOPS & IOT TELEMETRY',
      badgeColor: '#38bdf8',
      icon: '🔥',
      summary: 'End-to-end cloud-native IoT ingestion pipeline: simulated edge MCU sensors publish MQTT over TLS, Mosquitto brokers live telemetry, Pandas ETL calculates rolling anomalies, dual InfluxDB/PostgreSQL stores metrics, and ArgoCD declarative GitOps reconciles GKE workloads.',
      steps: [
        {
          id: 'step-1',
          stepNumber: '01',
          title: 'IoT Edge Simulators Fleet',
          subtitle: 'Multi-Node Sensor Firmware Emulation',
          badge: 'EDGE INGESTION',
          badgeColor: '#38bdf8',
          icon: <Radio size={18} color="#38bdf8" />,
          summary: 'Fleet of simulated microcontroller nodes generates live temperature, smoke, and flame telemetry at 1Hz, packaging payloads into JSON.',
          codeFile: 'apps/simulators/mcu_sim.py',
          codeSnippet: `import paho.mqtt.client as mqtt
import json, time, random

def generate_telemetry(device_id):
    return {
        "device_id": device_id,
        "temp": round(random.uniform(24.0, 36.5), 2),
        "smoke": round(random.uniform(10.0, 45.0), 2),
        "flame": 0.0 if random.random() > 0.05 else 1.0,
        "timestamp": int(time.time())
    }

client = mqtt.Client(client_id="MCU-SIM-FLEET")
client.connect("fms-mosquitto", 1883, 60)`,
          specs: [
            'Protocol: MQTT 3.1.1 over TCP (:1883) & TLS',
            'Sampling Frequency: 1 Hz continuous telemetry heartbeat',
            'Fleet Size: Configurable simulated sensor array (10-100 nodes)',
            'Payload Schema: JSON {device_id, temp, smoke, flame, timestamp}'
          ]
        },
        {
          id: 'step-2',
          stepNumber: '02',
          title: 'MQTT Broker & WebSocket Bridge',
          subtitle: 'Eclipse Mosquitto StatefulSet',
          badge: 'MESSAGE BROKER',
          badgeColor: '#10b981',
          icon: <Activity size={18} color="#10b981" />,
          summary: 'In-cluster Mosquitto message broker accepts TCP sensor ingestion and exposes WebSocket endpoint (/mqtt) for browser live streaming.',
          codeFile: 'infrastructure/k8s/base/data/mqtt-statefulset.yaml',
          codeSnippet: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: fms-mosquitto
  namespace: fire-monitoring-dev
spec:
  serviceName: fms-mosquitto
  replicas: 1
  template:
    spec:
      containers:
        - name: mosquitto
          image: eclipse-mosquitto:2.0
          ports:
            - containerPort: 1883
              name: mqtt-tcp
            - containerPort: 9001
              name: mqtt-ws`,
          specs: [
            'Ports: 1883 TCP (Sensors) & 9001 WebSockets (Browser UI)',
            'QoS Level: QoS 1 (At-least-once delivery guarantee)',
            'Throughput: 12,000+ msgs/sec with low memory footprint (<40MB)',
            'Bridge: Subscribes clients to fms/telemetry/nodes/#'
          ]
        },
        {
          id: 'step-3',
          stepNumber: '03',
          title: 'Python Pandas Streaming ETL',
          subtitle: 'Rolling Aggregation & Anomaly Detection',
          badge: 'ANOMALY SCORING',
          badgeColor: '#f59e0b',
          icon: <Cpu size={18} color="#f59e0b" />,
          summary: 'Stream processor ingests raw telemetry, applies 10-second rolling window aggregations, detects threshold breaches, and routes to storage.',
          codeFile: 'apps/etl-processor/src/main.py',
          codeSnippet: `import pandas as pd
from influxdb_client import InfluxDBClient, Point

def process_stream_batch(batch_df: pd.DataFrame):
    # Calculate 10-second rolling average
    avg_temp = batch_df['temp'].rolling(window='10s').mean()
    is_anomaly = (batch_df['temp'] > 55.0) | (batch_df['smoke'] > 70.0)
    
    # Push time-series points to InfluxDB
    point = Point("node_telemetry") \\
        .tag("device_id", batch_df['device_id'].iloc[-1]) \\
        .field("temp_avg", float(avg_temp.iloc[-1])) \\
        .field("anomaly", bool(is_anomaly.iloc[-1]))
    write_api.write(bucket="node_telemetry", record=point)`,
          specs: [
            'ETL Engine: Python 3.11 with Pandas & NumPy vectorization',
            'Windowing: 10-second tumbling & sliding anomaly buffers',
            'Anomaly Threshold: Temp > 55°C OR Smoke Density > 70 ppm',
            'Routing: Dual-write to InfluxDB buffer and Postgres database'
          ]
        },
        {
          id: 'step-4',
          stepNumber: '04',
          title: 'Dual-Storage Time-Series & Relational',
          subtitle: 'InfluxDB 2.7 + Cloud SQL Postgres 15',
          badge: 'HYBRID STORAGE',
          badgeColor: '#8b5cf6',
          icon: <Database size={18} color="#8b5cf6" />,
          summary: 'Time-series sensor telemetry is stored in InfluxDB with 30-day rolling retention; relational device registries and user RBAC are in PostgreSQL.',
          codeFile: 'infrastructure/k8s/base/db/statefulset.yaml',
          codeSnippet: `# InfluxDB Bucket Policy
bucket = "node_telemetry"
retention = "30d"

# Cloud SQL PostgreSQL 15 Instance
resource "google_sql_database_instance" "postgres" {
  name             = "fms-postgres-dev"
  database_version = "POSTGRES_15"
  settings {
    tier = "db-custom-2-7680"
    ip_configuration {
      ipv4_enabled    = false
      private_network = module.vpc.network_id
    }
  }
}`,
          specs: [
            'Time-Series: InfluxDB 2.7 (node_telemetry, 30-day TTL)',
            'Relational: PostgreSQL 15 (devices, users, audit logs)',
            'Schema Versioning: Flyway SQL migrations (V1 to V17)',
            'Security: Private Google Cloud SQL IP with zero public exposure'
          ]
        },
        {
          id: 'step-5',
          stepNumber: '05',
          title: 'API & Real-Time MapLibre Dashboard',
          subtitle: 'Express Backend (:8000) & React 19 Canvas (:80)',
          badge: 'APPLICATION TIER',
          badgeColor: '#ec4899',
          icon: <Layers size={18} color="#ec4899" />,
          summary: 'Express API brokers time-series queries and health endpoints; React 19 frontend renders a 3D WebGL MapLibre live canvas of all sensor nodes.',
          codeFile: 'apps/dashboard/src/App.tsx',
          codeSnippet: `// React 19 WebGL Geospatial Sensor Canvas
export function SensorMapCanvas({ telemetryStream }) {
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    // Connect to in-cluster Mosquitto WebSocket bridge
    const ws = new WebSocket("wss://dev.fires.systems/mqtt");
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      updateSensorPin(mapRef.current, payload);
    };
  }, []);

  return <div id="maplibre-viewport" className="w-full h-full" />;
}`,
          specs: [
            'API: Express.js / TypeScript (:8000) handling REST queries',
            'Dashboard: React 19 + MapLibre GL WebGL geospatial canvas',
            'Packaging: Multi-stage Docker container with nginx:alpine',
            'Autoscaling: Horizontal Pod Autoscaler (HPA) targeting 70% CPU'
          ]
        },
        {
          id: 'step-6',
          stepNumber: '06',
          title: 'Zero-Trust Cloudflare Ingress',
          subtitle: 'In-Cluster cloudflared Tunnel Daemon',
          badge: 'ZERO-TRUST EDGE',
          badgeColor: '#0ea5e9',
          icon: <ShieldCheck size={18} color="#0ea5e9" />,
          summary: 'In-cluster cloudflared daemons establish outbound tunnels to Cloudflare Edge. Routes dev.fires.systems without open inbound cluster IPs.',
          codeFile: 'infrastructure/k8s/base/networking/cloudflared-deployment.yaml',
          codeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloudflared
  namespace: fire-monitoring-dev
spec:
  replicas: 2
  template:
    spec:
      containers:
        - name: cloudflared
          image: cloudflare/cloudflared:latest
          args: ["tunnel", "--no-autoupdate", "run"]
          env:
            - name: TUNNEL_TOKEN
              valueFrom:
                secretKeyRef:
                  name: dev-secrets
                  key: CLOUDFLARE_TUNNEL_TOKEN`,
          specs: [
            'Architecture: Outbound-only tunnel (Zero open inbound ports)',
            'Public Ingress IPs: 0 (Eliminates cluster attack surface)',
            'Edge Routing: Anycast DNS mapping dev.fires.systems -> tunnel',
            'TLS Termination: Automated Cloudflare Universal SSL certificates'
          ]
        },
        {
          id: 'step-7',
          stepNumber: '07',
          title: 'ArgoCD Declarative GitOps Workflow',
          subtitle: 'Kustomize v5 Multi-Environment Reconciliation',
          badge: 'GITOPS ENGINE',
          badgeColor: '#10b981',
          icon: <GitBranch size={18} color="#10b981" />,
          summary: 'Git commits to main trigger ArgoCD reconciliation. Kustomize overlays dynamically configure dev and prod clusters with auto-healing enabled.',
          codeFile: 'build/local/argocd-apps-dev.yaml',
          codeSnippet: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: fms-dev-root
  namespace: argocd
spec:
  destination:
    server: https://kubernetes.default.svc
    namespace: fire-monitoring-dev
  source:
    repoURL: https://github.com/Fauxx/FireMonitoringSystem.git
    targetRevision: main
    path: infrastructure/k8s/overlays/dev
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
          specs: [
            'GitOps Controller: ArgoCD v2.10 (Sync status: Healthy & Synced)',
            'Manifest Tooling: Kustomize v5 (base manifests + environment overlays)',
            'Drift Remediation: Automated self-healing reverts manual cluster edits',
            'IaC Bootstrapping: 4-Stage modular Terraform (00-bootstrap to 03-argocd)'
          ]
        }
      ]
    },
    'jobflow': {
      id: 'jobflow',
      name: 'Jobflow',
      tagline: 'Autonomous Scraping to ATS Resume Studio Engine',
      badge: 'AI SCRAPER TO ATS ENGINE',
      badgeColor: '#10b981',
      icon: '⚡',
      summary: 'Automated job application pipeline: Playwright bypasses job board auth walls with session cookies, FastAPI extracts job requirements, master career profile is loaded from PostgreSQL, Gemini 2.0 Flash tailors resume bullets with Pydantic validation, and WeasyPrint renders pixel-accurate single-page A4 ATS PDFs.',
      steps: [
        {
          id: 'step-1',
          stepNumber: '01',
          title: 'Universal Scraper & Auth Bypass',
          subtitle: 'Headless Playwright with Browser Cookies',
          badge: 'AUTH-WALL BYPASS',
          badgeColor: '#10b981',
          icon: <Search size={18} color="#10b981" />,
          summary: 'Playwright launches headless Chromium with mounted profile session cookies, inheriting authenticated logins to scrape LinkedIn, Indeed, and Ashby.',
          codeFile: 'src/services/playwright_scraper.py',
          codeSnippet: `from playwright.async_api import async_playwright
import os

async def scrape_job_post(url: str, session_cookies: str = None):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(user_agent="Mozilla/5.0")
        if session_cookies and os.path.exists(session_cookies):
            await context.add_cookies(session_cookies)
        page = await context.new_page()
        await page.goto(url, wait_until="domcontentloaded")
        title = await page.title()
        body_text = await page.inner_text("body")
        await browser.close()
        return {"title": title, "content": body_text}`,
          specs: [
            'Engine: Playwright Async Python with Chromium Headless',
            'Session Persistence: Local browser cookies injected into context',
            'Coverage: LinkedIn, Indeed, Greenhouse, Lever, Ashby',
            'Anti-Bot Handling: Humanized viewport, randomized delay, user-agent'
          ]
        },
        {
          id: 'step-2',
          stepNumber: '02',
          title: 'Job Requirement Cleansing',
          subtitle: 'FastAPI Async Schema Extraction',
          badge: 'INGESTION API',
          badgeColor: '#38bdf8',
          icon: <Code2 size={18} color="#38bdf8" />,
          summary: 'Cleans raw HTML, extracts job title, company name, required vs. preferred tech stack competencies, and saves job record in PostgreSQL.',
          codeFile: 'src/routers/scrape.py',
          codeSnippet: `from fastapi import APIRouter
from src.services.playwright_scraper import scrape_job_post

router = APIRouter()

@router.post("/scrape")
async def ingest_job(url: str):
    raw_data = await scrape_job_post(url)
    cleaned = sanitize_job_description(raw_data["content"])
    job_record = save_job_to_db(title=raw_data["title"], content=cleaned)
    return {"id": job_record.id, "status": "extracted"}`,
          specs: [
            'Framework: FastAPI Async ASGI with Pydantic settings',
            'DOM Sanitization: Strips navigation, footers, CSS, and script tags',
            'Entity Extraction: Role title, company, salary bounds, location',
            'Persistence: PostgreSQL 16 jobs table via SQLAlchemy async'
          ]
        },
        {
          id: 'step-3',
          stepNumber: '03',
          title: 'Master Profile Career Repository',
          subtitle: 'SQLAlchemy Centralized Accomplishments',
          badge: 'MASTER DATABASE',
          badgeColor: '#8b5cf6',
          icon: <Database size={18} color="#8b5cf6" />,
          summary: 'Loads candidate master profile JSON containing all career accomplishments, infrastructure telemetry, and skill categories.',
          codeFile: 'src/models/job.py',
          codeSnippet: `from sqlalchemy import Column, Integer, String, JSON
from src.core.database import Base

class UserProfile(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True)
    master_profile = Column(JSON, nullable=False)
    # Contains: full work experience, metrics, projects, competencies`,
          specs: [
            'Database: PostgreSQL 16 (Multi-container Docker Compose)',
            'Schema Versioning: Alembic incremental migrations',
            'Profile Structure: JSONB column with indexing on skill keywords',
            'Data Isolation: Single source of truth for all resume variations'
          ]
        },
        {
          id: 'step-4',
          stepNumber: '04',
          title: 'Gemini 2.0 Flash Tailor Engine',
          subtitle: 'Pydantic Structured JSON Validation',
          badge: 'GEMINI FLASH LLM',
          badgeColor: '#ec4899',
          icon: <Sparkles size={18} color="#ec4899" />,
          summary: 'Gemini 2.0 Flash evaluates job description against master profile, computes ATS match score, and rewrites bullet points to match targeted keywords.',
          codeFile: 'src/services/gemini_llm.py',
          codeSnippet: `import google.generativeai as genai
from pydantic import BaseModel, Field
from typing import List

class TailoredResumeResponse(BaseModel):
    match_score: int = Field(ge=0, le=100)
    targeted_summary: str
    optimized_bullet_points: List[str]
    missing_keywords: List[str]

def tailor_resume(master_profile: dict, job_description: str) -> TailoredResumeResponse:
    model = genai.GenerativeModel('gemini-2.0-flash')
    prompt = f"Tailor this profile to the job:\\n{json.dumps(master_profile)}\\nJob: {job_description}"
    response = model.generate_content(prompt)
    return TailoredResumeResponse.model_validate_json(response.text)`,
          specs: [
            'Model: Google Gemini 2.0 Flash (Fast sub-second response)',
            'Validation: Pydantic v2 JSON Schema model validation',
            'Output: match_score (0-100), optimized bullets, missing keywords',
            'Constraints: Strict word budget preventing multi-page page overflow'
          ]
        },
        {
          id: 'step-5',
          stepNumber: '05',
          title: 'Split-Screen Studio Diff & Preview',
          subtitle: 'React 19 Tailor Comparison Canvas',
          badge: 'INTERACTIVE STUDIO',
          badgeColor: '#f59e0b',
          icon: <Layers size={18} color="#f59e0b" />,
          summary: 'Interactive studio shows side-by-side diff of master vs. tailored bullet points, highlighting keyword insertions and live ATS match score.',
          codeFile: 'frontend/src/ResumeStudio.tsx',
          codeSnippet: `export const ResumeStudio = ({ job, tailoredData }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="original-column">
        <h3>Master Profile Accomplishments</h3>
        {/* Original untailored bullet list */}
      </div>
      <div className="tailored-column">
        <h3>Targeted ATS Version (Match Score: {tailoredData.match_score}%)</h3>
        {/* Real-time keyword diff highlights */}
      </div>
    </div>
  );
};`,
          specs: [
            'Frontend: React 19 + TypeScript + Tailwind CSS',
            'Visual Feedback: Color-coded keyword additions and metric adjustments',
            'Score Gauge: Interactive radial match score indicator',
            'Draft Tuning: Manual bullet tuning with instant re-score check'
          ]
        },
        {
          id: 'step-6',
          stepNumber: '06',
          title: 'Pixel-Accurate ATS Print Engine',
          subtitle: 'WeasyPrint & CSS Paged Media A4 PDF',
          badge: 'ATS PRINT ENGINE',
          badgeColor: '#0ea5e9',
          icon: <Printer size={18} color="#0ea5e9" />,
          summary: 'Renders typographic single-page A4 PDF using CSS Paged Media rules. Prevents awkward multi-page spill and guarantees 100% ATS text extractability.',
          codeFile: 'templates/resume_print.html',
          codeSnippet: `<!DOCTYPE html>
<html>
<head>
<style>
  @page {
    size: A4 portrait;
    margin: 12mm 15mm;
  }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 9.5pt;
    line-height: 1.35;
    color: #1a202c;
  }
  .section-title {
    font-size: 10pt;
    font-weight: bold;
    border-bottom: 1.5px solid #2d3748;
    margin-top: 8pt;
    margin-bottom: 4pt;
  }
</style>
</head>
<body>
  <!-- Pixel-accurate single page ATS layout -->
</body>
</html>`,
          specs: [
            'PDF Engine: WeasyPrint / CSS Paged Media engine',
            'Page Boundary: @page { size: A4 portrait; margin: 12mm 15mm; }',
            'Layout Safety: Dynamic height overflow calculation (< 297mm)',
            'ATS Compatibility: Pure selectable text, semantic heading tags'
          ]
        }
      ]
    },
    'ai-email-agent': {
      id: 'ai-email-agent',
      name: 'Autonomous Job Email Agent',
      tagline: 'Event-Driven Recruiter Triage & Real-Time Alert Bot',
      badge: 'SERVERLESS AUTOMATION',
      badgeColor: '#ec4899',
      icon: '🤖',
      summary: 'Zero-cost serverless automation: scheduled GitHub Actions cron boots ephemeral runner, connects to Gmail over IMAP TLS, deduplicates unread emails against daily cache, invokes Gemini 2.0 Flash for structured intent extraction, and pushes instant mobile alerts to Telegram.',
      steps: [
        {
          id: 'step-1',
          stepNumber: '01',
          title: 'Cron Trigger & Cloud Runner',
          subtitle: 'GitHub Actions Serverless Scheduler',
          badge: '0$ / MONTH SERVERLESS',
          badgeColor: '#38bdf8',
          icon: <Clock size={18} color="#38bdf8" />,
          summary: 'Ephemeral Ubuntu runner spins up every 2 hours on scheduled cron, checks out master branch, and boots an isolated Python 3.10 virtual environment.',
          codeFile: '.github/workflows/agent.yml',
          codeSnippet: `name: AI Email Agent
on:
  schedule:
    - cron: '0 */2 * * *'  # Runs every 2 hours
  workflow_dispatch:

jobs:
  run-agent:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python 3.10
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
      - run: pip install -r requirements.txt`,
          specs: [
            'Cron Interval: 0 */2 * * * (Every 2 hours UTC)',
            'Cloud Runner: ubuntu-latest (GitHub-hosted compute)',
            'Runtime: Python 3.10 clean virtual environment',
            'Cost Model: 100% free under GitHub public workflow tier'
          ]
        },
        {
          id: 'step-2',
          stepNumber: '02',
          title: 'Idempotency Cache Restoration',
          subtitle: 'Runner State Deduplication Layer',
          badge: 'STATE RECOVERY',
          badgeColor: '#10b981',
          icon: <Database size={18} color="#10b981" />,
          summary: 'Restores cache/notified_today.json from GitHub Actions cache. Deduplicates UIDs so existing emails are not re-parsed or alerted twice.',
          codeFile: 'main.py / cache/notified_today.json',
          codeSnippet: `def load_notified_cache():
    if not os.path.exists(NOTIFIED_CACHE):
        return {"date": "", "processed_uids": []}
    with open(NOTIFIED_CACHE, "r") as f:
        data = json.load(f)
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    if data.get("date") != today:
        return {"date": today, "processed_uids": []}
    return data`,
          specs: [
            'Cache Engine: @actions/cache/restore v4',
            'Cache File: cache/notified_today.json',
            'Daily Partitioning: UTC date boundary invalidation',
            'Deduplication: O(1) set lookup on message UIDs'
          ]
        },
        {
          id: 'step-3',
          stepNumber: '03',
          title: 'IMAP4 SSL Recruiter Polling',
          subtitle: 'Direct TLS Encrypted Gmail Connection',
          badge: 'TLS SECURE',
          badgeColor: '#818cf8',
          icon: <Mail size={18} color="#818cf8" />,
          summary: 'Connects directly to Gmail over TLS port 993 with app-password authentication. Filters for unseen messages with multipart MIME decoding.',
          codeFile: 'main.py (IMAP Client)',
          codeSnippet: `mail = imaplib.IMAP4_SSL("imap.gmail.com")
mail.login(EMAIL_USER, EMAIL_PASS)
mail.select("INBOX")

# Query unread candidate messages
status, messages = mail.search(None, '(UNSEEN)')
unread_ids = [uid.decode() for uid in messages[0].split()]
new_ids = [uid for uid in unread_ids if uid not in cache['processed_uids']]`,
          specs: [
            'Host: imap.gmail.com:993 (TLS 1.3)',
            'Authentication: App-Password via GitHub Encrypted Secrets',
            'Search Criteria: (UNSEEN) + Header UID verification',
            'Sanitization: Strips tracking pixels & CSS noise'
          ]
        },
        {
          id: 'step-4',
          stepNumber: '04',
          title: 'Gemini 2.0 Flash Extraction',
          subtitle: 'Structured Pydantic JSON Intent Parsing',
          badge: 'GEMINI FLASH LLM',
          badgeColor: '#ec4899',
          icon: <Cpu size={18} color="#ec4899" />,
          summary: 'Feeds candidate email headers and body text into Google Gemini 2.0 Flash. Enforces strict Pydantic JSON schema to classify intent and urgency.',
          codeFile: 'src/classifier.py',
          codeSnippet: `class EmailClassification(BaseModel):
    intent: Literal["interview_invitation", "recruiter_reachout", 
                    "assessment", "offer", "rejection", "unrelated"]
    company: str
    role: str
    urgency: Literal["high", "normal", "low"]
    action_required: str
    summary: str

def classify_email(sender: str, subject: str, body: str) -> EmailClassification:
    model = genai.GenerativeModel('gemini-2.0-flash')
    prompt = f"Classify this email:\\nFrom: {sender}\\nSubject: {subject}\\nBody: {body[:2500]}"
    res = model.generate_content(prompt)
    return EmailClassification.model_validate_json(res.text)`,
          specs: [
            'Model: gemini-2.0-flash (Sub-500ms latency)',
            'Schema Enforcement: Pydantic v2 JSON Schema Validation',
            'Extraction Tokens: ~350 prompt / ~90 output tokens per email',
            'Batch Optimization: Bundles unread emails into single prompt'
          ]
        },
        {
          id: 'step-5',
          stepNumber: '05',
          title: 'Decision Routing & Intent Branches',
          subtitle: 'Deterministic Urgency & Action Classification',
          badge: 'ROUTING ENGINE',
          badgeColor: '#f59e0b',
          icon: <Zap size={18} color="#f59e0b" />,
          summary: 'Evaluates the structured intent category to determine priority, formatting, and action URLs before alerting the engineer.',
          codeFile: 'src/classifier.py',
          codeSnippet: `# Intent routing rules:
if classification.intent == "interview_invitation":
    priority = "HIGH"
    icon = "🎯 INTERVIEW"
    action = "Schedule Calendar slot immediately"
elif classification.intent == "offer":
    priority = "URGENT"
    icon = "🎉 OFFER LETTER"
elif classification.intent == "rejection":
    priority = "LOW"
    icon = "📁 ARCHIVE"`,
          specs: [
            '🎯 Interview Invitation: Urgency HIGH (Direct schedule link)',
            '💬 Recruiter Reachout: Urgency NORMAL (Profile evaluation)',
            '🎉 Offer / Letter: Urgency URGENT (Immediate ping)',
            '📁 Archive / Rejection: Urgency LOW (Logged silently)'
          ]
        },
        {
          id: 'step-6',
          stepNumber: '06',
          title: 'Telegram Alert Push Notification',
          subtitle: 'Real-Time Mobile Alert via Bot API',
          badge: 'MOBILE DISPATCH',
          badgeColor: '#0ea5e9',
          icon: <Send size={18} color="#0ea5e9" />,
          summary: 'Dispatches high-priority Markdown notifications to mobile device via Telegram Bot API with inline action buttons linking directly to Gmail message.',
          codeFile: 'src/notifier.py',
          codeSnippet: `def send_telegram_alert(classification, sender, subject, msg_id):
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    
    text = (
        f"🎯 *Recruiter Alert: {classification.company}*\\n"
        f"📌 *Role:* {classification.role}\\n"
        f"⚡ *Urgency:* {classification.urgency.upper()}\\n"
        f"📝 *Summary:* {classification.summary}\\n"
        f"👉 *Action:* {classification.action_required}\\n"
        f"📧 *From:* \`{sender}\`"
    )
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    requests.post(url, json={"chat_id": chat_id, "text": text, "parse_mode": "Markdown"})`,
          specs: [
            'Endpoint: api.telegram.org/bot<TOKEN>/sendMessage',
            'Payload: Markdown formatted alert with metadata',
            'Deep-Link: Direct RFC-822 search URL to Gmail app',
            'Delivery Latency: < 1.2s from cron trigger'
          ]
        },
        {
          id: 'step-7',
          stepNumber: '07',
          title: 'State Commit & Zero-Trace Teardown',
          subtitle: 'Cache Preservation & Runner Cleanup',
          badge: 'CACHE PERSISTENCE',
          badgeColor: '#a855f7',
          icon: <ShieldCheck size={18} color="#a855f7" />,
          summary: 'Appends newly notified UIDs to cache/notified_today.json, uploads cache artifact via actions/cache/save, and tears down runner VM.',
          codeFile: '.github/workflows/agent.yml',
          codeSnippet: `- name: Save Notified Cache
  if: always()
  uses: actions/cache/save@v4
  with:
    path: cache/
    key: notified-cache-\${{ github.run_id }}

# Runner terminates automatically upon job completion`,
          specs: [
            'Persistence: actions/cache/save v4',
            'Artifact Key: notified-cache-${{ github.run_id }}',
            'Security: Memory sanitized on runner shutdown',
            'Monthly Cost: $0.00 persistent hosting overhead'
          ]
        }
      ]
    }
  };

export const ProjectFlowchartModal: React.FC<ProjectFlowchartModalProps> = ({
  isOpen,
  initialProjectId = 'fire-monitoring',
  onClose,
  onOpenTerminal
}) => {
  const [activeProjectId, setActiveProjectId] = useState<ProjectId>(initialProjectId);
  const [selectedStepId, setSelectedStepId] = useState<string>('step-1');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prevInitialId, setPrevInitialId] = useState(initialProjectId);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (initialProjectId !== prevInitialId) {
    setPrevInitialId(initialProjectId);
    setActiveProjectId(initialProjectId);
    setSelectedStepId('step-1');
  }
  const activePipeline = pipelines[activeProjectId] || pipelines['fire-monitoring'];
  const currentStep = activePipeline.steps.find((s) => s.id === selectedStepId) || activePipeline.steps[0];

  // Combined keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const stepIdx = activePipeline.steps.findIndex((s) => s.id === selectedStepId);
        if (stepIdx < activePipeline.steps.length - 1) {
          setSelectedStepId(activePipeline.steps[stepIdx + 1].id);
        }
      } else if (e.key === 'ArrowLeft') {
        const stepIdx = activePipeline.steps.findIndex((s) => s.id === selectedStepId);
        if (stepIdx > 0) {
          setSelectedStepId(activePipeline.steps[stepIdx - 1].id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, activePipeline, selectedStepId]);

  if (!isOpen) return null;


  return (
    <div
      onClick={onClose}
      className="flowchart-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isFullscreen ? '0' : '0.75rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flowchart-modal-window"
        style={{
          width: isFullscreen ? '100vw' : 'min(1560px, 96vw)',
          maxWidth: isFullscreen ? '100vw' : '96vw',
          height: isFullscreen ? '100vh' : '95vh',
          maxHeight: isFullscreen ? '100vh' : '95vh',
          backgroundColor: '#ffffff',
          border: isFullscreen ? 'none' : '1px solid #e2e8f0',
          borderRadius: isFullscreen ? '0' : '12px',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 10px 25px -5px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Top Header Bar (Sleek Black & White) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.65rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {/* Project Switcher Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              padding: '0.3rem 0.6rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#0f172a',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.725rem',
              fontWeight: 700
            }}>
              <GitBranch size={13} color="#0f172a" />
              <span>PIPELINE ARCHITECTURE</span>
            </span>

            {/* Switchers */}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {(Object.keys(pipelines) as ProjectId[]).map((pid) => {
                const pipe = pipelines[pid];
                const isActive = activeProjectId === pid;
                return (
                  <button
                    key={pid}
                    onClick={() => {
                      setActiveProjectId(pid);
                      setSelectedStepId('step-1');
                    }}
                    style={{
                      backgroundColor: isActive ? '#0f172a' : '#ffffff',
                      color: isActive ? '#ffffff' : '#64748b',
                      border: isActive ? '1px solid #0f172a' : '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{pipe.icon}</span>
                    <span>{pipe.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action & Window Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {onOpenTerminal && (
              <button
                onClick={() => {
                  onClose();
                  const cmd = activeProjectId === 'fire-monitoring'
                    ? 'inspect fire-monitoring'
                    : activeProjectId === 'jobflow'
                    ? 'inspect jobflow'
                    : 'inspect email-agent';
                  onOpenTerminal(cmd);
                }}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #0f172a',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title="Inspect in Terminal CLI"
              >
                <Terminal size={13} color="#0f172a" />
                <span>Inspect in CLI &gt;_</span>
              </button>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Restore Window' : 'Maximize Window'}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                borderRadius: '4px'
              }}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              onClick={onClose}
              title="Close modal (Esc)"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                borderRadius: '4px'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Workspace */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          backgroundColor: '#fafafa',
          minHeight: 0
        }}>
          {/* Subtitle Banner */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '0.75rem 1.15rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-sm)',
            flexShrink: 0
          }}>
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '1rem' }}>{activePipeline.icon}</span>
                <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.05rem' }}>
                  {activePipeline.name}
                </span>
                <span style={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: 700
                }}>
                  {activePipeline.badge}
                </span>
              </div>
              <div style={{ color: '#475569', fontSize: '0.825rem', lineHeight: 1.45 }}>
                {activePipeline.summary}
              </div>
            </div>

            {/* Quick Status Pill & Keyboard Nav Hint */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.725rem',
              color: '#64748b',
              flexShrink: 0
            }}>
              <span style={{
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                padding: '0.25rem 0.6rem',
                borderRadius: '5px',
                color: '#0f172a',
                fontWeight: 600
              }}>
                {activePipeline.steps.length} Pipeline Stages
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <kbd style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '3px', padding: '1px 5px', fontSize: '0.65rem' }}>←</kbd>
                <kbd style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '3px', padding: '1px 5px', fontSize: '0.65rem' }}>→</kbd>
                <span>Navigate</span>
              </span>
            </div>
          </div>

          {/* Interactive Flowchart Track (End-to-End Pipeline) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flexShrink: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.2rem',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#0f172a', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
                PIPELINE FLOWCHART (CLICK NODE TO INSPECT ARCHITECTURE &amp; CODE)
              </span>
              <span style={{ fontSize: '0.725rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                Stage {currentStep.stepNumber} of 0{activePipeline.steps.length} Selected: <strong style={{ color: '#0f172a' }}>{currentStep.title}</strong>
              </span>
            </div>

            {/* Connected Step Cards (Maximizing Width & Dataflow Direction) */}
            <div style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: '0.35rem',
              width: '100%',
              overflowX: 'auto',
              paddingBottom: '2px'
            }}>
              {activePipeline.steps.map((step, idx) => {
                const isSelected = step.id === selectedStepId;
                const isLast = idx === activePipeline.steps.length - 1;
                return (
                  <React.Fragment key={step.id}>
                    <button
                      onClick={() => setSelectedStepId(step.id)}
                      style={{
                        flex: '1 1 0',
                        minWidth: '140px',
                        backgroundColor: isSelected ? '#0f172a' : '#ffffff',
                        border: isSelected ? '1.5px solid #0f172a' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '0.65rem 0.7rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '0.35rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(15, 23, 42, 0.2)' : 'var(--shadow-sm)',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{
                            fontSize: '0.65rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 800,
                            color: isSelected ? '#38bdf8' : '#0f172a'
                          }}>
                            STAGE {step.stepNumber}
                          </span>
                          {isSelected && (
                            <span style={{
                              fontSize: '0.55rem',
                              fontFamily: 'var(--font-mono)',
                              backgroundColor: 'rgba(56, 189, 248, 0.2)',
                              color: '#38bdf8',
                              padding: '0.05rem 0.3rem',
                              borderRadius: '3px',
                              fontWeight: 700
                            }}>
                              ACTIVE
                            </span>
                          )}
                        </div>
                        {React.cloneElement(step.icon as React.ReactElement<{ color?: string }>, {
                          color: isSelected ? '#ffffff' : '#0f172a'
                        })}
                      </div>

                      <div style={{
                        fontSize: '0.775rem',
                        fontWeight: 700,
                        color: isSelected ? '#ffffff' : '#0f172a',
                        lineHeight: 1.25,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%'
                      }} title={step.title}>
                        {step.title.split('&')[0].trim()}
                      </div>

                      <div style={{
                        fontSize: '0.65rem',
                        color: isSelected ? '#94a3b8' : '#64748b',
                        lineHeight: 1.2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        fontFamily: 'var(--font-mono)'
                      }} title={step.subtitle}>
                        {step.subtitle}
                      </div>
                    </button>

                    {/* Flow Connector Arrow */}
                    {!isLast && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 0.1rem',
                        color: isSelected ? '#0f172a' : '#cbd5e1',
                        flexShrink: 0
                      }}>
                        <ChevronRight size={14} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detailed Inspector (Fills All Remaining Space) */}
          <div
            className="flowchart-stage-grid"
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
              gap: '1.25rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '1.25rem',
              minHeight: '380px',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden'
            }}
          >
            {/* Left: Code File Inspector */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              minHeight: 0,
              minWidth: 0
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.65rem',
                borderBottom: '1px solid #e2e8f0',
                marginBottom: '0.75rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#0f172a', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  <Code2 size={16} color="#0f172a" />
                  <span>{currentStep.codeFile}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.675rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                    Production Implementation
                  </span>
                  <button
                    onClick={() => handleCopyCode(currentStep.codeSnippet)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      backgroundColor: copied ? '#0f172a' : '#f1f5f9',
                      color: copied ? '#ffffff' : '#0f172a',
                      border: '1px solid #cbd5e1',
                      padding: '0.25rem 0.55rem',
                      borderRadius: '5px',
                      fontSize: '0.685rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    title="Copy code snippet to clipboard"
                  >
                    {copied ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              <pre style={{
                margin: 0,
                flex: 1,
                height: '100%',
                backgroundColor: '#0a0f1d',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                padding: '1.15rem 1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.825rem',
                lineHeight: 1.55,
                color: '#e2e8f0',
                overflowY: 'auto',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}>
                {currentStep.codeSnippet}
              </pre>
            </div>

            {/* Right: Architectural Specifications & Constraints */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              minHeight: 0,
              minWidth: 0,
              gap: '1rem',
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span style={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      padding: '0.15rem 0.55rem',
                      borderRadius: '4px'
                    }}>
                      STAGE {currentStep.stepNumber} • {currentStep.badge}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                      {currentStep.subtitle}
                    </span>
                  </div>

                  <h4 style={{ color: '#0f172a', fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-0.01em' }}>
                    {currentStep.title}
                  </h4>

                  <p style={{ color: '#334155', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {currentStep.summary}
                  </p>
                </div>

                {/* Specs checklist */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.9rem 1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem'
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                    KEY ARCHITECTURAL CONSTRAINTS &amp; SPECIFICATIONS
                  </div>
                  {currentStep.specs.map((spec, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.8rem', color: '#1e293b' }}>
                      <CheckCircle2 size={14} color="#0f172a" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ wordBreak: 'break-word', lineHeight: 1.45 }}>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct CLI trigger */}
              {onOpenTerminal && (
                <div style={{ paddingTop: '0.5rem' }}>
                  <button
                    onClick={() => {
                      onClose();
                      const file = currentStep.codeFile.split(' ')[0];
                      const repo = activeProjectId === 'fire-monitoring'
                        ? 'FireMonitoringSystem'
                        : activeProjectId === 'jobflow'
                        ? 'jobflow'
                        : 'ai-job-email-agent';
                      onOpenTerminal(`cd ${repo} && cat ${file}`);
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: '#ffffff',
                      border: '1.5px solid #0f172a',
                      color: '#0f172a',
                      padding: '0.65rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0f172a';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.color = '#0f172a';
                    }}
                  >
                    <Terminal size={15} />
                    <span>Inspect `{currentStep.codeFile.split(' ')[0]}` in Terminal CLI &gt;_</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
