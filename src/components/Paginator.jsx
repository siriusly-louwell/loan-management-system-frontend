import React from "react";
import PageLink from "./links/PageLink";

export default function Paginator() {
  return (
    <ul className="inline-flex items-stretch -space-x-px">
      <PageLink extra="py-1.5 ml-0 rounded-l-lg h-full">
        <span className="sr-only">Previous</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </PageLink>
      <PageLink extra="py-2">1</PageLink>
      <PageLink extra="py-2">2</PageLink>
      <PageLink extra="py-2">3</PageLink>
      <PageLink extra="py-2">...</PageLink>
      <PageLink extra="py-2">100</PageLink>
      <PageLink extra="py-1.5 rounded-r-lg h-full">
        <span className="sr-only">Next</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </PageLink>
    </ul>
  );
}
