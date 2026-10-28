import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { Icons } from './BrandIcons';
import { portfolioConfig } from '../data/portfolioData';
import {
  VFS_ROOT,
  resolveVFSPath,
  formatVFSPath,
  generateTree,
  BASE_COMMANDS,
  type VNode,
  type TreeResult
} from '../data/terminalData';

export type ProjectKey = 'fire-monitoring' | 'jobflow' | 'email-agent' | 'station';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCommand?: string;
}

interface HistoryItem {
  id: string;
  command: string;
  cwdStr: string;
  timestamp: string;
  output: React.ReactNode;
}

interface ProjectGuideInfo {
  key: ProjectKey;
  icon: string;
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  instructions: string;
  suggestedPills: { cmd: string; label: string; desc: string }[];
}

const PROJECT_GUIDES: Record<ProjectKey, ProjectGuideInfo> = {
  'fire-monitoring': {
    key: 'fire-monitoring',
    icon: '🔥',
    name: 'FireMonitoringSystem',
    tagline: 'Private GKE Cluster • 4-Stage Modular Terraform • ArgoCD GitOps • Mosquitto & InfluxDB',
    badge: 'GITOPS & IOT TELEMETRY',
    badgeColor: '#51a2da',
    instructions: 'You are inspecting the FireMonitoringSystem monorepo. Explore Kubernetes manifests, 4-stage Terraform stages, live simulated telemetry, and ArgoCD synchronization.',
    suggestedPills: [
      { cmd: 'tree -d', label: 'tree -d', desc: 'Directory hierarchy' },
      { cmd: 'tree apps', label: 'tree apps', desc: 'Microservices tier' },
      { cmd: 'tree infrastructure/k8s', label: 'tree k8s', desc: 'K8s base & overlays' },
      { cmd: 'tree infrastructure/terraform', label: 'tree terraform', desc: '4-stage IaC & tfvars' },
      { cmd: 'kubectl get pods', label: 'kubectl get pods', desc: '15/15 running pods' },
      { cmd: 'kubectl get svc', label: 'kubectl get svc', desc: 'MQTT, API & Influx' },
      { cmd: 'kubectl get ingress', label: 'kubectl get ing', desc: 'Cloudflare zero-trust' },
      { cmd: 'argocd app list', label: 'argocd app list', desc: 'GitOps sync health' },
      { cmd: 'terraform state list', label: 'terraform state', desc: 'Managed GCP resources' },
      { cmd: 'curl -s /telemetry/stream', label: 'curl telemetry', desc: 'Live simulated MQTT stream' },
      { cmd: 'cat infrastructure/terraform/environments/gke-dev/00-bootstrap/terraform.tfvars', label: 'cat tfvars', desc: 'Bootstrap environment variables' },
      { cmd: 'status', label: 'status', desc: 'Stack telemetry' }
    ]
  },
  'jobflow': {
    key: 'jobflow',
    icon: '⚡',
    name: 'jobflow',
    tagline: 'FastAPI Async ASGI • Playwright Cookie Scraper • Gemini 2.0 Flash • ATS Studio',
    badge: 'AI APPLICATION & STUDIO',
    badgeColor: '#10b981',
    instructions: 'You are inspecting the jobflow repository. Explore the auth-wall bypass scraper, Gemini 2.0 Flash Pydantic structured tailoring engine, Docker Compose multi-container stack, and WeasyPrint A4 resume generator.',
    suggestedPills: [
      { cmd: 'tree -d', label: 'tree -d', desc: 'Directory hierarchy' },
      { cmd: 'tree src', label: 'tree src', desc: 'Backend & scraper code' },
      { cmd: 'cat docker-compose.yml', label: 'cat compose', desc: 'Container orchestration' },
      { cmd: 'cat src/services/gemini_llm.py', label: 'cat gemini_llm.py', desc: 'Pydantic LLM extractor' },
      { cmd: 'cat src/services/playwright_scraper.py', label: 'cat scraper.py', desc: 'Session cookie bypass' },
      { cmd: 'cat src/routers/resume.py', label: 'cat resume.py', desc: 'ATS resume API' },
      { cmd: 'docker ps', label: 'docker ps', desc: 'Active containers' },
      { cmd: 'cat requirements.txt', label: 'cat requirements', desc: 'Python dependencies' },
      { cmd: 'status', label: 'status', desc: 'Stack telemetry' }
    ]
  },
  'email-agent': {
    key: 'email-agent',
    icon: '🤖',
    name: 'ai-job-email-agent',
    tagline: 'Serverless GitHub Actions Cron ($0/mo) • IMAP4 TLS • Gemini Classifier • Telegram Bot',
    badge: 'SERVERLESS RECRUITER RADAR',
    badgeColor: '#a855f7',
    instructions: 'You are inspecting the ai-job-email-agent repository. Explore scheduled cloud runners, TLS email ingestion, Gemini batch intent categorization, Telegram push alerting, and idempotent UID caching.',
    suggestedPills: [
      { cmd: 'tree -d', label: 'tree -d', desc: 'Directory hierarchy' },
      { cmd: 'cat .github/workflows/agent.yml', label: 'cat agent.yml', desc: 'Cron runner workflow' },
      { cmd: 'cat src/classifier.py', label: 'cat classifier.py', desc: 'Gemini intent rules' },
      { cmd: 'cat src/notifier.py', label: 'cat notifier.py', desc: 'Telegram push bot' },
      { cmd: 'cat terraform/00-bootstrap/main.tf', label: 'cat main.tf', desc: 'Encrypted secrets IaC' },
      { cmd: 'gh run list', label: 'gh run list', desc: 'CI/CD execution logs' },
      { cmd: 'gh auth status', label: 'gh auth status', desc: 'GitHub CLI OAuth' },
      { cmd: 'cat main.py', label: 'cat main.py', desc: 'Dispatch entrypoint' },
      { cmd: 'status', label: 'status', desc: 'Stack telemetry' }
    ]
  },
  'station': {
    key: 'station',
    icon: '💻',
    name: 'fauxx@fedora',
    tagline: 'Systems & Cloud DevOps Engineering Workspace — Fedora Linux 41 (x86_64)',
    badge: 'MONOREPO WORKSPACE',
    badgeColor: '#51a2da',
    instructions: 'Welcome to the cloud engineering terminal. You can explore all 3 repositories on disk, run Kubernetes queries, inspect Terraform states, or switch into any project below.',
    suggestedPills: [
      { cmd: 'projects', label: 'projects', desc: 'List repositories' },
      { cmd: 'tree -d', label: 'tree -d', desc: 'All projects tree' },
      { cmd: 'inspect fire-monitoring', label: 'inspect fire-monitoring', desc: 'Switch to FMS' },
      { cmd: 'inspect jobflow', label: 'inspect jobflow', desc: 'Switch to jobflow' },
      { cmd: 'inspect email-agent', label: 'inspect email-agent', desc: 'Switch to Email Agent' },
      { cmd: 'status', label: 'status', desc: 'Station telemetry' },
      { cmd: 'help', label: 'help', desc: 'All shell commands' },
      { cmd: 'cat resume', label: 'cat resume', desc: 'View Resume & PDF' }
    ]
  }
};

function getProjectKeyFromCwd(cwdPath: string[]): ProjectKey {
  if (cwdPath.includes('FireMonitoringSystem')) return 'fire-monitoring';
  if (cwdPath.includes('jobflow')) return 'jobflow';
  if (cwdPath.includes('ai-job-email-agent')) return 'email-agent';
  return 'station';
}

function getInitialState(cmd?: string): { cwd: string[]; key: ProjectKey } {
  if (!cmd) return { cwd: ['home', 'fauxx', 'projects'], key: 'station' };
  const lower = cmd.toLowerCase();
  if (lower.includes('fire-monitoring') || lower.includes('firemonitoring') || lower.includes('fms')) {
    return { cwd: ['home', 'fauxx', 'projects', 'FireMonitoringSystem'], key: 'fire-monitoring' };
  }
  if (lower.includes('jobflow')) {
    return { cwd: ['home', 'fauxx', 'projects', 'jobflow'], key: 'jobflow' };
  }
  if (lower.includes('email-agent') || lower.includes('ai-job-email-agent')) {
    return { cwd: ['home', 'fauxx', 'projects', 'ai-job-email-agent'], key: 'email-agent' };
  }
  return { cwd: ['home', 'fauxx', 'projects'], key: 'station' };
}

