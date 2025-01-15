import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useState } from 'react'

export default function ViewAISuggest() {
  const [showAISuggest, setShowAISuggest] = useState(true);

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
          {`
          <strong>Description of the Data:</strong><br />
          The dataset represents the <strong>sales figures</strong> for each day of the week, where each value corresponds to the total sales for a specific day:<br />
          <strong>Monday:</strong> $120<br />
          <strong>Tuesday:</strong> $150<br />
          <strong>Wednesday:</strong> $170<br />
          <strong>Thursday:</strong> $200<br />
          <strong>Friday:</strong> $180<br />
          <strong>Saturday:</strong> $220<br />
          <strong>Sunday:</strong> $250<br /><br />

          The dataset tracks daily sales, starting from Monday and increasing toward Sunday. The sales figures show an upward trend, indicating that sales grow throughout the week, with the highest sales recorded on Sunday at $250. The pattern suggests a typical trend where weekends, particularly Sundays, see higher sales compared to weekdays.<br /><br />

          This data could be used for analyzing weekly sales performance and understanding trends in customer behavior, such as peak shopping times or days with higher consumer spending.<br /><br />
          
          Let me know if you need further details or modifications for this!<br />
        `}
        </p>
      </main>
    </main>
  );
}
