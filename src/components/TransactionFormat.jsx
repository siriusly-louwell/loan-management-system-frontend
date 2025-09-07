import React from "react";
import { useEffect } from "react";
import SmallLabel from "./texts/SmallLabel";
import SelectColor from "./checkboxes/SelectColor";
import QuantityInput from "./buttons/QuantityInput";
import FormInput from "./inputs/FormInput";
import FormSelect from "./inputs/FormSelect";

export default function TransactionFormat({transact, transactForm, handleTransaction, colors, changeColor, downPayment, id, index, handleDown, handleTransForm}) {
    useEffect(() => {
        if(downPayment < transact.downpayment) {
            document.getElementById(`down_warn_${index}`).style.display = 'block';
            document.getElementById(`downpayment_${index}`).style.outline = '1px solid red';
            document.getElementById(`downpayment_${index}`).style.border = '1px solid red';
        } else {
            document.getElementById(`downpayment_${index}`).style.border = '1px solid #9CA3AF';
            document.getElementById(`downpayment_${index}`).style.outline = '1px solid #9CA3AF';
            document.getElementById(`down_warn_${index}`).style.display = 'none';
        }
    }, [downPayment, transact.downpayment]);

    return (
        <div className="mt-6 sm:mt-8 lg:mt-0">                                  
            <div className="sm:items-center gap-4 flex">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">{transact.name} ({transact.brand}) - </h1>
                <p className="text-2xl font-extrabold text-rose-600 sm:text-3xl dark:text-rose-500">₱{parseFloat(transact.price).toLocaleString()}</p>
            </div>
                    
            <div className='grid grid-cols-2 w-fit gap-x-5 sm:grid-cols-4 my-2'>
                <SmallLabel label="Annual Interest" text={`${transact.interest}%`} />
                <SmallLabel label="Rebate" text={`₱${parseFloat(transact.rebate).toLocaleString()}`} />
                <SmallLabel label="Loan Tenure" text={`${transact.tenure} years`} />
                <SmallLabel label="Stock" text={`${transact.quantity} units`} />
            </div>
        
            <div className="flex py-5 border-b border-gray-400 dark:border-gray-600 items-center space-x-4 mb-5">
                <div className="grid lg:grid-cols-2 gap-x-5 gap-y-4">
                    <SelectColor text="Select Color:" size={6} colors={colors} changeColor={changeColor} index={index} arr={transact.colors} />
                    <QuantityInput label="Quantity" max={transact.quantity} index={index} change={handleTransForm} require={true} />
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-gray-700 dark:text-gray-200">Downpayment</h3>
                            <h3 className="font-medium text-gray-700 flex gap-x-2 dark:text-gray-200">
                                Minimum Payment: <span className="font-bold text-rose-600">₱{parseFloat(transact.downpayment).toLocaleString()}</span>
                            </h3>
                        </div>
                        <FormInput type="number" id={`downpayment_${index}`} value={downPayment} onchange={(e) => handleDown(index, Number(e.target.value))} placeholder="Input downpayment here" />
                        <p id={`down_warn_${index}` }className="text-red-500">* Downpayment must not go below the minimum payment</p>
                    </div>
                    {/* transactForm.tenure */}
                    <FormSelect name="tenure" label="Loan Years" id="tenure" value={transact.tenure[0]} onchange={(e) => handleTransaction(index, e)} require={true}>
                        {[...Array(transact.tenure)].map((_, i) => (
                            <option value={i+1}>{i+1} {i+1 > 1 ? 'years' : 'year'}</option>
                        ))}
                    </FormSelect>
                </div>
            </div>
        </div>
    );
}