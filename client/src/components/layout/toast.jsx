import { XIcon, LucideTelescope, LucideXOctagon } from "lucide-react";

export default function toast({ success }) {
  return (
    <aside 
      className={`${success ? `bg-[#1774FF]` : `bg-red-500` } absolute top-3 w-[calc(100%-30px)] flex 
      items-center justify-between rounded-2xl text-white  opacity-85 backdrop-blur-sm px-5 py-3`}
    >
      <div className="flex items-center gap-4">
        {success ? 
        <LucideTelescope className="size-8" />
        :
        <LucideXOctagon className="size-8" /> 
        }
        <div className="text-sm font-medium leading-tight">
          <span className="text-base">
            {success ? 'Visuals Generated' : 'Visuals Failed'}
          </span>
          <br />
          Session 01
        </div>
      </div>
      <XIcon />
    </aside>
  );
}