const WelcomeView: React.FC<{ projectKey: ProjectKey; onRunCmd: (cmd: string) => void }> = ({
  projectKey,
  onRunCmd
}) => {
  const guide = PROJECT_GUIDES[projectKey];

  return (
    <div style={{
      color: '#cbd5e1',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem',
      lineHeight: 1.5,
      maxWidth: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.45rem'
    }}>
      {/* Session Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem', color: '#64748b', fontSize: '0.725rem' }}>
        <span>Fedora Linux 41 (Workstation Edition) • 6.12.1-200.fc41.x86_64</span>
        <span>tty1 • 127.0.0.1</span>
      </div>

      <div style={{ borderBottom: '1px solid #27272a', margin: '0.1rem 0' }} />

      {/* Project Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '1.05rem' }}>{guide.icon}</span>
        <span style={{ color: '#f4f4f5', fontWeight: 800, fontSize: '0.85rem' }}>{guide.name}</span>
        <span style={{
          backgroundColor: `${guide.badgeColor}22`,
          border: `1px solid ${guide.badgeColor}55`,
          color: guide.badgeColor,
          fontSize: '0.625rem',
          padding: '0.1rem 0.45rem',
          borderRadius: '4px',
          fontWeight: 700
        }}>
          {guide.badge}
        </span>
      </div>

      <div style={{ color: '#a1a1aa', fontSize: '0.75rem', lineHeight: 1.45 }}>
        {guide.instructions}
      </div>

      <div style={{ borderBottom: '1px solid #27272a', margin: '0.15rem 0' }} />

      {/* Clean Quick Start Guide */}
      <div style={{ color: '#51a2da', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.04em' }}>
        --- PROJECT GUIDE &amp; QUICK START ---
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '0.25rem' }}>
        {guide.suggestedPills.slice(0, 6).map((pill) => (
          <div key={pill.cmd} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onRunCmd(pill.cmd)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#4ade80',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
                textAlign: 'left'
              }}
              title={`Execute \`${pill.cmd}\``}
            >
              {pill.cmd}
            </button>
            <span style={{ color: '#71717a' }}>—</span>
            <span style={{ color: '#a1a1aa' }}>{pill.desc}</span>
          </div>
        ))}
      </div>

      <div style={{ borderBottom: '1px solid #27272a', margin: '0.2rem 0' }} />

      {/* Tip */}
      <div style={{ color: '#71717a', fontSize: '0.725rem' }}>
        💡 Click any command above or type <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onRunCmd('help')}>help</span> for the full command list.
      </div>
    </div>
  );
};

function renderTreeOutput(label: string, result: TreeResult) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 1.45, color: '#d4d4d8', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ color: '#51a2da', fontWeight: 600, marginBottom: '0.2rem', wordBreak: 'break-word' }}>
        {label}
      </div>
      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: '100%' }}>
        {result.items.map((item, idx) => {
          const isDir = item.type === 'dir';
          const isYaml = item.name.endsWith('.yaml') || item.name.endsWith('.yml') || item.name.endsWith('.env');
          const isTf = item.name.endsWith('.tf') || item.name.endsWith('.tfvars') || item.name.endsWith('.conf');
          const isDoc = item.name.endsWith('.md');
          const isScript = item.name.endsWith('.sh') || item.isExecutable;

          let color = '#f4f4f5';
          if (isDir) color = '#51a2da';
          else if (isYaml) color = '#f59e0b';
          else if (isTf) color = '#4ade80';
          else if (isScript) color = '#4ade80';
          else if (isDoc) color = '#c084fc';

          return (
            <div key={idx} style={{ lineHeight: 1.35, wordBreak: 'break-word' }}>
              <span style={{ color: '#71717a', userSelect: 'none' }}>{item.prefix}</span>
              <span style={{ color, fontWeight: isDir ? 600 : 400 }}>{item.name}</span>
            </div>
          );
        })}
      </div>
      <div style={{ color: '#71717a', marginTop: '0.4rem', fontSize: '0.75rem' }}>
        {result.dirCount} {result.dirCount === 1 ? 'directory' : 'directories'}
        {result.fileCount > 0 ? `, ${result.fileCount} files` : ''}
      </div>
    </div>
  );
}

