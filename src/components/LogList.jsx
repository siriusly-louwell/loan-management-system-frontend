import React from "react";

export default function LogList({ children }) {
  return (
    <div className="mt-6 flow-root sm:mt-2 min-h-[50vh] max-h-[65vh]">
      <div className="divide-y divide-gray-200 dark:divide-gray-600">
        {children}
      </div>
    </div>
  );
}
