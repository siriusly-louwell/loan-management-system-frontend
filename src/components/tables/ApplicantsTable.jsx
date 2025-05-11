import React from 'react';
import {Link} from 'react-router-dom';
import ProductRow from './ProductRow';
import TableHead from './TableHead';
import CustomBttn from '../buttons/CustomBttn';
import Table from './Table';
import SmallUpArrow from '../../assets/icons/SmallUpArrow';
import Eye from '../../assets/icons/Eye';
import CustomBadge from '../badges/CustomBadge';
import Confirmed from '../badges/Confirmed';

export default function ApplicantsTable() {
    return (
        <Table>
            <TableHead headers={['', 'Name', 'Credit score', 'Last login', 'Status', 'Loan Status', 'Actions']} />
            <tbody>
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        John Doe
                    </div>,
                    <div class="flex items-center space-x-4">
                        96
                        <span class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            <SmallUpArrow />
                            15%
                        </span>
                    </div>,
                    "05/12/2025", <CustomBadge text="Accepted" color="green" />, <Confirmed />,
                    <div class="flex items-center space-x-4">
                        <Link to="/profile">
                            <CustomBttn text="View" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Deactivate" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                        </CustomBttn>
                    </div>
                ]} />
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        John Doe
                    </div>,
                    <div class="flex items-center space-x-4">
                        96
                        <span class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            <SmallUpArrow />
                            15%
                        </span>
                    </div>,
                    "05/12/2025", <CustomBadge text="Accepted" color="green" />, <Confirmed />,
                    <div class="flex items-center space-x-4">
                        <Link to="/profile">
                            <CustomBttn text="View" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Deactivate" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                        </CustomBttn>
                    </div>
                ]} />
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        John Doe
                    </div>,
                    <div class="flex items-center space-x-4">
                        96
                        <span class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            <SmallUpArrow />
                            15%
                        </span>
                    </div>,
                    "05/12/2025", <CustomBadge text="Accepted" color="green" />, <Confirmed />,
                    <div class="flex items-center space-x-4">
                        <Link to="/profile">
                            <CustomBttn text="View" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Deactivate" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                        </CustomBttn>
                    </div>
                ]} />
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        John Doe
                    </div>,
                    <div class="flex items-center space-x-4">
                        96
                        <span class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            <SmallUpArrow />
                            15%
                        </span>
                    </div>,
                    "05/12/2025", <CustomBadge text="Accepted" color="green" />, <Confirmed />,
                    <div class="flex items-center space-x-4">
                        <Link to="/profile">
                            <CustomBttn text="View" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Deactivate" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                        </CustomBttn>
                    </div>
                ]} />
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        John Doe
                    </div>,
                    <div class="flex items-center space-x-4">
                        96
                        <span class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            <SmallUpArrow />
                            15%
                        </span>
                    </div>,
                    "05/12/2025", <CustomBadge text="Accepted" color="green" />, <Confirmed />,
                    <div class="flex items-center space-x-4">
                        <Link to="/profile">
                            <CustomBttn text="View" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Deactivate" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                        </CustomBttn>
                    </div>
                ]} />
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        John Doe
                    </div>,
                    <div class="flex items-center space-x-4">
                        96
                        <span class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            <SmallUpArrow />
                            15%
                        </span>
                    </div>,
                    "05/12/2025", <CustomBadge text="Accepted" color="green" />, <Confirmed />,
                    <div class="flex items-center space-x-4">
                        <Link to="/profile">
                            <CustomBttn text="View" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Deactivate" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                        </CustomBttn>
                    </div>
                ]} />
            </tbody>
        </Table>
    );
}