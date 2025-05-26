import React from "react";

export default function SmallLabel({label, text}) {
    return (
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 my-2">
            <strong className='text-gray-800 dark:text-white'>{label}:</strong> {text}
        </p>
    );
}