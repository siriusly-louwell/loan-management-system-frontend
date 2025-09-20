import React, { useEffect } from "react";
import CreateProduct from "./CreateProduct";
import InventoryTable from "../components/tables/InventoryTable";
import CRUDformat from "../components/CRUDformat";
import EditProduct from "./EditProduct";
import StockModal from "../components/modals/StockModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnits } from "../services/redux/slices/unitSlice";
import PageNav from "../components/PageNav";

export default function Inventory() {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);
  const { pagination } = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(fetchUnits(1));
  }, [dispatch]);

  const changePage = (_, page) => {
    dispatch(fetchUnits(page));
  };

  return (
    <CRUDformat
      label="Unit"
      addModal={<CreateProduct />}
      pageNav={<PageNav pagination={pagination} changePage={changePage} />}>
      <InventoryTable />
      {modals?.editUnit && <EditProduct />}
      {modals?.unitStock && <StockModal />}
    </CRUDformat>
  );
}
