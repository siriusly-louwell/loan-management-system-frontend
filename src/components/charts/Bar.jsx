import React from "react";
import Chart from "react-apexcharts";

export default function Bar({ series, categories, isHorizontal = true, colors }) {
  const chartData = {
    series: series,
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: isHorizontal,
          borderRadius: 6,
          barHeight: "70%",
          columnWidth: "90%",
          borderRadiusApplication: "end",
        },
      },
      colors: colors,
      dataLabels: { enabled: false },
      xaxis: {
        categories: categories || [],
        labels: {
          style: { fontFamily: "Inter, sans-serif" },
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 4,
      },
    },
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      height={320}
    />
  );
}
