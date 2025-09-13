import React from "react";

export default function Table({ children }) {
  return (
    <>
      <div className="min-h-[65vh] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {children}
        </table>
      </div>
    </>
  );
}
