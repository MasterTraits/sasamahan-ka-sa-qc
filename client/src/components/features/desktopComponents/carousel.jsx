import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Form from "../form";
import IntroCarousel from "./IntroCarousel";
import Features from "./featuresCarousel";
import axios from "axios"; // Ensure axios is installed

export default function Carousel1() {
  const [showContextForm, setShowContextForm] = useState(true); // State to control the visibility of the context form
  const [showCarousel, setShowCarousel] = useState(true); // State to control the visibility of the carousel
  const [businessType, setBusinessType] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [businessPlacement, setBusinessPlacement] = useState("");
  const [financeUnderstanding, setFinanceUnderstanding] = useState("");
  const [comfortWithGraphs, setComfortWithGraphs] = useState("");

  const handleContextSubmit = async (e) => {
    e.preventDefault();
    setShowContextForm(false);
    
    setShowCarousel(false); 

    const context = {
      business_type: businessType,
      monthly_revenue: monthlyRevenue,
      business_placement: businessPlacement,
      finance_understanding: financeUnderstanding,
      comfort_with_graphs: comfortWithGraphs,
    };

    try {
      // Send the context to the backend
      await axios.post("http://localhost:8000/api/set-context", context);
      console.log("Context submitted successfully");
    } catch (error) {
      console.error("Error submitting context:", error.message);
    }

  };

  const handleSkipForm = () => {
    setShowContextForm(false);
    setShowCarousel(false); // Close the carousel
  };

  // If the carousel is closed, don't render anything
  if (!showCarousel) return null;

  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Carousel className="w-full max-w-md h">
        <CarouselContent className='flex items-center'>
            <CarouselItem>
              <IntroCarousel />
            </CarouselItem>

            <CarouselItem>
              <Features />
            </CarouselItem>       

            <CarouselItem >
              <Form
                showContextForm={showContextForm}
                handleContextSubmit={handleContextSubmit}
                handleSkipForm={handleSkipForm}
                businessType={businessType}
                setBusinessType={setBusinessType}
                monthlyRevenue={monthlyRevenue}
                setMonthlyRevenue={setMonthlyRevenue}
                businessPlacement={businessPlacement}
                setBusinessPlacement={setBusinessPlacement}
                financeUnderstanding={financeUnderstanding}
                setFinanceUnderstanding={setFinanceUnderstanding}
                comfortWithGraphs={comfortWithGraphs}
                setComfortWithGraphs={setComfortWithGraphs}
              />
            </CarouselItem>
            
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}