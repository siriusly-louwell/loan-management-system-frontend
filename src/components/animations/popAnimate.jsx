import { AnimatePresence, motion } from "framer-motion";

export default function PopAnimate({ children }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.8, opacity: 1 }}
        animate={{ scale: [0.8, 1, 1], opacity: 1 }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
