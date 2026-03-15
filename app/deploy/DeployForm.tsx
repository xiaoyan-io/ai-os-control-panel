'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { deployInstanceAction } from '@/app/actions';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { RegistryTemplate } from '@/lib/registry';

function DeployFormContent({ templates }: { templates: RegistryTemplate[] }) {
  const searchParams = useSearchParams();
  const initialTemplateId = searchParams.get('template');

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplateId || '');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<any>(null);

  const categories = Array.from(new Set(templates.map(t => t.category)));
  const filteredTemplates = selectedCategory
    ? templates.filter(t => t.category === selectedCategory)
    : templates;

  useEffect(() => {
    if (initialTemplateId) {
      const template = templates.find(t => t.id === initialTemplateId);
      if (template) {
        setSelectedCategory(template.category);
        setSelectedTemplate(template.id);
      }
    }
  }, [initialTemplateId, templates]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDeploying(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const newInstance = await deployInstanceAction(formData);
      setDeployResult({
        id: newInstance.id,
        template: templates.find(t => t.id === selectedTemplate)?.name,
        node: newInstance.node,
        status: newInstance.status,
        workspacePath: newInstance.workspacePath,
        timestamp: newInstance.updatedAt,
      });
    } catch (error) {
      console.error("Deployment failed", error);
    } finally {
      setIsDeploying(false);
    }
  };

  if (deployResult) {
    return (
      <div className="space-y-8">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-100">Deployment Initiated</h2>
          <p className="mt-2 text-sm text-zinc-400">
            The AI OS is currently being provisioned on the selected node.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-zinc-100 border-b border-white/10 pb-4">Deployment Summary</h3>
          <dl className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-zinc-500">Deployment ID</dt>
              <dd className="mt-1 text-sm text-zinc-200 font-mono">{deployResult.id}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-zinc-500">Template</dt>
              <dd className="mt-1 text-sm text-zinc-200">{deployResult.template}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-zinc-500">Target Node</dt>
              <dd className="mt-1 text-sm text-zinc-200 font-mono">{deployResult.node}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-zinc-500">Workspace</dt>
              <dd className="mt-1 text-sm text-zinc-200 font-mono">{deployResult.workspacePath}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-zinc-500">Status</dt>
              <dd className="mt-1 text-sm text-zinc-200">
                <span className="inline-flex items-center rounded-full bg-blue-400/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                  {deployResult.status}
                </span>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex justify-end space-x-4 border-t border-white/10 pt-6">
             <button
              onClick={() => setDeployResult(null)}
              className="rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700"
            >
              Deploy Another
            </button>
            <a
              href="/instances"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
            >
              View Instances
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-zinc-100 border-b border-white/10 pb-4">Template Selection</h3>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-zinc-300">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedTemplate('');
              }}
              className="mt-2 block w-full rounded-md border-0 bg-zinc-800 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
              <option value="">Select a category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="template" className="block text-sm font-medium text-zinc-300">
              OS Template
            </label>
            <select
              id="template"
              name="template"
              required
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="mt-2 block w-full rounded-md border-0 bg-zinc-800 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
              <option value="">Select a template</option>
              {filteredTemplates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-zinc-100 border-b border-white/10 pb-4">Infrastructure</h3>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nodeName" className="block text-sm font-medium text-zinc-300">
              Target Node
            </label>
            <select
              id="nodeName"
              name="nodeName"
              required
              className="mt-2 block w-full rounded-md border-0 bg-zinc-800 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 font-mono"
            >
              <option value="SG-Node-01">SG-Node-01</option>
              <option value="SG2-Cluster">SG2-Cluster</option>
              <option value="V6-Cluster-A">V6-Cluster-A</option>
              <option value="Pi5-Edge-04">Pi5-Edge-04</option>
              <option value="PVE-Home-Lab">PVE-Home-Lab</option>
            </select>
          </div>

          <div>
            <label htmlFor="workspacePath" className="block text-sm font-medium text-zinc-300">
              Workspace Path
            </label>
            <input
              type="text"
              name="workspacePath"
              id="workspacePath"
              required
              defaultValue="/opt/ai-os/new-instance"
              className="mt-2 block w-full rounded-md border-0 bg-zinc-800 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 font-mono"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-zinc-100 border-b border-white/10 pb-4">Configuration</h3>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          
          {selectedCategory === 'Company' && (
            <div className="sm:col-span-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-zinc-300">
                Company Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                required
                className="mt-2 block w-full rounded-md border-0 bg-zinc-800 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          )}

          {(selectedCategory === 'Personal' || selectedCategory === 'Family Care') && (
            <div className="sm:col-span-2">
              <label htmlFor="familyName" className="block text-sm font-medium text-zinc-300">
                Family / User Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="familyName"
                id="familyName"
                required
                className="mt-2 block w-full rounded-md border-0 bg-zinc-800 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          )}

          <div className="sm:col-span-2">
            <label htmlFor="apiKey" className="block text-sm font-medium text-zinc-300">
              Primary API Key <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              name="apiKey"
              id="apiKey"
              required
              className="mt-2 block w-full rounded-md border-0 bg-zinc-800 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 font-mono"
            />
          </div>

          <div>
            <label htmlFor="telegramToken" className="block text-sm font-medium text-zinc-300">
              Telegram Token (Optional)
            </label>
            <input
              type="password"
              name="telegramToken"
              id="telegramToken"
              className="mt-2 block w-full rounded-md border-0 bg-zinc-800 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 font-mono"
            />
          </div>

          <div>
            <label htmlFor="baseUrl" className="block text-sm font-medium text-zinc-300">
              Base URL
            </label>
            <select
              id="baseUrlPreset"
              className="mt-2 block w-full rounded-md border-0 bg-zinc-800 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 font-mono"
              onChange={(e) => {
                const baseUrlInput = document.getElementById('baseUrl') as HTMLInputElement;
                if (e.target.value) {
                  baseUrlInput.value = e.target.value;
                }
              }}
            >
              <option value="">Custom...</option>
              <option value="https://api.networkio.nyc.mn/v1">NetworkIO</option>
              <option value="https://api.cli-proxy.com/v1">CLIProxyAPI</option>
              <option value="https://api.openai.com/v1">OpenAI</option>
              <option value="https://generativelanguage.googleapis.com/v1">Google Gemini</option>
              <option value="https://api.anthropic.com">Anthropic Claude</option>
              <option value="https://dash.qianfan.chat/v1">百度千帆</option>
              <option value="https://dash.abcgpt.com/v1">腾讯混元</option>
              <option value="https://api.minimax.chat/v1">MiniMax</option>
              <option value="https://api.deepseek.com/v1">DeepSeek</option>
              <option value="https://api.siliconflow.cn/v1">硅基流动</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="baseUrl" className="block text-sm font-medium text-zinc-300">
              Custom Base URL
            </label>
            <input
              type="url"
              name="baseUrl"
              id="baseUrl"
              placeholder="https://api.example.com/v1"
              className="mt-2 block w-full rounded-md border-0 bg-zinc-800 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 font-mono"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isDeploying || !selectedTemplate}
          className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeploying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isDeploying ? 'Deploying...' : 'Deploy Instance'}
        </button>
      </div>
    </form>
  );
}

export default function DeployForm({ templates }: { templates: RegistryTemplate[] }) {
  return (
    <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-zinc-500" /></div>}>
      <DeployFormContent templates={templates} />
    </Suspense>
  );
}