import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * Reusable Modal Component
 * Props:
 *  - open (bool)
 *  - onClose (fn)
 *  - title (string)
 *  - children (node)
 */

export default function AppModal({ open, onClose, title, children }) {

  // 

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>

          <motion.div
            className="bg-[#0F1A2A] text-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative border border-white/10 max-h-[90vh] overflow-y-scroll"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button type="button"
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="text-gray-300 text-sm leading-relaxed">
              {children}
            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}
