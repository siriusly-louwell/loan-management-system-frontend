import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../services/redux/slices/uiSlice";
import CustomBadge from "../badges/CustomBadge";
import PopAnimate from "../animations/popAnimate";
import CloseBttn from "../buttons/CloseBttn";

export default function StatusLegend() {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);
  const statuses = [
    {
      text: "Pending",
      color: "blue",
      desc: "The application has been received and is currently under review the staff tean.",
    },
    {
      text: "Accepted",
      color: "green",
      desc: "The application has successfully passed the initial verification and moved to the evaluation stage.",
    },
    {
      text: "Evaluated",
      color: "yellow",
      desc: "The application has been evaluated by the assigned credit investigator.",
    },
    {
      text: "Approved",
      color: "purple",
      desc: "The loan application has been fully approved by the admin. The applicant may now proceed with customer registration.",
    },
    {
      text: "Denied",
      color: "orange",
      desc: "The application did not meet the approval criteria during the review process.",
    },
    {
      text: "Declined",
      color: "red",
      desc: "The application was declined by the admin after final evaluation.",
    },
    {
      text: "Incomplete",
      color: "lime",
      desc: "A portion of the loan has been successfully paid.",
    },
    {
      text: "Paid",
      color: "cyan",
      desc: "The loan has been fully settled.",
    },
  ];

  return (
    <PopAnimate
      modalName={modals.legend}
      classStyle="relative w-full h-auto max-w-md max-h-full">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-500 w-full max-w-lg mx-auto overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-5 py-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Status Legend
          </h3>
          <CloseBttn
            trigger={() =>
              dispatch(toggleModal({ name: "legend", value: modals.legend }))
            }
          />
        </div>

        <section className="divide-y divide-gray-100 dark:divide-gray-700">
          {statuses.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 flex items-start items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
              <div className="flex justify-center">
                <CustomBadge text={item.text} color={item.color} />
              </div>
              <p className="grid col-span-3 gridp-cols-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </section>
      </div>
    </PopAnimate>
  );
}
