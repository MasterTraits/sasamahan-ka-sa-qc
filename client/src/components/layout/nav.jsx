import { 
  Sparkles,
  LineChart
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function nav({page}) {
  return (
    <footer className="absolute left-0 bottom-0 w-full flex items-center justify-evenly h-16 bg-white border-t border-stone-200">
      <Link 
        to="/home"
        className={`relative flex flex-col items-center justify-center p-4 px-14 ${ page == "home" ? `bg-slate-200 rounded-t-[2em]` : ``}`}
      >
        <Sparkles className="h-8 w-8" />
        <span className="text-xs tracking-tight font-medium">Generate</span>
      </Link>
      <Link 
        to="/view"
        className={`relative flex flex-col items-center justify-center p-4 px-14 ${ page == "view" ? `bg-slate-200 rounded-t-[2em]` : ``}`}
      >
        <LineChart className="h-8 w-8" />
        <span className="text-xs tracking-tight font-medium">Views</span>
      </Link>
    </footer>
  );
}
