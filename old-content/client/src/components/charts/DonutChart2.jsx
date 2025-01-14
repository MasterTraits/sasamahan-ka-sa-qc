import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfitMarginDoughnutChart = ({ data }) => {
  const chartData = {
    labels: ['COGS', 'Operations', 'Net Profit'], // Labels for segments (e.g., profit, expenses)
    datasets: [
      {
        label: "Profit Margin",
        data:[15, 13, 8], // Array of values for the segments
        backgroundColor: ["#FFB74D", "#4CAF50", "#FF6F61"], // Different colors for each segment
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default ProfitMarginDoughnutChart;
