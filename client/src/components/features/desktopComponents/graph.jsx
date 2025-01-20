import React from "react";

function GraphGrid({ graphs, setGraphs }) {
  // Function to handle removing a graph
  const handleRemoveGraph = (id) => {
    setGraphs(graphs.filter((graph) => graph.id !== id));
  };

  return (
    <div
      className="w-full h-full grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${Math.min(graphs.length, 4)}, 1fr)`,
        gridAutoRows: "1fr",
      }}
    >
      {graphs.map((graph) => (
        <div
          key={graph.id}
          className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between"
        >
          <h3 className="text-center font-bold">{graph.title}</h3>
          <button
            onClick={() => handleRemoveGraph(graph.id)}
            className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default GraphGrid;
