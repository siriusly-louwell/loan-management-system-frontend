import React from "react";
import { FileDown } from "lucide-react";

export default function FileButton({ name, link }) {
  return (
    <a
      href={link}
      download
      // onClick={click}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-rose-600 focus:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 dark:text-gray-400 dark:hover:text-rose-500 dark:focus:text-white dark:hover:bg-gray-800">
      <FileDown size={16} />
      <span className="truncate max-w-[200px]">{name}</span>
    </a>
  );
}
