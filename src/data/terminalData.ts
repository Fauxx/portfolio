import type React from 'react';

export interface TerminalCommandOutput {
  command: string;
  timestamp: string;
  output: React.ReactNode;
}

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
