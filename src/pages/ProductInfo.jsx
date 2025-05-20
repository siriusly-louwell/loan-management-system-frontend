import React from 'react';
import AddtoCartBttn from "../components/buttons/AddtoCartBttn";
import StarRating from "../components/StarRating";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import NavPath from "../components/NavPath";
import EMICalculator from './EMICalculator';

export default function ProductInfo() {
    return (
        <section class="py-8 bg-white md:py-16 dark:bg-gray-800 antialiased">
            <NavPath />
            <div class="max-w-screen-xl mt-10 px-4 mx-auto 2xl:px-0">
                <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
                        <img class="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="" />
                        <img class="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />
                    </div>

                    <div class="mt-6 sm:mt-8 lg:mt-0">
                        <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            Apple iMac 24" All-In-One Computer, Apple M1, 8GB RAM, 256GB SSD,
                            Mac OS, Pink
                        </h1>
                        <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">$1,249.99</p>

                            <StarRating rating="(5.0)" rates="345 Reviews" />
                        </div>

                        <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                            <BttnwithIcon text="Add to favorites">
                                <svg class="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                </svg>
                            </BttnwithIcon>
                            <AddtoCartBttn />
                        </div>
                        <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                        <p class="mb-6 text-gray-500 dark:text-gray-400">
                            Studio quality three mic array for crystal clear calls and voice
                            recordings. Six-speaker sound system for a remarkably robust and
                            high-quality audio experience. Up to 256GB of ultrafast SSD storage.
                        </p>

                        <p class="text-gray-500 dark:text-gray-400">
                            Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
                            Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
                            Magic Keyboard or Magic Keyboard with Touch ID.
                        </p>
                    </div>
                </div>
            </div>
            <EMICalculator />
        </section>
    );
}