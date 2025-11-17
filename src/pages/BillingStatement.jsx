import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "../services/redux/slices/paymentSlice";
import { PaymentEntities } from "../services/entities/Payment";
import { LoanEntity } from "../services/entities/Loan";
import { UserEntity } from "../services/entities/User";

export default function BillingStatement() {
  const dispatch = useDispatch();
  const payments = useSelector(PaymentEntities);
  const loan = useSelector(LoanEntity);
  const user = useSelector(UserEntity);
  const { paymentsLoading } = useSelector((s) => s.payment);

  // Fetch customer payments (reuses repository filter param 'customer')
  useEffect(() => {
    if (user?.id) dispatch(fetchPayments({ customer: user.id }));
  }, [user?.id, dispatch]);

  // Derived totals
  const totals = useMemo(() => {
    const totalPaid = payments.reduce(
      (sum, p) => sum + parseFloat(p.amount_paid || 0),
      0
    );
    const initialLoanAmount = loan.transactions?.length
      ? parseFloat(loan.transactions[0].motorcycle.price) -
        parseFloat(loan.transactions[0].downpayment || 0)
      : 0;
    const lastBalance = payments.length
      ? parseFloat(payments[payments.length - 1].balance || 0)
      : initialLoanAmount;
    return { totalPaid, initialLoanAmount, lastBalance };
  }, [payments, loan.transactions]);

  function currency(num) {
    return `₱${parseFloat(num || 0).toLocaleString()}`;
  }

  function handlePrint() {
    window.print();
  }

  return (
    <section className="w-full h-full py-10">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 border border-gray-500 rounded-xl shadow-lg px-6 py-10 print:shadow-none print:bg-white">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Billing Statement
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Customer: {loan.fullName || user.fullName || "N/A"}
            </p>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Record ID: {loan.record_id || "—"}
            </p>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Date Issued: {loan.dateIssued || "—"}
            </p>
          </div>
          <div className="space-y-2 text-right">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 active:scale-95"
            >
              <span>Print / Save PDF</span>
            </button>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              (Use browser print to export)
            </div>
          </div>
        </header>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <SummaryCard
            label="Original Loan"
            value={currency(totals.initialLoanAmount)}
          />
          <SummaryCard label="Total Paid" value={currency(totals.totalPaid)} />
          <SummaryCard
            label="Outstanding Balance"
            value={currency(totals.lastBalance)}
            highlight
          />
        </div>

        {/* Payment schedule header */}
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
          Payment History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <Th>Date</Th>
                <Th>Cert #</Th>
                <Th>Status</Th>
                <Th>Amount Paid</Th>
                <Th>Balance After</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paymentsLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Loading payments...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No payments recorded.
                  </td>
                </tr>
              ) : (
                payments.map((p) => {
                  const [statusText, statusColor] = p.payStatus;
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Td>{p.date}</Td>
                      <Td>{p.cert_num}</Td>
                      <Td>
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-semibold bg-${statusColor}-100 text-${statusColor}-700`}
                        >
                          {statusText}
                        </span>
                      </Td>
                      <Td>{p.amount}</Td>
                      <Td>{p.currentBalance}</Td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Loan metadata */}
        <div className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <Meta label="Unit Price" value={loan.price || "—"} />
          <Meta label="Downpayment" value={loan.downpayment || "—"} />
          <Meta label="Initial Balance" value={loan.initialBalance || "—"} />
          <Meta label="Computed Monthly EMI" value={currency(loan.emi)} />
        </div>
        <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">
          This statement is system generated and valid without signature.
        </p>
      </div>
    </section>
  );
}

function SummaryCard({ label, value, highlight = false }) {
  return (
    <div
      className={`rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-700 shadow-sm ${
        highlight ? "ring-2 ring-rose-400 dark:ring-rose-500" : ""
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-lg font-semibold text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 dark:text-white">{value}</span>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-2 text-left font-medium text-xs uppercase tracking-wide">
      {children}
    </th>
  );
}

function Td({ children }) {
  return <td className="px-4 py-2 whitespace-nowrap">{children}</td>;
}
