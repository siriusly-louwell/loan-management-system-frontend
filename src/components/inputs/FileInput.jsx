import React from "react";

export default function FileInput({
  label,
  type,
  change,
  name,
  require = false,
}) {
  const fileType =
    type === "img"
      ? "SVG, PNG, or JPG (MAX. 2MB 800x400px)"
      : "PDF or DOCX (MAX. 2MB)";
  return (
    <div className="mb-4">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={name}>
        {label} {require ? <strong className="text-rose-500">*</strong> : ""}
      </label>
      <input
        onChange={change}
        className="block w-full text-sm text-gray-900 cursor-pointer border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id={name}
        type="file"
        name={name}
      />
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
        {fileType}
      </p>
    </div>
  );
}
