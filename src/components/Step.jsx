import React from "react";
import LeftArrow from "../assets/icons/LeftArrow";
import Check from "../assets/icons/Check";

export default function Step({label, status}) {
    const style = status == 'current' ? "text-blue-700 bg-gray-100 border-blue-300 dark:border-blue-800 dark:text-blue-400"
        : (status == 'done' ? "text-green-700 bg-gray-100 border-green-300 dark:border-green-800 dark:text-green-400"
        : "text-gray-900 bg-gray-100 border-gray-300 dark:border-gray-700 dark:text-gray-400");
    
    const className = "w-full p-4 border rounded-lg dark:bg-gray-800 " + style;
    const icon = status == 'current' ? <LeftArrow /> : (status == 'done' ? <Check /> : "");

    return (
        <li>
            <div class={className} role="alert">
                <div class="flex items-center justify-between">
                    <span class="sr-only">{label}</span>
                    <h3 class="font-medium">{label}</h3>
                    {icon}
                </div>
            </div>
        </li>
    );
}