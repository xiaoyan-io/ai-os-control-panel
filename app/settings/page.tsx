import { Github, HardDrive, Key, ShieldCheck, Activity } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Platform Settings</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Configure integrations, deployment runners, and global AI OS parameters.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* GitHub Integration */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="rounded-md bg-zinc-800 p-2">
              <Github className="h-6 w-6 text-zinc-300" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-zinc-100">GitHub Template Registry</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Connect to your private GitHub organization to sync AI OS templates automatically.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700"
                >
                  Connect GitHub Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Runner */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="rounded-md bg-zinc-800 p-2">
              <HardDrive className="h-6 w-6 text-zinc-300" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-zinc-100">Deployment Runner</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Configure SSH keys and VPS connection details for remote shell installers.
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="sshKey" className="block text-sm font-medium text-zinc-300">
                    Default SSH Private Key
                  </label>
                  <textarea
                    id="sshKey"
                    name="sshKey"
                    rows={3}
                    className="mt-2 block w-full rounded-md border-0 bg-zinc-950 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 font-mono"
                    placeholder="-----BEGIN OPENSSH PRIVATE KEY-----..."
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
                >
                  Save Key
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Model Settings */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="rounded-md bg-zinc-800 p-2">
              <Key className="h-6 w-6 text-zinc-300" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-zinc-100">Model & API Settings</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Global API keys for underlying LLMs (OpenAI, Anthropic, Gemini).
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="openaiKey" className="block text-sm font-medium text-zinc-300">
                    OpenAI API Key
                  </label>
                  <input
                    type="password"
                    id="openaiKey"
                    name="openaiKey"
                    defaultValue="sk-..."
                    className="mt-2 block w-full rounded-md border-0 bg-zinc-950 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 font-mono"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700"
                >
                  Update Keys
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Persona Alignment Engine */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="rounded-md bg-zinc-800 p-2">
              <ShieldCheck className="h-6 w-6 text-zinc-300" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-zinc-100">Persona Alignment Engine</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Configure strictness levels for persona adherence across all deployed instances.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-zinc-300">Global Alignment Enforcement</span>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                  role="switch"
                  aria-checked="true"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Smoke Test Engine */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="rounded-md bg-zinc-800 p-2">
              <Activity className="h-6 w-6 text-zinc-300" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-zinc-100">Smoke Test Engine</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Configure automated testing intervals and failure thresholds.
              </p>
              <div className="mt-4">
                <select
                  id="testInterval"
                  name="testInterval"
                  className="mt-2 block w-full sm:max-w-xs rounded-md border-0 bg-zinc-950 py-1.5 text-zinc-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                >
                  <option>Every 15 minutes</option>
                  <option>Hourly</option>
                  <option>Daily</option>
                  <option>Manual only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
