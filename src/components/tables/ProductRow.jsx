import React from 'react';
import {Link} from 'react-router-dom';
import StarRating from '../StarRating';
import CustomBttn from '../buttons/CustomBttn';
import Edit from '../../assets/icons/Edit';
import Eye from '../../assets/icons/Eye';
import Trash from '../../assets/icons/Trash';
import TableData from '../tables/TableData';
import Cart from '../../assets/icons/Cart';
import ColorLabel from '../ColorLabel';

export default function ProductRow({prodName, img}) {
    return (
        <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            <td class="p-4 w-4">
                <div class="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()" class="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                </div>
            </td>
            <TableData>
                <div class="flex items-center mr-3">
                    <img src={img} alt="iMac Front Image" class="h-8 w-auto mr-3" />
                    {prodName}
                </div>
            </TableData>
            <td class="px-4 py-3">
                <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Phone</span>
            </td>
            <TableData>
                <ColorLabel color="Red" style="red" />
            </TableData>
            <TableData>1.47</TableData>
            <TableData>0.47</TableData>
            <TableData>
                <StarRating rating="5.0" rates="" />
            </TableData>
            <TableData>
                <div class="flex items-center">
                    <Cart />
                    1.6M
                </div>
            </TableData>
            <td class="px-4 py-3">$3.2M</td>
            <TableData>
                <div class="flex items-center space-x-4">
                    <CustomBttn text="Edit" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <Edit />
                    </CustomBttn>
                    <Link to="/product">
                        <CustomBttn text="Preview" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <Eye />
                        </CustomBttn>
                    </Link>
                    <CustomBttn text="Delete" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        onclick={() => document.getElementById('delete_product').style.display = "block"}>
                        <Trash />
                    </CustomBttn>
                </div>
            </TableData>
        </tr>
    );
}