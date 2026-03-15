'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Layers, Server, Settings, TerminalSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Templates', href: '/templates', icon: Layers },
  { name: 'Deploy', href: '/deploy', icon: TerminalSquare },
  { name: 'Instances', href: '/instances', icon: Server },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-white/10 bg-zinc-950">
      <div className="flex h-16 shrink-0 items-center px-6">
        <span className="text-lg font-semibold tracking-tight text-zinc-100">AI OS Control Panel</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white',
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-300',
                    'mr-3 h-5 w-5 shrink-0 transition-colors'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-300">
            AD
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-zinc-200">Admin User</p>
            <p className="text-xs text-zinc-500">System Operator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
