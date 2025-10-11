import { useDispatch, useSelector } from "react-redux";
import ChartContainer from "../components/cards/ChartContainer";
import Bar from "../components/charts/Bar";
import { CHART_COLORS } from "../constants/colors";
import { useEffect } from "react";
import { applicationAnalysis } from "../services/redux/slices/applicationSlice";
import ProgressBar from "../components/charts/ProgressBar";
import ChartCardWide from "../components/cards/ChartCardWide";
import { AreaChartSkeleton, VerticalBarChartSkeleton } from "../components/loading components/ChartSkeletons";
import Line from "../components/charts/Line";

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
      <ChartCardWide
        title="Status Count"
        count={loanResults.progress?.series[4]}
        subtitle="Approved applications">
        {appsLoading ? (
          <div className="bg-gray-200 dark:bg-gray-500 h-5 w-full mt-4 mb-6 rounded-full animate-pulse" />
        ) : (
          <ProgressBar
            series={loanResults.progress?.series.map((val, i) => ({
              name: loanResults.progress?.labels[i],
              data: [val],
            }))}
          />
        )}
      </ChartCardWide>
      <ChartContainer title="Loan Statuses" subtitle="Number of applications per status over time">
        {appsLoading ? (
          <VerticalBarChartSkeleton />
        ) : (
          <Bar
            isHorizontal={false}
            colors={CHART_COLORS}
            series={barSeries || []}
            categories={loanResults.barChart?.categories}
          />
        )}
      </ChartContainer>
      <ChartContainer title="Loan Trends" subtitle="Number of loans over time">
        {appsLoading ? (
          <AreaChartSkeleton />
        ) : (
          <Line
            data={loanResults.line?.series || []}
            categories={loanResults.line?.categories || []}
          />
        )}
      </ChartContainer>
    </div>
  );
}
