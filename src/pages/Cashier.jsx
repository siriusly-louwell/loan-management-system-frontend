import React, { useState, useEffect } from 'react';
import Button from '../components/buttons/Button';
import FormInput from "../components/inputs/FormInput";
import SmallUpArrow from '../assets/icons/SmallUpArrow';
import LoanList from "../components/LoanList";
import PfpLabel from '../components/PfpLabel';
import Search from '../assets/icons/Search';
import SearchInput from '../components/inputs/SearchInput';
import EmptySearch from '../components/empty states/EmptySearch';
import CustomBadge from '../components/badges/CustomBadge';
import AddPayment from '../components/AddPayment';

export default function Cashier() {
    const [id, setId] = useState('');
    const [applicant, setApplicant] = useState({});

    useEffect(() => {
        if(id !== '') {
            fetch(`http://localhost:8000/api/application/${id}?by=record_id&stff=record_id`)
            .then(response => response.json())
            .then(data => {
                setApplicant(data);
            })
            .catch(() => setApplicant({none: 0}))
        }
    }, [id]);

    function statusBadge(status) {
        let type = [];
    
        switch (status) {
            case 'accepted':
                type = ['Accepted', 'green'];
                break;
            case 'denied':
                type = ['Denied', 'orange'];
                break;
            case 'evaluated':
                type = ['Evaluated', 'yellow'];
                break;
            case 'approved':
                type = ['Approved', 'purple'];
                break;
            case 'declined':
                type = ['Declined', 'red'];
                break;
            default:
                type = ['Pending', 'blue'];
        }

        return (<CustomBadge text={type[0]} color={type[1]} />);
    }

    return (
        <section className="bg-gray-100 py-8 antialiased dark:bg-gray-800 md:py-16">
            <form action="#" className="mx-auto max-w-screen-xl px-2 2xl:px-0">
                <div className="lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <div className="w-1/2">
                                <label htmlFor='applicant-search' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Find Applicant</label>
                                <SearchInput name="findApp" id="applicant-search" value={id} change={setId} placeholder="Search record ID here...">
                                    <Search />
                                </SearchInput>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Details</h2>
                            {Object.keys(applicant).length === 0 ? (
                                <EmptySearch label="No data to show" context="Use the search bar to find applicants" />
                            ) : (Object.keys(applicant).length === 1 ? (
                                <div className="flex w-full py-20 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-600">
                                    <p className="text-gray-400 dark:text-gray-700 text-lg font-small">Record doesn't exist</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="flex space-x-4 items-center">
                                        <img className="h-16 w-16 rounded-lg" src={`http://localhost:8000/storage/${applicant.id_pic}`} alt="applicant avatar" />
                                        <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">{applicant.first_name} {applicant.last_name}</h2>
                                        <span>{statusBadge(applicant.apply_status)}</span>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Credit Score:</h2>
                                        <h2 className="flex items-center text-xl font-bold leading-none text-green-400 sm:text-2xl">67</h2>
                                        <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                            <SmallUpArrow />
                                            15%
                                        </span>
                                    </div>
                                    <div className="grid gap-4 sm:col-span-2 sm:grid-cols-3">
                                        <PfpLabel caption="Salary" label={`₱${parseFloat(applicant.salary).toLocaleString()}`} />
                                        <PfpLabel caption="Co-maker" label="John Doe" />
                                        <PfpLabel caption="Contact Number" label={applicant.contact_num} />
                                        <PfpLabel caption="TIN Number" label={applicant.tin} />
                                        <PfpLabel caption="SSS/GSIS Number" label={applicant.sss} />
                                        <PfpLabel caption="Email Address" label={applicant.email} />
                                    </div>

                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Products:</h2>
                                    <div className="divide-y grid sm:col-span-2 sm:grid-cols-2 divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600">
                                        {applicant.transactions.map(trans => (
                                            <LoanList key={trans.id} downpayment={trans.downpayment} color={trans.color}
                                                price={trans.motorcycle.price} units={trans.quantity} img={trans.motorcycle.file_path} name={trans.motorcycle.name} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 w-full sticky top-10 space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                        <div className="flow-root">
                            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Payment</h2>
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Status</dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">{Object.keys(applicant).length === 0 ? '- - -' : 'On time'}</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Res. Certificate number</dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">{Object.keys(applicant).length === 0 ? '- - -' : '#4859JS33'}</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Issued on</dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">- - -</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Issued at</dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">- - -</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Previous Balance</dt>
                                    <dd className="text-base font-medium text-red-500">{Object.keys(applicant).length === 0 ? '- - -' : '₱199'}</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Amount Paid</dt>
                                    <dd className="text-base font-medium text-green-500">{Object.keys(applicant).length === 0 ? '- - -' : '₱15,000'}</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Payment Method</dt>
                                    <dd className="text-base font-medium text-green-500">{Object.keys(applicant).length === 0 ? '- - -' : 'Cash'}</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Current Balance</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">{Object.keys(applicant).length === 0 ? '- - -' : '₱8,392.00'}</dd>
                                </dl>

                                <dl className="mt-5">
                                    <Button text="Add Payment" bttnType="button" onclick={() => document.getElementById('addPayment').style.display = "flex"} />
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {Object.keys(applicant).length > 0 ? (
                <AddPayment id={applicant.id} />
            ) : ''}
        </section>
    );
}