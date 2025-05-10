import React from "react";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import FormCheck from "../components/checkboxes/FormCheck";
import FormTextarea from "../components/inputs/FormTextarea";
import FormFile from "../components/inputs/FormFile";
import Button from "../components/buttons/Button";
import CustomBttn from "../components/buttons/CustomBttn";
import Calendar from "../assets/icons/Calendar";
import Ex from "../assets/icons/Ex";
import CloseBttn from "../components/buttons/CloseBttn";

export default function CreateProduct() {
    return (
        <div id="createProduct" class="overflow-y-auto hidden overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
                        <CloseBttn id="createProduct" />
                    </div>
                    <form action="#">
                        <div class="grid gap-4 mb-4 sm:grid-cols-2">
                            <FormInput label="Product Name" type="text" name="prod_name" id="name" placeholder="Type product name" />
                            <FormSelect name="prod_category" id="category" label="Category">
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </FormSelect>
                            <FormInput label="Brand" type="text" id="brand" name="prod_brand" placeholder="product brand" />
                            <FormInput label="Price" type="number" id="price" name="prod_price" placeholder="1500 PHP" />
                            <div class="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4">
                                <FormInput label="Item weight (kg)" type="number" id="weight" name="prod_weight" placeholder="100" />
                                <FormInput label="Length (cm)" type="number" id="length" name="prod_length" placeholder="1000" />
                                <FormInput label="Breadth (cm)" type="number" id="breadth" name="prod_breadth" placeholder="150" />
                                <FormInput label="Width (cm)" type="number" id="width" name="prod_width" placeholder="10" />
                            </div>
                            <FormTextarea name="description" id="description" label="Description" placeholder="Write product description here" />
                        </div>
                        <div class="mb-4 space-y-4 sm:flex sm:space-y-0">
                            <FormCheck name="sellingType[]" id="inline-check" label="In-store only" value="" />
                            <FormCheck name="sellingType[]" id="inline-2-check" label="Online selling only" value="" />
                            <FormCheck name="sellingType[]" id="inline-3-check" label="Both in-store and online" value="" />
                        </div>
                        <div class="mb-4">
                            <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Images</span>
                            <FormFile id="dropzone-file" name="image" />
                        </div>
                        <div class="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Button text="Add product" />
                            <CustomBttn text="Schedule" className="w-full sm:w-auto text-white justify-center inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <Calendar />
                            </CustomBttn>
                            <CustomBttn text="Discard" className="inline-flex justify-center w-full sm:w-auto items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                onclick={() => document.getElementById('createProduct').style.display = "none"}>
                                <Ex className="mr-1 -ml-1 w-5 h-5" />
                            </CustomBttn>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}