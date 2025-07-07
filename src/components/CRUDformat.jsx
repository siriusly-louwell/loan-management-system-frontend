import React from 'react';
import {useEffect, useRef, useState} from 'react';
import { useLocation } from 'react-router-dom';
import CustomBttn from '../components/buttons/CustomBttn';
import BasicBttn from '../components/buttons/BasicBttn';
import Plus from '../assets/icons/Plus';
import DropdownBttn from '../components/buttons/DropdownBttn';
import Filter from '../assets/icons/Filter';
import SearchInput from '../components/inputs/SearchInput';
import Search from '../assets/icons/Search';
import DropdownMenu from '../components/DropdownMenu';
import MenuLink from '../components/links/MenuLink';
import PageNav from '../components/PageNav';
import Alert from '../components/Alert';
import StockModal from './modals/StockModal';

export default function CRUDformat({children, addModal, label, modalId, modal, adjustStock}) {
    const location = useLocation();
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
            <section class="bg-gray-200 dark:bg-gray-800 w-full py-3 sm:p-5 antialiased">
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
                                {location.pathname !== "/admin/accounts/applicants" && location.pathname !== "/admin/accounts/customers" && location.pathname !== "/admin/accounts" ? (
                                    <CustomBttn text={"Add " + label} classname="flex items-center justify-center text-white bg-rose-600 hover:bg-rose-600 focus:ring-4 focus:ring-rose-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                        onclick={() => document.getElementById(modalId).style.display = "block"}>
                                        <Plus />
                                    </CustomBttn>
                                ) : ""}
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
                        <div class="overflow-x-auto min-h-40">
                            {children}
                        </div>
                        <PageNav />
                    </div>
                </div>
            </section>
            {addModal}
            {modal ? (
                <Alert id="stock_adjust" text="Stock Adjustment Type:" icon="warn">
                    <CustomBttn text="Restock" onclick={() => adjustStock('restock')} classname="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" />
                    <CustomBttn text="Destock" onclick={() => adjustStock('destock')} classname="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" />
                </Alert>
            ) : ''}
        </>
    );
}