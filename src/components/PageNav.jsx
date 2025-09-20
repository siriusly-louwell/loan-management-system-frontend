import React from "react";
import Pagination from "@mui/material/Pagination";

export default function PageNav({ pagination, changePage }) {

  return (
    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white">
          {` ${pagination.from}-${pagination.to} `}
        </span>
        out of
        <span className="font-semibold text-gray-900 dark:text-white">
          {` ${pagination.total} `}
        </span>
        units
      </span>

      <Pagination
        count={pagination.lastPage}
        page={pagination.currentPage}
        onChange={changePage}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#6b7280",
            borderColor: "#6b7280",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#ff20586d",
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
