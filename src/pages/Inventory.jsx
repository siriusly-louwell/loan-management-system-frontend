import React, { useState, useEffect } from "react";
import CreateProduct from "./CreateProduct";
import InventoryTable from "../components/tables/InventoryTable";
import CRUDformat from "../components/CRUDformat";
import EditProduct from "./EditProduct";
import StockModal from "../components/modals/StockModal";
import { useDispatch, useSelector } from "react-redux";
import { initialForm } from "../services/redux/slices/formSlice";
import { fetchUnit, fetchUnits } from "../services/redux/slices/unitSlice";
import { setLoading, toggleModal } from "../services/redux/slices/uiSlice";

export default function Inventory() {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);
  const [stock, setStock] = useState({ type: "", modal: false });

  useEffect(() => {
    dispatch(initialForm({ quantity: [1] }));
  }, []);

  useEffect(() => {
    dispatch(fetchUnits());
  }, []);

  async function editMotor(id) {
    dispatch(setLoading({ text: "Fetching data...", isActive: true }));
    await dispatch(fetchUnit(id));
    dispatch(toggleModal({ name: "editUnit", value: modals?.editUnit }));
    dispatch(setLoading({ isActive: false }));
  }

  async function adjustStock(type, id) {
    const response = await fetch(`http://localhost:8000/api/motorcycle/${id}`);

    if (!response.ok) {
      throw new Error("Motorcycle not found");
    }

    const data = await response.json();
    setStock({
      ...stock,
      id: data.id,
      modal: false,
      quantity: data.quantity,
      colors: data.colors,
      type: type,
      img: data.file_path,
      name: data.name,
    });
  }

  return (
    <CRUDformat
      addModal={<CreateProduct />}
      modalId="createProduct"
      label="Unit"
      adjustStock={adjustStock}
      modal={stock.modal}>
      <InventoryTable
        // loading={loading}
        adjustStock={adjustStock}
        editMotor={editMotor}
        stock={stock}
        setStock={setStock}
      />
      {modals?.editUnit && <EditProduct />}
      {stock.type !== "" && <StockModal setStock={setStock} stock={stock} />}
    </CRUDformat>
  );
}
