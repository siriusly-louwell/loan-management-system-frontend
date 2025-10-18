import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../services/redux/slices/uiSlice";

export default function TextDialog({ title, content }) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);

  return (
    <AnimatePresence>
      {modals.reasonDialog && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className="relative w-full max-w-lg bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}>
            <button
              onClick={() =>
                dispatch(
                  toggleModal({
                    name: "reasonDialog",
                    value: modals.reasonDialog,
                  })
                )
              }
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {title}
            </h2>

            <div className="max-h-[60vh] overflow-y-auto text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {content || (
                <p className="italic text-gray-400">
                  No information available.
                </p>
              )}
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={() =>
                  dispatch(
                    toggleModal({
                      name: "reasonDialog",
                      value: modals.reasonDialog,
                    })
                  )
                }
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
