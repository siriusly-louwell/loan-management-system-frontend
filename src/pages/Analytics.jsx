import ChartContainer from "../components/cards/ChartContainer";
import Bar from "../components/charts/Bar";
import { CHART_COLORS } from "../constants/colors";

export default function Analytics() {
  return (
    <div className="px-5 py-3 w-full">
      <ChartContainer title="Loan Statuses">
        <Bar
          isHorizontal={false}
          colors={CHART_COLORS}
          series={[
            {
              name: "Pending",
              data: [5, 4, 8, 12, 20, 4],
            },
            {
              name: "Accepted",
              data: [4, 2, 1, 7, 40, 23],
            },
            {
              name: "Denied",
              data: [5, 4, 8, 12, 20, 4],
            },
            {
              name: "Evaulated",
              data: [4, 2, 11, 7, 34, 23],
            },
            {
              name: "Approved",
              data: [5, 2, 8, 12, 10, 4],
            },
            {
              name: "Declined",
              data: [7, 2, 1, 7, 32, 23],
            },
            {
              name: "Canceled",
              data: [5, 6, 8, 12, 20, 12],
            },
          ]}
          categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        />
      </ChartContainer>
    </div>
  );
}
