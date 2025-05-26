import React, { useEffect, useState } from 'react';
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
import Ex from '../../assets/icons/Ex';

export default function InventoryTable({motorcycles, loading, editMotor}) {
    console.log(motorcycles);
    function colorCont(motor) {
        const colorDiv = <div className='grid grid-cols-4 gap-y-2'>
            {motor.colors.map(color => (
                <ColorLabel style={color.color} />
            ))}
        </div>

        return colorDiv;
    }

    return loading ? (
        <div class="w-full h-1/3 flex justify-center items-center">
            <div class="dark:text-white">Loading...</div>
        </div>
    )
    : (
        <Table>
            <TableHead headers={['', 'Product', 'Brand', 'Colors', 'Price', 'Quantity', 'Rebate Value', 'Interest Rate', 'Loan Tenure', 'Actions']} />
            <tbody>
                {motorcycles.map(motor => (
                    <ProductRow key={motor.id} data={[
                        <div class="flex items-center mr-3">
                            <img src={"http://127.0.0.1:8000/storage/"+motor.file_path} alt="unit image" class="h-8 w-auto mr-3" />
                            {motor.name}
                        </div>,
                        <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{motor.brand}</span>,
                        <div className='grid grid-cols-4 gap-y-2'>
                            {motor.colors.map(color => (
                                <ColorLabel style={color.color} />
                            ))}
                        </div>,
                        "₱" + motor.price,
                        motor.quantity,
                        "₱" + motor.rebate,
                        motor.interest + "%",
                        motor.tenure + " years",
                        // <div class="flex items-center"><Cart />1.6M</div>,
                        // "$3.2M",
                        <div class="flex items-center space-x-4">
                            <CustomBttn text="Edit" onclick={() => editMotor(motor.id)} className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <Edit />
                            </CustomBttn>
                            {/* <Link to="/admin/product">
                                <CustomBttn text="Preview" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    <Eye />
                                </CustomBttn>
                            </Link> */}
                            <CustomBttn text="Move to Archive" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                onclick={() => document.getElementById('delete_product').style.display = "block"}>
                                <Ex className="mr-1 -ml-1 w-5 h-5" />
                            </CustomBttn>
                        </div>
                    ]} />
                ))}
            </tbody>
        </Table>
    );
}