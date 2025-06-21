import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoanList from "../components/LoanList";
import TrackList from "../components/TrackList";
import CustomBttn from "../components/buttons/CustomBttn";
import ProfileCard from '../components/cards/ProfileCard';
import SmallUpArrow from '../assets/icons/SmallUpArrow';
import Button from "../components/buttons/Button";
import SmallSpin from "../components/loading components/SmallSpin";
import AssignCI from "../components/AssignCI";
import DeclineApplicant from "../components/DeclineApplicant";

export default function LoanInfo({children}) {
    const navigate = useNavigate();
    const location = useLocation();
    const {state} = useLocation();
    const id = state?.id;
    const [loan, setLoan] = useState({});
    const [loanLoad, setLoanLoad] = useState(true);
    const [totals, setTotal] = useState({});
    const dti = (loan.rental_exp/loan.salary) * 100;
    const ltv = (100000 / 98000) * 100;

    useEffect(() => {
        fetch(`http://localhost:8000/api/application/${id}?by=id`)
        .then(response => response.json())
        .then(data => {
            setLoan(data);
            setLoanLoad(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        })
    }, [id]);

    useEffect(() => {
        if(!loanLoad) {
            const down = loan.transactions.reduce((sum, obj) => sum + Number(obj.downpayment), 0);
            const price = loan.transactions.reduce((sum, obj) => sum + Number(obj.motorcycle.price), 0);
            
            setTotal({price: down, downpayment: price});
        }
    }, [loan, loanLoad]);

    return (
        <section class="bg-gray-200 py-8 antialiased dark:bg-gray-800 md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div class="grid grid-cols-2 gap-6 py-4 lg:grid-cols-4 xl:gap-16">
                    <ProfileCard label="Debt-to-Income(DTI) Ratio" amount={dti.toFixed(2)} text=" ???" arrow={<SmallUpArrow />} percent="10.3%" />
                    <ProfileCard label="Loan-to-Value(LTV) Ratio" amount={ltv.toFixed(2)} text=" ???" arrow={<SmallUpArrow />} percent="10.3%" />
                </div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the loan {loan.record_id}</h2>

                <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
                    {loanLoad ? (
                        <div class="w-full h-fit bg-gray-100 dark:bg-gray-700 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600 lg:max-w-xl xl:max-w-2xl">
                            <LoanList load={loanLoad} />
                            <LoanList load={loanLoad} />
                            <LoanList load={loanLoad} />
                            <div class="space-y-4 bg-white p-6 dark:bg-gray-700">
                                <div class="space-y-2">
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="font-normal text-gray-500 dark:text-gray-300">Res. Certificate number</dt>
                                        <SmallSpin size={20} />
                                    </dl>
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="font-normal text-gray-500 dark:text-gray-300">Issued at</dt>
                                        <SmallSpin size={20} />
                                    </dl>
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="font-normal text-gray-500 dark:text-gray-300">Issued on</dt>
                                        <SmallSpin size={20} />
                                    </dl>
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="font-normal text-gray-500 dark:text-gray-300">Amount Paid (Total Downpayment)</dt>
                                        <SmallSpin size={20} />
                                    </dl>
                                </div>
    
                                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-600">
                                    <dt class="text-lg font-bold text-gray-900 dark:text-white">Overall price</dt>
                                    <dd class="w-10 h-5 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse"></dd>
                                </dl>
                            </div>
                        </div>
                    ) : (
                        <div class="w-full h-fit bg-gray-100 dark:bg-gray-700 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600 lg:max-w-xl xl:max-w-2xl">
                            {loan.transactions.map(trans => (
                                <LoanList key={trans.id} downpayment={trans.downpayment} color={trans.color}
                                price={trans.motorcycle.price} units={trans.quantity} img={trans.motorcycle.file_path} name={trans.motorcycle.name} />
                            ))}
    
                            <div class="space-y-4 bg-white p-6 dark:bg-gray-700">
                                <div class="space-y-2">
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="font-normal text-gray-500 dark:text-gray-300">Res. Certificate number</dt>
                                        <dd class="font-medium text-gray-900 dark:text-white">- - -</dd>
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
                                        <dt class="font-normal text-gray-500 dark:text-gray-300">Amount Paid (Total Downpayment)</dt>
                                        <dd class="font-medium text-green-500 dark:text-green-500">₱{parseFloat(totals.downpayment).toLocaleString()}</dd>
                                    </dl>
                                </div>
    
                                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-600">
                                    <dt class="text-lg font-bold text-gray-900 dark:text-white">Overall price</dt>
                                    <dd class="text-lg font-bold text-gray-900 dark:text-white">₱{parseFloat(totals.price).toLocaleString()}</dd>
                                </dl>
                            </div>
                        </div>
                    )}

                    <div class="mt-6 grow sm:mt-8 lg:mt-0">
                        <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 sm:sticky top-0 shadow-sm dark:border-gray-700 dark:bg-gray-700">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Loan history</h3>

                            <ol class="relative ms-3 border-s border-gray-200 dark:border-gray-600">
                                <TrackList label="Loan Submission" sublabel="Loan application was successful" isDone="done" />
                                <TrackList label="Approved" sublabel="The application is viable for applying a loan" isDone={loan.apply_status === 'approved' || loan.apply_status === 'evaluated' ? "done" : (loan.apply_status === 'declined' ? 'decline' : 'current')} />
                                <TrackList label="Credit Investigation" sublabel="Applicant has been interviewed by the assigned Credit Investigator" isDone={loan.apply_status === 'evaluated' ? 'done' : (loan.apply_status === 'approved' ? "current" : 'pend')} />
                                <TrackList label="Accepted" sublabel="The application has passed the investigation" isDone={loan.apply_status === 'evaluated' ? "current" : 'pend'} />
                                <TrackList label="Initial Payment" sublabel="The loan application has been successful" isDone="pend" />
                                <TrackList label="Paid!" sublabel="The loan has been fully paid" isDone="pend" />
                            </ol>

                            <div class="gap-4 grid grid-cols-1">
                                {children}
                                <Button text="View Form" bttnType="button" onclick={() => navigate('/admin/apply')} state={{id: loan.id}} />
                                {loan.apply_status === 'evaluated' ? (
                                    <CustomBttn text="View Evaluation" onclick={() => navigate('/ci/review', {
                                        state: {
                                            id: loan.id,
                                            name: `${loan.first_name} ${loan.last_name}`
                                        }
                                    })} classname="flex items-center w-full justify-center text-yellow-500 hover:text-white border border-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-yellow-600 dark:border-yellow-500 dark:text-yellow-200 dark:hover:text-white dark:hover:bg-yellow-600 dark:focus:ring-yellow-900" />
                                ) : location.pathname !== '/application' && location.pathname !== '/ci/ciloan' ? (
                                        <>
                                            <CustomBttn text="Approve Application" onclick={() => document.getElementById('addCI').style.display = 'flex'} classname="flex items-center w-full justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:border-blue-500 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-800 dark:focus:ring-blue-900" />
                                            <CustomBttn text="Deny Application" onclick={() => document.getElementById('declineApp').style.display = 'flex'} classname="flex items-center w-full justify-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:border-red-500 dark:text-red-200 dark:hover:text-white dark:hover:bg-red-800 dark:focus:ring-red-900" />
                                        </>
                                ) : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeclineApplicant id={loan.id} record={loan.record_id} name={`${loan.first_name} ${loan.last_name}`} />
            <AssignCI id={loan.id} record={loan.record_id} name={`${loan.first_name} ${loan.last_name}`} />
        </section>
    );
}