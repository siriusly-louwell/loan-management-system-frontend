import React from "react";
import UpArrow from "../../assets/icons/UpArrow";

export default function InfoCard({ amount, label, percent, arrow }) {
  const color = arrow.type === UpArrow ? "text-green-500" : "text-red-500";
  const className =
    "ml-5 w-0 flex items-center justify-end flex-1 text-base font-bold " +
    color;

  return (
    <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-gray-100">
            {amount}
          </span>
          <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
            {label}
          </h3>
        </div>
        <div className={className}>
          {percent}
          {arrow}
        </div>
      </div>
    </div>
  );
}
