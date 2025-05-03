import React from 'react';

export default function PageLink({extra, children}) {
    const style = "flex items-center justify-center text-sm px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white "+extra;
    
    return (
        <li>
            <a href="#" class={style}>
                {children}
            </a>
        </li>
    );
}