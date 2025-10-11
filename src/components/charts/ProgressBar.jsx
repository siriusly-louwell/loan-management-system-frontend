import React from "react";
import Chart from "react-apexcharts";
import { CHART_COLORS } from "../../constants/colors";

export default function ProgressBar({ series }) {
  const chartData = {
    series: series || [],
    options: {
      chart: {
        type: "bar",
        stacked: true,
        stackType: "100%",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 10,
          barHeight: "200%",
        },
      },
      colors: CHART_COLORS,
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Progress"],
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { show: false },
      },
      grid: { show: false },
      legend: {
        position: "bottom",
        horizontalAlign: "left",
        markers: { radius: 4 },
        itemMargin: { horizontal: 10 },
        labels: { colors: "#9CA3AF" },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} GB`,
        },
      },
    },
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      height={80}
    />
  );
}
