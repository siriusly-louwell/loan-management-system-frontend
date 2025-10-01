import React from "react";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";

export default function PageNav({ pagination, changePage }) {
  const theme = useTheme();

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
        onChange={(_, page) => changePage({ page: page })}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[600]
                : theme.palette.grey[300],
          },
        }}
      />
    </nav>
  );
}
