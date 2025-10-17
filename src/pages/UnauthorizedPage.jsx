import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <section className="bg-white flex items-center h-screen dark:bg-gray-800">
      <div className="px-4 mx-auto max-w-screen-xl lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-500 dark:text-gray-400">
            401
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-500 md:text-4xl dark:text-gray-400">
            Unauthorized Access.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-500">
            Sorry, but you are not authorized to view to this page. No authentication was provided
          </p>
          <Link
            to="/login"
            className="inline-flex text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-rose-900 my-4">
            Login to Continue
          </Link>
        </div>
      </div>
    </section>
  );
}
