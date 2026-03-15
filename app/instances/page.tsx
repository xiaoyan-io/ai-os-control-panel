import { getTemplates } from '@/lib/registry';
import { getInstances } from '@/lib/db';
import Link from 'next/link';
import { Server, ArrowRight } from 'lucide-react';

export default async function InstancesPage() {
  const instances = await getInstances();
  const templates = await getTemplates();

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Active Instances</h2>
          <p className="mt-1 text-sm text-zinc-400">
            A list of all deployed AI OS instances across your infrastructure.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/deploy"
            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Deploy New
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-white/10 sm:rounded-lg">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-zinc-900/50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-100 sm:pl-6">
                      Instance Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-100">
                      Template
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-100">
                      Node
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-100">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-100">
                      Updated
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-zinc-950">
                  {instances.map((instance) => {
                    const template = templates.find(t => t.id === instance.templateId);
                    return (
                      <tr key={instance.id} className="hover:bg-zinc-900/50 transition-colors">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-md bg-zinc-800 flex items-center justify-center border border-white/10">
                              <Server className="h-5 w-5 text-zinc-300" aria-hidden="true" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-zinc-100">{instance.name}</div>
                              <div className="text-zinc-500">{instance.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-300">
                          {template?.name || instance.templateId}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-400 font-mono">
                          {instance.node}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            instance.status === 'Ready' ? 'bg-emerald-400/10 text-emerald-400' :
                            instance.status === 'Installing' ? 'bg-blue-400/10 text-blue-400' :
                            instance.status === 'Failed' ? 'bg-red-400/10 text-red-400' :
                            'bg-amber-400/10 text-amber-400'
                          }`}>
                            {instance.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">
                          {new Date(instance.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link href={`/instances/${instance.id}`} className="text-indigo-400 hover:text-indigo-300 flex items-center justify-end">
                            Manage <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
