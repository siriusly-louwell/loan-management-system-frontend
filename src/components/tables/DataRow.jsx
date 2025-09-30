export default function DataRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between py-2">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span
        className={
          highlight
            ? "text-rose-600 dark:text-rose-500 font-bold"
            : "text-gray-900 dark:text-white font-semibold"
        }>
        {value}
      </span>
    </div>
  );
}
