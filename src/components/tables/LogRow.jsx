import React from 'react';
import BasicButton from '../buttons/BasicBttn';

export default function LogRow({id, date, unit, badge}) {
    return (
        <div class="flex flex-wrap items-center gap-y-4 py-6">
            <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{date}</dd>
            </dl>

            <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Invoice ID:</dt>
                <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    <a href="#" class="hover:underline">{id}</a>
                </dd>
            </dl>

            <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Unit:</dt>
                <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{unit}</dd>
            </dl>

            <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                {badge}
            </dl>

            <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                <BasicButton text="View Details" />
            </div>
        </div>
    );
}