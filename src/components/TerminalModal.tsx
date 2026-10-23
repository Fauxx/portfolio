import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Minimize2,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { SUGGESTIONS } from '../data/terminalData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCommand?: string;
}

interface HistoryItem {
  id: string;
  command: string;
  timestamp: string;
  output: React.ReactNode;
}

function renderWelcome() {
  const loginDate = new Date().toUTCString();
  return (
    <div style={{ color: '#e2e8f0', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>
      <div style={{ color: '#64748b', fontSize: '0.725rem', marginBottom: '0.2rem' }}>
        Linux fauxx-station 6.12.1-fms-zen x86_64 GNU/Linux
      </div>
      <div style={{ color: '#64748b', fontSize: '0.725rem', marginBottom: '0.65rem' }}>
        Last login: {loginDate} from 127.0.0.1 (tty1)
      </div>

      <pre style={{
        color: '#38bdf8',
        margin: '0.4rem 0 0.85rem 0',
        fontFamily: 'inherit',
        fontSize: 'clamp(0.48rem, 1.25vw, 0.78rem)',
        lineHeight: 1.15,
        fontWeight: 700,
        textShadow: '0 0 15px rgba(56, 189, 248, 0.45)',
        userSelect: 'none',
        overflowX: 'auto'
      }}>
{` ███████╗ █████╗ ██╗   ██╗██╗  ██╗██╗  ██╗
 ██╔════╝██╔══██╗██║   ██║╚██╗██╔╝╚██╗██╔╝
 █████╗  ███████║██║   ██║ ╚███╔╝  ╚███╔╝ 
 ██╔══╝  ██╔══██║██║   ██║ ██╔██╗  ██╔██╗ 
 ██║     ██║  ██║╚██████╔╝██╔╝ ██╗██╔╝ ██╗
 ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`}
      </pre>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        fontSize: '0.775rem',
        borderLeft: '2px solid #38bdf8',
        paddingLeft: '0.75rem',
        marginBottom: '0.85rem'
      }}>
        <div style={{ color: '#f8fafc', fontWeight: 700 }}>
          Zet Donaue Samson <span style={{ color: '#38bdf8' }}>[fauxx]</span> — Systems &amp; Cloud DevOps Engineer
        </div>
        <div style={{ color: '#94a3b8', fontSize: '0.725rem' }}>
          Infrastructure: GKE Kubernetes • ArgoCD GitOps • 4-Stage Terraform (GCP/Azure)
        </div>
        <div style={{ color: '#94a3b8', fontSize: '0.725rem' }}>
          Stack: Python • C# / ASP.NET Core 8 • React 19 • Next.js 15 • InfluxDB • Mosquitto
        </div>
      </div>

      <div style={{
        color: '#10b981',
        fontSize: '0.75rem',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: '4px',
        padding: '0.45rem 0.75rem',
        display: 'inline-block'
      }}>
        💡 Type <span style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'underline' }}>help</span> to view verified commands, or <span style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'underline' }}>projects</span> to inspect repositories. (Press <span style={{ color: '#38bdf8', fontWeight: 600 }}>Tab</span> to autocomplete)
      </div>
    </div>
  );
}

