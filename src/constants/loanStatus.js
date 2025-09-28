const STATUS_STYLES = {
  done: {
    check: "text-green-100 dark:text-green-900",
    label: "text-green-600 dark:text-green-500",
    span: "text-green-600 dark:text-green-600",
    bg: "bg-green-500 dark:bg-green-600",
  },
  current: {
    check: "text-blue-500 dark:text-gray-800",
    label: "text-blue-700 dark:text-blue-500",
    span: "text-blue-700 dark:text-blue-500",
    bg: "bg-gray-100 dark:bg-gray-500",
  },
  deny: {
    check: "text-red-600 dark:text-red-400",
    label: "text-red-500 dark:text-white",
    span: "text-red-500 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-700",
  },
  pend: {
    check: "text-gray-600 dark:text-gray-400",
    label: "text-gray-900 dark:text-white",
    span: "text-gray-500 dark:text-gray-400",
    bg: "bg-gray-100 dark:bg-gray-700",
  },
};

export const STATUS_MAP = {
  accept: {
    denied: STATUS_STYLES.deny,
    accepted: STATUS_STYLES.done,
    evaluated: STATUS_STYLES.done,
    approved: STATUS_STYLES.done,
    declined: STATUS_STYLES.done,
    payment: STATUS_STYLES.done,
    pending: STATUS_STYLES.current,
    default: STATUS_STYLES.pend,
  },
  investigation: {
    evaluated: STATUS_STYLES.done,
    approved: STATUS_STYLES.done,
    declined: STATUS_STYLES.done,
    payment: STATUS_STYLES.done,
    accepted: STATUS_STYLES.current,
    default: STATUS_STYLES.pend,
  },
  approve: {
    declined: STATUS_STYLES.deny,
    approved: STATUS_STYLES.done,
    payment: STATUS_STYLES.done,
    evaluated: STATUS_STYLES.current,
    default: STATUS_STYLES.pend,
  },
  payment: {
    payment: STATUS_STYLES.done,
    approved: STATUS_STYLES.current,
    default: STATUS_STYLES.pend,
  },
};
