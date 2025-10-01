import CustomBadge from "../badges/CustomBadge";

export default function InvoiceRow({ data }) {
  return (
    <div className="flex flex-wrap items-center gap-y-4 py-6">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Date:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          {data.date}
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Record ID:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          {data.id}
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Amount:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-green-600 dark:text-green-400">
          {data.amount}
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Certificate #:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          {data.cert_num}
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Status:
        </dt>
        <dd className="mt-1.5">
          <CustomBadge text="On Time" color="green" />
        </dd>
      </dl>
      <div className="w-full sm:w-auto flex justify-end mt-4 sm:mt-0">
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          View Invoice
        </button>
      </div>
    </div>
  );
}
