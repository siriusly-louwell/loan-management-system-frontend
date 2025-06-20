import React from "react";
import { Link } from "react-router-dom";

export default function UlTab({text, path, isPage = false}) {
    const style = isPage ? "text-rose-600 border-rose-600 active dark:text-blue-500 dark:border-blue-500"
        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

    return (
        <li className="me-2">
            <Link to={path} className={`inline-block p-4 border-b-2 rounded-t-lg cursor-pointer ${style}`}>{text}</Link>
        </li>
    );
}