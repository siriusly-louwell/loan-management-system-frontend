import React from "react";

export default function ProfileCard({
  icon,
  label,
  arrow,
  text,
  amount,
  percent,
}) {
  return (
    <div>
      {icon}
      <h3 className="mb-2 text-gray-500 dark:text-gray-400">{label}</h3>
      <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
        {amount}
        <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          {arrow}
          {percent}
        </span>
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
        vs {text}
      </p>
    </div>
  );
}
