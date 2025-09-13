export default function RowSkeleton({ count }) {
  return (
    <tr className="border-b dark:border-gray-600">
      <td className="px-4 py-6 w-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 rounded dark:bg-gray-600 animate-pulse"></div>
        </div>
      </td>
      {[...Array(count)].map((_, i) => (
        <td key={i} className="px-4 py-3 whitespace-nowrap">
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 animate-pulse w-24"></div>
        </td>
      ))}
    </tr>
  );
}
