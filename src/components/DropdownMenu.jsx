import React from 'react';

export default function DropdownMenu({children, className, pad = 5}) {
    return (
        <div className={`z-50 absolute right-${pad} text-base list-none bg-white border border-gray-200 dark:border-gray-500 divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 ${className}`}>
            <ul className="py-2" aria-labelledby="user-menu-button">
                {children}
            </ul>
        </div>
    );
}