import React from "react";
import Pagination from "@mui/material/Pagination";

export default function PageNav() {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white">
          {" "}
          1-8{" "}
        </span>
        of
        <span className="font-semibold text-gray-900 dark:text-white">
          {" "}
          1000
        </span>
      </span>
      {/* <Paginator /> */}
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#6b7280", // Tailwind gray-500 hex
            borderColor: "#6b7280",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#ff20586d", // Tailwind gray-100
          },
          "& .Mui-selected": {
            backgroundColor: "#FF2056",
            color: "#fff",
          },
        }}
      />
    </nav>
  );
}
