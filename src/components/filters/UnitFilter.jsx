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

export default function UnitFilter({ setPage }) {
  const dispatch = useDispatch();
  const { modals, filterType } = useSelector((state) => state.ui);

  function setFilter(brand) {
    setPage({ page: 1, search: brand });
    dispatch(toggleModal({ name: "brandFilter", value: modals?.brandFilter }));
  }

  return (
    <>
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
              <MenuLink pathName="All" click={() => setFilter("")} />
              <MenuLink pathName="Honda" click={() => setFilter("honda")} />
              <MenuLink pathName="Yamaha" click={() => setFilter("yamaha")} />
              <MenuLink pathName="Suzuki" click={() => setFilter("suzuki")} />
              <MenuLink pathName="KTM" click={() => setFilter("ktm")} />
              <MenuLink pathName="Kymco" click={() => setFilter("Kymco")} />
              <MenuLink pathName="SYM" click={() => setFilter("sym")} />
              <MenuLink pathName="Skygo" click={() => setFilter("skygo")} />
              <MenuLink pathName="Bristol" click={() => setFilter("bristol")} />
              <MenuLink pathName="Rusi" click={() => setFilter("rusi")} />
              <MenuLink pathName="QJMotor" click={() => setFilter("qjmotor")} />
              <MenuLink pathName="FKM" click={() => setFilter("fkm")} />
              <MenuLink
                pathName="Kawasaki"
                click={() => setFilter("kawasaki")}
              />
              <MenuLink
                pathName="Bennelli"
                click={() => setFilter("bennelli")}
              />
              <MenuLink
                pathName="Motorstar"
                click={() => setFilter("motorstar")}
              />
            </DropdownMenu>
          )}
        </DropdownBttn>
      )}

      {filterType === "quantity" && (
        <>
          <ShortInput
            caption="Minimun"
            type="number"
            placeholder="min"
            change={(e) => setPage({ min: e.target.value })}
          />
          <ShortInput
            caption="Maximum"
            type="number"
            placeholder="max"
            change={(e) => setPage({ max: e.target.value })}
          />
        </>
      )}

      {filterType && (
        <CloseBttn trigger={() => dispatch(setFilterType(null))} />
      )}
    </>
  );
}
