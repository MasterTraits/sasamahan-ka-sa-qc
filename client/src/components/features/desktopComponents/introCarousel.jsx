import React from "react";

export default function IntroCarousel() {
  return (
    <main className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md h-[41.5rem] flex items-center justify-center  *:font-montserrat">
      <span>
        <img src="/img3.jpg" />
        <h2 className="mx-2 mb-7 font-montserrat tracking-tight text-3xl font-bold text-zinc-700">
          Hey there, <br />
          <span className="mt-2 p-2 bg-gold rounded-md">
            Diskartista 
          </span>
          <span className="text-5xl">👋</span>
        </h2>
        <p className="mx-2 font-semibold leading text-zinc-500">
          Let's grab your entrepreneurial cape and let's transform those wild ideas into
          reality!
        </p>
      </span>
    </main>
  );
}
