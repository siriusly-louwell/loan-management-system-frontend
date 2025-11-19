import CustomBttn from "../buttons/CustomBttn";
import { FileSearch } from "lucide-react";

export default function LargeBadge({ type, subtext = true, loanId, role, onViewDetails }) { 
  let color;

  switch (type) {
    case "eligible":
      color = "blue";
      break;
    case "passed":
    case "approval":
      color = "green";
      break;
    case "review":
      color = "yellow";
      break;
    case "not_eligible":
      color = "orange";
      break;
    default:
      color = "red";
      break;
  }

  return (
    <div
      className={`flex flex-col space-y-2 items-center justify-center w-full my-5 rounded-lg bg-${color}-100 px-20 py-4 text-2xl text-${color}-700 dark:bg-${color}-600/30 dark:text-${color}-100`}>
      <h3 className="font-bold">
        {type === "review"
          ? "Manual Review"
          : type === "not_eligible"
          ? "Not Eligible"
          : type.charAt(0).toUpperCase() + type.slice(1)}
      </h3>
      {subtext && (
        <span
          className={`text-sm font-small text-${color}-600 dark:text-${color}-200`}>
          {type === "eligible" || type === "passed"
            ? "The applicant is eligible to take the loan"
            : type === "not_eligible" || type === "reject"
            ? "The applicant is not eligible to take the loan"
            : "The application needs to be manually reviewed"}
        </span>
      )}
      <CustomBttn
        text="Click to show details"
        onclick={() => {
          if (onViewDetails) onViewDetails(role, loanId);
        }}
        classname="inline-flex items-center gap-2 px-4 text-sm py-2 font-medium text-white bg-rose-600 border border-rose-600 rounded-lg hover:bg-rose-500 dark:bg-rose-600 dark:border-rose-500 dark:hover:bg-rose-700 transition-colors duration-200"
        icon={<FileSearch size={18} className="text-white" />}
      />
    </div>
  );
}
