import ColorLabel from "../ColorLabel";

export default function CategoryCard({ title, status, children, result }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-500">
      <div className="flex items-center gap-3 mb-4">
        <ColorLabel style={status || ""} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="space-y-4">
        {children}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Result
          </h4>
          <div
            className={`p-4 rounded-md bg-${status}-100 dark:bg-${status}-600/20`}>
            <h5
              className={`font-semibold text-${status}-700 dark:text-${status}-400 mb-1`}>
              {result.label}
            </h5>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {result.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {result.suggestion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
