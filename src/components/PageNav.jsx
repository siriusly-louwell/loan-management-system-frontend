import React from 'react';
import Paginator from './Paginator';

export default function PageNav() {
    return (
        <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                <span class="font-semibold text-gray-900 dark:text-white"> 1-10 </span>
                    of
                <span class="font-semibold text-gray-900 dark:text-white"> 1000</span>
            </span>
            <Paginator />
        </nav>
    );
}