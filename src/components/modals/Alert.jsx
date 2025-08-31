import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function Alert({ type = "success", message, isVisible }) {
  const icon =
    type == "success" ? (
      <CheckCircle size={24} />
    ) : type == "warn" ? (
      <AlertTriangle size={24} />
    ) : (
      <XCircle size={24} />
    );

  const bgColor =
    type == "success"
      ? "bg-green-500 border-green-500 text-green-50"
      : type == "warn"
      ? "bg-yellow-500 border-yellow-500 text-yellow-50"
      : "bg-red-500 border-red-500 text-red-50";

  return (
    <div className="fixed flex justify-center w-screen top-10">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center gap-3 p-4 rounded-2xl border ${bgColor} shadow-md max-w-md`}>
            {icon}
            <span className="font-medium">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
