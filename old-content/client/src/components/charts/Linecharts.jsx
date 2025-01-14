import { Line } from "react-chartjs-2";

function LineChart({chartData}) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Sales Past Week"
            },
          }
        }}
      />
    </div>
  );
}

export default LineChart;