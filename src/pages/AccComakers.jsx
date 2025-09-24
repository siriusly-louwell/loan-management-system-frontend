import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import CreateProduct from './CreateProduct';
import CRUDformat from '../components/CRUDformat';
import ProductRow from '../components/tables/ProductRow';
import TableHead from '../components/tables/TableHead';
import CustomBttn from '../components/buttons/CustomBttn';
import Table from '../components/tables/Table';
import Eye from '../assets/icons/Eye';
import SmallSpin from '../components/loading components/SmallSpin';
import EmptyRows from '../components/empty states/EmptyRows';

export default function AccComakers() {
    const [customer, setCustomer] = useState([]);
    const [customLoad, setCustomLoad] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/application')
        .then(response => response.json())
        .then(data => {
            setCustomer(data);
            setCustomLoad(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            setCustomLoad(true);
        })
    }, []);

    function dateConvert(date) {
        const newDate = new Date(date);
        const formatted = new Intl.DateTimeFormat('en-GB').format(newDate);

        return formatted;
    }

    // if(!customLoad)customer.sort((a, b) => b.id - a.id);

    function displayRow(custom) {
        if(custom.user) {
            return custom.user.role == 'customer' ?
                (<ProductRow key={custom.id} data={[ 
                    <div className="flex items-center mr-3">
                        <img src={`http://localhost:8000/storage/${custom.user.pfp}`} alt="iMac Front Image" className="h-8 rounded-full w-auto mr-3" />
                        {custom.first_name} {custom.last_name}
                    </div>,
                    custom.record_id,
                    5, 4, custom.user.email, dateConvert(custom.user.created_at),
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
                ]} />) : ''
        }
    }

    return (
        <CRUDformat addModal={<CreateProduct />} label="User">
            <Table>
                <TableHead headers={['', 'Name', 'Record ID', 'Active loans', 'Paid Loans', 'Email', 'Last login', 'Actions']} />
                <tbody>
                    {customer.map(custom => (
                        customLoad ? (
                            <div className="w-full h-1/3 flex justify-center items-center">
                                <div className="dark:text-white">Loading...</div>
                            </div>
                        )
                        : displayRow(custom)
                    ))}
                </tbody>
            </Table>
            {customLoad ? (
                <div class="w-full h-40 py-20 bg-gray-100 flex justify-center items-center">
                    <SmallSpin size={50}  />
                </div>
            ) : ""}
            {customer.length === 0 && !customLoad ? (
                <EmptyRows />
            ) : ""}
        </CRUDformat>
    );
}