import React from "react";

export default function TableHead({headers}) {
    return (
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headers.map(text => (
                <th scope="col" class="p-4">{text}</th>
            ))}
        </thead>
    );
}