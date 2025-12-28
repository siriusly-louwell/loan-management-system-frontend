import React, { useEffect } from "react";
import RMCI from "../assets/images/RMCI.png";
import { filterLoanSwitch } from "../utils/exportHelper";
import { LoanEntity } from "../services/entities/Loan";
import { useSelector } from "react-redux";

const LoansPrint = React.forwardRef(
  ({ loans = [], title = "Loans Report", filterType = "all" }, ref) => {
    // const unitLoaned = useSelector(LoanEntity);
    const dateString = new Date().toISOString().slice(0, 10);
    const filteredLoans = filterLoanSwitch(filterType, loans);

    const totalLengthOfLoans = filteredLoans.length;
    const pendingCount = filteredLoans.filter(
      (l) => l.apply_status === "pending"
    ).length;
    const deniedCount = filteredLoans.filter(
      (l) => l.apply_status === "denied"
    ).length;
    const acceptedCount = filteredLoans.filter(
      (l) => l.apply_status === "accepted"
    ).length;
    const evaluatedCount = filteredLoans.filter(
      (l) => l.apply_status === "evaluated"
    ).length;
    const approvedCount = filteredLoans.filter(
      (l) => l.apply_status === "approved"
    ).length;
    const incompleteCount = filteredLoans.filter(
      (l) => l.apply_status === "incomplete"
    ).length;

    return (
      <div ref={ref} className="p-4 bg-white w-full text-black">
        <div className="mb-5 pb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-rose-500">
          <img src={RMCI} className="h-8 rmci" alt="Rhean Motor Logo" />
          <div className="mt-3 sm:mt-0">
            <h3 className="text-lg font-bold">
              {title} ({filterType})
            </h3>
            <p className="text-sm">Date: {dateString}</p>
            <p className="text-xs mt-1">Total Loans: {filteredLoans.length}</p>
          </div>
        </div>

        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Record ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Date Filed</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan, index) => (
              <tr key={index}>
                <td className="border p-2">{loan.record_id}</td>
                <td className="border p-2">{loan.fullName}</td>
                <td className="border p-2">{loan?.status?.text}</td>
                <td className="border p-2">{loan.applied_at}</td>
              </tr>
            ))}

            <tr>
              <td>Total Applications: {totalLengthOfLoans}</td>
            </tr>
            <tr>
              <td>
                <strong>Pending:</strong> {pendingCount || "0"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Denied:</strong> {deniedCount || "0"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Accepted:</strong> {acceptedCount || "0"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Evaluated:</strong> {evaluatedCount || "0"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Approved:</strong> {approvedCount || "0"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Incomplete</strong> {incompleteCount || "0"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
);

export default LoansPrint;
