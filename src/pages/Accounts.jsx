import React from 'react';
import {useEffect, useRef, useState} from 'react';
import ProductRow from '../components/tables/ProductRow';
import TableHead from '../components/tables/TableHead';
import CustomBttn from '../components/buttons/CustomBttn';
import Plus from '../assets/icons/Plus';
import DropdownBttn from '../components/buttons/DropdownBttn';
import Filter from '../assets/icons/Filter';
import SearchInput from '../components/inputs/SearchInput';
import Search from '../assets/icons/Search';
import Table from '../components/tables/Table';
import DropdownMenu from '../components/DropdownMenu';
import MenuLink from '../components/links/MenuLink';
import PageNav from '../components/PageNav';
import CreateProduct from './CreateProduct';
import Alert from '../components/Alert';

export default function Inventory() {
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
            <section class="bg-gray-50 dark:bg-gray-800 py-3 sm:p-5 antialiased">
                <div class="mx-auto w-full px-4 lg:px-4">
                    <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div class="flex-1 flex items-center space-x-2">
                                <h5>
                                    <span class="text-gray-500">All Accounts:</span>
                                    <span class="dark:text-white">123456</span>
                                </h5>
                                <h5 class="text-gray-500 dark:text-gray-400 ml-1">1-100 (436)</h5>
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                            <div class="w-full md:w-1/2">
                                <form class="flex items-center">
                                    <label for="simple-search" class="sr-only">Search</label>
                                    <SearchInput name="findProd" id="simple-search" placeholder="Search user here ...">
                                        <Search />
                                    </SearchInput>
                                </form>
                            </div>
                            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <CustomBttn text="Add User" className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                    onclick={() => document.getElementById('createProduct').style.display = "block"}>
                                    <Plus />
                                </CustomBttn>
                                <DropdownBttn text="Select user type">
                                    <Filter />
                                </DropdownBttn>
                                <div class="flex items-center space-x-3 w-full md:w-auto">
                                    <DropdownBttn text="Actions" toggleMenu={toggleDropdown} />
                                </div>
                            </div>
                        </div>
                        <DropdownMenu ref={dropdownRef} className={isOpen ? "block" : "hidden"}>
                            <MenuLink pathName="Mass Edit" />
                            <MenuLink pathName="Deactivate All" />
                        </DropdownMenu>
                        <div class="overflow-x-auto">
                            <Table>
                                <TableHead headers={['', 'Name', 'User type', 'Last login', 'Sales/Day', 'Sales/Month', 'Rating', 'Sales', 'Revenues', 'Last Update']} />
                                <tbody>
                                    <ProductRow prodName="Apple iMac 27" img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" />
                                    <ProductRow prodName="Apple iPhone 14" img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" />
                                    <ProductRow prodName="Apple iPad Air" img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" />
                                    <ProductRow prodName="Xbox Series S" img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" />
                                    <ProductRow prodName="PlayStation 5" img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" />
                                    <ProductRow prodName="Xbox Series X" img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" />
                                </tbody>
                            </Table>
                        </div>
                        <PageNav />
                    </div>
                </div>
            </section>
            <CreateProduct />
            <Alert id="delete_product" />
        </>
    );
}