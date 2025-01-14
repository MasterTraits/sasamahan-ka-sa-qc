"use client";
import { 
  BsBellFill, BsPersonCircle, BsPaperclip,
  BsSendArrowDown, BsArrowLeft, BsGearFill    
} from "react-icons/bs";

// Images
import Mic from "@/assets/Mic";
import AILogo from "@/assets/AILogo";
import Dots from "@/assets/Dots.svg";

// Components
import Link from "next/link";
import Image from "next/image";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
// React.js
import { useState, useEffect } from "react";
import { useMyContext } from "@/components/QueryContext";
import TypingAnimation from "@/components/typingAnim";
import LineChart2 from "@/components/charts/Linechart2";
import BarChart from "@/components/charts/BarChart2";
import DonutChart from "@/components/charts/DonutChart2";
Chart.register(CategoryScale);
let name = "Guest"; 

export default function page() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [userVisuals, setUserVisuals] = useState(false);
  const [showAISuggest, setShowAISuggest] = useState(false);
  const [queryInput, setTextInput] = useState("");
  const [queryParam, setQueryParam] = useState('');

  const [lineChartData, setLineChartData] = useState({
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], 
    datasets: [
      {
        label: "Sales ($)",
        data: [150, 170, 190, 200, 220, 250, 270],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#4CAF50",
        borderWidth: 3, 
        pointBackgroundColor: "#FF5722", 
        pointBorderColor: "#FFFFFF", 
        pointBorderWidth: 2,
        tension: 0.4, 
      },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const showFDashboard = (e) => {
    setShowDashboard(true);
    setUserVisuals(false);
  };

  const showSuggestions = (e) => {
    setUserVisuals(true);
    setShowDashboard(false);
  };
  
  useEffect(() => {
    // Access the query parameters using JavaScript
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get('query'); // Replace 'exampleParam' with your actual query key
    setQueryParam(param); // Set state to parameter value or empty string if not found
  }, []); // Empty dependency array so it only runs once on mount

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
    {/* Fixed header section */}
    <div className="absolute top-0 left-0 right-0 z-10 bg-background px-6 pt-7">
      <header className="relative flex items-start justify-between mb-5">
        <h1 className="text-4xl font-extrabold text-header tracking-tighter">
          Simulated, <br />
          Data
        </h1>
        <nav className="flex mt-2 gap-4 items-center">
          <BsBellFill className="text-2xl text-grayText" />
          <BsPersonCircle className="text-3xl text-grayText" />
          <BsGearFill className="text-3xl text-grayText mr-3" />
        </nav>
      </header>

      <group className="flex gap-2">
        <Link href="/aichat">
          <button className="rounded-full py-2 px-4 border-2 border-blue text-blue hover:bg-blue hover:border-none hover:text-white font-semibold mb-8 hover:scale-[1em]">
            New Chat &nbsp;+
          </button>
        </Link>
        <button className="rounded-full py-2 px-4 border-2 border-blue text-blue hover:bg-blue hover:border-none hover:text-white font-semibold mb-8 hover:scale-[1em]">
          Upload
        </button>
      </group>

      {/* Tab buttons */}
      <div className="bg-gold flex items-center justify-evenly h-10 w-full mb-3 rounded-[20px_20px_0_0]">
        <p
          onClick={showFDashboard}
          className={`${
            showDashboard ? "bg-blue" : "bg-gold"
          } text-white w-full h-full p-2 text-center font-semibold rounded-lg cursor-pointer`}
        >
          Dashboard
        </p>
        <p
          onClick={showSuggestions}
          className={`${
            userVisuals ? "bg-blue" : "bg-gold"
          } text-white w-full h-full p-2 text-center font-semibold rounded-lg cursor-pointer`}
        >
          Custom
        </p>
      </div>
    </div>

    {/* Scrollable content area */}
    <div className="absolute top-[250px] bottom-[80px] left-0 right-0 overflow-y-auto px-6">
      <h1 className="text-center font-bold text-xl mt-[1rem] mb-[10px]">Restaurant Business</h1>
      {showDashboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-min gap-4 pb-6">
          {/* Full width chart */}
          <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-2xl shadow-lg min-h-[300px]" 
               onClick={() => setShowAISuggest(!showAISuggest)}>
            <LineChart2 chartData={lineChartData} className="w-full h-full" />
          </div>

          {/* Half width charts */}
          <div className="bg-white p-4 rounded-2xl shadow-lg min-h-[300px]">
            <DonutChart />
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-lg min-h-[300px]">
            <BarChart />
          </div>
        </div>
      )}
      {userVisuals && ""}
    </div>

    {/* Fixed footer */}
    <footer className="absolute bottom-0 left-0 right-0 z-20 bg-background px-6 py-4">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-[1200px] mx-auto">
        <figure className="flex items-center bg-white rounded-3xl px-4 h-14 flex-1 drop-shadow-[0_0_20px_rgb(0,0,0,0.25)]">
          <div className="relative">
            <BsPaperclip className="text-4xl text-header p-1 mr-3 rounded-full bg-btnWhite" />
            <input type="file" className="top-[-3%] absolute w-8 opacity-0" />
          </div>
          <input
            type="text"
            className="text-lg flex-1 mr-3"
            placeholder="Ask me anything!"
            value={queryInput || queryParam}
            onChange={(e) => { setTextInput(e.target.value) }}
          />
          <Mic className="output text-4xl text-header p-2.5 rounded-full bg-btnWhite" />
        </figure>
        <button
          type="submit"
          className="relative h-14 w-14 rounded-full bg-blue flex-shrink-0"
        >
          <BsSendArrowDown className="absolute text-3xl text-btnWhite top-3.5 left-2.5" />
        </button>
      </form>
    </footer>

    {showAISuggest && viewAISuggest({ setShowAISuggest })}
  </main>
  );
}

function viewAISuggest({ setShowAISuggest }) {
  return (
    <main className="absolute z-10 top-0 p-5 bg-white h-screen w-screen">
      <header className="mb-10">
        <BsArrowLeft 
          className="text-4xl text-header"
          onClick={()=> setShowAISuggest(prev => !prev)}
        />
      </header>
      <main>
        <h1 className="my-4 text-4xl font-extrabold text-header tracking-tighter">Sales Insight</h1>
        <p className="my-4 mx-2 flex items-start">
          <img 
            src="https://site-assets.fontawesome.com/releases/v6.6.0/svgs/solid/sparkles.svg"
            className="h-8 w-8 mr-4 pb-1 brightness-[1000%] inline-block"
          />
        <TypingAnimation
  text={`
 import new message that corrolates sa question na ilalagay ni emman
  `}
  speed={0.01}
  delay={0.5}
  cursor={true}
  loop={false}
/>
        </p>
      </main>
    </main>
  );
}
