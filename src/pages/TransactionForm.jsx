import React, { useState, useEffect } from "react";
import axios from "axios";
import {useOutletContext} from 'react-router-dom';
import TransactionFormat from "../components/TransactionFormat";
import SmallLabel from "../components/texts/SmallLabel";
import SmallSpin from "../components/loading components/SmallSpin";
import QuantityInput from "../components/buttons/QuantityInput";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";

export default function TransactionForm() {
    const {ids, handleTransaction, transactForm, handleTransForm, setTransactForm} = useOutletContext();
    const [transact, setTransact] = useState([]);
    const [transLoad, setTransLoad] = useState(true);
    const [colors, setColors] = useState('');
    const [downPayment, setDownPayment] = useState([]);

    function changeColor(i, newColor) {
        setColors(prev => {
            const updated = [...prev];
            updated[i] = newColor;
            return updated;
        });

        handleTransForm(i, newColor, 'color');
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/motorcycle/', {
            params: {ids: ids}
        })
        .then(response => {
            setTransact(response.data);
            setTransLoad(false);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            setTransLoad(true);
        });
    }, [ids]);

    useEffect(() => {
        const payments = transact.map(trans => trans.downpayment);
        setDownPayment(payments);
    }, [transact]);

    function handleDown(i, downpayment) {
        setDownPayment(prev => {
            const updated = [...prev];
            updated[i] = downpayment;
            return updated;
        });

        handleTransForm(i, downpayment, 'downpayment');
    }

    useEffect(() => {
        const initializedForm = transact.map((t, i) => ({
            motorcycle_id: t.id,
            downpayment: t.downpayment,
            quantity: 1
        }));

        setTransactForm(initializedForm);
    }, [transact]);

    return (
        <>
            <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Loan Customization:</h3>
            {transLoad ? (
                <div className="mt-6 sm:mt-8 lg:mt-0">                                  
                    <div className="sm:items-center gap-4 flex">
                        <p className="h-8 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse w-80 mb-4"></p>
                    </div>
                                    
                    <div className='grid grid-cols-2 w-fit gap-x-5 sm:grid-cols-4 my-2'>
                        <SmallLabel label="Annual Interest" text={<SmallSpin size={20} />} />
                        <SmallLabel label="Rebate" text={<SmallSpin size={20} />} />
                        <SmallLabel label="Loan Tenure" text={<SmallSpin size={20} />} />
                        <SmallLabel label="Stock" text={<SmallSpin size={20} />} />
                    </div>
                        
                    <div className="flex py-5 border-b border-gray-400 dark:border-gray-600 items-center space-x-4 mb-5">
                        <div className="grid lg:grid-cols-2 gap-x-5 gap-y-4">
                            <SmallSpin size={30} />
                            <QuantityInput label="Quantity" />
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200">Downpayment</h3>
                                    <h3 className="font-medium text-gray-700 flex gap-x-2 dark:text-gray-200">Minimum Payment: <SmallSpin size={20} /></h3>
                                </div>
                                <FormInput type="number" placeholder="Input downpayment here" />
                            </div>
                            <FormSelect name="tenure" label="Loan Years">
                                <option>Loading...</option>
                            </FormSelect>
                        </div>
                    </div>
                </div>
            ) : transact.map((select, i) => (
                <TransactionFormat key={select.id} index={i} id={select.id}
                    transact={select} transactForm={transactForm[i]} handleTransaction={handleTransaction} handleTransForm={handleTransForm}
                    colors={colors} changeColor={changeColor} downPayment={downPayment[i]} handleDown={handleDown}
                />
            ))}
            
        </>
    );
}