import React, { useEffect } from "react";
import InfoCard from "../components/cards/InfoCard";
import UpArrow from "../assets/icons/UpArrow";
import DownArrow from "../assets/icons/DownArrown";
import Donut from "../components/charts/Donut";
import InvoiceTable from "../components/tables/InvoiceTable";
import LineTwo from "../components/charts/LineTwo";
import BarTwo from "../components/charts/BarTwo";
import { useDispatch, useSelector } from "react-redux";
import { unitAnalysis } from "../services/redux/slices/unitSlice";
import InfoCardSkeleton from "../components/loading components/InfoCardSkeleton";

export default function DashOverview() {
  const dispatch = useDispatch();
  const { results, resultLoading } = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(unitAnalysis());
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
        {resultLoading ? (
          <InfoCardSkeleton />
        ) : (
          <>
            <InfoCard
              amount={results.new?.count}
              label="New units this month"
              percent={results.new?.difference}
              arrow={results.total?.increment_type}
            />
            <InfoCard
              amount="5,355"
              label="Sold units this month"
              percent="32.9%"
              arrow={<UpArrow />}
            />
            <InfoCard
              amount={results.repo?.count}
              label="Repo units this month"
              percent={results.repo?.difference}
              arrow={<DownArrow />}
            />
          </>
        )}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border-b border-gray-300 dark:border-gray-600 gap-4 p-5 m-5">
        {resultLoading ? (
          <InfoCardSkeleton num={6} />
        ) : (
          <>
            <InfoCard
              amount="5,355"
              label="Applications this month"
              percent="32.9%"
              arrow={<UpArrow />}
            />
            <InfoCard
              amount="385"
              label="Pending applications this month"
              percent="-3.7%"
              arrow={<DownArrow />}
            />
            <InfoCard
              amount="385"
              label="Approved applications this month"
              percent="-3.7%"
              arrow={<DownArrow />}
            />
            <InfoCard
              amount="385"
              label="Declined applications this month"
              percent="-3.7%"
              arrow={<DownArrow />}
            />
            <InfoCard
              amount="385"
              label="Paid loans this month"
              percent="-3.7%"
              arrow={<DownArrow />}
            />
          </>
        )}
      </div>
      <div className="grid justify-items-center mx-5 py-5 mb-5 grid-cols-auto md:grid-cols-3 gap-4 items-start border-b border-gray-300 dark:border-gray-600">
        <Donut />
        <LineTwo />
        <BarTwo />
      </div>
      <section className="px-5">
        <InvoiceTable isDashboard={true} />
      </section>
    </section>
  );
}
