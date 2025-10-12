import React, { useState } from "react";
import { MoreHorizontal, Filter } from "lucide-react";
import { DASHBOARD_FILTERS } from "../../constants/filters";
import { useDispatch } from "react-redux";
import { loanDashFilter } from "../../services/redux/slices/applicationSlice";
import { paymentDashFilter } from "../../services/redux/slices/paymentSlice";

export default function ChartContainer({
  title,
  chart,
  count,
  subtitle,
  children,
}) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("months");
  const [showMenu, setShowMenu] = useState(false);

  function selectFilter(option) {
    setFilter(option);
    setShowMenu(false);
    if (chart === "chart")
      dispatch(paymentDashFilter({ chart: chart, filter: option }));
    else dispatch(loanDashFilter({ chart: chart, filter: option }));
  }

  return (
    <div className="min-w-[80%] max-w-[100%] bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 mb-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {count && (
            <div className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
              {count}
            </div>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>

        <div className="relative mt-4 md:mt-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-200 active:bg-rose-500 active:text-white dark:active:bg-rose-500 dark:active:text-white dark:hover:bg-gray-800 transition">
            <Filter size={16} />
            <span className="text-sm font-medium">
              {DASHBOARD_FILTERS[filter]}
            </span>
            <MoreHorizontal size={16} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20">
              {Object.keys(DASHBOARD_FILTERS).map((option) => (
                <button
                  key={option}
                  onClick={() => selectFilter(option)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filter === option
                      ? "bg-blue-100 dark:bg-gray-600 font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  } text-gray-700 dark:text-gray-200`}>
                  {DASHBOARD_FILTERS[option]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="min-h-[200px] w-full overflow-x-auto">{children}</div>
    </div>
  );
}
