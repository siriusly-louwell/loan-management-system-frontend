import React from "react";

export default function FormCheck({
  label,
  name,
  id,
  type,
  value,
  change,
  style,
  check,
  icon,
  disable = false,
  require
}) {
  return (
    <div className={"flex items-center mr-4 " + style}>
      <input
        id={id}
        type={type}
        value={value}
        name={name}
        onChange={change}
        checked={check}
        disabled={disable}
        required={require}
        className="w-4 h-4 bg-gray-100 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      {icon ? <img src={icon} className="w-5 ml-3" alt="icon" /> : ""}
      <label
        htmlFor={id}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
}
