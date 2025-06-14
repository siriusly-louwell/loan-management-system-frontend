import React from "react";
import FooterLink from "./links/FooterLink";
import RMCI from '../assets/images/RMCI.png';
import { useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();
    const apply = [
        '/customer/apply',
        '/customer/apply/personalinfo',
        '/customer/apply/employinfo',
        '/customer/apply/familyinfo',
        '/customer/apply/requirements',
        '/customer/apply/comakerform'
    ];
    const applyPath = apply.find(path => location.pathname === path);

    return applyPath ? "" : (
        <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl text-center">
            <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
                <img src={RMCI} className="h-6 mr-2" alt="Rhean Motor Logo" />
                Rhean Motor Center    
            </a>
            <p className="my-6 text-gray-500 dark:text-gray-400">Open-source library of over 400+ web components and interactive elements built for better web.</p>
            <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                <FooterLink text="About" />
                <FooterLink text="Premium" />
                <FooterLink text="Campaigns" />
                <FooterLink text="Blog" />
                <FooterLink text="Affiliate Program" />
                <FooterLink text="FAQs" />
                <FooterLink text="Contact" />
            </ul>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025-2026 <a href="#" className="hover:underline">Loan Management System</a>. All Rights Reserved.</span>
        </div>
        </footer>
    );
}