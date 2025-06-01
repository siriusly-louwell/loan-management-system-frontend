import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import HamburgerMenu from './buttons/HamburgerMenu';
import AvatarBttn from './buttons/AvatarBttn';
import MenuLink from './links/MenuLink';
import Button from './buttons/Button';
import RMCI from '../assets/images/RMCI.png';

export default function Navbar({links, path}) {
  const navigate = useNavigate();
  const location = useLocation();
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
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={RMCI} className="h-8" alt="Rhean Motor Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Rhean Motor Center</span>
        </a>
        <div className="justify-items-center flex space-x-4 md:order-2 sm:space-y-4 rtl:space-x-reverse">
          {(location.pathname == "/" || location.pathname == "/about" || location.pathname == "/services" || location.pathname == "/prodlist")
            ? (<Button text="Login" onclick={() => navigate('/login')} />)
            : (<AvatarBttn dropMenu={toggleDropdown} />)}
          <HamburgerMenu />
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links}
          </ul>
        </div>
        </div>
      </nav>
      <DropdownMenu ref={dropdownRef} className={isOpen ? "block" : 'hidden'}>
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <MenuLink pathName="Profile" path={path + "/profile"} />
        <MenuLink pathName="Settings" path="" />
        <MenuLink pathName="Log out" path="/login" />
      </DropdownMenu>
    </>
  );
}