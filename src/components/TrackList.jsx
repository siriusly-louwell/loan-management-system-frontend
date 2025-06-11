import React from "react";
import BlueCheck from "../assets/icons/BlueCheck";
import Ex from "../assets/icons/Ex";

export default function TrackList({label, sublabel, isDone}) {
    const check = isDone === 'done' ? "text-green-100 dark:text-green-900"
        : (isDone === 'current' ? "text-blue-500 dark:text-gray-800" : (isDone === 'decline' ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"));
    const labelColor  = isDone === 'done' ? "text-green-600 dark:text-green-500"
        : (isDone === 'current' ? "text-blue-700 dark:text-blue-500" : (isDone === 'decline' ? "text-red-500 dark:text-white" : "text-gray-900 dark:text-white"));
    const subColor = isDone === 'done' ? "text-green-600 dark:text-green-600"
        : (isDone === 'current' ? "text-blue-700 dark:text-blue-500" : (isDone === 'decline' ? "text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-400"));
    const chckBg = isDone === 'done' ? "bg-green-500 dark:bg-green-600"
        : (isDone === 'current' ? "bg-gray-100 dark:bg-gray-500" : (isDone === 'decline' ? 'bg-red-100 dark:bg-red-700' : "bg-gray-100 dark:bg-gray-700"));
    
    return (
        <li class={"mb-10 ms-6 " + check}>
            <span class={"absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-700 " + chckBg}>
                {isDone !== 'decline' ? (
                    <BlueCheck />
                ) : (
                    <Ex className="w-4 h-4" />
                )}
            </span>
            <h4 class={"mb-0.5 text-base font-semibold " + labelColor}>{label} {isDone == 'current' ? '(In progress...)' : ''}</h4>
            <p class={"text-sm font-normal " + subColor}>{sublabel}</p>
        </li>
    );
}