function renderLsDir(node: VNode, isLong: boolean) {
  if (!node.children || Object.keys(node.children).length === 0) {
    return <div style={{ color: '#71717a', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>(empty directory)</div>;
  }

  const entries = Object.values(node.children);
  entries.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  if (isLong) {
    return (
      <div style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', overflowX: 'auto', maxWidth: '100%', lineHeight: 1.5 }}>
        <div style={{ color: '#71717a', marginBottom: '0.2rem' }}>total {entries.length * 4}</div>
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#d4d4d8' }}>
          {entries.map((entry) => {
            const isDir = entry.type === 'dir';
            const isExec = entry.permissions?.includes('x');
            const color = isDir ? '#51a2da' : isExec ? '#4ade80' : '#f4f4f5';
            const perms = entry.permissions || (isDir ? 'drwxr-xr-x' : '-rw-r--r--');
            const size = (entry.size || (isDir ? '4.0 KB' : '1.0 KB')).toString().padStart(8, ' ');
            const date = (entry.updated || 'Oct 24 18:00').padEnd(12, ' ');
            return (
              <div key={entry.name} style={{ lineHeight: 1.4 }}>
                <span style={{ color: '#71717a' }}>{perms}</span>{' '}
                <span style={{ color: '#52525b' }}>1 fauxx fauxx</span>{' '}
                <span style={{ color: '#a1a1aa' }}>{size}</span>{' '}
                <span style={{ color: '#71717a' }}>{date}</span>{' '}
                <span style={{ color, fontWeight: isDir ? 600 : 400 }}>{entry.name}{isDir ? '/' : ''}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem',
      lineHeight: 1.6,
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem 1.5rem',
      maxWidth: '100%'
    }}>
      {entries.map((entry) => {
        const isDir = entry.type === 'dir';
        const isExec = entry.permissions?.includes('x');
        const color = isDir ? '#51a2da' : isExec ? '#4ade80' : '#f4f4f5';
        return (
          <span key={entry.name} style={{ color, fontWeight: isDir ? 600 : 400 }}>
            {entry.name}{isDir ? '/' : ''}
          </span>
        );
      })}
    </div>
  );
}

function renderCatFile(node: VNode) {
  return (
    <pre style={{
      margin: 0,
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem',
      lineHeight: 1.5,
      color: '#cbd5e1',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      {node.content || ''}
    </pre>
  );
}

function renderHelp(onRunCmd: (cmd: string) => void) {
  const sections = [
    {
      title: '1. FILESYSTEM NAVIGATION & DIRECTORY TREE',
      cmds: [
        { cmd: 'tree', desc: 'Render ASCII directory hierarchy with totals' },
        { cmd: 'tree -d', desc: 'Directory structure only (omits individual files)' },
        { cmd: 'tree -L 2', desc: 'Limit display depth to 2 levels' },
        { cmd: 'tree apps', desc: 'Explore microservices tier (API, Dashboard, ETL, Simulators)' },
        { cmd: 'tree infrastructure/k8s', desc: 'Explore Kubernetes base manifests & environment overlays' },
        { cmd: 'tree infrastructure/terraform', desc: 'Explore 4-stage Terraform stages & tfvars' },
        { cmd: 'ls', desc: 'List directory entries in current path' },
        { cmd: 'ls -la', desc: 'List detailed permissions, owners, sizes, and timestamps' },
        { cmd: 'cd FireMonitoringSystem', desc: 'Change directory to FireMonitoringSystem' },
        { cmd: 'cd ~', desc: 'Change directory to home' },
        { cmd: 'pwd', desc: 'Print absolute path of current working directory' }
      ]
    },
    {
      title: '2. MONOREPO REPOSITORIES & STATUS',
      cmds: [
        { cmd: 'projects', desc: 'Display table of all 3 engineering repositories' },
        { cmd: 'status', desc: 'Display active stack telemetry for current directory context' },
        { cmd: 'inspect fire-monitoring', desc: 'Telemetry report for GKE, 4-stage Terraform, InfluxDB, ArgoCD' },
        { cmd: 'inspect jobflow', desc: 'Telemetry report for Next.js, FastAPI, Playwright, Gemini 2.0' },
        { cmd: 'inspect email-agent', desc: 'Telemetry report for GitHub Actions cron runner & Telegram bot' }
      ]
    },
    {
      title: '3. KUBERNETES & GITOPS (FireMonitoringSystem)',
      cmds: [
        { cmd: 'kubectl get pods', desc: 'List active pod workloads in fire-monitoring-dev' },
        { cmd: 'kubectl get svc', desc: 'List service endpoints (MQTT 1883/9001, API 8000, InfluxDB 8086)' },
        { cmd: 'kubectl get ingress', desc: 'Display Cloudflare Zero-Trust edge ingress mapping' },
        { cmd: 'argocd app list', desc: 'Display ArgoCD GitOps application health and sync status' },
        { cmd: 'terraform state list', desc: 'List 4-stage managed Terraform resources' },
        { cmd: 'curl -s /telemetry/stream', desc: 'Stream simulated MCU MQTT sensor payloads' }
      ]
    },
    {
      title: '4. CONTAINERS & LLM ENGINE (jobflow)',
      cmds: [
        { cmd: 'docker ps', desc: 'List active local containers (jobflow-app, jobflow-db)' },
        { cmd: 'cat docker-compose.yml', desc: 'Inspect multi-container runtime orchestration' },
        { cmd: 'cat src/services/gemini_llm.py', desc: 'Inspect Gemini structured JSON extraction service' },
        { cmd: 'cat src/services/playwright_scraper.py', desc: 'Inspect session cookie scraper implementation' },
        { cmd: 'cat requirements.txt', desc: 'Inspect Python dependencies' }
      ]
    },
    {
      title: '5. SERVERLESS & CI/CD (ai-job-email-agent)',
      cmds: [
        { cmd: 'gh run list', desc: 'List recent GitHub Actions CI/CD workflow executions' },
        { cmd: 'gh auth status', desc: 'Verify active GitHub CLI authentication & OAuth scopes' },
        { cmd: 'cat .github/workflows/agent.yml', desc: 'Inspect GitHub Actions cron runner workflow' },
        { cmd: 'cat terraform/00-bootstrap/main.tf', desc: 'Inspect Terraform encrypted secrets provisioning' },
        { cmd: 'cat main.py', desc: 'Inspect IMAP & Gemini dispatch entrypoint' }
      ]
    },
    {
      title: '6. SHELL & FEDORA SYSTEM UTILITIES',
      cmds: [
        { cmd: 'cat /etc/os-release', desc: 'Display Fedora Linux 41 OS release info' },
        { cmd: 'fastfetch', desc: 'Display system specs & Fedora ASCII banner' },
        { cmd: 'uname -a', desc: 'Print Linux kernel and platform architecture' },
        { cmd: 'whoami', desc: 'Print current engineer identity & specialization' },
        { cmd: 'cat resume', desc: 'Display engineer overview & PDF resume link' },
        { cmd: 'clear', desc: 'Clear terminal scrollback buffer' },
        { cmd: 'exit', desc: 'Close interactive terminal modal' }
      ]
    }
  ];

  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.76rem',
      lineHeight: 1.5,
      color: '#d4d4d8',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ color: '#51a2da', fontWeight: 700, fontSize: '0.85rem' }}>
        COMMAND REFERENCE &amp; SYSTEM MANUAL — FEDORA LINUX 41 (GNU BASH 5.2)
      </div>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.45rem 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {sections.map((section, idx) => (
          <div key={idx}>
            <div style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '0.35rem' }}>
              {section.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '0.5rem' }}>
              {section.cmds.map((item) => (
                <div key={item.cmd} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => onRunCmd(item.cmd)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#4ade80',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      textAlign: 'left'
                    }}
                    title={`Click to execute \`${item.cmd}\``}
                  >
                    {item.cmd}
                  </button>
                  <span style={{ color: '#71717a' }}>—</span>
                  <span style={{ color: '#a1a1aa' }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderBottom: '1px solid #27272a', margin: '0.65rem 0' }} />
      <div style={{ color: '#71717a', fontSize: '0.725rem' }}>
        Tip: Click any command above, or press <span style={{ color: '#51a2da' }}>Tab</span> for completion and <span style={{ color: '#51a2da' }}>↑ / ↓</span> for history recall.
      </div>
    </div>
  );
}

function renderProjects(onRunCmd: (cmd: string) => void) {
  const repos = [
    {
      name: 'FireMonitoringSystem',
      branch: 'main (8b8947c)',
      stack: 'GKE, Terraform, ArgoCD, Influx',
      highlight: '4-stage IaC, Zero-Trust CF, PSS',
      inspectCmd: 'inspect fire-monitoring'
    },
    {
      name: 'jobflow',
      branch: 'dev-zet (0f090a5)',
      stack: 'FastAPI, Next.js, Gemini Flash',
      highlight: 'Cookie auth-wall bypass, ATS Studio',
      inspectCmd: 'inspect jobflow'
    },
    {
      name: 'ai-job-email-agent',
      branch: 'master (71c19c2)',
      stack: 'Python 3.11, IMAP SSL, Telegram',
      highlight: '$0 Serverless GitHub Actions cron',
      inspectCmd: 'inspect email-agent'
    }
  ];

  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#d4d4d8', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ color: '#51a2da', fontWeight: 700, marginBottom: '0.3rem' }}>
        REPOSITORY INDEX — 3 PRODUCTION SYSTEMS ON DISK
      </div>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.45rem 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {repos.map((repo) => (
          <div
            key={repo.name}
            style={{
              backgroundColor: '#18191e',
              border: '1px solid #27272a',
              borderRadius: '6px',
              padding: '0.65rem 0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#51a2da', fontWeight: 700, fontSize: '0.825rem' }}>{repo.name}</span>
                <span style={{ color: '#4ade80', fontSize: '0.7rem' }}>[{repo.branch}]</span>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onRunCmd(`cd ${repo.name}`)}
                  style={{
                    backgroundColor: 'rgba(81, 162, 218, 0.12)',
                    border: '1px solid rgba(81, 162, 218, 0.28)',
                    borderRadius: '4px',
                    padding: '0.15rem 0.45rem',
                    color: '#51a2da',
                    fontSize: '0.675rem',
                    fontFamily: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  cd {repo.name}
                </button>
                <button
                  onClick={() => onRunCmd(repo.inspectCmd)}
                  style={{
                    backgroundColor: '#51a2da',
                    border: '1px solid #51a2da',
                    borderRadius: '4px',
                    padding: '0.15rem 0.45rem',
                    color: '#ffffff',
                    fontSize: '0.675rem',
                    fontFamily: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  {repo.inspectCmd}
                </button>
              </div>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.725rem' }}>
              <span style={{ color: '#64748b' }}>Tech Stack:</span> {repo.stack}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.725rem' }}>
              <span style={{ color: '#64748b' }}>Highlight:</span> {repo.highlight}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderBottom: '1px solid #334155', margin: '0.65rem 0' }} />
      <div style={{ color: '#64748b', fontSize: '0.725rem' }}>
        Tip: Click any button above or type `cd &lt;project&gt;` or `inspect &lt;project&gt;` to explore each repository.
      </div>
    </div>
  );
}

function renderInspectFireMonitoring(onRunCmd: (cmd: string) => void) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.76rem',
      lineHeight: 1.5,
      color: '#d4d4d8',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.45rem 0' }} />
      <div style={{ color: '#51a2da', fontWeight: 700, fontSize: '0.85rem' }}>
        PROJECT TELEMETRY: FireMonitoringSystem (Cloud IoT &amp; GitOps Infrastructure)
      </div>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.45rem 0' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.4rem', margin: '0.5rem 0' }}>
        <div>Cluster       : <span style={{ color: '#4ade80' }}>gke-fire-monitoring-cluster-dev</span></div>
        <div>Namespace     : <span style={{ color: '#a855f7' }}>fire-monitoring-dev</span></div>
        <div>VPC Network   : <span style={{ color: '#f59e0b' }}>fms-vpc-dev (10.10.0.0/16)</span></div>
        <div>State Backend : <span style={{ color: '#4ade80' }}>gs://fms-tfstate-gke-dev/terraform.tfstate</span></div>
        <div>GitOps Root   : <span style={{ color: '#4ade80' }}>Synced &amp; Healthy (ArgoCD main @ 8b8947c)</span></div>
        <div>Edge Security : <span style={{ color: '#f59e0b' }}>Cloudflare Zero-Trust Tunnels</span></div>
      </div>

      <div style={{ color: '#f4f4f5', fontWeight: 700, marginTop: '0.75rem', marginBottom: '0.35rem' }}>
        [MONOREPO ARCHITECTURE BREAKDOWN]
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingLeft: '0.5rem', color: '#a1a1aa' }}>
        <div><span style={{ color: '#51a2da', fontWeight: 600 }}>apps/</span> — Microservices tier: Express API (:8000), React 19 Dashboard (:80), Flyway SQL migrations, Pandas ETL processor, and MCU simulator fleet.</div>
        <div><span style={{ color: '#4ade80', fontWeight: 600 }}>infrastructure/k8s/</span> — Kustomize v5 manifests: base (apps, statefulsets, networking) and environment overlays (dev, prod).</div>
        <div><span style={{ color: '#f59e0b', fontWeight: 600 }}>infrastructure/terraform/</span> — 4-Stage modular IaC: 00-bootstrap, 01-infra (VPC, private GKE &amp; Cloud SQL), 02-platform (Cloudflare DNS, SSL, ingress-nginx), 03-argocd.</div>
        <div><span style={{ color: '#a855f7', fontWeight: 600 }}>build/local/</span> — Kind multi-node local cluster config &amp; docker-compose runtime.</div>
        <div><span style={{ color: '#c084fc', fontWeight: 600 }}>docs/ADR/</span> — Architectural Decision Records (0001-gitops, 0002-zero-trust).</div>
      </div>

      <div style={{ color: '#71717a', fontSize: '0.72rem', marginTop: '0.75rem' }}>
        Tip: Run <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onRunCmd('tree -d')}>tree -d</span> to view directory tree, or <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onRunCmd('guide')}>guide</span> / <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onRunCmd('help')}>help</span> for all commands.
      </div>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.65rem 0' }} />
    </div>
  );
}

