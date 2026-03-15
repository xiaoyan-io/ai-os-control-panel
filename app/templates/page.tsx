import { getTemplates } from '@/lib/registry';
import Link from 'next/link';
import { Layers, ArrowRight } from 'lucide-react';

export default async function TemplatesPage() {
  const templates = await getTemplates();
  const categories = Array.from(new Set(templates.map(t => t.category)));

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">AI OS Templates</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Browse and deploy modular AI operating systems.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Sync Registry
          </button>
        </div>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-200 border-b border-white/10 pb-2">{category}</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.filter(t => t.category === category).map((template) => (
              <div
                key={template.id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm transition-all hover:border-white/20 hover:bg-zinc-900"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-md bg-zinc-800 p-2">
                        <Layers className="h-5 w-5 text-zinc-300" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-semibold text-zinc-100">{template.name}</h3>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      template.status === 'Stable' ? 'bg-emerald-400/10 text-emerald-400' :
                      template.status === 'Beta' ? 'bg-amber-400/10 text-amber-400' :
                      'bg-red-400/10 text-red-400'
                    }`}>
                      {template.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-zinc-400 line-clamp-2">{template.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {template.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-mono text-zinc-500">{template.version}</span>
                  <div className="flex space-x-3">
                    <Link
                      href={`/templates/${template.id}`}
                      className="text-sm font-medium text-zinc-300 hover:text-white"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/deploy?template=${template.id}`}
                      className="flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300"
                    >
                      Deploy <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
