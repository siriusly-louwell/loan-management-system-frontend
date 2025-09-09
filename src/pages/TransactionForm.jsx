import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import TransactionFormat from "../components/TransactionFormat";
import SmallLabel from "../components/texts/SmallLabel";
import SmallSpin from "../components/loading components/SmallSpin";
import QuantityInput from "../components/buttons/QuantityInput";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import SelectColor from "../components/checkboxes/SelectColor";
import { useDispatch, useSelector } from "react-redux";
import { UnitEntity } from "../services/entities/Unit";
import {
  handleChange,
  initialForm,
  setType,
} from "../services/redux/slices/formSlice";
import { fetchUnit } from "../services/redux/slices/unitSlice";

export default function TransactionForm() {
  const {
    dispatchInput,
    ids,
    handleTransaction,
    transactForm,
    handleTransForm,
    setTransactForm,
    selectColor,
  } = useOutletContext();
  const dispatch = useDispatch();
  const { formData, formType } = useSelector((state) => state.form);
  const unit = useSelector(UnitEntity);
  const [transLoad, setTransLoad] = useState(true);
  // const [transact, setTransact] = useState([]);
  // const [colors, setColors] = useState("");
  // const [downPayment, setDownPayment] = useState([]);

  function changeColor(newColor) {
    dispatch(
      handleChange({ name: "color", value: newColor, formType: formType })
    );

    // handleTransForm(i, newColor, "color");
  }

  useEffect(() => {
    dispatch(fetchUnit());
    dispatch(setType("unit"));
    dispatch(
      initialForm({
        motorcycle_id: unit.id,
        color: unit.colors !== undefined ? unit.colors[0].color : "",
        downpayment: unit.downpayment,
        quantity: 1,
      })
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTransLoad(false);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/motorcycle/", {
  //       params: { ids: ids },
  //     })
  //     .then((response) => {
  //       setTransact(response.data);
  //       setTransLoad(false);
  //       setColors((prev) => {
  //         const updated = [...prev];
  //         updated[selectColor[0]] = selectColor[1];
  //         return updated;
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //       setTransLoad(true);
  //     });
  // }, [ids]);

  // useEffect(() => {
  //   const payments = transact.map((trans) => trans.downpayment);
  //   setDownPayment(payments);
  // }, [transact]);

  // function handleDown(i, downpayment) {
  //   setDownPayment((prev) => {
  //     const updated = [...prev];
  //     updated[i] = downpayment;
  //     return updated;
  //   });

  //   handleTransForm(i, downpayment, "downpayment");
  // }

  // function dispatchInput(event) {
  //   dispatch(
  //     handleChange({ name: event.target.name, value: event.target.value })
  //   );
  // }

  function dispatchQuantity(value) {
    dispatch(handleChange({ name: "quantity", value: value }));
  }

  // useEffect(() => {
  //   const initializedForm = transact.map((t, i) => ({
  //     motorcycle_id: t.id,
  //     downpayment: t.downpayment,
  //     quantity: 1,
  //   }));

  //   setTransactForm(initializedForm);
  // }, [transact]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     handleTransForm(selectColor[0], selectColor[1], "color");
  //   }, 2000);
  // }, [colors]);

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Loan Customization:
      </h3>
      {transLoad ? (
        <>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <div className="sm:items-center gap-4 flex">
              <p className="h-8 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse w-80 mb-4"></p>
            </div>

            <div className="grid grid-cols-2 w-fit gap-x-5 sm:grid-cols-4 my-2">
              <SmallLabel
                label="Annual Interest"
                text={<SmallSpin size={20} />}
              />
              <SmallLabel label="Rebate" text={<SmallSpin size={20} />} />
              <SmallLabel label="Loan Tenure" text={<SmallSpin size={20} />} />
              <SmallLabel label="Stock" text={<SmallSpin size={20} />} />
            </div>

            <div className="flex py-5 border-b border-gray-400 dark:border-gray-600 items-center space-x-4 mb-5">
              <div className="grid lg:grid-cols-2 gap-x-5 gap-y-4">
                <SmallSpin size={30} />
                <p className="h-8 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse w-40 mb-4"></p>
                {/* <QuantityInput label="Quantity" /> */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700 dark:text-gray-200">
                      Downpayment
                    </h3>
                    <h3 className="font-medium text-gray-700 flex gap-x-2 dark:text-gray-200">
                      Minimum Payment: <SmallSpin size={20} />
                    </h3>
                  </div>
                  <FormInput
                    type="number"
                    placeholder="Input downpayment here"
                    onchange={() => {}}
                  />
                </div>
                <FormSelect name="tenure" label="Loan Years">
                  <option>Loading...</option>
                </FormSelect>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <div className="sm:items-center gap-4 flex">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                {unit.name} ({unit.brand}) -{" "}
              </h1>
              <p className="text-2xl font-extrabold text-rose-600 sm:text-3xl dark:text-rose-500">
                ₱{parseFloat(unit.price).toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 w-fit gap-x-5 sm:grid-cols-4 my-2">
              <SmallLabel label="Annual Interest" text={`${unit.interest}%`} />
              <SmallLabel
                label="Rebate"
                text={`₱${parseFloat(unit.rebate).toLocaleString()}`}
              />
              <SmallLabel label="Loan Tenure" text={`${unit.tenure} years`} />
              <SmallLabel label="Stock" text={`${unit.quantity} units`} />
            </div>

            <div className="flex py-5 border-b border-gray-400 dark:border-gray-600 items-center space-x-4 mb-5">
              <div className="grid lg:grid-cols-2 gap-x-5 gap-y-4">
                <SelectColor
                  text="Select Color:"
                  size={6}
                  colors={formData[formType].color}
                  changeColor={changeColor}
                  index={5}
                  arr={unit.colors}
                />
                <QuantityInput
                  label="Quantity"
                  max={unit.quantity}
                  index={0}
                  quantType="application"
                  change={(val) => dispatchQuantity(val)}
                  require={true}
                />
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700 dark:text-gray-200">
                      Downpayment
                    </h3>
                    <h3 className="font-medium text-gray-700 flex gap-x-2 dark:text-gray-200">
                      Minimum Payment:{" "}
                      <span className="font-bold text-rose-600">
                        ₱{parseFloat(unit.downpayment).toLocaleString()}
                      </span>
                    </h3>
                  </div>
                  <FormInput
                    type="number"
                    value={formData[formType].downpayment}
                    name="downpayment"
                    onchange={(e) => dispatchInput(e)}
                    // onchange={(e) => handleDown(5, Number(e.target.value))}
                    placeholder="Input downpayment here"
                  />
                  {formData[formType].downpayment <
                    Number(unit.downpayment) && (
                    <p className="text-red-500">
                      * Downpayment must not go below the minimum payment
                    </p>
                  )}
                </div>
                <FormSelect
                  name="tenure"
                  label="Loan Years"
                  id="tenure"
                  value={formData[formType].tenure}
                  onchange={(e) => dispatchInput(e)}
                  require={true}>
                  {[...Array(unit.tenure)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} {i + 1 > 1 ? "years" : "year"}
                    </option>
                  ))}
                </FormSelect>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
