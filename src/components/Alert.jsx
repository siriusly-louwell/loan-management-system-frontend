import React from 'react';
import Exclamation from '../assets/icons/Exclamation';
import Ex from '../assets/icons/Ex';
import BasicButton from './buttons/BasicBttn';
import CustomBttn from './buttons/CustomBttn';

export default function Alert({id}) {
    return (
        <div id={id} tabindex="-1" class="fixed hidden top-0 left-0 right-0 z-50 p-4 justify-items-center items-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full h-auto max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="delete-modal"
                        onClick={() => document.getElementById('delete_product').style.display = "none"}>
                        <Ex className="w-5 h-5" />
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <Exclamation />
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                        <CustomBttn text="Yes, I'm sure" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" />
                        <BasicButton text="No, cancel" onclick={() => document.getElementById('delete_product').style.display = "none"} />
                    </div>
                </div>
            </div>
        </div>
    );
}