function renderHelp() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.8rem' }}>
      <div style={{ color: '#38bdf8', fontWeight: 700, borderBottom: '1px solid #1e293b', paddingBottom: '0.3rem' }}>
        AVAILABLE COMMANDS &amp; ARCHITECTURE TELEMETRY
      </div>

      <div>
        <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.25rem' }}>🚀 Projects &amp; Deep Dive:</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 220px) 1fr', gap: '0.2rem 1rem', paddingLeft: '0.5rem' }}>
          <span style={{ color: '#10b981' }}>projects</span>
          <span style={{ color: '#94a3b8' }}>List all 3 engineering repositories and current Git heads</span>
          <span style={{ color: '#10b981' }}>inspect fire-monitoring</span>
          <span style={{ color: '#94a3b8' }}>Deep-dive GKE, 4-stage Terraform, InfluxDB, ArgoCD</span>
          <span style={{ color: '#10b981' }}>inspect jobflow</span>
          <span style={{ color: '#94a3b8' }}>Inspect Next.js, FastAPI, Playwright scraper &amp; Gemini 2.0</span>
          <span style={{ color: '#10b981' }}>inspect email-agent</span>
          <span style={{ color: '#94a3b8' }}>Inspect GitHub Actions cron runner, IMAP &amp; Telegram bot</span>
        </div>
      </div>

      <div>
        <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.25rem' }}>☸️ Kubernetes &amp; GitOps (FireMonitoringSystem):</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 220px) 1fr', gap: '0.2rem 1rem', paddingLeft: '0.5rem' }}>
          <span style={{ color: '#10b981' }}>kubectl get pods</span>
          <span style={{ color: '#94a3b8' }}>Factual workloads in `fire-monitoring-dev` namespace</span>
          <span style={{ color: '#10b981' }}>kubectl get svc</span>
          <span style={{ color: '#94a3b8' }}>Services (MQTT 1883/9001 LB, API 8000, Influx 8086)</span>
          <span style={{ color: '#10b981' }}>kubectl get ingress</span>
          <span style={{ color: '#94a3b8' }}>Cloudflare Zero-Trust edge ingress mapping</span>
          <span style={{ color: '#10b981' }}>argocd app list</span>
          <span style={{ color: '#94a3b8' }}>ArgoCD GitOps application health and sync status</span>
        </div>
      </div>

      <div>
        <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.25rem' }}>🏗️ Infrastructure as Code &amp; Containers:</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 220px) 1fr', gap: '0.2rem 1rem', paddingLeft: '0.5rem' }}>
          <span style={{ color: '#10b981' }}>terraform state list</span>
          <span style={{ color: '#94a3b8' }}>View 4-stage Terraform module resources</span>
          <span style={{ color: '#10b981' }}>docker ps</span>
          <span style={{ color: '#94a3b8' }}>List active local jobflow containers (app &amp; db)</span>
          <span style={{ color: '#10b981' }}>gh run list</span>
          <span style={{ color: '#94a3b8' }}>Recent GitHub Actions CI/CD workflow executions</span>
        </div>
      </div>

      <div>
        <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.25rem' }}>📡 Real-Time Telemetry Simulation &amp; System:</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 220px) 1fr', gap: '0.2rem 1rem', paddingLeft: '0.5rem' }}>
          <span style={{ color: '#10b981' }}>curl -s /telemetry/stream</span>
          <span style={{ color: '#94a3b8' }}>Stream simulated MCU MQTT payloads &amp; ETL sync</span>
          <span style={{ color: '#10b981' }}>cat resume</span>
          <span style={{ color: '#94a3b8' }}>Display resume overview &amp; trigger PDF link</span>
          <span style={{ color: '#10b981' }}>clear / exit</span>
          <span style={{ color: '#94a3b8' }}>Clear terminal screen or close the modal window</span>
        </div>
      </div>
    </div>
  );
}

