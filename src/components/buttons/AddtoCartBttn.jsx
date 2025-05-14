import React from "react";
import {Link} from 'react-router-dom';

export default function AddtoCartBttn() {
    return (
        <Link to="/applicant/calculate" class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Inquire Loan
        </Link>
    );
}