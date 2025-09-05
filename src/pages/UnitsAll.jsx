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
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { Unit, UnitEntities } from "../services/entities/Unit";

export default function UnitsAll() {
  const { units, loading } = useSelector((state) => state.unit);
  const motors = useSelector(UnitEntities);
  const [brandFilt, setBrandFilt] = useState("");
  const {
    toggleSort,
    toggleFilt,
    sortRef,
    filtRef,
    isSort,
    isFilt,
    // motorLoad,
    // motors,
    url,
  } = useOutletContext();

  return (
    <>
      <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
        <div>
          <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Available Units
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownBttn toggleMenu={toggleFilt} text="Filter by Brand">
            <Filter />
          </DropdownBttn>
          <DropdownBttn toggleMenu={toggleSort} text="Sort">
            <Sort />
          </DropdownBttn>
        </div>
      </div>
      <DropdownMenu
        ref={filtRef}
        className={isFilt ? "block" : "hidden"}
        pad={72}>
        <MenuLink pathName="All" click={() => setBrandFilt("")} />
        <MenuLink pathName="Honda" click={() => setBrandFilt("Honda")} />
        <MenuLink pathName="Yamaha" click={() => setBrandFilt("Yamaha")} />
        <MenuLink pathName="Suzuki" click={() => setBrandFilt("Suzuki")} />
        <MenuLink pathName="Kawasaki" click={() => setBrandFilt("Kawasaki")} />
        <MenuLink pathName="KTM" click={() => setBrandFilt("KTM")} />
        <MenuLink pathName="Kymco" click={() => setBrandFilt("Kymco")} />
        <MenuLink pathName="SYM" click={() => setBrandFilt("SYM")} />
        <MenuLink pathName="Skygo" click={() => setBrandFilt("Skygo")} />
        <MenuLink pathName="Bennelli" click={() => setBrandFilt("Bennelli")} />
        <MenuLink pathName="Bristol" click={() => setBrandFilt("Bristol")} />
        <MenuLink pathName="Rusi" click={() => setBrandFilt("Rusi")} />
        <MenuLink
          pathName="Motorstar"
          click={() => setBrandFilt("Motorstar")}
        />
        <MenuLink pathName="QJMotor" click={() => setBrandFilt("QJMotor")} />
        <MenuLink pathName="FKM" click={() => setBrandFilt("FKM")} />
      </DropdownMenu>
      <DropdownMenu
        ref={sortRef}
        className={isSort ? "block" : "hidden"}
        pad={20}>
        <MenuLink pathName="The most popular" />
        <MenuLink pathName="Newest" />
        <MenuLink pathName="Increasing price" />
        <MenuLink pathName="Decreasing price" />
        <MenuLink pathName="No. reviews" />
        <MenuLink pathName="Discount %" />
      </DropdownMenu>

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
            if (motor.isBrand(brandFilt))
              // if (motor.brand === brandFilt && brandFilt !== "")
              return <ProductCard key={motor.id} unit={motor} url={url} />;
            else if (brandFilt === "")
              return <ProductCard key={motor.id} unit={motor} url={url} />;
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
