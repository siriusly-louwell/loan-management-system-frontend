import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import CloseBttn from "../buttons/CloseBttn";
import { toggleModal } from "../../services/redux/slices/uiSlice";

export default function Dialog({ text, children, icon, modalName }) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);

  return modals[modalName] && (
    <div className="fixed top-0 left-0 right-0 z-50 p-20 bg-gray-500 dark:bg-gray-800 dark:bg-opacity-30 bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: [0.8, 1, 1], opacity: 1 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}>
          <div className="relative w-full h-auto max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border dark:border-gray-500">
              <div className="flex justify-right pt-1 pr-1">
                <CloseBttn
                  trigger={() =>
                    dispatch(
                      toggleModal({ name: modalName, value: modals[modalName] })
                    )
                  }
                />
              </div>
              <div className="p-6 text-center">
                {icon}
                <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-100">
                  {text}
                </h3>
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
