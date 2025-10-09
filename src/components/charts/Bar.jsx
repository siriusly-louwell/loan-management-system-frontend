import React from "react";
import Chart from "react-apexcharts";
import { BarChartSkeleton } from "../loading components/ChartSkeletons";

export default function Bar({ results = {}, loading }) {
  const chartData = {
    series: [
      {
        name: "Punctual Payments",
        data: results.punctualData?.series || [],
      },
      {
        name: "Late Payments",
        data: results.lateData?.series || [],
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
        categories: results.punctual?.categories || [],
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
      <div className="flex space-x-2 items-center border-gray-200 border-b dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Loan Payments
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            {results.total?.count}
          </dd>
        </dl>
      </div>

      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Punctual
          </dt>
          <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">
            {results.on_time?.count}
          </dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Late
          </dt>
          <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
            {results.late?.count}
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
