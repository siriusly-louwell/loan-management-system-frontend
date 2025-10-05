import React from "react";
import { Link } from "react-router-dom";

export default function Notification({ children, content, to }) {
  return (
    <li>
      <Link
        to={to}
        className="items-center block rounded-lg border border-gray-50 p-3 sm:flex hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        <img
          className="w-12 h-12 hidden sm:block mb-3 me-3 rounded-full sm:mb-0"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
          alt="Jese Leos"
        />
        <div className="text-gray-600 sm:flex w-full justify-between dark:text-gray-400">
          <div>
            <div className="text-base font-normal">{children}</div>
            <div className="text-sm font-normal">{content}</div>
          </div>
          <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
            Public
          </span>
        </div>
      </Link>
    </li>
  );
}
