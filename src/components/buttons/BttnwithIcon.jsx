import React from "react";

export default function BttnwithIcon({ text, type, click, children }) {
  return (
    <button
      onClick={click}
      type={type}
      className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-500 hover:bg-gray-200 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-rose-100 dark:focus:ring-rose-700 dark:bg-rose-600 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-rose-700"
      role="button">
      {children}
      {text}
    </button>
  );
}
