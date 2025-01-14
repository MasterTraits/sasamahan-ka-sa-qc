'use client'

import Divider from "@/assets/Divider";
import Link from "next/link";
import { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function Home() {
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
    // The Main Container
    <main className="h-screen flex justify-center bg-background">
      {/* The Background Image */}
      <Divider output="absolute w-full overflow-hidden bottom-0 object-cover"/>

      {/* The Content Itself */}
      <div className="flex flex-col justify-between items-center w-11/12 p-5 py-7 *:z-20">  
        <div className="w-full flex justify-between items-center">
          <Link href="/"><BsArrowLeftCircle className="text-3xl text-black"/></Link>
          <h1 className="text-md mt-3 mr-5 text-black">Gabay</h1>
          <div></div>
        </div>
        
        <div>
          <h2 className="text-center text-2xl font-bold my-5 text-header">Let's Sign You In!</h2>
          <form>
            <input className="mb-4 input rounded-full bg-transparent w-full max-w-md" 
              type="email" 
              placeholder="Email" 
              required
            />
            <br/>
            <div className="relative">
              <input className="mb-7 input rounded-full bg-transparent w-full max-w-lg" 
                type={showpwd.text}  
                placeholder="Password"
                required
              />
              {showpwd.seepwd ? 
                <FiEye className="absolute top-3.5 right-4 text-header" onClick={togglePwd}/> 
              : <FiEyeOff className="absolute top-3.5 right-4 text-header" onClick={togglePwd}/>}
            </div>
          </form>
          
          <Link href="/forgotpass" className="underline text-sm text-header">Forgot Password?</Link>
          <br/><br/>
          <div className="flex"> 
            <input type="checkbox" className="checkbox border-2 h-5 w-5" id="remember"/>
            <label className="text-sm text-header" htmlFor="remember">&nbsp; Remember Me</label>
          </div>
              
          <p className="mt-10 mb-2 text-sm text-center text-header">No Account? <Link className="text-link font-semibold" href="/register">Register here</Link></p>
          <button className="btn w-full max-w-md mb-7 text-lg rounded-full hover:bg-gold transform transition-colors linear">Sign In</button> 
          <div className="flex justify-evenly">
            <img className="h-12 w-12 bg-btnWhite rounded-full p-2 z-20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"/>
            <img className="h-12 w-12 bg-btnWhite rounded-full p-2 z-20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"/>
            <img className="h-12 w-12 bg-btnWhite rounded-full p-2 z-20" src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"/>
          </div>

        </div>
        {/* Empty mf */}
        <div></div>

      </div>
    </main>
  );
}
