import React from "react";
import TableData from "../tables/TableData";

export default function ProductRow({ data, recent }) {
  const newRow = recent ? "bg-gray-100 dark:bg-gray-800" : "dark:bg-gray-700";

  return (
    <tr
      className={`border-b ${newRow} dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700`}>
      <td className="p-4 w-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-table-search-1">
          </label>
        </div>
      </td>
      {data.map((content, i) => (
        <TableData key={i}>{content}</TableData>
      ))}
    </tr>
  );
}
