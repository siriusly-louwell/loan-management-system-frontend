import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColor } from "../../services/redux/slices/formSlice";
import SelectColor from "../checkboxes/SelectColor";
import CloseBttn from "../buttons/CloseBttn";
import { AnimatePresence, motion } from "framer-motion";
import { toggleModal } from "../../services/redux/slices/uiSlice";

export default function ColorModal({ colors, onSelectColor }) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed bg-gray-400 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: [0.8, 1, 1], opacity: 1 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <div className="relative p-2 w-full max-w-xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 sm:py-4 border border-gray-500">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pick a Color:
                </h3>
                <CloseBttn
                  id="colorModal"
                  trigger={() =>
                    dispatch(
                      toggleModal({
                        name: "colorModal",
                        value: modals?.colorModal,
                      })
                    )
                  }
                />
              </div>
              <form>
                <section className="border-b border-gray-300">
                  <h4 className="text-md text-gray-900 dark:text-white">
                    Brand Colors:
                  </h4>
                  <SelectColor
                    size={6}
                    colors={colors}
                    changeColor={(e) => {
                      dispatch(
                        toggleModal({
                          name: "colorModal",
                          value: modals?.colorModal,
                        })
                      ); // update form slice (if used in other places)
                      dispatch(changeColor(e));

                      // update the colorGroups in parent
                      onSelectColor(e); // <-- THIS FIXES THE ISSUE
                    }}
                    colorType="ofc"
                  />
                </section>
                <section className="mt-3">
                  <h4 className="text-md text-gray-900 dark:text-white">
                    Non-brand Colors:
                  </h4>
                  <SelectColor
                    size={6}
                    colors={colors}
                    changeColor={(e) => {
                      dispatch(
                        toggleModal({
                          name: "colorModal",
                          value: modals?.colorModal,
                        })
                      ); // update form slice (if used in other places)
                      dispatch(changeColor(e));

                      // update the colorGroups in parent
                      onSelectColor(e); // <-- THIS FIXES THE ISSUE
                    }}
                  />
                </section>
              </form>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
