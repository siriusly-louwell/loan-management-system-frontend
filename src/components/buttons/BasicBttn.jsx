import React from "react";

export default function BasicButton({text, onclick}) {
    const color = text != "Show more" ? "dark:border-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600" : "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700";
    const className = "rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:hover:text-white " + color;
    return (
        <button type="button" class={className} onClick={onclick}>
            {text}
        </button>
    );
}