function renderProjects(onRunCmd: (cmd: string) => void) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
      <div style={{ color: '#38bdf8', fontWeight: 700 }}>
        REPOSITORY INDEX — 3 PRODUCTION SYSTEMS ON DISK
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '0.4rem 0.6rem' }}>NAME</th>
              <th style={{ padding: '0.4rem 0.6rem' }}>BRANCH</th>
              <th style={{ padding: '0.4rem 0.6rem' }}>TECH STACK</th>
              <th style={{ padding: '0.4rem 0.6rem' }}>ARCHITECTURE HIGHLIGHT</th>
              <th style={{ padding: '0.4rem 0.6rem' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #1e293b' }}>
              <td style={{ padding: '0.5rem 0.6rem', color: '#38bdf8', fontWeight: 600 }}>FireMonitoringSystem</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#10b981' }}>main (8b8947c)</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#cbd5e1' }}>GKE, Terraform, ArgoCD, InfluxDB, Mosquitto</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#94a3b8' }}>4-stage IaC, Zero-Trust Cloudflare tunnels, PSS</td>
              <td style={{ padding: '0.5rem 0.6rem' }}>
                <button
                  onClick={() => onRunCmd('inspect fire-monitoring')}
                  style={{ background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                  inspect
                </button>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #1e293b' }}>
              <td style={{ padding: '0.5rem 0.6rem', color: '#38bdf8', fontWeight: 600 }}>jobflow</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#10b981' }}>dev-zet (0f090a5)</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#cbd5e1' }}>Next.js, FastAPI, Playwright, Gemini 2.0, Postgres</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#94a3b8' }}>Bypasses auth walls with browser cookies; AI Resume Studio</td>
              <td style={{ padding: '0.5rem 0.6rem' }}>
                <button
                  onClick={() => onRunCmd('inspect jobflow')}
                  style={{ background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                  inspect
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem 0.6rem', color: '#38bdf8', fontWeight: 600 }}>ai-job-email-agent</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#10b981' }}>master (71c19c2)</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#cbd5e1' }}>Python 3.11, IMAP SSL, Gemini Flash, Telegram Bot</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#94a3b8' }}>$0 Serverless GitHub Actions cron, batch JSON parse</td>
              <td style={{ padding: '0.5rem 0.6rem' }}>
                <button
                  onClick={() => onRunCmd('inspect email-agent')}
                  style={{ background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                  inspect
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderInspectFireMonitoring(onRunCmd: (cmd: string) => void) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', lineHeight: 1.6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '0.4rem' }}>
        <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem' }}>
          🔥 FireMonitoringSystem — CLOUD IOT &amp; INFRASTRUCTURE PLATFORM
        </span>
        <span style={{ color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
          ● CLUSTER: gke-fire-monitoring-cluster-dev
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '0.65rem 0.8rem', borderRadius: '6px' }}>
          <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.3rem' }}>🏗️ Terraform 4-Stage IaC Architecture</div>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.75rem' }}>
            <li><strong>00-bootstrap:</strong> Remote GCS state locking &amp; OIDC Workload Identity Federation (zero static keys).</li>
            <li><strong>01-infra:</strong> Custom VPC, Cloud NAT, private GKE cluster &amp; Cloud SQL PostgreSQL 15.</li>
            <li><strong>02-platform:</strong> Cloudflare DNS, cert-manager SSL, ingress-nginx controller.</li>
            <li><strong>03-argocd:</strong> GitOps root application bootstrapping microservices.</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '0.65rem 0.8rem', borderRadius: '6px' }}>
          <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.3rem' }}>📡 High-Throughput Ingestion &amp; Pipeline</div>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.75rem' }}>
            <li><strong>MQTT Broker:</strong> Eclipse Mosquitto on port 1883 (TCP) &amp; 9001 (WebSockets /mqtt).</li>
            <li><strong>Time-Series:</strong> InfluxDB 2.7 buffering sensor telemetry (temperature, smoke, flame).</li>
            <li><strong>Python ETL:</strong> Pandas deduplication &amp; anomaly scoring running every 10s into PostgreSQL.</li>
            <li><strong>Zero-Trust:</strong> In-cluster Cloudflare Tunnels (cloudflared) bypass public firewall holes.</li>
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
        <button
          onClick={() => onRunCmd('kubectl get pods -n fire-monitoring-dev')}
          style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#38bdf8', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
        >
          Run `kubectl get pods`
        </button>
        <button
          onClick={() => onRunCmd('terraform state list')}
          style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f59e0b', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
        >
          Run `terraform state list`
        </button>
        <button
          onClick={() => onRunCmd('curl -s /telemetry/stream')}
          style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#10b981', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
        >
          Stream Live Payload
        </button>
        <a
          href="https://github.com/Fauxx/FireMonitoringSystem"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#94a3b8', textDecoration: 'none', fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
        >
          GitHub Repo <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

function renderInspectJobflow(onRunCmd: (cmd: string) => void) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', lineHeight: 1.6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '0.4rem' }}>
        <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem' }}>
          ⚡ jobflow — AUTONOMOUS APPLICATION PIPELINE &amp; AI RESUME STUDIO
        </span>
        <span style={{ color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
          ● LOCAL STACK: FastAPI :8000 + Postgres :5432
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '0.65rem 0.8rem', borderRadius: '6px' }}>
          <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.3rem' }}>🍪 Login-Wall Bypass via Local Session Cookies</div>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.75rem' }}>
            Unlike brittle scrapers blocked by Cloudflare / Captchas, Jobflow mounts native local browser profiles
            (<code>~/.mozilla</code>, <code>~/.config/google-chrome</code>) into Playwright headless browser contexts.
            It inherits pre-authenticated sessions to seamlessly ingest jobs from LinkedIn, Indeed, and Ashby.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '0.65rem 0.8rem', borderRadius: '6px' }}>
          <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.3rem' }}>🧠 Gemini 2.0 Flash Extraction &amp; Resume Studio</div>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.75rem' }}>
            Leverages Google GenAI with strict Pydantic JSON schemas to parse unstructured JD requirements into
            hard skills, salary brackets, and visa requirements. Features an interactive browser-based PDF print builder
            that live-tailors experience bullets against targeted ATS keywords.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
        <button
          onClick={() => onRunCmd('docker ps')}
          style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#38bdf8', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
        >
          Run `docker ps`
        </button>
        <a
          href="https://github.com/Fauxx/jobflow"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#94a3b8', textDecoration: 'none', fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
        >
          GitHub Repo <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

function renderInspectEmailAgent(onRunCmd: (cmd: string) => void) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', lineHeight: 1.6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '0.4rem' }}>
        <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem' }}>
          📬 ai-job-email-agent — SERVERLESS RECRUITER RADAR &amp; ALERT BOT
        </span>
        <span style={{ color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
          ● RUNNER: GitHub Actions Cron (schedule: 0 */4 * * *)
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '0.65rem 0.8rem', borderRadius: '6px' }}>
          <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.3rem' }}>⏱️ $0 Serverless Architecture</div>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.75rem' }}>
            Zero infrastructure cost by taking advantage of GitHub Actions scheduled cron runners. Runs <code>agent.yml</code>
            on an automated 4-hour cycle to ingest incoming IMAP mailbox emails via SSL without running a persistent 24/7 VPS.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '0.65rem 0.8rem', borderRadius: '6px' }}>
          <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.3rem' }}>🤖 Batch Gemini Classification &amp; Telegram</div>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.75rem' }}>
            Sends batched email payloads into a single Gemini Flash LLM prompt, categorizing emails into
            <code>Interview</code>, <code>Rejection</code>, <code>Recruiter Reachout</code>, or <code>Offer</code>.
            Instantly sends high-priority Markdown mobile notifications via the Telegram Bot API.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
        <button
          onClick={() => onRunCmd('gh run list --limit 5')}
          style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#38bdf8', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
        >
          Run `gh run list`
        </button>
        <a
          href="https://github.com/Fauxx/ai-job-email-agent"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#94a3b8', textDecoration: 'none', fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
        >
          GitHub Repo <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

