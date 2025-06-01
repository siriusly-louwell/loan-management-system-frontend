import React, { useState } from "react";
import FormInput from "../components/inputs/FormInput";
import FormTextarea from "../components/inputs/FormTextarea";
import FormFile from "../components/inputs/FormFile";
import Button from "../components/buttons/Button";
import CloseBttn from "../components/buttons/CloseBttn";
import Cloud from '../assets/icons/Cloud';
import Spinner from "../components/loading components/Spinner";
import SelectColor from "../components/checkboxes/SelectColor";
import Alert from "../components/Alert";

export default function CreateProduct() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({});
    const [colors, setColors] = useState([]);
    const [alert, setAlert] = useState({});
    const submitData = new FormData();

    function changeColor(newColor) {
        const updatedColors = colors.includes(newColor)
            ? colors.filter(color => color !== newColor)
            : [...colors, newColor];

        setColors(updatedColors);
    };

    async function handleSubmit(event) {
        event.preventDefault();

        if (files.length === 0) {
            setAlert({
                text: "Please select images for the unit.",
                icon: "warn"
            });
            document.getElementById('createUnit').style.display = "block";
            return;
        }

        for(let key in formData) {
            submitData.append(`${key}`, formData[key]);
        }

        colors.forEach(color => submitData.append('colors[]', color));
        files.forEach(file => submitData.append('files[]', file));

        document.getElementById('save_unit').style.display = "flex";

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
            document.getElementById('save_unit').style.display = "none";
            setAlert({
                text: "Unit created succcessfully!",
                icon: "done"
            });
            document.getElementById('createUnit').style.display = "block";
            setFormData({});
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Failed to save data",
                icon: "warn"
            });
            document.getElementById('save_unit').style.display = "none";
            document.getElementById('createUnit').style.display = "block";
        }

    }

    // function resetInput() {
    //     setFormData({});
    //     document.getElementById('save_unit').style.display = "none";
    // }
    
    function fileChange(event) {
        setFiles([...event.target.files]);
        // setFiles(event.target.files[0]);
    }

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div id="createProduct" className="overflow-y-auto hidden overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-6xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Unit</h3>
                        <CloseBttn id="createProduct" />
                    </div>
                    <form onSubmit={handleSubmit} className="lg:flex">
                        <section className="lg:w-1/2 lg:pr-3">
                            <h3 className="text-lg font-semibold text-gray-900 mb-5 dark:text-white">Motorcycle Details</h3>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <FormInput label="Motorcycle Name" type="text" value={formData.name} onchange={handleChange} name="name" id="name" placeholder="Type motorcycle name" />
                                <FormInput label="Brand Name" type="text" name="brand" id="brand" value={formData.brand} onchange={handleChange} placeholder="Type brand name" />
                                <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                                    <FormInput label="Price" type="number" id="price" name="price" value={formData.price} onchange={handleChange} placeholder="₱150,000" />
                                    <FormInput label="Minimum Downpayment" type="number" id="down" name="downpayment" value={formData.downpayment} onchange={handleChange} placeholder="₱25,000" />
                                    <FormInput label="Rebate" type="number" id="rebate" name="rebate" value={formData.rebate} onchange={handleChange} placeholder="₱15,000" />
                                    <FormInput label="Quantity" type="number" id="quantity" name="quantity" value={formData.quantity} onchange={handleChange} placeholder="25 units" />
                                    <FormInput label="Interest Rate (%)" type="number" id="interest" name="interest" value={formData.interest} onchange={handleChange} placeholder="10%" />
                                    <FormInput label="Loan Tenure" type="number" id="tenure" name="tenure" value={formData.tenure} onchange={handleChange} placeholder="5 years" />
                                </div>
                                <SelectColor text="Select Colors:" size={6} colors={colors} changeColor={changeColor} />
                                <FormTextarea name="description" id="description" label="Description" value={formData.description} onchange={handleChange} placeholder="Write motorcycle description here" />
                            </div>
                            <div className="mb-4">
                                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Images</span>
                                <div className="flex justify-center items-center w-full">
                                    <label htmlFor="dropzone" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                            <Cloud />
                                            {files.length > 0 ? (
                                                // <span className="font-semibold dark:text-white">{files.name}</span>
                                                files.map(file => <span className="font-semibold dark:text-white">{file.name}</span>)
                                            ) : (
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload </span>or drag and drop</p>
                                            )}
                                            
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone" name="file" type="file" class="hidden" onChange={fileChange} multiple />
                                    </label>
                                </div>
                                {/* <FormFile id="dropzone-file" name="file" onChange={(e) => { console.log("Child called"); fileChange(e); }} file={file} /> */}
                            </div>
                        </section>

                        <section className="lg:w-1/2 border-l border-gray-300 lg:pl-3">
                            <h3 className="text-lg font-semibold text-gray-900 mb-5 dark:text-white">Specifications</h3>
                            <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                                <FormInput label="Engine" type="text" value={formData.engine} onchange={handleChange} name="engine" id="name" placeholder="Single-cylinder, Parallel twin, V-twin" />
                                <FormInput label="Compression Ratio" type="text" value={formData.compression} onchange={handleChange} name="compression" id="name" placeholder="Efficiency/performance indicator" />
                                <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                                    <FormInput label="Displacement (cc)" type="text" value={formData.displacement} onchange={handleChange} name="displacement" id="name" placeholder="125cc" />
                                    <FormInput label="Horsepower (hp)" type="text" value={formData.horsepower} onchange={handleChange} name="horsepower" id="name" placeholder="Power output" />
                                    <FormInput label="Torque (Nm)" type="text" value={formData.torque} onchange={handleChange} name="torque" id="name" placeholder="Turning force" />
                                    <FormInput label="Fuel System" type="text" value={formData.fuel} onchange={handleChange} name="fuel" id="name" placeholder="Carburetor or Fuel injection (FI)" />
                                    <FormInput label="Final Drive" type="text" value={formData.drive} onchange={handleChange} name="drive" id="name" placeholder="Chain, Belt, or Shaft" />
                                    <FormInput label="Transmission" type="text" value={formData.transmission} onchange={handleChange} name="transmission" id="name" placeholder="Manual, 5-speed or 6-speed" />
                                </div>
                                <FormInput label="Cooling System" type="text" value={formData.cooling} onchange={handleChange} name="cooling" id="name" placeholder="Air-cooled, Liquid-cooled, Oil-cooled" />
                            </div>
                            <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                                <FormInput label="Front Suspension" type="text" value={formData.front_suspension} onchange={handleChange} name="front_suspension" id="name" placeholder="Telescopic forks, Inverted forks" />
                                <FormInput label="Rear Suspension" type="text" value={formData.rear_suspension} onchange={handleChange} name="rear_suspension" id="name" placeholder="Mono-shock or Dual shock absorbers" />
                                <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                                    <FormInput label="Frame Type" type="text" value={formData.frame} onchange={handleChange} name="frame" id="name" placeholder="Steel trellis, Aluminum twin-spar" />
                                    <FormInput label="Front/Rear Travel (mm/in)" type="text" value={formData.travel} onchange={handleChange} name="travel" id="name" placeholder="Suspension travel distance" />
                                    <FormInput label="Swingarm Type" type="text" value={formData.swingarm} onchange={handleChange} name="swingarm" id="name" placeholder="Standard, Single-sided" />
                                </div>
                            </div>
                            <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                                <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                                    <FormInput label="Dry Weight" type="text" value={formData.dry_weight} onchange={handleChange} name="dry_weight" id="name" placeholder="Without fuel/fluids" />
                                    <FormInput label="Wet weight" type="text" value={formData.wet_weight} onchange={handleChange} name="wet_weight" id="name" placeholder="Fully fueled and ready to ride" />
                                    <FormInput label="Seat Height (mm/in)" type="text" value={formData.seat} onchange={handleChange} name="seat" id="name" placeholder="Input seat measurements" />
                                    <FormInput label="Wheelbase" type="text" value={formData.wheelbase} onchange={handleChange} name="wheelbase" id="name" placeholder="Distance between front and rear axle" />
                                    <FormInput label="Fuel Tank Capacity" type="text" value={formData.fuel_tank} onchange={handleChange} name="fuel_tank" id="name" placeholder="Engine Type" />
                                    <FormInput label="Ground Clearance" type="text" value={formData.clearance} onchange={handleChange} name="clearance" id="name" placeholder="Important for off-roading" />
                                </div>
                            </div>
                            <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                                <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                                    <FormInput label="Tire Size" type="text" value={formData.tires} onchange={handleChange} name="tires" id="name" placeholder="120/70ZR17" />
                                    <FormInput label="Wheel Type" type="text" value={formData.wheel} onchange={handleChange} name="wheel" id="name" placeholder="Spoke or alloy wheels" />
                                    <FormInput label="Brakes" type="text" value={formData.brakes} onchange={handleChange} name="brakes" id="name" placeholder="Disc (single/double), ABS" />
                                </div>
                            </div>
                            <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                                <FormInput label="ABS" type="text" value={formData.abs} onchange={handleChange} name="abs" id="name" placeholder="Anti-lock braking system" />
                                <FormInput label="Traction Control" type="text" value={formData.traction} onchange={handleChange} name="traction" id="name" placeholder="Prevents wheel slip" />
                                <FormInput label="TFT Display" type="text" value={formData.tft} onchange={handleChange} name="tft" id="name" placeholder="TFT Digital Screen" />
                                <FormInput label="Lighting" type="text" value={formData.lighting} onchange={handleChange} name="lighting" id="name" placeholder="LED, Halogen, DRLs" />
                                <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                                    <FormInput label="Riding Modes" type="text" value={formData.ride_mode} onchange={handleChange} name="ride_mode" id="name" placeholder="E.g., Sport, Rain, Touring" />
                                    <FormInput label="Quickshifter" type="text" value={formData.quickshifter} onchange={handleChange} name="quickshifter" id="name" placeholder="Clutchless upshifts/downshifts" />
                                    <FormInput label="Cruise Control" type="text" value={formData.cruise} onchange={handleChange} name="cruise" id="name" placeholder="For long-distance riding" />
                                </div>
                            </div>
                            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                <Button text="Add Unit" bttnType="submit"/>
                                {/* <CustomBttn text="Schedule" className="w-full sm:w-auto text-white justify-center inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <Calendar />
                                </CustomBttn> */}
                                {/* <CustomBttn text="Discard" className="inline-flex justify-center w-full sm:w-auto items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                    onclick={() => document.getElementById('createProduct').style.display = "none"}>
                                    <Ex className="mr-1 -ml-1 w-5 h-5" />
                                </CustomBttn> */}
                            </div>
                        </section>
                    </form>
                    <Spinner id="save_unit" text="Saving data..." />
                    <Alert id="createUnit" text={alert.text} icon={alert.icon}>
                        <Button text="Ok" onclick={() => document.getElementById('createUnit').style.display = 'none'} />
                    </Alert>
                </div>
            </div>
        </div>
    );
}