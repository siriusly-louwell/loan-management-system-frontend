import React from 'react';

export default function Notification({children, content}) {
    return (
        <li>
            <a href="#" class="items-center block rounded-lg border border-gray-50 p-3 sm:flex hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
                <img class="w-12 h-12 hidden sm:block mb-3 me-3 rounded-full sm:mb-0" src="/docs/images/people/profile-picture-1.jpg" alt="Jese Leos image"/>
                <div class="text-gray-600 sm:flex w-full justify-between dark:text-gray-400">
                    <div>
                        <div class="text-base font-normal">{children}</div>
                        <div class="text-sm font-normal">{content}</div>
                    </div>
                    <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">Public</span> 
                </div>
            </a>
        </li>
    );
}