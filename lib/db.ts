import { Instance, DeploymentLog } from './mock-data';

// Use global to persist across hot reloads in dev
const globalAny: any = global;
if (!globalAny.__db) {
  globalAny.__db = {
    instances: [],
    logs: []
  };
}

export async function getInstances(): Promise<Instance[]> {
  return globalAny.__db.instances;
}

export async function getInstanceById(id: string): Promise<Instance | undefined> {
  return globalAny.__db.instances.find((i: Instance) => i.id === id);
}

export async function addInstance(instance: Instance) {
  globalAny.__db.instances.unshift(instance);
}

export async function getLogs(): Promise<DeploymentLog[]> {
  return globalAny.__db.logs;
}

export async function getLogsByInstance(instanceId: string): Promise<DeploymentLog[]> {
  return globalAny.__db.logs.filter((l: DeploymentLog) => !l.instanceId || l.instanceId === instanceId);
}

export async function addLog(log: DeploymentLog) {
  globalAny.__db.logs.unshift(log); // Add to top for recent logs
}
