import React from "react";
import { useLocation } from "react-router-dom";
import CustomBttn from "../components/buttons/CustomBttn";
import Plus from "../assets/icons/Plus";
import DropdownBttn from "../components/buttons/DropdownBttn";
import SearchInput from "../components/inputs/SearchInput";
import DropdownMenu from "../components/DropdownMenu";
import MenuLink from "../components/links/MenuLink";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../services/redux/slices/uiSlice";
import PageNav from "./PageNav";

export default function CRUDformat({
  children,
  title,
  modalName,
  addModal,
  label,
  setPage,
  filterComponent,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pagination } = useSelector((state) => state.unit);
  const { modals } = useSelector((state) => state.ui);

  return (
    <>
      <section className="bg-gray-200 dark:bg-gray-800 w-full py-3 sm:p-5 antialiased">
        <div className="mx-auto px-4 lg:px-4">
          <div className="bg-white w-full dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <h1 className="text-gray-100 font-medium text-2xl">{title}</h1>
            </div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <SearchInput
                    name="findProd"
                    id="simple-search"
                    placeholder="Search here..."
                    change={setPage}
                  />
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                {location.pathname !== "/admin/accounts/applicants" &&
                  location.pathname !== "/admin/accounts/customers" &&
                  location.pathname !== "/admin/accounts" && (
                    <CustomBttn
                      text={`Add ${label}`}
                      classname="flex items-center justify-center text-white bg-rose-600 hover:bg-rose-600 focus:ring-4 focus:ring-rose-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                      onclick={() =>
                        dispatch(
                          toggleModal({
                            name: modalName,
                            value: modals[modalName],
                          })
                        )
                      }>
                      <Plus />
                    </CustomBttn>
                  )}

                {filterComponent}

                <DropdownBttn
                  text="Actions"
                  toggleMenu={() =>
                    dispatch(
                      toggleModal({ name: "actions", value: modals?.actions })
                    )
                  }>
                  {modals.actions && (
                    <DropdownMenu>
                      <MenuLink pathName="Mass Edit" />
                      <MenuLink pathName="Delete All" />
                    </DropdownMenu>
                  )}
                </DropdownBttn>
                <div className="flex items-center space-x-3 w-full md:w-auto"></div>
              </div>
            </div>

            <div className="overflow-x-auto min-h-40">{children}</div>

            <PageNav pagination={pagination} changePage={setPage} />
          </div>
        </div>
      </section>

      {addModal}
    </>
  );
}
