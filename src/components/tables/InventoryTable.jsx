import ProductRow from "./ProductRow";
import TableHead from "./TableHead";
import CustomBttn from "../buttons/CustomBttn";
import Table from "./Table";
import ColorLabel from "../ColorLabel";
import Edit from "../../assets/icons/Edit";
import CustomBadge from "../badges/CustomBadge";
import EmptyFolder from "../empty states/EmptyFolder";
import Plus from "../../assets/icons/Plus";
import { useDispatch, useSelector } from "react-redux";
import { UnitEntities } from "../../services/entities/Unit";
import RowSkeleton from "../loading components/RowSkeleton";
import { setLoading, toggleModal } from "../../services/redux/slices/uiSlice";
import { fetchUnit } from "../../services/redux/slices/unitSlice";

export default function InventoryTable() {
  const dispatch = useDispatch();
  const motors = useSelector(UnitEntities);
  const { modals } = useSelector((state) => state.ui);
  const { unitsLoading } = useSelector((state) => state.unit);

  async function unitModal(id, modal) {
    dispatch(setLoading({ text: "Fetching data...", isActive: true }));
    await dispatch(fetchUnit(id));
    dispatch(setLoading({ isActive: false }));
    dispatch(toggleModal({ name: modal, value: modals?.[modal] }));
  }

  return (
    <div className="min-h-[65vh] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <Table>
        <TableHead
          headers={[
            "",
            "Unit",
            "Brand",
            "Colors",
            "Price",
            "Quantity",
            "Rebate Value",
            "Interest Rate",
            "Loan Tenure",
            "Actions",
          ]}
        />
        <tbody>
          {!unitsLoading &&
            motors.map((motor) => (
              <ProductRow
                key={motor.id}
                recent={motor.isNew()}
                data={[
                  <div className="flex items-center mr-3 space-x-2">
                    <img
                      src={motor.imgURL()}
                      alt="unit"
                      className="h-8 w-10 mr-3 rounded-md object-cover"
                    />
                    {motor.name}
                    {motor.isNew() && <CustomBadge text="new" color="red" />}
                  </div>,
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                    {motor.brand}
                  </span>,
                  <div className="grid grid-cols-4 gap-y-2">
                    {motor.colors.map((color, i) => (
                      <ColorLabel key={i} style={color.color} />
                    ))}
                  </div>,
                  "₱" + parseFloat(motor.price).toLocaleString(),
                  motor.quantity,
                  "₱" + parseFloat(motor.rebate).toLocaleString(),
                  motor.interest + "%",
                  motor.tenure + " years",
                  <div className="flex items-center space-x-4">
                    <CustomBttn
                      text="Edit"
                      onclick={() => unitModal(motor.id, "editUnit")}
                      classname="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-rose-600 rounded-lg hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-600 dark:bg-rose-600 dark:hover:bg-rose-500 dark:focus:bg-rose-700 dark:focus:ring-rose-600">
                      <Edit />
                    </CustomBttn>
                    <CustomBttn
                      text="Manage Stock"
                      classname="flex items-center text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-rose-500 dark:text-rose-500 dark:bg-rose-200 dark:hover:text-white dark:hover:bg-rose-600 dark:focus:ring-rose-900"
                      onclick={() => unitModal(motor.id, "unitStock")}>
                      <Plus />
                    </CustomBttn>
                  </div>,
                ]}
              />
            ))}

          {unitsLoading && <RowSkeleton num={8} count={9} />}
        </tbody>
      </Table>
      {motors.length === 0 && !unitsLoading && <EmptyFolder />}
    </div>
  );
}
