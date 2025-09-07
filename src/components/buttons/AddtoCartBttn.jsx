import React from "react";
import { Link } from "react-router-dom";

export default function AddtoCartBttn({ state, text, url, click }) {
  return (
    <Link
      to={url}
      state={state}
      onClick={click}
      className="flex items-center justify-center rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800">
      {text}
    </Link>
  );
}
