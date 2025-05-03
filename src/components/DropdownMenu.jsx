import React from 'react';

export default function DropdownMenu({id, children}) {
    return (
        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id={id}>
            <ul class="py-2" aria-labelledby="user-menu-button">
                {children}
            </ul>
        </div>
    );
}