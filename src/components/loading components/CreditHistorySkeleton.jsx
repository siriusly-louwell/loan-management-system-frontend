export default function CreditHistorySkeleton({ num }) {
  return [...Array(num)].map((_, i) => (
    <div
      key={i}
      className="flex flex-wrap items-center gap-y-4 py-6 animate-pulse">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Due Date:
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
          Customer Name:
        </dt>
        <dd className="mt-1.5 h-5 w-24 rounded bg-gray-200 dark:bg-gray-700"></dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Amount:
        </dt>
        <dd className="mt-1.5 h-5 w-28 rounded bg-gray-200 dark:bg-gray-700"></dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Paid Date:
        </dt>
        <dd className="mt-1.5 h-5 w-24 rounded bg-gray-200 dark:bg-gray-700"></dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Status:
        </dt>
        <dd className="mt-1.5 h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></dd>
      </dl>
    </div>
  ));
}
