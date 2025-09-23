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
import { setFilter, toggleModal } from "../services/redux/slices/uiSlice";
import { MOTOR_BRANDS } from "../constants/brands";
import { fetchUnits } from "../services/redux/slices/unitSlice";
import { useOutletContext } from "react-router-dom";

export default function UnitsAll() {
  const dispatch = useDispatch();
  const { units, setUnits, pageNum, setPageNum, unitType } = useOutletContext();
  const { unitsLoading, pagination } = useSelector((state) => state.unit);
  const { modals, filter } = useSelector((state) => state.ui);

  async function showMore() {
    await dispatch(
      fetchUnits({
        page: pageNum,
        perPage: 24,
        search: filter,
        unit_type: unitType,
      })
    );
    if (units.length < pagination.total) setPageNum(pageNum + 1);
  }

  async function toggleFilter(brand) {
    dispatch(toggleModal({ name: "filter", value: modals?.filter }));
    dispatch(setFilter(brand));
    setUnits([]);
    setPageNum(2);
  }

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
                <MenuLink pathName="All" click={() => toggleFilter(null)} />
                {MOTOR_BRANDS.map((brand, i) => (
                  <MenuLink
                    key={i}
                    pathName={brand}
                    click={() => toggleFilter(brand)}
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
        {unitsLoading ? (
          <CardSkeleton num={8} />
        ) : (
          units.map((motor) => <ProductCard key={motor.id} unit={motor} />)
        )}
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
