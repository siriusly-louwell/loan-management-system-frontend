import React from 'react';
import {useEffect, useState, useRef} from 'react';
import Navlink from './links/NavLink';
import DropdownMenu from './DropdownMenu';
import HamburgerMenu from './buttons/HamburgerMenu';
import AvatarBttn from './buttons/AvatarBttn';
import MenuLink from './links/MenuLink';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Loan Management System</span>
        </a>
        <div class="justify-items-center md:order-2 sm:space-y-4 rtl:space-x-reverse">
          <AvatarBttn dropMenu={toggleDropdown} />
          <HamburgerMenu />
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Navlink pathName="Home" to="/" />
            <Navlink pathName="Dashboard" to="/dashboard" />
            <Navlink pathName="Inventory" to="/inventory" />
            <Navlink pathName="Loans" to="/loans" />
            <Navlink pathName="Accounts" to="/accounts" />
          </ul>
        </div>
        </div>
      </nav>
      <DropdownMenu ref={dropdownRef} className={isOpen ? "block" : 'hidden'}>
        <div class="px-4 py-3">
          <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <MenuLink pathName="Profile" path="/profile" />
        <MenuLink pathName="Settings" path="" />
        <MenuLink pathName="Log out" path="/login" />
      </DropdownMenu>
    </>
  );
}