import React, { useState, useEffect } from 'react';
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
    const [applicants, setApplicants] = useState([]);
    const [appLoad, setAppLoad] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/application')
            .then(response => response.json())
            .then(data => {
                setApplicants(data);
                setAppLoad(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            setAppLoad(true);
        })
        console.log(applicants);
    }, []);

    function dateConvert(date) {
        const newDate = new Date(date);
        const formatted = new Intl.DateTimeFormat('en-GB').format(newDate);

        return formatted;
    }

    return (
        <Table>
            <TableHead headers={['', 'Name', 'Record ID', 'Applied at', 'Status', 'Actions']} />
                {appLoad ? (
                    <div class="w-full h-1/3 flex justify-center items-center">
                        <div class="dark:text-white">Loading...</div>
                    </div>
                ) : (
                    <tbody>
                        {applicants.map(user => (
                            <ProductRow data={[
                                <div class="flex items-center mr-3">
                                    <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="iMac Front Image" class="h-8 w-auto mr-3" />
                                    {user.first_name} {user.last_name}
                                </div>,
                                // <div class="flex items-center space-x-4">
                                //     96
                                //     <span class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                //         <SmallUpArrow />
                                //         15%
                                //     </span>
                                // </div>,
                                user.record_id,
                                dateConvert(user.created_at),
                                !user.user_id ? (<CustomBadge text="Pending" color="blue" />) : (<CustomBadge text="Approved" color="green" />),
                                <div class="flex items-center space-x-4">
                                    <Link to="/admin/loan" state={{id: user.id}}>
                                        <CustomBttn text="View" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            <Eye />
                                        </CustomBttn>
                                    </Link>
                                    <CustomBttn text="Deactivate" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                        onclick={() => document.getElementById('delete_product').style.display = "block"}>
                                    </CustomBttn>
                                </div>
                            ]} />
                        ))}
                    </tbody>
                )}
        </Table>
    );
}