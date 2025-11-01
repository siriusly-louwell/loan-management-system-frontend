import React, { useState, useEffect } from "react";
import LogList from "../../components/LogList";
import LogRow from "../../components/tables/LogRow";
import PageNav from "../../components/PageNav";
import SearchInput from "../../components/inputs/SearchInput";
import CustomBadge from "../../components/badges/CustomBadge";
import EmptySearch from "../../components/empty states/EmptySearch";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import {
  fetchApplicants,
  saveLoan,
  setLoanLoad,
} from "../../services/redux/slices/applicationSlice";
import InvoiceRowSkeleton from "../../components/loading components/InvoiceRowSkeleton";
import { UserEntity } from "../../services/entities/User";
import ApplicationFilter from "../../components/filters/ApplicationFilter";
import InfoButton from "./../buttons/InfoButton";
import { toggleModal } from "../../services/redux/slices/uiSlice";

export default function InvoiceTable({
  headText,
  path,
  isDashboard = false,
  bttnText = "View Details",
}) {
  const dispatch = useDispatch();
  const { role, isAdmin, id } = useSelector(UserEntity);
  const [navPage, setNavPage] = useState({});
  const search = useDebounce(navPage.search, 500);
  const min = useDebounce(navPage.min, 1000);
  const max = useDebounce(navPage.max, 500);
  const { modals } = useSelector((state) => state.ui);
  const { applications, appsLoading, pagination } = useSelector(
    (state) => state.application
  );
  const statuses =
    (isAdmin && !isDashboard) || (role === "ci" && bttnText !== "Evaluate")
      ? [
          "accepted",
          "evaluated",
          "approved",
          "declined",
          "pending",
          "incomplete",
          "paid",
          "canceled",
        ]
      : role === "ci" && bttnText === "Evaluate"
      ? ["accepted"]
      : [];

  useEffect(() => {
    dispatch(setLoanLoad(true));
  }, []);

  useEffect(() => {
    dispatch(
      fetchApplicants({
        page: navPage.page,
        type: navPage.type,
        perPage: 6,
        statuses: statuses,
        search: search,
        isCustomer: role === "customer" && id,
        min: min,
        max: max,
      })
    );
  }, [dispatch, navPage.page, navPage.type, max, min, search, role, bttnText]);

  const setPage = (obj) => setNavPage({ ...navPage, ...obj });

  return (
    <div className="mx-auto max-w-screen-x 2xl:px-0">
      <div className="mx-auto max-w-6xl bg-white dark:bg-gray-800 border border-gray-600 rounded-xl p-5">
        <div className="space-y-2 sm:items-center border-b border-gray-600 pb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            {headText}
          </h2>
          <div className="sm:flex space-x-2 sm:justify-between">
            <section className="flex space-x-2">
              <ApplicationFilter setPage={setPage} />
            </section>
            <div className="mt-6 gap-x-6 space-y-4 lg:w-1/2 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <InfoButton
                click={() =>
                  dispatch(
                    toggleModal({ name: "legend", value: modals.legend })
                  )
                }
              />
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
                click={() => dispatch(saveLoan(loan.id))}
                id={loan.record_id}
                name={loan.fullName}
                date={loan.applied_at}
                badge={
                  <CustomBadge
                    text={loan.status.text}
                    color={loan.status.color}
                  />
                }
                path={path}
                bttnText={bttnText}
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

        <PageNav
          pagination={pagination}
          changePage={setPage}
          itemName="applications"
        />
      </div>
    </div>
  );
}
