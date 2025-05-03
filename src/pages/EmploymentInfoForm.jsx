import React from "react";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import BttnwithIcon from '../components/buttons/BttnwithIcon';
import Plus from "../assets/icons/Plus";
import FormTHead from '../components/tables/FormTHead';
import FormTH from '../components/tables/FormTH';
import FormTBody from '../components/tables/FormTBody';
import FormTD from '../components/tables/FormTD';

export default function EmploymentInfoForm() {
    return (
        <>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Employment Information:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormSelect name="income" label="Source of income" id="income">
                    <option>Employment</option>
                    <option>Business</option>
                </FormSelect>
                <FormInput label="Employer" type="text" name="prod_name" id="name" placeholder="Type employer name" />
                <FormInput label="Employer Address" type="text" name="prod_name" id="name" placeholder="Type employer address" />
                <FormInput label="Immediate Superior" type="text" name="prod_name" id="name" placeholder="Type superior name" />
                <FormInput label="Employment Status" type="text" name="prod_name" id="name" placeholder="Type status" />
                <FormInput label="Years in service" type="number" name="prod_name" id="name" placeholder="Years" />
                <FormInput label="Employer" type="text" name="prod_name" id="name" placeholder="Type employer name" />
                <FormInput label="Monthly/Daily Rate" type="text" name="prod_name" id="name" placeholder="1,000 PHP" />
            </div>

            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Income</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormInput label="Salary" type="text" name="prod_name" id="name" placeholder="15,000 PHP" />
                <FormInput label="Business" type="text" name="prod_name" id="name" placeholder="Name your business" />
                <FormInput label="Others" type="text" name="prod_name" id="name" placeholder="Other income" />
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Expenses</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormInput label="Living" type="text" name="prod_name" id="name" placeholder="Living expenses" />
                <FormInput label="Rental" type="text" name="prod_name" id="name" placeholder="500 PHP/month" />
                <FormInput label="Education" type="text" name="prod_name" id="name" placeholder="Education expenses" />
                <FormInput label="Transportation" type="text" name="prod_name" id="name" placeholder="Transport expenses" />
                <FormInput label="Insurance" type="text" name="prod_name" id="name" placeholder="Insurance" />
                <FormInput label="Electricity/Water Bill" type="text" name="prod_name" id="name" placeholder="Billing expenses" />
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Real and/or Personal Properties:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                <table class="w-full">
                    <FormTHead>
                        <FormTH label="Kind of Property" />
                        <FormTH label="Location" />
                        <FormTH style="flex-end grid sm:grid-cols-1">
                            <label class="pb-3">Valuation</label>
                            <div class="grid sm:cols-span-1 gap-4 sm:grid-cols-2 h-full">
                                <label>Assessment</label>
                                <label>Material</label>
                            </div>
                        </FormTH>
                        <FormTH label="Status" />
                    </FormTHead>
                    <FormTBody>
                        <FormTD placeholder="Property name here" />
                        <FormTD placeholder="Location here" />
                        <FormTD placeholder="Assessment" style="flex justify-between">
                            <input type="text" placeholder="Material" class="bg-gray-50 ml-1 border-b border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                        </FormTD>
                        <FormTD placeholder="Current status" />
                    </FormTBody>
                </table>
                <div class="grid pt-4 sm:cols-span-1">
                    <BttnwithIcon text="Add row">
                        <Plus />
                    </BttnwithIcon>
                </div>
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Credit References:</h3>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">(List down all financing firms & individual who wxtended credit to you)</label>
            <div class="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                <table class="w-full">
                    <FormTHead>
                        <FormTH label="Name" />
                        <FormTH label="Type of Credit" />
                        <FormTH label="Terms" />
                        <FormTH label="Amount" />
                        <FormTH label="O/S Balance" />
                        <FormTH label="M/A" />
                    </FormTHead>
                    <FormTBody>
                        <FormTD placeholder="Property name here" />
                        <FormTD placeholder="Location here" />
                        <FormTD placeholder="Current status" />
                        <FormTD placeholder="Property name here" />
                        <FormTD placeholder="Location here" />
                        <FormTD placeholder="Current status" />
                    </FormTBody>
                </table>
                <div class="grid pt-4 sm:cols-span-1">
                    <BttnwithIcon text="Add row">
                        <Plus />
                    </BttnwithIcon>
                </div>
            </div>
        </>
    );
}