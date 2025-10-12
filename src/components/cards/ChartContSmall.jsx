export default function ChartContSmall({ title, count, subtitle, children }) {
  return (
    <div className="max-w-full bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 mb-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {count && (
            <div className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
              {count}
            </div>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>

      <div className="min-h-[200px] w-full overflow-x-auto">{children}</div>
    </div>
  );
}
