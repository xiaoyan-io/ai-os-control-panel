import { getTemplates } from '@/lib/registry';
import { getInstances, getLogs } from '@/lib/db';
import { Activity, Cpu, Layers, Server } from 'lucide-react';
import Link from 'next/link';

export default async function Dashboard() {
  const templates = await getTemplates();
  const instances = await getInstances();
  const logs = await getLogs();

  const stats = [
    { name: 'Total Templates', value: templates.length, icon: Layers },
    { name: 'Active Instances', value: instances.filter(i => i.status === 'Ready').length, icon: Server },
    { name: 'Deploying', value: instances.filter(i => i.status === 'Installing').length, icon: Activity },
    { name: 'Failed Nodes', value: instances.filter(i => i.status === 'Failed').length, icon: Cpu },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">System Overview</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Monitor your AI OS deployments and infrastructure health.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm"
          >
            <dt>
              <div className="absolute rounded-md bg-zinc-800 p-3">
                <stat.icon className="h-5 w-5 text-zinc-300" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-zinc-400">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
              <p className="text-2xl font-semibold text-zinc-100">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Deployments */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-zinc-100">Recent Instances</h3>
            <Link href="/instances" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
              View all
            </Link>
          </div>
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-5 divide-y divide-white/5">
              {instances.slice(0, 5).map((instance) => (
                <li key={instance.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-zinc-200">{instance.name}</p>
                      <p className="truncate text-sm text-zinc-500">{instance.node}</p>
                    </div>
                    <div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        instance.status === 'Ready' ? 'bg-emerald-400/10 text-emerald-400' :
                        instance.status === 'Installing' ? 'bg-blue-400/10 text-blue-400' :
                        instance.status === 'Failed' ? 'bg-red-400/10 text-red-400' :
                        'bg-amber-400/10 text-amber-400'
                      }`}>
                        {instance.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* System Logs */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-zinc-100">System Activity</h3>
          </div>
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-5 divide-y divide-white/5">
              {logs.slice(0, 5).map((log) => (
                <li key={log.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-zinc-300 font-mono">{log.message}</p>
                      <p className="truncate text-xs text-zinc-500 mt-1">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <div>
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium font-mono ${
                        log.level === 'INFO' ? 'bg-zinc-800 text-zinc-300' :
                        log.level === 'WARN' ? 'bg-amber-400/10 text-amber-400' :
                        'bg-red-400/10 text-red-400'
                      }`}>
                        {log.level}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
