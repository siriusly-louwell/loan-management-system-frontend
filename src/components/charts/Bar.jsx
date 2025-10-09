import React from "react";
import Chart from "react-apexcharts";
import { BarChartSkeleton } from "../loading components/ChartSkeletons";

export default function Bar({ loading }) {
  const chartData = {
    series: [
      {
        name: "Punctual Payments",
        data: [95, 100, 90, 85, 92, 97],
      },
      {
        name: "Late Payments",
        data: [10, 8, 12, 9, 7, 5],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 6,
          barHeight: "70%",
          columnWidth: "100%",
          borderRadiusApplication: "end",
        },
      },
      colors: ["#31C48D", "#F05252"],
      dataLabels: { enabled: false },
      xaxis: {
        categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4 md:p-6">
      <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Loan Payments
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            108
          </dd>
        </dl>
        <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
          <svg
            className="w-2.5 h-2.5 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
          Payment rate 23.5%
        </span>
      </div>

      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Punctual
          </dt>
          <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">
            75
          </dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Late
          </dt>
          <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
            30
          </dd>
        </dl>
      </div>

      {loading ? (
        <BarChartSkeleton />
      ) : (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={320}
        />
      )}

      <div className="grid grid-cols-1 border-t border-gray-200 dark:border-gray-700 mt-4">
        <div className="flex justify-end items-center pt-5">
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2">
            Payment Analysis
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
