import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [100, 150, 200, 250, 300, 350],
        backgroundColor: '#3F56FF',
        borderColor: '#2E4ACF',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
