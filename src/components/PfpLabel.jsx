import React from "react";

export default function PfpLabel({caption, label}) {
    return (
        <dl>
            <dt className="font-semibold text-gray-900 dark:text-white">{caption}</dt>
            <dd className="text-gray-500 dark:text-gray-400">{label}</dd>
        </dl>
    );
}