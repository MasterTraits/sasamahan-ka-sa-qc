import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Settings } from 'lucide-react';
import { FaBell } from "react-icons/fa";

export default function Header(props) {
  return (
    <header className="flex items-center justify-between w-full relative ">
      <span className="px-3 rounded-2xl text-header font-mono shadow-md border border-neutral-200 text-lg tracking-tighter">
        <h1>
          Welcome,&nbsp;
          {props.name}
        </h1>
      </span>

      <span className="flex items-center gap-4">
        <button className="bg-white w-[auto] px-3 py-1 flex items-center gap-2 rounded-full justify-center ring-2 ring-grayText ring-opacity-50 shadow-md">
            <FaUserCircle className='text-lg' />
            <p className="text-header font-mono">
                {props.name}
            </p>
        </button>

        <div className="bg-white w-[auto] px-3 py-2 flex items-center gap-2 rounded-full justify-center ring-2 ring-grayText ring-opacity-50 shadow-md">
            <button>
                <Settings size={18}/>
            </button>

            <button>
                <FaBell className='ml-2 text-lg'/>
            </button>
        </div>
      </span>
    </header>
  );
}
