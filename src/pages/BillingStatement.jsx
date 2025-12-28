import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "../services/redux/slices/paymentSlice";
import { PaymentEntities } from "../services/entities/Payment";
import { LoanEntity } from "../services/entities/Loan";
import { UserEntity } from "../services/entities/User";
import { fetchLoan } from "../services/redux/slices/applicationSlice";

export default function BillingStatement() {
  const dispatch = useDispatch();
  const payments = useSelector(PaymentEntities);
  const loan = useSelector(LoanEntity);
  const user = useSelector(UserEntity);
  const { paymentsLoading } = useSelector((s) => s.payment);

  useEffect(() => {
    if (user?.id) dispatch(fetchPayments({ customer: user.id }));
    if (payments[0]?.application?.id)
      dispatch(fetchLoan({ id: payments[0].application.id, by: "id" }));
  }, [user?.id, payments[0]?.application?.id, dispatch]);

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

  const monthlyPayments = payments.filter((p) => {
    const d = new Date(p.created_at);
    const now = new Date();

    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });

  const monthlyTotal = monthlyPayments.reduce(
    (sum, p) => sum + (Number(p.amount_paid) || 0),
    0
  );

  return (
    <section className="w-full h-full py-10 print:py-0">
      <div className="max-w-5xl mx-auto bg-white border border-gray-400 rounded-lg shadow-md p-8 print:shadow-none print:border-none print:p-0">
        <header className="mb-10 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-wide text-rose-600">
              MONTHLY BILLING STATEMENT
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Borrower: <span className="font-medium">{user.fullName}</span>
            </p>
            <p className="text-sm text-gray-600">
              Loan ID: <span className="font-medium">{loan.record_id}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="bg-rose-600 hover:bg-rose-500 text-white text-sm px-4 py-2 rounded-md shadow active:scale-95">
            Print / Save PDF
          </button>
        </header>

        <Section title="STATEMENT SUMMARY">
          <div className="grid grid-cols-3 gap-4">
            <SummaryBox
              label="Original Loan Amount"
              value={currency(totals.initialLoanAmount)}
            />
            <SummaryBox
              label="Total Payments"
              value={currency(totals.totalPaid)}
            />
            <SummaryBox
              label="Outstanding Balance"
              value={currency(totals.lastBalance)}
              highlight
            />
          </div>
        </Section>

        <Section title="CURRENT BILLING">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Field label="Reference #" value={payments?.[0]?.cert_num ?? ""} />
            <Field label="Total Amount" value={currency(loan.emi)} />

            <Field
              label="Payment Due Date"
              value={loan.due_date || "2025-11-21"}
            />
            <Field
              label="Interest"
              value={
                loan.id ? `${loan.transactions[0].motorcycle.interest}%` : ""
              }
            />

            <Field
              label="Total Amount Due"
              value={loan?.id ? currency(loan.emi) : ""}
            />
            {paymentsLoading ? (
              <Field label="Unpaid Amortization" value="Loading..." />
            ) : (
              <Field
                label="Unpaid Amortization"
                value={
                  loan?.id
                    ? currency(
                        Math.max(
                          0,
                          loan.emi +
                            (loan.transactions?.[0]?.motorcycle?.interest ??
                              0) -
                            monthlyTotal
                        )
                      )
                    : ""
                }
              />
            )}
          </div>
        </Section>

        <Section title="LATEST PAYMENT DETAILS">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300">
              <thead className="bg-rose-600 text-white text-xs uppercase">
                <tr>
                  <Th>Date</Th>
                  <Th>Reference No.</Th>
                  <Th>Month Covered</Th>
                  <Th>Amount</Th>
                  <Th>Outstanding Balance</Th>
                </tr>
              </thead>
              <tbody>
                {paymentsLoading ? (
                  <tr>
                    <td colSpan={5} className="py-5 text-center text-gray-500">
                      Loading payments...
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-5 text-center text-gray-500">
                      No payments recorded.
                    </td>
                  </tr>
                ) : (
                  payments
                    .filter((p) => {
                      const d = new Date(p.created_at);
                      const now = new Date();

                      return (
                        d.getMonth() === now.getMonth() &&
                        d.getFullYear() === now.getFullYear()
                      );
                    })
                    .map((p) => (
                      <tr
                        key={p.id}
                        className="odd:bg-gray-50 hover:bg-gray-100 border-t">
                        <Td>{p.date}</Td>
                        <Td>{p.cert_num}</Td>
                        <Td>
                          {new Date(p.created_at).toLocaleString("en-US", {
                            month: "long",
                          })}
                        </Td>
                        <Td>{currency(p.amount_paid)}</Td>
                        <Td>{currency(p.balance)}</Td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </Section>

        <p className="text-center text-xs mt-10 text-gray-500">
          This statement is system-generated and valid without signature.
        </p>
      </div>
    </section>
  );
}

function Section({ title, children }) {
  return (
    <div className="border border-gray-400 rounded-md mb-8">
      <div className="bg-rose-600 text-white px-4 py-2 text-sm font-semibold tracking-wide rounded-t-md">
        {title}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function SummaryBox({ label, value, highlight }) {
  return (
    <div
      className={`p-4 border rounded-lg bg-white ${
        highlight ? "border-rose-500 shadow" : "border-gray-300"
      }`}>
      <p className="text-xs uppercase text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  );
}

function SummaryCard({ label, value, highlight = false }) {
  return (
    <div
      className={`rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-700 shadow-sm ${
        highlight ? "ring-2 ring-rose-400 dark:ring-rose-500" : ""
      }`}>
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
