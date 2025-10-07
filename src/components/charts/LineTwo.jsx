import Chart from "react-apexcharts";

export default function LineTwo() {
  const chartData = {
    series: [
      {
        name: "Total Loans",
        data: [25, 40, 55, 70, 90, 120, 150],
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
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
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
      <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Total Loans
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            308
          </dd>
        </dl>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-blue-900 dark:text-blue-300">
          Growth rate 12.8%
        </span>
      </div>

      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={320}
      />

      <div className="grid grid-cols-1 border-t border-gray-200 dark:border-gray-700 mt-4">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 inline-flex items-center dark:hover:text-white"
            type="button">
            Last 6 months
            <svg
              className="w-2.5 m-2.5 ms-1.5"
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
