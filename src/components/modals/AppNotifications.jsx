import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "../../services/redux/slices/paymentSlice";
import InvoiceRow from "../tables/InvoiceRow";
import { PaymentEntities } from "../../services/entities/Payment";
import PaymentRowSkeleton from "../loading components/PaymentRowSkeleton";

export default function AppNotifications() {
  const dispatch = useDispatch();
  const payments = useSelector(PaymentEntities);
  const { paymentsLoading } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(fetchPayments());
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          Payment History
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {paymentsLoading ? (
            <PaymentRowSkeleton num={5} />
          ) : (
            payments.map((pay, i) => (
              <InvoiceRow
                key={i}
                data={{
                  date: pay.date,
                  id: pay.application.record_id,
                  amount: pay.amount,
                  cert_num: pay.cert_num,
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
