import React from "react";

export default function FormTHead({ children }) {
  return (
    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
      {children}
    </thead>
  );
}