function renderKubectlPods() {
  const pods = [
    { name: 'api-6789bdf-9k2lx', ready: '1/1', status: 'Running', restarts: '0', age: '4d12h', ip: '10.244.1.18', node: 'gke-worker-pool-a1' },
    { name: 'cloudflared-59d8756c54-4zghx', ready: '1/1', status: 'Running', restarts: '0', age: '6d02h', ip: '10.244.1.19', node: 'gke-worker-pool-a1' },
    { name: 'dashboard-76dcb9468c-p8qvw', ready: '1/1', status: 'Running', restarts: '0', age: '4d12h', ip: '10.244.2.34', node: 'gke-worker-pool-b2' },
    { name: 'etl-processor-85f549c4d9-m9z2q', ready: '1/1', status: 'Running', restarts: '0', age: '2d05h', ip: '10.244.1.22', node: 'gke-worker-pool-a1' },
    { name: 'loki-7f6c6d54cf-6s9pq', ready: '1/1', status: 'Running', restarts: '0', age: '7d01h', ip: '10.244.2.40', node: 'gke-worker-pool-b2' },
    { name: 'mcu-simulator-fleet-5b584ff749-j7w1t', ready: '1/1', status: 'Running', restarts: '0', age: '3d08h', ip: '10.244.1.25', node: 'gke-worker-pool-a1' },
    { name: 'mqtt-6b8cfb8584-r27tk', ready: '1/1', status: 'Running', restarts: '0', age: '7d01h', ip: '10.244.2.45', node: 'gke-worker-pool-b2' },
    { name: 'mqtt-exporter-54877cb7fd-vll9b', ready: '1/1', status: 'Running', restarts: '0', age: '7d01h', ip: '10.244.2.46', node: 'gke-worker-pool-b2' },
    { name: 'prometheus-66fbd65cfb-tk58c', ready: '1/1', status: 'Running', restarts: '0', age: '7d01h', ip: '10.244.1.30', node: 'gke-worker-pool-a1' },
    { name: 'telegraf-7bf4756598-wkd28', ready: '1/1', status: 'Running', restarts: '0', age: '7d01h', ip: '10.244.1.31', node: 'gke-worker-pool-a1' },
    { name: 'influx-0', ready: '1/1', status: 'Running', restarts: '0', age: '7d01h', ip: '10.244.2.50', node: 'gke-worker-pool-b2' },
    { name: 'alloy-h7fx2', ready: '1/1', status: 'Running', restarts: '0', age: '7d01h', ip: '10.244.1.10', node: 'gke-worker-pool-a1' },
    { name: 'cadvisor-m5n9p', ready: '1/1', status: 'Running', restarts: '0', age: '7d01h', ip: '10.244.1.11', node: 'gke-worker-pool-a1' },
    { name: 'node-exporter-48rzk', ready: '1/1', status: 'Running', restarts: '0', age: '7d01h', ip: '10.244.1.12', node: 'gke-worker-pool-a1' },
    { name: 'flyway-migrate-v1.4.2-q7x99', ready: '0/1', status: 'Completed', restarts: '0', age: '4d12h', ip: '10.244.1.17', node: 'gke-worker-pool-a1' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
      <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '0.2rem' }}>
        CURRENT CONTEXT: <span style={{ color: '#38bdf8' }}>gke_fire-monitoring-cluster-dev</span> | NAMESPACE: <span style={{ color: '#a855f7' }}>fire-monitoring-dev</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ color: '#64748b', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '0.35rem 0.5rem' }}>NAME</th>
              <th style={{ padding: '0.35rem 0.5rem' }}>READY</th>
              <th style={{ padding: '0.35rem 0.5rem' }}>STATUS</th>
              <th style={{ padding: '0.35rem 0.5rem' }}>RESTARTS</th>
              <th style={{ padding: '0.35rem 0.5rem' }}>AGE</th>
              <th style={{ padding: '0.35rem 0.5rem' }}>IP</th>
              <th style={{ padding: '0.35rem 0.5rem' }}>NODE</th>
            </tr>
          </thead>
          <tbody>
            {pods.map((p, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.35rem 0.5rem', color: '#e2e8f0' }}>{p.name}</td>
                <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>{p.ready}</td>
                <td style={{ padding: '0.35rem 0.5rem', color: p.status === 'Running' ? '#10b981' : '#38bdf8' }}>
                  {p.status}
                </td>
                <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>{p.restarts}</td>
                <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>{p.age}</td>
                <td style={{ padding: '0.35rem 0.5rem', color: '#64748b' }}>{p.ip}</td>
                <td style={{ padding: '0.35rem 0.5rem', color: '#64748b' }}>{p.node}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ color: '#10b981', fontSize: '0.7rem', marginTop: '0.3rem' }}>
        ✓ All 15 workloads healthy and synchronized with ArgoCD GitOps
      </div>
    </div>
  );
}

