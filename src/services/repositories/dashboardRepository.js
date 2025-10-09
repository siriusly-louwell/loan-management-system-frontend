import { APPLICATION_STATUS } from "../../constants/statuses";

export const dashboardRepository = {
  donutConfig(data) {
    const donut = Object.keys(data)
      .filter(
        (k) =>
          k !== "month" &&
          k !== "total" &&
          k !== "paid" &&
          k !== "canceled" &&
          k !== "evaluated"
      )
      .map((i) => data[i].count);

    donut.labels = Object.keys(APPLICATION_STATUS)
      .filter((i) => i !== "paid" && i !== "canceled" && i !== "evaluated")
      .map((i) => APPLICATION_STATUS[i]);

    return donut;
  },
};
