import React from "react";
import Home from "../../assets/icons/Home";
import Angle from "../../assets/icons/Angle";

export default function PathLink({pathName}) {
    const icon = pathName == "Home" ? <Home /> : <Angle />;

    return (
        <li class="inline-flex items-center">
            <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                {icon}
                {pathName}
            </a>
        </li>
    );
}