import React from "react";
import SmallLabel from "./texts/SmallLabel";
import SmallSpin from "./loading components/SmallSpin";
import SelectColor from "./checkboxes/SelectColor";
import QuantityInput from "./buttons/QuantityInput";
import FormInput from "./inputs/FormInput";
import FormSelect from "./inputs/FormSelect";

export default function TransactionFormat({transLoad, transact, transactForm, handleTransaction, colors, changeColor, downPayment, setDownPayment}) {
    return (
        <div className="mt-6 sm:mt-8 lg:mt-0">                                  
            <div className="sm:items-center gap-4 flex">
                {transLoad ? (
                    <p className="h-8 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse w-40 mb-4"></p>
                ) : (
                    <>
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">{transact.name} ({transact.brand}) - </h1>
                        <p className="text-2xl font-extrabold text-rose-600 sm:text-3xl dark:text-rose-500">₱{parseFloat(transact.price).toLocaleString()}</p>
                    </>
                )}
            </div>
                    
            <div className='grid grid-cols-2 sm:grid-cols-4 my-2'>
                <SmallLabel label="Annual Interest" text={transLoad ? (<SmallSpin size={20} />) : `${transact.interest}%`} />
                <SmallLabel label="Rebate" text={transLoad ? (<SmallSpin size={20} />) : `₱${parseFloat(transact.rebate).toLocaleString()}`} />
                <SmallLabel label="Loan Tenure" text={transLoad ? (<SmallSpin size={20} />) : `${transact.tenure} years`} />
                <SmallLabel label="Stock" text={transLoad ? (<SmallSpin size={20} />) : `${transact.quantity} units`} />
            </div>
        
            <div className="flex py-5 border-y border-gray-400 dark:border-gray-600 items-center space-x-4 mb-5">
                <div className="grid sm:grid-cols-2 gap-x-5 gap-y-4">
                    {transLoad ? (
                        <SmallSpin size={30} />
                    ) : (
                        <SelectColor text="Select Color:" size={6} colors={colors} changeColor={changeColor} arr={transact.colors} />
                    )}
                    <QuantityInput label="Quantity" max={transact.tenure} number={transactForm.quantity} change={handleTransaction} require={true} />
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-gray-700 dark:text-gray-200">Downpayment</h3>
                            <h3 className="font-medium text-gray-700 flex gap-x-2 dark:text-gray-200">
                                Minimum Payment: {transLoad ? (
                                    <SmallSpin size={20} />
                                ) : (
                                    <span className="font-bold text-rose-600">₱{parseFloat(transact.downpayment).toLocaleString()}</span>
                                )}
                            </h3>
                        </div>
                        <FormInput type="number" id="downpayment" value={downPayment} onchange={(e) => setDownPayment(Number(e.target.value))} placeholder="Input downpayment here" />
                        <p id="down_warn" className="text-red-500">* Downpayment must not go below the minimum payment</p>
                    </div>
                    <FormSelect name="tenure" label="Loan Years" id="tenure" value={transactForm.tenure} onchange={handleTransaction} require={true}>
                        {[...Array(transact.tenure)].map((_, i) => (
                            <option value={i+1}>{i+1} {i+1 > 1 ? 'years' : 'year'}</option>
                        ))}
                    </FormSelect>
                </div>
            </div>
        </div>
    );
}