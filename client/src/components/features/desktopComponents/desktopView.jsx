import React, { useState } from 'react';
import Header from '@/components/features/desktopComponents/header';
import GraphGrid from '@/components/features/desktopComponents/graph';

function Dashboard() {
  // Define state for graphs
  const [graphs, setGraphs] = useState([
    { id: 1, title: "Graph 1" },
    { id: 2, title: "Graph 2" },
  ]);

  // Function to add a graph
  const handleAddGraph = () => {
    const newId = graphs.length ? graphs[graphs.length - 1].id + 1 : 1;
    setGraphs([...graphs, { id: newId, title: `Graph ${newId}` }]);
  };

  return (
    <main className="flex w-full h-screen flex-col p-8 relative">
      <Header name="Estanislao" />

      {/* Add Graph Button */}
      <div className="mb-4">
        <button
          onClick={handleAddGraph} // Call the function to add a graph
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Graph
        </button>
      </div>

      {/* Graph Grid Section */}
      <section className="grid grid-cols-6 grid-rows-6 gap-4 h-full w-full p-4 bg-gray-100">
        {/* Passing graphs state to GraphGrid */}
        <GraphGrid graphs={graphs} setGraphs={setGraphs} />
      </section>
    </main>
  );
}

export default Dashboard;
