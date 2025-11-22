/*
    Para reusable siya if ever man mag by day, week, month, or year 
    ang developer

    dire pud ang generateCSV for Inventory, idk akoa rasad, murag lahi sad na work ang
    tong sa Loans, pero hopefully maapply pati sa Loans
*/
import { LoanDateHelper } from "./loanDateHelper";

// Para sa loan
export function filterLoanSwitch(type, loans) {
  return loans.filter((loan) => {
    const loanDate = new LoanDateHelper(loan);

    switch (type) {
      case "daily":
        return loanDate.isToday();
      case "weekly":
        return loanDate.isThisWeek();
      case "monthly":
        return loanDate.isThisMonth();
      case "yearly":
        return loanDate.isThisYear();
      default:
        return true;
    }
  });
}
// Para sa inventory
export function filterUnitSwitch(type, units){
    switch (type) {
      case "daily":
        return units.filter(u => u.isCreatedToday());
      case "weekly":
        return units.filter(u => u.isCreatedThisWeek());
      case "monthly":
        return units.filter(u => u.isCreatedThisMonth());
      case "yearly":
        return units.filter(u => u.isCreatedThisYear());
      default:
        return units;
    }
}

export function generateCSV(units){
    const rows = units.flatMap(unit =>
      unit.colors.map(color => ({
        model: unit.name,
        brand: unit.brand,
        color: color.hex_value,
        quantity: color.quantity,
        price: unit.price,
        total: unit.price * color.quantity,
      }))
    );
    // Add tag totalRow para sa total cost sa mga units
    // gi push nato para dli ma map and ma duplicate ang cost
    const totalRow = totalInventoryCost(units)
    rows.push({
      ...rows, total_inventory_cost: totalRow
    })
    return rows;
}

export function handleSelectOptionHelper({
  type,
  setPrintType,
  setShowOption,
  printMode,
  handlePrint,
  csvRef,
}){
  setPrintType(type);
  setShowOption(false)

  // wait for component to update then print
  if (printMode === "pdf") {
    // wait for component to render then print
    setTimeout(() => handlePrint(), 100);
  }

  // CSV MODE
  if (printMode === "csv") {
    setTimeout(() => {
      if (csvRef.current) {
        csvRef.current.link.click();
      }
    }, 100);
  }
}

export function totalInventoryCost(units){
  const totalCostOfInventory = units.reduce((unitAcc, unit) => {
    const colorValue = unit.colors.reduce((colorAcc, color) => {
      return colorAcc + (color.quantity * unit.price);
    }, 0);

    return unitAcc + colorValue;
  }, 0)

  return totalCostOfInventory;
}