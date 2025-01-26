import { useRef, useState, useEffect } from "react";
import Form from "@/components/features/form";

const DynamicDivWithTailwind = () => {
  const referenceDivRef = useRef(null);
  const [referenceHeight, setReferenceHeight] = useState(0);

  useEffect(() => {
    // Update the height of the reference div dynamically
    const updateHeight = () => {
      if (referenceDivRef.current) {
        setReferenceHeight(referenceDivRef.current.offsetHeight);
      }
    };

    // Update on load and resize
    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const [showContextForm, setShowContextForm] = useState(true); // State to control the visibility of the context form
  const [businessType, setBusinessType] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [businessPlacement, setBusinessPlacement] = useState("");
  const [financeUnderstanding, setFinanceUnderstanding] = useState("");
  const [comfortWithGraphs, setComfortWithGraphs] = useState("");

  const handleContextSubmit = async (e) => {
    e.preventDefault();
    setShowContextForm(false); // Hide the form after submission

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
    console.log("Form skipped, no context provided");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Reference Div */}
      <div ref={referenceDivRef} className="bg-blue-400 p-4 text-center">
        Reference Div (Height: {referenceHeight}px)
      </div>

      {/* Dynamic Div */}
      <div className="bg-red-400 flex-1">
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
      </div>
    </div>
  );
};

export default DynamicDivWithTailwind;
