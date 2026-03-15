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
  smokeTests: string[];
}

export interface Registry {
  templates: RegistryTemplate[];
}

export async function getRegistry(): Promise<Registry> {
  // In the future, this can be replaced with a fetch() to a raw GitHub URL
  // const response = await fetch('https://raw.githubusercontent.com/your-org/ai-os-hub/main/registry.yaml');
  // const fileContents = await response.text();
  
  const filePath = path.join(process.cwd(), 'registry.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  const data = yaml.load(fileContents) as Registry;
  return data;
}

export async function getTemplates(): Promise<RegistryTemplate[]> {
  const registry = await getRegistry();
  return registry.templates;
}

export async function getTemplateById(id: string): Promise<RegistryTemplate | undefined> {
  const templates = await getTemplates();
  return templates.find(t => t.id === id);
}