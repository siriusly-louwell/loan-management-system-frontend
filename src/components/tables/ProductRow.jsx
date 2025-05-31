import React from 'react';
import TableData from '../tables/TableData';

export default function ProductRow({data, recent}) {
    const newRow = recent ? "bg-gray-100" : "";

    return (
        <tr className={`border-b ${newRow} dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700`}>
            <td className="p-4 w-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()" className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            {data.map(content => (
                <TableData>{content}</TableData>
            ))}
        </tr>
    );
}