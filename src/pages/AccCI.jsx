import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateUser from "./CreateUser";
import CRUDformat from "../components/CRUDformat";
import ProductRow from "../components/tables/ProductRow";
import TableHead from "../components/tables/TableHead";
import CustomBttn from "../components/buttons/CustomBttn";
import Table from "../components/tables/Table";
import Eye from "../assets/icons/Eye";
import CustomBadge from "../components/badges/CustomBadge";
import EmptyRows from "../components/empty states/EmptyRows";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../services/redux/slices/authSlice";
import { fetchUsers } from "../services/redux/slices/userSlice";
import useDebounce from "../hooks/useDebounce";
import { UserEntities } from "../services/entities/User";
import RowSkeleton from "../components/loading components/RowSkeleton";
import UserFilter from "../components/filters/UserFilter";

export default function AccCI() {
  const dispatch = useDispatch();
  const users = useSelector(UserEntities);
  const { usersLoading, pagination } = useSelector((state) => state.user);
  const [navPage, setNavPage] = useState({});
  const search = useDebounce(navPage.search, 500);
  const min = useDebounce(navPage.min, 1000);
  const max = useDebounce(navPage.max, 500);

  useEffect(() => {
    dispatch(getToken());
    dispatch(
      fetchUsers({
        page: navPage.page,
        type: navPage.type,
        search: search,
        role: "ci",
        min: min,
        max: max,
      })
    );
  }, [dispatch, navPage.page, navPage.type, max, min, search]);

  const setPage = (obj) => setNavPage({ ...navPage, ...obj });

  return (
    <CRUDformat
      addModal={<CreateUser userType="ci" />}
      filterComponent={<UserFilter setPage={setPage} />}
      modalName="createUser"
      title="Credit Investigators"
      setPage={setPage}
      pagination={pagination}
      label="User">
      <div className="min-h-[65vh] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHead
            headers={[
              "",
              "Name",
              "Email",
              "Loans held",
              "Last login",
              "Status",
              "Actions",
            ]}
          />
          <tbody>
            {!usersLoading &&
              users.map((account) => (
                <ProductRow
                  key={account.id}
                  data={[
                    <div className="flex items-center mr-3">
                      <img
                        src={account.imgURL()}
                        alt="credit investigator"
                        className="h-10 w-10 mr-3 rounded-3xl object-cover"
                      />
                      {account.fullName}
                    </div>,
                    account.email,
                    5,
                    "05/12/2025",
                    <CustomBadge
                      text={account.getStatus.text}
                      color={account.getStatus.color}
                    />,
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
              ))}
            {usersLoading && <RowSkeleton num={8} count={6} />}
          </tbody>
        </Table>
        {users.length === 0 && !usersLoading && <EmptyRows />}
      </div>
    </CRUDformat>
  );
}
