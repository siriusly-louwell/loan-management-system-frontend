import React, { useState } from "react";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import FormTextarea from "../components/inputs/FormTextarea";
import FormFile from "../components/inputs/FormFile";
import Button from "../components/buttons/Button";
import CustomBttn from "../components/buttons/CustomBttn";
import Calendar from "../assets/icons/Calendar";
import Ex from "../assets/icons/Ex";
import Plus from "../assets/icons/Plus";
import CloseBttn from "../components/buttons/CloseBttn";
import Cloud from '../assets/icons/Cloud';
import Spinner from "../components/loading components/Spinner";

export default function CreateProduct() {
    const [files, setFiles] = useState(null);
    const [formData, setFormData] = useState({});
    const [colors, setColors] = useState(['']);
    const submitData = new FormData();

    function changeColor(index, newColor) {
        const updatedColors = [...colors];
        updatedColors[index] = newColor;
        setColors(updatedColors);
    };

    async function handleSubmit(event) {
        event.preventDefault();

        if (!files) {
            alert('Please select a file');
            console.log(files);
            return;
        }

        submitData.append('name', formData.name);
        submitData.append('brand', formData.brand);
        submitData.append('color', 'red');
        colors.forEach(color => submitData.append('colors[]', color));
        submitData.append('price', formData.price);
        submitData.append('description', formData.description);
        submitData.append('quantity', formData.quantity);
        submitData.append('interest', formData.interest);
        submitData.append('rebate', formData.rebate);
        submitData.append('tenure', formData.tenure);
        submitData.append('file', files);

        console.log(files);
        document.getElementById('saving_data').style.display = "flex";

        try {
            const response = await fetch('http://127.0.0.1:8000/api/motorcycle', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Content-Type': 'multipart/form-data',
                //     'Accept': 'application/json'
                // },
                body: submitData
                // body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log('Success: ', result);
            if(!response.ok) throw new Error('Failed to save data');
            document.getElementById('saving_data').style.display = "none";
            alert('Data saved successfully!');
            setFormData({});
        } catch(error) {
            console.error('Error: ', error);
            alert('Failed to save data.');
        }

    }

    // function resetInput() {
    //     setFormData({});
    //     document.getElementById('saving_data').style.display = "none";
    // }
    
    function fileChange(event) {
        console.log(event.target.files);
        // setFiles([...event.target.files]);
        setFiles(event.target.files[0]);
        console.log(files);
    }

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div id="createProduct" className="overflow-y-auto hidden overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Unit</h3>
                        <CloseBttn id="createProduct" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <FormInput label="Motorcycle Name" type="text" value={formData.name} onchange={handleChange} name="name" id="name" placeholder="Type motorcycle name" />
                            <FormInput label="Brand Name" type="text" name="brand" id="brand" value={formData.brand} onchange={handleChange} placeholder="Type brand name" />
                            <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                                <FormInput label="Price" type="number" id="price" name="price" value={formData.price} onchange={handleChange} placeholder="1500 PHP" />
                                <FormInput label="Quantity" type="number" id="quantity" name="quantity" value={formData.quantity} onchange={handleChange} placeholder="25 units" />
                                <FormInput label="Rebate" type="number" id="rebate" name="rebate" value={formData.rebate} onchange={handleChange} placeholder="1500 PHP" />
                                <FormInput label="Interest Rate (%)" type="number" id="interest" name="interest" value={formData.interest} onchange={handleChange} placeholder="10%" />
                                <FormInput label="Loan Tenure" type="number" id="tenure" name="tenure" value={formData.tenure} onchange={handleChange} placeholder="5 years" />
                            </div>
                            <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3 flex justify-center items-center border-y dark:border-gray-600 py-3">
                                {colors.map((_, i) => (
                                    <FormSelect key={i} name="color" id="color" label="Color" value={colors[i]} onchange={(e) => changeColor(i, e.target.value)}>
                                        <option value="pink">Pink</option>
                                        <option value="red">Red</option>
                                        <option value="orange">Orange</option>
                                        <option value="yellow">Yellow</option>
                                        <option value="green">Green</option>
                                        <option value="cyan">Cyan</option>
                                        <option value="blue">Blue</option>
                                        <option value="indigo">Indigo</option>
                                        <option value="violet">Violet</option>
                                        <option value="brown">Brown</option>
                                        <option value="gray">Gray</option>
                                        <option value="white">White</option>
                                        <option value="black">Black</option>
                                        <option value="zinc">Zinc</option>
                                        <option value="slate">Slate</option>
                                        <option value="neutral">Neutral</option>
                                        <option value="amber">Amber</option>
                                        <option value="violet">Violet</option>
                                        <option value="emerald">Emerald</option>
                                        <option value="teal">Teal</option>
                                        <option value="stone">Stone</option>
                                    </FormSelect>
                                ))}
                                <CustomBttn text="Add color" onclick={() => setColors([...colors, ''])} className="text-white text-md bg-blue-700 w-fit h-fit px-5 py-3 rounded-xl flex justify-center items-center">
                                    <Plus />
                                </CustomBttn>
                            </div>
                            
                            <FormTextarea name="description" id="description" label="Description" value={formData.description} onchange={handleChange} placeholder="Write motorcycle description here" />
                        </div>
                        <div className="mb-4">
                            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Images</span>
                            <div className="flex justify-center items-center w-full">
                                <label htmlFor="dropzone" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                        <Cloud />
                                        {/* {files.length > 0 */}
                                        {files ? (
                                            <span className="font-semibold dark:text-white">{files.name}</span>
                                            // files.map(file => <span className="font-semibold dark:text-white">{file.name}</span>)
                                        ) : (
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload </span>or drag and drop</p>
                                        )}
                                        
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone" name="file" type="file" class="hidden" onChange={fileChange} />
                                </label>
                            </div>
                            {/* <FormFile id="dropzone-file" name="file" onChange={(e) => { console.log("Child called"); fileChange(e); }} file={file} /> */}
                        </div>
                        <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Button text="Add Unit" bttnType="submit" onclick={() => document.getElementById('saving_data').style.display = "flex"} />
                            {/* <CustomBttn text="Schedule" className="w-full sm:w-auto text-white justify-center inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <Calendar />
                            </CustomBttn> */}
                            {/* <CustomBttn text="Discard" className="inline-flex justify-center w-full sm:w-auto items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                onclick={() => document.getElementById('createProduct').style.display = "none"}>
                                <Ex className="mr-1 -ml-1 w-5 h-5" />
                            </CustomBttn> */}
                        </div>
                    </form>
                    <Spinner id="saving_data" text="Saving data..." />
                </div>
            </div>
        </div>
    );
}