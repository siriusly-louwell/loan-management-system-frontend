import ProductRow from "./ProductRow";
import TableHead from "./TableHead";
import CustomBttn from "../buttons/CustomBttn";
import Table from "./Table";
import ColorLabel from "../ColorLabel";
import CustomBadge from "../badges/CustomBadge";
import EmptyFolder from "../empty states/EmptyFolder";
import { useDispatch, useSelector } from "react-redux";
import { UnitEntities } from "../../services/entities/Unit";
import RowSkeleton from "../loading components/RowSkeleton";
import { storeID } from "../../services/redux/slices/unitSlice";
import Eye from "../../assets/icons/Eye";
import { Link } from "react-router-dom";

export default function UnitsTable() {
  const dispatch = useDispatch();
  const motors = useSelector(UnitEntities);
  const { unitsLoading } = useSelector((state) => state.unit);

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
                    <Link to="/staff/unit">
                      <CustomBttn
                        onclick={() => {
                          dispatch(storeID(motor.id));
                          window.scrollTo(0, 0);
                        }}
                        text="View"
                        classname="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        <Eye />
                      </CustomBttn>
                    </Link>
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
