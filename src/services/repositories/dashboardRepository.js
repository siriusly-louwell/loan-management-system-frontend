import { APPLICATION_STATUS } from "../../constants/statuses";
import { MONTHS } from "../../constants/dates";

export const dashboardRepository = {
  donutConfig(data) {
    const donut = Object.keys(data)
      .filter(
        (k) =>
          k !== "month" &&
          k !== "total" &&
          k !== "paid" &&
          k !== "canceled" &&
          k !== "evaluated" &&
          k !== "data"
      )
      .map((i) => data[i].count);

    donut.labels = Object.keys(APPLICATION_STATUS)
      .filter((i) => i !== "paid" && i !== "canceled" && i !== "evaluated")
      .map((i) => APPLICATION_STATUS[i]);

    return donut;
  },

  lineConfig(data) {
    if (data.length === 0) {
      return { categories: [], series: [0, 0, 0, 0, 0, 0] };
    }
    const sortedApps = [...data].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const latestDate = new Date(sortedApps[0].created_at);
    const currentMonth = latestDate.getMonth();
    const currentYear = latestDate.getFullYear();

    const monthCounts = new Array(6).fill(0);
    const monthLabels = [];

    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const monthAbbrev = Object.keys(MONTHS)[monthIndex];
      monthLabels.unshift(
        monthAbbrev.charAt(0).toUpperCase() + monthAbbrev.slice(1)
      );
    }

    sortedApps.forEach((app) => {
      const appDate = new Date(app.created_at);
      const appMonth = appDate.getMonth();
      const appYear = appDate.getFullYear();

      const monthsDiff =
        (currentYear - appYear) * 12 + (currentMonth - appMonth);

      if (monthsDiff >= 0 && monthsDiff < 6) {
        monthCounts[5 - monthsDiff]++;
      }
    });

    return {
      categories: monthLabels,
      series: monthCounts,
    };
  },
};
