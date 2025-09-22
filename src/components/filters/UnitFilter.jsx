import { useDispatch, useSelector } from "react-redux";
import Filter from "../../assets/icons/Filter";
import DropdownBttn from "../buttons/DropdownBttn";
import {
  setFilterType,
  toggleModal,
} from "../../services/redux/slices/uiSlice";
import DropdownMenu from "../DropdownMenu";
import MenuLink from "../links/MenuLink";
import ShortInput from "../inputs/ShortInput";
import CloseBttn from "../buttons/CloseBttn";
import { MOTOR_BRANDS } from "../../constants/brands";

export default function UnitFilter({ setPage }) {
  const dispatch = useDispatch();
  const { modals, filterType } = useSelector((state) => state.ui);

  function setDropdown(filter, type) {
    dispatch(setFilterType(filter));
    dispatch(toggleModal({ name: "unitFilter", value: modals?.unitFilter }));
    setPage({
      page: 1,
      type: type,
      min: undefined,
      max: undefined,
      search: undefined,
    });
  }

  function setFilter(prop, value) {
    setPage({ page: 1, [prop]: value });
    if (modals.brandFilter)
      dispatch(
        toggleModal({ name: "brandFilter", value: modals?.brandFilter })
      );
  }

  return (
    <>
      {/* Filter type selector */}
      <DropdownBttn
        text="Filter by"
        icon={<Filter />}
        toggleMenu={() =>
          dispatch(
            toggleModal({
              name: "unitFilter",
              value: modals?.unitFilter,
            })
          )
        }>
        {modals.unitFilter && (
          <DropdownMenu>
            <MenuLink
              pathName="by Date"
              click={() => setDropdown("date", "created_at")}
            />
            <MenuLink pathName="by Brand" click={() => setDropdown("brand")} />
            <MenuLink
              pathName="by Quantity"
              click={() => setDropdown("range", "quantity")}
            />
            <MenuLink
              pathName="by Price"
              click={() => setDropdown("range", "price")}
            />
            <MenuLink
              pathName="by Interest"
              click={() => setDropdown("range", "interest")}
            />
            <MenuLink
              pathName="by Rebate value"
              click={() => setDropdown("range", "rebate")}
            />
            <MenuLink
              pathName="by Tenure year"
              click={() => setDropdown("range", "tenure")}
            />
          </DropdownMenu>
        )}
      </DropdownBttn>

      {/* Filter type */}
      {filterType === "brand" && (
        <DropdownBttn
          text={`Filter by Brand`}
          icon={<Filter />}
          toggleMenu={() =>
            dispatch(
              toggleModal({
                name: "brandFilter",
                value: modals?.brandFilter,
              })
            )
          }>
          {modals.brandFilter && (
            <DropdownMenu>
              <MenuLink pathName="All" click={() => setFilter("search", "")} />
              {MOTOR_BRANDS.map((brand, i) => (
                <MenuLink
                  key={i}
                  pathName={brand}
                  click={() => setFilter("search", brand)}
                />
              ))}
            </DropdownMenu>
          )}
        </DropdownBttn>
      )}

      {filterType === "range" && (
        <>
          <ShortInput
            caption="Minimun"
            type="number"
            placeholder="min"
            change={(e) => setFilter("min", e.target.value)}
          />
          <ShortInput
            caption="Maximum"
            type="number"
            placeholder="max"
            change={(e) => setFilter("max", e.target.value)}
          />
        </>
      )}

      {filterType === "date" && (
        <>
          <ShortInput
            caption="Minimun"
            type="date"
            placeholder="min"
            change={(e) => setFilter("min", e.target.value)}
          />
          <ShortInput
            caption="Maximum"
            type="date"
            placeholder="max"
            change={(e) => setFilter("max", e.target.value)}
          />
        </>
      )}

      {filterType && (
        <CloseBttn
          trigger={() => {
            dispatch(setFilterType(null));
            setPage({
              page: 1,
              search: undefined,
              min: undefined,
              max: undefined,
            });
          }}
        />
      )}
    </>
  );
}
