import React from "react";

export default function FormSelect({
  children,
  name,
  label,
  id,
  value,
  onchange,
  require = false,
  disable = false,
}) {
  const color = value === "__EMPTY__" ? "red" : "gray";

  return (
    <div>
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium text-${color}-900 dark:text-white`}>
        {label} {require ? <strong className="text-rose-500">*</strong> : ""}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={value}
        onChange={onchange}
        disabled={disable}
        className={`bg-${color}-50 border border-${color}-400 text-${color}-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-${color}-700 dark:border-${color}-600 dark:placeholder-${color}-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}>
        <option value="__EMPTY__">
          Select {label}
        </option>
        {children}
      </select>
    </div>
  );
}
