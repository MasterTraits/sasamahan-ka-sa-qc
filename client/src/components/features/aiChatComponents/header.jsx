import React from 'react'
import { FaBell, FaUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
export default function Header() {
  return (
    <> 
     <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <span className="flex gap-1 items-center text-grayText font-bold">
          <IoMdMenu className="text-2xl" />
            <p className="text-xl font-bold ">Menu</p>
          </span>
    
        <span className="flex gap-5 text-grayText">
          <FaBell className="text-2xl" />
          <FaUserCircle className="text-2xl" />
        </span>
      </header>
    </>
)
}
