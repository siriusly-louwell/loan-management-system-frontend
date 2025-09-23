import React from "react";
import { Link } from "react-router-dom";

export default function UlTab({ text, path, click, isPage = false }) {
  const style = isPage
    ? "text-rose-600 border-rose-600 active dark:text-rose-500 dark:border-rose-500"
    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

  return (
    <li className="me-2">
      <button
        // to={path}
        onClick={click}
        className={`inline-block p-4 border-b-2 rounded-t-lg cursor-pointer ${style}`}>
        {text}
      </button>
    </li>
  );
}
