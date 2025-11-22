import { FolderOpen } from "lucide-react";

export default function EmptyRow({ label }) {
  return (
    <div className="flex w-full py-4 justify-center items-center gap-2 bg-white dark:bg-gray-700 shadow-sm rounded-lg text-gray-500">
      <FolderOpen className="w-7 h-7" strokeWidth={1.5} />
      <p className="text-md font-medium">{label}</p>
    </div>
  );
}
