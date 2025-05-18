import React, { useState } from "react";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import FormTextarea from "../components/inputs/FormTextarea";
import FormFile from "../components/inputs/FormFile";
import Button from "../components/buttons/Button";
import CustomBttn from "../components/buttons/CustomBttn";
import Calendar from "../assets/icons/Calendar";
import Ex from "../assets/icons/Ex";
import CloseBttn from "../components/buttons/CloseBttn";
import Spinner from "../components/loading components/Spinner";

export default function EditProduct({motor}) {
    const [editData, setEditData] = useState({
        name: motor.name,
        brand: motor.brand,
        color: motor.color,
        description: motor.description,
        price: motor.price,
        quantity: motor.quantity,
        file_path: motor.file_path
    });

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/motorcycle/' + motor.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(editData)
            });

            const result = await response.json();
            document.getElementById('saving_data').style.display = "none";
            console.log('Success: ', result);
            alert('Data updated successfully!');
        } catch(error) {
            console.error('Error: ', error);
            alert('Failed to save data.');
        }

    }

    function handleChange(event) {
        setEditData({
            ...editData,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div id="editProduct" className="overflow-y-auto hidden overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Unit: {editData.name}</h3>
                        <CloseBttn id="editProduct" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <FormInput label="Motorcycle Name" type="text" value={editData.name} onchange={handleChange} name="name" id="name" placeholder="Type motorcycle name" />
                            <FormInput label="Brand Name" type="text" name="brand" id="brand" value={editData.brand} onchange={handleChange} placeholder="Type brand name" />
                            <FormInput label="File path" type="text" name="file_path" id="file" value={editData.file_path} onchange={handleChange} placeholder="Type brand name" />
                            <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                                <FormSelect name="color" id="color" label="Color" value={editData.color} onchange={handleChange}>
                                    <option value="red">Red</option>
                                    <option value="orange">Orange</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="green">Green</option>
                                </FormSelect>
                                <FormInput label="Price" type="number" id="price" name="price" value={editData.price} onchange={handleChange} placeholder="1500 PHP" />
                                <FormInput label="Quantity" type="number" id="quantity" name="quantity" value={editData.quantity} onchange={handleChange} placeholder="25 units" />
                            </div>
                            <FormTextarea name="description" id="description" label="Description" value={editData.description} onchange={handleChange} placeholder="Write motorcycle description here" />
                        </div>
                        <div className="mb-4">
                            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Images</span>
                            <FormFile id="dropzone-file" name="image" />
                        </div>
                        <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Button text="Add product" type="submit" onclick={() => document.getElementById('saving_data').style.display = "flex"} />
                            <CustomBttn text="Schedule" className="w-full sm:w-auto text-white justify-center inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <Calendar />
                            </CustomBttn>
                            <CustomBttn text="Discard" className="inline-flex justify-center w-full sm:w-auto items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                onclick={() => document.getElementById('editProduct').style.display = "none"}>
                                <Ex className="mr-1 -ml-1 w-5 h-5" />
                            </CustomBttn>
                        </div>
                    </form>
                    <Spinner id="saving_data" text="Saving data..." />
                </div>
            </div>
        </div>
    );
}