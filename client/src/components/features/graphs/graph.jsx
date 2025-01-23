import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2'; 
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'; 
import Papa from 'papaparse'; 

Chart.register(CategoryScale); 

function GraphGenerator() {
  const [csvData, setCsvData] = useState(null);
  const [graphType, setGraphType] = useState('line');
  const [xAxisColumn, setXAxisColumn] = useState('');
  const [yAxisColumn, setYAxisColumn] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      Papa.parse(event.target.result, { 
        header: true,
        complete: (results) => {
          setCsvData(results.data);
          // Set default column selections (you might want to adjust this)
          if (results.data.length > 0) {
            const firstRow = results.data[0];
            const columns = Object.keys(firstRow);
            setXAxisColumn(columns[0]); // Default to first column
            setYAxisColumn(columns[1]); // Default to second column
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        }
      }); 
    };

    reader.readAsText(file);
  };

  const handleGraphTypeChange = (e) => {
    setGraphType(e.target.value);
  };

  const handleXAxisChange = (e) => {
    setXAxisColumn(e.target.value);
  };

  const handleYAxisChange = (e) => {
    setYAxisColumn(e.target.value);
  };

  const extractColumnData = (data, columnName) => {
    if (!data || !Array.isArray(data) || !columnName) {
      return []; 
    }
    return data.map(row => row[columnName]);
  };

  const xAxisData = extractColumnData(csvData, xAxisColumn);
  const yAxisData = extractColumnData(csvData, yAxisColumn);

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: yAxisColumn, 
        data: yAxisData,
        backgroundColor: 'rgba(49, 116, 192, 0.2)',
        borderColor: 'rgb(66, 134, 64)',
        borderWidth: 2,
        fill: true,
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
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept=".csv" />
      <select value={graphType} onChange={handleGraphTypeChange}>
        <option value="line">Line Graph</option>
        <option value="bar">Bar Graph</option>
      </select>

      {csvData && (
        <div>
          <select value={xAxisColumn} onChange={handleXAxisChange}>
            {Object.keys(csvData[0]).map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>

          <select value={yAxisColumn} onChange={handleYAxisChange}>
            {Object.keys(csvData[0]).map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>

          <div style={{ height: '400px', width: '100%' }}>
            {graphType === 'line' && <Line data={chartData} options={options} />}
            {graphType === 'bar' && <Bar data={chartData} options={options} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default GraphGenerator;
