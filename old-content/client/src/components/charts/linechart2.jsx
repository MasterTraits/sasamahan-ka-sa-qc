import { Line } from "react-chartjs-2";

function LineChart2({chartData}) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Possible Sales Next Week"
            },
          }
        }}
      />
    </div>
  );
}

export default LineChart2;