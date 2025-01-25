import React, { useState, useEffect, useRef } from 'react';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/Card';
import { Line, Bar, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import { Edit, Trash, Move } from 'lucide-react';
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
  const [selectedGraph, setSelectedGraph] = useState(null); // Track the selected graph

  // Handle saving a graph
  const handleSaveGraph = (graphConfig) => {
    if (editGraphIndex !== null) {
      // Edit existing graph
      const updatedGraphs = [...savedGraphs];
      updatedGraphs[editGraphIndex] = graphConfig;
      setSavedGraphs(updatedGraphs);
    } else {
      // Add new graph
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

  // Handle deleting the current card
  const handleDeleteGraph = (id) => {
    const updatedGraphs = savedGraphs.filter((graph) => graph.id !== id);
    setSavedGraphs(updatedGraphs);
    setOpenSuggestion(false); // Close the popup after deleting
  };

  // Handle editing the current card
  const handleEditGraph = (id) => {
    const index = savedGraphs.findIndex((graph) => graph.id === id);
    setEditGraphIndex(index); // Set the index of the graph being edited
    setGraphData(true); // Open the graph generator
    setOpenSuggestion(false); // Close the popup
  };

  // Update showAddButton based on the number of saved graphs
  useEffect(() => {
    setShowAddButton(savedGraphs.length < 6); // Max 6 graphs
  }, [savedGraphs]);

  return (
    <main className="flex flex-col items-center h-full w-full justify-center overflow-hidden">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full place-items-center gap-4"
          style={{ maxHeight: '80vh' }}
        >
          {savedGraphs.map((graph, index) => (
            <Card
              key={graph.id}
              className="relative bg-white shadow-md flex flex-col"
              onClick={() => handleOpenSuggestion(graph)} // Pass the graph data
              style={{
                width: '25rem',
                height: '25rem',
                minWidth: '18.75rem',
                minHeight: '18.75rem',
                maxWidth: '37.5rem',
                maxHeight: '37.5rem',
              }}
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
            </Card>
          ))}
          {showAddButton && <AddGraph onclick={() => setGraphData(true)} />}
        </section>
      )}

      {/* Render the suggestion popup */}
      {openSuggestion && (
        <GraphSuggestionPopup
          onClose={handleCloseSuggestion}
          onDelete={() => handleDeleteGraph(selectedGraph.id)}
          onEdit={() => handleEditGraph(selectedGraph.id)}
          selectedGraph={selectedGraph} // Pass the selected graph data
        />
      )}
    </main>
  );
}