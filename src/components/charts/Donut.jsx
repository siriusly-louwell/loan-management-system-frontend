import Chart from "react-apexcharts";
import { CHART_COLORS } from "../../constants/colors";

export default function Donut({ labels, series }) {
  const chartData = {
    series: series,
    options: {
      chart: { type: "donut" },
      labels: labels,
      colors: CHART_COLORS,
      stroke: {
        show: false,
        width: 0,
      },
      legend: { position: "bottom", labels: { colors: "#9CA3AF" } },
      dataLabels: {
        enabled: false,
      },
      title: { text: undefined },
      plotOptions: {
        pie: {
          donut: {
            labels: { show: true, value: { color: "#9CA3AF" } },
            size: "80%",
            colors: "#9CA3AF",
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 200 },
            legend: { position: "bottom" },
          },
        },
      ],
    },
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="donut"
      height={320}
    />
  );
}
