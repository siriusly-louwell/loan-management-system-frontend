import React from "react";

export default function CustomBadge({ icon, text, color }) {
  const newText = text == "new" ? "2" : "2.5";

  return (
    <div
      className={`me-2 mt-1.5 inline-flex items-center rounded bg-${color}-100 px-${newText} py-0.5 text-xs font-medium text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300`}>
      {icon}
      {text}
    </div>
  );
}
