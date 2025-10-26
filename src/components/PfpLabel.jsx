import React from "react";

export default function PfpLabel({ caption, label, loading }) {
  return (
    <dl>
      <dt className="font-semibold text-gray-900 dark:text-white">{caption}</dt>
      {loading ? (
        <div className="w-60 h-5 mt-1 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
      ) : (
        <dd className="text-gray-500 dark:text-gray-400">{label}</dd>
      )}
    </dl>
  );
}
