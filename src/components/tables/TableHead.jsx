import React from "react";

export default function TableHead({ headers }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-50">
      <tr>
        {headers.map((text, i) => (
          <th key={i} scope="col" className="p-4">
            {text}
          </th>
        ))}
      </tr>
    </thead>
  );
}
