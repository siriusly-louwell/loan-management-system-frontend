import React from 'react';

export default function LoanList({price, units, id, img, name}) {
    return (
        <div class="space-y-4 p-6">
            <div class="flex items-center gap-6">
                <a href="#" class="h-14 w-14 shrink-0">
                    <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                    <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                </a>

                <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white">{name}</a>
            </div>

            <div class="flex items-center justify-between gap-4">
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> {id}</p>

                <div class="flex items-center justify-end gap-4">
                    <p class="text-base font-normal text-gray-900 dark:text-white">x{units}</p>

                    <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">{price}</p>
                </div>
            </div>
        </div>
    );
}