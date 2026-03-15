import { mockTemplates, mockSmokeTests } from '@/lib/mock-data';
import { getInstanceById, getLogsByInstance } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Server, Activity, Terminal, CheckCircle2, XCircle, RotateCw, Trash2, ExternalLink } from 'lucide-react';

export default async function InstanceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const instance = await getInstanceById(id);
  const logs = await getLogsByInstance(id);

  if (!instance) {
    notFound();
  }

  const template = mockTemplates.find(t => t.id === instance.templateId);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/instances" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-300 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Instances
        </Link>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="rounded-xl bg-zinc-800 p-3 shadow-sm border border-white/10">
              <Server className="h-8 w-8 text-zinc-300" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-100">{instance.name}</h2>
              <p className="mt-1 text-sm text-zinc-400">
                {instance.category} &middot; Node: <span className="font-mono text-zinc-300">{instance.node}</span> &middot; <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  instance.status === 'Ready' ? 'bg-emerald-400/10 text-emerald-400' :
                  instance.status === 'Installing' ? 'bg-blue-400/10 text-blue-400' :
                  instance.status === 'Failed' ? 'bg-red-400/10 text-red-400' :
                  'bg-amber-400/10 text-amber-400'
                }`}>
                  {instance.status}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 flex space-x-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700"
            >
              <RotateCw className="mr-2 h-4 w-4" />
              Restart
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-400 shadow-sm hover:bg-red-500/20 border border-red-500/20"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Environment Summary */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-100 border-b border-white/10 pb-4">Environment Summary</h3>
            <dl className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-zinc-500">Template</dt>
                <dd className="mt-1 text-sm text-zinc-200">{template?.name || instance.templateId}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-zinc-500">Workspace Path</dt>
                <dd className="mt-1 text-sm text-zinc-200 font-mono">{instance.workspacePath}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-zinc-500">Base URL</dt>
                <dd className="mt-1 text-sm text-indigo-400 font-mono flex items-center">
                  <a href={instance.baseUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                    {instance.baseUrl} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-zinc-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-zinc-200">{new Date(instance.updatedAt).toLocaleString()}</dd>
              </div>
              {instance.companyName && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Company Name</dt>
                  <dd className="mt-1 text-sm text-zinc-200">{instance.companyName}</dd>
                </div>
              )}
              {instance.familyName && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Family Name</dt>
                  <dd className="mt-1 text-sm text-zinc-200">{instance.familyName}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Deployment Logs */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-semibold text-zinc-100 flex items-center">
                <Terminal className="mr-2 h-5 w-5 text-zinc-400" />
                Deployment Logs
              </h3>
            </div>
            <div className="mt-4 bg-zinc-950 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-white/5">
              <ul className="space-y-2">
                {logs.map(log => (
                  <li key={log.id} className="flex space-x-3">
                    <span className="text-zinc-600 shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    <span className={`shrink-0 ${
                      log.level === 'INFO' ? 'text-blue-400' :
                      log.level === 'WARN' ? 'text-amber-400' :
                      'text-red-400'
                    }`}>[{log.level}]</span>
                    <span className="text-zinc-300">{log.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Smoke Tests */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-semibold text-zinc-100 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-zinc-400" />
                Smoke Tests
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {mockSmokeTests.map(test => (
                <li key={test.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {test.status === 'Passed' ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 mr-3" />
                    ) : test.status === 'Failed' ? (
                      <XCircle className="h-5 w-5 text-red-400 mr-3" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-zinc-600 border-t-zinc-400 animate-spin mr-3" />
                    )}
                    <span className="text-sm font-medium text-zinc-300">{test.testName}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">{test.durationMs}ms</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10">
              <button className="w-full rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700">
                Run Tests Again
              </button>
            </div>
          </div>

          {/* Installed Roles */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-100 border-b border-white/10 pb-4">Installed Roles</h3>
            <ul className="mt-6 space-y-3">
              {template?.includedRoles.map(role => (
                <li key={role} className="flex items-center text-sm text-zinc-300">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-3"></div>
                  {role}
                </li>
              )) || <li className="text-sm text-zinc-500">No roles defined.</li>}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
