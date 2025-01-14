'use client'
import Image from "next/image";
import Link from 'next/link'
import Dots from "@/assets/Dots.svg";
import { BsSendArrowDown } from "react-icons/bs";
import Mic from "@/assets/Mic";
import "./app.module.css"
import RangeSlider from "@/components/RangeSlider";
import Checkbox from "@/components/IncomeExpenseTracker";

import { useState, useEffect } from 'react'
import { useMyContext } from "@/components/QueryContext";
import { gsap } from "gsap";
import IncomeExpenseTracker from "@/components/IncomeExpenseTracker";


export default function page() {
  const { setQuery } = useMyContext();
  const [ openInput, setOpenInput ] = useState(false);
  const [ inputText, setInputText ] = useState("");
  const [ personalization, setPersonalization ] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    setQuery(inputText);
    window.location.href = `/dashboard?query=${encodeURIComponent(inputText)}`;
  }

  if (personalization) {  
    return (
      <>
        <main className="bg-background h-screen flex items-center overflow-hidden p-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <section className="mb-20">
            <h1 className="w-3/4 ml-2 text-4xl font-bold tracking-tight mb-6">
              Harness the Power of Data with
              <b className="text-[40px] gradient-custom">&nbsp;GABAY</b>
            </h1>
            <div className="w-full pb-5">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3 bg-white rounded-3xl px-4 h-14 drop-shadow-[0_0_20px_rgb(0,0,0,0.4)]">
                  <div className="flex gap-4 items-center w-full">
                    <input
                      type="text"
                      className="mx-2 text-lg w-full"
                      placeholder="Empower your Business"
                      value={inputText} 
                      onClick={() => setOpenInput(!openInput)}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                  </div>
                  {!openInput.inputbool ? 
                      <Mic className="text-4xl text-header p-2.5 rounded-full bg-btnWhite" />

                    : ""
                  }
                  <button type="submit">
                    <BsSendArrowDown className="text-4xl bg-btnWhite p-1.5 rounded-full h-10 w-10" />
                  </button>
                </div>
              </form>
            </div>
            <div className="flex gap-3 z-50">
              <button className="btn" type="button">
                <strong className="cuzImStrong">CSV</strong>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>

                <div id="glow">
                  <div className="circle z-0"></div>
                  <div className="circle z-0"></div>
                </div>
              </button>
              <button className="btn z-50" type="button">
                <strong className="cuzImStrong">PDF</strong>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>

                <div id="glow">
                  <div className="circle z-0"></div>
                  <div className="circle z-0"></div>
                </div>
              </button>
              <button className="btn z-50" type="button">
                <strong className="cuzImStrong">Spreadsheet</strong>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>

                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </button>
            </div>
          </section>
          <article className="relative">
            <Image src={Dots} className="fixed top-0 right-0 z-0" alt="Dots" />
            <div className="fixed bg-gold w-56 h-72 top-5 right-[-40%] rounded-full"></div>
          </article>
          <footer className="flex items-center justify-evenly px-5 backdrop-blur-sm  bg-background/80 fixed bottom-0 right-0 h-24 w-full z-20 rounded-t-2xl">
            <Link href="/login"><button className="bg-blue text-white p-3 rounded-3xl w-40">Login</button></Link>
            <Link href="/register">
              <button className="bg-gold text-white p-3 rounded-3xl w-40">Register</button>
            </Link>
          </footer>
        </main>
      </>
    );
  } else {
    // useEffect(() => {
    //   gsap.to(".animate-1", { opacity: 1, x: -300, 
    //   }).then(()=> { return gsap.to(".animate-1", { duration: 1.5, x: -600 });
    //   }).then(()=> { return gsap.to(".animate-1", { duration: 1, x: -400, y: -400 });
    //   }).then(()=> { return gsap.to(".animate-1", { duration: 1.5, x: 30, y: -800, scale: 4 });
    //   }).then(()=> { return gsap.to(".animate-1", { opacity: 0, x: 60, zIndex: -1})
    //   })

    //   gsap.to(".animate-2", { opacity: 1, x: 300,
    //   }).then(()=> { return gsap.to(".animate-2", { duration: 1.5, x: 600 });
    //   }).then(()=> { return gsap.to(".animate-2", { duration: 1, x: 400, y: 400 });
    //   }).then(()=> { return gsap.to(".animate-2", { duration: 1.5, x: -30, y: 800, scale: 4 });
    //   }).then(()=> { return gsap.to(".animate-2", { opacity: 0, x: -60, zIndex: -1})
    //   })
    // }, []);

    return (
      <main className="py-8 px-6 bg-background h-screen w-full">
        {/* <div className="animate-1 fixed bg-blue w-96 h-96 right-[-90%] bottom-[-15%] rounded-full z-10"></div>
        <div className="animate-2 fixed bg-gold w-96 h-96 left-[-90%] top-[-15%] rounded-full z-10"></div> */}
        <Image src={Dots} className="fixed top-0 left-0 z-[-1]" alt="Dots" />
        <Image src={Dots} className="fixed bottom-[-5%] right-0 z-[-1]" alt="Dots" />

        <h1 className="font-bold tracking-tight mb-5 drop-shadow-[0_0_20px_rgb(0,0,0,0.2)]">
          <b className="text-[50px] gradient-custom">GABAY</b>
        </h1>
        <div className="flex flex-col gap-4 *:drop-shadow-[0_0_20px_rgb(0,0,0,0.1)]">
          <RangeSlider min={0} max={100} step={1} defaultValue={50} onChange={(value) => console.log(value)} />
          <RangeSlider min={0} max={100} step={1} defaultValue={50} onChange={(value) => console.log(value)} />
          <RangeSlider min={0} max={100} step={1} defaultValue={50} onChange={(value) => console.log(value)} />
          <IncomeExpenseTracker />
        </div>
      </main>
    );
  }
}
