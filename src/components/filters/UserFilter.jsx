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

export default function ApplicationFilter({ setPage }) {
  const dispatch = useDispatch();
  const { modals, filterType } = useSelector((state) => state.ui);

  function setDropdown(filter, type) {
    dispatch(setFilterType(filter));
    dispatch(
      toggleModal({ name: "applicantFilter", value: modals?.applicantFilter })
    );
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
              name: "applicantFilter",
              value: modals?.applicantFilter,
            })
          )
        }>
        {modals.applicantFilter && (
          <DropdownMenu>
            <MenuLink
              pathName="by Date"
              click={() => setDropdown("date", "created_at")}
            />
            <MenuLink
              pathName="by Status"
              click={() => setDropdown("apply_status")}
            />
          </DropdownMenu>
        )}
      </DropdownBttn>

      {/* Filter type */}
      {filterType === "apply_status" && (
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
                pathName={"Pending"}
                click={() => setFilter("search", "pending")}
              />
              <MenuLink
                pathName={"Accepted"}
                click={() => setFilter("search", "accepted")}
              />
              <MenuLink
                pathName={"Denied"}
                click={() => setFilter("search", "denied")}
              />
              <MenuLink
                pathName={"Evaluated"}
                click={() => setFilter("search", "evaluated")}
              />
              <MenuLink
                pathName={"Approved"}
                click={() => setFilter("search", "approved")}
              />
              <MenuLink
                pathName={"Declined"}
                click={() => setFilter("search", "declined")}
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
