import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentRowSkeleton from "../loading components/PaymentRowSkeleton";
import { fetchCredits } from "../../services/redux/slices/creditSlice";
import CreditsRow from "../tables/CreditsRow";

export default function CreditHistory() {
  const dispatch = useDispatch();
  const { credits, creditsLoading } = useSelector((state) => state.credit);

  useEffect(() => {
    dispatch(fetchCredits({ mode: "page" }));
  }, []);

  return (
    <section className="w-full h-full py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          Credit History
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {creditsLoading ? (
            <PaymentRowSkeleton num={5} />
          ) : (
            credits.map((credit, i) => (
              <CreditsRow
                key={i}
                data={{
                  date: credit.due_date,
                  id: credit.application.record_id,
                  name: credit.user.first_name + " " + credit.user.last_name,
                  amount: credit.amount,
                  status: credit.status,
                  paid_date: credit.paid_date,
                }}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
