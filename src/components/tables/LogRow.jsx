import React from "react";
import { Link } from "react-router-dom";
import BasicButton from "../buttons/BasicBttn";

export default function LogRow({
  id,
  date,
  badge,
  name,
  path,
  bttnText,
  state,
  amount,
}) {
  return (
    <div className="flex flex-wrap items-center gap-y-4 py-6">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Date:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          {date}
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Name:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          <a className="hover:underline">{name}</a>
        </dd>
      </dl>

      {amount && (
        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
            Amount:
          </dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
            <a className="hover:underline">
              ₱{parseFloat(amount).toLocaleString()}
            </a>
          </dd>
        </dl>
      )}

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          {amount ? "Certificate Number" : "Record ID"}:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          <a className="hover:underline">{id}</a>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Status:
        </dt>
        {badge}
      </dl>

      <Link
        to={path}
        state={{ id: state }}
        className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
        <BasicButton text={bttnText} />
      </Link>
    </div>
  );
}
