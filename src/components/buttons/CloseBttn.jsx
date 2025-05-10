import React from 'react';
import Ex from '../../assets/icons/Ex';

export default function CloseBttn({id}) {
    return (
        <button type="button" onClick={() => document.getElementById(id).style.display = "none"} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <Ex className="w-5 h-5" />
            <span class="sr-only">Close modal</span>
        </button>
    );
}