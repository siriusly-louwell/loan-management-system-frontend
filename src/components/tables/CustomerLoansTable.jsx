import React, { useState, useEffect, useRef } from "react";
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
import InfoButton from "../buttons/InfoButton";
import { toggleModal } from "../../services/redux/slices/uiSlice";
import { useReactToPrint } from "react-to-print";
import LoansPrint from "../../components/LoansPrint";
// Replaced dual export buttons with single modal-driven export
import { downloadCSV } from "../../utils/csv";
import ShowOptionModal from "../../components/modals/showOptionModal";
import ExportSelectModal from "../../components/modals/ExportSelectModal";

export default function CustomerLoansTable({
  headText,
  path,
  id,
  bttnText = "View Details",
}) {
  const dispatch = useDispatch();
  const { role } = useSelector(UserEntity);
  const { modals } = useSelector((state) => state.ui);
  const { applications, appsLoading, pagination } = useSelector(
    (state) => state.application
  );
  const [navPage, setNavPage] = useState({});
  const search = useDebounce(navPage.search, 500);
  const min = useDebounce(navPage.min, 1000);
  const max = useDebounce(navPage.max, 500);
  const printRef = useRef();

  useEffect(() => {
    dispatch(setLoanLoad(true));
  }, []);

  useEffect(() => {
    dispatch(
      fetchApplicants({
        page: navPage.page,
        type: navPage.type,
        perPage: 6,
        statuses: [],
        search: search,
        isCustomer: id,
        min: min,
        max: max,
      })
    );
  }, [dispatch, navPage.page, navPage.type, max, min, search, role, bttnText]);

  const setPage = (obj) => setNavPage({ ...navPage, ...obj });

  const [showOption, setShowOption] = useState(false); // timeframe selection
  const [showExportSelect, setShowExportSelect] = useState(false); // choose Print or CSV
  const [printType, setPrintType] = useState("all");

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${headText || "Loans"} Report - ${printType}`,
  });

  const handleSelectOption = (type) => {
    setPrintType(type);
    setShowOption(false);
    setTimeout(() => handlePrint(), 100);
  };

  const handleCsv = () => {
    const columns = [
      { header: "Record ID", accessor: "record_id" },
      { header: "Name", accessor: "fullName" },
      { header: "Applied At", accessor: "applied_at" },
      { header: "Status", accessor: (row) => row?.status?.text || "" },
    ];
    downloadCSV({ rows: applications, columns, filename: "loans.csv" });
    setShowExportSelect(false);
  };

  const openPrintFlow = () => {
    setShowExportSelect(false);
    setShowOption(true);
  };

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
              <button
                type="button"
                className="inline-flex items-center justify-center text-white bg-rose-600 hover:bg-rose-600 focus:ring-4 focus:ring-rose-600 font-medium rounded-lg text-sm px-4 py-2"
                onClick={() => setShowExportSelect(true)}
              >
                Export
              </button>
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

        {/* Hidden printable component */}
        <div className="hidden">
          <LoansPrint
            ref={printRef}
            loans={applications}
            title={headText}
            filterType={printType}
          />
        </div>
        <ShowOptionModal
          open={showOption}
          onClose={() => setShowOption(false)}
          onSelect={handleSelectOption}
        />
        <ExportSelectModal
          open={showExportSelect}
          onClose={() => setShowExportSelect(false)}
          onPrint={openPrintFlow}
          onCsv={handleCsv}
        />
      </div>
    </div>
  );
}
