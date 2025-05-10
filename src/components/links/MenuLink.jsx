import React from 'react';
import {Link} from 'react-router-dom';

export default function MenuLink({pathName, path}) {
    return (
        <li>
            <Link to={path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{pathName}</Link>
        </li>
    );
}