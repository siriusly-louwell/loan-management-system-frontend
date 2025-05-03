import React from 'react';

export default function Notif({num}) {
    return (
        <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-600 dark:text-red-100">{num}</span>
    );
}