import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductRow from "./ProductRow";
import TableHead from "./TableHead";
import CustomBttn from "../buttons/CustomBttn";
import Table from "./Table";
import Eye from "../../assets/icons/Eye";
import CustomBadge from "../badges/CustomBadge";
import EmptyRows from "../empty states/EmptyRows";
import RowSkeleton from "../loading components/RowSkeleton";
import { saveLoan } from "../../services/redux/slices/applicationSlice";

export default function ApplicantsTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applications, appsLoading } = useSelector(
    (state) => state.application
  );

  return (
    <div className="min-h-[65vh] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <Table>
        <TableHead
          headers={["", "Name", "Record ID", "Applied at", "Status", "Actions"]}
        />
        <tbody>
          {!appsLoading &&
            applications.map((user) => (
              <ProductRow
                key={user.id}
                recent={user.isNew}
                data={[
                  <div className="flex items-center mr-3 space-x-2">
                    <img
                      src={user.imgURL}
                      alt="applicant id"
                      className="h-10 w-10 mr-3 rounded-3xl object-cover"
                    />
                    {user.fullName}
                    {user.isNew && <CustomBadge text="new" color="red" />}
                  </div>,
                  // <div className="flex items-center space-x-4">
                  //     96
                  //     <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  //         <SmallUpArrow />
                  //         15%
                  //     </span>
                  // </div>,
                  user.record_id,
                  user.applied_at,
                  <CustomBadge
                    text={user.status.text}
                    color={user.status.color}
                  />,
                  <div className="flex items-center space-x-4">
                    <CustomBttn
                      text="View"
                      onclick={() => {
                        dispatch(saveLoan(user.id));
                        navigate(`/admin/application`);
                      }}
                      classname="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                      <Eye />
                    </CustomBttn>
                    <CustomBttn
                      text="Deactivate"
                      classname="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    />
                  </div>,
                ]}
              />
            ))}
          {appsLoading && <RowSkeleton num={8} count={5} />}
        </tbody>
      </Table>

      {applications.length === 0 && !appsLoading ? <EmptyRows /> : ""}
    </div>
  );
}
