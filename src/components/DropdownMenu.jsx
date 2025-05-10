import React from 'react';

export default function DropdownMenu({children, className}) {
    return (
        <div class={"z-50 absolute right-0 text-base list-none bg-white border border-gray-200 dark:border-gray-500 divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 "+className}>
            <ul class="py-2" aria-labelledby="user-menu-button">
                {children}
            </ul>
        </div>
    );
}