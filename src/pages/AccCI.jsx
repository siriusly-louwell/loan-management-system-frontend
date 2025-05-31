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

export default function AccCI() {
    const [accCI, setCI] = useState([]);
    const [ciLoad, setCILoad] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/account')
        .then(response => response.json())
        .then(data => {
            setCI(data);
            setCILoad(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            setCILoad(true);
        })
    }, []);

    if(!ciLoad)accCI.sort((a, b) => b.id - a.id);

    return (
        <CRUDformat addModal={<CreateUser />} modalId='createUser' label="User">
            <Table>
                <TableHead headers={['', 'Name', 'Email', 'Loans held', 'Last login', 'Status', 'Actions']} />
                {ciLoad ? (
                    <div className="w-full h-1/3 flex justify-center items-center">
                        <div className="dark:text-white">Loading...</div>
                    </div>
                ) : (
                    <tbody>
                        {accCI.map(account => (
                            account.role == 'ci' ? (
                                <ProductRow key={account.id} data={[
                                    <div className="flex items-center mr-3">
                                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="iMac Front Image" className="h-8 rounded-lg w-auto mr-3" />
                                        {account.name}
                                    </div>,
                                    account.email,
                                    5,
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
        </CRUDformat>
    );
}