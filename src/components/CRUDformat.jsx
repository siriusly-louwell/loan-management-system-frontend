import React from 'react';
import {useEffect, useRef, useState} from 'react';
import CustomBttn from '../components/buttons/CustomBttn';
import Plus from '../assets/icons/Plus';
import DropdownBttn from '../components/buttons/DropdownBttn';
import Filter from '../assets/icons/Filter';
import SearchInput from '../components/inputs/SearchInput';
import Search from '../assets/icons/Search';
import DropdownMenu from '../components/DropdownMenu';
import MenuLink from '../components/links/MenuLink';
import PageNav from '../components/PageNav';
import Alert from '../components/Alert';

export default function CRUDformat({children, addModal, label}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

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
            <section class="bg-gray-50 dark:bg-gray-800 w-full py-3 sm:p-5 antialiased">
                <div class="mx-auto px-4 lg:px-4">
                    <div class="bg-white w-full dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div class="flex-1 flex items-center space-x-2">
                                <h5>
                                    <span class="text-gray-500">All {label}s:</span>
                                    <span class="dark:text-white">123456</span>
                                </h5>
                                <h5 class="text-gray-500 dark:text-gray-400 ml-1">1-100 (436)</h5>
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                            <div class="w-full md:w-1/2">
                                <form class="flex items-center">
                                    <label for="simple-search" class="sr-only">Search</label>
                                    <SearchInput name="findProd" id="simple-search" placeholder="Search here...">
                                        <Search />
                                    </SearchInput>
                                </form>
                            </div>
                            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <CustomBttn text={"Add " + label} className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                    onclick={() => document.getElementById('createProduct').style.display = "block"}>
                                    <Plus />
                                </CustomBttn>
                                <DropdownBttn text={"Filter " + label + "s"}>
                                    <Filter />
                                </DropdownBttn>
                                <div class="flex items-center space-x-3 w-full md:w-auto">
                                    <DropdownBttn text="Actions" toggleMenu={toggleDropdown} />
                                </div>
                            </div>
                        </div>
                        <DropdownMenu ref={dropdownRef} className={isOpen ? "block" : "hidden"}>
                            <MenuLink pathName="Mass Edit" />
                            <MenuLink pathName="Delete All" />
                        </DropdownMenu>
                        <div class="overflow-x-auto">
                            {children}
                        </div>
                        <PageNav />
                    </div>
                </div>
            </section>
            {addModal}
            <Alert id="delete_product" />
        </>
    );
}