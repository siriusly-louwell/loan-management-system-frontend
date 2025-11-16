import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPayments } from "../../services/redux/slices/paymentSlice";  
import PaymentRowSkeleton from "../loading components/PaymentRowSkeleton";  
import InvoiceRow from "../tables/InvoiceRow";  

const UserDetails = () => {
    const { userId } = useParams(); 
    const dispatch = useDispatch();
    const payments = useSelector((state) => state.payment.payments); 
    const { paymentsLoading } = useSelector((state) => state.payment);

    useEffect(() => {
        dispatch(fetchUserPayments({ userId }));
    }, [userId, dispatch]);

    return (
        <section className="w-full h-full py-10">
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg px-4 py-10">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Payment History for User {userId}
                </h2>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paymentsLoading ? (
                        <PaymentRowSkeleton num={5} />
                    ) : payments.length === 0 ? (
                        <div className="empty-search">
                            <h2>No payments found</h2>
                            <p>This user has no payment history.</p>
                        </div>
                    ) : (
                        payments.map((pay, i) => (
                            <InvoiceRow
                                key={i}
                                data={{
                                    date: pay.date,
                                    id: pay.application.record_id,
                                    amount: pay.amount,
                                    balance: pay.currentBalance,
                                    status: pay.payStatus,
                                    cert_num: pay.cert_num,
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserDetails;
