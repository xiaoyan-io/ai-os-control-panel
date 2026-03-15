import { mockTemplates } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Layers, TerminalSquare } from 'lucide-react';

export default async function TemplateDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = mockTemplates.find(t => t.id === id);

  if (!template) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/templates" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-300 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Link>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="rounded-xl bg-zinc-800 p-3 shadow-sm border border-white/10">
              <Layers className="h-8 w-8 text-zinc-300" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-100">{template.name}</h2>
              <p className="mt-1 text-sm text-zinc-400">
                {template.category} &middot; {template.version} &middot; <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  template.status === 'Stable' ? 'bg-emerald-400/10 text-emerald-400' :
                  template.status === 'Beta' ? 'bg-amber-400/10 text-amber-400' :
                  'bg-red-400/10 text-red-400'
                }`}>
                  {template.status}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              href={`/deploy?template=${template.id}`}
              className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <TerminalSquare className="mr-2 h-4 w-4" />
              Deploy Instance
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-100">Description</h3>
            <p className="mt-4 text-sm text-zinc-300 leading-relaxed">{template.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {template.tags.map(tag => (
                <span key={tag} className="inline-flex items-center rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-100">Included Roles</h3>
            <ul className="mt-4 space-y-3">
              {template.includedRoles.map(role => (
                <li key={role} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mr-3" />
                  <span className="text-sm text-zinc-300">{role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-100">Smoke Tests</h3>
            <ul className="mt-4 space-y-3">
              {template.smokeTests.map(test => (
                <li key={test} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-zinc-500 shrink-0 mr-3" />
                  <span className="text-sm text-zinc-400">{test}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-100">Required Inputs</h3>
            <ul className="mt-4 space-y-3">
              {template.requiredInputs.map(input => (
                <li key={input} className="flex items-center text-sm text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 mr-3"></span>
                  {input}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-100">Optional Inputs</h3>
            <ul className="mt-4 space-y-3">
              {template.optionalInputs.map(input => (
                <li key={input} className="flex items-center text-sm text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 mr-3"></span>
                  {input}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
