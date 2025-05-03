import React from 'react';
import NavLink from './links/NavLink';
import DropdownMenu from './DropdownMenu';
import HamburgerMenu from './buttons/HamburgerMenu';
import AvatarBttn from './buttons/AvatarBttn';
import MenuLink from './links/MenuLink';

export default function Navbar() {

  function dropMenu() {
    document.getElementById('user-dropdown').style.display = 'block';
  }

  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Loan Management System</span>
      </a>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <AvatarBttn dropMenu={dropMenu} />
        <DropdownMenu id="user-dropdown">
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
          </div>
          <MenuLink pathName="Dashboard" />
          <MenuLink pathName="Settings" />
          <MenuLink pathName="Earnings" />
          <MenuLink pathName="Log out" />
        </DropdownMenu>
        <HamburgerMenu />
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <NavLink pathName="Home" active={true} />
          <NavLink pathName="About" active={false} />
          <NavLink pathName="Services" active={false} />
          <NavLink pathName="Pricing" active={false} />
          <NavLink pathName="Contacts" active={false} />
        </ul>
      </div>
      </div>
    </nav>
  );
}