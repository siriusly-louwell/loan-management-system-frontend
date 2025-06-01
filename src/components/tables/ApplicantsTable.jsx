import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import ProductRow from './ProductRow';
import TableHead from './TableHead';
import CustomBttn from '../buttons/CustomBttn';
import Table from './Table';
import Eye from '../../assets/icons/Eye';
import CustomBadge from '../badges/CustomBadge';
import EmptyRows from '../empty states/EmptyRows';
import SmallSpin from '../loading components/SmallSpin';

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
    }, []);

    function dateConvert(date) {
        const newDate = new Date(date);
        const formatted = new Intl.DateTimeFormat('en-GB').format(newDate);

        return formatted;
    }

    if(!appLoad)applicants.sort((a, b) => b.id - a.id);

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
                <TableHead headers={['', 'Name', 'Record ID', 'Applied at', 'Status', 'Actions']} />
                    {appLoad ? "" : (
                        <tbody>
                            {applicants.map(user => (
                                <ProductRow key={user.id} recent={isThisWeek(user.created_at)} data={[
                                    <div className="flex items-center mr-3 space-x-2">
                                        <img src={"http://127.0.0.1:8000/storage/"+user.id_pic} alt="applicant id" className="h-8 rounded-full w-auto mr-3" />
                                        {user.first_name} {user.last_name}
                                        {isThisWeek(user.created_at) ? <CustomBadge text="new" color="red" /> : ''}
                                    </div>,
                                    // <div className="flex items-center space-x-4">
                                    //     96
                                    //     <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                    //         <SmallUpArrow />
                                    //         15%
                                    //     </span>
                                    // </div>,
                                    user.record_id,
                                    dateConvert(user.created_at),
                                    user.apply_status == 'pending' ? (<CustomBadge text="Pending" color="blue" />) : (<CustomBadge text="Approved" color="green" />),
                                    <div className="flex items-center space-x-4">
                                        <Link to="/admin/loan" state={{id: user.id}}>
                                            <CustomBttn text="View" classname="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                <Eye />
                                            </CustomBttn>
                                        </Link>
                                        <CustomBttn text="Deactivate" classname="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                            onclick={() => document.getElementById('delete_product').style.display = "block"}>
                                        </CustomBttn>
                                    </div>
                                ]} />
                            ))}
                        </tbody>
                    )}
            </Table>
            {appLoad ? (
                <div class="w-full h-40 py-20 bg-gray-100 flex justify-center items-center">
                    <SmallSpin size={50}  />
                </div>
            ) : ""}
            {applicants.length === 0 && !appLoad ? (
                <EmptyRows />
            ) : ""}
        </>
    );
}