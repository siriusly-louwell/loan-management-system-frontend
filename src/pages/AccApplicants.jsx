import React, { useEffect, useState } from "react";
import CRUDformat from "../components/CRUDformat";
import ApplicantsTable from "../components/tables/ApplicantsTable";
import { fetchApplicants } from "../services/redux/slices/applicationSlice";
import { useDispatch } from "react-redux";
import useDebounce from "../hooks/useDebounce";

export default function AccApplicants() {
  const dispatch = useDispatch();
  const [navPage, setNavPage] = useState({});
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
    <CRUDformat setPage={setPage} modalId="createUser" label="User">
      <ApplicantsTable />
    </CRUDformat>
  );
}
