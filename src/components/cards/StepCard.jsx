import React from "react";

export default function StepCard({ num, label, context }) {
  return (
    <li className="p-10 rounded-lg md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block bg-white dark:bg-gray-800">
      <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
        <span className="size-7 flex justify-center items-center shrink-0 bg-rose-500 font-medium text-gray-100 rounded-full dark:bg-rose-700 dark:text-white">
          {num}
        </span>
        <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-rose-400 group-last:hidden dark:bg-rose-500"></div>
      </div>
      <div className="grow md:grow-0 md:mt-3">
        <span className="block text-lg font-medium text-gray-800 dark:text-white">
          {label}
        </span>
        <p className="text-sm text-gray-500 dark:text-gray-300">{context}</p>
      </div>
    </li>
  );
}
