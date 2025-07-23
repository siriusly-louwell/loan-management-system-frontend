import React from "react";
import LeftArrow from "../assets/icons/LeftArrow";
import Check from "../assets/icons/Check";

export default function Step({label, status, click}) {
    let style;

    switch (status) {
        case 'current':
            style = "text-blue-700 bg-gray-100 border-blue-300 dark:border-blue-800 dark:text-blue-400 hover:bg-gray-200";
            break;
        case 'done':
            style = "text-green-700 bg-gray-100 border-green-300 dark:border-green-800 dark:text-green-400 hover:bg-gray-200";
            break;
        case 'incomplete':
            style = "text-red-700 bg-gray-100 border-red-300 dark:border-red-800 dark:text-red-400 hover:bg-gray-200";
            break;
        default:
            style = "text-gray-900 bg-gray-100 border-gray-300 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200";
            break;
    }
    // const style = status == 'current' ? "text-blue-700 bg-gray-100 border-blue-300 dark:border-blue-800 dark:text-blue-400 hover:bg-gray-200"
    //     : (status == 'done' ? "text-green-700 bg-gray-100 border-green-300 dark:border-green-800 dark:text-green-400 hover:bg-gray-200"
    //     : "text-gray-900 bg-gray-100 border-gray-300 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200");
    
    const className = "w-full p-4 border rounded-lg dark:bg-gray-800 " + style;
    const icon = status == 'current' ? <LeftArrow /> : (status == 'done' ? <Check color='green' /> : "");

    return (
        <li>
            <button type="button" class={className} role="alert" onClick={click}>
                <div class="flex items-center justify-between">
                    <span class="sr-only">{label}</span>
                    <h3 class="font-medium">{label}</h3>
                    {icon}
                </div>
            </button>
        </li>
    );
}