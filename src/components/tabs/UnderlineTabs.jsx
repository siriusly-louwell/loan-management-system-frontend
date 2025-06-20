import React from "react";
import UlTab from "./UlTab";
import { useLocation } from "react-router-dom";

export default function UnderlineTabs() {
    const location = useLocation();

    function activeTab(pOne, pTwo) {
        return location.pathname === pOne || location.pathname === pTwo;
    }

    return (
        <div className="mt-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
                <UlTab text="All" isPage={activeTab('/', '/customer')} path="" />
                <UlTab text="Top units" isPage={activeTab('/top', '/customer/top')} path="top" />
                <UlTab text="Brand New" isPage={activeTab('/new', '/customer/new')} path="new" />
                <UlTab text="Repo units" isPage={activeTab('/repo', '/customer/repo')} path="repo" />
                {/* <li className="me-2">
                    <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Profile</a>
                </li>
                <li className="me-2">
                    <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Dashboard</a>
                </li>
                <li className="me-2">
                    <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Settings</a>
                </li>
                <li className="me-2">
                    <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Contacts</a>
                </li> */}
                {/* <li>
                    <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
                </li> */}
            </ul>
        </div>
    );
}