function renderInspectJobflow(onRunCmd: (cmd: string) => void) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.76rem',
      lineHeight: 1.5,
      color: '#d4d4d8',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.45rem 0' }} />
      <div style={{ color: '#51a2da', fontWeight: 700, fontSize: '0.85rem' }}>
        PROJECT TELEMETRY: jobflow (AI Application Pipeline &amp; ATS Resume Studio)
      </div>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.45rem 0' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.4rem', margin: '0.5rem 0' }}>
        <div>Runtime Stack : <span style={{ color: '#4ade80' }}>FastAPI Async ASGI + PostgreSQL 16</span></div>
        <div>Local Endpoints: <span style={{ color: '#51a2da' }}>http://localhost:8000 (:3000 UI)</span></div>
        <div>Branch / Git  : <span style={{ color: '#4ade80' }}>dev-zet @ 0f090a5</span></div>
      </div>

      <div style={{ color: '#f4f4f5', fontWeight: 700, marginTop: '0.75rem', marginBottom: '0.35rem' }}>
        [CORE ENGINEERING CAPABILITIES]
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingLeft: '0.5rem', color: '#a1a1aa' }}>
        <div><span style={{ color: '#f59e0b', fontWeight: 600 }}>Session Cookie Bypassing:</span> Mounts native Chrome/Firefox profiles into Playwright headless contexts, inheriting auth sessions to scrape LinkedIn, Indeed &amp; Ashby.</div>
        <div><span style={{ color: '#f59e0b', fontWeight: 600 }}>Gemini 2.0 Flash Parser :</span> Ingests raw job descriptions, extracts salary, tech stack, and visa requirements with strict Pydantic JSON schema validation.</div>
        <div><span style={{ color: '#f59e0b', fontWeight: 600 }}>ATS Resume Studio       :</span> Live browser-based PDF preview with pixel-accurate layout tailoring bullets to targeted keywords without layout overflow.</div>
      </div>

      <div style={{ color: '#71717a', fontSize: '0.72rem', marginTop: '0.75rem' }}>
        Tip: Run <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onRunCmd('tree -d')}>tree -d</span> to view directory tree, or <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onRunCmd('guide')}>guide</span> / <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onRunCmd('help')}>help</span> for all commands.
      </div>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.65rem 0' }} />
    </div>
  );
}

function renderInspectEmailAgent(onRunCmd: (cmd: string) => void) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.76rem',
      lineHeight: 1.5,
      color: '#d4d4d8',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.45rem 0' }} />
      <div style={{ color: '#51a2da', fontWeight: 700, fontSize: '0.85rem' }}>
        PROJECT TELEMETRY: ai-job-email-agent (Serverless Recruiter Radar &amp; Alert Bot)
      </div>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.45rem 0' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.4rem', margin: '0.5rem 0' }}>
        <div>Runner Engine : <span style={{ color: '#4ade80' }}>GitHub Actions Scheduled Runner ($0/month persistent cost)</span></div>
        <div>Cron Interval : <span style={{ color: '#f59e0b' }}>0 */2 * * * (Every 2 hours via agent.yml)</span></div>
        <div>Branch / Git  : <span style={{ color: '#4ade80' }}>master @ 71c19c2</span></div>
      </div>

      <div style={{ color: '#f4f4f5', fontWeight: 700, marginTop: '0.75rem', marginBottom: '0.35rem' }}>
        [CORE ENGINEERING CAPABILITIES]
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingLeft: '0.5rem', color: '#a1a1aa' }}>
        <div><span style={{ color: '#f59e0b', fontWeight: 600 }}>IMAP4 SSL Listener      :</span> Connects directly to Gmail over TLS, queries unread inbox messages, and extracts recruiter communications with zero third-party SaaS fees.</div>
        <div><span style={{ color: '#f59e0b', fontWeight: 600 }}>Batch Gemini Intent     :</span> Bundles email payloads into a single Gemini Flash prompt, categorizing into Interview, Rejection, Recruiter Reachout, or Offer.</div>
        <div><span style={{ color: '#f59e0b', fontWeight: 600 }}>Telegram Alert Bot      :</span> Dispatches high-priority Markdown alerts to mobile via Telegram Bot API.</div>
        <div><span style={{ color: '#f59e0b', fontWeight: 600 }}>Terraform Secrets IaC   :</span> Declaratively manages encrypted GitHub Actions repository secrets.</div>
      </div>

      <div style={{ color: '#71717a', fontSize: '0.72rem', marginTop: '0.75rem' }}>
        Tip: Run <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onRunCmd('tree -d')}>tree -d</span> to view directory tree, or <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onRunCmd('guide')}>guide</span> / <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onRunCmd('help')}>help</span> for all commands.
      </div>
      <div style={{ borderBottom: '1px solid #27272a', margin: '0.65rem 0' }} />
    </div>
  );
}

function renderFmsStatus() {
  return (
    <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.76rem', lineHeight: 1.5, color: '#d4d4d8', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: '100%' }}>
<span style={{ color: '#51a2da', fontWeight: 700 }}>[SYSTEM TELEMETRY] FireMonitoringSystem — CLOUD IOT &amp; GITOPS PLATFORM</span>
Status        : <span style={{ color: '#4ade80' }}>OPERATIONAL</span> (All 15 workloads running)
Cluster       : <span style={{ color: '#4ade80' }}>gke-fire-monitoring-cluster-dev</span> (asia-southeast1-a, Container-Optimized OS)
ArgoCD Sync   : <span style={{ color: '#4ade80' }}>Synced &amp; Healthy</span> (Revision: main @ 8b8947c, Auto-Heal: Enabled)
MQTT Broker   : <span style={{ color: '#4ade80' }}>Mosquitto 2.0</span> (:1883 TCP, :9001 WS /mqtt) — 3 nodes connected
Time-Series   : <span style={{ color: '#4ade80' }}>InfluxDB 2.7</span> (Bucket: node_telemetry, 30-day retention)
Database      : <span style={{ color: '#4ade80' }}>PostgreSQL 15</span> (:5432 Cloud SQL Private IP)
Zero-Trust    : <span style={{ color: '#f59e0b' }}>Cloudflare Tunnel</span> (fms-edge-ingress -&gt; dev.fires.systems)
    </pre>
  );
}

function renderJobflowStatus() {
  return (
    <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.76rem', lineHeight: 1.5, color: '#d4d4d8', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: '100%' }}>
<span style={{ color: '#51a2da', fontWeight: 700 }}>[SYSTEM TELEMETRY] jobflow — AUTONOMOUS PIPELINE &amp; ATS RESUME STUDIO</span>
Status        : <span style={{ color: '#4ade80' }}>ONLINE</span> (FastAPI + PostgreSQL 16 Compose Stack)
API Endpoint  : <span style={{ color: '#4ade80' }}>http://localhost:8000</span> (FastAPI Async ASGI)
Database      : <span style={{ color: '#4ade80' }}>PostgreSQL 16</span> (:5432, 12 tables, Alembic head: 0f090a5)
GenAI Engine  : <span style={{ color: '#f59e0b' }}>Google Gemini 2.0 Flash</span> (Pydantic schema structured JSON output)
Scraper Subsys: <span style={{ color: '#51a2da' }}>Playwright Chromium Headless</span> (Local browser session cookie injection)
Print Engine  : <span style={{ color: '#4ade80' }}>WeasyPrint / CSS Paged Media</span> (Pixel-accurate ATS A4 template)
    </pre>
  );
}

