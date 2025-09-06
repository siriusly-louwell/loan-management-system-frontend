import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";
import ProductGrid from "../components/cards/ProductGrid";
import BasicButton from "../components/buttons/BasicBttn";
import DropdownMenu from "../components/DropdownMenu";
import MenuLink from "../components/links/MenuLink";
import DropdownBttn from "../components/buttons/DropdownBttn";
import Filter from "../assets/icons/Filter";
import Sort from "../assets/icons/Sort";
import CardSkeleton from "../components/loading components/CardSkeleton";
import EmptySearch from "../components/empty states/EmptySearch";
import { useDispatch, useSelector } from "react-redux";
import { UnitEntities } from "../services/entities/Unit";
import { setFilter, toggleModal } from "../services/redux/slices/uiSlice";

export default function UnitsAll() {
  const dispatch = useDispatch();
  const motors = useSelector(UnitEntities);
  const { units, loading } = useSelector((state) => state.unit);
  const { modals, filter } = useSelector((state) => state.ui);

  return (
    <>
      <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
        <div>
          <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Available Units
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownBttn
            icon={<Filter />}
            toggleMenu={() =>
              dispatch(toggleModal({ name: "filter", value: modals?.filter }))
            }
            text="Filter by Brand">
            <DropdownMenu classStyle={modals.filter ? "block" : "hidden"}>
              <MenuLink
                pathName="All"
                click={() => dispatch(setFilter(null))}
              />
              <MenuLink
                pathName="Honda"
                click={() => dispatch(setFilter("Honda"))}
              />
              <MenuLink
                pathName="Yamaha"
                click={() => dispatch(setFilter("Yamaha"))}
              />
              <MenuLink
                pathName="Suzuki"
                click={() => dispatch(setFilter("Suzuki"))}
              />
              <MenuLink
                pathName="Kawasaki"
                click={() => dispatch(setFilter("Kawasaki"))}
              />
              <MenuLink
                pathName="KTM"
                click={() => dispatch(setFilter("KTM"))}
              />
              <MenuLink
                pathName="Kymco"
                click={() => dispatch(setFilter("Kymco"))}
              />
              <MenuLink
                pathName="SYM"
                click={() => dispatch(setFilter("SYM"))}
              />
              <MenuLink
                pathName="Skygo"
                click={() => dispatch(setFilter("Skygo"))}
              />
              <MenuLink
                pathName="Bennelli"
                click={() => dispatch(setFilter("Bennelli"))}
              />
              <MenuLink
                pathName="Bristol"
                click={() => dispatch(setFilter("Bristol"))}
              />
              <MenuLink
                pathName="Rusi"
                click={() => dispatch(setFilter("Rusi"))}
              />
              <MenuLink
                pathName="Motorstar"
                click={() => dispatch(setFilter("Motorstar"))}
              />
              <MenuLink
                pathName="QJMotor"
                click={() => dispatch(setFilter("QJMotor"))}
              />
              <MenuLink
                pathName="FKM"
                click={() => dispatch(setFilter("FKM"))}
              />
            </DropdownMenu>
          </DropdownBttn>

          <DropdownBttn
            icon={<Sort />}
            toggleMenu={() =>
              dispatch(toggleModal({ name: "sort", value: modals?.sort }))
            }
            text="Sort">
            <DropdownMenu
              classStyle={modals.sort ? "block" : "hidden"}
              pad={20}>
              <MenuLink pathName="The most popular" />
              <MenuLink pathName="Newest" />
              <MenuLink pathName="Increasing price" />
              <MenuLink pathName="Decreasing price" />
              <MenuLink pathName="No. reviews" />
              <MenuLink pathName="Discount %" />
            </DropdownMenu>
          </DropdownBttn>
        </div>
      </div>

      <ProductGrid>
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          motors.map((motor) => {
            if (motor.isBrand(filter))
              return <ProductCard key={motor.id} unit={motor} />;
            else if (filter === null)
              return <ProductCard key={motor.id} unit={motor} />;
            else return "";
          })
        )}
      </ProductGrid>
      {units.length === 0 && !loading ? (
        <EmptySearch
          label="No results found"
          context="Try changing the filter or go to a different category"
        />
      ) : (
        ""
      )}
      <div className="w-full text-center">
        <BasicButton text="Show more" />
      </div>
    </>
  );
}
