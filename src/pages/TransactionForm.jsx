import React, { useState, useEffect } from "react";
import {useOutletContext} from 'react-router-dom';
// import FormInput from "../components/inputs/FormInput";
// import FormSelect from "../components/inputs/FormSelect";
// import SmallSpin from "../components/loading components/SmallSpin";
// import SmallLabel from "../components/texts/SmallLabel";
// import SelectColor from "../components/checkboxes/SelectColor";
// import QuantityInput from "../components/buttons/QuantityInput";
import TransactionFormat from "../components/TransactionFormat";

export default function TransactionForm() {
    const {id, handleTransaction, transactForm} = useOutletContext();
    const [transact, setTransact] = useState({});
    const [transLoad, setTransLoad] = useState(true);
    const [colors, setColors] = useState('');
    const [downPayment, setDownPayment] = useState();

    function changeColor(newColor) {
        setColors(newColor);
    };

    useEffect(() => {
        if(downPayment < transact.downpayment) {
            document.getElementById('down_warn').style.display = 'block';
            document.getElementById('downpayment').style.outline = '1px solid red';
            document.getElementById('downpayment').style.border = '1px solid red';
        } else {
            document.getElementById('downpayment').style.border = '1px solid #9CA3AF';
            document.getElementById('downpayment').style.outline = '1px solid #9CA3AF';
            document.getElementById('down_warn').style.display = 'none';
        }
    }, [downPayment, transact.downpayment]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/motorcycle/' + id)
        .then(response => response.json())
        .then(data => {
            setTransact(data);
            setDownPayment(data.downpayment)
            setTransLoad(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            setTransLoad(true);
        })
    }, [id]);

    return (
        <>
            <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Loan Customization:</h3>
            <TransactionFormat
                transLoad={transLoad} transact={transact} transactForm={transactForm} handleTransaction={handleTransaction}
                colors={colors} changeColor={changeColor} downPayment={downPayment} setDownPayment={setDownPayment}
            />
        </>
    );
}