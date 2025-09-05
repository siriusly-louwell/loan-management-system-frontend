import React from "react";
import ProductGrid from "../components/cards/ProductGrid";
import BasicButton from "../components/buttons/BasicBttn";
import DropdownMenu from "../components/DropdownMenu";
import MenuLink from "../components/links/MenuLink";
import DropdownBttn from "../components/buttons/DropdownBttn";
import Filter from "../assets/icons/Filter";
import Sort from "../assets/icons/Sort";
import EmptySearch from "../components/empty states/EmptySearch";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../services/redux/slices/uiSlice";

export default function UnitsNew() {
  const dispatch = useDispatch();
  const {modals} = useSelector((state) => state.ui);

  return (
    <>
      <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
        <div>
          <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Available Units
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownBttn text="Filter">
            <Filter />
          </DropdownBttn>
          <DropdownBttn
            toggleMenu={() =>
              dispatch(toggleModal({ name: "sort", value: modals?.sort }))
            }
            text="Sort">
            <Sort />
          </DropdownBttn>
        </div>
      </div>
      <DropdownMenu className={modals?.sort ? "block" : "hidden"}>
        <MenuLink pathName="The most popular" />
        <MenuLink pathName="Newest" />
        <MenuLink pathName="Increasing price" />
        <MenuLink pathName="Decreasing price" />
        <MenuLink pathName="No. reviews" />
        <MenuLink pathName="Discount %" />
      </DropdownMenu>

      <EmptySearch
        label="No results found"
        context="Try changing the filter or go to a different category"
      />
      <div className="w-full text-center">
        <BasicButton text="Show more" />
      </div>
    </>
  );
}
