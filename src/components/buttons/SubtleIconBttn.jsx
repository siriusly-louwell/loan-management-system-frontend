import { MessageSquareX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../services/redux/slices/uiSlice";

export default function SubtleIconBttn() {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);

  return (
    <button
      onClick={() =>
        dispatch(
          toggleModal({ name: "reasonDialog", value: modals.reasonDialog })
        )
      }
      className="mt-2 px-2 py-1 inline-flex items-center text-sm text-gray-500 hover:text-gray-700 rounded-md hover:bg-rose-500/50 active:bg-rose-500 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-rose-600/50 dark:active:bg-rose-600 transition-colors duration-200"
      title="View rejection reason">
      <MessageSquareX className="w-4 h-4 mr-1" />
      View reason
    </button>
  );
}
