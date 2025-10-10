import React, { useState } from "react";
import { MoreHorizontal, Filter } from "lucide-react";

export default function ChartContainer({ title, count, subtitle, children }) {
  const [filter, setFilter] = useState("Last 7 Days");
  const [showMenu, setShowMenu] = useState(false);

  const filters = ["Today", "Last 7 Days", "Last 30 Days", "This Year"];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {count && (
            <p className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
              {count}
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
        </div>

        <div className="relative mt-4 md:mt-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-200 active:bg-rose-500 active:text-white dark:hover:bg-gray-600 transition">
            <Filter size={16} />
            <span className="text-sm font-medium">{filter}</span>
            <MoreHorizontal size={16} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20">
              {filters.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFilter(option);
                    setShowMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filter === option
                      ? "bg-blue-100 dark:bg-gray-600 font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  } text-gray-700 dark:text-gray-200`}>
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Content */}
      <div className="min-h-[200px] w-full overflow-x-auto">{children}</div>
    </div>
  );
}
