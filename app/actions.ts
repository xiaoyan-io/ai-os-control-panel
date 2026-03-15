'use server';

import { addInstance, addLog } from '@/lib/db';
import { Instance } from '@/lib/mock-data';
import { revalidatePath } from 'next/cache';

export async function deployInstanceAction(formData: FormData) {
  const id = `inst-${Math.random().toString(36).substring(2, 9)}`;
  const templateId = formData.get('template') as string;
  const nodeName = formData.get('nodeName') as string;
  const workspacePath = formData.get('workspacePath') as string;
  
  const newInstance: Instance = {
    id,
    name: workspacePath.split('/').pop() || 'New Instance',
    templateId,
    category: formData.get('category') as string,
    node: nodeName,
    status: 'Installing',
    updatedAt: new Date().toISOString(),
    workspacePath,
    companyName: formData.get('companyName') as string,
    familyName: formData.get('familyName') as string,
    baseUrl: formData.get('baseUrl') as string,
  };

  await addInstance(newInstance);
  
  await addLog({
    id: `log-${Date.now()}`,
    instanceId: id,
    timestamp: new Date().toISOString(),
    level: 'INFO',
    message: `Provisioning started for ${newInstance.name} on ${nodeName}`
  });

  revalidatePath('/instances');
  revalidatePath('/');

  return newInstance;
}
