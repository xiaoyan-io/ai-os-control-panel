import { Bell, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10 bg-zinc-950 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-zinc-500"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-zinc-100 placeholder:text-zinc-500 focus:ring-0 sm:text-sm"
            placeholder="Search deployments, nodes, templates..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button type="button" className="-m-2.5 p-2.5 text-zinc-400 hover:text-zinc-300">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-zinc-800" aria-hidden="true" />
          <div className="flex items-center gap-x-4">
             <span className="text-sm font-medium text-zinc-400">Node Status: <span className="text-emerald-400">All Systems Operational</span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
