import { CheckCircle, Circle } from "lucide-react";

export default function PasswordRequirements({ rules }) {
  return (
    <div className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-1">
      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
        Password Requirements
      </h4>

      <ul className="space-y-2">
        {rules.map((rule, i) => {
          const Icon = rule.isValid ? CheckCircle : Circle;

          return (
            <li
              key={i}
              className={`flex items-center gap-2 text-sm transition-colors ${
                rule.isValid
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}>
              <Icon
                size={18}
                strokeWidth={rule.isValid ? 2 : 1.5}
                className={`transition-all ${
                  rule.isValid ? "text-green-500" : "text-gray-400"
                }`}
              />
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
