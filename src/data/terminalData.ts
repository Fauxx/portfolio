import type React from 'react';

export interface TerminalCommandOutput {
  command: string;
  timestamp: string;
  output: React.ReactNode;
}

export interface QuickChip {
  label: string;
  cmd: string;
  category: 'k8s' | 'iac' | 'docker' | 'github' | 'project' | 'sys';
}

export const QUICK_CHIPS: QuickChip[] = [
  { label: 'help', cmd: 'help', category: 'sys' },
  { label: 'projects', cmd: 'projects', category: 'project' },
  { label: 'kubectl get pods', cmd: 'kubectl get pods -n fire-monitoring-dev', category: 'k8s' },
  { label: 'terraform state', cmd: 'terraform state list', category: 'iac' },
  { label: 'argocd app list', cmd: 'argocd app list', category: 'k8s' },
  { label: 'docker ps', cmd: 'docker ps', category: 'docker' },
  { label: 'gh run list', cmd: 'gh run list --limit 5', category: 'github' },
  { label: 'inspect fire-monitoring', cmd: 'inspect fire-monitoring', category: 'project' },
  { label: 'inspect jobflow', cmd: 'inspect jobflow', category: 'project' },
  { label: 'inspect email-agent', cmd: 'inspect email-agent', category: 'project' },
  { label: 'curl telemetry', cmd: 'curl -s /telemetry/stream', category: 'k8s' },
  { label: 'cat resume', cmd: 'cat resume', category: 'sys' },
];

export const SUGGESTIONS = [
  'help',
  'projects',
  'ls',
  'clear',
  'exit',
  'whoami',
  'uname -a',
  'cat resume',
  'kubectl get pods',
  'kubectl get pods -n fire-monitoring-dev',
  'kubectl get svc',
  'kubectl get ingress',
  'kubectl get nodes',
  'argocd app list',
  'argocd app get fire-monitoring-dev',
  'terraform state list',
  'terraform version',
  'docker ps',
  'podman ps',
  'gh repo list',
  'gh run list',
  'gh auth status',
  'inspect fire-monitoring',
  'inspect jobflow',
  'inspect email-agent',
  'curl -s /telemetry/stream',
  'firectl status',
  'jobflow status',
];
