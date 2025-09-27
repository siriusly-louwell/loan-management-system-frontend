export default function ProfileHeader({
  name,
  gender,
  status,
  address,
  email,
  contact,
}) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-4">
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-primary-700 dark:text-white">
          LJ
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white truncate">
            {name}
          </h2>
          <div className="flex flex-wrap gap-2 items-center mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {gender}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
              {status}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {address}
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:gap-y-1 text-center sm:text-right">
          <span className="text-sm text-gray-500 font-medium dark:text-white">
            {email}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {contact}
          </span>
        </div>
      </div>
    </section>
  );
}
