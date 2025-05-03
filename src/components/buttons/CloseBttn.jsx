import React from 'react';
import Ex from '../../assets/icons/Ex';

export default function CloseBttn() {
    return (
        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="createProductModal">
            <Ex className="w-5 h-5" />
            <span class="sr-only">Close modal</span>
        </button>
    );
}