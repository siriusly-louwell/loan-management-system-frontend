import React from 'react';

export default function SidebarLink({children, text, notif}) {
    return (
        <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group">
                {children}
                <span class="ms-3">{text}</span>
                {notif}
            </a>
        </li>
    );
}