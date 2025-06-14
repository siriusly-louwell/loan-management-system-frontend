import React from 'react';

export default function LogList({children}) {
    return (
        <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {children}
            </div>
        </div>
    );
}