import React from 'react';
import Cloud from '../../assets/icons/Cloud';

export default function FormFile({name, file, id, onChange}) {
    return (
        <div className="flex justify-center items-center w-full">
            <label htmlFor={id} className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <Cloud />
                    {file && <span className="font-semibold">{file.name}</span>}
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload </span>
                        or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 800x400px)</p>
                </div>
                <input id={id} name={name} type="file" class="hidden" onChange={onChange} />
            </label>
        </div>
    );
}