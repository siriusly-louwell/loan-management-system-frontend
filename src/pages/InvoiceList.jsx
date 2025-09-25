import React, { useState, useEffect, useRef } from "react";
import LogList from "../components/LogList";
import LogRow from "../components/tables/LogRow";
import PageNav from "../components/PageNav";
import SearchInput from "../components/inputs/SearchInput";
import Search from "../assets/icons/Search";
import DropdownBttn from "../components/buttons/DropdownBttn";
import Filter from "../assets/icons/Filter";
import CustomBadge from "../components/badges/CustomBadge";
import EmptySearch from "../components/empty states/EmptySearch";
import { useLocation } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu";
import MenuLink from "../components/links/MenuLink";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import { fetchApplicants } from "../services/redux/slices/applicationSlice";
import InvoiceRowSkeleton from "../components/loading components/InvoiceRowSkeleton";
import { UserEntity } from "../services/entities/User";
import ApplicationFilter from "../components/filters/ApplicationFilter";

export default function InvoiceList({
  headText,
  record = "",
  path,
  bttnText = "View Details",
  id,
}) {
  const [loans, setLoans] = useState([]);
  const [isFiltOn, setIsFiltOn] = useState(false);
  const filtMenu = useRef(null);
  const [loanLoad, setLoanLoad] = useState(true);
  const [filt, setFilt] = useState("");
  const location = useLocation();

  const dispatch = useDispatch();
  const user = useSelector(UserEntity);
  const { applications, appsLoading, pagination } = useSelector(
    (state) => state.application
  );
  const [navPage, setNavPage] = useState({});
  const search = useDebounce(navPage.search, 500);
  const min = useDebounce(navPage.min, 1000);
  const max = useDebounce(navPage.max, 500);
  const statuses =
    user.isAdmin() || user.role === "ci"
      ? ["accepted", "evaluated", "approved", "declined", "pending"]
      : user.role === "ci" && bttnText === "Evaluate"
      ? ["accepted"]
      : [];

  useEffect(() => {
    dispatch(
      fetchApplicants({
        page: navPage.page,
        type: navPage.type,
        statuses: statuses,
        search: search,
        min: min,
        max: max,
      })
    );
  }, [dispatch, navPage.page, navPage.type, max, min, search, user]);

  const setPage = (obj) => setNavPage({ ...navPage, ...obj });

  // useEffect(() => {
  //   fetch(`http://127.0.0.1:8000/api/application${record}${filt}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (Array.isArray(data)) setLoans(data);
  //       else setLoans([data]);
  //       setLoanLoad(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data: ", error);
  //       setLoanLoad(true);
  //       setLoans({});
  //     });
  // }, [record, filt]);

  useEffect(() => {
    const menuClicked = (event) => {
      if (filtMenu.current && !filtMenu.current.contains(event.target)) {
        setIsFiltOn(false);
      }
    };

    document.addEventListener("mousedown", menuClicked);
    return () => document.removeEventListener("mousedown", menuClicked);
  }, []);

  const toggleMenu = () => setIsFiltOn((prev) => !prev);

  // function dateConvert(date) {
  //   const newDate = new Date(date);
  //   const formatted = new Intl.DateTimeFormat("en-GB").format(newDate);

  //   return formatted;
  // }

  // function statusBadge(status) {
  //   let type = [];

  //   switch (status) {
  //     case "accepted":
  //       type = ["Accepted", "green"];
  //       break;
  //     case "denied":
  //       type = ["Denied", "orange"];
  //       break;
  //     case "evaluated":
  //       type = ["Evaluated", "yellow"];
  //       break;
  //     case "approved":
  //       type = ["Approved", "purple"];
  //       break;
  //     case "declined":
  //       type = ["Declined", "red"];
  //       break;
  //     default:
  //       type = ["Pending", "blue"];
  //   }

  //   return <CustomBadge text={type[0]} color={type[1]} />;
  // }

  function displayLoan(loan) {
    // const { pathname } = location;
    // const {
    //   record_id,
    //   first_name,
    //   last_name,
    //   created_at,
    //   apply_status,
    //   id: loanId,
    //   ci_id,
    // } = loan;

    // const showStaffOrAdminLoan =
    //   pathname === "/staff/loans" ||
    //   pathname === "/find" ||
    //   (pathname === "/admin/loans" && apply_status !== "denied");

    // const isEvaluator = bttnText === "Evaluate";
    // const isAccepted = apply_status === "accepted";
    // const isNotDenied = apply_status !== "denied";
    // const isCurrentUser = loan.ci_id === id;

    return (
      <LogRow
        key={loan.id}
        id={loan.record_id}
        name={loan.fullName}
        date={loan.applied_at}
        badge={
          <CustomBadge text={loan.status.text} color={loan.status.color} />
        }
        path={path}
        bttnText={bttnText}
        state={loan.id}
      />
    );

    // if (
    //   (user.isAdmin() && apply_status !== "denied") ||
    //   user.role === "staff" ||
    //   user.role === "guest"
    // ) {
    //   return (
    //     <LogRow
    //       key={loanId}
    //       id={record_id}
    //       name={loan.fullName}
    //       date={loan.applied_at}
    //       badge={
    //         <CustomBadge text={loan.status.text} color={loan.status.color} />
    //       }
    //       path={path}
    //       bttnText={bttnText}
    //       state={loanId}
    //     />
    //   );
    // }

    // if (isCurrentUser) {
    //   if (isEvaluator && isAccepted) {
    //     return (
    //       <LogRow
    //         key={loanId}
    //         id={record_id}
    //         name={loan.fullName}
    //         date={loan.applied_at}
    //         badge={<CustomBadge text="Accepted" color="green" />}
    //         path={path}
    //         bttnText={bttnText}
    //         state={loanId}
    //       />
    //     );
    //   }

    //   if (!isEvaluator && isNotDenied) {
    //     return (
    //       <LogRow
    //         key={loanId}
    //         id={record_id}
    //         name={`${first_name} ${last_name}`}
    //         date={dateConvert(created_at)}
    //         badge={statusBadge(apply_status)}
    //         path={path}
    //         bttnText={bttnText}
    //         state={loanId}
    //       />
    //     );
    //   }
    // }
  }

  return (
    <section className="bg-gray-200 py-8 w-full antialiased dark:bg-gray-800 md:py-10">
      <div className="mx-auto max-w-screen-x 2xl:px-0">
        <div className="mx-auto max-w-5xl bg-white dark:bg-gray-800 border border-gray-600 rounded-xl p-5">
          <div className="gap-4 sm:items-center border-b border-gray-600 pb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              {headText}
            </h2>

            {location.pathname !== "/find" && (
              <div className="sm:flex sm:justify-between">
              <div className="mt-6 gap-x-6 space-y-4 lg:w-1/2 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                <SearchInput
                  id="invoice_search"
                  name="log_search"
                  placeholder="Search ID, name..."
                  change={setPage}
                />
                {/* <DropdownBttn
                  toggleMenu={toggleMenu}
                  text="Filters"
                  icon={<Filter />}
                  /> */}
              </div>
                  <ApplicationFilter setPage={setPage} />
              </div>
            )}
          </div>
          <DropdownMenu
            ref={filtMenu}
            pad={72}
            classStyle={isFiltOn ? "block" : "hidden"}>
            <MenuLink pathName="All" click={() => setFilt("")} />
            <MenuLink
              pathName="Pending"
              click={() => setFilt("/pending?by=apply_status")}
            />
            <MenuLink
              pathName="Accepted"
              click={() => setFilt("/accepted?by=apply_status")}
            />
            <MenuLink
              pathName="Denied"
              click={() => setFilt("/denied?by=apply_status")}
            />
            <MenuLink
              pathName="Evaluated"
              click={() => setFilt("/evaluated?by=apply_status")}
            />
            <MenuLink
              pathName="Approved"
              click={() => setFilt("/approved?by=apply_status")}
            />
            <MenuLink
              pathName="Declined"
              click={() => setFilt("/declined?by=apply_status")}
            />
          </DropdownMenu>

          {Object.keys(applications).length === 0 ? (
            <EmptySearch
              label="No results"
              context="It seems no such data exists"
            />
          ) : (
            <>
              <LogList>
                {appsLoading ? (
                  <InvoiceRowSkeleton num={6} />
                ) : (
                  applications.map((loan) => displayLoan(loan))
                )}

                {/* {loanLoad ? (
                  <div>Loading...</div>
                ) : loans.length > 1 ? (
                  loans.map((loan) => displayLoan(loan))
                ) : (
                  displayLoan(loans[0])
                )} */}

                {/* <LogRow id="FWB127364372" name="John Doe" date="20/12/2023" state={100}
                                badge={<CustomBadge text="Evaluated" color="yellow" />} path={path} bttnText={bttnText} /> */}
                {/* <LogRow id="FWB127364372" name="John Doe" date="20.12.2023" badge={<Confirmed />} path={path} bttnText={bttnText} />
                                <LogRow id="FWB127364372" name="John Doe" date="20.12.2023" badge={<Cancelled />} path={path} bttnText={bttnText} /> */}
              </LogList>

              <PageNav pagination={pagination} changePage={setPage} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
