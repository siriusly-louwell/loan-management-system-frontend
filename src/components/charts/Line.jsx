import Chart from "react-apexcharts";

export default function Line({ data, categories }) {
  const chartData = {
    series: [
      {
        name: "Total Loans",
        data: data,
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: { show: false },
      },
      colors: ["#1A56DB"],
      stroke: { curve: "smooth", width: 3 },
      dataLabels: { enabled: false },
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 4,
        padding: { left: 2, right: 2, top: -10 },
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
      },
      tooltip: { enabled: true },
    },
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="area"
      height={320}
    />
  );
}
