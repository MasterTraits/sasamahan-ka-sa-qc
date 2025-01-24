import React, { useState, useEffect, useRef } from 'react';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/Card';
import { Line, Bar, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import { Edit, Trash, Move } from 'lucide-react'; // Added Move icon for resize handle
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
      setSavedGraphs([...savedGraphs, graphConfig]);
    }
  };

  const handleEditGraph = (index) => {
    const graphToEdit = savedGraphs[index];
    setEditGraphIndex(index);
    setGraphData(true);
  };

  const handleDeleteGraph = (index) => {
    const updatedGraphs = savedGraphs.filter((_, i) => i !== index);
    setSavedGraphs(updatedGraphs);
  };

  // Handle card resizing
  const handleResize = (index, event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = cardDimensions[index]?.width || 300; // Default width
    const startHeight = cardDimensions[index]?.height || 320; // Default height

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
      setCardDimensions((prev) => ({
        ...prev,
        [index]: { width: newWidth, height: newHeight },
      }));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Calculate whether to show the AddGraph button
  useEffect(() => {
    const gridContainer = gridContainerRef.current;
    if (!gridContainer) return;

    const calculateMaxGraphs = () => {
      const viewportHeight = window.innerHeight;
      const cardHeight = 320; // Approximate height of each card (adjust as needed)
      const gap = 16; // Gap between cards
      const maxRows = Math.floor((0.8 * viewportHeight) / (cardHeight + gap)); // 80% of viewport height

      const cardsPerRow = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3; // Responsive cards per row
      const maxGraphs = maxRows * cardsPerRow;

      return maxGraphs;
    };

    const checkAddButtonVisibility = () => {
      const maxGraphs = calculateMaxGraphs();
      const hasSpace = savedGraphs.length < maxGraphs;

      setShowAddButton(hasSpace);
    };

    checkAddButtonVisibility();

    const observer = new ResizeObserver(checkAddButtonVisibility);
    observer.observe(gridContainer);

    return () => {
      observer.disconnect();
    };
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full place-items-center"
          style={{ maxHeight: '80vh' }}
        >
          {savedGraphs.map((graph, index) => (
            <Card
              key={index}
              className="relative bg-white shadow-md flex flex-col"
              style={{
                width: cardDimensions[index]?.width || '300px',
                height: cardDimensions[index]?.height || '320px',
              }}
            >
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-header text-center">{graph.title}</CardTitle>
                <div className="flex space-x-2">
                  <button onClick={() => handleEditGraph(index)} className="text-grayText hover:text-blue transition transform">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDeleteGraph(index)} className="text-red-500 hover:text-red-700">
                    <Trash size={20} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="h-auto w-full flex justify-center items-center p-4">
                <div className="w-full h-full">
                  {graph.type === 'line' && <Line data={graph.data} options={graph.options} />}
                  {graph.type === 'bar' && <Bar data={graph.data} options={graph.options} />}
                  {graph.type === 'pie' && <Pie data={graph.data} options={graph.options} />}
                  {graph.type === 'doughnut' && <Doughnut data={graph.data} options={graph.options} />}
                  {graph.type === 'polarArea' && <PolarArea data={graph.data} options={graph.options} />}
                  {graph.type === 'radar' && <Radar data={graph.data} options={graph.options} />}
                </div>
              </CardContent>
              {/* Resize handle */}
              <div
                className="absolute bottom-0 right-0 cursor-se-resize p-2"
                onMouseDown={(e) => handleResize(index, e)}
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