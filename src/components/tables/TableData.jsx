import React from "react";

export default function TableData({children}) {
    return (
        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {children}
        </td>
    );
}