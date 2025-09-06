import React from "react";

export default function BttnSmall({ text, click, change }) {
  return (
    <button
      onClick={click}
      onChange={change}
      className="bg-gray-300 dark:bg-gray-700 hover:bg-rose-100 focus:bg-rose-100 focus:text-white dark:hover:bg-rose-600 focus:bg-rose-600 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">
      {text}
    </button>
  );
}
