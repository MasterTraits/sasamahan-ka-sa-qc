import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Settings } from 'lucide-react';
import { FaBell } from "react-icons/fa";

export default function Header(props) {
  return (
    <header className="flex items-center justify-between w-full relative ">
      <span className="text-header font-bold text-[3rem] ">
        <h1>
          Welcome,&nbsp;
          {props.name}
        </h1>
      </span>

      <span className="flex items-center gap-4">
        <button className="w-[auto] px-4 py-2 flex items-center gap-1 rounded-full justify-center ring-2 ring-grayText ring-opacity-50 shadow-md">
            <FaUserCircle className='text-3xl' />
            <p className="text-header font-medium">
                {props.name}
            </p>
        </button>

        <div className="w-[7rem] h-[3rem] flex items-center gap-2 rounded-full justify-center ring-2 ring-grayText ring-opacity-50 shadow-md ">
            <button>
                <Settings size={30}/>
            </button>

            <button>
                <FaBell className='text-3xl'/>
            </button>
        </div>
      </span>
    </header>
  );
}
