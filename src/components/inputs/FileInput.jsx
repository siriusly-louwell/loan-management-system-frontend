import React from "react";
import CustomBadge from "../badges/CustomBadge";

export default function FileInput({label, type, change, require = false}) {
    const fileType = type == 'img' ? 'SVG, PNG or JPG (MAX. 800x400px)' : 'PDF or DOCX (MAX. 2MB)'
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">{label} {require ? (<CustomBadge text='*required' color='pink' />) : ''}</label>
            <input onChange={change} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">{fileType}</p>
        </div>
    );
}