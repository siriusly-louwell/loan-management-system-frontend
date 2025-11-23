import React, { useEffect, useRef, useState } from "react";
import CreateProduct from "./CreateProduct";
import InventoryTable from "../components/tables/InventoryTable";
import CRUDformat from "../components/CRUDformat";
import EditProduct from "./EditProduct";
import StockModal from "../components/modals/StockModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnits } from "../services/redux/slices/unitSlice";
import useDebounce from "../hooks/useDebounce";
import UnitFilter from "../components/filters/UnitFilter";
import ShowOptionModal from "../components/modals/showOptionModal";
import { useReactToPrint } from "react-to-print";
import InventoryPrint from "../components/InventoryPrint";
import { CSVLink } from "react-csv";
import { UnitEntities } from "../services/entities/Unit";

export default function Inventory() {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.unit);
  const units = useSelector(UnitEntities);
  const [navPage, setNavPage] = useState({});
  const search = useDebounce(navPage.search, 500);
  const min = useDebounce(navPage.min, 1000);
  const max = useDebounce(navPage.max, 500);

  const [showOption, setShowOption] = useState(false);
  const [printType, setPrintType] = useState(null);
  const [printMode, setPrintMode] = useState("pdf");

  // FILTER BASED ON PRINT TYPE for CSV Export
  const filteredUnits = (() => {
    switch (printType) {
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
  })();

  // Use Ref
  const printRef = useRef();
  const csvRef = useRef();
  // PRINT HANDLER
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Inventory Report - ${printType}`,
  });

  const generateCSV = (filteredUnits) => {
    const rows = filteredUnits.flatMap(unit =>
      unit.colors.map(color => ({
        model: unit.name,
        brand: unit.brand,
        color: color.hex_value,
        quantity: color.quantity,
        price: unit.price,
        total: unit.price * color.quantity
      }))
    );

    return rows;
  };

  const handleSelectOption = (type) => {
    setPrintType(type);
    setShowOption(false);

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
  };

  useEffect(() => {
    dispatch(
      fetchUnits({
        page: navPage.page,
        type: navPage.type,
        search: search,
        min: min,
        max: max,
      })
    );
  }, [dispatch, navPage.page, navPage.type, max, min, search]);

  const setPage = (obj) => setNavPage({ ...navPage, ...obj });

  return (
    <CRUDformat
      title="Motorcycle Inventory"
      label="Unit"
      itemName="units"
      setPage={setPage}
      pagination={pagination}
      modalName="createUnit"
      addModal={<CreateProduct />}
      // Added showOptionsModal to show options of printing
      showOptionsModal={() => setShowOption(true)}
      printMode={setPrintMode}
      filterComponent={<UnitFilter setPage={setPage} />}>
      <InventoryTable />
      
      <EditProduct />
      <StockModal />

      {/* ShowOptionModal */}
      <ShowOptionModal 
        open={showOption} 
        onClose={() => setShowOption(false)} 
        onSelect={handleSelectOption}
      />

      {/* Hidden Print Component */}
      <div className="hidden">
        <InventoryPrint ref={printRef} filterType={printType} />
      </div>
      <div className="hidden">
        <CSVLink
          data={generateCSV(filteredUnits)}
          headers={[
            { label: "Unit Model", key: "model" },
            { label: "Brand", key: "brand" },
            { label: "Color", key: "color" },
            { label: "Quantity", key: "quantity" },
            { label: "Unit Cost", key: "price" },
            { label: "Total Cost", key: "total" }
          ]}
          filename={`inventory_${printType}.csv`}
          className="hidden"
          ref={csvRef}
        >
          Download CSV
        </CSVLink>
      </div>

    </CRUDformat>
  );
}
