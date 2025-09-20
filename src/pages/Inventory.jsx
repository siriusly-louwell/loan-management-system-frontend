import React, { useEffect, useState } from "react";
import CreateProduct from "./CreateProduct";
import InventoryTable from "../components/tables/InventoryTable";
import CRUDformat from "../components/CRUDformat";
import EditProduct from "./EditProduct";
import StockModal from "../components/modals/StockModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnits } from "../services/redux/slices/unitSlice";
import useDebounce from "../hooks/useDebounce";

export default function Inventory() {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);
  const [navPage, setNavPage] = useState({ search: "" });
  const debounce = useDebounce(navPage.search, 500);

  useEffect(() => {
    dispatch(fetchUnits({ ...navPage, search: debounce }));
  }, [dispatch, navPage.page, debounce]);

  const setPage = (obj) => setNavPage({ ...navPage, ...obj });

  return (
    <CRUDformat label="Unit" setPage={setPage} addModal={<CreateProduct />}>
      <InventoryTable />
      {modals?.editUnit && <EditProduct />}
      {modals?.unitStock && <StockModal />}
    </CRUDformat>
  );
}
