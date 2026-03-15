import { Instance, DeploymentLog } from './mock-data';

// Database connection config
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ai_os_db',
  user: process.env.DB_USER || 'ai_os_user',
  password: process.env.DB_PASSWORD || 'ai_os_pass_2024',
};

const isDbConfigured = !!process.env.DB_HOST || !!process.env.DATABASE_URL;

// In-memory fallback (for development without DB)
const globalAny: any = global;
if (!globalAny.__db) {
  globalAny.__db = {
    instances: [],
    logs: []
  };
}

// PostgreSQL client (lazy loaded)
let pgClient: any = null;

async function getPgClient() {
  if (pgClient) return pgClient;
  
  try {
    const { Client } = await import('pg');
    pgClient = new Client({
      ...DB_CONFIG,
      connectionString: process.env.DATABASE_URL || undefined,
    });
    await pgClient.connect();
    console.log('[DB] PostgreSQL connected');
    return pgClient;
  } catch (error) {
    console.warn('[DB] PostgreSQL not available, using in-memory fallback');
    return null;
  }
}

export async function getInstances(): Promise<Instance[]> {
  const client = await getPgClient();
  
  if (client) {
    try {
      const result = await client.query('SELECT * FROM instances ORDER BY created_at DESC');
      return result.rows.map((row: any) => ({
        id: row.id,
        templateId: row.template_id,
        templateName: row.template_id,
        node: row.node_name,
        workspacePath: row.workspace_path,
        status: row.status,
        config: row.config,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    } catch (error) {
      console.warn('[DB] Query failed, using fallback');
    }
  }
  
  return globalAny.__db.instances;
}

export async function getInstanceById(id: string): Promise<Instance | undefined> {
  const client = await getPgClient();
  
  if (client) {
    try {
      const result = await client.query('SELECT * FROM instances WHERE id = $1', [id]);
      if (result.rows[0]) {
        const row = result.rows[0];
        return {
          id: row.id,
          templateId: row.template_id,
          templateName: row.template_id,
          node: row.node_name,
          workspacePath: row.workspace_path,
          status: row.status,
          config: row.config,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        };
      }
    } catch (error) {
      console.warn('[DB] Query failed, using fallback');
    }
  }
  
  return globalAny.__db.instances.find((i: Instance) => i.id === id);
}

export async function addInstance(instance: Instance): Promise<void> {
  const client = await getPgClient();
  
  if (client) {
    try {
      await client.query(
        `INSERT INTO instances (id, template_id, node_name, workspace_path, status, config) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [instance.id, instance.templateId, instance.node, instance.workspacePath, instance.status, JSON.stringify(instance.config || {})]
      );
      return;
    } catch (error) {
      console.warn('[DB] Insert failed, using fallback');
    }
  }
  
  globalAny.__db.instances.unshift(instance);
}

export async function updateInstanceStatus(id: string, status: string): Promise<void> {
  const client = await getPgClient();
  
  if (client) {
    try {
      await client.query('UPDATE instances SET status = $1, updated_at = NOW() WHERE id = $2', [status, id]);
      return;
    } catch (error) {
      console.warn('[DB] Update failed');
    }
  }
  
  const idx = globalAny.__db.instances.findIndex((i: Instance) => i.id === id);
  if (idx >= 0) {
    globalAny.__db.instances[idx].status = status;
  }
}

export async function getLogs(): Promise<DeploymentLog[]> {
  const client = await getPgClient();
  
  if (client) {
    try {
      const result = await client.query('SELECT * FROM deploy_logs ORDER BY created_at DESC LIMIT 100');
      return result.rows.map((row: any) => ({
        id: row.id.toString(),
        instanceId: row.instance_id?.toString(),
        level: row.level,
        message: row.message,
        timestamp: row.created_at,
      }));
    } catch (error) {
      console.warn('[DB] Query failed, using fallback');
    }
  }
  
  return globalAny.__db.logs;
}

export async function getLogsByInstance(instanceId: string): Promise<DeploymentLog[]> {
  const client = await getPgClient();
  
  if (client) {
    try {
      const result = await client.query('SELECT * FROM deploy_logs WHERE instance_id = $1 ORDER BY created_at DESC', [instanceId]);
      return result.rows.map((row: any) => ({
        id: row.id.toString(),
        instanceId: row.instance_id?.toString(),
        level: row.level,
        message: row.message,
        timestamp: row.created_at,
      }));
    } catch (error) {
      console.warn('[DB] Query failed, using fallback');
    }
  }
  
  return globalAny.__db.logs.filter((l: DeploymentLog) => !l.instanceId || l.instanceId === instanceId);
}

export async function addLog(log: DeploymentLog): Promise<void> {
  const client = await getPgClient();
  
  if (client) {
    try {
      await client.query(
        'INSERT INTO deploy_logs (instance_id, level, message) VALUES ($1, $2, $3)',
        [log.instanceId, log.level, log.message]
      );
      return;
    } catch (error) {
      console.warn('[DB] Insert log failed');
    }
  }
  
  globalAny.__db.logs.unshift(log);
}
