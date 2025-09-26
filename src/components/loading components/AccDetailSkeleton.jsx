export default function AccDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-pulse">
      {/* Avatar + name + status */}
      <div className="flex space-x-4 items-center">
        <div className="h-16 w-16 rounded-lg bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-6 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>

      {/* Credit score block */}
      <div className="flex items-center space-x-4">
        <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-6 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-5 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>

      {/* Salary / Co-maker / Contact / TIN / SSS / Email */}
      <div className="grid gap-4 sm:col-span-2 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>

      {/* Unit label */}
      <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>

      {/* Loan transactions */}
      <div className="divide-y grid sm:col-span-2 sm:grid-cols-2 divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600">
        <div className="flex items-center space-x-4 p-4">
          <div className="h-16 w-16 rounded-lg bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex flex-col space-y-2 flex-1">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