function renderKubectlSvc() {
  const services = [
    { name: 'mqtt', type: 'LoadBalancer', clusterIp: '10.96.19.12', externalIp: '34.143.190.12', ports: '1883/TCP, 9001/TCP' },
    { name: 'api', type: 'ClusterIP', clusterIp: '10.96.4.15', externalIp: '<none>', ports: '8000/TCP' },
    { name: 'dashboard', type: 'ClusterIP', clusterIp: '10.96.12.88', externalIp: '<none>', ports: '80/TCP' },
    { name: 'influx', type: 'ClusterIP', clusterIp: '10.96.25.101', externalIp: '<none>', ports: '8086/TCP' },
    { name: 'loki', type: 'ClusterIP', clusterIp: '10.96.7.42', externalIp: '<none>', ports: '3100/TCP' },
    { name: 'prometheus', type: 'ClusterIP', clusterIp: '10.96.18.204', externalIp: '<none>', ports: '9090/TCP' },
    { name: 'mqtt-exporter', type: 'ClusterIP', clusterIp: '10.96.33.20', externalIp: '<none>', ports: '9234/TCP' },
    { name: 'node-exporter', type: 'ClusterIP', clusterIp: '10.96.40.11', externalIp: '<none>', ports: '9100/TCP' },
    { name: 'cadvisor', type: 'ClusterIP', clusterIp: '10.96.8.80', externalIp: '<none>', ports: '8080/TCP' }
  ];

  return (
    <div style={{ overflowX: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ color: '#64748b', borderBottom: '1px solid #334155' }}>
            <th style={{ padding: '0.35rem 0.5rem' }}>NAME</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>TYPE</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>CLUSTER-IP</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>EXTERNAL-IP</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>PORT(S)</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #1e293b' }}>
              <td style={{ padding: '0.35rem 0.5rem', color: '#e2e8f0' }}>{s.name}</td>
              <td style={{ padding: '0.35rem 0.5rem', color: s.type === 'LoadBalancer' ? '#f59e0b' : '#94a3b8' }}>{s.type}</td>
              <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>{s.clusterIp}</td>
              <td style={{ padding: '0.35rem 0.5rem', color: s.externalIp !== '<none>' ? '#38bdf8' : '#64748b' }}>{s.externalIp}</td>
              <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>{s.ports}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderTerraformState() {
  return (
    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6, color: '#cbd5e1' }}>
      <div style={{ color: '#38bdf8', marginBottom: '0.3rem', fontWeight: 600 }}>
        TERRAFORM MANAGED STATE (Google Cloud Platform &amp; Kubernetes Provider)
      </div>
      <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>
        Backend: <span style={{ color: '#f59e0b' }}>gs://fms-tfstate-gke-dev/terraform.tfstate</span> (State Lock active)
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', padding: '0.5rem 0.75rem' }}>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>[STAGE 00-BOOTSTRAP]</span>
          <div style={{ color: '#a855f7' }}>google_storage_bucket.terraform_state</div>
          <div style={{ color: '#a855f7' }}>google_iam_workload_identity_pool.github_pool</div>
          <div style={{ color: '#a855f7' }}>google_iam_workload_identity_pool_provider.github_provider</div>
          <div style={{ color: '#a855f7' }}>google_service_account.github_actions_sa</div>
        </div>

        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', padding: '0.5rem 0.75rem' }}>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>[STAGE 01-INFRA]</span>
          <div style={{ color: '#10b981' }}>google_compute_network.fms_vpc</div>
          <div style={{ color: '#10b981' }}>google_compute_subnetwork.fms_private_subnet</div>
          <div style={{ color: '#10b981' }}>google_compute_router_nat.fms_cloud_nat</div>
          <div style={{ color: '#10b981' }}>module.gke.google_container_cluster.primary (zone: asia-southeast1-a)</div>
          <div style={{ color: '#10b981' }}>module.gke.google_container_node_pool.preemptible_nodes</div>
          <div style={{ color: '#10b981' }}>module.cloudsql.google_sql_database_instance.postgres</div>
        </div>

        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', padding: '0.5rem 0.75rem' }}>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>[STAGE 02-PLATFORM &amp; 03-GITOPS]</span>
          <div style={{ color: '#f59e0b' }}>cloudflare_record.cluster_dns (dev.fires.systems)</div>
          <div style={{ color: '#f59e0b' }}>helm_release.ingress_nginx</div>
          <div style={{ color: '#f59e0b' }}>helm_release.cert_manager</div>
          <div style={{ color: '#f59e0b' }}>helm_release.argocd (namespace: argocd)</div>
          <div style={{ color: '#f59e0b' }}>argocd_application.fire_monitoring_dev</div>
        </div>
      </div>
    </div>
  );
}

