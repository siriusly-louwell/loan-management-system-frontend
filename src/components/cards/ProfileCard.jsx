import React from "react";

export default function ProfileCard({
  icon,
  label,
  arrow,
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
    </div>
  );
}
