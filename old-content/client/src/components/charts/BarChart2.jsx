import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";

const BarChart = () => {
  const data = {
    labels: ['July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Possible Revenue',
        data: [150, 170, 220, 270, 320, 370],
        backgroundColor: '#3F56FF',
        borderColor: '#2E4ACF',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
