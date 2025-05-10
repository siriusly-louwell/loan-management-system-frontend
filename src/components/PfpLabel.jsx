import React from "react";

export default function PfpLabel({caption, label}) {
    return (
        <dl>
            <dt class="font-semibold text-gray-900 dark:text-white">{caption}</dt>
            <dd class="text-gray-500 dark:text-gray-400">{label}</dd>
        </dl>
    );
}