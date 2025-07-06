import React, { useState } from "react";
import Ex from "../../assets/icons/Ex";
import QuantityInput from "../buttons/QuantityInput";
import Button from "../buttons/Button";

export default function StockModal({bool, id, stock}) {
    const [quantity, setQuantity] = useState(0);
    const [alert, setAlert] = useState({});

    const handleQuantity = (i, num, key) => setQuantity(num);
    // function handleQuantity(i, num, key) {
    //     setQuantity(num);
    // }

    async function changeStock() {
        document.getElementById('changeStock').style.display = "flex";

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/motorcyle/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({quantity: quantity})
            });

            const result = await response.json();
            console.log('Success: ', result);
            if(!response.ok) throw new Error('Update failed');
            setAlert({
                text: "Stock has been adjusted successfully!",
                icon: "done"
            });
            document.getElementById('adjustStock').style.display = 'block';
            document.getElementById('changeStock').style.display = "none";
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Unexpected Error!",
                icon: "warn"
            });
            document.getElementById('adjustStock').style.display = 'block';
            document.getElementById('changeStock').style.display = "none";
        }
    }

    return (
        <div id="stockModal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 p-20 bg-gray-500 bg-opacity-30 justify-items-center items-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full h-auto max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border dark:border-gray-500">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="delete-modal"
                        onClick={() => document.getElementById('stockModal').style.display = "none"}>
                        <Ex className="w-5 h-5" />
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 items-center">
                        <h2 className="text-lg font-semibold text-gray-900 w-full text-center pb-4 mb-4 border-b border-gray-400 dark:text-white">Inventory Restocking</h2>
                        <div className="grid sm:grid-cols-2 mb-3 gap-4">
                            <p>Current Stock: </p>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{stock}</span>
                            <p>Increase Stock by:</p>
                            <QuantityInput max={200} change={handleQuantity} />
                        </div>
                        <Button text="Done" onclick={changeStock} />
                    </div>
                </div>
            </div>
        </div>
    );
}