function renderAgentStatus() {
  return (
    <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.76rem', lineHeight: 1.5, color: '#d4d4d8', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: '100%' }}>
<span style={{ color: '#51a2da', fontWeight: 700 }}>[SYSTEM TELEMETRY] ai-job-email-agent — SERVERLESS RADAR &amp; PUSH BOT</span>
Status        : <span style={{ color: '#4ade80' }}>SCHEDULED</span> (Automated cloud runner cycle)
Runner Engine : <span style={{ color: '#4ade80' }}>GitHub Actions Cron</span> (schedule: '0 */2 * * *', $0/month serverless)
Mail Protocol : <span style={{ color: '#4ade80' }}>IMAP4 SSL</span> (imap.gmail.com:993, unseen recruiter message filter)
Classification: <span style={{ color: '#f59e0b' }}>Gemini 2.0 Flash Batch JSON</span> (Interview, Rejection, Offer detection)
Alert Channel : <span style={{ color: '#51a2da' }}>Telegram Bot API</span> (Markdown push notifications with action deep-links)
Idempotency   : <span style={{ color: '#4ade80' }}>Cache Layer Active</span> (cache/notified_today.json deduplicating alerts)
    </pre>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ color: '#a1a1aa', fontSize: '0.7rem', marginBottom: '0.2rem' }}>
        CURRENT CONTEXT: <span style={{ color: '#51a2da' }}>gke_fire-monitoring-cluster-dev</span> | NAMESPACE: <span style={{ color: '#a855f7' }}>fire-monitoring-dev</span>
      </div>
      <div style={{ overflowX: 'auto', maxWidth: '100%', width: '100%', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #27272a' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
          <thead>
            <tr style={{ color: '#71717a', borderBottom: '1px solid #27272a', backgroundColor: '#18191e' }}>
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
              <tr key={idx} style={{ borderBottom: '1px solid #27272a' }}>
                <td style={{ padding: '0.35rem 0.5rem', color: '#f4f4f5' }}>{p.name}</td>
                <td style={{ padding: '0.35rem 0.5rem', color: '#a1a1aa' }}>{p.ready}</td>
                <td style={{ padding: '0.35rem 0.5rem', color: p.status === 'Running' ? '#4ade80' : '#51a2da' }}>
                  {p.status}
                </td>
                <td style={{ padding: '0.35rem 0.5rem', color: '#a1a1aa' }}>{p.restarts}</td>
                <td style={{ padding: '0.35rem 0.5rem', color: '#a1a1aa' }}>{p.age}</td>
                <td style={{ padding: '0.35rem 0.5rem', color: '#71717a' }}>{p.ip}</td>
                <td style={{ padding: '0.35rem 0.5rem', color: '#71717a' }}>{p.node}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ color: '#4ade80', fontSize: '0.7rem', marginTop: '0.3rem' }}>
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
    <div style={{ overflowX: 'auto', maxWidth: '100%', width: '100%', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #27272a', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
        <thead>
          <tr style={{ color: '#71717a', borderBottom: '1px solid #27272a', backgroundColor: '#18191e' }}>
            <th style={{ padding: '0.35rem 0.5rem' }}>NAME</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>TYPE</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>CLUSTER-IP</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>EXTERNAL-IP</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>PORT(S)</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #27272a' }}>
              <td style={{ padding: '0.35rem 0.5rem', color: '#f4f4f5' }}>{s.name}</td>
              <td style={{ padding: '0.35rem 0.5rem', color: s.type === 'LoadBalancer' ? '#f59e0b' : '#a1a1aa' }}>{s.type}</td>
              <td style={{ padding: '0.35rem 0.5rem', color: '#a1a1aa' }}>{s.clusterIp}</td>
              <td style={{ padding: '0.35rem 0.5rem', color: s.externalIp !== '<none>' ? '#51a2da' : '#71717a' }}>{s.externalIp}</td>
              <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>{s.ports}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderTerraformState() {
  return (
    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6, color: '#d4d4d8', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ color: '#51a2da', marginBottom: '0.3rem', fontWeight: 600 }}>
        TERRAFORM MANAGED STATE (Google Cloud Platform &amp; Kubernetes Provider)
      </div>
      <div style={{ color: '#a1a1aa', marginBottom: '0.5rem' }}>
        Backend: <span style={{ color: '#f59e0b' }}>gs://fms-tfstate-gke-dev/terraform.tfstate</span> (State Lock active)
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <div style={{ backgroundColor: '#18191e', border: '1px solid #27272a', borderRadius: '4px', padding: '0.5rem 0.75rem' }}>
          <span style={{ color: '#51a2da', fontWeight: 600 }}>[STAGE 00-BOOTSTRAP]</span>
          <div style={{ color: '#a855f7' }}>google_storage_bucket.terraform_state</div>
          <div style={{ color: '#a855f7' }}>google_iam_workload_identity_pool.github_pool</div>
          <div style={{ color: '#a855f7' }}>google_iam_workload_identity_pool_provider.github_provider</div>
          <div style={{ color: '#a855f7' }}>google_service_account.github_actions_sa</div>
        </div>

        <div style={{ backgroundColor: '#18191e', border: '1px solid #27272a', borderRadius: '4px', padding: '0.5rem 0.75rem' }}>
          <span style={{ color: '#51a2da', fontWeight: 600 }}>[STAGE 01-INFRA]</span>
          <div style={{ color: '#4ade80' }}>google_compute_network.fms_vpc</div>
          <div style={{ color: '#4ade80' }}>google_compute_subnetwork.fms_private_subnet</div>
          <div style={{ color: '#4ade80' }}>google_compute_router_nat.fms_cloud_nat</div>
          <div style={{ color: '#4ade80' }}>module.gke.google_container_cluster.primary (zone: asia-southeast1-a)</div>
          <div style={{ color: '#4ade80' }}>module.gke.google_container_node_pool.preemptible_nodes</div>
          <div style={{ color: '#4ade80' }}>module.cloudsql.google_sql_database_instance.postgres</div>
        </div>

        <div style={{ backgroundColor: '#18191e', border: '1px solid #27272a', borderRadius: '4px', padding: '0.5rem 0.75rem' }}>
          <span style={{ color: '#51a2da', fontWeight: 600 }}>[STAGE 02-PLATFORM &amp; 03-GITOPS]</span>
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
    <div style={{ overflowX: 'auto', maxWidth: '100%', width: '100%', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #27272a', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
        <thead>
          <tr style={{ color: '#71717a', borderBottom: '1px solid #27272a', backgroundColor: '#18191e' }}>
            <th style={{ padding: '0.35rem 0.5rem' }}>CONTAINER ID</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>IMAGE</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>COMMAND</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>STATUS</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>PORTS</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>NAMES</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f59e0b' }}>d4160443bbff</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#d4d4d8' }}>postgres:16</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a1a1aa' }}>postgres</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Up 2 days</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#51a2da' }}>0.0.0.0:5432-&gt;5432/tcp</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f4f4f5', fontWeight: 600 }}>jobflow-db</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f59e0b' }}>11a056a620a2</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#d4d4d8' }}>localhost/jobflow_app:latest</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a1a1aa' }}>alembic upgrade &amp;&amp; uvicorn...</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Up 2 days</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#51a2da' }}>0.0.0.0:8000-&gt;8000/tcp</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f4f4f5', fontWeight: 600 }}>jobflow-app</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function renderArgoCD() {
  return (
    <div style={{ overflowX: 'auto', maxWidth: '100%', width: '100%', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #27272a', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
      <div style={{ color: '#51a2da', padding: '0.4rem 0.5rem', fontWeight: 600, borderBottom: '1px solid #27272a' }}>
        ARGOCD GITOPS SYNCHRONIZATION STATUS
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
        <thead>
          <tr style={{ color: '#71717a', borderBottom: '1px solid #27272a', backgroundColor: '#18191e' }}>
            <th style={{ padding: '0.35rem 0.5rem' }}>NAME</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>NAMESPACE</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>REVISION</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>SYNC STATUS</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>HEALTH</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>AUTO-HEAL</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f4f4f5', fontWeight: 600 }}>fire-monitoring-dev</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>fire-monitoring-dev</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#51a2da' }}>main @ 8b8947c</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Synced</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Healthy</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Enabled</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f4f4f5', fontWeight: 600 }}>fire-monitoring-prod</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>fire-monitoring-prod</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#51a2da' }}>main @ 8b8947c</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Synced</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Healthy</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Enabled</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f4f4f5', fontWeight: 600 }}>argocd-bootstrap</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>argocd</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#51a2da' }}>main @ 8b8947c</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Synced</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Healthy</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>Enabled</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function renderGhRunList() {
  return (
    <div style={{ overflowX: 'auto', maxWidth: '100%', width: '100%', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #27272a', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
      <div style={{ color: '#51a2da', padding: '0.4rem 0.5rem', fontWeight: 600, borderBottom: '1px solid #27272a' }}>
        GITHUB ACTIONS RECENT WORKFLOW RUNS (Logged in as @Fauxx)
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
        <thead>
          <tr style={{ color: '#71717a', borderBottom: '1px solid #27272a', backgroundColor: '#18191e' }}>
            <th style={{ padding: '0.35rem 0.5rem' }}>STATUS</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>REPOSITORY</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>WORKFLOW</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>EVENT</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>BRANCH</th>
            <th style={{ padding: '0.35rem 0.5rem' }}>ELAPSED</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>✓ Success</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#51a2da' }}>ai-job-email-agent</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#d4d4d8' }}>AI Email Agent (Cron)</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#f59e0b' }}>schedule</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a1a1aa' }}>master</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#71717a' }}>41s</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>✓ Success</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#51a2da' }}>FireMonitoringSystem</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#d4d4d8' }}>Application CI/CD — Build &amp; Secure</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>push</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a1a1aa' }}>main</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#71717a' }}>5m 12s</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>✓ Success</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#51a2da' }}>FireMonitoringSystem</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#d4d4d8' }}>Kubernetes Manifest Validation</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>push</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a1a1aa' }}>main</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#71717a' }}>8s</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.5rem', color: '#4ade80' }}>✓ Success</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#51a2da' }}>portfolio</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#d4d4d8' }}>pages-build-deployment</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a855f7' }}>push</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#a1a1aa' }}>master</td>
            <td style={{ padding: '0.35rem 0.5rem', color: '#71717a' }}>26s</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function renderTelemetryStream() {
  return (
    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6, color: '#d4d4d8', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ color: '#4ade80', fontWeight: 600, marginBottom: '0.3rem' }}>
        [CONNECTED] Mosquitto MQTT Broker @ 34.143.190.12:1883 [QoS 1]
      </div>
      <div style={{ color: '#a1a1aa', marginBottom: '0.4rem' }}>
        SUBSCRIBED TOPIC: <span style={{ color: '#51a2da' }}>fms/telemetry/nodes/#</span>
      </div>

      <div style={{ backgroundColor: '#18191e', border: '1px solid #27272a', borderRadius: '4px', padding: '0.6rem 0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowX: 'hidden' }}>
        <div style={{ wordBreak: 'break-word' }}>
          <span style={{ color: '#64748b' }}>[17:28:10.42]</span>{' '}
          <span style={{ color: '#f59e0b' }}>&lt;-- RECV</span>:{' '}
          <span style={{ color: '#a855f7' }}>{`{"device_id": "FMS-V1-0001", "temp": 29.41, "smoke": 18.2, "flame": 0.0, "status": 0}`}</span>{' '}
          <span style={{ color: '#10b981' }}>[OK]</span>
        </div>
        <div style={{ wordBreak: 'break-word' }}>
          <span style={{ color: '#64748b' }}>[17:28:15.89]</span>{' '}
          <span style={{ color: '#f59e0b' }}>&lt;-- RECV</span>:{' '}
          <span style={{ color: '#a855f7' }}>{`{"device_id": "FMS-V1-0002", "temp": 30.15, "smoke": 22.8, "flame": 0.0, "status": 0}`}</span>{' '}
          <span style={{ color: '#10b981' }}>[OK]</span>
        </div>
        <div style={{ wordBreak: 'break-word' }}>
          <span style={{ color: '#64748b' }}>[17:28:20.14]</span>{' '}
          <span style={{ color: '#f59e0b' }}>&lt;-- RECV</span>:{' '}
          <span style={{ color: '#a855f7' }}>{`{"device_id": "FMS-V1-0003", "temp": 32.88, "smoke": 44.5, "flame": 0.0, "status": 1}`}</span>{' '}
          <span style={{ color: '#f59e0b', fontWeight: 600 }}>[ALERT: STATUS_WARNING]</span>
        </div>
      </div>

      <div style={{ marginTop: '0.4rem', color: '#51a2da', fontSize: '0.7rem' }}>
        ✓ InfluxDB measurement: <code>node_telemetry</code> buffer active | Python ETL aggregator window: 5 min
      </div>
    </div>
  );
}

function renderResume() {
  return (
    <div style={{ fontSize: '0.8rem', lineHeight: 1.6, color: '#f4f4f5', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ color: '#51a2da', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
        ZET DONAUE SAMSON — SYSTEMS &amp; CLOUD DEVOPS ENGINEER
      </div>
      <div style={{ color: '#a1a1aa', fontSize: '0.75rem', marginBottom: '0.6rem' }}>
        Pasig City, Metro Manila • zetsamson@gmail.com • <a href="https://fauxx.is-a.dev" target="_blank" rel="noreferrer" style={{ color: '#51a2da' }}>fauxx.is-a.dev</a>
      </div>
      <p style={{ margin: '0 0 0.6rem 0', color: '#d4d4d8', fontSize: '0.775rem' }}>
        Full-Lifecycle Engineer bridging modern containerized microservices and automated cloud infrastructure.
        Proven expertise deploying Kubernetes clusters, 4-layer Terraform IaC, ArgoCD GitOps, and reactive AI systems.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
        <a
          href={portfolioConfig.contact.resumeUrl}
          download="Resume_Zet_Samson.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          Download PDF Resume <ArrowRight size={13} />
        </a>
        <a
          href="mailto:zetsamson@gmail.com"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', border: '1px solid #27272a', borderRadius: '6px', color: '#f4f4f5', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
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
  const initialState = useMemo(() => getInitialState(initialCommand), [initialCommand]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState<string[]>(initialState.cwd);
  const cwdRef = useRef(cwd);
  useEffect(() => {
    cwdRef.current = cwd;
  }, [cwd]);

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'welcome-0',
      command: 'sys-init',
      cwdStr: formatVFSPath(initialState.cwd),
      timestamp: 'system-boot',
      output: null
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [prevOpen, setPrevOpen] = useState(isOpen);
  const [prevCommand, setPrevCommand] = useState(initialCommand);

  // Synchronize state when opening or when initialCommand changes
  if (isOpen !== prevOpen || initialCommand !== prevCommand) {
    setPrevOpen(isOpen);
    setPrevCommand(initialCommand);
    if (isOpen) {
      const init = getInitialState(initialCommand);
      setCwd(init.cwd);
      setHistory([
        {
          id: 'welcome-init',
          command: 'sys-init',
          cwdStr: formatVFSPath(init.cwd),
          timestamp: 'system-boot',
          output: null
        }
      ]);
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProjectKey = useMemo(() => getProjectKeyFromCwd(cwd), [cwd]);

  const executeCommand = useCallback(function run(rawCmd: string) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Support compound command chains (e.g. `cd FireMonitoringSystem && tree`)
    if (trimmed.includes(' && ')) {
      const parts = trimmed.split(' && ');
      for (const part of parts) {
        run(part);
      }
      return;
    }

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

    if (lower === 'pwd') {
      output = (
        <div style={{ color: '#cbd5e1', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
          /{cwdRef.current.join('/')}
        </div>
      );
    } else if (lower === 'cd' || lower.startsWith('cd ') || lower.startsWith('cd/')) {
      const target = trimmed.slice(2).trim();
      const resolved = resolveVFSPath(cwdRef.current, target || '~', VFS_ROOT);
      if (!resolved.node) {
        output = (
          <div style={{ color: '#ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            bash: cd: {target}: No such file or directory
          </div>
        );
      } else if (resolved.node.type !== 'dir') {
        output = (
          <div style={{ color: '#ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            bash: cd: {target}: Not a directory
          </div>
        );
      } else {
        cwdRef.current = resolved.path;
        setCwd(resolved.path);
      }
    } else if (lower.startsWith('tree')) {
      let maxDepth = 12;
      let dirOnly = false;
      let targetDir = '';
      const tokens = trimmed.split(/\s+/).slice(1);
      for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        if (tok === '-d') {
          dirOnly = true;
        } else if (tok === '-L' && tokens[i + 1]) {
          maxDepth = parseInt(tokens[i + 1], 10) || 12;
          i++;
        } else if (tok.startsWith('-L') && tok.length > 2) {
          maxDepth = parseInt(tok.slice(2), 10) || 12;
        } else if (!tok.startsWith('-')) {
          targetDir = tok;
        }
      }
      const resolved = resolveVFSPath(cwdRef.current, targetDir, VFS_ROOT);
      if (!resolved.node || resolved.node.type !== 'dir') {
        output = (
          <div style={{ color: '#ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            tree: {targetDir || '.'}: No such directory
          </div>
        );
      } else {
        const cleanTargetDir = targetDir.replace(/^\.\/?/, '').replace(/\/$/, '');
        const result = generateTree(resolved.node, '', maxDepth, 0, cleanTargetDir, dirOnly);
        output = renderTreeOutput(resolved.node.name || formatVFSPath(resolved.path), result);
      }
    } else if (lower === 'ls' || lower.startsWith('ls ') || lower === 'll') {
      const isLong = lower.includes('-l') || lower.includes('-la') || lower.includes('-al') || lower === 'll';
      const targetArg = trimmed.split(/\s+/).slice(1).find((arg) => !arg.startsWith('-')) || '';
      const resolved = resolveVFSPath(cwdRef.current, targetArg, VFS_ROOT);
      if (!resolved.node) {
        output = (
          <div style={{ color: '#ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            ls: cannot access '{targetArg}': No such file or directory
          </div>
        );
      } else if (resolved.node.type === 'file') {
        output = (
          <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#f8fafc' }}>
            {resolved.node.name} ({resolved.node.size || '1.0 KB'})
          </div>
        );
      } else {
        output = renderLsDir(resolved.node, isLong);
      }
    } else if (lower.startsWith('cat ')) {
      const targetFile = trimmed.slice(4).trim();
      if (!targetFile) {
        output = <div style={{ color: '#ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>cat: missing file operand</div>;
      } else if (targetFile === 'resume' || targetFile === 'resume.pdf' || targetFile === 'resume.txt') {
        output = renderResume();
      } else if (targetFile.includes('os-release') || targetFile.includes('fedora-release')) {
        output = (
          <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.74rem', lineHeight: 1.45, color: '#94a3b8' }}>
{`NAME="Fedora Linux"
VERSION="41 (Workstation Edition)"
ID=fedora
VERSION_ID=41
PLATFORM_ID="platform:f41"
PRETTY_NAME="Fedora Linux 41 (Workstation Edition)"
ANSI_COLOR="0;38;2;60;110;180"
LOGO=fedora-logo-icon
CPE_NAME="cpe:/o:fedoraproject:fedora:41"
HOME_URL="https://fedoraproject.org/"`}
          </pre>
        );
      } else {
        const resolved = resolveVFSPath(cwdRef.current, targetFile, VFS_ROOT);
        if (!resolved.node) {
          output = (
            <div style={{ color: '#ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              cat: {targetFile}: No such file or directory
            </div>
          );
        } else if (resolved.node.type === 'dir') {
          output = (
            <div style={{ color: '#ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              cat: {targetFile}: Is a directory
            </div>
          );
        } else {
          output = renderCatFile(resolved.node);
        }
      }
    } else if (lower === 'help' || lower === '?') {
      output = renderHelp(run);
    } else if (lower === 'projects' || lower === 'repos') {
      output = renderProjects(run);
    } else if (lower === 'status' || lower === 'systemctl status') {
      const currentDir = cwdRef.current[cwdRef.current.length - 1];
      if (currentDir === 'FireMonitoringSystem' || cwdRef.current.includes('FireMonitoringSystem')) {
        output = renderFmsStatus();
      } else if (currentDir === 'jobflow' || cwdRef.current.includes('jobflow')) {
        output = renderJobflowStatus();
      } else if (currentDir === 'ai-job-email-agent' || cwdRef.current.includes('ai-job-email-agent')) {
        output = renderAgentStatus();
      } else {
        output = (
          <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.76rem', lineHeight: 1.5, color: '#d4d4d8', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: '100%' }}>
<span style={{ color: '#51a2da', fontWeight: 700 }}>[STATION TELEMETRY] workstation: fauxx@fedora</span>
OS               : <span style={{ color: '#4ade80' }}>Fedora Linux 41 (Workstation Edition)</span>
Kernel           : <span style={{ color: '#4ade80' }}>Linux 6.12.1-200.fc41.x86_64</span>
Shell            : <span style={{ color: '#f59e0b' }}>GNU bash, version 5.2.32(1)-release (x86_64-redhat-linux-gnu)</span>
Working Directory: <span style={{ color: '#4ade80' }}>{formatVFSPath(cwdRef.current)}</span>
Repositories     : <span style={{ color: '#51a2da' }}>3 online</span> (FireMonitoringSystem, jobflow, ai-job-email-agent)
GKE Workloads    : <span style={{ color: '#4ade80' }}>15/15 Running</span> (ArgoCD Synced)
Jobflow Runtime  : <span style={{ color: '#4ade80' }}>FastAPI + Postgres 16 Active</span>
AI Email Agent   : <span style={{ color: '#4ade80' }}>Cron Scheduled (0 */2 * * *)</span>
          </pre>
        );
      }
    } else if (lower.startsWith('guide')) {
      const target = lower.replace('guide', '').trim();
      let pKey: ProjectKey = getProjectKeyFromCwd(cwdRef.current);
      if (target.includes('fire') || target.includes('fms')) pKey = 'fire-monitoring';
      else if (target.includes('jobflow')) pKey = 'jobflow';
      else if (target.includes('email') || target.includes('agent')) pKey = 'email-agent';
      else if (target.includes('station') || target.includes('all')) pKey = 'station';
      output = <WelcomeView projectKey={pKey} onRunCmd={run} />;
    } else if (lower.includes('fire-monitoring') || lower === 'fms' || lower === 'fms status' || lower === 'firectl' || lower === 'firectl status') {
      const p = ['home', 'fauxx', 'projects', 'FireMonitoringSystem'];
      cwdRef.current = p;
      setCwd(p);
      output = renderInspectFireMonitoring(run);
    } else if (lower.includes('jobflow') || lower === 'inspect jobflow' || lower === 'jobflow status') {
      const p = ['home', 'fauxx', 'projects', 'jobflow'];
      cwdRef.current = p;
      setCwd(p);
      output = renderInspectJobflow(run);
    } else if (lower.includes('email-agent') || lower === 'inspect email-agent' || lower === 'agent status') {
      const p = ['home', 'fauxx', 'projects', 'ai-job-email-agent'];
      cwdRef.current = p;
      setCwd(p);
      output = renderInspectEmailAgent(run);
    } else if (lower.startsWith('kubectl get pod') || lower === 'k get pods') {
      output = renderKubectlPods();
    } else if (lower.startsWith('kubectl get svc') || lower === 'k get svc') {
      output = renderKubectlSvc();
    } else if (lower.startsWith('kubectl get ingress') || lower === 'kubectl get ing') {
      output = (
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#d4d4d8', maxWidth: '100%', wordBreak: 'break-word' }}>
          <div>NAME: <span style={{ color: '#51a2da' }}>fms-edge-ingress</span> | CLASS: <span style={{ color: '#f59e0b' }}>cloudflared-tunnel</span></div>
          <div>HOSTS: <span style={{ color: '#4ade80' }}>dev.fires.systems, api.dev.fires.systems</span></div>
          <div>ADDRESS: <span style={{ color: '#a1a1aa' }}>198.41.200.1 (Cloudflare Zero-Trust Edge)</span></div>
          <div>PORTS: <span style={{ color: '#4ade80' }}>80, 443 [TLS Managed Cert]</span></div>
        </div>
      );
    } else if (lower.startsWith('terraform state') || lower === 'terraform show') {
      output = renderTerraformState();
    } else if (lower === 'terraform version') {
      output = <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#4ade80' }}>Terraform v1.15.5 on linux_amd64</div>;
    } else if (lower === 'docker ps' || lower === 'podman ps') {
      output = renderDockerPs();
    } else if (lower.startsWith('argocd')) {
      output = renderArgoCD();
    } else if (lower.startsWith('gh run') || lower === 'gh runs') {
      output = renderGhRunList();
    } else if (lower.startsWith('gh repo list')) {
      output = renderProjects(run);
    } else if (lower === 'gh auth status') {
      output = (
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#4ade80', lineHeight: 1.5, maxWidth: '100%', wordBreak: 'break-word' }}>
          <div>github.com</div>
          <div>✓ Logged in to github.com account <span style={{ color: '#51a2da', fontWeight: 600 }}>Fauxx</span> (keyring)</div>
          <div>- Active account: true</div>
          <div>- Git operations protocol: ssh</div>
          <div>- Token scopes: 'admin:public_key', 'gist', 'read:org', 'read:packages', 'repo'</div>
        </div>
      );
    } else if (lower.includes('telemetry') || lower.includes('curl') || lower === 'mqtt-sub') {
      output = renderTelemetryStream();
    } else if (lower === 'cat resume' || lower === 'resume') {
      output = renderResume();
    } else if (lower === 'whoami') {
      output = <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#51a2da' }}>zet (Zet Donaue Samson — Systems &amp; Cloud DevOps Engineer)</div>;
    } else if (lower === 'uname -a') {
      output = <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#a1a1aa' }}>Linux fauxx-station 6.12.1-200.fc41.x86_64 #1 SMP PREEMPT_DYNAMIC Wed Oct 21 00:00:00 UTC 2026 x86_64 GNU/Linux</div>;
    } else if (lower.includes('os-release') || lower.includes('fedora-release')) {
      output = (
        <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.74rem', lineHeight: 1.45, color: '#a1a1aa' }}>
{`NAME="Fedora Linux"
VERSION="41 (Workstation Edition)"
ID=fedora
VERSION_ID=41
PLATFORM_ID="platform:f41"
PRETTY_NAME="Fedora Linux 41 (Workstation Edition)"
ANSI_COLOR="0;38;2;60;110;180"
LOGO=fedora-logo-icon
CPE_NAME="cpe:/o:fedoraproject:fedora:41"
HOME_URL="https://fedoraproject.org/"`}
        </pre>
      );
    } else if (lower === 'hostnamectl') {
      output = (
        <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.74rem', lineHeight: 1.45, color: '#d4d4d8' }}>
{` Static hostname: fauxx-station
       Icon name: computer-desktop
         Chassis: desktop
Operating System: Fedora Linux 41 (Workstation Edition)
     CPE OS Name: cpe:/o:fedoraproject:fedora:41
          Kernel: Linux 6.12.1-200.fc41.x86_64
    Architecture: x86-64`}
        </pre>
      );
    } else if (lower === 'fastfetch' || lower === 'neofetch') {
      output = (
        <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.74rem', lineHeight: 1.4, color: '#51a2da' }}>
{`             /,/      OS: Fedora Linux 41 (Workstation Edition) x86_64
            /  /      Host: fauxx-station
           /  /       Kernel: 6.12.1-200.fc41.x86_64
     /----/  /----/   Uptime: 14 days, 3 hours, 21 mins
    /            /    Packages: 1984 (rpm), 12 (flatpak)
   /            /     Shell: bash 5.2.32
  /----/    /--/      DE: GNOME 47.0 (Wayland)
      /    /          Terminal: Fedora Console / Ptyxis
     /____/           CPU: AMD Ryzen 9 7950X (32) @ 5.700GHz
                      Memory: 16.42GiB / 64.00GiB`}
        </pre>
      );
    } else if (lower.startsWith('dnf')) {
      output = (
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#a1a1aa' }}>
          dnf (DNF5) 5.2.6.2 • Fedora Project RPM Package Manager
        </div>
      );
    } else if (lower === 'date') {
      output = <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#d4d4d8' }}>{new Date().toUTCString()}</div>;
    } else {
      output = (
        <div style={{ color: '#ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', wordBreak: 'break-word' }}>
          command not found: {trimmed}. Type <span style={{ color: '#51a2da', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => run('help')}>help</span> or click any pill above to explore.
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}-${Math.random()}`,
        command: trimmed,
        cwdStr: formatVFSPath(cwdRef.current),
        timestamp: new Date().toLocaleTimeString(),
        output
      }
    ]);

    setInput('');
  }, [onClose]);

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

  // Execute initial command on open if provided (skip auto-inspect dump to keep initial welcome clean)
  useEffect(() => {
    if (isOpen && initialCommand && !initialCommand.startsWith('inspect')) {
      const timer = setTimeout(() => {
        executeCommand(initialCommand);
      }, 50);
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
      const current = input.trim();
      if (!current) return;
      const lower = current.toLowerCase();

      // Collect base commands
      const candidateList = [...BASE_COMMANDS];

      // Add files & directories from current cwd
      const currentDirNode = resolveVFSPath(cwdRef.current, '.', VFS_ROOT).node;
      if (currentDirNode?.children) {
        for (const child of Object.values(currentDirNode.children)) {
          if (child.type === 'dir') {
            candidateList.push(`cd ${child.name}`);
            candidateList.push(`ls ${child.name}`);
            candidateList.push(`tree ${child.name}`);
          } else {
            candidateList.push(`cat ${child.name}`);
          }
          candidateList.push(child.name);
        }
      }

      const match = candidateList.find((s) => s.toLowerCase().startsWith(lower));
      if (match) {
        setInput(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="terminal-modal-backdrop"
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
        className="terminal-modal-window"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
        style={{
          width: isFullscreen ? '100vw' : '960px',
          maxWidth: '100%',
          height: isFullscreen ? '100vh' : '82vh',
          backgroundColor: '#121316',
          border: isFullscreen ? 'none' : '1px solid #27272a',
          borderRadius: isFullscreen ? '0' : '12px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Fedora / GNOME Terminal Title Bar */}
        <div style={{
          backgroundColor: '#18191e',
          borderBottom: '1px solid #27272a',
          padding: '0.55rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
          gap: '0.5rem'
        }}>
          {/* Left: Fedora Terminal App Icon + Host / Path Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#a1a1aa',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            <Icons.Fedora width={14} height={14} fill="#51a2da" />
            <span style={{ color: '#f4f4f5', fontWeight: 600 }}>fauxx@fedora</span>
            <span style={{ color: '#52525b' }}>:</span>
            <span style={{ color: '#51a2da' }}>{formatVFSPath(cwd)}</span>
            <span style={{
              color: '#51a2da',
              fontSize: '0.625rem',
              backgroundColor: 'rgba(81, 162, 218, 0.12)',
              border: '1px solid rgba(81, 162, 218, 0.28)',
              borderRadius: '4px',
              padding: '0.05rem 0.35rem',
              fontWeight: 600
            }}>
              fedora
            </span>
            <span style={{ color: '#71717a' }}>(bash)</span>
          </div>

          {/* Right: Fedora / GNOME Window Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button
              onClick={() => setHistory([])}
              title="Clear terminal buffer"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#71717a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#27272a';
                e.currentTarget.style.color = '#f4f4f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#71717a';
              }}
            >
              <RotateCcw size={12} />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Restore Window' : 'Maximize Window'}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#71717a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#27272a';
                e.currentTarget.style.color = '#f4f4f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#71717a';
              }}
            >
              {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
            <button
              onClick={onClose}
              title="Close terminal (Esc)"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#71717a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#71717a';
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Terminal Scrollable Body (NO horizontal drag: overflowX hidden + word-wrap) */}
        <div style={{
          flex: 1,
          padding: '1.25rem',
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem'
        }}>
          {history.map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: '100%', boxSizing: 'border-box' }}>
              {item.command !== 'sys-init' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#71717a', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                  <span style={{ color: '#4ade80', fontWeight: 600 }}>fauxx@fedora</span>
                  <span style={{ color: '#52525b' }}>:</span>
                  <span style={{ color: '#51a2da' }}>{item.cwdStr || '~/projects'}</span>
                  <span style={{ color: '#a1a1aa' }}>$</span>
                  <span style={{ color: '#f4f4f5', fontWeight: 600 }}>{item.command}</span>
                  <span style={{ fontSize: '0.65rem', marginLeft: 'auto', color: '#52525b' }}>
                    {item.timestamp}
                  </span>
                </div>
              )}
              {item.command === 'sys-init' ? (
                <WelcomeView projectKey={activeProjectKey} onRunCmd={executeCommand} />
              ) : (
                item.output && (
                  <div style={{ paddingLeft: '0.75rem', maxWidth: '100%', boxSizing: 'border-box' }}>
                    {item.output}
                  </div>
                )
              )}
            </div>
          ))}

          {/* Prompt Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
            <span style={{ color: '#4ade80', fontWeight: 600, flexShrink: 0 }}>fauxx@fedora</span>
            <span style={{ color: '#52525b', flexShrink: 0 }}>:</span>
            <span style={{ color: '#51a2da', flexShrink: 0 }}>{formatVFSPath(cwd)}</span>
            <span style={{ color: '#a1a1aa', flexShrink: 0 }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help' or click any pill to explore..."
              style={{
                flex: 1,
                minWidth: 0,
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f4f4f5',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.825rem',
                caretColor: '#51a2da'
              }}
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer Bar */}
        <div style={{
          backgroundColor: '#18191e',
          borderTop: '1px solid #27272a',
          padding: '0.45rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.675rem',
          color: '#71717a',
          fontFamily: 'var(--font-mono)',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div>
            Type <span style={{ color: '#51a2da' }}>help</span> for commands • Press <span style={{ color: '#51a2da' }}>~</span> or <span style={{ color: '#51a2da' }}>Esc</span> to close
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>UTF-8</span>
            <span>GKE v1.36</span>
            <span style={{ color: '#51a2da' }}>● fedora-41</span>
          </div>
        </div>
      </div>
    </div>
  );
};
