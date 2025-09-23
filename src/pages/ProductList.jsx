import { useEffect, useState } from "react";
import CreditBanner from "../components/cards/CreditBanner";
import BasicBanner from "../components/cards/BasicBanner";
import SpecialOfferBanner from "../components/cards/SpecialOfferBanner";
import StickyBanner from "../components/cards/StickyBanner";
import { Outlet, useLocation } from "react-router-dom";
import UnderlineTabs from "../components/tabs/UnderlineTabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnits } from "../services/redux/slices/unitSlice";
import BasicCarousel from "../components/cards/BasicCarousel";
import UlTab from "../components/tabs/UlTab";
import { UnitEntities } from "../services/entities/Unit";
import { setFilter } from "../services/redux/slices/uiSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const motors = useSelector(UnitEntities);
  const { user } = useSelector((state) => state.auth);
  const { filter } = useSelector((state) => state.ui);
  const [units, setUnits] = useState([]);
  const [unitType, setUnitType] = useState();
  const [pageNum, setPageNum] = useState(2);
  const outletContext = { units, setUnits, pageNum, setPageNum, unitType };

  useEffect(() => {
    dispatch(
      fetchUnits({ page: 1, perPage: 4, search: filter, unit_type: unitType })
    );
  }, [dispatch, filter, unitType]);

  useEffect(() => {
    setUnits([...units, ...motors]);
  }, [motors.length, motors[0]?.id]);

  function activeTab(path) {
    return (
      location.pathname === path ||
      location.pathname === `/prodlist${path}` ||
      location.pathname === `/customer${path}` ||
      (path === "/" && location.pathname === "/prodlist") ||
      (path === "/" && location.pathname === "/customer")
    );
  }

  async function toggleTab(value) {
    setUnitType(value);
    dispatch(setFilter(null));
    setUnits([]);
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
          <UlTab text="All" isPage={activeTab("/")} path="" />
          <UlTab text="Top units" isPage={activeTab("/top")} path="top" />
          <UlTab text="Brand New" isPage={activeTab("/new")} path="new" />
          <UlTab
            text="Repo units"
            isPage={activeTab("/repo")}
            click={() => toggleTab("repo")}
            path="repo"
          />
        </UnderlineTabs>
        <Outlet context={outletContext} />
      </div>
    </section>
  );
}
