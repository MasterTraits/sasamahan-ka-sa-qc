'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaArrowRight } from 'react-icons/fa';
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { BsPaperclip } from "react-icons/bs";
import { BsSendArrowDown } from "react-icons/bs";
import GABAY from '@/assets/GABAYY.png';
import Mic from "@/assets/Mic";
import runChat from "@/config/gemini"; 
import '@/app/app.module.css'
import Dots from "@/assets/Dots.svg";
import Image from "next/image";

function DateComponent() {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { month: 'short', day: 'numeric' };
    const date = now.toLocaleDateString(undefined, options);
    const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
    setCurrentDateTime(`${date}, ${time}`);
  }, []);

  return <span className="text-header font-bold my-0">{currentDateTime}</span>;
}

function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span dangerouslySetInnerHTML={{ __html: displayText }}></span>;
}

export default function ChatInterface() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prevChat, setPrevChat] = useState('');
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const onSent = async () => {
    if (!input) return; // prevent sending empty messages
    setLoading(true);
    setShowResult(true);
    setPrevChat(input);
    const truncatedInput = input.length > 20 ? `${input.substring(0, 20)}...` : input;
    setPrevChat(truncatedInput); 
    const response = await runChat(input);
    const formattedResponse = response.replace(/"([^"]*)\*\*([^*]+)\*\*([^"]*)"/, '"$1<b>$2</b>$3"')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    setResultData(formattedResponse);

    setConversationHistory([
      ...conversationHistory,
      { type: 'user', text: input },
      { type: 'ai', text: formattedResponse },
    ]);

    setLoading(false);
    setInput('');
  };

  const handleNewChat = () => {
    setShowResult(false);
    setConversationHistory([]);
  };

  return (
    <>
    <main className="h-screen overflow-hidden bg-background text-black p-2 z-0">
      {!showResult ? (
        <section className="bg-background h-screen flex items-center overflow-hidden p-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <section>
            <h1 className="w-3/4 ml-2 text-4xl font-bold tracking-tight mb-6">
              How can I help?
            </h1>
            <div className="w-full pb-5 z-50">
              <form>
                <div className="flex items-center gap-2 z-50 bg-white rounded-3xl px-4 h-14 drop-shadow-[0_0_20px_rgb(0,0,0,0.4)]">
                  <div className="flex gap-4 items-center w-full">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="text-lg w-full mr-2 focus:outline-none"
                      placeholder="Ask me anything!"
                      />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Mic className="text-4xl text-header p-2.5 rounded-full bg-btnWhite" />
                    <button onClick={onSent}>
                      <BsSendArrowDown className="text-2xl bg-btnWhite p-1.5 rounded-full h-10 w-10" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex gap-3">
              <button className="btn z-50" type="button">
                <strong className="cuzImStrong">CSV</strong>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle z-0"></div>
                  <div className="circle z-0"></div>
                </div>
              </button>
              <button className="btn" type="button">
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
              </button>
            </div>
          </section>
          <article className="relative">
            <div className="fixed items-center justify-center w-56 h-56 top-[-15%] left-[-25%] bg-blue rounded-full"></div>
            <Image src={Dots} className="fixed top-0 right-0 z-0" alt="Dots" />
            <div className="fixed bg-gold w-56 h-72 top-5 right-[-40%] rounded-full"></div>
            <Image src={Dots} className="fixed bottom-[-5%] left-0" alt="Dots" />
          </article>
        </section>
      ) : (
        <>
          {/* Header */}
          <header className='flex items-center justify-between bg-gray-800 p-4'>
            <div className='flex items-center mr-10'>
              <button onClick={toggleSidebar} className='bg-btnGray rounded-full p-[5px] text-white mr-5'>
                <IoReorderThreeOutline className='text-3xl text-yellow' />
              </button>

              {isSidebarOpen && (
                <section className={`fixed top-0 left-0 h-full w-4/5 bg-header transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-opacity-90 backdrop-blur-sm z-10`}>
                  <section className='flex-col justify-between items-center p-4 text-grayText'>
                    <header className='flex justify-start items-center'>
                      <button className='flex justify-center items-center bg-header h-[3.5rem] w-[15rem] rounded-full ' onClick={handleNewChat}>
                        <p className='text-lg text-grayText'>New Advice</p> 
                        <FaPlus className='ml-3' />
                      </button>
                      <button onClick={toggleSidebar} className='ml-5'>
                        <FaArrowRight className='text-xl' />
                      </button>
                    </header>

                    <div className="flex items-center mt-3 bg-header rounded-full p-5 max-w-[20rem]">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="flex-grow bg-header focus:outline-none"
                      />
                      <CiSearch className="ml-3 text-xl" />
                    </div>

                    <br />
                    <div className='p-3'>
                      <hr className='text-grayText opacity-40'/>
                      <article className='mt-2 mb-8 flex flex-col gap-3'>
                        <p className='text-sm mb-1 '>Today</p>
                        <h1 className='text-lg'>{prevChat}</h1>
                      </article>
                      <hr className='mb-3 mt-10 text-grayText opacity-40'/>
                    </div>
                  </section>
                </section>
              )}

              <span className='flex flex-col ml-2 my-0 space-y-0'>
                <h1 className='text-header tracking-tighter font-bold my-0'>AI Chat</h1>
                <DateComponent />
              </span>
            </div>

            <span className='ml-auto flex gap-3'>
              <button className="bg-btnGray rounded-full p-[5px] text-white" onClick={handleNewChat}>
                <FaPlus className='text-2xl text-yellow' />
              </button>
              <button className="bg-btnGray rounded-full p-[5px] text-white">
                <MdClose className='text-3xl text-yellow font-semibold' />
              </button>
            </span>
          </header>

          {/* Main Chat Section */}
          <section className="h-screen bg-background px-5 py-3 items-center justify-center">
            <section className="w-full h-[calc(84vh-5rem)] overflow-y-scroll">
              {conversationHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={`chat flex w-auto h-auto pb-3 mt-5 mr-3 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.type === "user" ? (
                    <div className="bg-gold text-white px-4 py-2 rounded-lg rounded-br-none max-w-[80%]">
                      <p>{message.text}</p>
                    </div>
                  ) : (
                    <div className="flex items-start w-full max-w-[95%]">
                    <div className="rounded-full w-[2.5rem] h-[2.5rem] p-[10px] mr-1 bg-header flex-shrink-0">
                      <Image src={GABAY} className="w-full h-full object-cover" loading="eager" placeholder="empty" />
                    </div>
                      <div className="flex-1 bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
                        <TypewriterText text={message.text} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </section>

          {/* Footer Input */}
          <footer className="fixed bottom-10 w-full flex items-center justify-center">
            <section className="flex items-center gap-2">
              <div className="flex items-center bg-white rounded-3xl px-4 h-14 w-9/12 drop-shadow-[0_0_20px_rgb(0,0,0,0.25)]">
                <div className="flex gap-4 items-center w-full">
                  <div className="relative">
                    <BsPaperclip className="text-4xl text-header p-1 rounded-full bg-btnWhite" />
                    <input
                      type="file"
                      className="top-[-3%] absolute w-8 opacity-0"
                    />
                  </div>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="text-lg w-full mr-2 focus:outline-none"
                    placeholder="Ask me anything!"
                    />
                </div>
                <Mic className="text-4xl text-header p-2.5 rounded-full bg-btnWhite" />
              </div>
              <button
                onClick={onSent}
                className="relative ml-2 h-14 w-14 rounded-full bg-blue"
                >
                <BsSendArrowDown className="absolute text-3xl text-btnWhite top-3.5 left-2.5" />
              </button>
            </section>
          </footer>
        </>
      )}
    </main>
      </>
  );
} 