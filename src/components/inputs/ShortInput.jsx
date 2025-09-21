import React from "react";

export default function ShortInput({
  name,
  type,
  id,
  placeholder,
  change,
  required,
}) {
  return (
    <input
      type={type}
      name={name}
      onChange={change}
      id={id}
      className="bg-white border border-gray-200 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[10vh] px-2 py-1.5 dark:bg-rose-500 dark:bg-opacity-20 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      required={required}
    />
  );
}
