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
  PieChartSkeleton,
  VerticalBarChartSkeleton,
} from "../components/loading components/ChartSkeletons";
import Line from "../components/charts/Line";
import { paymentAnalysis } from "../services/redux/slices/paymentSlice";
import { unitAnalysis } from "../services/redux/slices/unitSlice";
import ChartContSmall from "../components/cards/ChartContSmall";
import Pie from "../components/charts/Pie";

export default function Analytics() {
  const dispatch = useDispatch();
  const { loanResults, appsLoading } = useSelector(
    (state) => state.application
  );
  const { paymentResults, paymentsLoading } = useSelector(
    (state) => state.payment
  );
  const { unitResults, unitsLoading } = useSelector((state) => state.unit);
  const loading = paymentsLoading || appsLoading || unitsLoading;
  const barSeries = loanResults.barChart?.series.map((config) => ({
    name: config.name,
    data: config.data,
  }));
  const priceUnitSeries = unitResults.pricePerBrand?.series.map((config) => ({
    name: config.name,
    data: config.data,
  }));

  useEffect(() => {
    dispatch(unitAnalysis({ analysis: true }));
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
      <section className="max-w-[80%] max-w-[100%] grid grid-cols-3 gap-1">
        <ChartContSmall
          title="Brand Distribution"
          subtitle="Quantity of each unit brand"
          chart="barChart">
          {loading ? (
            <PieChartSkeleton />
          ) : (
            <Pie
              labels={unitResults.brandPie?.labels || []}
              series={unitResults.brandPie?.series || []}
            />
          )}
        </ChartContSmall>

        <div className="grid col-span-2 grid-cols-1">
          <ChartContainer
            title="Unit Price per brand"
            subtitle="Average price of each unit brand"
            showFilter={false}>
            {loading ? (
              <VerticalBarChartSkeleton num={10} />
            ) : (
              <Bar
                radius={20}
                isHorizontal={false}
                colors={MONOCHROME_COLORS.filter((_, i) => i === 7)}
                categories={unitResults.pricePerBrand?.categories || []}
                series={priceUnitSeries || []}
              />
            )}
          </ChartContainer>
        </div>
      </section>

      <div className="w-[85%] border-b border-gray-500 my-5" />

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
          <VerticalBarChartSkeleton num={12} />
        ) : (
          <Bar
            radius={10}
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
        chart="chart"
        count={
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
        }>
        {loading ? (
          <VerticalBarChartSkeleton num={12} />
        ) : (
          <Bar
            radius={20}
            isHorizontal={false}
            colors={MONOCHROME_COLORS.filter((_, i) => i === 3 || i === 4)}
            series={
              paymentResults.chart?.series.map((config) => ({
                name: config.name,
                data: config.data || [],
              })) || []
            }
            categories={paymentResults.chart?.categories || []}
          />
        )}
      </ChartContainer>
    </div>
  );
}
