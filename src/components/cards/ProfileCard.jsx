import React from "react";
import SmallUpArrow from "../../assets/icons/SmallUpArrow";
import SmallDownArrow from "../../assets/icons/SmallDownArrow";

export default function ProfileCard({
  icon,
  label,
  type,
  amount,
  percent,
  loading,
}) {
  const color =
    type === "increase"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : type === "decrease"
      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300";
  const arrow =
    type === "increase" ? (
      <SmallUpArrow />
    ) : (
      type === "decrease" && <SmallDownArrow />
    );

  return (
    <div className="rounded-lg hover:bg-gray-100 aactive:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 px-4 py-2 w-40 cursor-pointer">
      {icon}
      <h3 className="mb-2 text-gray-500 dark:text-gray-400">{label}</h3>
      <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
        {loading ? (
          <div className="w-20 h-7 mt-1 rounded-lg bg-gray-100 dark:bg-gray-700 animate-pulse" />
        ) : (
          <>
            {amount}
            <span
              className={`ms-2 inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${color}`}>
              {arrow}
              {percent}
            </span>
          </>
        )}
      </span>
      <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        <svg
          className="me-1.5 h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        vs last month
      </p>
    </div>
  );
}
