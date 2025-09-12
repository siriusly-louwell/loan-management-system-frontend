import React from "react";

export default function TableData({ children }) {
  return (
    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {children}
    </td>
  );
}
