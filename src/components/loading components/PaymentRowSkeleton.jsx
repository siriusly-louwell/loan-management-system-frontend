export default function PaymentRowSkeleton({ num }) {
  return [...Array(num)].map((_, i) => (
    <div
      key={i}
      className="flex flex-wrap items-center gap-y-4 py-6 animate-pulse">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Date:
        </dt>
        <dd className="mt-1.5 h-5 w-24 rounded bg-gray-200 dark:bg-gray-700"></dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Record ID:
        </dt>
        <dd className="mt-1.5 h-5 w-20 rounded bg-gray-200 dark:bg-gray-700"></dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Amount:
        </dt>
        <dd className="mt-1.5 h-5 w-28 rounded bg-gray-200 dark:bg-gray-700"></dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Current Balance:
        </dt>
        <dd className="mt-1.5 h-5 w-28 rounded bg-gray-200 dark:bg-gray-700"></dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Reference #:
        </dt>
        <dd className="mt-1.5 h-5 w-24 rounded bg-gray-200 dark:bg-gray-700"></dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Status:
        </dt>
        <dd className="mt-1.5 h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></dd>
      </dl>

      <div className="w-full sm:w-auto flex justify-end mt-4 sm:mt-0">
        <div className="h-9 w-28 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  ));
}
