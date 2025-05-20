import React from "react";

export default function FormCheck({label, name, id, value, change}) {
    return (
        <div class="flex items-center mr-4">
            <input id={id} type="radio" value={value} name={name} onChange={change} class="w-4 h-4 bg-gray-100 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for={id} class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
        </div>
    );
}