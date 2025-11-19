import { useEffect, useState } from "react";
import CreditBanner from "../components/cards/CreditBanner";
import BasicBanner from "../components/cards/BasicBanner";
import SpecialOfferBanner from "../components/cards/SpecialOfferBanner";
import StickyBanner from "../components/cards/StickyBanner";
import UnderlineTabs from "../components/tabs/UnderlineTabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnits } from "../services/redux/slices/unitSlice";
import BasicCarousel from "../components/cards/BasicCarousel";
import UlTab from "../components/tabs/UlTab";
import { UnitEntities } from "../services/entities/Unit";
import { setFilter, toggleModal } from "../services/redux/slices/uiSlice";
import DropdownBttn from "../components/buttons/DropdownBttn";
import Filter from "../assets/icons/Filter";
import DropdownMenu from "../components/DropdownMenu";
import MenuLink from "../components/links/MenuLink";
import { MOTOR_BRANDS } from "../constants/brands";
import Sort from "../assets/icons/Sort";
import ProductGrid from "../components/cards/ProductGrid";
import ProductCard from "../components/cards/ProductCard";
import EmptySearch from "../components/empty states/EmptySearch";
import BasicButton from "../components/buttons/BasicBttn";
import CardSkeleton from "../components/loading components/CardSkeleton";

export default function ProductList() {
  const dispatch = useDispatch();
  const motors = useSelector(UnitEntities);
  const { user } = useSelector((state) => state.auth);
  const { filter, modals } = useSelector((state) => state.ui);
  const { unitsLoading, pagination } = useSelector((state) => state.unit);
  const [unitType, setUnitType] = useState(null);
  const [pageNum, setPageNum] = useState(2);

  const fetch = (num, mode = "replace") =>
    dispatch(
      fetchUnits({
        page: num,
        perPage: 24,
        search: filter,
        unit_type: unitType,
        mode: mode,
      })
    );

  useEffect(() => {
    fetch(1);
  }, [dispatch, filter, unitType]);

  async function toggleFilter(brand) {
    dispatch(toggleModal({ name: "filter", value: modals?.filter }));
    dispatch(setFilter(brand));
    setPageNum(2);
  }

  async function showMore() {
    fetch(pageNum, "append");
    if (motors.length < pagination.total) setPageNum(pageNum + 1);
  }

  async function toggleTab(value) {
    setUnitType(value);
    dispatch(setFilter(null));
    setPageNum(2);
  }

  return (
    <section className="bg-gray-100 py-8 justify-items-center antialiased dark:bg-gray-800 md:py-12">
      {user?.role !== "customer" && <StickyBanner />}
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="relative w-full space-y-4 lg:max-w-6xl mb-3 mx-auto rounded-xl overflow-hidden">
          <BasicCarousel length={3} loop={true}>
            <BasicBanner
              caption="Rhean Motor Center"
              context="A trusted motorcycle loan provider that has been helping customers finance their dream motorcycles since year 2000."
            />
            <SpecialOfferBanner />
            <CreditBanner
              caption="Your Journey Starts Here — Fast, Flexible Motorcycle Loans."
              context="We make it simple to finance your next motorcycle with plans that fit your lifestyle and budget."
            />
          </BasicCarousel>
        </div>

        <UnderlineTabs>
          <UlTab text="All" isPage={!unitType} click={() => toggleTab(null)} />
          <UlTab
            text="Top units"
            isPage={unitType === "top"}
            click={() => toggleTab("top")}
          />
          <UlTab
            text="Brand New"
            isPage={unitType === "new"}
            click={() => toggleTab("new")}
          />
          <UlTab
            text="Repo units"
            isPage={unitType === "repo"}
            click={() => toggleTab("repo")}
          />
        </UnderlineTabs>

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
            motors.map((motor) => <ProductCard key={motor.id} unit={motor} />)
          )}
        </ProductGrid>
        {motors.length === 0 && !unitsLoading && (
          <EmptySearch
            label="No results found"
            context="Try changing the filter or go to a different category"
          />
        )}
        <div className="w-full text-center">
          <BasicButton text="Show more" click={showMore} />
        </div>
      </div>
    </section>
  );
}
