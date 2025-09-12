import React from "react";

export default function Table({ children }) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      {children}
    </table>
  );
}
