import { XIcon, LucideTelescope } from 'lucide-react'

export default function toast() {
  return (
    <aside className="absolute top-3 w-[calc(100%-30px)] flex items-center justify-between rounded-2xl text-white bg-[#1774FF] opacity-85 backdrop-blur-sm px-5 py-3">
      <div className="flex items-center gap-4">
        <LucideTelescope className="size-8" />
        <div className="text-sm font-medium leading-tight">
          <span className="text-base">Visuals Generated</span>
          <br />
          Session 01
        </div>
      </div>
      <XIcon />
    </aside>
  )
}
