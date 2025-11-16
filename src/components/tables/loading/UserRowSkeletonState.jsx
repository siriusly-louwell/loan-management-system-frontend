import React from 'react';

const UserRowSkeleton = ({ num }) => {
  const rows = Array.from({ length: num }, (_, index) => index); // Create an array of 'num' length

  return (
    <div>
      {rows.map((row) => (
        <div
          key={row}
          className="flex justify-between p-4 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"
        >
          <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default UserRowSkeleton;
