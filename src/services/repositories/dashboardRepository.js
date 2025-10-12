import { APPLICATION_STATUS } from "../../constants/loanStatus";
import { MONTHS } from "../../constants/dates";

export const dashboardRepository = {
  countSlice(data, exclude = []) {
    const excluded = ["month", "total", "data"];
    const exclusions = [...excluded, ...exclude];

    const labels = Object.keys(APPLICATION_STATUS)
      .filter((key) => !exclude.includes(key))
      .map((i) => APPLICATION_STATUS[i]);

    const series = Object.keys(data)
      .filter((key) => !exclusions.includes(key))
      .map((i) => data[i].count);

    return { series, labels };
  },

  chartConfig(data, seriesConfig = [{}], range = "months") {
    let categories = [];
    let getCategoryIndex;

    if (range === "days") {
      categories = buildLastNDaysLabels(7);

      const boundaries = [];
      const today = startOfDay(new Date());

      // ? Build week array
      for (let i = 0; i < 7; i++) {
        const start = new Date(today);
        start.setDate(today.getDate() - (6 - i));
        boundaries.push(startOfDay(start));
      }
      // ? Gets the week day of the passed data
      getCategoryIndex = (appDate) => {
        const d = startOfDay(new Date(appDate));
        for (let i = 0; i < boundaries.length; i++) {
          // ? Returns the index of the week day
          if (d.getTime() === boundaries[i].getTime()) return i;
        }
        return -1;
      };
    } else if (range === "weeks") {
      categories = build4WeekRangesLabels();

      const weekRanges = [];
      // ? Constucts the latest start and end date of the week
      const today = startOfDay(new Date());
      const currentWeekStart = new Date(today);
      currentWeekStart.setDate(
        currentWeekStart.getDate() - currentWeekStart.getDay()
      );

      // ? Constructs the 4 weeks before the currentWeekStart
      for (let i = 3; i >= 0; i--) {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() - i * 7 - 1);
        const weekStart = new Date(weekEnd);
        weekStart.setDate(weekEnd.getDate() - 6);

        weekRanges.push({
          start: startOfDay(weekStart),
          end: startOfDay(weekEnd),
        });
      }

      // ? Gets the week index of the passed data
      getCategoryIndex = (appDate) => {
        const d = startOfDay(new Date(appDate));
        for (let i = 0; i < weekRanges.length; i++) {
          if (d >= weekRanges[i].start && d <= weekRanges[i].end) return i;
        }
        return -1;
      };
    } else {
      // ? Default 'months' and 'year' range
      const index = range === "year" ? 12 : 6;
      categories = buildLastNMonthsLabels(index);

      // ? Return if empty
      if (data.length === 0) {
        return {
          categories: [],
          series: seriesConfig.map((c) => ({
            name: c.name,
            data: new Array(6).fill(0),
          })),
        };
      }
      const sorted = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      const latestDate = new Date(sorted[0].created_at);
      const currentMonth = latestDate.getMonth();
      const currentYear = latestDate.getFullYear();

      const months = [];
      for (let i = index - 1; i >= 0; i--) {
        const d = new Date(currentYear, currentMonth - i, 1);
        months.push({ year: d.getFullYear(), month: d.getMonth() });
      }

      // ? Get month index of the passed data
      getCategoryIndex = (appDate) => {
        const d = new Date(appDate);
        for (let i = 0; i < months.length; i++) {
          if (
            d.getFullYear() === months[i].year &&
            d.getMonth() === months[i].month
          )
            return i;
        }
        return -1;
      };
    }

    // ? Prepare empty series
    const seriesData = seriesConfig.map((config) => ({
      name: config.name,
      data: new Array(categories.length).fill(0),
    }));

    // ? Return if empty
    if ((range === "days" || range === "weeks") && data.length === 0)
      return { categories, series: seriesData };

    // ? Push each data to their respective categories
    data.forEach((data) => {
      const idx = getCategoryIndex(data.created_at);
      if (idx === -1) return;
      seriesConfig.forEach((config, sIndex) => {
        try {
          if (config.filter(data)) {
            seriesData[sIndex].data[idx] =
              (seriesData[sIndex].data[idx] || 0) + 1;
          }
        } catch (err) {
          // ? Skip the item silently
        }
      });
    });

    return { categories, series: seriesData };
  },

  makeFilters(prop, filters) {
    return filters.map((val) => ({
      name: val.charAt(0).toUpperCase() + val.slice(1),
      filter: (app) => app[prop] === val,
    }));
  },
};

// ? Helper: date normalizer
function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);

  return x;
}

// ? Helper: format month short (Sep), day (12)
function formatMonthDay(d) {
  const opts = { month: "short", day: "numeric" };
  return new Intl.DateTimeFormat(undefined, opts).format(d);
}

// ? Helper: build week day labels (Mon, Tues, Wed...)
function buildLastNDaysLabels(n) {
  const labels = [];
  // ? Newest last order (chronological)
  for (let i = n - 1; i >= 0; i--) {
    const dt = new Date();
    dt.setDate(dt.getDate() - i);
    const weekday = dt.toLocaleDateString(undefined, { weekday: "short" }); // e.g., 'Mon'
    labels.push(weekday);
  }

  return labels;
}

// ? Helper: build 4-week date range lables
function build4WeekRangesLabels() {
  const labels = [];
  const today = startOfDay(new Date());
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(
    currentWeekStart.getDate() - currentWeekStart.getDay()
  );

  // ? Oldest last order (chronological)
  for (let i = 3; i >= 0; i--) {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() - i * 7 - 1);
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 6);
    labels.push(`${formatMonthDay(weekStart)} - ${formatMonthDay(weekEnd)}`);
  }
  return labels;
}

// ? Helper: build months labels
function buildLastNMonthsLabels(n) {
  const labels = [];
  const now = new Date();
  const currentMonth = now.getMonth();

  for (let i = n - 1; i >= 0; i--) {
    const m = (currentMonth - i + 12) % 12;
    labels.push(MONTHS[Object.keys(MONTHS)[m]].slice(0, 3)); // 'Jan', 'Feb' etc.
  }

  return labels;
}
