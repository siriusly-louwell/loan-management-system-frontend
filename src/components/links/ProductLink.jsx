import React from "react";
import { Link } from "react-router-dom";

export default function ProductLink({prodName, id, url}) {
    return (
        <Link to={url} state={{id: id}} className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{prodName}</Link>
    );
}