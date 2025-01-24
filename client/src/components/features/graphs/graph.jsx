import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, PolarArea, Pie, Radar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';
import { X, Save } from 'lucide-react';

Chart.register(CategoryScale);

export default function GraphGenerator({ onClose, onSaveToDashboard, initialConfig }) {
  const [csvData, setCsvData] = useState(initialConfig?.data?.datasets[0]?.dataSource || null); // Set csvData from initialConfig
  const [graphType, setGraphType] = useState(initialConfig?.type || 'line');
  const [xAxisColumn, setXAxisColumn] = useState(initialConfig?.xAxisColumn || '');
  const [yAxisColumn, setYAxisColumn] = useState(initialConfig?.yAxisColumn || '');
  const [fileName, setFileName] = useState(initialConfig?.fileName || '');
  const [graphTitle, setGraphTitle] = useState(initialConfig?.title || ''); // New state for graph title

  useEffect(() => {
    if (initialConfig?.data?.datasets[0]?.dataSource) {
      setCsvData(initialConfig.data.datasets[0].dataSource);
      setXAxisColumn(initialConfig.xAxisColumn);
      setYAxisColumn(initialConfig.yAxisColumn);
      setFileName(initialConfig.fileName);
      setGraphTitle(initialConfig.title); // Set the initial title
    }
  }, [initialConfig]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      Papa.parse(event.target.result, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
          if (results.data.length > 0) {
            const firstRow = results.data[0];
            const columns = Object.keys(firstRow);
            setXAxisColumn(columns[0]);
            setYAxisColumn(columns[1]);
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        }
      });
    };

    reader.readAsText(file);
  };

  const extractColumnData = (data, columnName) => {
    if (!data || !Array.isArray(data) || !columnName) {
      return [];
    }
    return data.map(row => row[columnName]);
  };

  const xAxisData = extractColumnData(csvData, xAxisColumn);
  const yAxisData = extractColumnData(csvData, yAxisColumn);

  const generateBackgroundColors = (length) => {
    const colors = [];
    for (let i = 0; i < length; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`);
    }
    return colors;
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: yAxisColumn,
        data: yAxisData,
        dataSource: csvData, // Store the original CSV data for editing
        backgroundColor:
          graphType === 'pie' || graphType === 'doughnut' || graphType === 'polarArea'
            ? generateBackgroundColors(xAxisData.length)
            : graphType === 'line'
            ? 'rgba(49, 116, 192, 0.2)'
            : 'rgba(49, 116, 192, 0.6)',
        borderColor: 'rgb(66, 134, 64)',
        borderWidth: 2,
        fill: graphType === 'line',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(66, 189, 42)',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleSaveToDashboard = () => {
    if (!csvData || !xAxisColumn || !yAxisColumn || !graphTitle) {
      alert("Please ensure all fields are filled out.");
      return;
    }

    const graphConfig = {
      type: graphType,
      data: chartData,
      options: options,
      xAxisColumn,
      yAxisColumn,
      fileName,
      title: graphTitle, // Use the user-defined title
    };

    onSaveToDashboard(graphConfig);
    onClose();
  };

  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <section className="bg-white rounded-lg p-4 sm:p-6 w-11/12 max-w-4xl mx-4 sm:mx-0">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Create Graph</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            <X size={20} />
          </button>
        </header>

        <form className="space-y-4">
          <fieldset className="flex flex-col space-y-2">
            <label htmlFor="file-upload" className="text-sm font-medium">
              Upload CSV File
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              accept=".csv"
              className="border rounded-lg p-2 text-sm"
            />
          </fieldset>

          <fieldset className="flex flex-col space-y-2">
            <label htmlFor="graph-type" className="text-sm font-medium">
              Graph Type
            </label>
            <select
              id="graph-type"
              value={graphType}
              onChange={(e) => setGraphType(e.target.value)}
              className="border rounded-lg p-2 text-sm"
            >
              <option value="line">Line Graph</option>
              <option value="bar">Bar Graph</option>
              <option value="pie">Pie Chart</option>
              <option value="doughnut">Doughnut Chart</option>
              <option value="polarArea">Polar Area Chart</option>
              <option value="radar">Radar Chart</option>
            </select>
          </fieldset>

          {/* Add a field for the graph title */}
          <fieldset className="flex flex-col space-y-2">
            <label htmlFor="graph-title" className="text-sm font-medium">
              Graph Title
            </label>
            <input
              id="graph-title"
              type="text"
              value={graphTitle}
              onChange={(e) => setGraphTitle(e.target.value)}
              className="border rounded-lg p-2 text-sm"
              placeholder="Enter a title for the graph"
            />
          </fieldset>

          {csvData && (
            <>
              <fieldset className="flex flex-col space-y-2">
                <label htmlFor="x-axis-column" className="text-sm font-medium">
                  X-Axis Column
                </label>
                <select
                  id="x-axis-column"
                  value={xAxisColumn}
                  onChange={(e) => setXAxisColumn(e.target.value)}
                  className="border rounded-lg p-2 text-sm"
                >
                  {Object.keys(csvData[0]).map((column) => (
                    <option key={column} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="flex flex-col space-y-2">
                <label htmlFor="y-axis-column" className="text-sm font-medium">
                  Y-Axis Column
                </label>
                <select
                  id="y-axis-column"
                  value={yAxisColumn}
                  onChange={(e) => setYAxisColumn(e.target.value)}
                  className="border rounded-lg p-2 text-sm"
                >
                  {Object.keys(csvData[0]).map((column) => (
                    <option key={column} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
              </fieldset>

              <figure className="h-64 sm:h-96">
                {graphType === 'line' && <Line data={chartData} options={options} />}
                {graphType === 'bar' && <Bar data={chartData} options={options} />}
                {graphType === 'pie' && <Pie data={chartData} options={options} />}
                {graphType === 'doughnut' && <Doughnut data={chartData} options={options} />}
                {graphType === 'polarArea' && <PolarArea data={chartData} options={options} />}
                {graphType === 'radar' && <Radar data={chartData} options={options} />}
              </figure>
            </>
          )}

          <footer className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveToDashboard}
              className="ring-1 ring-blue text-black px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-sm sm:text-base"
            >
              <Save size={16} />
              <span>Save Graph</span>
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}