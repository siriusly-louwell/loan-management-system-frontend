import React from "react";
import FooterLink from "./links/FooterLink";
import RMCI from '../assets/images/RMCI.jpg';

export default function Footer() {
    return (
        <footer class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-900">
        <div class="mx-auto max-w-screen-xl text-center">
            <a href="#" class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
                <img src={RMCI} class="h-8 mr-2 rounded border border-gray-400" alt="Rhean Motor Logo" />
                Rhean Motor Center    
            </a>
            <p class="my-6 text-gray-500 dark:text-gray-400">Open-source library of over 400+ web components and interactive elements built for better web.</p>
            <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                <FooterLink text="About" />
                <FooterLink text="Premium" />
                <FooterLink text="Campaigns" />
                <FooterLink text="Blog" />
                <FooterLink text="Affiliate Program" />
                <FooterLink text="FAQs" />
                <FooterLink text="Contact" />
            </ul>
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025-2026 <a href="#" class="hover:underline">Loan Management System</a>. All Rights Reserved.</span>
        </div>
        </footer>
    );
}