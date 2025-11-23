import React from "react";
import RMCI from "../assets/images/RMCI.png";

const LoansPrint = React.forwardRef(
  ({ loans = [], title = "Loans Report", filterType = "all" }, ref) => {
    const dateString = new Date().toISOString().slice(0, 10);

    const today = new Date();
    const startOfWeek = new Date(today);
    // Monday as start of week
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const filteredLoans = loans.filter((loan) => {
      if (!loan.applied_at) return false;
      const d = new Date(loan.applied_at);
      if (isNaN(d.getTime())) return false;
      switch (filterType) {
        case "daily":
          return (
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
          );
        case "weekly":
          return d >= startOfWeek && d <= endOfWeek;
        case "monthly":
          return (
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth()
          );
        case "yearly":
          return d.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    });

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
              <th className="border p-2 text-left">Applied At</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan.id}>
                <td className="border p-2">{loan.record_id}</td>
                <td className="border p-2">{loan.fullName}</td>
                <td className="border p-2">{loan.applied_at}</td>
                <td className="border p-2">{loan?.status?.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

export default LoansPrint;
