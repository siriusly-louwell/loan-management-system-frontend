import React, { useState } from "react";
import Button from "./buttons/Button";
import CloseBttn from "./buttons/CloseBttn";
import Alert from "./Alert";
import Spinner from "./loading components/Spinner";
import { useNavigate } from "react-router-dom";
import FormInput from "./inputs/FormInput";
import CustomBttn from "./buttons/CustomBttn";
import BasicBttn from "./buttons/BasicBttn";

export default function AddPayment({id}) {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({text: 'Are you sure you want to '});
    const now = new Date();

    function generateId() {
        const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        const randomPart = Math.random().toString(36).substr(2, 6).toUpperCase();

        return `INV-${datePart}-${randomPart}`;
    }

    const [payment, setPayment] = useState({
        application_form_id: id,
        issued_at: 'Rhean Motors Center',
        cert_num: generateId(),
        prev_balance: 10000,
        status: 'on_time'
    });

    function handleChange(event) {
        setPayment({
            ...payment,
            [event.target.name]: event.target.value
        });

        setAlert({text: `Please confirm the payment ₱${event.target.value}`});
    }

    async function handleSubmit() {
        document.getElementById('payment_spin').style.display = "flex";
        document.getElementById('pay-alert').style.display = "none";

        try {
            const response = await fetch('http://127.0.0.1:8000/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payment)
            });

            const result = await response.json();
            console.log('Success: ', result);
            if(!response.ok) throw new Error('Update failed');
            setAlert({
                text: "Invoice created successfully!",
                icon: "done"
            });
            document.getElementById('pay-alert').style.display = 'block';
            document.getElementById('payment_spin').style.display = "none";
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Unexpected Error!",
                icon: "warn"
            });
            document.getElementById('pay-alert').style.display = 'block';
            document.getElementById('payment_spin').style.display = "none";
        }
    }

    return (
        <div id="addPayment" className="overflow-y-auto hidden overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-10 sm:py-8 border border-gray-500">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Declination of Application</h3>
                        <CloseBttn id="addPayment"  />
                    </div>
                    <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Res. Certificate number</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">{payment.cert_num}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Status</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">On time</dd>
                        </dl>
                    
                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Issued on</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">{now.toLocaleDateString('en-US')}</dd>
                        </dl>
                    
                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Issued at</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">Rhean Motors Center</dd>
                        </dl>
                    
                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Previous Balance</dt>
                            <dd className="text-base font-medium text-red-500">$199</dd>
                        </dl>

                        <dl className="gap-4 py-3">
                            <FormInput label="Payment Amount" id="amount" name="amount_paid" type="number" placeholder="₱10,000" onchange={(e) => handleChange(e)} />
                        </dl>
                    
                        <dl className="mt-5">
                            <Button text="Add Payment" type="button" onclick={() => document.getElementById('pay-alert').style.display  = 'block'} />
                        </dl>
                    </div>
                    <Spinner id="payment_spin" />
                    <Alert id="pay-alert" text={alert.text} icon={alert.icon}>
                        {alert.icon === "done" ? (
                            <Button text="Ok" type="button" onclick={() => document.getElementById('pay-alert').style.display = "none"} />
                        ) : (
                            <>
                                <CustomBttn text="Confirm" onclick={handleSubmit} classname="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" />
                                <BasicBttn text="Cancel" onclick={() => document.getElementById('pay-alert').style.display = "none"} />
                            </>
                        )}
                    </Alert>
                </div>
            </div>
        </div>
    );
}