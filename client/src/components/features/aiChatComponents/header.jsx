import React from 'react'
import { FaBell, FaUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
export default function Header() {
  return (
    <> 
     <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
              <span className="flex gap-5 items-center">
                <IoMdMenu className="text-2xl" />
                <p className="text-xl">Menu</p>
              </span>
    
              <span className="flex gap-5">
                <FaBell className="text-2xl" />
                <FaUserCircle className="text-2xl" />
              </span>
            </header>
    </>
)
}
