import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ProductRow from './ProductRow';
import TableHead from './TableHead';
import CustomBttn from '../buttons/CustomBttn';
import Table from './Table';
import ColorLabel from '../ColorLabel';
import Edit from '../../assets/icons/Edit';
import Eye from '../../assets/icons/Eye';
import Trash from '../../assets/icons/Trash';
import Cart from '../../assets/icons/Cart';
import Ex from '../../assets/icons/Ex';
import CustomBadge from '../badges/CustomBadge';
import EmptyFolder from '../empty states/EmptyFolder';
import SmallSpin from '../loading components/SmallSpin';
import Plus from '../../assets/icons/Plus';

export default function InventoryTable({motorcycles, loading, editMotor}) {
    if(!loading)motorcycles.sort((a, b) => b.id - a.id);

    function isThisWeek(created_at) {
        const date = new Date(created_at);
        const now = new Date();
        const start = new Date();

        now.setHours(23, 59, 59, 999);
        start.setDate(now.getDate() - 2);
        start.setHours(0, 0, 0, 0);

        return date >= start && date <= now;
    }

    return (
        <>
            <Table>
                <TableHead headers={['', 'Product', 'Brand', 'Colors', 'Price', 'Quantity', 'Rebate Value', 'Interest Rate', 'Loan Tenure', 'Actions']} />
                {loading ? ("") : (
                    <tbody>
                        {motorcycles.map(motor => (
                            <ProductRow key={motor.id} recent={isThisWeek(motor.created_at)} data={[
                                <div class="flex items-center mr-3 space-x-2">
                                    <img src={"http://127.0.0.1:8000/storage/"+motor.file_path} alt="unit image" class="h-8 w-auto mr-3 rounded-lg" />
                                    {motor.name}
                                    {isThisWeek(motor.created_at) ? <CustomBadge text="new" color="red" /> : ''}
                                </div>,
                                <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{motor.brand}</span>,
                                <div className='grid grid-cols-4 gap-y-2'>
                                    {motor.colors.map(color => (
                                        <ColorLabel style={color.color} />
                                    ))}
                                </div>,
                                "₱" + parseFloat(motor.price).toLocaleString(),
                                motor.quantity,
                                "₱" + parseFloat(motor.rebate).toLocaleString(),
                                motor.interest + "%",
                                motor.tenure + " years",
                                // <div class="flex items-center"><Cart />1.6M</div>,
                                <div class="flex items-center space-x-4">
                                    <CustomBttn text="Edit" onclick={() => editMotor(motor.id)} classname="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-rose-600 rounded-lg hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-600 dark:bg-rose-600 dark:hover:bg-rose-600 dark:focus:ring-rose-600">
                                        <Edit />
                                    </CustomBttn>
                                    {/* <Link to="/admin/product">
                                        <CustomBttn text="Preview" classname="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            <Eye />
                                        </CustomBttn>
                                    </Link> */}
                                    <CustomBttn text="Manage Stock" classname="flex items-center text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-rose-500 dark:text-rose-500 dark:hover:text-white dark:hover:bg-rose-600 dark:focus:ring-rose-900"
                                        onclick={() => document.getElementById('stock_adjust').style.display = "block"}>
                                        <Plus />
                                    </CustomBttn>
                                </div>
                            ]} />
                        ))}
                    </tbody>
                )}
            </Table>
            {loading ? (
                <div class="w-full h-40 py-20 bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
                    <SmallSpin size={50}  />
                </div>
            ) : ""}
            {motorcycles.length === 0 && !loading ? (
                <EmptyFolder />
            ) : ""}
        </>
    );
}