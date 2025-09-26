import React from "react";
import { NavLink } from "react-router-dom";

export default function Navlink({ pathName, to }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "block py-2 px-3 text-white bg-rose-600 rounded-sm md:bg-transparent md:text-rose-600 md:p-0 md:dark:text-rose-500"
            : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-600 md:p-0 dark:text-white md:dark:hover:text-rose-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        }>
        {pathName}
      </NavLink>
    </li>
  );
}

// Clicked link
// <li>
//     <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
// </li>
