import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/Card';
import { Line, Bar, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import { Edit, Trash } from 'lucide-react';
import GraphGenerator from '../graphs/graph';
import AddGraph from './addGraphButton';

export default function DashboardContent() {
  const [graphData, setGraphData] = useState(false);
  const [savedGraphs, setSavedGraphs] = useState([]);
  const [editGraphIndex, setEditGraphIndex] = useState(null);
  const [showAddCard, setShowAddCard] = useState(true);

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

  useEffect(() => {
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
      const gridItems = gridContainer.children;
      const containerWidth = gridContainer.clientWidth;
      const gap = 16;
      const cardWidth = 200; 
      const maxCardsPerRow = Math.floor(containerWidth / (cardWidth + gap));

      const totalCards = gridItems.length;
      const cardsInLastRow = totalCards % maxCardsPerRow;

      if (cardsInLastRow === 0 && totalCards > 0) {
        setShowAddCard(false);
      } else {
        setShowAddCard(true);
      }
    }
  }, [savedGraphs]);

  return (
    <main className="flex flex-col flex-1 p-6 overflow-auto">
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-container">
          {savedGraphs.map((graph, index) => (
            <Card key={index} className="relative bg-white shadow-md">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-header text-center">{graph.title}</CardTitle>
                <div className="flex space-x-2">
                  <button onClick={() => handleEditGraph(index)} className="text-blue-500 hover:text-blue-700">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDeleteGraph(index)} className="text-red-500 hover:text-red-700">
                    <Trash size={20} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="h-64">
                {graph.type === 'line' && <Line data={graph.data} options={graph.options} />}
                {graph.type === 'bar' && <Bar data={graph.data} options={graph.options} />}
                {graph.type === 'pie' && <Pie data={graph.data} options={graph.options} />}
                {graph.type === 'doughnut' && <Doughnut data={graph.data} options={graph.options} />}
                {graph.type === 'polarArea' && <PolarArea data={graph.data} options={graph.options} />}
                {graph.type === 'radar' && <Radar data={graph.data} options={graph.options} />}
              </CardContent>
            </Card>
          ))}
          {showAddCard && <AddGraph onclick={handleAddGraphClick} />}
        </section>
      )}
    </main>
  );
}