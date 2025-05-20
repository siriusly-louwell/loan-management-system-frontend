import React from 'react';
import Exclamation from '../assets/icons/Exclamation';
import Ex from '../assets/icons/Ex';

export default function Alert({id, text, children}) {
    return (
        <div id={id} tabindex="-1" class="fixed hidden top-0 left-0 right-0 z-50 p-4 justify-items-center items-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full h-auto max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 border dark:border-gray-500">
                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="delete-modal"
                        onClick={() => document.getElementById(id).style.display = "none"}>
                        <Ex className="w-5 h-5" />
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <Exclamation />
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{text}</h3>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}