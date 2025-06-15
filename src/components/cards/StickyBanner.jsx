import React from "react";
import RMCI from "../../assets/images/RMCI.png";
import Ex from "../../assets/icons/Ex";

export default function StickyBanner() {
    return (
        <div id="sticky-banner" className="sticky z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 mb-3 bg-white border border-gray-100 rounded-lg shadow-xs lg:max-w-7xl top-6 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
                <a href="https://flowbite.com/" className="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600">
                    <img src={RMCI} className="h-5 me-2" alt="Flowbite Logo" />
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Rhean Motor Center</span>
                </a>
                <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Inquire loans much faster by signing up to our website</p>
            </div>
            <div className="flex items-center shrink-0">
                <a href="#" className="px-5 py-2 me-2 text-xs font-medium text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-rose-800">Sign up</a>
                <button type="button" onClick={() => document.getElementById('sticky-banner').style.display = 'none'} className="shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                    <Ex />
                    <span className="sr-only">Close banner</span>
                </button>
            </div>
        </div>
    );
}