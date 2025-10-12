import { useDispatch, useSelector } from "react-redux";
import ChartContainer from "../components/cards/ChartContainer";
import Bar from "../components/charts/Bar";
import { CHART_COLORS, MONOCHROME_COLORS } from "../constants/colors";
import { useEffect } from "react";
import { applicationAnalysis } from "../services/redux/slices/applicationSlice";
import ProgressBar from "../components/charts/ProgressBar";
import ChartCardWide from "../components/cards/ChartCardWide";
import {
  AreaChartSkeleton,
  VerticalBarChartSkeleton,
} from "../components/loading components/ChartSkeletons";
import Line from "../components/charts/Line";
import { paymentAnalysis } from "../services/redux/slices/paymentSlice";

export default function Analytics() {
  const dispatch = useDispatch();
  const { loanResults, appsLoading } = useSelector(
    (state) => state.application
  );
  const { paymentResults, paymentsLoading } = useSelector(
    (state) => state.payment
  );
  const barSeries = loanResults.barChart?.series.map((config) => ({
    name: config.name,
    data: config.data,
  }));
  const loading = paymentsLoading || appsLoading;

  useEffect(() => {
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
    <div className="px-5 py-3 w-full flex flex-col items-center">
      <ChartCardWide
        title="Status Count"
        count={loanResults.progress?.series[4]}
        subtitle="Approved applications">
        {loading ? (
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

      <ChartContainer
        title="Loan Statuses"
        subtitle="Number of applications per status over time"
        chart="barChart">
        {loading ? (
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

      <ChartContainer
        title="Loan Trends"
        subtitle="Number of loans over time"
        chart="line">
        {loading ? (
          <AreaChartSkeleton />
        ) : (
          <Line
            series={[
              {
                name: loanResults.line?.series[0]?.name,
                data: loanResults.line?.series[0]?.data || [],
              },
            ]}
            categories={loanResults.line?.categories || []}
          />
        )}
      </ChartContainer>

      <ChartContainer
        title="Loan Payments"
        subtitle="Number of loan payments over time"
        chart="chart">
        {loading ? (
          <VerticalBarChartSkeleton />
        ) : (
          <Bar
            isHorizontal={false}
            colors={MONOCHROME_COLORS.filter((_, i) => i === 3 || i === 4)}
            series={paymentResults.chart?.series.map((config) => ({
              name: config.name,
              data: config.data || [],
            })) || []}
            categories={paymentResults.chart?.categories || []}
          />
        )}
      </ChartContainer>

      <div className="w-[85%] border-b border-gray-500 my-5" />
    </div>
  );
}
