import React, { useEffect, useState } from "react";
import Button from "./buttons/Button";
import CloseBttn from "./buttons/CloseBttn";
import FormInput from "./inputs/FormInput";
import CustomBttn from "./buttons/CustomBttn";
import BasicBttn from "./buttons/BasicBttn";
import PopAnimate from "./animations/popAnimate";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlert,
  setLoading,
  toggleModal,
} from "../services/redux/slices/uiSlice";
import { addPayment } from "../services/redux/slices/paymentSlice";
import { ApplicationEntity } from "../services/entities/Application";
import Dialog from "./modals/Dialog";
import { LoanEntity } from "../services/entities/Loan";
import { CheckCircle, XCircle } from "lucide-react";
import { fetchSchedule } from "../services/redux/slices/scheduleSlice";
import CustomBadge from "./badges/CustomBadge";
import { PaymentEntity } from "../services/entities/Payment";

export default function AddPayment() {
  const dispatch = useDispatch();
  const { id, record_id, user_id } = useSelector(ApplicationEntity);
  const { emi, transactions } = useSelector(LoanEntity);
  const { cert_num } = useSelector(PaymentEntity);
  const { modals } = useSelector((state) => state.ui);
  const { due_date, amount_due } = useSelector(
    (state) => state.schedule.schedule
  );
  const [rebate, setRebate] = useState({});
  const now = new Date();
  const emptyTrans = transactions.length === 0;

  const [payment, setPayment] = useState({
    application_form_id: id,
    issued_at: "Rhean Motors Center",
    status: "on_time",
    user_id: user_id,
    amount_paid: emi,
  });

  useEffect(() => {
    if (id) dispatch(fetchSchedule({ id: id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (due_date) checkRebate(due_date);
    if (rebate.onTime) afterRebate();
  }, [due_date, rebate.onTime]);

  useEffect(() => {
    if (!emptyTrans)
      setPayment({
        ...payment,
        application_form_id: id,
        user_id: user_id,
        total_amount: transactions[0].motorcycle.price,
      });
  }, [id, user_id, emptyTrans]);

  function handleChange(event) {
    setPayment({
      ...payment,
      [event.target.name]: event.target.value,
    });

    setAlert({ text: `Please confirm the payment ₱${event.target.value}` });
  }

  function checkInput() {
    if (!payment.amount_paid || payment.amount_paid === "__EMPTY__") {
      setPayment({ ...payment, amount_paid: "__EMPTY__" });
      dispatch(
        setAlert({ message: "Please input payment amount", type: "warn" })
      );
    } else
      dispatch(
        toggleModal({ name: "confirmPayment", value: modals.confirmPayment })
      );
  }

  function checkRebate(date) {
    const today = new Date();
    const dueDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    setRebate({ ...rebate, onTime: today <= dueDate });
  }

  function afterRebate() {
    const required = amount_due - transactions[0].motorcycle.rebate;

    setRebate({
      ...rebate,
      amount: `₱${parseFloat(required).toLocaleString()}`,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));

    try {
      const response = await dispatch(addPayment(payment)).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      dispatch(
        toggleModal({ name: "confirmPayment", value: modals.confirmPayment })
      );
    } catch (error) {
      console.error("Error: ", error);
      dispatch(setLoading({ isActive: false }));
      dispatch(
        setAlert({
          message: "Something went wrong. Please try again",
          type: "error",
        })
      );
    }
  }

  const paymentText = (
    <>
      Add payment amount{" "}
      <strong className="text-rose-500">
        ₱{parseFloat(payment.amount_paid).toLocaleString()}{" "}
      </strong>
      <br />
      for loan <strong className="text-rose-500">{record_id}</strong>?
    </>
  );

  return (
    <PopAnimate
      modalName={modals.addPayment}
      classStyle="relative p-4 w-full max-w-3xl h-full md:h-auto">
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-10 sm:py-8 border border-gray-500">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Payment
          </h3>
          <CloseBttn
            trigger={() =>
              dispatch(
                toggleModal({
                  name: "addPayment",
                  value: modals.addPayment,
                })
              )
            }
          />
        </div>
        <div className="my-3 divide-y divide-gray-200 dark:divide-gray-800">
          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
              Res. Certificate number
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              {cert_num}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
              Status
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              <CustomBadge
                text={rebate.onTime ? "On Time" : "Late"}
                color={rebate.onTime ? "green" : "red"}
              />
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
              Issued on
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              {now.toLocaleDateString("en-US")}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
              Issued at
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              Rhean Motors Center
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
              Amount Due
            </dt>
            <dd className="text-base font-medium text-red-500">
              ₱{parseFloat(emi).toLocaleString()}
            </dd>
          </dl>

          <dl className="gap-4 py-3">
            <FormInput
              value={payment.amount_paid}
              label="Payment Amount"
              id="amount"
              name="amount_paid"
              type="number"
              placeholder="₱10,000"
              onchange={(e) => handleChange(e)}
            />
            {rebate.onTime ? (
              <div className="text-green-500 flex space-x-2 items-center mt-1">
                <CheckCircle size={15} />
                <span>Required Amount: {rebate.amount} (After rebate)</span>
              </div>
            ) : (
              <div className="text-red-500 flex space-x-2 items-center mt-1">
                <XCircle size={15} />
                <span>
                  Rebate will not be applied (Customer must pay the exact
                  monthly payment or more)
                </span>
              </div>
            )}
          </dl>

          <dl className="mt-5">
            <Button text="Add Payment" type="button" onclick={checkInput} />
          </dl>
        </div>
        <Dialog text={paymentText} modalName="confirmPayment">
          <CustomBttn
            text="Confirm"
            onclick={handleSubmit}
            classname="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          />
          <BasicBttn
            text="Cancel"
            click={() =>
              dispatch(
                toggleModal({
                  name: "confirmPayment",
                  value: modals.confirmPayment,
                })
              )
            }
          />
        </Dialog>
      </div>
    </PopAnimate>
  );
}
