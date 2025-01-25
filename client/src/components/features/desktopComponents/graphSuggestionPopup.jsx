import React, { useRef, useState } from 'react';
import { X, Trash, Edit, Sparkle } from 'lucide-react';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/Card';
import { Line, Bar, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';

export default function GraphSuggestionPopup({ onClose, onDelete, onEdit, selectedGraph }) {
  const popupRef = useRef(null);
  const [showGabayPopup, setShowGabayPopup] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleEdit = () => {
    onEdit();
    onClose();
  };

  const handleAskGabay = () => {
    setShowGabayPopup(true);
  };

  const renderGraph = () => {
    if (!selectedGraph) return null;

    switch (selectedGraph.type) {
      case 'line':
        return <Line data={selectedGraph.data} options={selectedGraph.options} />;
      case 'bar':
        return <Bar data={selectedGraph.data} options={selectedGraph.options} />;
      case 'pie':
        return <Pie data={selectedGraph.data} options={selectedGraph.options} />;
      case 'doughnut':
        return <Doughnut data={selectedGraph.data} options={selectedGraph.options} />;
      case 'polarArea':
        return <PolarArea data={selectedGraph.data} options={selectedGraph.options} />;
      case 'radar':
        return <Radar data={selectedGraph.data} options={selectedGraph.options} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Main Popup */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <CardContent
          ref={popupRef}
          className="bg-white p-4 rounded-lg w-full sm:w-2/3 lg:w-1/3 relative"
        >
          <button
            className="absolute top-5 right-3 text-gray"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
          <CardTitle className="text-xl font-bold">Edit Graph</CardTitle>

          {selectedGraph && (
            <section className="mt-4">
              <h3 className="text-lg font-semibold">Graph Preview</h3>
              <div className="w-full h-48 sm:h-64 flex justify-center items-center">
                {renderGraph()}
              </div>
            </section>
          )}

          {/* Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAskGabay}
              className="bg-purple-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-md flex items-center justify-center gap-1 sm:gap-2 flex-grow text-xs sm:text-sm"
            >
              <Sparkle size={12} className="sm:size-4" />
              Ask GABAY!
            </button>
            <button
              onClick={handleEdit}
              className="bg-blue text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-md flex items-center justify-center gap-1 sm:gap-2 flex-grow text-xs sm:text-sm"
            >
              <Edit size={12} className="sm:size-4" />
              Edit Current Graph
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-md flex items-center justify-center gap-1 sm:gap-2 flex-grow text-xs sm:text-sm"
            >
              <Trash size={12} className="sm:size-4" />
              Delete Current Graph
            </button>
          </div>

        </CardContent>

        {/* GABAY Popup */}
        {showGabayPopup && (
          <CardContent
            className="bg-white p-4 rounded-lg w-full sm:w-2/3 lg:w-1/3 relative sm:ml-4 mt-4 sm:mt-0"
          >
            <button
              className="absolute top-5 right-3 text-gray"
              onClick={() => setShowGabayPopup(false)}
            >
              <X size={20} />
            </button>
            <CardTitle className="text-xl font-bold">GABAY Suggestions</CardTitle>
            <div className="mt-4">
              <p className="text-gray-600">
                This is a placeholder for GABAY suggestions. Here, you can display insights or recommendations based on the selected graph.
              </p>
            </div>
          </CardContent>
        )}
      </div>
    </>
  );
}