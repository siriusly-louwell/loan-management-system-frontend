// Utility to generate and download CSV files
// columns: Array of { header: string, accessor: string | (row) => any }
// rows: Array<any>
export function downloadCSV({ rows, columns, filename = "export.csv" }) {
  if (!Array.isArray(rows) || rows.length === 0) {
    // still produce header-only CSV
    rows = [];
  }

  const resolvePath = (obj, path) => {
    if (!path) return "";
    return path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
        obj
      );
  };

  const escapeCSV = (value) => {
    if (value === null || value === undefined) return "";
    const str = String(value);
    if (/[",\n]/.test(str)) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  };

  const headers = columns.map((c) => escapeCSV(c.header)).join(",");
  const lines = rows.map((row) => {
    return columns
      .map((c) => {
        const val =
          typeof c.accessor === "function"
            ? c.accessor(row)
            : resolvePath(row, c.accessor);
        return escapeCSV(val);
      })
      .join(",");
  });

  const csvContent = [headers, ...lines].join("\r\n");
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
