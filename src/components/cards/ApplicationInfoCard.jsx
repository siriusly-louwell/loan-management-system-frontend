import React from "react";

export default function ApplicationInfoCard({ title, children }) {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-4">
      <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-6">
        {title}
      </h2>
      {children}
      {/* Present Address */}
      {/* <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Present Address
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {info.present_address &&
            Object.entries(info.present_address).map(([key, value]) => (
              <div key={key}>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {key.replace(/_/g, " ")}
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {value}
                </div>
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
}
