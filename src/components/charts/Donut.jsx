import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Info, Download } from "lucide-react";

export default function Donut() {
  const [days, setDays] = useState("Last 7 days");
  const chartData = {
    series: [120, 80, 30], // Approved, Pending, Rejected
    options: {
      chart: { type: "donut" },
      labels: ["Approved", "Pending", "Rejected"],
      colors: ["#16BDCA", "#FDBA8C", "#E74694", "#1C64F2"],
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

  const daysOptions = [
    "Yesterday",
    "Today",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
  ];

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-2">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Loan Applications
          </h5>
          <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <button
          type="button"
          className="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm">
          <Download className="w-4 h-4" />
          <span className="sr-only">Download data</span>
        </button>
      </div>

      <div className="py-6">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          height={320}
        />
      </div>

      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <div className="relative">
            <button
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
              type="button"
              onClick={() => {
                const el = document.getElementById("days-dropdown");
                if (el) el.classList.toggle("hidden");
              }}>
              {days}
              <svg
                className="w-2.5 m-2.5 ms-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="days-dropdown"
              className="z-10 hidden absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {daysOptions.map((option) => (
                  <li key={option}>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setDays(option);
                        document
                          .getElementById("days-dropdown")
                          .classList.add("hidden");
                      }}>
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
