import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UnitEntities } from "../services/entities/Unit";
import RMCI from "../assets/images/RMCI.png";
import { filterUnitSwitch, totalInventoryCost } from "../utils/exportHelper";

const InventoryPrint = React.forwardRef(({ filterType }, ref) => {
  const units = useSelector(UnitEntities);
  const dateString = new Date().toISOString().slice(0, 10);
  // Added reusable code
  const filteredUnits = filterUnitSwitch(filterType, units);
  // Total quantity of all units (optional)
  const totalQty = filteredUnits.reduce((acc, unit) => acc + unit.quantity, 0);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  };
  // Total inventory value (correct calculation)
  const totalInvValue = totalInventoryCost(filteredUnits);

  return (
    <div ref={ref} className="p-4 bg-white w-full">
      <div className="mb-5 pb-5 flex flex-col justify-between items-start border-b border-rose-500 dark:border-rose-500">
        <div>
          <img src={RMCI} className="h-8 rmci" alt="Rhean Motor Logo" />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Motorcycle Inventory Report ({filterType})</h3>
        </div>
        <div>
          <p><span className="font-bold">Date:</span> {dateString}</p>
        </div>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Unit Model</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Color</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Unit Cost</th>
            <th className="border p-2">Total Cost</th>
          </tr>
        </thead>

        <tbody>
          {filteredUnits.map(unit => (
            unit.colors.map((color) => (
              <tr key={`${unit.id}-${color.id}`}>
                <td className="border p-2">{unit.name}</td>
                <td className="border p-2">{unit.brand}</td>
                <td className="border p-2">
                  {color.hex_value}
                </td>
                <td className="border p-2">{color.quantity}</td>
                <td className="border p-2">₱{unit.price}</td>
                <td className="border p-2">₱{unit.price * color.quantity}</td>
              </tr>
            ))
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td className="border p-2 font-bold" colSpan={3}>
              Total Units in Inventory: {totalQty}
            </td>
            <td className="border p-2 font-bold" colSpan={3}>
              Total Inventory Value: {formatCurrency(totalInvValue)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

export default InventoryPrint;
