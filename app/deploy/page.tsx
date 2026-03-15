import { getTemplates } from '@/lib/registry';
import DeployForm from './DeployForm';
import { TerminalSquare } from 'lucide-react';

export default async function DeployPage() {
  const templates = await getTemplates();
  
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center">
          <TerminalSquare className="mr-3 h-6 w-6 text-indigo-400" />
          Deploy AI OS
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Configure and provision a new AI OS instance to your infrastructure.
        </p>
      </div>

      <DeployForm templates={templates} />
    </div>
  );
}
