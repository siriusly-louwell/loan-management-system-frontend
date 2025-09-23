import React from "react";
import { NavLink } from "react-router-dom";

export default function SidebarLink({ children, text, notif, to }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 text-gray-900 bg-gray-300 dark:bg-gray-800 rounded-lg dark:text-white group"
            : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group"
        }>
        {children}
        <span className="ms-3">{text}</span>
        {notif}
      </NavLink>
    </li>
  );
}
