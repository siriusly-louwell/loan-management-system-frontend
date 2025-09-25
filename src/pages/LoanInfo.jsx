import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoanList from "../components/LoanList";
import TrackList from "../components/TrackList";
import CustomBttn from "../components/buttons/CustomBttn";
import ProfileCard from '../components/cards/ProfileCard';
import SmallUpArrow from '../assets/icons/SmallUpArrow';
import Button from "../components/buttons/Button";
import BasicBttn from "../components/buttons/BasicBttn";
import SmallSpin from "../components/loading components/SmallSpin";
import AssignCI from "../components/AssignCI";
import DeclineApplicant from "../components/DeclineApplicant";
import Alert from "../components/Alert";
import Spinner from "../components/loading components/Spinner";
import ProductCard from "../components/cards/ProductCard";
import CardSkeleton from "../components/loading components/CardSkeleton";
import Eligibity from "../components/modals/Eligibility";
import EmptySearch from "../components/empty states/EmptySearch";

export default function LoanInfo({children, url}) {
    const navigate = useNavigate();
    const location = useLocation();
    const {state} = useLocation();
    const id = state?.id;
    const [loan, setLoan] = useState({});
    const [loanLoad, setLoanLoad] = useState(true);
    const [totals, setTotal] = useState({});
    const [alert, setAlert] = useState({});
    const [recommend, setRecommend] = useState([]);
    const [recoLoad, setRecoLoad] = useState(true);

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
        fetch('http://127.0.0.1:8000/api/motorcycle')
        .then(response => response.json())
        .then(data => {
                setRecommend(data);
                setRecoLoad(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }, []);

    useEffect(() => {
        if(!loanLoad) {
            const down = loan.transactions.reduce((sum, obj) => sum + Number(obj.downpayment), 0);
            const price = loan.transactions.reduce((sum, obj) => sum + Number(obj.motorcycle.price), 0);
            const ndi = parseFloat(loan.rate) - (parseFloat(loan.rent) + parseFloat(loan.amortization) + parseFloat(loan.bills) + parseFloat(loan.living_exp) + parseFloat(loan.education_exp) + parseFloat(loan.transportation));

            
            setTotal({price: down, downpayment: price, ndi: ndi});
        }
    }, [loan, loanLoad, recommend]);

    async function approveApplicant() {
        document.getElementById('approve_app').style.display = "flex";
        document.getElementById('approveApp').style.display = "none";

        try {
            const response = await fetch('http://127.0.0.1:8000/api/application/'+loan.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({apply_status: alert.type})
            });

            const result = await response.json();
            console.log('Success: ', result);
            if(!response.ok) throw new Error('Update failed');
            setAlert({
                text: `Applicant has been ${alert.type}!`,
                icon: "done"
            });
            document.getElementById('approve-app').style.display = 'block';
            document.getElementById('approve_app').style.display = "none";
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Unexpected Error!",
                icon: "warn"
            });
            document.getElementById('approve-app').style.display = 'block';
            document.getElementById('approve_app').style.display = "none";
        }
    }

    function trackCond(stage) {
        switch(stage) {
            case 'accept':
                if(loan.apply_status === 'denied')return 'deny';
                else if(loan.apply_status === 'accepted' || loan.apply_status === 'evaluated' || loan.apply_status === 'approved' || loan.apply_status === 'declined' || loan.apply_status === 'payment')return 'done';
                else return loan.apply_status === 'pending' ? 'current' : 'pend';
            case 'investigation':
                if(loan.apply_status === 'evaluated' || loan.apply_status === 'approved' || loan.apply_status === 'declined' || loan.apply_status === 'payment')return 'done';
                else return loan.apply_status === 'accepted' ? 'current' : 'pend';
            case 'approve':
                if(loan.apply_status === 'declined')return 'deny';
                else if(loan.apply_status === 'approved' || loan.apply_status === 'payment')return 'done';
                else return loan.apply_status === 'evaluated' ? 'current' : 'pend';
            case 'payment':
                if(loan.apply_status === 'payment')return 'done';
                else return loan.apply_status === 'approved' ? 'current' : 'pend';
            default:
        }
    }

    function statusLabel(type, num) {
        let turn = [];

        if(type === 'deny') {
            turn = loan.apply_status === 'denied' ? ['Denied', 'The application is not viable to apply for a loan']
                : ['Accepted', 'The application is viable to apply for a loan'];
        } else {
            turn = loan.apply_status === 'declined' ? ['Declined', 'The application did not passed the investigation']
                : ['Approved', 'The application has passed the investigation'];
        }

        return turn[num];
    }

    function affordableLoan(motor) {
        const tenure = motor.tenure * 12;
        const loanAmount = parseFloat(motor.price || 0) - parseFloat(motor.downpayment || 0);
        const monthlyRate = motor.interest / 12 / 100;
        const emi = monthlyRate === 0 ? loanAmount / tenure
            : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
        const bool = (Math.round(emi * 100) / 100) / totals.ndi;

        return bool <= 0.3 ? true : false;
    }

    function displayRecommend() {
        if(recoLoad) return (<>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </>);

        if(totals.ndi > 0) {
            return (
                <div className="bg-gray-100 px-3 py-1 mx-5 mt-3 rounded-lg">
                    <h2 className="mt-5 pl-5 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Recommendations</h2>
                    <section className="my-4 px-5 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4 xl:grid-cols-4">
                        {recommend.map(motor => {
                            if(affordableLoan(motor)) return (<ProductCard key={motor.id} unit={motor} url="/unit" />)
                        })}
                    </section>
                </div>
            )
        } else return (
            <section className="bg-gray-100 px-3 py-1 mx-5 mt-3 rounded-lg">
                <h2 className="mt-5 pl-5 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">No Recommendations</h2>
                <EmptySearch label="No affordable units" context="Applicant is not elligible to take any loan" />
            </section>
        )
    }
    
    return (
        <section className="bg-gray-200 py-8 antialiased dark:bg-gray-800 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="flex justify-between w-full">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the loan {loan.record_id}</h2>
                    {/* <CustomBttn text="Payment History" onclick={() => navigate(location.pathname === '/admin/loan' ? '/admin/history' : '/staff/loan_his', {state: {id: loan.id}})} classname="flex items-center justify-center bg-blue-200 text-blue-600 hover:text-white border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:border-blue-500 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900" /> */}
                </div>

                <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
                    {loanLoad ? (
                        <div className="w-full h-fit bg-gray-100 dark:bg-gray-700 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600 lg:max-w-xl xl:max-w-2xl">
                            <LoanList load={loanLoad} />
                            <LoanList load={loanLoad} />
                            <LoanList load={loanLoad} />
                            <div className="space-y-4 bg-white p-6 dark:bg-gray-700">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-300">Res. Certificate number</dt>
                                        <SmallSpin size={20} />
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-300">Issued at</dt>
                                        <SmallSpin size={20} />
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-300">Issued on</dt>
                                        <SmallSpin size={20} />
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-300">Amount Paid (Total Downpayment)</dt>
                                        <SmallSpin size={20} />
                                    </dl>
                                </div>
    
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-600">
                                    <dt className="text-lg font-bold text-gray-900 dark:text-white">Overall price</dt>
                                    <dd className="w-10 h-5 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse"></dd>
                                </dl>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-fit bg-gray-100 dark:bg-gray-700 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600 lg:max-w-xl xl:max-w-2xl">
                            {loan.transactions.map(trans => (
                                <LoanList key={trans.id} downpayment={trans.downpayment} color={trans.color}
                                price={trans.motorcycle.price} units={trans.quantity} img={trans.motorcycle.file_path} name={trans.motorcycle.name} />
                            ))}
    
                            <div className="space-y-4 bg-white p-6 dark:bg-gray-700">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-300">Res. Certificate number</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">- - -</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-300">Issued at</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">- - -</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-300">Issued on</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">- - -</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-300">Amount Paid (Total Downpayment)</dt>
                                        <dd className="font-medium text-green-500 dark:text-green-500">₱{parseFloat(totals.downpayment).toLocaleString()}</dd>
                                    </dl>
                                </div>
    
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-600">
                                    <dt className="text-lg font-bold text-gray-900 dark:text-white">Overall price</dt>
                                    <dd className="text-lg font-bold text-gray-900 dark:text-white">₱{parseFloat(totals.price).toLocaleString()}</dd>
                                </dl>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 grow sm:mt-8 lg:mt-0">
                        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 sm:sticky top-0 shadow-sm dark:border-gray-700 dark:bg-gray-700">
                            <div className="flex justify-between space-x-5">
                                <h3 className="text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">Loan history</h3>
                                {/* <CustomBttn text="Eligibity Results" onclick={() => document.getElementById('eligibleModal').style.display = 'flex'} classname="flex items-center justify-center text-yellow-500 hover:text-white border border-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-yellow-600 dark:border-yellow-500 dark:text-yellow-200 dark:hover:text-white dark:hover:bg-yellow-600 dark:focus:ring-yellow-900" /> */}
                            </div>

                            <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-600">
                                <TrackList label="Loan Submission" sublabel="Loan application was successful" isDone="done" />
                                <TrackList label={statusLabel('deny', 0)} sublabel={statusLabel('deny', 1)} isDone={trackCond('accept')} />
                                <TrackList label="Credit Investigation" sublabel="Applicant has been interviewed by the assigned Credit Investigator" isDone={trackCond('investigation')} />
                                <TrackList label={statusLabel('decline', 0)} sublabel={statusLabel('decline', 1)}isDone={trackCond('approve')} />
                                <TrackList label="Initial Payment" sublabel="The loan application has been successful" isDone="pend" />
                                <TrackList label="Paid!" sublabel="The loan has been fully paid" isDone="pend" />
                            </ol>

                            <div className="gap-4 grid grid-cols-1">
                                {children}
                                <Button text="View Results" bttnType="button" onclick={() => document.getElementById('eligibleModal').style.display = 'flex'} />
                                {loan.apply_status === 'evaluated' || loan.apply_status === 'approved' || loan.apply_status === 'declined' ? (
                                    <>
                                        <Button text="View Report" bttnType="button" onclick={() => navigate('/ci/review', {
                                                state: {...loan}
                                            })} />
                                        {location.pathname === '/admin/loan' ? (
                                            <>
                                                <CustomBttn text="Approve Application" onclick={() => {
                                                    document.getElementById('approveApp').style.display = 'block';
                                                    setAlert({
                                                        text: 'Do you want to approve this applicant?',
                                                        type: 'approved'
                                                    });
                                                }} classname="flex items-center w-full justify-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-green-600 dark:border-green-500 dark:text-green-200 dark:hover:text-white dark:hover:bg-green-800 dark:focus:ring-green-900" />
                                                <CustomBttn text="Decline Application" onclick={() => {
                                                    document.getElementById('approveApp').style.display = 'block';
                                                    setAlert({
                                                        text: 'Do you want to decline this applicant?',
                                                        type: 'declined'
                                                    });
                                                }} classname="flex items-center w-full justify-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:border-red-500 dark:text-red-200 dark:hover:text-white dark:hover:bg-red-800 dark:focus:ring-red-900" />
                                            </>
                                        ) : ''}
                                    </>
                                ) : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loan.apply_status === 'declined' || loan.apply_status === 'denied' ? displayRecommend() : ''}
                {/* <>
                    <h2 className="mt-5 pl-5 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Recommendations</h2>
                    <section className="my-4 px-5 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                        {recoLoad ? (<CardSkeleton />) : (<ProductCard key={recommend.id} unit={recommend} url="/unit" />)}
                    </section>
                </> */}
            <Eligibity loan={loan} setAlert={setAlert} url={url} />
            <DeclineApplicant id={loan.id} record={loan.record_id} name={`${loan.first_name} ${loan.last_name}`} />
            <AssignCI id={loan.id} record={loan.record_id} name={`${loan.first_name} ${loan.last_name}`} />
            <Alert id="approveApp" text={alert.text} icon="warn">
                <CustomBttn text="Yes" onclick={approveApplicant} classname="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" />
                <BasicBttn text="No, cancel" onclick={() => document.getElementById('approveApp').style.display = 'none'} />
            </Alert>
            <Spinner id="approve_app" />
            <Alert id="approve-app" text={alert.text} icon={alert.icon}>
                {alert.icon === "done" ? (
                    <Button text="Ok" type="button" onclick={() => navigate('/admin/accounts')} />
                ) : (
                    <Button text="Ok" type="button" onclick={() => document.getElementById('approve-app').style.display = "none"} />
                )}
            </Alert>
        </section>
    );
}