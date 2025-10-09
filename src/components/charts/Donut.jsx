import Chart from "react-apexcharts";
import { Info, Download } from "lucide-react";
import { CHART_COLORS } from "../../constants/colors";
import { DonutChartSkeleton } from "../loading components/ChartSkeletons";

export default function Donut({ labels, series, loading }) {
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
      legend: { position: "bottom" },
      dataLabels: {
        enabled: false,
      },
      title: { text: undefined },
      plotOptions: {
        pie: {
          donut: {
            labels: { show: true },
            size: "80%",
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
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-2">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Loan Applications
          </h5>
          <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      <div className="py-6">
        {loading ? (
          <DonutChartSkeleton />
        ) : (
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            height={320}
          />
        )}
      </div>

      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-end items-center pt-5">
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2">
            Status analysis
            <svg
              className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
