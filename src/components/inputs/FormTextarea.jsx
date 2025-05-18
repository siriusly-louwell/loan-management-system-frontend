import React from "react";

export default function FormTextarea({name, id, label, value, onchange, placeholder}) {
    return (
        <div class="sm:col-span-2">
            <label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <textarea id={id} name={name} value={value} onChange={onchange} rows="4" placeholder={placeholder} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></textarea>
        </div>
    );
}