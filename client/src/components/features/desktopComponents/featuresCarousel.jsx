import React from "react";
import { LucideBlocks, LucideView, BriefcaseBusiness, HandCoins } from "lucide-react";

export default function Features() {
  return (
    <main className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md h-[41.5rem] flex items-center justify-center *:font-montserrat">
      <span>
        <section className="mx-2 mb-9 grid grid-cols-2 items-center gap-3 place-content-center">
          <div className="h-full w-full p-4 py-6 bg-neutral-100 border border-neutral-200 rounded-lg flex flex-col justify-center gap-4">
            <LucideBlocks size={40} className="text-neutral-500 mb-2 self-end"/>
            <h4 className="font-semibold text-sm text-neutral-500">Simulate Your decisions</h4>
          </div>
          <div className="h-full w-full p-4 py-6 bg-neutral-100 border border-neutral-200 rounded-lg flex flex-col justify-center gap-4">
            <LucideView size={40} className="text-neutral-500 mb-2 self-end"/>
            <h4 className="font-semibold text-sm text-neutral-500">Predict Market Trends</h4>

          </div>
          <div className="h-full w-full p-4 py-6 bg-neutral-100 border border-neutral-200  rounded-lg flex flex-col justify-center gap-4">
            <BriefcaseBusiness size={40} className="text-neutral-500 mb-2 self-end"/>
            <h4 className="font-semibold text-sm text-neutral-500">Ask Finance or Business Advice</h4>

          </div>
          <div className="h-full w-full p-4 py-6 bg-neutral-100 border border-neutral-200  rounded-lg flex flex-col justify-center gap-4">
            <HandCoins size={40} className="text-neutral-500 mb-2 self-end"/>
            <h4 className="font-semibold text-sm text-neutral-500">Your Mentor,<br/> Grow Your Business</h4>
          </div>
          
        </section>
        <h2 className="mx-2 mb-6 font-montserrat tracking-tight text-3xl font-bold text-zinc-700">
          Guided AI Business Adviser <u style={{textDecoration: 'underline wavy #F4BE37'}}>For You</u> 🫵
        </h2>
        <p className="mx-2 font-semibold leading text-zinc-500">
          Let's grab your entrepreneurial cape and let's transform those wild ideas into
          reality!
        </p>
      </span>
    </main>
  );
}
