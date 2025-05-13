import React from 'react';
import {Link} from 'react-router-dom';
import ProductRow from './ProductRow';
import TableHead from './TableHead';
import CustomBttn from '../buttons/CustomBttn';
import Table from './Table';
import ColorLabel from '../ColorLabel';
import StarRating from '../StarRating';
import Edit from '../../assets/icons/Edit';
import Eye from '../../assets/icons/Eye';
import Trash from '../../assets/icons/Trash';
import Cart from '../../assets/icons/Cart';

export default function InventoryTable() {
    return (
        <Table>
            <TableHead headers={['', 'Product', 'Category', 'Stock', 'Sales/Day', 'Sales/Month', 'Rating', 'Sales', 'Revenues', 'Actions']} />
            <tbody>
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        Apple iMac 27
                    </div>,
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Phone</span>,
                    <ColorLabel color="Red" style="red" />, 1.47, 0.47,
                    <StarRating rating="5.0" rates="" />, <div class="flex items-center"><Cart />1.6M</div>,
                    "$3.2M",
                    <div class="flex items-center space-x-4">
                        <CustomBttn text="Edit" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <Edit />
                        </CustomBttn>
                        <Link to="/admin/product">
                            <CustomBttn text="Preview" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Delete" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                            <Trash />
                        </CustomBttn>
                    </div>
                ]} />
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/devices/apple-iphone-14.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        Apple iPhone 14
                    </div>,
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Phone</span>,
                    <ColorLabel color="Red" style="red" />, 1.47, 0.47,
                    <StarRating rating="5.0" rates="" />, <div class="flex items-center"><Cart />1.6M</div>,
                    "$3.2M",
                    <div class="flex items-center space-x-4">
                        <CustomBttn text="Edit" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <Edit />
                        </CustomBttn>
                        <Link to="/admin/product">
                            <CustomBttn text="Preview" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Delete" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                            <Trash />
                        </CustomBttn>
                    </div>
                ]} />
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/devices/apple-ipad-air.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        Apple iPad Air
                    </div>,
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Phone</span>,
                    <ColorLabel color="Red" style="red" />, 1.47, 0.47,
                    <StarRating rating="5.0" rates="" />, <div class="flex items-center"><Cart />1.6M</div>,
                    "$3.2M",
                    <div class="flex items-center space-x-4">
                        <CustomBttn text="Edit" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <Edit />
                        </CustomBttn>
                        <Link to="/admin/product">
                            <CustomBttn text="Preview" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Delete" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                            <Trash />
                        </CustomBttn>
                    </div>
                ]} />
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/devices/xbox-series-s.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        Xbox Series S
                    </div>,
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Phone</span>,
                    <ColorLabel color="Red" style="red" />, 1.47, 0.47,
                    <StarRating rating="5.0" rates="" />, <div class="flex items-center"><Cart />1.6M</div>,
                    "$3.2M",
                    <div class="flex items-center space-x-4">
                        <CustomBttn text="Edit" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <Edit />
                        </CustomBttn>
                        <Link to="/admin/product">
                            <CustomBttn text="Preview" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Delete" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                            <Trash />
                        </CustomBttn>
                    </div>
                ]} />
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/devices/playstation-5.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        PlayStation 5
                    </div>,
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Phone</span>,
                    <ColorLabel color="Red" style="red" />, 1.47, 0.47,
                    <StarRating rating="5.0" rates="" />, <div class="flex items-center"><Cart />1.6M</div>,
                    "$3.2M",
                    <div class="flex items-center space-x-4">
                        <CustomBttn text="Edit" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <Edit />
                        </CustomBttn>
                        <Link to="/admin/product">
                            <CustomBttn text="Preview" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Delete" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                            <Trash />
                        </CustomBttn>
                    </div>
                ]} />
                <ProductRow data={[
                    <div class="flex items-center mr-3">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/devices/xbox-series-x.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                        Xbox Series X
                    </div>,
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Phone</span>,
                    <ColorLabel color="Red" style="red" />, 1.47, 0.47,
                    <StarRating rating="5.0" rates="" />, <div class="flex items-center"><Cart />1.6M</div>,
                    "$3.2M",
                    <div class="flex items-center space-x-4">
                        <CustomBttn text="Edit" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <Edit />
                        </CustomBttn>
                        <Link to="/admin/product">
                            <CustomBttn text="Preview" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Eye />
                            </CustomBttn>
                        </Link>
                        <CustomBttn text="Delete" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                            <Trash />
                        </CustomBttn>
                    </div>
                ]} />
            </tbody>
        </Table>
    );
}