import type React from 'react';

export interface TerminalCommandOutput {
  command: string;
  timestamp: string;
  output: React.ReactNode;
}

export type VNodeType = 'file' | 'dir';

export interface VNode {
  name: string;
  type: VNodeType;
  size?: number | string;
  permissions?: string;
  updated?: string;
  content?: string;
  children?: { [name: string]: VNode };
}

export const VFS_ROOT: VNode = {
  name: '',
  type: 'dir',
  permissions: 'drwxr-xr-x',
  updated: 'Oct 24 18:30',
  children: {
    home: {
      name: 'home',
      type: 'dir',
      permissions: 'drwxr-xr-x',
      updated: 'Oct 24 18:30',
      children: {
        fauxx: {
          name: 'fauxx',
          type: 'dir',
          permissions: 'drwx------',
          updated: 'Oct 24 18:30',
          children: {
            projects: {
              name: 'projects',
              type: 'dir',
              permissions: 'drwxr-xr-x',
              updated: 'Oct 24 18:25',
              children: {
                FireMonitoringSystem: {
                  name: 'FireMonitoringSystem',
                  type: 'dir',
                  permissions: 'drwxr-xr-x',
                  updated: 'Oct 24 17:15',
                  children: {
                    apps: {
                      name: 'apps',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 16:40',
                      children: {
                        api: {
                          name: 'api',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 15:20',
                          children: {
                            'Dockerfile': {
                              name: 'Dockerfile',
                              type: 'file',
                              size: '620 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:20',
                              content: `# Multi-stage Build for High-Performance API Service\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY package*.json ./\nEXPOSE 8000\nCMD ["node", "dist/index.js"]`
                            },
                            'package.json': {
                              name: 'package.json',
                              type: 'file',
                              size: '890 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:15',
                              content: `{\n  "name": "@fms/api",\n  "version": "1.4.0",\n  "description": "FMS InfluxDB query & telemetry broker API",\n  "main": "dist/index.js",\n  "dependencies": {\n    "@influxdata/influxdb-client": "^1.33.2",\n    "express": "^4.19.2",\n    "pg": "^8.11.5",\n    "ws": "^8.16.0"\n  }\n}`
                            },
                            'src': {
                              name: 'src',
                              type: 'dir',
                              permissions: 'drwxr-xr-x',
                              updated: 'Oct 24 15:10',
                              children: {
                                'server.js': {
                                  name: 'server.js',
                                  type: 'file',
                                  size: '2.1 KB',
                                  permissions: '-rw-r--r--',
                                  updated: 'Oct 24 15:10',
                                  content: `const express = require('express');\nconst app = express();\nconst PORT = process.env.PORT || 8000;\n\napp.use('/api/telemetry', require('./routes/telemetry'));\napp.listen(PORT, () => console.log(\`FMS API online on port \${PORT}\`));`
                                },
                                'db.js': {
                                  name: 'db.js',
                                  type: 'file',
                                  size: '1.4 KB',
                                  permissions: '-rw-r--r--',
                                  updated: 'Oct 24 15:08',
                                  content: `const { Pool } = require('pg');\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL });\nmodule.exports = { query: (text, params) => pool.query(text, params) };`
                                },
                                'routes': {
                                  name: 'routes',
                                  type: 'dir',
                                  permissions: 'drwxr-xr-x',
                                  updated: 'Oct 24 15:05',
                                  children: {
                                    'telemetry.js': {
                                      name: 'telemetry.js',
                                      type: 'file',
                                      size: '1.8 KB',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 15:05',
                                      content: `const express = require('express');\nconst router = express.Router();\nrouter.get('/stream', (req, res) => res.json({ status: 'streaming', buffer: 'node_telemetry' }));\nmodule.exports = router;`
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        dashboard: {
                          name: 'dashboard',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 15:10',
                          children: {
                            'Dockerfile': {
                              name: 'Dockerfile',
                              type: 'file',
                              size: '420 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:05',
                              content: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nCOPY nginx.conf /etc/nginx/conf.d/default.conf`
                            },
                            'nginx.conf': {
                              name: 'nginx.conf',
                              type: 'file',
                              size: '560 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:02',
                              content: `server {\n  listen 80;\n  location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; }\n}`
                            },
                            'package.json': {
                              name: 'package.json',
                              type: 'file',
                              size: '1.2 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:00',
                              content: `{\n  "name": "@fms/dashboard",\n  "version": "2.1.0",\n  "dependencies": {\n    "maplibre-gl": "^4.0.0",\n    "react": "^19.0.0",\n    "lucide-react": "^0.475.0"\n  }\n}`
                            },
                            'vite.config.ts': {
                              name: 'vite.config.ts',
                              type: 'file',
                              size: '480 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 14:58',
                              content: `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({ plugins: [react()] });`
                            },
                            'src': {
                              name: 'src',
                              type: 'dir',
                              permissions: 'drwxr-xr-x',
                              updated: 'Oct 24 14:55',
                              children: {
                                'App.tsx': {
                                  name: 'App.tsx',
                                  type: 'file',
                                  size: '3.4 KB',
                                  permissions: '-rw-r--r--',
                                  updated: 'Oct 24 14:55',
                                  content: `import React from 'react';\n// 3D WebGL MapLibre Telemetry Canvas & Live Anomaly Alerts\nexport default function App() { return <div className="fms-dashboard" />; }`
                                }
                              }
                            }
                          }
                        },
                        'db-migrations': {
                          name: 'db-migrations',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 14:50',
                          children: {
                            'Dockerfile': {
                              name: 'Dockerfile',
                              type: 'file',
                              size: '340 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 14:50',
                              content: `FROM flyway/flyway:9-alpine\nCOPY sql /flyway/sql`
                            },
                            'sql': {
                              name: 'sql',
                              type: 'dir',
                              permissions: 'drwxr-xr-x',
                              updated: 'Oct 24 14:48',
                              children: {
                                'V1__Initial_Schema.sql': {
                                  name: 'V1__Initial_Schema.sql',
                                  type: 'file',
                                  size: '2.8 KB',
                                  permissions: '-rw-r--r--',
                                  updated: 'Oct 24 14:48',
                                  content: `CREATE TABLE devices (\n  id VARCHAR(64) PRIMARY KEY,\n  name VARCHAR(128),\n  latitude DOUBLE PRECISION,\n  longitude DOUBLE PRECISION,\n  status INT DEFAULT 0\n);`
                                },
                                'V17__Seed_Simulated_Devices.sql': {
                                  name: 'V17__Seed_Simulated_Devices.sql',
                                  type: 'file',
                                  size: '1.2 KB',
                                  permissions: '-rw-r--r--',
                                  updated: 'Oct 24 14:45',
                                  content: `INSERT INTO devices (id, name, latitude, longitude, status) VALUES\n('FMS-V1-0001', 'HQ Warehouse Tower Alpha', 14.5764, 121.0851, 0),\n('FMS-V1-0002', 'Sector 4 Substation Beta', 14.5821, 121.0792, 0);`
                                }
                              }
                            }
                          }
                        },
                        'etl-processor': {
                          name: 'etl-processor',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 14:45',
                          children: {
                            'Dockerfile': {
                              name: 'Dockerfile',
                              type: 'file',
                              size: '410 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 14:45',
                              content: `FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["python", "src/main.py"]`
                            },
                            'requirements.txt': {
                              name: 'requirements.txt',
                              type: 'file',
                              size: '180 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 14:42',
                              content: `pandas>=2.2.0\ninfluxdb-client>=1.38.0\npsycopg2-binary>=2.9.9\npaho-mqtt>=1.6.1`
                            },
                            'src': {
                              name: 'src',
                              type: 'dir',
                              permissions: 'drwxr-xr-x',
                              updated: 'Oct 24 14:40',
                              children: {
                                'main.py': {
                                  name: 'main.py',
                                  type: 'file',
                                  size: '2.4 KB',
                                  permissions: '-rw-r--r--',
                                  updated: 'Oct 24 14:40',
                                  content: `import time\nimport pandas as pd\nfrom influxdb_client import InfluxDBClient\n# 10s Window Anomaly Detector & InfluxDB Aggregator into PostgreSQL`
                                }
                              }
                            }
                          }
                        },
                        simulators: {
                          name: 'simulators',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 14:45',
                          children: {
                            'Dockerfile': {
                              name: 'Dockerfile',
                              type: 'file',
                              size: '320 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 14:40',
                              content: `FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY mcu_sim.py .\nCMD ["python", "mcu_sim.py"]`
                            },
                            'requirements.txt': {
                              name: 'requirements.txt',
                              type: 'file',
                              size: '90 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 14:38',
                              content: `paho-mqtt>=1.6.1\npython-dotenv>=1.0.1`
                            },
                            'mcu_sim.py': {
                              name: 'mcu_sim.py',
                              type: 'file',
                              size: '3.8 KB',
                              permissions: '-rwxr-xr-x',
                              updated: 'Oct 24 14:45',
                              content: `#!/usr/bin/env python3\n"""MQTT simulator for fire-monitoring devices.\nEnterprise-Grade schema with UTC Timestamps and Skinny Payloads.\n"""\nimport argparse, json, os, random, time\nfrom datetime import datetime, timezone\nimport paho.mqtt.client as mqtt\n\ndef generate_payload(device_id="FMS-V1-0001", status_override=None):\n    now = datetime.now(timezone.utc).isoformat()\n    temp = round(random.uniform(24.5, 29.8), 2)\n    flame = 0\n    smoke = round(random.uniform(12.0, 35.0), 1)\n    status = 0\n    if status_override is not None:\n        status = status_override\n    elif smoke > 80.0 or temp > 50.0:\n        status = 2  # Critical\n    elif smoke > 45.0 or temp > 38.0:\n        status = 1  # Warning\n    return {\n        "dev_id": device_id,\n        "ts": now,\n        "temp_c": temp,\n        "smoke_ppm": smoke,\n        "flame": flame,\n        "stat": status\n    }\n\nif __name__ == '__main__':\n    print("FMS MCU Sensor Simulator v2.4 initialized.")\n    print(json.dumps(generate_payload(), indent=2))`
                            }
                          }
                        }
                      }
                    },
                    infrastructure: {
                      name: 'infrastructure',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 16:30',
                      children: {
                        k8s: {
                          name: 'k8s',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 16:20',
                          children: {
                            'NETWORKING_SETUP.md': {
                              name: 'NETWORKING_SETUP.md',
                              type: 'file',
                              size: '2.1 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 16:18',
                              content: `# Zero-Trust Network Topology & Ingress\n- In-cluster Cloudflare Tunnels (cloudflared) route ingress without public external IP exposure.\n- Calico NetworkPolicies isolate namespace traffic: apps <-> data <-> db.`
                            },
                            'README.md': {
                              name: 'README.md',
                              type: 'file',
                              size: '1.4 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 16:15',
                              content: `# Kubernetes Manifests (Kustomize v5)\nStructured into \`base/\` multi-tier services and \`overlays/\` for dev and prod environments.`
                            },
                            base: {
                              name: 'base',
                              type: 'dir',
                              permissions: 'drwxr-xr-x',
                              updated: 'Oct 24 16:15',
                              children: {
                                'kustomization.yaml': {
                                  name: 'kustomization.yaml',
                                  type: 'file',
                                  size: '210 B',
                                  permissions: '-rw-r--r--',
                                  updated: 'Oct 24 16:15',
                                  content: `apiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\n\nresources:\n  - apps\n  - data\n  - db\n  - networking\n  - observability`
                                },
                                apps: {
                                  name: 'apps',
                                  type: 'dir',
                                  permissions: 'drwxr-xr-x',
                                  updated: 'Oct 24 16:12',
                                  children: {
                                    'kustomization.yaml': {
                                      name: 'kustomization.yaml',
                                      type: 'file',
                                      size: '160 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:12',
                                      content: `apiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n  - api-deployment.yaml\n  - dashboard-deployment.yaml\n  - etl-deployment.yaml`
                                    },
                                    'api-deployment.yaml': {
                                      name: 'api-deployment.yaml',
                                      type: 'file',
                                      size: '1.4 KB',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:10',
                                      content: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: fms-api\n  namespace: fire-monitoring-dev\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: fms-api\n  template:\n    metadata:\n      labels:\n        app: fms-api\n    spec:\n      securityContext:\n        runAsNonRoot: true\n        runAsUser: 1001\n      containers:\n        - name: api\n          image: ghcr.io/fauxx/fms-api:v1.4.0\n          ports:\n            - containerPort: 8000`
                                    },
                                    'dashboard-deployment.yaml': {
                                      name: 'dashboard-deployment.yaml',
                                      type: 'file',
                                      size: '1.2 KB',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:08',
                                      content: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: fms-dashboard\n  namespace: fire-monitoring-dev\nspec:\n  replicas: 2\n  template:\n    spec:\n      containers:\n        - name: dashboard\n          image: ghcr.io/fauxx/fms-dashboard:v2.1.0\n          ports:\n            - containerPort: 80`
                                    },
                                    'etl-deployment.yaml': {
                                      name: 'etl-deployment.yaml',
                                      type: 'file',
                                      size: '1.1 KB',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:05',
                                      content: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: fms-etl-processor\nspec:\n  replicas: 1\n  template:\n    spec:\n      containers:\n        - name: etl\n          image: ghcr.io/fauxx/fms-etl:v1.2.0`
                                    }
                                  }
                                },
                                data: {
                                  name: 'data',
                                  type: 'dir',
                                  permissions: 'drwxr-xr-x',
                                  updated: 'Oct 24 16:10',
                                  children: {
                                    'kustomization.yaml': {
                                      name: 'kustomization.yaml',
                                      type: 'file',
                                      size: '140 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:10',
                                      content: `apiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n  - mqtt-statefulset.yaml\n  - influxdb-statefulset.yaml`
                                    },
                                    'mqtt-statefulset.yaml': {
                                      name: 'mqtt-statefulset.yaml',
                                      type: 'file',
                                      size: '1.3 KB',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:08',
                                      content: `apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: fms-mosquitto\nspec:\n  serviceName: fms-mosquitto\n  replicas: 1\n  template:\n    spec:\n      containers:\n        - name: mosquitto\n          image: eclipse-mosquitto:2.0\n          ports:\n            - containerPort: 1883\n            - containerPort: 9001`
                                    },
                                    'influxdb-statefulset.yaml': {
                                      name: 'influxdb-statefulset.yaml',
                                      type: 'file',
                                      size: '1.4 KB',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:05',
                                      content: `apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: fms-influxdb\nspec:\n  serviceName: fms-influxdb\n  replicas: 1\n  template:\n    spec:\n      containers:\n        - name: influxdb\n          image: influxdb:2.7-alpine\n          ports:\n            - containerPort: 8086`
                                    }
                                  }
                                },
                                db: {
                                  name: 'db',
                                  type: 'dir',
                                  permissions: 'drwxr-xr-x',
                                  updated: 'Oct 24 16:08',
                                  children: {
                                    'kustomization.yaml': {
                                      name: 'kustomization.yaml',
                                      type: 'file',
                                      size: '150 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:08',
                                      content: `apiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n  - statefulset.yaml\n  - service.yaml\n  - secrets.yaml`
                                    },
                                    'statefulset.yaml': {
                                      name: 'statefulset.yaml',
                                      type: 'file',
                                      size: '1.2 KB',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:06',
                                      content: `apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: fms-postgres\nspec:\n  serviceName: fms-postgres\n  replicas: 1\n  template:\n    spec:\n      containers:\n        - name: postgres\n          image: postgres:15-alpine\n          ports:\n            - containerPort: 5432`
                                    },
                                    'service.yaml': {
                                      name: 'service.yaml',
                                      type: 'file',
                                      size: '420 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:04',
                                      content: `apiVersion: v1\nkind: Service\nmetadata:\n  name: fms-postgres-svc\nspec:\n  ports:\n    - port: 5432\n  selector:\n    app: fms-postgres`
                                    },
                                    'secrets.yaml': {
                                      name: 'secrets.yaml',
                                      type: 'file',
                                      size: '450 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:02',
                                      content: `apiVersion: v1\nkind: Secret\nmetadata:\n  name: fms-db-credentials\ntype: Opaque\ndata:\n  POSTGRES_USER: Zm1zX3VzZXI=\n  POSTGRES_PASSWORD: WkRhMWVmMjZDbG91ZFNxbA==`
                                    }
                                  }
                                },
                                networking: {
                                  name: 'networking',
                                  type: 'dir',
                                  permissions: 'drwxr-xr-x',
                                  updated: 'Oct 24 16:06',
                                  children: {
                                    'cloudflared-deployment.yaml': {
                                      name: 'cloudflared-deployment.yaml',
                                      type: 'file',
                                      size: '1.1 KB',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:05',
                                      content: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: cloudflared\n  namespace: fire-monitoring-dev\nspec:\n  replicas: 2\n  template:\n    spec:\n      containers:\n        - name: cloudflared\n          image: cloudflare/cloudflared:latest\n          args: ["tunnel", "--no-autoupdate", "run"]`
                                    },
                                    'ingress.yaml': {
                                      name: 'ingress.yaml',
                                      type: 'file',
                                      size: '890 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:03',
                                      content: `apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: fms-edge-ingress\nspec:\n  rules:\n    - host: dev.fires.systems\n      http:\n        paths:\n          - path: /\n            pathType: Prefix\n            backend:\n              service:\n                name: fms-dashboard\n                port:\n                  number: 80`
                                    }
                                  }
                                }
                              }
                            },
                            overlays: {
                              name: 'overlays',
                              type: 'dir',
                              permissions: 'drwxr-xr-x',
                              updated: 'Oct 24 16:15',
                              children: {
                                dev: {
                                  name: 'dev',
                                  type: 'dir',
                                  permissions: 'drwxr-xr-x',
                                  updated: 'Oct 24 16:14',
                                  children: {
                                    'kustomization.yaml': {
                                      name: 'kustomization.yaml',
                                      type: 'file',
                                      size: '340 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:14',
                                      content: `apiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nnamespace: fire-monitoring-dev\nresources:\n  - ../../base\npatchesStrategicMerge:\n  - ingress-patch.yaml\n  - mqtt-service-patch.yaml\nconfigMapGenerator:\n  - name: fms-env-config\n    envs:\n      - dev-public.env`
                                    },
                                    'dev-public.env': {
                                      name: 'dev-public.env',
                                      type: 'file',
                                      size: '220 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:12',
                                      content: `NODE_ENV=development\nAPI_URL=https://api.dev.fires.systems\nMQTT_WS_URL=wss://dev.fires.systems/mqtt\nINFLUX_ORG=fms-org\nINFLUX_BUCKET=node_telemetry`
                                    },
                                    'ingress-patch.yaml': {
                                      name: 'ingress-patch.yaml',
                                      type: 'file',
                                      size: '480 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:10',
                                      content: `apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: fms-edge-ingress\n  annotations:\n    cloudflare.com/tunnel-id: "dev-tunnel-74f8"`
                                    },
                                    'mqtt-service-patch.yaml': {
                                      name: 'mqtt-service-patch.yaml',
                                      type: 'file',
                                      size: '390 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:08',
                                      content: `apiVersion: v1\nkind: Service\nmetadata:\n  name: fms-mosquitto\nspec:\n  type: ClusterIP`
                                    },
                                    'secrets.yaml': {
                                      name: 'secrets.yaml',
                                      type: 'file',
                                      size: '520 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:05',
                                      content: `apiVersion: v1\nkind: Secret\nmetadata:\n  name: dev-secrets\ntype: Opaque\ndata:\n  CLOUDFLARE_TUNNEL_TOKEN: ZGV2LXRva2VuLTIwMjY=`
                                    }
                                  }
                                },
                                prod: {
                                  name: 'prod',
                                  type: 'dir',
                                  permissions: 'drwxr-xr-x',
                                  updated: 'Oct 24 16:10',
                                  children: {
                                    'kustomization.yaml': {
                                      name: 'kustomization.yaml',
                                      type: 'file',
                                      size: '320 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:10',
                                      content: `apiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nnamespace: fire-monitoring-prod\nresources:\n  - ../../base\npatchesStrategicMerge:\n  - api-replicas-patch.yaml\n  - dashboard-replicas-patch.yaml`
                                    },
                                    'prod-public.env': {
                                      name: 'prod-public.env',
                                      type: 'file',
                                      size: '210 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:08',
                                      content: `NODE_ENV=production\nAPI_URL=https://api.fires.systems\nMQTT_WS_URL=wss://fires.systems/mqtt`
                                    },
                                    'api-replicas-patch.yaml': {
                                      name: 'api-replicas-patch.yaml',
                                      type: 'file',
                                      size: '280 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:06',
                                      content: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: fms-api\nspec:\n  replicas: 4`
                                    },
                                    'dashboard-replicas-patch.yaml': {
                                      name: 'dashboard-replicas-patch.yaml',
                                      type: 'file',
                                      size: '290 B',
                                      permissions: '-rw-r--r--',
                                      updated: 'Oct 24 16:04',
                                      content: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: fms-dashboard\nspec:\n  replicas: 3`
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        terraform: {
                          name: 'terraform',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 16:00',
                          children: {
                            'backend-gcp-common.conf': {
                              name: 'backend-gcp-common.conf',
                              type: 'file',
                              size: '310 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:58',
                              content: `bucket  = "fms-tf-state-prod"\nprefix  = "terraform/state"\nregion  = "asia-southeast1"`
                            },
                            'README.md': {
                              name: 'README.md',
                              type: 'file',
                              size: '1.2 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:55',
                              content: `# 4-Stage Modular Terraform Architecture\nStructured into 4 isolated state layers (00-bootstrap -> 01-infra -> 02-platform -> 03-argocd).`
                            },
                            environments: {
                              name: 'environments',
                              type: 'dir',
                              permissions: 'drwxr-xr-x',
                              updated: 'Oct 24 15:50',
                              children: {
                                'gke-dev': {
                                  name: 'gke-dev',
                                  type: 'dir',
                                  permissions: 'drwxr-xr-x',
                                  updated: 'Oct 24 15:45',
                                  children: {
                                    '00-bootstrap': {
                                      name: '00-bootstrap',
                                      type: 'dir',
                                      permissions: 'drwxr-xr-x',
                                      updated: 'Oct 24 15:40',
                                      children: {
                                        'main.tf': {
                                          name: 'main.tf',
                                          type: 'file',
                                          size: '1.2 KB',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:40',
                                          content: `resource "google_storage_bucket" "tf_state" {\n  name          = "\${var.project_id}-terraform-state"\n  location      = var.region\n  uniform_bucket_level_access = true\n  versioning { enabled = true }\n}`
                                        },
                                        'variables.tf': {
                                          name: 'variables.tf',
                                          type: 'file',
                                          size: '420 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:38',
                                          content: `variable "project_id" { type = string }\nvariable "region" { default = "asia-southeast1" }\nvariable "environment" { default = "dev" }`
                                        },
                                        'terraform.tfvars': {
                                          name: 'terraform.tfvars',
                                          type: 'file',
                                          size: '340 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:35',
                                          content: `project_id   = "fire-monitoring-dev-4321"\nregion       = "asia-southeast1"\nenvironment  = "dev"\ngithub_repo  = "Fauxx/FireMonitoringSystem"`
                                        }
                                      }
                                    },
                                    '01-infra': {
                                      name: '01-infra',
                                      type: 'dir',
                                      permissions: 'drwxr-xr-x',
                                      updated: 'Oct 24 15:35',
                                      children: {
                                        'main.tf': {
                                          name: 'main.tf',
                                          type: 'file',
                                          size: '1.4 KB',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:35',
                                          content: `module "vpc" {\n  source   = "../../modules/gcp/vpc"\n  vpc_cidr = var.vpc_cidr\n}\n\nmodule "gke" {\n  source       = "../../modules/gke/cluster"\n  cluster_name = var.cluster_name\n  node_count   = var.node_count\n}`
                                        },
                                        'vpc.tf': {
                                          name: 'vpc.tf',
                                          type: 'file',
                                          size: '980 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:32',
                                          content: `resource "google_compute_network" "vpc" {\n  name                    = "fms-vpc-dev"\n  auto_create_subnetworks = false\n}`
                                        },
                                        'gke.tf': {
                                          name: 'gke.tf',
                                          type: 'file',
                                          size: '1.8 KB',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:30',
                                          content: `resource "google_container_cluster" "primary" {\n  name     = var.cluster_name\n  location = var.region\n  private_cluster_config {\n    enable_private_nodes = true\n  }\n}`
                                        },
                                        'sql.tf': {
                                          name: 'sql.tf',
                                          type: 'file',
                                          size: '1.1 KB',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:28',
                                          content: `resource "google_sql_database_instance" "postgres" {\n  name             = "fms-postgres-dev"\n  database_version = "POSTGRES_15"\n  settings {\n    tier = var.cloudsql_tier\n  }\n}`
                                        },
                                        'variables.tf': {
                                          name: 'variables.tf',
                                          type: 'file',
                                          size: '620 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:25',
                                          content: `variable "cluster_name" { default = "gke-fire-monitoring-cluster-dev" }\nvariable "node_count" { default = 2 }\nvariable "cloudsql_tier" { default = "db-custom-2-7680" }`
                                        },
                                        'terraform.tfvars': {
                                          name: 'terraform.tfvars',
                                          type: 'file',
                                          size: '480 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:20',
                                          content: `cluster_name  = "gke-fire-monitoring-cluster-dev"\nnode_count    = 2\nmachine_type  = "e2-standard-4"\nvpc_cidr      = "10.10.0.0/16"\npods_cidr     = "10.244.0.0/16"\nservices_cidr = "10.96.0.0/16"\ncloudsql_tier = "db-custom-2-7680"`
                                        }
                                      }
                                    },
                                    '02-platform': {
                                      name: '02-platform',
                                      type: 'dir',
                                      permissions: 'drwxr-xr-x',
                                      updated: 'Oct 24 15:30',
                                      children: {
                                        'main.tf': {
                                          name: 'main.tf',
                                          type: 'file',
                                          size: '950 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:30',
                                          content: `module "cert_manager" { source = "../../modules/shared/cert-manager" }\nmodule "cloudflare"   { source = "../../modules/shared/cloudflare" }`
                                        },
                                        'cert-manager.tf': {
                                          name: 'cert-manager.tf',
                                          type: 'file',
                                          size: '820 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:28',
                                          content: `resource "helm_release" "cert_manager" {\n  name       = "cert-manager"\n  repository = "https://charts.jetstack.io"\n  chart      = "cert-manager"\n}`
                                        },
                                        'cloudflare.tf': {
                                          name: 'cloudflare.tf',
                                          type: 'file',
                                          size: '790 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:26',
                                          content: `resource "cloudflare_record" "dev_edge" {\n  zone_id = var.cloudflare_zone_id\n  name    = "dev.fires.systems"\n  value   = "198.41.200.1"\n  type    = "A"\n  proxied = true\n}`
                                        },
                                        'variables.tf': {
                                          name: 'variables.tf',
                                          type: 'file',
                                          size: '340 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:24',
                                          content: `variable "cloudflare_zone_id" { type = string }\nvariable "cloudflare_api_token" { type = string }`
                                        },
                                        'terraform.tfvars': {
                                          name: 'terraform.tfvars',
                                          type: 'file',
                                          size: '290 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:20',
                                          content: `cloudflare_zone_id = "d39fa8bc12984efb9021"\ndomain_name        = "fires.systems"`
                                        }
                                      }
                                    },
                                    '03-argocd': {
                                      name: '03-argocd',
                                      type: 'dir',
                                      permissions: 'drwxr-xr-x',
                                      updated: 'Oct 24 15:25',
                                      children: {
                                        'main.tf': {
                                          name: 'main.tf',
                                          type: 'file',
                                          size: '860 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:25',
                                          content: `resource "helm_release" "argocd" {\n  name       = "argo-cd"\n  repository = "https://argoproj.github.io/argo-helm"\n  chart      = "argo-cd"\n}`
                                        },
                                        'root-app.tf': {
                                          name: 'root-app.tf',
                                          type: 'file',
                                          size: '1.2 KB',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:22',
                                          content: `resource "kubectl_manifest" "root_application" {\n  yaml_body = file("\${path.module}/../../../../build/local/argocd-apps-dev.yaml")\n}`
                                        },
                                        'variables.tf': {
                                          name: 'variables.tf',
                                          type: 'file',
                                          size: '280 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:20',
                                          content: `variable "target_repo" { default = "https://github.com/Fauxx/FireMonitoringSystem.git" }`
                                        },
                                        'terraform.tfvars': {
                                          name: 'terraform.tfvars',
                                          type: 'file',
                                          size: '240 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:18',
                                          content: `target_repo   = "https://github.com/Fauxx/FireMonitoringSystem.git"\ntarget_branch = "main"`
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            modules: {
                              name: 'modules',
                              type: 'dir',
                              permissions: 'drwxr-xr-x',
                              updated: 'Oct 24 15:30',
                              children: {
                                gke: {
                                  name: 'gke',
                                  type: 'dir',
                                  permissions: 'drwxr-xr-x',
                                  updated: 'Oct 24 15:28',
                                  children: {
                                    cluster: {
                                      name: 'cluster',
                                      type: 'dir',
                                      permissions: 'drwxr-xr-x',
                                      updated: 'Oct 24 15:26',
                                      children: {
                                        'main.tf': {
                                          name: 'main.tf',
                                          type: 'file',
                                          size: '1.2 KB',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:26',
                                          content: `// Reusable GKE Cluster Module`
                                        },
                                        'variables.tf': {
                                          name: 'variables.tf',
                                          type: 'file',
                                          size: '420 B',
                                          permissions: '-rw-r--r--',
                                          updated: 'Oct 24 15:24',
                                          content: `// GKE Cluster Variables`
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        scripts: {
                          name: 'scripts',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 15:40',
                          children: {
                            'local-gitops-bootstrap.sh': {
                              name: 'local-gitops-bootstrap.sh',
                              type: 'file',
                              size: '1.4 KB',
                              permissions: '-rwxr-xr-x',
                              updated: 'Oct 24 15:40',
                              content: `#!/usr/bin/env bash\nset -euo pipefail\necho "Bootstrapping Kind cluster with ArgoCD GitOps..."`
                            },
                            'bootstrap.sh': {
                              name: 'bootstrap.sh',
                              type: 'file',
                              size: '1.1 KB',
                              permissions: '-rwxr-xr-x',
                              updated: 'Oct 24 15:38',
                              content: `#!/usr/bin/env bash\n# Complete cluster bootstrap script`
                            }
                          }
                        }
                      }
                    },
                    build: {
                      name: 'build',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 15:40',
                      children: {
                        local: {
                          name: 'local',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 15:35',
                          children: {
                            'docker-compose.local.yml': {
                              name: 'docker-compose.local.yml',
                              type: 'file',
                              size: '1.2 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:35',
                              content: `version: '3.8'\nservices:\n  mosquitto:\n    image: eclipse-mosquitto:2.0\n    ports:\n      - "1883:1883"\n      - "9001:9001"\n  influxdb:\n    image: influxdb:2.7-alpine\n    ports:\n      - "8086:8086"\n  postgres:\n    image: postgres:15-alpine\n    ports:\n      - "5432:5432"`
                            },
                            'kind-config.yaml': {
                              name: 'kind-config.yaml',
                              type: 'file',
                              size: '560 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:30',
                              content: `kind: Cluster\napiVersion: kind.x-k8s.io/v1alpha4\nnodes:\n- role: control-plane\n  extraPortMappings:\n  - containerPort: 80\n    hostPort: 80\n  - containerPort: 443\n    hostPort: 443\n- role: worker\n- role: worker`
                            },
                            'argocd-apps-dev.yaml': {
                              name: 'argocd-apps-dev.yaml',
                              type: 'file',
                              size: '890 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:28',
                              content: `apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: fms-dev-root\n  namespace: argocd\nspec:\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: fire-monitoring-dev\n  source:\n    repoURL: https://github.com/Fauxx/FireMonitoringSystem.git\n    targetRevision: main\n    path: infrastructure/k8s/overlays/dev`
                            }
                          }
                        }
                      }
                    },
                    docs: {
                      name: 'docs',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 15:30',
                      children: {
                        ADR: {
                          name: 'ADR',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 15:25',
                          children: {
                            '0001-adoption-of-gitops.md': {
                              name: '0001-adoption-of-gitops.md',
                              type: 'file',
                              size: '1.6 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:25',
                              content: `# ADR 0001: Adoption of Declarative GitOps via ArgoCD\n## Decision\nAdopt ArgoCD to reconcile cluster state against git repository.`
                            },
                            '0002-zero-trust-networking.md': {
                              name: '0002-zero-trust-networking.md',
                              type: 'file',
                              size: '1.8 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:20',
                              content: `# ADR 0002: Zero-Trust Networking with Cloudflare Tunnels\n## Decision\nRun in-cluster cloudflared daemons without open public inbound ports.`
                            }
                          }
                        },
                        architecture: {
                          name: 'architecture',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 15:20',
                          children: {
                            '01-gcp-gke.md': {
                              name: '01-gcp-gke.md',
                              type: 'file',
                              size: '1.2 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:20',
                              content: `# GKE Architecture & Workload Identity\nCluster topology with Datapath v2 and private nodes.`
                            },
                            '02-kubernetes.md': {
                              name: '02-kubernetes.md',
                              type: 'file',
                              size: '1.4 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 15:18',
                              content: `# Kubernetes Workload Design\nStatefulSets for storage nodes and Deployments for stateless services.`
                            }
                          }
                        }
                      }
                    },
                    'Makefile': {
                      name: 'Makefile',
                      type: 'file',
                      size: '950 B',
                      permissions: '-rw-r--r--',
                      updated: 'Oct 24 15:25',
                      content: `.PHONY: bootstrap up down lint test kind-up\n\nbootstrap:\n\t@./infrastructure/scripts/local-gitops-bootstrap.sh\n\nup:\n\t@docker compose -f build/local/docker-compose.local.yml up -d\n\ndown:\n\t@docker compose -f build/local/docker-compose.local.yml down\n\ntest:\n\t@cd apps/api && npm test\n\t@pytest apps/etl-processor/tests`
                    },
                    'README.md': {
                      name: 'README.md',
                      type: 'file',
                      size: '2.4 KB',
                      permissions: '-rw-r--r--',
                      updated: 'Oct 24 15:20',
                      content: `# FireMonitoringSystem (FMS)\nProduction-grade IoT telemetry platform on Azure AKS & Kubernetes with 4-layer modular Terraform IaC, ArgoCD GitOps, and Prometheus/Grafana Loki observability.`
                    }
                  }
                },
                jobflow: {
                  name: 'jobflow',
                  type: 'dir',
                  permissions: 'drwxr-xr-x',
                  updated: 'Oct 24 17:30',
                  children: {
                    alembic: {
                      name: 'alembic',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 17:00',
                      children: {
                        versions: {
                          name: 'versions',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 17:00',
                          children: {
                            '001_initial_schema.py': {
                              name: '001_initial_schema.py',
                              type: 'file',
                              size: '3.1 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:00',
                              content: `"""Initial schema for jobs, users, tailored_resumes, and application pipeline\n\nRevision ID: 001_initial_schema\nRevises: None\nCreate Date: 2026-10-24 17:00:00\n"""\nfrom alembic import op\nimport sqlalchemy as sa\nfrom sqlalchemy.dialects import postgresql\n\ndef upgrade() -> None:\n    op.create_table(\n        'users',\n        sa.Column('id', sa.Integer(), primary_key=True),\n        sa.Column('email', sa.String(255), unique=True, nullable=False),\n        sa.Column('master_profile', postgresql.JSONB(), nullable=False)\n    )\n    op.create_table(\n        'jobs',\n        sa.Column('id', sa.Integer(), primary_key=True),\n        sa.Column('title', sa.String(255), nullable=False),\n        sa.Column('company', sa.String(255), nullable=False),\n        sa.Column('raw_description', sa.Text(), nullable=False),\n        sa.Column('extracted_keywords', postgresql.ARRAY(sa.String())),\n        sa.Column('status', sa.String(50), default='draft')\n    )\n`
                            }
                          }
                        },
                        'env.py': {
                          name: 'env.py',
                          type: 'file',
                          size: '2.1 KB',
                          permissions: '-rw-r--r--',
                          updated: 'Oct 24 17:00',
                          content: `from logging.config import fileConfig\nfrom sqlalchemy import engine_from_config, pool\nfrom alembic import context\nfrom src.core.database import Base\nfrom src.models import user, job, resume\n\ntarget_metadata = Base.metadata`
                        }
                      }
                    },
                    frontend: {
                      name: 'frontend',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 17:25',
                      children: {
                        'package.json': {
                          name: 'package.json',
                          type: 'file',
                          size: '890 B',
                          permissions: '-rw-r--r--',
                          updated: 'Oct 24 17:25',
                          content: `{\n  "name": "jobflow-client",\n  "version": "1.0.0",\n  "private": true,\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0",\n    "lucide-react": "^1.16.0",\n    "tailwind-merge": "^2.5.2"\n  }\n}`
                        },
                        src: {
                          name: 'src',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 17:25',
                          children: {
                            'ResumeStudio.tsx': {
                              name: 'ResumeStudio.tsx',
                              type: 'file',
                              size: '3.8 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:25',
                              content: `import React, { useState } from 'react';\n\nexport const ResumeStudio: React.FC = () => {\n  const [matchScore, setMatchScore] = useState(94);\n  return (\n    <div className="resume-studio-canvas">\n      <header className="flex justify-between items-center">\n        <h1>ATS Resume Studio</h1>\n        <span className="badge-match-score">Match Score: {matchScore}%</span>\n      </header>\n      <main className="pdf-a4-viewport">\n        {/* WeasyPrint PDF layout preview */}\n      </main>\n    </div>\n  );\n};`
                            },
                            'TailorComparison.tsx': {
                              name: 'TailorComparison.tsx',
                              type: 'file',
                              size: '2.4 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:22',
                              content: `import React from 'react';\n\nexport const TailorComparison = ({ original, tailored }: { original: string[]; tailored: string[] }) => (\n  <div className="grid grid-cols-2 gap-4">\n    <div className="column-original">{original.map((b, i) => <p key={i}>{b}</p>)}</div>\n    <div className="column-tailored">{tailored.map((b, i) => <p key={i} className="text-emerald-400">{b}</p>)}</div>\n  </div>\n);`
                            },
                            'App.tsx': {
                              name: 'App.tsx',
                              type: 'file',
                              size: '1.8 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:20',
                              content: `import React from 'react';\nimport { ResumeStudio } from './ResumeStudio';\n\nexport default function App() {\n  return (\n    <div className="app-container">\n      <ResumeStudio />\n    </div>\n  );\n}`
                            }
                          }
                        }
                      }
                    },
                    src: {
                      name: 'src',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 17:25',
                      children: {
                        core: {
                          name: 'core',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 17:10',
                          children: {
                            'config.py': {
                              name: 'config.py',
                              type: 'file',
                              size: '1.1 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:10',
                              content: `import os\nfrom pydantic_settings import BaseSettings\n\nclass Settings(BaseSettings):\n    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://jobflow:password@localhost:5432/jobflow")\n    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")\n    SECRET_KEY: str = os.getenv("SECRET_KEY", "jobflow-dev-secret-key-2026")\n\nsettings = Settings()`
                            }
                          }
                        },
                        models: {
                          name: 'models',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 17:12',
                          children: {
                            'job.py': {
                              name: 'job.py',
                              type: 'file',
                              size: '1.2 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:12',
                              content: `from sqlalchemy import Column, Integer, String, Text, DateTime, func\nfrom src.core.database import Base\n\nclass Job(Base):\n    __tablename__ = 'jobs'\n    id = Column(Integer, primary_key=True)\n    title = Column(String(255), nullable=False)\n    company = Column(String(255), nullable=False)\n    created_at = Column(DateTime, default=func.now())`
                            }
                          }
                        },
                        routers: {
                          name: 'routers',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 17:18',
                          children: {
                            'jobs.py': {
                              name: 'jobs.py',
                              type: 'file',
                              size: '1.5 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:18',
                              content: `from fastapi import APIRouter\n\nrouter = APIRouter()\n\n@router.get("/")\ndef list_jobs():\n    return [{"id": 1, "title": "DevOps Engineer", "company": "CloudNative Labs"}]`
                            },
                            'resume_tailor.py': {
                              name: 'resume_tailor.py',
                              type: 'file',
                              size: '2.1 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:16',
                              content: `from fastapi import APIRouter\nfrom src.services.gemini_llm import tailor_resume, TailoredResumeResponse\n\nrouter = APIRouter()\n\n@router.post("/", response_model=TailoredResumeResponse)\ndef tailor(payload: dict):\n    return tailor_resume(payload["profile"], payload["job_description"])`
                            },
                            'scrape.py': {
                              name: 'scrape.py',
                              type: 'file',
                              size: '1.3 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:14',
                              content: `from fastapi import APIRouter\nfrom src.services.playwright_scraper import scrape_job_post\n\nrouter = APIRouter()\n\n@router.post("/")\nasync def scrape(url: str):\n    return await scrape_job_post(url)`
                            }
                          }
                        },
                        services: {
                          name: 'services',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 17:15',
                          children: {
                            'gemini_llm.py': {
                              name: 'gemini_llm.py',
                              type: 'file',
                              size: '3.2 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:15',
                              content: `import google.generativeai as genai\nfrom pydantic import BaseModel, Field\nfrom typing import List\nimport json\n\nclass TailoredResumeResponse(BaseModel):\n    match_score: int = Field(ge=0, le=100)\n    targeted_summary: str\n    optimized_bullet_points: List[str]\n    missing_keywords: List[str]\n\ndef tailor_resume(master_profile: dict, job_description: str) -> TailoredResumeResponse:\n    model = genai.GenerativeModel('gemini-2.0-flash')\n    prompt = f"Tailor this profile to the job description:\\nProfile: {json.dumps(master_profile)}\\nJob: {job_description}"\n    response = model.generate_content(prompt)\n    return TailoredResumeResponse.model_validate_json(response.text)`
                            },
                            'playwright_scraper.py': {
                              name: 'playwright_scraper.py',
                              type: 'file',
                              size: '2.8 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:12',
                              content: `from playwright.async_api import async_playwright\nimport os\n\nasync def scrape_job_post(url: str, session_cookies: str = None):\n    async with async_playwright() as p:\n        browser = await p.chromium.launch(headless=True)\n        context = await browser.new_context(user_agent="Mozilla/5.0 (X11; Linux x86_64)")\n        if session_cookies and os.path.exists(session_cookies):\n            await context.add_cookies(session_cookies)\n        page = await context.new_page()\n        await page.goto(url, wait_until="domcontentloaded")\n        title = await page.title()\n        body_text = await page.inner_text("body")\n        await browser.close()\n        return {"title": title, "content": body_text}`
                            }
                          }
                        },
                        'main.py': {
                          name: 'main.py',
                          type: 'file',
                          size: '1.6 KB',
                          permissions: '-rw-r--r--',
                          updated: 'Oct 24 17:20',
                          content: `from fastapi import FastAPI\nfrom fastapi.middleware.cors import CORSMiddleware\nfrom src.routers import jobs, resume_tailor, scrape\n\napp = FastAPI(title="Jobflow AI Engine", version="1.0.0")\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=["*"],\n    allow_credentials=True,\n    allow_methods=["*"],\n    allow_headers=["*"],\n)\n\napp.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs"])\napp.include_router(resume_tailor.router, prefix="/api/tailor", tags=["AI Tailor"])\napp.include_router(scrape.router, prefix="/api/scrape", tags=["Scraper"])\n\n@app.get("/health")\ndef health():\n    return {"status": "ok", "service": "jobflow"}`
                        },
                        'resume.json': {
                          name: 'resume.json',
                          type: 'file',
                          size: '4.2 KB',
                          permissions: '-rw-r--r--',
                          updated: 'Oct 24 17:05',
                          content: `{\n  "name": "Zet Donaue Samson",\n  "title": "Systems & Cloud DevOps Engineer",\n  "email": "zetsamson@gmail.com",\n  "location": "Pasig City, Metro Manila",\n  "github": "https://github.com/Fauxx",\n  "focus": ["Kubernetes", "4-Stage Terraform", "ArgoCD", "FastAPI", "Full-Stack Observability"]\n}`
                        }
                      }
                    },
                    templates: {
                      name: 'templates',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 17:15',
                      children: {
                        'resume_print.html': {
                          name: 'resume_print.html',
                          type: 'file',
                          size: '2.6 KB',
                          permissions: '-rw-r--r--',
                          updated: 'Oct 24 17:15',
                          content: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  @page { size: A4 portrait; margin: 12mm 15mm; }\n  body { font-family: 'Inter', sans-serif; font-size: 9.5pt; line-height: 1.35; color: #1a202c; }\n  h1 { font-size: 16pt; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }\n  .section-title { font-size: 10pt; font-weight: bold; border-bottom: 1.5px solid #2d3748; margin-top: 8pt; margin-bottom: 4pt; }\n</style>\n</head>\n<body>\n  <h1>{{ name }}</h1>\n  <div class="subtitle">{{ title }} | {{ email }} | {{ location }}</div>\n</body>\n</html>`
                        }
                      }
                    },
                    'docker-compose.yml': {
                      name: 'docker-compose.yml',
                      type: 'file',
                      size: '1.1 KB',
                      permissions: '-rw-r--r--',
                      updated: 'Oct 24 17:28',
                      content: `version: '3.8'\n\nservices:\n  app:\n    container_name: jobflow-app\n    image: localhost/jobflow_app:latest\n    ports:\n      - "8000:8000"\n    environment:\n      - DATABASE_URL=postgresql://jobflow:password@db:5432/jobflow\n      - GEMINI_API_KEY=\${GEMINI_API_KEY}\n    depends_on:\n      - db\n    volumes:\n      - .:/app:z\n\n  db:\n    container_name: jobflow-db\n    image: docker.io/library/postgres:16\n    environment:\n      - POSTGRES_USER=jobflow\n      - POSTGRES_PASSWORD=password\n      - POSTGRES_DB=jobflow\n    ports:\n      - "5432:5432"`
                    },
                    'requirements.txt': {
                      name: 'requirements.txt',
                      type: 'file',
                      size: '420 B',
                      permissions: '-rw-r--r--',
                      updated: 'Oct 24 17:00',
                      content: `fastapi>=0.110.0\nuvicorn>=0.28.0\npydantic>=2.6.4\npydantic-settings>=2.2.1\nsqlalchemy>=2.0.28\nalembic>=1.13.1\nasyncpg>=0.29.0\npsycopg2-binary>=2.9.9\ngoogle-generativeai>=0.4.1\nplaywright>=1.42.0\nweasyprint>=61.2\npython-dotenv>=1.0.1`
                    },
                    'README.md': {
                      name: 'README.md',
                      type: 'file',
                      size: '1.9 KB',
                      permissions: '-rw-r--r--',
                      updated: 'Oct 24 16:55',
                      content: `# Jobflow — AI Job Application Tracking & ATS Resume Studio\nFull-stack AI job automation studio combining Google Gemini 2.0 Flash LLMs, Pydantic schema validation, Playwright cookie scraping, and pixel-accurate PDF rendering.`
                    }
                  }
                },
                'ai-job-email-agent': {
                  name: 'ai-job-email-agent',
                  type: 'dir',
                  permissions: 'drwxr-xr-x',
                  updated: 'Oct 24 18:00',
                  children: {
                    '.github': {
                      name: '.github',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 17:50',
                      children: {
                        workflows: {
                          name: 'workflows',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 17:50',
                          children: {
                            'agent.yml': {
                              name: 'agent.yml',
                              type: 'file',
                              size: '1.1 KB',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:50',
                              content: `name: AI Email Agent

on:
  schedule:
    - cron: '0 */2 * * *'
  workflow_dispatch:

jobs:
  run-agent:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
          
      - name: Install dependencies
        run: pip install -r requirements.txt
        
      - name: Restore Notified Cache
        uses: actions/cache/restore@v4
        with:
          path: cache/
          key: notified-cache-\${{ github.run_id }}
          restore-keys: |
            notified-cache-
        
      - name: Run AI Agent
        env:
          IMAP_USER: \${{ secrets.IMAP_USER }}
          IMAP_PASS: \${{ secrets.IMAP_PASS }}
          GEMINI_API_KEY: \${{ secrets.GEMINI_API_KEY }}
          TELEGRAM_BOT_TOKEN: \${{ secrets.TELEGRAM_BOT_TOKEN }}
          TELEGRAM_CHAT_ID: \${{ secrets.TELEGRAM_CHAT_ID }}
        run: python main.py

      - name: Save Notified Cache
        if: always()
        uses: actions/cache/save@v4
        with:
          path: cache/
          key: notified-cache-\${{ github.run_id }}`
                            }
                          }
                        }
                      }
                    },
                    cache: {
                      name: 'cache',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 17:40',
                      children: {
                        'notified_today.json': {
                          name: 'notified_today.json',
                          type: 'file',
                          size: '340 B',
                          permissions: '-rw-r--r--',
                          updated: 'Oct 24 17:40',
                          content: `{\n  "date": "2026-10-24",\n  "processed_uids": ["10482", "10483", "10489"],\n  "last_synced_utc": "2026-10-24T18:00:12Z"\n}`
                        }
                      }
                    },
                    src: {
                      name: 'src',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 17:45',
                      children: {
                        'classifier.py': {
                          name: 'classifier.py',
                          type: 'file',
                          size: '2.3 KB',
                          permissions: '-rw-r--r--',
                          updated: 'Oct 24 17:45',
                          content: `import google.generativeai as genai\nfrom pydantic import BaseModel, Field\nfrom typing import Literal\n\nclass EmailClassification(BaseModel):\n    intent: Literal["interview_invitation", "recruiter_reachout", "rejection", "application_ack", "unrelated"]\n    company: str\n    urgency: Literal["high", "normal", "low"]\n    action_required: str\n    summary: str\n\ndef classify_email(sender: str, subject: str, body: str) -> EmailClassification:\n    model = genai.GenerativeModel('gemini-2.0-flash')\n    prompt = f"Classify this email:\\nFrom: {sender}\\nSubject: {subject}\\nBody:\\n{body[:2000]}"\n    res = model.generate_content(prompt)\n    return EmailClassification.model_validate_json(res.text)`
                        },
                        'notifier.py': {
                          name: 'notifier.py',
                          type: 'file',
                          size: '1.9 KB',
                          permissions: '-rw-r--r--',
                          updated: 'Oct 24 17:42',
                          content: `import os\nimport requests\n\ndef send_telegram_alert(classification, sender, subject):\n    token = os.getenv("TELEGRAM_BOT_TOKEN")\n    chat_id = os.getenv("TELEGRAM_CHAT_ID")\n    msg = f"🎯 *Recruiter Alert: {classification.company}*\\n" \\\n          f"📌 *Intent:* {classification.intent}\\n" \\\n          f"⚡ *Urgency:* {classification.urgency}\\n" \\\n          f"📝 *Summary:* {classification.summary}\\n" \\\n          f"📧 *From:* \`{sender}\`"\n    url = f"https://api.telegram.org/bot{token}/sendMessage"\n    requests.post(url, json={"chat_id": chat_id, "text": msg, "parse_mode": "Markdown"})`
                        }
                      }
                    },
                    terraform: {
                      name: 'terraform',
                      type: 'dir',
                      permissions: 'drwxr-xr-x',
                      updated: 'Oct 24 17:45',
                      children: {
                        '00-bootstrap': {
                          name: '00-bootstrap',
                          type: 'dir',
                          permissions: 'drwxr-xr-x',
                          updated: 'Oct 24 17:45',
                          children: {
                            'main.tf': {
                              name: 'main.tf',
                              type: 'file',
                              size: '860 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:45',
                              content: `data "github_repository" "agent" {
  name = var.github_repository
}

resource "github_actions_secret" "imap_user" {
  repository       = data.github_repository.agent.name
  secret_name      = "IMAP_USER"
  plaintext_value  = var.imap_user
}

resource "github_actions_secret" "imap_pass" {
  repository       = data.github_repository.agent.name
  secret_name      = "IMAP_PASS"
  plaintext_value  = var.imap_pass
}

resource "github_actions_secret" "gemini_api_key" {
  repository       = data.github_repository.agent.name
  secret_name      = "GEMINI_API_KEY"
  plaintext_value  = var.gemini_api_key
}

resource "github_actions_secret" "telegram_bot_token" {
  repository       = data.github_repository.agent.name
  secret_name      = "TELEGRAM_BOT_TOKEN"
  plaintext_value  = var.telegram_bot_token
}

resource "github_actions_secret" "telegram_chat_id" {
  repository       = data.github_repository.agent.name
  secret_name      = "TELEGRAM_CHAT_ID"
  plaintext_value  = var.telegram_chat_id
}`
                            },
                            'variables.tf': {
                              name: 'variables.tf',
                              type: 'file',
                              size: '640 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:42',
                              content: `variable "github_repository" {\n  type = string\n  default = "ai-job-email-agent"\n}\n\nvariable "imap_user" { type = string }\nvariable "imap_pass" { type = string }\nvariable "gemini_api_key" { type = string }\nvariable "telegram_bot_token" { type = string }\nvariable "telegram_chat_id" { type = string }`
                            },
                            'terraform.tfvars': {
                              name: 'terraform.tfvars',
                              type: 'file',
                              size: '220 B',
                              permissions: '-rw-r--r--',
                              updated: 'Oct 24 17:40',
                              content: `github_repository = "ai-job-email-agent"\nimap_user         = "zetsamson@gmail.com"\ntelegram_chat_id  = "718920491"`
                            }
                          }
                        }
                      }
                    },
                    'main.py': {
                      name: 'main.py',
                      type: 'file',
                      size: '3.6 KB',
                      permissions: '-rwxr-xr-x',
                      updated: 'Oct 24 17:55',
                      content: `import os
import imaplib
import email
import json
import requests
import google.generativeai as genai
from datetime import datetime, timezone
from src.classifier import classify_email
from src.notifier import send_telegram_alert

NOTIFIED_CACHE = "cache/notified_today.json"

def load_notified_cache():
    if not os.path.exists(NOTIFIED_CACHE):
        return {"date": "", "processed_uids": []}
    with open(NOTIFIED_CACHE, "r") as f:
        data = json.load(f)
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    if data.get("date") != today:
        return {"date": today, "processed_uids": []}
    return data

def run_agent():
    EMAIL_USER = os.getenv("IMAP_USER")
    EMAIL_PASS = os.getenv("IMAP_PASS")
    GEMINI_KEY = os.getenv("GEMINI_API_KEY")

    genai.configure(api_key=GEMINI_KEY)
    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login(EMAIL_USER, EMAIL_PASS)
    mail.select("INBOX")
    
    status, messages = mail.search(None, '(UNSEEN)')
    unread_ids = messages[0].split()
    print(f"Discovered {len(unread_ids)} unread email messages.")

if __name__ == '__main__':
    run_agent()`
                    },
                    'requirements.txt': {
                      name: 'requirements.txt',
                      type: 'file',
                      size: '120 B',
                      permissions: '-rw-r--r--',
                      updated: 'Oct 24 17:40',
                      content: `google-generativeai>=0.8.0\npython-dotenv>=1.0.1\nrequests>=2.32.0`
                    },
                    'README.md': {
                      name: 'README.md',
                      type: 'file',
                      size: '1.4 KB',
                      permissions: '-rw-r--r--',
                      updated: 'Oct 24 17:35',
                      content: `# Autonomous Job Email Agent\nEvent-driven serverless background automation running on scheduled GitHub Actions cloud runners. Connects to Gmail over IMAP, extracts recruiter communications, executes Gemini 2.0 Flash intent extraction, and sends real-time Telegram alerts.`
                    }
                  }
                }
              }
            },
            'about.txt': {
              name: 'about.txt',
              type: 'file',
              size: '980 B',
              permissions: '-rw-r--r--',
              updated: 'Oct 24 18:10',
              content: `ZET DONAUE SAMSON (fauxx)
==============================================
Role: Systems & Cloud DevOps Engineer
Focus: Cloud-Native Infrastructure, GitOps, Kubernetes, IaC
Location: Pasig City, Metro Manila • UTC+8
Email: zetsamson@gmail.com
Web: https://fauxx.is-a.dev

Engineering Pillars:
- Modular 4-Stage Infrastructure as Code (Terraform on GCP/Azure)
- Automated Continuous Delivery & GitOps (ArgoCD, Kustomize v5)
- Zero-Trust Security (PSS Restricted, Non-Root, Cloudflare Tunnels)
- High-Throughput Ingestion (MQTT Mosquitto, InfluxDB, PostgreSQL)
- Applied Generative AI (Gemini 2.0 Flash, Pydantic Schema Validation)`
            },
            'notes.txt': {
              name: 'notes.txt',
              type: 'file',
              size: '420 B',
              permissions: '-rw-r--r--',
              updated: 'Oct 24 18:20',
              content: `[Cluster Status Notes]
- GKE primary dev cluster: healthy, 2 nodes running Container-Optimized OS
- ArgoCD root app: synchronized with main branch
- Mosquitto MQTT: port 1883 TCP and 9001 WS active
- InfluxDB retention policy: 30 days rolling on node_telemetry bucket`
            },
            '.bashrc': {
              name: '.bashrc',
              type: 'file',
              size: '520 B',
              permissions: '-rw-r--r--',
              updated: 'Oct 24 18:05',
              content: `# Workstation Aliases
alias k='kubectl'
alias tf='terraform'
alias ll='ls -la'
alias fms='inspect fire-monitoring'
alias jf='inspect jobflow'
alias ag='inspect email-agent'
alias gitstat='gh repo list'`
            }
          }
        }
      }
    },
    etc: {
      name: 'etc',
      type: 'dir',
      permissions: 'drwxr-xr-x',
      updated: 'Oct 25 12:00',
      children: {
        'os-release': {
          name: 'os-release',
          type: 'file',
          size: '348 B',
          permissions: '-rw-r--r--',
          updated: 'Oct 25 12:00',
          content: `NAME="Fedora Linux"\nVERSION="41 (Workstation Edition)"\nID=fedora\nVERSION_ID=41\nPLATFORM_ID="platform:f41"\nPRETTY_NAME="Fedora Linux 41 (Workstation Edition)"\nANSI_COLOR="0;38;2;60;110;180"\nLOGO=fedora-logo-icon\nCPE_NAME="cpe:/o:fedoraproject:fedora:41"\nHOME_URL="https://fedoraproject.org/"`
        },
        'fedora-release': {
          name: 'fedora-release',
          type: 'file',
          size: '34 B',
          permissions: '-rw-r--r--',
          updated: 'Oct 25 12:00',
          content: 'Fedora release 41 (Workstation Edition)'
        }
      }
    }
  }
};

/**
 * Resolves a given path string against the virtual filesystem.
 * Handles '.', '..', '~', and relative / absolute paths.
 */
export function resolveVFSPath(
  currentPath: string[],
  target: string,
  root: VNode
): { node: VNode | null; path: string[]; error?: string } {
  const trimmed = target.trim();
  let workingPath = [...currentPath];

  if (!trimmed || trimmed === '.') {
    // Current directory: keep workingPath
  } else if (trimmed === '~') {
    workingPath = ['home', 'fauxx'];
  } else if (trimmed === '/') {
    workingPath = [];
  } else if (trimmed.startsWith('~/')) {
    workingPath = ['home', 'fauxx', ...trimmed.slice(2).split('/').filter(Boolean)];
  } else if (trimmed.startsWith('/')) {
    workingPath = trimmed.split('/').filter(Boolean);
  } else {
    // Relative path
    const parts = trimmed.split('/').filter(Boolean);
    for (const part of parts) {
      if (part === '.') {
        continue;
      } else if (part === '..') {
        if (workingPath.length > 0) {
          workingPath.pop();
        }
      } else {
        workingPath.push(part);
      }
    }
  }

  // Walk from root to find node
  let curr: VNode = root;
  for (const seg of workingPath) {
    if (!curr.children || !curr.children[seg]) {
      return { node: null, path: workingPath, error: `No such file or directory: ${target}` };
    }
    curr = curr.children[seg];
  }

  return { node: curr, path: workingPath };
}

/**
 * Formats a directory path array into display format (e.g. ~/projects).
 */
export function formatVFSPath(path: string[]): string {
  if (path.length >= 2 && path[0] === 'home' && path[1] === 'fauxx') {
    const rel = path.slice(2);
    return rel.length === 0 ? '~' : `~/${rel.join('/')}`;
  }
  return `/${path.join('/')}`;
}

export interface TreeItem {
  prefix: string;
  name: string;
  filePath?: string;
  type: VNodeType;
  isExecutable?: boolean;
}

export interface TreeResult {
  items: TreeItem[];
  dirCount: number;
  fileCount: number;
}

/**
 * Generates structured directory tree items for a VNode.
 * Traverses directories and files unless constrained by maxDepth or dirOnly.
 */
export function generateTree(
  node: VNode,
  prefix = '',
  maxDepth = 12,
  currentDepth = 0,
  pathSoFar = '',
  dirOnly = false
): TreeResult {
  let dirCount = 0;
  let fileCount = 0;
  const items: TreeItem[] = [];

  if (!node.children || currentDepth >= maxDepth) {
    return { items, dirCount, fileCount };
  }

  const allEntries = Object.values(node.children);
  const entries = dirOnly ? allEntries.filter((e) => e.type === 'dir') : allEntries;
  entries.sort((a, b) => {
    // Directories first, then alphabetical
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  entries.forEach((item, index) => {
    const isLast = index === entries.length - 1;
    const branch = isLast ? '└── ' : '├── ';
    const childPrefix = isLast ? '    ' : '│   ';
    const currentPath = pathSoFar ? `${pathSoFar}/${item.name}` : item.name;

    if (item.type === 'dir') {
      dirCount++;
      items.push({
        prefix: `${prefix}${branch}`,
        name: `${item.name}/`,
        filePath: currentPath,
        type: 'dir'
      });
      const sub = generateTree(item, prefix + childPrefix, maxDepth, currentDepth + 1, currentPath, dirOnly);
      items.push(...sub.items);
      dirCount += sub.dirCount;
      fileCount += sub.fileCount;
    } else if (!dirOnly) {
      fileCount++;
      const isExec = item.permissions?.includes('x');
      items.push({
        prefix: `${prefix}${branch}`,
        name: item.name,
        filePath: currentPath,
        type: 'file',
        isExecutable: isExec
      });
    }
  });

  return { items, dirCount, fileCount };
}

export const BASE_COMMANDS = [
  'help',
  'projects',
  'ls',
  'ls -la',
  'tree',
  'tree -d',
  'tree -L 2',
  'tree -L 3',
  'tree -d -L 2',
  'tree apps',
  'tree -d apps',
  'tree infrastructure/k8s',
  'tree -d infrastructure/k8s',
  'tree infrastructure/terraform',
  'tree -d infrastructure/terraform',
  'tree build',
  'tree docs',
  'tree FireMonitoringSystem',
  'tree -d FireMonitoringSystem',
  'tree jobflow',
  'tree ai-job-email-agent',
  'pwd',
  'cd',
  'cd ..',
  'cd projects',
  'cd FireMonitoringSystem',
  'cd jobflow',
  'cd ai-job-email-agent',
  'cat README.md',
  'cat about.txt',
  'cat .bashrc',
  'cat resume',
  'cat /etc/os-release',
  'fastfetch',
  'neofetch',
  'hostnamectl',
  'dnf',
  'cat infrastructure/terraform/environments/gke-dev/00-bootstrap/terraform.tfvars',
  'cat infrastructure/terraform/environments/gke-dev/01-infra/terraform.tfvars',
  'cat infrastructure/k8s/overlays/dev/kustomization.yaml',
  'cat infrastructure/k8s/base/apps/api-deployment.yaml',
  'cat apps/simulators/mcu_sim.py',
  'cat docker-compose.yml',
  'cat requirements.txt',
  'cat src/services/gemini_llm.py',
  'cat src/services/playwright_scraper.py',
  'cat src/routers/resume_tailor.py',
  'cat templates/resume_print.html',
  'cat frontend/src/ResumeStudio.tsx',
  'cat cache/notified_today.json',
  'cat src/classifier.py',
  'cat src/notifier.py',
  'cat .github/workflows/agent.yml',
  'cat terraform/00-bootstrap/main.tf',
  'cat terraform/00-bootstrap/terraform.tfvars',
  'clear',
  'exit',
  'whoami',
  'uname -a',
  'date',
  'status',
  'fms status',
  'jobflow status',
  'agent status',
  'firectl status',
  'kubectl get pods',
  'kubectl get pods -n fire-monitoring-dev',
  'kubectl get svc',
  'kubectl get ingress',
  'argocd app list',
  'terraform state list',
  'docker ps',
  'gh run list',
  'gh auth status',
  'inspect fire-monitoring',
  'inspect jobflow',
  'inspect email-agent',
  'curl -s /telemetry/stream'
];

export interface SegmentItem {
  name: string;
  desc: string;
  fileInspect?: string;
}

export interface RepoSegment {
  segmentName: string;
  badge: string;
  color: string;
  summary: string;
  items: SegmentItem[];
}

export interface ProjectTreeArchitecture {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  segments: RepoSegment[];
}

export const PROJECT_SEGMENTED_TREES: Record<string, ProjectTreeArchitecture> = {
  'fire-monitoring': {
    id: 'fire-monitoring',
    name: 'FireMonitoringSystem',
    subtitle: 'Production Cloud IoT & Telemetry Platform',
    description: 'Segmented microservice architecture on Azure AKS with 4-stage Terraform IaC and ArgoCD GitOps.',
    segments: [
      {
        segmentName: 'apps/',
        badge: 'MICROSERVICES & SIMULATORS (3-LEVEL TIER)',
        color: '#38bdf8',
        summary: 'Application tier handling live sensor telemetry, WebGL map rendering, and ingestion ETL',
        items: [
          { name: 'apps/api/', desc: 'Express / TypeScript InfluxDB query & telemetry broker API (Dockerfile, package.json, src/server.js)', fileInspect: 'apps/api/Dockerfile' },
          { name: 'apps/dashboard/', desc: 'React 19 + MapLibre WebGL 3D live canvas (Dockerfile, nginx.conf, vite.config.ts, src/App.tsx)', fileInspect: 'apps/dashboard/vite.config.ts' },
          { name: 'apps/db-migrations/', desc: 'Flyway SQL schema migrations (Dockerfile, sql/V1__Initial_Schema.sql, sql/V17__Seed.sql)', fileInspect: 'apps/db-migrations/sql/V1__Initial_Schema.sql' },
          { name: 'apps/etl-processor/', desc: 'Python Pandas anomaly scoring & 10s aggregation (Dockerfile, requirements.txt, src/main.py)', fileInspect: 'apps/etl-processor/src/main.py' },
          { name: 'apps/simulators/', desc: 'MQTT IoT sensor emulator fleet (Dockerfile, requirements.txt, mcu_sim.py)', fileInspect: 'apps/simulators/mcu_sim.py' }
        ]
      },
      {
        segmentName: 'infrastructure/k8s/',
        badge: '☸️ KUBERNETES MANIFESTS (BASE & OVERLAYS)',
        color: '#10b981',
        summary: 'Kustomize v5 multi-tier workload definitions with Zero-Trust ingress',
        items: [
          { name: 'infrastructure/k8s/base/apps/', desc: 'kustomization.yaml, api-deployment.yaml, dashboard-deployment.yaml, etl-deployment.yaml', fileInspect: 'infrastructure/k8s/base/apps/api-deployment.yaml' },
          { name: 'infrastructure/k8s/base/data/', desc: 'kustomization.yaml, mqtt-statefulset.yaml, influxdb-statefulset.yaml', fileInspect: 'infrastructure/k8s/base/data/mqtt-statefulset.yaml' },
          { name: 'infrastructure/k8s/base/db/', desc: 'kustomization.yaml, statefulset.yaml, service.yaml, secrets.yaml, configmap.yaml', fileInspect: 'infrastructure/k8s/base/db/statefulset.yaml' },
          { name: 'infrastructure/k8s/base/networking/', desc: 'cloudflared-deployment.yaml, ingress.yaml (Cloudflare zero-trust edge)', fileInspect: 'infrastructure/k8s/base/networking/ingress.yaml' },
          { name: 'infrastructure/k8s/overlays/dev/', desc: 'kustomization.yaml, dev-public.env, ingress-patch.yaml, mqtt-service-patch.yaml, secrets.yaml', fileInspect: 'infrastructure/k8s/overlays/dev/kustomization.yaml' },
          { name: 'infrastructure/k8s/overlays/prod/', desc: 'kustomization.yaml, prod-public.env, api-replicas-patch.yaml, dashboard-replicas-patch.yaml' },
          { name: 'infrastructure/k8s/NETWORKING_SETUP.md', desc: 'Calico Zero-Trust NetworkPolicies & in-cluster Cloudflare Tunnels guide', fileInspect: 'infrastructure/k8s/NETWORKING_SETUP.md' }
        ]
      },
      {
        segmentName: 'infrastructure/terraform/',
        badge: '🏗️ 4-STAGE MODULAR IAC (DEV & PROD ENVIRONMENTS)',
        color: '#f59e0b',
        summary: 'Isolated state stages with typed variables and environment terraform.tfvars',
        items: [
          { name: 'environments/gke-dev/00-bootstrap/', desc: 'Remote state GCS bucket & OIDC Workload Identity (main.tf, variables.tf, terraform.tfvars)', fileInspect: 'infrastructure/terraform/environments/gke-dev/00-bootstrap/terraform.tfvars' },
          { name: 'environments/gke-dev/01-infra/', desc: 'Private GKE cluster, custom VPC & Cloud SQL Postgres (main.tf, gke.tf, vpc.tf, sql.tf, terraform.tfvars)', fileInspect: 'infrastructure/terraform/environments/gke-dev/01-infra/terraform.tfvars' },
          { name: 'environments/gke-dev/02-platform/', desc: 'cert-manager Let\'s Encrypt SSL & Cloudflare DNS (main.tf, cert-manager.tf, cloudflare.tf, terraform.tfvars)', fileInspect: 'infrastructure/terraform/environments/gke-dev/02-platform/terraform.tfvars' },
          { name: 'environments/gke-dev/03-argocd/', desc: 'ArgoCD GitOps root application controller bootstrap (main.tf, root-app.tf, terraform.tfvars)', fileInspect: 'infrastructure/terraform/environments/gke-dev/03-argocd/terraform.tfvars' },
          { name: 'environments/gke-prod/', desc: 'Production stage mirrors with multi-zone HA and automated terraform.tfvars values' },
          { name: 'backend-gcp-common.conf', desc: 'Common remote state backend configuration', fileInspect: 'infrastructure/terraform/backend-gcp-common.conf' }
        ]
      },
      {
        segmentName: 'build/ & docs/',
        badge: 'BUILD SYSTEM & GOVERNANCE',
        color: '#c084fc',
        summary: 'Kind multi-node local cluster, docker-compose, and Architectural Decision Records',
        items: [
          { name: 'build/local/', desc: 'kind-config.yaml (multi-node), docker-compose.local.yml, argocd-apps-dev.yaml', fileInspect: 'build/local/kind-config.yaml' },
          { name: 'docs/ADR/', desc: '0001-adoption-of-gitops.md (ArgoCD), 0002-zero-trust-networking.md (Cloudflare Tunnels)', fileInspect: 'docs/ADR/0001-adoption-of-gitops.md' },
          { name: 'docs/architecture/', desc: '01-gcp-gke.md, 02-kubernetes.md, 04-observability.md' },
          { name: 'Makefile', desc: 'Lifecycle commands (make up, make down, make bootstrap, make test)', fileInspect: 'Makefile' }
        ]
      }
    ]
  },
  'jobflow': {
    id: 'jobflow',
    name: 'jobflow',
    subtitle: 'AI Job Application Tracking & ATS Resume Studio',
    description: 'Full-stack AI automation studio with Pydantic JSON schemas, Playwright cookie scrapers, and ATS PDF rendering.',
    segments: [
      {
        segmentName: 'src/',
        badge: 'CORE BACKEND & GENAI ENGINE',
        color: '#38bdf8',
        summary: 'FastAPI asynchronous backend, database ORM, and AI services',
        items: [
          { name: 'src/core/', desc: 'PostgreSQL database engine, connection pooling & Pydantic settings' },
          { name: 'src/models/', desc: 'SQLAlchemy models: Job, User, Resume, Application records' },
          { name: 'src/routers/', desc: 'FastAPI asynchronous endpoints (/api/jobs, /api/tailor, /api/scrape)' },
          { name: 'src/services/gemini_llm.py', desc: 'Gemini 2.0 Flash structured JSON extraction & tailor engine', fileInspect: 'src/services/gemini_llm.py' },
          { name: 'src/services/playwright_scraper.py', desc: 'Browser session cookie injection bypassing LinkedIn login walls' }
        ]
      },
      {
        segmentName: 'frontend/',
        badge: 'RESUME STUDIO & DASHBOARD',
        color: '#10b981',
        summary: 'Client interface with real-time draft tailoring and Kanban application lanes',
        items: [
          { name: 'frontend/src/', desc: 'Interactive Resume Studio, Master Profile manager, and A4 PDF preview modal' }
        ]
      },
      {
        segmentName: 'templates/',
        badge: 'ATS PRINT ENGINE',
        color: '#f59e0b',
        summary: 'Typographically constrained A4 PDF layouts for ATS scanners',
        items: [
          { name: 'templates/resume_print.html', desc: 'Pixel-perfect print-ready template with dynamic overflow detection' }
        ]
      },
      {
        segmentName: 'alembic/ & compose',
        badge: 'PERSISTENCE & DEPLOYMENT',
        color: '#c084fc',
        summary: 'Database version control and multi-container local runtime',
        items: [
          { name: 'alembic/versions/', desc: 'Incremental schema migrations for PostgreSQL 16' },
          { name: 'docker-compose.yml', desc: 'FastAPI + PostgreSQL 16 local orchestration', fileInspect: 'docker-compose.yml' }
        ]
      }
    ]
  },
  'ai-job-email-agent': {
    id: 'ai-job-email-agent',
    name: 'ai-job-email-agent',
    subtitle: 'Autonomous Recruiter Radar & Push Bot',
    description: 'Serverless event-driven background automation on scheduled GitHub Actions cloud runners.',
    segments: [
      {
        segmentName: '.github/workflows/',
        badge: 'SERVERLESS WORKFLOW RUNNER',
        color: '#38bdf8',
        summary: 'Automated cron scheduling without persistent server costs ($0/mo)',
        items: [
          { name: '.github/workflows/agent.yml', desc: 'Cron (0 */2 * * *), Python 3.10 setup, cache restoration & execution', fileInspect: '.github/workflows/agent.yml' }
        ]
      },
      {
        segmentName: 'terraform/',
        badge: 'ZERO-TRUST SECRETS IAC',
        color: '#10b981',
        summary: 'Declarative secrets provisioning into GitHub Encrypted Secrets',
        items: [
          { name: 'terraform/00-bootstrap/main.tf', desc: 'Integrations/github provider encrypting IMAP & Gemini secrets via Libsodium', fileInspect: 'terraform/00-bootstrap/main.tf' },
          { name: 'terraform/00-bootstrap/variables.tf', desc: 'Typed input variables for credentials' }
        ]
      },
      {
        segmentName: 'cache/',
        badge: 'IDEMPOTENCY LAYER',
        color: '#f59e0b',
        summary: 'State persistence layer across ephemeral runner instances',
        items: [
          { name: 'cache/notified_today.json', desc: 'Daily UID deduplication cache preventing duplicate Telegram alerts' }
        ]
      },
      {
        segmentName: 'core scripts',
        badge: 'LLM CLASSIFICATION & DISPATCH',
        color: '#c084fc',
        summary: 'IMAP protocol handler, Gemini intent parser, and Telegram Bot pusher',
        items: [
          { name: 'main.py', desc: 'IMAP4 SSL email reader, Gemini 2.0 Flash intent classification & Telegram alert sender', fileInspect: 'main.py' },
          { name: 'requirements.txt', desc: 'Minimal Python dependencies (google-generativeai, requests, python-dotenv)' }
        ]
      }
    ]
  }
};
