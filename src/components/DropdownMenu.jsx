import React from "react";

export default function DropdownMenu({ children, classStyle}) {
  return (
    <div
      className={`z-50 min-w-30 w-max right-0 absolute mt-3 text-base list-none bg-white border border-gray-200 dark:border-gray-500 divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 ${classStyle}`}>
      <ul className="py-2">
        {children}
      </ul>
    </div>
  );
}
