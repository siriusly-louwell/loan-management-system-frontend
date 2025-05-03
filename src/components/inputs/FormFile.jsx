import React from 'react';
import Cloud from '../../assets/icons/Cloud';

export default function FormFile({name, id}) {
    return (
        <div class="flex justify-center items-center w-full">
            <label for={id} class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                    <Cloud />
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload </span>
                        or drag and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id={id} name={name} type="file" class="hidden" />
            </label>
        </div>
    );
}