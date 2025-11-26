import { Link } from "react-router-dom";
import CustomBadge from "../badges/CustomBadge";
import { useSelector } from "react-redux";
import { UserEntity } from "../../services/entities/User";

export default function InvoiceRow({ data, click }) {
  const { role } = useSelector(UserEntity);

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
          Current Balance:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-blue-600 dark:text-blue-600">
          {data.balance}
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Reference #:
        </dt>
        <dd className="mt-2.5 text-sm font-semibold text-gray-900 dark:text-white">
          {data.cert_num}
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Status:
        </dt>
        <dd className="mt-1.5">
          <CustomBadge text={data.status[0]} color={data.status[1]} />
        </dd>
      </dl>
      <div className="w-full sm:w-auto flex justify-end mt-4 sm:mt-0">
        <Link
          onClick={click}
          to={`/${role}/invoice`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-rose-600 text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400">
          View Invoice
        </Link>
      </div>
    </div>
  );
}
