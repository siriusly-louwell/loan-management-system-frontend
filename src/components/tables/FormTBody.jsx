import React from "react";

export default function FormTBody({ children }) {
  return (
    <tbody className="text-sm font-medium text-gray-900 dark:text-white">
      {children}
    </tbody>
  );
}
