import React, { useState } from "react";
import axios from "axios";
import Ex from "../../assets/icons/Ex";
import QuantityInput from "../buttons/QuantityInput";
import Button from "../buttons/Button";
import Alert from "../Alert";
import Spinner from "../loading components/Spinner";
import ColorLabel from "../ColorLabel";

export default function StockModal({stock, setStock}) {
    const [quantity, setQuantity] = useState([]);
    const [alert, setAlert] = useState({});
    const handleQuantity = (i, num, key) => {
        const quantArr = quantity;
        quantArr[i] = num;
        setQuantity(quantArr);
    }

    async function changeStock() {
        document.getElementById('stockSpinner').style.display = "flex";
        const totalQuantity = quantity.reduce((sum, num) => sum + num, 0);

        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/motorcycle/${stock.id}`, {quantity: totalQuantity + stock.quantity});

            console.log('Success: ', response.data.message);
            setAlert({
                text: "Stock has been adjusted successfully!",
                icon: "done"
            });
            document.getElementById('done_stock').style.display = 'block';
            document.getElementById('stockSpinner').style.display = "none";
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Unexpected Error!",
                icon: "warn"
            });
            document.getElementById('done_stock').style.display = 'block';
            document.getElementById('stockSpinner').style.display = "none";
        }
    }

    console.log(quantity);

    return (
        <>
            <div id="stockModal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 p-20 bg-gray-500 bg-opacity-30 justify-items-center items-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full h-auto max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border dark:border-gray-500">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="delete-modal"
                            onClick={() => setStock({...stock, type: ''})}>
                            <Ex className="w-5 h-5" />
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 items-center">
                            <h2 className="text-lg font-semibold text-gray-900 w-full text-center pb-4 mb-4 border-b border-gray-400 dark:text-white">Stock Management</h2>
                            <div className="grid sm:grid-cols-2 mb-3 gap-4">
                                <div class="grid col-span-2 sm:grid-cols-2">
                                    <img class="h-16 w-16 rounded-lg" src={`http://127.0.0.1:8000/storage/${stock.img}`} alt="Helene avatar" />
                                    <p class="flex items-center text-lg font-bold leading-none text-gray-900 dark:text-white">{stock.name}</p>
                                </div>
                                <p>Current Stock: </p>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{stock.quantity}</span>
                                {stock.colors.map((color, i) => (
                                    <div className="grid col-span-2 grid-cols-3 border-t border-gray-400">
                                        <p className="mt-5">Color:</p>
                                        <div className="mt-5">
                                            <ColorLabel style={color.color} size={7} />
                                        </div>
                                        <QuantityInput max={200} index={i} change={handleQuantity} />
                                    </div>
                                ))}
                            </div>
                            <Button text="Done" onclick={changeStock} />
                        </div>
                    </div>
                </div>
            </div>
            <Spinner id="stockSpinner" text="Adjusting stock... " />
            <Alert id="done_stock" text={alert.text} icon={alert.icon}>
                <Button text="Ok" onclick={() => {
                    setStock({...stock, type: ''});
                    document.getElementById('done_stock').style.display = 'none';
                    }} />
            </Alert>
        </>
    );
}