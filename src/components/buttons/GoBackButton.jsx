import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GoBackButton({ steps = -1 }) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full">
      <div className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-rose-500 dark:active:bg-rose-600">
        <ArrowLeft
          className="text-white size-7 rounded-lg cursor-pointer"
          onClick={() => navigate(steps)}
        />
      </div>
    </div>
  );
}
