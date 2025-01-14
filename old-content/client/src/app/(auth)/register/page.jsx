'use client'

import Divider from "@/assets/Divider"
import { useState } from 'react'
import Link from 'next/link'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { BsArrowLeftCircle } from 'react-icons/bs'

export default function page() {
  const [showpwd, setShowPwd] = useState({
    seepwd: false,
    text: "password"
  });  

  function togglePwd() {
    setShowPwd(prevState => ({
      seepwd: !prevState.seepwd,
      text: prevState.seepwd ? "password" : "text"
    }));
  }
  return (
    <main className='h-screen flex flex-col justify-between items-center bg-background pb-5'>
      <Divider output="absolute w-full overflow-hidden bottom-0 object-cover"/>

      {/* The Content Itself */}
      <div className="flex flex-col justify-between items-center w-11/12 p-5 py-7 *:z-20">  
        <div className="w-full mb-3 flex justify-between items-center">
          <Link href="/"><BsArrowLeftCircle className="text-3xl"/></Link>
          <h1 className="text-md mt-3 mr-5 mb-5">Gabay</h1>
          <div></div>
        </div>
        
        <div className="w-full px-2">
          <h2 className="text-center text-2xl font-bold my-5 mb-8">Let's Get you Started!</h2>
          <form>
          <input className="mb-4 input rounded-full bg-transparent w-full max-w-md" 
              type="text" 
              placeholder="First Name" 
              required
          />
          <input className="mb-4 input rounded-full bg-transparent w-full max-w-md" 
            type="text" 
            placeholder="Last Name" 
            required
          />
          <input className="mb-4 input rounded-full bg-transparent w-full max-w-md" 
            type="contact" 
            placeholder="Contact no." 
            required
          />
          <input className="mb-4 input rounded-full bg-transparent w-full max-w-md" 
            type="email" 
            placeholder="Email" 
            required
          />
            <br/>
            <div className="relative">
              <input className="mb-4 input rounded-full bg-transparent w-full" 
                type={showpwd.text}  
                placeholder="Password"
                required
              />
              {showpwd.seepwd ? 
                <FiEye className="absolute top-3.5 right-4" onClick={togglePwd}/> 
              : <FiEyeOff className="absolute top-3.5 right-4" onClick={togglePwd}/>}
            </div>
            <div className="relative">
              <input className="mb-7 input rounded-full bg-transparent w-full " 
                type={showpwd.text}  
                placeholder="Repeat Password"
                required
              />
              {showpwd.seepwd ? 
                <FiEye className="absolute top-3.5 right-4" onClick={togglePwd}/> 
              : <FiEyeOff className="absolute top-3.5 right-4" onClick={togglePwd}/>}
            </div>
          </form>
        </div>
        <button className="btn w-full max-w-md mb-7 text-lg rounded-full mx-5">Sign Up</button> 
          <p className="mb-2 text-header">or sign up with:</p>
          <div className="flex gap-3 justify-evenly ">
            <img className="h-12 w-12 bg-btnWhite rounded-full p-2 z-20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"/>
            <img className="h-12 w-12 bg-btnWhite rounded-full p-2 z-20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"/>
            <img className="h-12 w-12 bg-btnWhite rounded-full p-2 z-20" src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"/>
          </div>
      </div>
    </main>
  )
}


// email
// first Surname
// password
