import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CRUDformat from "../components/CRUDformat";
import ProductRow from "../components/tables/ProductRow";
import TableHead from "../components/tables/TableHead";
import CustomBttn from "../components/buttons/CustomBttn";
import Table from "../components/tables/Table";
import Eye from "../assets/icons/Eye";
import EmptyRows from "../components/empty states/EmptyRows";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import { getToken } from "../services/redux/slices/authSlice";
import UserFilter from "../components/filters/UserFilter";
import { fetchCustomers } from "../services/redux/slices/applicationSlice";
import RowSkeleton from "../components/loading components/RowSkeleton";

export default function AccComakers() {
  const dispatch = useDispatch();
  const { customers, customLoading } = useSelector(
    (state) => state.application
  );
  const [navPage, setNavPage] = useState({});
  const search = useDebounce(navPage.search, 500);
  const min = useDebounce(navPage.min, 1000);
  const max = useDebounce(navPage.max, 500);

  useEffect(() => {
    dispatch(getToken());
    dispatch(
      fetchCustomers({
        page: navPage.page,
        isApproved: true,
        type: navPage.type,
        search: search,
        min: min,
        max: max,
      })
    );
  }, [dispatch, navPage.page, navPage.type, max, min, search]);

  const setPage = (obj) => setNavPage({ ...navPage, ...obj });

  function displayRow(custom) {
    return (
      <ProductRow
        key={custom.id}
        data={[
          <div className="flex items-center mr-3">
            <img
              src={custom.imgURL}
              alt="customer"
              className="h-8 rounded-full w-auto mr-3"
            />
            {custom.fullName}
          </div>,
          custom.record_id,
          5,
          4,
          custom.email,
          custom.last_log,
          <div className="flex items-center space-x-4">
            <Link to="/admin/profile">
              <CustomBttn
                text="View"
                classname="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <Eye />
              </CustomBttn>
            </Link>
            <CustomBttn
              text="Deactivate"
              classname="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            />
          </div>,
        ]}
      />
    );
  }

  return (
    <CRUDformat
      filterComponent={<UserFilter setPage={setPage} />}
      title="Staff"
      setPage={setPage}
      label="User">
      <div className="min-h-[65vh] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHead
            headers={[
              "",
              "Name",
              "Record ID",
              "Active loans",
              "Paid Loans",
              "Email",
              "Last login",
              "Actions",
            ]}
          />
          <tbody>
            {!customLoading && customers.map((custom) => displayRow(custom))}
            {customLoading && <RowSkeleton num={8} count={7} />}
          </tbody>
        </Table>
        {customers.length === 0 && !customLoading && <EmptyRows />}
      </div>
    </CRUDformat>
  );
}
