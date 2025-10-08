export default function InfoCardSkeleton({ num = 3 }) {
  return [...Array(num)].map((_, i) => (
    <div
      key={i}
      className="bg-white dark:bg-gray-700 shadow rounded-lg p-4 sm:p-6 xl:p-8 animate-pulse">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-500 rounded" />
        </div>
        <div className="ml-5 flex items-center justify-end flex-1 space-x-2">
          <div className="h-5 w-10 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>
  ));
}
