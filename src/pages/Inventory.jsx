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

  async function adjustStock(type, id) {
    dispatch(setLoading({ text: "Fetching data...", isActive: true }));
    await dispatch(fetchUnit(id));
    dispatch(toggleModal({ name: "unitStock", value: modals?.unitStock }));
    dispatch(setLoading({ isActive: false }));

    // const response = await fetch(`http://localhost:8000/api/motorcycle/${id}`);

    // if (!response.ok) {
    //   throw new Error("Motorcycle not found");
    // }

    // const data = await response.json();
    // setStock({
    //   ...stock,
    //   id: data.id,
    //   modal: false,
    //   quantity: data.quantity,
    //   colors: data.colors,
    //   type: type,
    //   img: data.file_path,
    //   name: data.name,
    // });
  }

  return (
    <CRUDformat
      addModal={<CreateProduct />}
      modalId="createProduct"
      label="Unit"
      adjustStock={adjustStock}
      modal={stock.modal}>
      <InventoryTable
        adjustStock={adjustStock}
        stock={stock}
        setStock={setStock}
      />
      {modals?.editUnit && <EditProduct />}
      {modals?.unitStock && <StockModal setStock={setStock} stock={stock} />}
      {/* {stock.type !== "" && <StockModal setStock={setStock} stock={stock} />} */}
    </CRUDformat>
  );
}
