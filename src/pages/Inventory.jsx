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

export default function Inventory() {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.unit);
  const [navPage, setNavPage] = useState({});
  const search = useDebounce(navPage.search, 500);
  const min = useDebounce(navPage.min, 1000);
  const max = useDebounce(navPage.max, 500);

  const [showOption, setShowOption] = useState(false);
  const [printType, setPrintType] = useState(null);

  // Use Ref
  const printRef = useRef();
  // PRINT HANDLER
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Inventory Report - ${printType}`,
  });

  const handleSelectOption = (type) => {
    setPrintType(type);
    setShowOption(false);

    // wait for component to update then print
    setTimeout(() => handlePrint(), 100);
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

    </CRUDformat>
  );
}
