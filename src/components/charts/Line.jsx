import Chart from "react-apexcharts";
import { AreaChartSkeleton } from "../loading components/ChartSkeletons";

export default function Line({ count = 0, data, categories, loading }) {
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
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4 md:p-6">
      <div className="flex space-x-2 items-center border-b border-gray-200 dark:border-gray-700 pb-3">
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
            Total Loans
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            {count}
          </dd>
      </div>

      {loading ? (
        <AreaChartSkeleton />
      ) : (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={320}
        />
      )}

      <div className="grid grid-cols-1 border-t border-gray-200 dark:border-gray-700 mt-4">
        <div className="flex justify-end items-center pt-5">
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2">
            Loan Analysis
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
