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
import { MOTOR_BRANDS } from "../constants/brands";
import { useEffect, useState } from "react";
import { fetchUnits } from "../services/redux/slices/unitSlice";

export default function UnitsAll() {
  const dispatch = useDispatch();
  const motors = useSelector(UnitEntities);
  const { unitsLoading } = useSelector((state) => state.unit);
  const { modals, filter } = useSelector((state) => state.ui);
  const [units, setUnits] = useState([]);
  const [pageNum, setPageNum] = useState(2);

  useEffect(() => {
    setUnits([...units, ...motors]);
  }, [motors[0]?.id]);

  const showMore = () => {
    dispatch(fetchUnits({ page: pageNum, perPage: 4 }));
    setPageNum(pageNum + 1);
  };

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
            {modals.filter && (
              <DropdownMenu>
                <MenuLink
                  pathName="All"
                  click={() => dispatch(setFilter(null))}
                />
                {MOTOR_BRANDS.map((brand, i) => (
                  <MenuLink
                    key={i}
                    pathName={brand}
                    click={() => dispatch(setFilter(brand))}
                  />
                ))}
              </DropdownMenu>
            )}
          </DropdownBttn>

          <DropdownBttn
            icon={<Sort />}
            toggleMenu={() =>
              dispatch(toggleModal({ name: "sort", value: modals?.sort }))
            }
            text="Sort">
            {modals.sort && (
              <DropdownMenu pad={20}>
                <MenuLink pathName="The most popular" />
                <MenuLink pathName="Newest" />
                <MenuLink pathName="Increasing price" />
                <MenuLink pathName="Decreasing price" />
                <MenuLink pathName="No. reviews" />
                <MenuLink pathName="Discount %" />
              </DropdownMenu>
            )}
          </DropdownBttn>
        </div>
      </div>

      <ProductGrid>
        {unitsLoading
          ? [...Array(8)].map((_, i) => <CardSkeleton key={i} />)
          : units.map((motor) => {
              if (motor.isBrand(filter))
                return <ProductCard key={motor.id} unit={motor} />;
              else if (filter === null)
                return <ProductCard key={motor.id} unit={motor} />;
              else return "";
            })}
      </ProductGrid>
      {units.length === 0 && !unitsLoading && (
        <EmptySearch
          label="No results found"
          context="Try changing the filter or go to a different category"
        />
      )}
      <div className="w-full text-center">
        <BasicButton text="Show more" click={showMore} />
      </div>
    </>
  );
}
