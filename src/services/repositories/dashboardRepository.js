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

  chartConfig(data) {
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

  // chartConfigMulti(data, seriesConfig = []) {
  //   // Handle empty data case
  //   if (data.length === 0) {
  //     return {
  //       categories: [],
  //       series: seriesConfig.map((config) => ({
  //         name: config.name,
  //         data: new Array(6).fill(0),
  //       })),
  //     };
  //   }

  //   // Sort applications by date in descending order
  //   const sortedApps = [...data].sort(
  //     (a, b) => new Date(b.created_at) - new Date(a.created_at)
  //   );

  //   // Get the latest date for reference
  //   const latestDate = new Date(sortedApps[0].created_at);
  //   const currentMonth = latestDate.getMonth();
  //   const currentYear = latestDate.getFullYear();

  //   // Initialize month labels
  //   const monthLabels = [];
  //   for (let i = 0; i < 6; i++) {
  //     const monthIndex = (currentMonth - i + 12) % 12;
  //     const monthAbbrev = Object.keys(MONTHS)[monthIndex];
  //     monthLabels.unshift(
  //       monthAbbrev.charAt(0).toUpperCase() + monthAbbrev.slice(1)
  //     );
  //   }

  //   // Initialize series data
  //   const seriesData = seriesConfig.map((config) => ({
  //     name: config.name,
  //     data: new Array(6).fill(0),
  //   }));

  //   // Count applications for each series
  //   sortedApps.forEach((app) => {
  //     const appDate = new Date(app.created_at);
  //     const appMonth = appDate.getMonth();
  //     const appYear = appDate.getFullYear();

  //     const monthsDiff =
  //       (currentYear - appYear) * 12 + (currentMonth - appMonth);

  //     if (monthsDiff >= 0 && monthsDiff < 6) {
  //       // Find matching series for this status
  //       seriesConfig.forEach((config, index) => {
  //         if (config.filter(app)) {
  //           seriesData[index].data[5 - monthsDiff]++;
  //         }
  //       });
  //     }
  //   });

  //   return {
  //     categories: monthLabels,
  //     series: seriesData,
  //   };
  // },

  chartConfigMulti(data, seriesConfig = [{}], range = "months") {
    // Generate categories and an index finder that maps a date to a category index
    let categories = [];
    let getCategoryIndex;

    if (range === "days") {
      // last 7 days (labels are short weekday names in chronological order)
      categories = buildLastNDaysLabels(7);

      // Build date range boundaries for each category
      const boundaries = [];
      const today = startOfDay(new Date());
      // boundaries[i] is the start date for category i
      for (let i = 0; i < 7; i++) {
        const start = new Date(today);
        start.setDate(today.getDate() - (6 - i)); // oldest first
        boundaries.push(startOfDay(start));
      }
      getCategoryIndex = (appDate) => {
        const d = startOfDay(new Date(appDate));
        for (let i = 0; i < boundaries.length; i++) {
          // If app date is same as boundaries[i], it maps to that index
          if (d.getTime() === boundaries[i].getTime()) return i;
        }
        return -1;
      };
    } else if (range === "weeks") {
      categories = build4WeekRangesLabels();

      // Determine week ranges (start..end) aligned to Sunday..Saturday, for the 4 most recent completed weeks
      const weekRanges = [];
      const today = startOfDay(new Date());
      const currentWeekStart = new Date(today);
      currentWeekStart.setDate(
        currentWeekStart.getDate() - currentWeekStart.getDay()
      );

      for (let i = 3; i >= 0; i--) {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() - i * 7 - 1); // Saturday
        const weekStart = new Date(weekEnd);
        weekStart.setDate(weekEnd.getDate() - 6);
        weekRanges.push({
          start: startOfDay(weekStart),
          end: startOfDay(weekEnd),
        });
      }

      getCategoryIndex = (appDate) => {
        const d = startOfDay(new Date(appDate));
        for (let i = 0; i < weekRanges.length; i++) {
          if (d >= weekRanges[i].start && d <= weekRanges[i].end) return i;
        }
        return -1;
      };
    } else {
      // default months (existing behavior) - categories are month names (short)
      categories = buildLastNMonthsLabels(6);

      // Map app date to month bucket relative to latest month in data
      // Reuse existing approach but with explicit boundaries
      if (data.length === 0) {
        return {
          categories: [],
          series: seriesConfig.map((c) => ({
            name: c.name,
            data: new Array(6).fill(0),
          })),
        };
      }
      const sortedApps = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      const latestDate = new Date(sortedApps[0].created_at);
      const currentMonth = latestDate.getMonth();
      const currentYear = latestDate.getFullYear();

      const months = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(currentYear, currentMonth - i, 1);
        months.push({ year: d.getFullYear(), month: d.getMonth() });
      }

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

    // Handle empty data early for days / weeks where we already have categories length
    if (
      (range === "days" || range === "weeks") &&
      data.length === 0
    ) {
      return {
        categories,
        series: seriesConfig.map((c) => ({
          name: c.name,
          data: new Array(categories.length).fill(0),
        })),
      };
    }

    // Prepare series result container
    const seriesData = seriesConfig.map((config) => ({
      name: config.name,
      data: new Array(categories.length).fill(0),
    }));

    // Iterate applications and increment appropriate series bucket
    data.forEach((app) => {
      const idx = getCategoryIndex(app.created_at);
      if (idx === -1) return;
      seriesConfig.forEach((config, sIndex) => {
        try {
          if (config.filter(app)) {
            seriesData[sIndex].data[idx] =
              (seriesData[sIndex].data[idx] || 0) + 1;
          }
        } catch (err) {
          // If a filter throws, skip the item silently (robustness)
        }
      });
    });

    return {
      categories,
      series: seriesData,
    };
  },

  makeFilters(prop, filters) {
    return filters.map((val) => ({
      name: val.charAt(0).toUpperCase() + val.slice(1),
      filter: (app) => app[prop] === val,
    }));
  },
};

// Helper: normalize a date to midnight (local)
function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

// Helper: format month short (Sep), day (12)
function formatMonthDay(d) {
  const opts = { month: "short", day: "numeric" };
  return new Intl.DateTimeFormat(undefined, opts).format(d);
}

// Helper: build last N days labels (uses WEEKS const: sun..sat)
function buildLastNDaysLabels(n) {
  // We'll return last n days names, newest last (chronological)
  const labels = [];
  for (let i = n - 1; i >= 0; i--) {
    const dt = new Date();
    dt.setDate(dt.getDate() - i);
    const weekday = dt.toLocaleDateString(undefined, { weekday: "short" }); // e.g., 'Mon'
    labels.push(weekday);
  }
  return labels;
}

// Helper: build 4-week ranges labels (start - end)
function build4WeekRangesLabels() {
  const labels = [];
  const today = startOfDay(new Date());
  // Find the start of the current week (assuming week starts on Sunday)
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(
    currentWeekStart.getDate() - currentWeekStart.getDay()
  );

  // We'll build 4 ranges ending with the most recent completed week
  // i = 3 -> oldest, i = 0 -> most recent
  for (let i = 3; i >= 0; i--) {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() - i * 7 - 1); // end is Saturday (one day before week start)
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 6);
    labels.push(`${formatMonthDay(weekStart)} - ${formatMonthDay(weekEnd)}`);
  }
  return labels;
}

// Helper: build last N months labels (6 months default). Uses MONTHS
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
