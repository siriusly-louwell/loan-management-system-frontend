import { AnimatePresence, motion } from "framer-motion";

export default function PopAnimate({
  classStyle,
  overflow = false,
  modalName,
  children,
}) {
  const center = !overflow && "items-center";

  return (
    <AnimatePresence>
      {modalName && (
        <motion.div
          className={`fixed inset-0 z-40 overflow-y-auto flex ${center} justify-center bg-gray-500/50 dark:bg-gray-800/50 backdrop-blur-sm p-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className={classStyle}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
