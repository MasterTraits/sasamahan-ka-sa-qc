import { useRef, useState, useEffect } from "react";

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

  return (
    <div className="flex flex-col h-screen">
      {/* Reference Div */}
      <div
        ref={referenceDivRef}
        className="bg-blue-400 p-4 text-center"
      >
        Reference Div (Height: {referenceHeight}px)
      </div>

      {/* Dynamic Div */}
      <div
        className="bg-red-400 flex-1"
        style={{ height: `calc(100% - ${referenceHeight}px)` }}
      >
        Dynamic Div (Remaining Height)
      </div>
    </div>
  );
};

export default DynamicDivWithTailwind;
