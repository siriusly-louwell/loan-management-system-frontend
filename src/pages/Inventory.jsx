import React, { useState, useEffect } from "react";
import CreateProduct from "./CreateProduct";
import InventoryTable from "../components/tables/InventoryTable";
import CRUDformat from "../components/CRUDformat";
import EditProduct from "./EditProduct";
import StockModal from "../components/modals/StockModal";
import { useDispatch, useSelector } from "react-redux";
import { initialForm } from "../services/redux/slices/formSlice";
import { fetchUnits } from "../services/redux/slices/unitSlice";

export default function Inventory() {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);
  const [stock, setStock] = useState({ type: "", modal: false });

  useEffect(() => {
    dispatch(initialForm({ quantity: [1] }));
  }, []);

  useEffect(() => {
    dispatch(fetchUnits());
  }, [dispatch]);

  return (
    <CRUDformat
      addModal={<CreateProduct />}
      modalId="createProduct"
      label="Unit"
      modal={stock.modal}>
      <InventoryTable
        stock={stock}
        setStock={setStock}
      />
      {modals?.editUnit && <EditProduct />}
      {modals?.unitStock && <StockModal setStock={setStock} stock={stock} />}
    </CRUDformat>
  );
}
