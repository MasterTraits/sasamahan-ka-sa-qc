import React, { useState, useEffect, useRef } from 'react';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/Card';
import { Line, Bar, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import { Edit, Trash, Move } from 'lucide-react';
import GraphGenerator from '../graphs/graph';
import AddGraph from './addGraphButton';

export default function DashboardContent() {
  const [graphData, setGraphData] = useState(false);
  const [savedGraphs, setSavedGraphs] = useState([]);
  const [editGraphIndex, setEditGraphIndex] = useState(null);
  const [showAddButton, setShowAddButton] = useState(true);
  const gridContainerRef = useRef(null);

  // State to track card dimensions
  const [cardDimensions, setCardDimensions] = useState({});

  const handleAddGraphClick = () => {
    setGraphData(true);
    setEditGraphIndex(null);
  };

  const handleCloseGraph = () => {
    setGraphData(false);
    setEditGraphIndex(null);
  };

  const handleSaveToDashboard = (graphConfig) => {
    if (editGraphIndex !== null) {
      const updatedGraphs = [...savedGraphs];
      updatedGraphs[editGraphIndex] = graphConfig;
      setSavedGraphs(updatedGraphs);
    } else {
      setSavedGraphs([...savedGraphs, { ...graphConfig, id: Date.now() }]); // Add a unique ID
    }
  };

  const handleEditGraph = (index) => {
    const graphToEdit = savedGraphs[index];
    setEditGraphIndex(index);
    setGraphData(true);
  };

  const handleDeleteGraph = (id) => {
    const updatedGraphs = savedGraphs.filter((graph) => graph.id !== id);
    setSavedGraphs(updatedGraphs);
  };

  // Handle card resizing
  const handleResize = (id, event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = cardDimensions[id]?.width || 400; // Default width
    const startHeight = cardDimensions[id]?.height || 400; // Default height

    const handleMouseMove = (e) => {
      const newWidth = Math.min(Math.max(startWidth + (e.clientX - startX), 300), 600); // Min: 300px, Max: 600px
      const newHeight = Math.min(Math.max(startHeight + (e.clientY - startY), 300), 600); // Min: 300px, Max: 600px
      setCardDimensions((prev) => ({
        ...prev,
        [id]: { width: newWidth, height: newHeight },
      }));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Set the maximum number of graphs to 6
  const maxGraphs = 6;

  // Update showAddButton based on the number of saved graphs
  useEffect(() => {
    setShowAddButton(savedGraphs.length < maxGraphs);
  }, [savedGraphs]);

  return (
    <main className="flex flex-col items-center h-full w-full justify-center overflow-hidden">
      {graphData && (
        <GraphGenerator
          onClose={handleCloseGraph}
          onSaveToDashboard={handleSaveToDashboard}
          initialConfig={editGraphIndex !== null ? savedGraphs[editGraphIndex] : null}
        />
      )}
      {savedGraphs.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <AddGraph onclick={handleAddGraphClick} />
        </div>
      ) : (
        <section
          ref={gridContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full place-items-center gap-4"
          style={{ maxHeight: '80vh' }}
        >
          {savedGraphs.map((graph) => (
            <Card
              key={graph.id} // Use unique ID as key
              className="relative bg-white shadow-md flex flex-col"
              style={{
                width: cardDimensions[graph.id]?.width ? `${cardDimensions[graph.id].width / 16}rem` : '25rem',
                height: cardDimensions[graph.id]?.height ? `${cardDimensions[graph.id].height / 16}rem` : '25rem',
                minWidth: '18.75rem', // Minimum width
                minHeight: '18.75rem', // Minimum height
                maxWidth: '37.5rem', // Maximum width
                maxHeight: '37.5rem', // Maximum height
              }}
            >
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-header text-center">{graph.title}</CardTitle>
                <div className="flex space-x-2">
                  <button onClick={() => handleEditGraph(savedGraphs.indexOf(graph))} className="text-grayText hover:text-blue transition transform">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDeleteGraph(graph.id)} className="text-red-500 hover:text-red-700">
                    <Trash size={20} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="flex justify-center items-center w-full h-full max-h-[70%]">
                {graph.type === 'line' && <Line data={graph.data} options={graph.options} />}
                {graph.type === 'bar' && <Bar data={graph.data} options={graph.options} />}
                {graph.type === 'pie' && <Pie data={graph.data} options={graph.options} />}
                {graph.type === 'doughnut' && <Doughnut data={graph.data} options={graph.options} />}
                {graph.type === 'polarArea' && <PolarArea data={graph.data} options={graph.options} />}
                {graph.type === 'radar' && <Radar data={graph.data} options={graph.options} />}
              </CardContent>
              {/* Resize handle */}
              <div
                className="absolute bottom-0 right-0 cursor-se-resize p-2"
                onMouseDown={(e) => handleResize(graph.id, e)}
              >
                <Move size={16} className="text-gray-500" />
              </div>
            </Card>
          ))}
          {showAddButton && <AddGraph onclick={handleAddGraphClick} />}
        </section>
      )}
    </main>
  );
}   