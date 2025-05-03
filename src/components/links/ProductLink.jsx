import React from "react";

export default function ProductLink({prodName}) {
    return (
        <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{prodName}</a>
    );
}