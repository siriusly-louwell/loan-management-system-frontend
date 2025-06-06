import React from 'react';

export default function FormInput({label, id, type, name, min, value, onchange, placeholder, require = false, styling}) {
    return (
        <div>
            <label for={id} className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white "+styling}>{label} {require ? (<strong className='text-rose-500'>*</strong>) : ''}</label>
            <input type={type} min={min} name={name} id={id} value={value} onChange={onchange} placeholder={placeholder} required={require}
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-rose-600 focus:border-rose-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-500" />
        </div>
    );
}