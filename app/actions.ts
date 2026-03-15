'use server';

import { addInstance, addLog, updateInstanceStatus } from '@/lib/db';
import { Instance, DeploymentLog } from '@/lib/mock-data';
import { revalidatePath } from 'next/cache';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const AI_OS_HUB_PATH = process.env.AI_OS_HUB_PATH || '/root/ai-os-hub';

async function runInstaller(instance: Instance): Promise<void> {
  const { id, node, workspacePath, templateId, baseUrl, config } = instance;
  
  // Build command
  const category = getCategoryForTemplate(templateId);
  const args = [
    'bash', `${AI_OS_HUB_PATH}/installers/install-os.sh`,
    '--category', category,
    '--os', templateId,
    '--workspace', workspacePath,
    '--node', node,
    '--skip-openclaw',
  ];
  
  if (config?.companyName) args.push('--company-name', config.companyName);
  if (config?.familyName) args.push('--family-name', config.familyName);
  if (config?.language) args.push('--language', config.language);
  if (baseUrl) args.push('--base-url', baseUrl);
  
  await addLog({
    id: `log-${Date.now()}-${Math.random()}`,
    instanceId: id,
    timestamp: new Date().toISOString(),
    level: 'INFO',
    message: `Executing: ${args.join(' ')}`
  });
  
  try {
    const { stdout, stderr } = await execAsync(args.join(' '), { timeout: 300000 });
    
    if (stdout) {
      await addLog({
        id: `log-${Date.now()}-out`,
        instanceId: id,
        timestamp: new Date().toISOString(),
        level: 'INFO',
        message: `Output: ${stdout.substring(0, 500)}`
      });
    }
    
    if (stderr) {
      await addLog({
        id: `log-${Date.now()}-err`,
        instanceId: id,
        timestamp: new Date().toISOString(),
        level: 'WARN',
        message: `Stderr: ${stderr.substring(0, 500)}`
      });
    }
    
    await updateInstanceStatus(id, 'running');
    await addLog({
      id: `log-${Date.now()}-done`,
      instanceId: id,
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message: `Deployment completed successfully`
    });
    
  } catch (error: any) {
    await updateInstanceStatus(id, 'failed');
    await addLog({
      id: `log-${Date.now()}-fail`,
      instanceId: id,
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message: `Deployment failed: ${error.message}`
    });
  }
}

function getCategoryForTemplate(templateId: string): string {
  const map: Record<string, string> = {
    'boss-secretary-os': 'company',
    'alan-boss-os': 'company',
    'chat-sales-os': 'sales',
    'alan-sales-os': 'sales',
    'site-report-os': 'construction',
    'personal-os': 'personal',
    'alan-personal-os': 'personal',
    'family-care-os': 'personal',
    'alan-family-care-os': 'personal',
  };
  return map[templateId] || 'personal';
}

export async function deployInstanceAction(formData: FormData) {
  const id = `inst-${Math.random().toString(36).substring(2, 9)}`;
  const templateId = formData.get('template') as string;
  const nodeName = formData.get('nodeName') as string;
  const workspacePath = formData.get('workspacePath') as string;
  
  const config = {
    companyName: formData.get('companyName') as string,
    familyName: formData.get('familyName') as string,
    apiKey: formData.get('apiKey') as string,
    language: 'en',
  };
  
  const baseUrl = formData.get('baseUrl') as string;
  
  const newInstance: Instance = {
    id,
    name: workspacePath.split('/').pop() || 'New Instance',
    templateId,
    category: getCategoryForTemplate(templateId),
    node: nodeName,
    status: 'Installing',
    updatedAt: new Date().toISOString(),
    workspacePath,
    companyName: config.companyName,
    familyName: config.familyName,
    baseUrl,
    config,
  };
  
  await addInstance(newInstance);
  
  await addLog({
    id: `log-${Date.now()}-start`,
    instanceId: id,
    timestamp: new Date().toISOString(),
    level: 'INFO',
    message: `Deployment initiated for ${newInstance.name} on ${nodeName}`
  });
  
  revalidatePath('/instances');
  revalidatePath('/');
  
  // Run installer in background (non-blocking for now)
  // In production, use a job queue like Bull or simple setTimeout
  setTimeout(() => runInstaller(newInstance), 100);
  
  return newInstance;
}
