import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../../services/redux/slices/uiSlice";

export default function Alert() {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state.ui);
  let icon;
  let bgColor;

  switch (alert.type) {
    case "success":
      icon = <CheckCircle size={24} />;
      break;
    case "error":
      icon = <XCircle size={24} />;
      break;
    case "warn":
      icon = <AlertTriangle size={24} />;
      break;
    default:
      icon = <Info size={24} />;
  }

    switch (alert.type) {
    case "success":
      bgColor = "bg-green-500 border-green-500 text-green-50";
      break;
    case "error":
      bgColor = "bg-red-500 border-red-500 text-red-50";
      break;
    case "warn":
      bgColor = "bg-yellow-500 border-yellow-500 text-yellow-50";
      break;
    default:
      bgColor = "bg-blue-500 border-blue-500 text-blue-50";
  }

  useEffect(() => {
    if (alert.toggle) {
      const timer = setTimeout(() => dispatch(clearAlert()), 2000);
      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  return (
    <div className="fixed z-50 flex justify-center w-screen top-5">
      <AnimatePresence>
        {alert.toggle && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: alert.duration }}
            className={`flex items-center gap-3 p-3 rounded-2xl border ${bgColor} shadow-md max-w-md`}>
            {icon}
            <span className="font-medium">{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
