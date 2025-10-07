import React, { useEffect, useState } from "react";
import CRUDformat from "../components/CRUDformat";
import ApplicantsTable from "../components/tables/ApplicantsTable";
import { fetchApplicants } from "../services/redux/slices/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import ApplicationFilter from "../components/filters/ApplicationFilter";

export default function AccApplicants() {
  const dispatch = useDispatch();
  const [navPage, setNavPage] = useState({});
  const { pagination } = useSelector((state) => state.application);
  const search = useDebounce(navPage.search, 500);
  const min = useDebounce(navPage.min, 1000);
  const max = useDebounce(navPage.max, 500);

  useEffect(() => {
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
    <CRUDformat
      title="Applications"
      label="User"
      setPage={setPage}
      pagination={pagination}
      itemName="applicants"
      filterComponent={<ApplicationFilter setPage={setPage} />}>
      <ApplicantsTable />
    </CRUDformat>
  );
}
