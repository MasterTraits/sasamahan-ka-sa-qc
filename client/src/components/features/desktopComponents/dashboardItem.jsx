import React, { useState, useEffect, useRef } from 'react';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/Card';
import { Line, Bar, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import {  Move } from 'lucide-react';
import GraphGenerator from '../graphs/graph';
import AddGraph from './addGraphButton';
import GraphSuggestionPopup from './graphSuggestionPopup';

export default function DashboardContent() {
  const [graphData, setGraphData] = useState(false);
  const [savedGraphs, setSavedGraphs] = useState([]);
  const [editGraphIndex, setEditGraphIndex] = useState(null);
  const [showAddButton, setShowAddButton] = useState(true);
  const gridContainerRef = useRef(null);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [cardDimensions, setCardDimensions] = useState({});

  const handleSaveGraph = (graphConfig) => {
    if (editGraphIndex !== null) {
      const updatedGraphs = [...savedGraphs];
      updatedGraphs[editGraphIndex] = graphConfig;
      setSavedGraphs(updatedGraphs);
    } else {
      setSavedGraphs([...savedGraphs, { ...graphConfig, id: Date.now() }]);
    }
    setGraphData(false);
    setEditGraphIndex(null);
  };

  const handleOpenSuggestion = (graph) => {
    setSelectedGraph(graph);
    setOpenSuggestion(true);
  };

  const handleCloseSuggestion = () => {
    setOpenSuggestion(false);
    setSelectedGraph(null);
  };

  const handleDeleteGraph = (id) => {
    const updatedGraphs = savedGraphs.filter((graph) => graph.id !== id);
    setSavedGraphs(updatedGraphs);
    setOpenSuggestion(false);
  };

  const handleEditGraph = (id) => {
    const index = savedGraphs.findIndex((graph) => graph.id === id);
    setEditGraphIndex(index);
    setGraphData(true);
    setOpenSuggestion(false);
  };

  const handleResize = (id, event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = cardDimensions[id]?.width || 300;
    const startHeight = cardDimensions[id]?.height || 300;

    const handleMouseMove = (e) => {
      const newWidth = Math.min(Math.max(startWidth + (e.clientX - startX), 200), 600);
      const newHeight = Math.min(Math.max(startHeight + (e.clientY - startY), 200), 600);
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

  useEffect(() => {
    setShowAddButton(savedGraphs.length < 6);
  }, [savedGraphs]);

  return (
    <main className="flex flex-col items-center h-full w-full justify-center lg:overflow-hidden sm:overflow-y-auto">
      {graphData && (
        <GraphGenerator
          onClose={() => setGraphData(false)}
          onSaveToDashboard={handleSaveGraph}
          initialConfig={editGraphIndex !== null ? savedGraphs[editGraphIndex] : null}
        />
      )}
      {savedGraphs.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <AddGraph onclick={() => setGraphData(true)} />
        </div>
      ) : (
        <section
          ref={gridContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full place-items-center gap-4 p-4"
          style={{ maxHeight: '80vh' }}
        >
          {savedGraphs.map((graph) => (
            <Card
              key={graph.id}
              className="relative bg-white shadow-md flex flex-col
                w-full sm:w-[15rem] lg:w-[20rem] h-[20rem] sm:h-[20rem] lg:h-[25rem]
                min-w-[10rem] min-h-[10rem] max-w-[90vw] max-h-[30rem]"
              style={{
                width: cardDimensions[graph.id]?.width || '100%',
                height: cardDimensions[graph.id]?.height || '20rem',
              }}
              onClick={() => handleOpenSuggestion(graph)}
            >
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-header text-center">{graph.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center w-full h-full max-h-[70%]">
                {graph.type === 'line' && <Line data={graph.data} options={graph.options} />}
                {graph.type === 'bar' && <Bar data={graph.data} options={graph.options} />}
                {graph.type === 'pie' && <Pie data={graph.data} options={graph.options} />}
                {graph.type === 'doughnut' && <Doughnut data={graph.data} options={graph.options} />}
                {graph.type === 'polarArea' && <PolarArea data={graph.data} options={graph.options} />}
                {graph.type === 'radar' && <Radar data={graph.data} options={graph.options} />}
              </CardContent>
              <div
                className="absolute bottom-0 right-0 cursor-se-resize p-2"
                onMouseDown={(e) => handleResize(graph.id, e)}
              >
                <Move size={16} />
              </div>
            </Card>
          ))}
          {showAddButton && <AddGraph onclick={() => setGraphData(true)} />}
        </section>
      )}

      {openSuggestion && (
        <GraphSuggestionPopup
          onClose={handleCloseSuggestion}
          onDelete={() => handleDeleteGraph(selectedGraph.id)}
          onEdit={() => handleEditGraph(selectedGraph.id)}
          selectedGraph={selectedGraph}
        />
      )}
    </main>
  );
}