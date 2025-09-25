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

export default function UserFilter({ setPage }) {
  const dispatch = useDispatch();
  const { modals, filterType } = useSelector((state) => state.ui);

  function setDropdown(filter, type) {
    dispatch(setFilterType(filter));
    dispatch(toggleModal({ name: "userFilter", value: modals?.userFilter }));
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
    if (modals.statusFilter)
      dispatch(
        toggleModal({ name: "statusFilter", value: modals?.statusFilter })
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
              name: "userFilter",
              value: modals?.userFilter,
            })
          )
        }>
        {modals.userFilter && (
          <DropdownMenu>
            <MenuLink
              pathName="by Date"
              click={() => setDropdown("date", "created_at")}
            />
            <MenuLink
              pathName="by Status"
              click={() => setDropdown("status")}
            />
          </DropdownMenu>
        )}
      </DropdownBttn>

      {/* Filter type */}
      {filterType === "status" && (
        <DropdownBttn
          text={`Filter by Status`}
          icon={<Filter />}
          toggleMenu={() =>
            dispatch(
              toggleModal({
                name: "statusFilter",
                value: modals?.statusFilter,
              })
            )
          }>
          {modals.statusFilter && (
            <DropdownMenu>
              <MenuLink pathName="All" click={() => setFilter("search", "")} />
              <MenuLink
                pathName={"Active"}
                click={() => setFilter("search", "active")}
              />
              <MenuLink
                pathName={"Inactive"}
                click={() => setFilter("search", "inactive")}
              />
            </DropdownMenu>
          )}
        </DropdownBttn>
      )}

      {filterType === "date" && (
        <>
          <ShortInput
            type="date"
            placeholder="min"
            change={(e) => setFilter("min", e.target.value)}
          />
          <ShortInput
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
