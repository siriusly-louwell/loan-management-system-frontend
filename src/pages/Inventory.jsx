import React, { useState, useEffect } from "react";
import CreateProduct from "./CreateProduct";
import InventoryTable from "../components/tables/InventoryTable";
import CRUDformat from "../components/CRUDformat";
import EditProduct from "./EditProduct";
import StockModal from "../components/modals/StockModal";
import { useDispatch } from "react-redux";
import { initialForm } from "../services/redux/slices/formSlice";
import { fetchUnits } from "../services/redux/slices/unitSlice";

export default function Inventory() {
  const dispatch = useDispatch();
  const [row, setRow] = useState({});
  const [stock, setStock] = useState({ type: "", modal: false });

  useEffect(() => {
    dispatch(initialForm({ quantity: [1] }));
  }, []);

  useEffect(() => {
    dispatch(fetchUnits());
  }, []);

  async function editMotor(id) {
    const response = await fetch("http://localhost:8000/api/motorcycle/" + id);

    if (!response.ok) {
      throw new Error("Motorcycle not found");
    }

    const data = await response.json();
    setRow({ motor: data, bool: true });
    // document.getElementById('editProduct').style.display = 'block';
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
      {row.bool && (
        <EditProduct
          motor={Object.keys(row.motor).length > 0 ? row.motor : {}}
        />
      )}
      {stock.type !== "" && <StockModal setStock={setStock} stock={stock} />}
    </CRUDformat>
  );
}
