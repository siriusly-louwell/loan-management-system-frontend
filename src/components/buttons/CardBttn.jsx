import React from "react";
import { Link } from "react-router-dom";
import RightArrow from "../../assets/icons/RightArrow";

export default function CardBttn({ label, text, to }) {
  return (
    <li>
      <Link
        to={to}
        class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
        <div class="block">
          <div class="w-full text-lg font-semibold">{label}</div>
          <div class="w-full text-gray-500 dark:text-gray-400">{text}</div>
        </div>
        <RightArrow />
      </Link>
    </li>
  );
}
