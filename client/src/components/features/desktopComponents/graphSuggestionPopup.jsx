import React, { useRef, useState } from 'react';
import { X, Trash, Edit, Sparkle } from 'lucide-react';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/Card';
import { Line, Bar, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import axios from 'axios';

export default function GraphSuggestionPopup({ onClose, onDelete, onEdit, selectedGraph }) {
  const popupRef = useRef(null);
  const [showGabayPopup, setShowGabayPopup] = useState(false);
  const [gabaySuggestions, setGabaySuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAskGabay = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/suggest-graph', {
        csv_data: selectedGraph.data.datasets[0].dataSource,
        x_axis_column: selectedGraph.xAxisColumn,
        y_axis_column: selectedGraph.yAxisColumn,
      });
      setGabaySuggestions({
        graphType: response.data.suggestedGraphType,
        insights: response.data.insights,
        recommendations: response.data.recommendations,
        predictions: response.data.predictions,
      });
      setShowGabayPopup(true);
    } catch (error) {
      console.error("Error fetching GABAY suggestions:", error);
      alert("Failed to fetch GABAY suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
              className="bg-purple-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-md flex items-center justify-center gap-1 sm:gap-2 flex-grow text-xs sm:text-sm"
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <Sparkle size={12} className="sm:size-4" />
                  Ask GABAY!
                </>
              )}
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
              {gabaySuggestions ? (
                <>
                  <p className="text-gray-600">
                    GABAY suggests using a <strong>{gabaySuggestions.graphType}</strong> graph for this data.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Insights:</h4>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {gabaySuggestions.insights}
                    </p>
                    <h4 className="text-lg font-semibold">Recommendations:</h4>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {gabaySuggestions.recommendations}
                    </p>
                    <h4 className="text-lg font-semibold">Predictions:</h4>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {gabaySuggestions.predictions}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-gray-600">
                  No suggestions available. Please try again.
                </p>
                 

              )}
            </div>
          </CardContent>
        )}
      </div>
    </>
  );
}