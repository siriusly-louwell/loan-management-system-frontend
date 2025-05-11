import React from 'react';
import TableData from '../tables/TableData';

export default function ProductRow({prodName, img, data}) {
    return (
        <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            <td class="p-4 w-4">
                <div class="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()" class="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                </div>
            </td>
            {data.map(content => (
                <TableData>{content}</TableData>
            ))}
        </tr>
    );
}