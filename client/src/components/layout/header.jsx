import { 
  Menu,
  Bell,
  LucideUserCircle2
} from 'lucide-react'

import { useHistory } from '@/store/useHistory';
import { useCallback } from 'react';

export default function header({text}) {
  const openMenu = useCallback(useHistory((state)=> state.openMenu))

  return (
    <header className="flex items-center justify-between mx-4 mt-6">
      <button
        onClick={openMenu}
        className="flex items-center gap-3 py-1 px-3 hover:bg-white rounded-3xl"
      >
        <Menu className="h-5 w-5 text-neutral-600" />
        <span className="font-bold text-lg text-neutral-600 tracking-tight">
          {text}
        </span>
      </button>

      <div className="flex items-center mx-2 gap-5 pr-2 *:p-1 *:rounded-full">
        <div className="hover:bg-white text-center">
          <Bell className="text-neutral-600" />
        </div>
        <div className="hover:bg-white text-center">
          <LucideUserCircle2 className="text-neutral-600" />
        </div>
      </div>
    </header>
  );
}
