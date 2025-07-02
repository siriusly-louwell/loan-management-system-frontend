import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import CreateUser from './CreateUser';
import CRUDformat from '../components/CRUDformat';
import ProductRow from '../components/tables/ProductRow';
import TableHead from '../components/tables/TableHead';
import CustomBttn from '../components/buttons/CustomBttn';
import Table from '../components/tables/Table';
import Eye from '../assets/icons/Eye';
import CustomBadge from '../components/badges/CustomBadge';
import EmptyRows from '../components/empty states/EmptyRows';
import SmallSpin from '../components/loading components/SmallSpin';

export default function AccAdmins() {
    const [accStaff, setStaff] = useState([]);
    const [staffLoad, setStaffLoad] = useState(true);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/account')
        .then(response => response.json())
        .then(data => {
            setStaff(data);
            setStaffLoad(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            setStaffLoad(true);
        })
    }, []);

    if(!staffLoad)accStaff.sort((a, b) => b.id - a.id);

    return (
        <CRUDformat addModal={<CreateUser />} modalId='createUser' label="User">
            <Table>
                <TableHead headers={['', 'Name', 'Email', 'Last login', 'Status', 'Actions']} />
                {staffLoad ? (
                    <div className="w-full h-1/3 flex justify-center items-center">
                        <div className="dark:text-white">Loading...</div>
                    </div>
                ) : (
                    <tbody>
                        {accStaff.map(account => (
                            account.role == 'staff' ? (
                                <ProductRow key={account.id} data={[
                                    <div className="flex items-center mr-3">
                                        <img src={"http://localhost:8000/storage/"+account.pfp} alt="iMac Front Image" className="h-8 rounded-lg w-auto mr-3" />
                                        {account.first_name} {account.last_name}
                                    </div>,
                                    account.email,
                                    "05/12/2025",
                                    <CustomBadge text="Active" color="green" />,
                                    <div className="flex items-center space-x-4">
                                        <Link to="/admin/profile">
                                            <CustomBttn text="View" classname="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                <Eye />
                                            </CustomBttn>
                                        </Link>
                                        <CustomBttn text="Deactivate" classname="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                                        </CustomBttn>
                                    </div>
                                ]} />
                            ) : ''
                        ))}
                    </tbody>
                )}
            </Table>
            {staffLoad ? (
                <div class="w-full h-40 py-20 bg-gray-100 flex justify-center items-center">
                    <SmallSpin size={50}  />
                </div>
            ) : ""}
            {accStaff.length === 0 && !staffLoad ? (
                <EmptyRows />
            ) : ""}
        </CRUDformat>
    );
}