import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPayments } from "../services/redux/slices/paymentSlice";
import PaymentRowSkeleton from "../components/loading components/PaymentRowSkeleton";
import InvoiceRow from "../components/tables/InvoiceRow";
import { ArrowLeft } from "lucide-react";
import { saveLoan } from "../services/redux/slices/applicationSlice";

import {
    savePayment,
} from "../services/redux/slices/paymentSlice";

const CustomerPaymentHIstoryDetails = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const payments = useSelector((state) => state.payment.payments);
    const { paymentsLoading } = useSelector((state) => state.payment);


    useEffect(() => {
        const user_payments = fetchUserPayments({ userId });
        dispatch(user_payments);
    }, [userId, dispatch]);

    const navigate = useNavigate()

    return (
        <section className="w-full h-full py-10">
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg px-4 py-10">
                <div className="flex items-center mb-6 gap-2">
                    <ArrowLeft className="text-white size-7 cursor-pointer" onClick={() => navigate(-1)} />
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white ">
                        Payment History for User {userId}
                    </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paymentsLoading ? (
                        <PaymentRowSkeleton num={5} />
                    ) : !payments || !payments.data || payments.data.length === 0 ? (
                        <div className="empty-search">
                            <h2>No payments found</h2>
                            <p>This user has no payment history.</p>
                        </div>
                    ) : (
                        payments.data.map((pay, i) => (
                            <InvoiceRow
                                key={i}
                                data={{
                                    date: pay.created_at,
                                    id: pay.application?.record_id,
                                    amount: pay.amount_paid,
                                    balance: pay.balance,
                                    status: [pay.status, pay.status === 'on_time' ? 'green' : 'red'],
                                    cert_num: pay.cert_num,
                                }}
                                click={() => {
                                    dispatch(saveLoan(pay.application_form_id));
                                    dispatch(savePayment(pay.id));
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default CustomerPaymentHIstoryDetails;


