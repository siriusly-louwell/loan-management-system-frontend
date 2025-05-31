import React from 'react';
import CustomBadge from '../badges/CustomBadge';

export default function FormSelect({children, name, label, id, value, onchange, require = false}) {
    return (
        <div>
            <label for={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label} {require ? (<CustomBadge text='*required' color='pink' />) : ''}</label>
            <select id={id} name={name} defaultValue={value} onChange={onchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option selected="">Select {label}</option>
                {children}
            </select>
        </div>
    );
}