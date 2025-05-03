import React from 'react';

export default function FormTD({children, style, placeholder}) {
    const className = "px-2 " + style;

    return (
        <td class={className}>
            <input type="text" placeholder={placeholder} class="bg-gray-50 border-b border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
            {children}
        </td>
    );
}