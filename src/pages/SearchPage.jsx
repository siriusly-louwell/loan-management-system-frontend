import React, { useEffect, useState } from "react";
import SearchInput from "../components/inputs/SearchInput";
import EmptySearch from "../components/empty states/EmptySearch";
import ApplicationFilter from "../components/filters/ApplicationFilter";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import { fetchApplicants } from "../services/redux/slices/applicationSlice";
import LogList from "../components/LogList";
import LogRow from "../components/tables/LogRow";
import InvoiceRowSkeleton from "../components/loading components/InvoiceRowSkeleton";
import CustomBadge from "../components/badges/CustomBadge";
import PageNav from "../components/PageNav";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { applications, appsLoading, pagination } = useSelector(
    (state) => state.application
  );
  const [navPage, setNavPage] = useState({});
  const search = useDebounce(navPage.search, 500);
  const min = useDebounce(navPage.min, 1000);
  const max = useDebounce(navPage.max, 500);

  useEffect(() => {
    if (
      (search !== undefined && search !== "") ||
      (min !== undefined && max !== undefined)
    )
      dispatch(
        fetchApplicants({
          page: navPage.page,
          type: navPage.type,
          search: search,
          min: min,
          max: max,
        })
      );
  }, [dispatch, navPage.page, navPage.type, max, min, search]);

  const setPage = (obj) => setNavPage({ ...navPage, ...obj });

  return (
    <section className="bg-gray-200 py-8 w-full antialiased dark:bg-gray-800 md:py-10">
      <div className="mx-auto max-w-screen-x 2xl:px-0">
        <div className="mx-auto max-w-5xl bg-white dark:bg-gray-800 border border-gray-600 rounded-xl p-5">
          <div className="space-y-2 sm:items-center border-b border-gray-600 pb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Search an application
            </h2>

            <div className="sm:flex space-x-2 sm:justify-between">
              <section className="flex space-x-2">
                <ApplicationFilter setPage={setPage} />
              </section>
              <div className="mt-6 gap-x-6 space-y-4 lg:w-1/2 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                <SearchInput
                  id="invoice_search"
                  name="log_search"
                  placeholder="Search ID, name..."
                  change={setPage}
                />
              </div>
            </div>
          </div>

          <LogList>
            {appsLoading ? (
              <InvoiceRowSkeleton num={5} />
            ) : (
              applications.map((loan) => (
                <LogRow
                  key={loan.id}
                  id={loan.record_id}
                  name={loan.fullName}
                  date={loan.applied_at}
                  badge={
                    <CustomBadge
                      text={loan.status.text}
                      color={loan.status.color}
                    />
                  }
                  path={"/application"}
                  bttnText={"View Details"}
                  state={loan.id}
                />
              ))
            )}
            {!appsLoading && Object.keys(applications).length === 0 && (
              <EmptySearch
                label="No results"
                context="It seems no such data exists"
              />
            )}
          </LogList>

          <PageNav pagination={pagination} changePage={setPage} />
        </div>
      </div>
    </section>
    // <section className="bg-gray-200 py-8 antialiased dark:bg-gray-800 md:py-12">
    //   <div className="mx-auto max-w-screen-xl px-4 2xl:px-12">
    //     <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white mb-5 sm:text-2xl">
    //       Search your Application
    //     </h2>
    //     <SearchInput
    //       name="loan_search"
    //       placeholder="2025-GT43D, John Doe"
    //       change={setSearch}
    //       value={search}>
    //       <Search />
    //     </SearchInput>
    //     {search === "" ? (
    //       <EmptySearch
    //         label="No data to show"
    //         context="Use the search bar to find applications"
    //       />
    //     ) : (
    //       <InvoiceList record={`/${search}?by=record_id`} path="/application" />
    //     )}
    //   </div>
    // </section>
  );
}
