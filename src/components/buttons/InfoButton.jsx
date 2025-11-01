import { Info } from "lucide-react";

export default function InfoButton({ click }) {
  return (
    <button
      onClick={click}
      aria-label="Show legend"
      className="p-1 rounded-full text-gray-500 hover:text-gray-700 active:text-rose-500 dark:text-gray-400 dark:hover:text-gray-200 dark:active:text-rose-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center">
      <Info size={22} strokeWidth={2} />
    </button>
  );
}
