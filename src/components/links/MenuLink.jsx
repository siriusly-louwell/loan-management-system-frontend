import React from 'react';

export default function MenuLink({pathName}) {
    return (
        <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{pathName}</a>
        </li>
    );
}