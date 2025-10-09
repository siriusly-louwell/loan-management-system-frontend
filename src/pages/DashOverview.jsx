import React, { useEffect } from "react";
import InfoCard from "../components/cards/InfoCard";
import Donut from "../components/charts/Donut";
import InvoiceTable from "../components/tables/InvoiceTable";
import Line from "../components/charts/Line";
import Bar from "../components/charts/Bar";
import { useDispatch, useSelector } from "react-redux";
import { unitAnalysis } from "../services/redux/slices/unitSlice";
import InfoCardSkeleton from "../components/loading components/InfoCardSkeleton";
import { applicationAnalysis } from "../services/redux/slices/applicationSlice";

export default function DashOverview() {
  const dispatch = useDispatch();
  const { loanResults, appsLoading } = useSelector(
    (state) => state.application
  );
  const { unitResults, unitsLoading } = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(unitAnalysis());
    dispatch(applicationAnalysis());
    const handleResize = () => {
      if (window.ApexCharts) {
        window.dispatchEvent(new Event("resize"));
      }
    };

    setTimeout(handleResize, 100);
  }, []);

  return (
    <section>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border-b border-gray-300 dark:border-gray-600 gap-4 p-5 m-5">
        {unitsLoading || appsLoading ? (
          <InfoCardSkeleton />
        ) : (
          <>
            <InfoCard
              amount={unitResults.new?.count}
              label="New units this month"
              percent={unitResults.new?.difference}
              type={unitResults.new?.increment_type}
            />
            <InfoCard
              amount={loanResults.approved?.count}
              label="Sold units this month"
              percent={loanResults.approved?.difference}
              type={loanResults.approved?.increment_type}
            />
            <InfoCard
              amount={unitResults.repo?.count}
              label="Repo units this month"
              percent={unitResults.repo?.difference}
              type={unitResults.repo?.increment_type}
            />
          </>
        )}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border-b border-gray-300 dark:border-gray-600 gap-4 p-5 m-5">
        {unitsLoading || appsLoading ? (
          <InfoCardSkeleton num={6} />
        ) : (
          <>
            <InfoCard
              amount={loanResults.total?.count}
              label="Applications this month"
              percent={loanResults.total?.difference}
              type={loanResults.total?.increment_type}
            />
            <InfoCard
              amount={loanResults.pending?.count}
              label="Pending applications this month"
              percent={loanResults.pending?.difference}
              type={loanResults.pending?.increment_type}
            />
            <InfoCard
              amount={loanResults.approved?.count}
              label="Approved applications this month"
              percent={loanResults.approved?.difference}
              type={loanResults.approved?.increment_type}
            />
            <InfoCard
              amount={loanResults.declined?.count}
              label="Declined applications this month"
              percent={loanResults.declined?.difference}
              type={loanResults.declined?.increment_type}
            />
            <InfoCard
              amount={loanResults.paid?.count}
              label="Paid loans this month"
              percent={loanResults.paid?.difference}
              type={loanResults.paid?.increment_type}
            />
          </>
        )}
      </div>
      <div className="grid justify-items-center mx-5 py-5 mb-5 grid-cols-auto md:grid-cols-3 gap-4 items-start border-b border-gray-300 dark:border-gray-600">
        <Donut
          labels={loanResults.donut?.labels || []}
          series={loanResults.donut || []}
        />
        <Line />
        <Bar />
      </div>
      <section className="px-5">
        <InvoiceTable isDashboard={true} />
      </section>
    </section>
  );
}
