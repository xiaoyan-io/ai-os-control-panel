export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  version: string;
  status: 'Stable' | 'Beta' | 'Deprecated';
  includedRoles: string[];
  requiredInputs: string[];
  optionalInputs: string[];
  smokeTests: string[];
}

export type InstanceStatus = 'Ready' | 'Installing' | 'Failed' | 'Needs Attention';

export interface Instance {
  id: string;
  name: string;
  templateId: string;
  category: string;
  node: string;
  status: InstanceStatus;
  updatedAt: string;
  workspacePath: string;
  companyName?: string;
  familyName?: string;
  baseUrl: string;
}

export const mockInstances: Instance[] = [
  {
    id: 'inst-001',
    name: 'Acme Exec Assistant',
    templateId: 'tpl-boss-sec',
    category: 'Company',
    node: 'SG-Node-01',
    status: 'Ready',
    updatedAt: '2026-03-15T06:30:00Z',
    workspacePath: '/opt/ai-os/acme-exec',
    companyName: 'Acme Corp',
    baseUrl: 'https://exec.acme.com'
  },
  {
    id: 'inst-002',
    name: 'Global Sales Bot',
    templateId: 'tpl-chat-sales',
    category: 'Sales',
    node: 'V6-Cluster-A',
    status: 'Needs Attention',
    updatedAt: '2026-03-14T18:45:00Z',
    workspacePath: '/opt/ai-os/global-sales',
    companyName: 'Global Tech',
    baseUrl: 'https://sales.globaltech.com'
  },
  {
    id: 'inst-003',
    name: 'Downtown Build Site',
    templateId: 'tpl-site-report',
    category: 'Construction',
    node: 'Pi5-Edge-04',
    status: 'Installing',
    updatedAt: '2026-03-15T07:05:00Z',
    workspacePath: '/opt/ai-os/downtown-site',
    companyName: 'BuildRight Construction',
    baseUrl: 'https://downtown.buildright.com'
  },
  {
    id: 'inst-004',
    name: 'Smith Family Hub',
    templateId: 'tpl-family-care',
    category: 'Family Care',
    node: 'PVE-Home-Lab',
    status: 'Ready',
    updatedAt: '2026-03-10T12:00:00Z',
    workspacePath: '/opt/ai-os/smith-family',
    familyName: 'Smith',
    baseUrl: 'https://home.smithfamily.net'
  }
];

export interface DeploymentLog {
  id: string;
  instanceId?: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

export const mockLogs: DeploymentLog[] = [
  { id: 'log-1', timestamp: '2026-03-15T07:00:01Z', level: 'INFO', message: 'Initializing deployment sequence...' },
  { id: 'log-2', timestamp: '2026-03-15T07:00:05Z', level: 'INFO', message: 'Pulling template from GitHub registry...' },
  { id: 'log-3', timestamp: '2026-03-15T07:00:12Z', level: 'INFO', message: 'Provisioning workspace at /opt/ai-os/downtown-site' },
  { id: 'log-4', timestamp: '2026-03-15T07:00:45Z', level: 'WARN', message: 'Procore Integration Key not provided, skipping module.' },
  { id: 'log-5', timestamp: '2026-03-15T07:01:10Z', level: 'INFO', message: 'Running shell installers...' },
  { id: 'log-6', timestamp: '2026-03-15T07:05:00Z', level: 'INFO', message: 'Executing persona alignment checks...' }
];

export interface SmokeTestResult {
  id: string;
  testName: string;
  status: 'Passed' | 'Failed' | 'Pending';
  durationMs: number;
}

export const mockSmokeTests: SmokeTestResult[] = [
  { id: 'st-1', testName: 'API Connectivity', status: 'Passed', durationMs: 120 },
  { id: 'st-2', testName: 'Database Read/Write', status: 'Passed', durationMs: 45 },
  { id: 'st-3', testName: 'Persona Alignment', status: 'Passed', durationMs: 850 },
  { id: 'st-4', testName: 'External Webhook', status: 'Failed', durationMs: 5000 }
];
