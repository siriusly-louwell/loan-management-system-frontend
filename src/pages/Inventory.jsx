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
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import { UnitEntities } from "../services/entities/Unit";

// Added showOptionModal for showing different time options
// and InventoryPrint for PDF
// Importing filterUnitSwitch for reusable na component
import ShowOptionModal from "../components/modals/showOptionModal";
import InventoryPrint from "../components/InventoryPrint";
import { filterUnitSwitch, generateCSV, handleSelectOptionHelper, totalInventoryCost } from "../utils/exportHelper";


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
  const filteredUnits = filterUnitSwitch(printType, units);

  // Use Ref
  const printRef = useRef();
  const csvRef = useRef();
  // PRINT HANDLER
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Inventory Report - ${printType}`,
  });

  const handleSelectOption = (type) => {
    handleSelectOptionHelper({
      type,
      setPrintType,
      setShowOption,
      printMode,
      handlePrint,
      csvRef
    });
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
      // Added printMode para maka differentiate if pdf ba or csv
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
      {/* Kani nga component, built-in ni siya sa react-csv */}
      <CSVLink
        data={generateCSV(filteredUnits)}
        headers={[
          { label: "Unit Model", key: "model" },
          { label: "Brand", key: "brand" },
          { label: "Color", key: "color" },
          { label: "Quantity", key: "quantity" },
          { label: "Unit Cost", key: "price" },
          { label: "Total Cost", key: "total" },
          { label: "Total Inventory Cost", key: "total_inventory_cost"}
        ]}
        filename={`inventory_${printType}.csv`}
        className="hidden"
        ref={csvRef}
      >
        Download CSV
      </CSVLink>

    </CRUDformat>
  );
}
