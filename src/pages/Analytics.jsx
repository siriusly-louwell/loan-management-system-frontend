import { useDispatch, useSelector } from "react-redux";
import ChartContainer from "../components/cards/ChartContainer";
import Bar from "../components/charts/Bar";
import { CHART_COLORS } from "../constants/colors";
import { useEffect } from "react";
import { applicationAnalysis } from "../services/redux/slices/applicationSlice";
import ProgressBar from "../components/charts/ProgressBar";
import ChartCardWide from "../components/cards/ChartCardWide";

export default function Analytics() {
  const dispatch = useDispatch();
  const { loanResults, appsLoading } = useSelector(
    (state) => state.application
  );
  const barSeries = loanResults.barChart?.series.map((config) => ({
    name: config.name,
    data: config.data,
  }));

  useEffect(() => {
    dispatch(applicationAnalysis({ analysis: true }));
    const handleResize = () => {
      if (window.ApexCharts) {
        window.dispatchEvent(new Event("resize"));
      }
    };

    setTimeout(handleResize, 100);
  }, []);

  return (
    <div className="px-5 py-3 w-full">
      <ChartCardWide title="Storage" count="37.03 GB" subtitle="of 64 GB">
        {appsLoading ? (
          <div className="bg-gray-600 dark:bg-gray-500 h-5 w-full mt-4 mb-6 rounded-full animate-pulse" />
        ) : (
          <ProgressBar />
        )}
      </ChartCardWide>
      <ChartContainer title="Loan Statuses">
        {!appsLoading && (
          <Bar
            isHorizontal={false}
            colors={CHART_COLORS}
            series={barSeries || []}
            categories={loanResults.barChart?.categories}
          />
        )}
      </ChartContainer>
    </div>
  );
}
