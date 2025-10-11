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
import { paymentAnalysis } from "../services/redux/slices/paymentSlice";
import ChartCard from "../components/cards/ChartCard";
import {
  AreaChartSkeleton,
  BarChartSkeleton,
  DonutChartSkeleton,
} from "../components/loading components/ChartSkeletons";
import { MONOCHROME_COLORS } from "../constants/colors";

export default function DashOverview() {
  const dispatch = useDispatch();
  const { loanResults, appsLoading } = useSelector(
    (state) => state.application
  );
  const { paymentResults, paymentsLoading } = useSelector(
    (state) => state.payment
  );
  const { unitResults, unitsLoading } = useSelector((state) => state.unit);
  const loading = unitsLoading || appsLoading || paymentsLoading;
  const barSeries = paymentResults.chart?.series.map((config) => ({
    name: config.name,
    data: config.data,
  }));

  useEffect(() => {
    dispatch(unitAnalysis());
    dispatch(applicationAnalysis({ analysis: true }));
    dispatch(paymentAnalysis({ analysis: true }));

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
        {loading ? (
          <InfoCardSkeleton />
        ) : (
          <>
            <InfoCard
              amount={unitResults.new?.count}
              label="New units this month"
              diff={unitResults.new?.difference}
              type={unitResults.new?.increment_type}
            />
            <InfoCard
              amount={loanResults.approved?.count}
              label="Sold units this month"
              diff={loanResults.approved?.difference}
              type={loanResults.approved?.increment_type}
            />
            <InfoCard
              amount={unitResults.repo?.count}
              label="Repo units this month"
              diff={unitResults.repo?.difference}
              type={unitResults.repo?.increment_type}
            />
          </>
        )}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border-b border-gray-300 dark:border-gray-600 gap-4 p-5 m-5">
        {loading ? (
          <InfoCardSkeleton num={6} />
        ) : (
          <>
            <InfoCard
              amount={loanResults.total?.count}
              label="Applications this month"
              diff={loanResults.total?.difference}
              type={loanResults.total?.increment_type}
            />
            <InfoCard
              amount={loanResults.pending?.count}
              label="Pending applications this month"
              diff={loanResults.pending?.difference}
              type={loanResults.pending?.increment_type}
            />
            <InfoCard
              amount={loanResults.approved?.count}
              label="Approved applications this month"
              diff={loanResults.approved?.difference}
              type={loanResults.approved?.increment_type}
            />
            <InfoCard
              amount={loanResults.declined?.count}
              label="Declined applications this month"
              diff={loanResults.declined?.difference}
              type={loanResults.declined?.increment_type}
            />
            <InfoCard
              amount={loanResults.paid?.count}
              label="Paid loans this month"
              diff={loanResults.paid?.difference}
              type={loanResults.paid?.increment_type}
            />
          </>
        )}
      </div>
      <div className="grid justify-items-center mx-5 py-5 mb-5 grid-cols-auto md:grid-cols-3 gap-4 items-start border-b border-gray-300 dark:border-gray-600">
        <ChartCard label="Loan Applications">
          {loading ? (
            <DonutChartSkeleton />
          ) : (
            <Donut
              labels={loanResults.donut?.labels || []}
              series={loanResults.donut?.series || []}
            />
          )}
        </ChartCard>

        <ChartCard label="Loan Payments" count={paymentResults.total?.count}>
          {loading ? (
            <BarChartSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-2 py-3">
                <dl>
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                    Punctual
                  </dt>
                  <dd className="leading-none text-xl font-bold text-blue-500 dark:text-blue-400">
                    {paymentResults.on_time?.count}
                  </dd>
                </dl>
                <dl>
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                    Late
                  </dt>
                  <dd className="leading-none text-xl font-bold text-rose-600 dark:text-rose-500">
                    {paymentResults.late?.count}
                  </dd>
                </dl>
              </div>
              <Bar
                colors={MONOCHROME_COLORS.filter((_, i) => i === 3 || i === 4)}
                series={barSeries || []}
                categories={paymentResults.chart?.categories || []}
              />
            </>
          )}
        </ChartCard>

        <ChartCard label="Total Loans" count={loanResults.total?.count}>
          {loading ? (
            <AreaChartSkeleton />
          ) : (
            <Line
              data={loanResults.line?.series || []}
              categories={loanResults.line?.categories || []}
            />
          )}
        </ChartCard>
      </div>

      <section className="px-5">
        <InvoiceTable isDashboard={true} />
      </section>
    </section>
  );
}
