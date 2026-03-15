import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface RegistryTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  version: string;
  status: 'Stable' | 'Beta' | 'Experimental' | string;
  tags: string[];
  includedRoles: string[];
  requiredInputs: string[];
  optionalInputs: string[];
}

export interface Registry {
  templates: RegistryTemplate[];
}

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/xiaoyan-io/ai-os-hub/master/registry.yaml';

async function fetchFromGitHub(): Promise<Registry | null> {
  try {
    const response = await fetch(GITHUB_RAW_URL, { 
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    if (!response.ok) {
      console.warn(`[Registry] GitHub fetch failed: ${response.status}`);
      return null;
    }
    const text = await response.text();
    const data = yaml.load(text) as Registry;
    console.log(`[Registry] Loaded ${data.templates?.length || 0} templates from GitHub`);
    return data;
  } catch (error) {
    console.warn('[Registry] GitHub fetch error:', error);
    return null;
  }
}

function loadLocalRegistry(): Registry {
  const filePath = path.join(process.cwd(), 'registry.yaml');
  if (!fs.existsSync(filePath)) {
    throw new Error(`Registry file not found: ${filePath}`);
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContents) as Registry;
}

export async function getRegistry(): Promise<Registry> {
  // Try GitHub first
  const githubData = await fetchFromGitHub();
  if (githubData && githubData.templates) {
    return githubData;
  }
  
  // Fallback to local file
  console.log('[Registry] Using local registry.yaml');
  return loadLocalRegistry();
}

export async function getTemplates(): Promise<RegistryTemplate[]> {
  const registry = await getRegistry();
  return registry.templates;
}

export async function getTemplateById(id: string): Promise<RegistryTemplate | undefined> {
  const templates = await getTemplates();
  return templates.find(t => t.id === id);
}
