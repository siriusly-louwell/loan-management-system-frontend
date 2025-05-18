import React from 'react';

export default function BttnSmall({text, click, change}) {
    return (
        <button onClick={click} onChange={change} className="bg-gray-300 dark:bg-gray-500 hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-700 focus:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">
            {text}
        </button>
    );
}