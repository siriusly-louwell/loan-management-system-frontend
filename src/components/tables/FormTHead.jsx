import React from "react";

export default function FormTHead({ children }) {
  return (
    <thead className="text-sm font-medium text-gray-900 dark:text-white border dark:border-gray-500">
      {children}
    </thead>
  );
}