function renderDockerPs() {
  return (
    <div style={{ overflowX: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ color: '#64748b', borderBottom: '1px solid #334155' }}>
            <th style={{ padding: '0.35rem 0.5rem' }}>CONTAINER ID</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>IMAGE</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>COMMAND</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>STATUS</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>PORTS</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>NAMES</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #1e293b' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f59e0b' }}>d4160443bbff</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#cbd5e1' }}>postgres:16</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>postgres</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Up 2 days</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#38bdf8' }}>0.0.0.0:5432-&gt;5432/tcp</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#e2e8f0', fontWeight: 600 }}>jobflow-db</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f59e0b' }}>11a056a620a2</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#cbd5e1' }}>localhost/jobflow_app:latest</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>alembic upgrade &amp;&amp; uvicorn...</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Up 2 days</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#38bdf8' }}>0.0.0.0:8000-&gt;8000/tcp</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#e2e8f0', fontWeight: 600 }}>jobflow-app</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function renderArgoCD() {
  return (
    <div style={{ overflowX: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
      <div style={{ color: '#38bdf8', marginBottom: '0.4rem', fontWeight: 600 }}>
        ARGOCD GITOPS SYNCHRONIZATION STATUS
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ color: '#64748b', borderBottom: '1px solid #334155' }}>
            <th style={{ padding: '0.35rem 0.5rem' }}>NAME</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>NAMESPACE</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>REVISION</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>SYNC STATUS</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>HEALTH</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>AUTO-HEAL</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #1e293b' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#e2e8f0', fontWeight: 600 }}>fire-monitoring-dev</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>fire-monitoring-dev</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#38bdf8' }}>main @ 8b8947c</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Synced</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Healthy</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Enabled</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #1e293b' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#e2e8f0', fontWeight: 600 }}>fire-monitoring-prod</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>fire-monitoring-prod</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#38bdf8' }}>main @ 8b8947c</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Synced</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Healthy</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Enabled</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.5rem', color: '#e2e8f0', fontWeight: 600 }}>argocd-bootstrap</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>argocd</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#38bdf8' }}>main @ 8b8947c</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Synced</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Healthy</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>Enabled</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function renderGhRunList() {
  return (
    <div style={{ overflowX: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
      <div style={{ color: '#38bdf8', marginBottom: '0.4rem', fontWeight: 600 }}>
        GITHUB ACTIONS RECENT WORKFLOW RUNS (Logged in as @Fauxx)
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ color: '#64748b', borderBottom: '1px solid #334155' }}>
            <th style={{ padding: '0.35rem 0.5rem' }}>STATUS</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>REPOSITORY</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>WORKFLOW</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>EVENT</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>BRANCH</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>ELAPSED</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #1e293b' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>✓ Success</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#38bdf8' }}>ai-job-email-agent</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#cbd5e1' }}>AI Email Agent (Cron)</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f59e0b' }}>schedule</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>master</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>41s</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #1e293b' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>✓ Success</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#38bdf8' }}>FireMonitoringSystem</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#cbd5e1' }}>Application CI/CD — Build &amp; Secure</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>push</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>main</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>5m 12s</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #1e293b' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>✓ Success</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#38bdf8' }}>FireMonitoringSystem</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#cbd5e1' }}>Kubernetes Manifest Validation</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>push</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>main</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>8s</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.5rem', color: '#10b981' }}>✓ Success</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#38bdf8' }}>portfolio</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#cbd5e1' }}>pages-build-deployment</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>push</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>master</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8' }}>26s</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function renderTelemetryStream() {
  return (
    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6, color: '#cbd5e1' }}>
      <div style={{ color: '#10b981', fontWeight: 600, marginBottom: '0.3rem' }}>
        [CONNECTED] Mosquitto MQTT Broker @ 34.143.190.12:1883 [QoS 1]
      </div>
      <div style={{ color: '#94a3b8', marginBottom: '0.4rem' }}>
        SUBSCRIBED TOPIC: <span style={{ color: '#38bdf8' }}>fms/telemetry/nodes/#</span>
      </div>

      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', padding: '0.6rem 0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div>
          <span style={{ color: '#64748b' }}>[17:28:10.42]</span>{' '}
          <span style={{ color: '#f59e0b' }}>&lt;-- RECV</span>:{' '}
          <span style={{ color: '#a855f7' }}>{`{"device_id": "FMS-V1-0001", "temp": 29.41, "smoke": 18.2, "flame": 0.0, "status": 0}`}</span>{' '}
          <span style={{ color: '#10b981' }}>[OK]</span>
        </div>
        <div>
          <span style={{ color: '#64748b' }}>[17:28:15.89]</span>{' '}
          <span style={{ color: '#f59e0b' }}>&lt;-- RECV</span>:{' '}
          <span style={{ color: '#a855f7' }}>{`{"device_id": "FMS-V1-0002", "temp": 30.15, "smoke": 22.8, "flame": 0.0, "status": 0}`}</span>{' '}
          <span style={{ color: '#10b981' }}>[OK]</span>
        </div>
        <div>
          <span style={{ color: '#64748b' }}>[17:28:20.14]</span>{' '}
          <span style={{ color: '#f59e0b' }}>&lt;-- RECV</span>:{' '}
          <span style={{ color: '#a855f7' }}>{`{"device_id": "FMS-V1-0003", "temp": 32.88, "smoke": 44.5, "flame": 0.0, "status": 1}`}</span>{' '}
          <span style={{ color: '#f59e0b', fontWeight: 600 }}>[ALERT: STATUS_WARNING]</span>
        </div>
      </div>

      <div style={{ marginTop: '0.4rem', color: '#38bdf8', fontSize: '0.7rem' }}>
        ✓ InfluxDB measurement: <code>node_telemetry</code> buffer active | Python ETL aggregator window: 5 min
      </div>
    </div>
  );
}

function renderResume() {
  return (
    <div style={{ fontSize: '0.8rem', lineHeight: 1.6, color: '#e2e8f0' }}>
      <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
        ZET DONAUE SAMSON — SYSTEMS &amp; CLOUD DEVOPS ENGINEER
      </div>
      <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.6rem' }}>
        Pasig City, Metro Manila • samsonzetdonaue@gmail.com • <a href="https://fauxx.is-a.dev" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>fauxx.is-a.dev</a>
      </div>
      <p style={{ margin: '0 0 0.6rem 0', color: '#cbd5e1', fontSize: '0.775rem' }}>
        Full-Lifecycle Engineer bridging modern containerized microservices and automated cloud infrastructure.
        Proven expertise deploying Kubernetes clusters, 4-layer Terraform IaC, ArgoCD GitOps, and reactive AI systems.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <a
          href="./resume.pdf"
          download
          className="btn-primary"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          Download PDF Resume <ArrowRight size={13} />
        </a>
        <a
          href="mailto:samsonzetdonaue@gmail.com"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', border: '1px solid #334155', borderRadius: '6px', color: '#e2e8f0', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          Send Email
        </a>
      </div>
    </div>
  );
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  initialCommand
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(() => [
    {
      id: 'welcome-0',
      command: 'sys-init',
      timestamp: new Date().toLocaleTimeString(),
      output: renderWelcome()
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const executeCommandRef = useRef<(cmd: string) => void>(() => {});

  const handleRunCmd = useCallback((cmd: string) => {
    executeCommandRef.current(cmd);
  }, []);

  const executeCommand = useCallback((rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to navigation history
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInput('');
      return;
    }

    if (lower === 'exit' || lower === 'quit') {
      onClose();
      setInput('');
      return;
    }

    let output: React.ReactNode = null;

    if (lower === 'help' || lower === '?') {
      output = renderHelp();
    } else if (lower === 'projects' || lower === 'ls' || lower === 'repos') {
      output = renderProjects(handleRunCmd);
    } else if (lower.includes('fire-monitoring') || lower === 'firectl' || lower === 'firectl status') {
      output = renderInspectFireMonitoring(handleRunCmd);
    } else if (lower.includes('jobflow') || lower === 'inspect jobflow') {
      output = renderInspectJobflow(handleRunCmd);
    } else if (lower.includes('email-agent') || lower === 'inspect email-agent') {
      output = renderInspectEmailAgent(handleRunCmd);
    } else if (lower.startsWith('kubectl get pod') || lower === 'k get pods') {
      output = renderKubectlPods();
    } else if (lower.startsWith('kubectl get svc') || lower === 'k get svc') {
      output = renderKubectlSvc();
    } else if (lower.startsWith('kubectl get ingress') || lower === 'kubectl get ing') {
      output = (
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>
          <div>NAME: <span style={{ color: '#38bdf8' }}>fms-edge-ingress</span> | CLASS: <span style={{ color: '#f59e0b' }}>cloudflared-tunnel</span></div>
          <div>HOSTS: <span style={{ color: '#10b981' }}>dev.fires.systems, api.dev.fires.systems</span></div>
          <div>ADDRESS: <span style={{ color: '#94a3b8' }}>198.41.200.1 (Cloudflare Zero-Trust Edge)</span></div>
          <div>PORTS: <span style={{ color: '#10b981' }}>80, 443 [TLS Managed Cert]</span></div>
        </div>
      );
    } else if (lower.startsWith('terraform state') || lower === 'terraform show') {
      output = renderTerraformState();
    } else if (lower === 'terraform version') {
      output = <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#10b981' }}>Terraform v1.15.5 on linux_amd64</div>;
    } else if (lower === 'docker ps' || lower === 'podman ps') {
      output = renderDockerPs();
    } else if (lower.startsWith('argocd')) {
      output = renderArgoCD();
    } else if (lower.startsWith('gh run') || lower === 'gh runs') {
      output = renderGhRunList();
    } else if (lower.startsWith('gh repo list')) {
      output = renderProjects(handleRunCmd);
    } else if (lower === 'gh auth status') {
      output = (
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#10b981', lineHeight: 1.5 }}>
          <div>github.com</div>
          <div>✓ Logged in to github.com account <span style={{ color: '#38bdf8', fontWeight: 600 }}>Fauxx</span> (keyring)</div>
          <div>- Active account: true</div>
          <div>- Git operations protocol: ssh</div>
          <div>- Token scopes: &apos;admin:public_key&apos;, &apos;gist&apos;, &apos;read:org&apos;, &apos;read:packages&apos;, &apos;repo&apos;</div>
        </div>
      );
    } else if (lower.includes('telemetry') || lower.includes('curl') || lower === 'mqtt-sub') {
      output = renderTelemetryStream();
    } else if (lower === 'cat resume' || lower === 'resume') {
      output = renderResume();
    } else if (lower === 'whoami') {
      output = <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>zet (Zet Donaue Samson — Systems &amp; Cloud DevOps Engineer)</div>;
    } else if (lower === 'uname -a') {
      output = <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>Linux cloud-workstation 6.12.1-fms #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</div>;
    } else if (lower === 'date') {
      output = <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{new Date().toUTCString()}</div>;
    } else {
      output = (
        <div style={{ color: '#ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
          command not found: {trimmed}. Type <span style={{ color: '#38bdf8', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleRunCmd('help')}>help</span> for a list of verified commands.
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}-${Math.random()}`,
        command: trimmed,
        timestamp: new Date().toLocaleTimeString(),
        output
      }
    ]);

    setInput('');
  }, [onClose, handleRunCmd]);

  useEffect(() => {
    executeCommandRef.current = executeCommand;
  }, [executeCommand]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle initial command if passed
  useEffect(() => {
    if (isOpen && initialCommand) {
      const timer = setTimeout(() => {
        executeCommand(initialCommand);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialCommand, executeCommand]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (!current) return;
      const match = SUGGESTIONS.find((s) => s.startsWith(current));
      if (match) {
        setInput(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isFullscreen ? '0' : '1.5rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        ref={containerRef}
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
        style={{
          width: isFullscreen ? '100vw' : '960px',
          maxWidth: '100%',
          height: isFullscreen ? '100vh' : '82vh',
          backgroundColor: '#0a0f1d',
          border: isFullscreen ? 'none' : '1px solid #1e293b',
          borderRadius: isFullscreen ? '0' : '12px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.75), 0 0 30px 0 rgba(37, 99, 235, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Terminal Title Bar */}
        <div style={{
          backgroundColor: '#070b16',
          borderBottom: '1px solid #1e293b',
          padding: '0.65rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none'
        }}>
          {/* Mac/Linux Style Window Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={onClose}
              title="Close (Esc)"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            />
            <button
              onClick={() => {
                setHistory([]);
              }}
              title="Clear terminal buffer"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#f59e0b',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            />
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title="Toggle Fullscreen"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            />
          </div>

          {/* Title & Host Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#94a3b8',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)'
          }}>
            <TerminalIcon size={14} color="#38bdf8" />
            <span style={{ color: '#e2e8f0', fontWeight: 600 }}>fauxx@workstation</span>
            <span style={{ color: '#475569' }}>:</span>
            <span style={{ color: '#38bdf8' }}>~/projects</span>
            <span style={{ color: '#475569' }}>(zsh)</span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
                padding: '2px'
              }}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
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
                padding: '2px'
              }}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Terminal Scrollable Body */}
        <div style={{
          flex: 1,
          padding: '1.25rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem'
        }}>
          {history.map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {item.command !== 'sys-init' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>fauxx@workstation</span>
                  <span style={{ color: '#475569' }}>:</span>
                  <span style={{ color: '#38bdf8' }}>~/projects</span>
                  <span style={{ color: '#f59e0b' }}>$</span>
                  <span style={{ color: '#f8fafc', fontWeight: 600 }}>{item.command}</span>
                  <span style={{ fontSize: '0.65rem', marginLeft: 'auto', color: '#475569' }}>
                    {item.timestamp}
                  </span>
                </div>
              )}
              <div style={{ paddingLeft: item.command !== 'sys-init' ? '0.75rem' : '0' }}>
                {item.output}
              </div>
            </div>
          ))}

          {/* Prompt Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ color: '#10b981', fontWeight: 600 }}>fauxx@workstation</span>
            <span style={{ color: '#475569' }}>:</span>
            <span style={{ color: '#38bdf8' }}>~/projects</span>
            <span style={{ color: '#f59e0b' }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help' to see commands..."
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f8fafc',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.825rem',
                caretColor: '#38bdf8'
              }}
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer Bar */}
        <div style={{
          backgroundColor: '#070b16',
          borderTop: '1px solid #1e293b',
          padding: '0.45rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.675rem',
          color: '#64748b',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            Type <span style={{ color: '#38bdf8' }}>help</span> for commands • Press <span style={{ color: '#38bdf8' }}>~</span> or <span style={{ color: '#38bdf8' }}>Esc</span> to close
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>UTF-8</span>
            <span>GKE v1.36</span>
            <span style={{ color: '#10b981' }}>● fauxx-rig</span>
          </div>
        </div>
      </div>
    </div>
  );
};
