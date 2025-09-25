export default function InvoiceRowSkeleton({ num = 1 }) {
  return [...Array(num)].map((_, i) => (
    <div key={i} className="flex flex-wrap items-center gap-y-4 py-6 animate-pulse">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Date:
        </dt>
        <dd className="mt-1.5">
          <div className="h-4 w-24 bg-gray-300 rounded dark:bg-gray-600"></div>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Name:
        </dt>
        <dd className="mt-1.5">
          <div className="h-4 w-32 bg-gray-300 rounded dark:bg-gray-600"></div>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Amount:
        </dt>
        <dd className="mt-1.5">
          <div className="h-4 w-20 bg-gray-300 rounded dark:bg-gray-600"></div>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Record ID:
        </dt>
        <dd className="mt-1.5">
          <div className="h-4 w-28 bg-gray-300 rounded dark:bg-gray-600"></div>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Status:
        </dt>
        <dd className="mt-1.5">
          <div className="h-6 w-16 bg-gray-300 rounded-full dark:bg-gray-600"></div>
        </dd>
      </dl>

      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
        <div className="h-10 w-full bg-gray-300 rounded-lg dark:bg-gray-600"></div>
      </div>
    </div>
  ));
}
