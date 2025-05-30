import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoanList from "../components/LoanList";
import TrackList from "../components/TrackList";
import CustomBttn from "../components/buttons/CustomBttn";
import ProfileCard from '../components/cards/ProfileCard';
import SmallUpArrow from '../assets/icons/SmallUpArrow';
import Button from "../components/buttons/Button";

export default function LoanInfo({children}) {
    const navigate = useNavigate();
    const {state} = useLocation();
    const id = state?.id;
    const [loan, setLoan] = useState({});
    const dti = (loan.rental_exp/loan.salary) * 100;
    const ltv = (100000 / 98000) * 100;

    useEffect(() => {
        fetch(`http://localhost:8000/api/application/${id}`)
        .then(response => response.json())
        .then(data => {
            setLoan(data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        })
    }, []);

    async function handleSubmit() {
        // event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/application/'+loan.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({apply_status: 'approved'})
            });

            const result = await response.json();
            console.log('Success: ', result);
            if(!response.ok) throw new Error('Update failed');
            alert('Data updated successfully!');
        } catch(error) {
            console.error('Error: ', error);
            alert('Failed to save data.');
        }

    }

    return (
        <section class="bg-gray-200 py-8 antialiased dark:bg-gray-800 md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div class="grid grid-cols-2 gap-6 py-4 lg:grid-cols-4 xl:gap-16">
                    <ProfileCard label="Credit Score" amount={0} text={loan.income} arrow={<SmallUpArrow />} percent="10.3%" />
                    <ProfileCard label="Debt-to-Income(DTI) Ratio" amount={dti.toFixed(2)} text=" ???" arrow={<SmallUpArrow />} percent="10.3%" />
                    <ProfileCard label="Loan-to-Value(LTV) Ratio" amount={ltv.toFixed(2)} text=" ???" arrow={<SmallUpArrow />} percent="10.3%" />
                </div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the loan {loan.record_id}</h2>

                <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
                    <div class="w-full bg-gray-100 dark:bg-gray-700 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600 lg:max-w-xl xl:max-w-2xl">
                        <LoanList id="BJ8364850" price="$1,499" units="1" name="PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24' Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, macOS Sonoma, Blue, Keyboard layout INT" />
                        <LoanList id="BJ8364850" price="$1,500" units="3" name="Wave 100" />
                        <LoanList id="BJ8364850" price="$1,500" units="3" name="XRM" />
                        <LoanList id="BJ8364850" price="$1,500" units="3" name="Click" />
                        <LoanList id="BJ8364850" price="$1,500" units="3" name="Kawasaki" />

                        <div class="space-y-4 bg-white p-6 dark:bg-gray-700">
                            <div class="space-y-2">
                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="font-normal text-gray-500 dark:text-gray-300">Res. Certificate number</dt>
                                    <dd class="font-medium text-gray-900 dark:text-white">#4859JS33</dd>
                                </dl>
                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="font-normal text-gray-500 dark:text-gray-300">Issued at</dt>
                                    <dd class="font-medium text-gray-900 dark:text-white">- - -</dd>
                                </dl>
                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="font-normal text-gray-500 dark:text-gray-300">Issued on</dt>
                                    <dd class="font-medium text-gray-900 dark:text-white">- - -</dd>
                                </dl>
                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="font-normal text-gray-500 dark:text-gray-300">Amount Paid</dt>
                                    <dd class="font-medium text-green-500 dark:text-green-500">$6,592.00</dd>
                                </dl>
                            </div>

                            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-600">
                                <dt class="text-lg font-bold text-gray-900 dark:text-white">Overall price</dt>
                                <dd class="text-lg font-bold text-gray-900 dark:text-white">$7,191.00</dd>
                            </dl>
                        </div>
                    </div>

                    <div class="mt-6 grow sm:mt-8 lg:mt-0">
                        <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 sm:sticky top-0 shadow-sm dark:border-gray-700 dark:bg-gray-700">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Loan history</h3>

                            <ol class="relative ms-3 border-s border-gray-200 dark:border-gray-600">
                                <TrackList label="Loan Submission" sublabel="Loan application was successful" isDone="done" />
                                <TrackList label="Approved" sublabel="The application is viable for applying a loan" isDone="current" />
                                <TrackList label="Credit Investigation" sublabel="The application is under investigation" isDone="pend" />
                                <TrackList label="Accepted" sublabel="The application has passed the investigation" isDone="pend" />
                                <TrackList label="Initial Payment" sublabel="The loan application has been successful" isDone="pend" />
                                <TrackList label="Paid!" sublabel="The loan has been fully paid" isDone="pend" />
                            </ol>

                            <div class="gap-4 grid grid-cols-1">
                                {children}
                                <Button text="View Form" bttnType="button" onclick={() => navigate('/admin/apply')} state={{id: loan.id}} />
                                {id == 100 ? (
                                    <CustomBttn text="View Evaluation" onclick={() => navigate('/ci/cireport')} className="flex items-center w-full justify-center text-teal-700 hover:text-white border border-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-teal-600 dark:border-teal-500 dark:text-teal-200 dark:hover:text-white dark:hover:bg-teal-800 dark:focus:ring-teal-900" />
                                ) : (
                                    <>
                                        <CustomBttn text="Approve Application" onclick={handleSubmit} className="flex items-center w-full justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:border-blue-500 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-800 dark:focus:ring-blue-900" />
                                        <CustomBttn text="Deny Application" className="flex items-center w-full justify-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:border-red-500 dark:text-red-200 dark:hover:text-white dark:hover:bg-red-800 dark:focus:ring-red-900" />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
    );
}