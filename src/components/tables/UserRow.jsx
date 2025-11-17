import React from 'react';

const UserRow = ({ data, click }) => {
    return (
        <div
            onClick={click}
            className="flex justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
            <div className="flex items-center space-x-4">
                <img
                    src={data.pfp}
                    alt="User Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow-lg"
                />
                <div>
                    <div className="font-bold text-gray-800 dark:text-white">{data.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{data.email}</div>
                </div>
            </div>
            <div className="text-gray-600 dark:text-gray-300">{data.role}</div>
        </div>
    );
};

export default UserRow;
