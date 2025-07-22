import React from "react";

export default function FormTextarea({name, id, label, value, onchange, placeholder, require, disable}) {
    const color = value === '__EMPTY__' ? 'red' : 'gray';

    return (
        <div className="sm:col-span-2">
            <label for={id} className={`block mb-2 text-sm font-medium text-${color}-900 dark:text-white`}>{label} {require ? (<strong className='text-rose-500'>*</strong>) : ''}</label>
            <textarea id={id} name={name} value={value !== '__EMPTY__' ? value : ''} onChange={onchange} required={require} disabled={disable} rows="4" placeholder={placeholder}
            className={`block p-2.5 w-full h-40 text-sm text-${color}-900 bg-${color}-50 rounded-lg border border-${color}-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-${color}-700 dark:border-${color}-600 dark:placeholder-${color}-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}></textarea>
        </div>
    );
}