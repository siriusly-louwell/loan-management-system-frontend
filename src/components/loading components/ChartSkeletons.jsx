export function AreaChartSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[320px] w-full flex flex-col justify-between">
        {/* Y-axis ticks */}
        <div className="relative h-full">
          <div className="absolute left-0 w-8 h-full flex flex-col justify-between py-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-2 w-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
          
          {/* Chart area skeleton */}
          <div className="ml-10 h-full flex items-end">
            <div className="w-full h-3/4 bg-gradient-to-t from-blue-100 to-transparent dark:from-blue-900 rounded-lg"></div>
          </div>
        </div>

        {/* X-axis ticks */}
        <div className="flex justify-between mt-2 px-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-2 w-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BarChartSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[200px] w-full flex">
        {/* Y-axis ticks */}
        <div className="w-12 h-full flex flex-col justify-between py-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-2 w-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
          ))}
        </div>

        {/* Bars skeleton */}
        <div className="flex-1 flex flex-col justify-between">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-2 h-4">
              <div className="w-3/4 bg-green-100 dark:bg-green-500 rounded"></div>
              <div className="w-1/4 bg-red-100 dark:bg-red-500 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DonutChartSkeleton() {
  return (
    <div className="animate-pulse flex justify-center items-center h-[320px]">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-600"></div>
        {/* Inner circle (donut hole) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white dark:bg-gray-700"></div>
      </div>
    </div>
  );
}