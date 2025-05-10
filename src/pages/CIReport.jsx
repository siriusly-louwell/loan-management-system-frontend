import React from 'react';
import Button from "../components/buttons/Button";
import FormInput from "../components/inputs/FormInput";
import BttnwithIcon from '../components/buttons/BttnwithIcon';
import Plus from "../assets/icons/Plus";
import FormTHead from '../components/tables/FormTHead';
import FormTH from '../components/tables/FormTH';
import FormTBody from '../components/tables/FormTBody';
import FormTD from '../components/tables/FormTD';
import FormTextarea from '../components/inputs/FormTextarea';
import FormCheck from '../components/checkboxes/FormCheck';
import FileInput from '../components/inputs/FileInput';

export default function CIReport() {
    return (
        <div class="overflow-y-auto overflow-x-hidden justify-items-center items-center fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div class="relative p-4 w-full max-w-5xl h-full md:h-auto">
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div class="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">CREDIT INVESTIGATION REPORT</h3>
                    </div>
                    <form action="#">
                        <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                            <FormInput label="Applicant name" type="text" name="prod_name" id="name" placeholder="Sample name" />
                            <FormInput label="Date of Birth" type="date" name="prod_name" id="name" placeholder="" />
                            <FormInput label="Place of Birth" type="text" name="prod_name" id="name" placeholder="Birth place address" />
                        </div>
                                
                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Father:</h3>
                        <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2">
                            <FormInput label="First name" type="text" name="prod_name" id="name" placeholder="Type first name here" />
                            <FormInput label="Middle name" type="text" name="prod_name" id="name" placeholder="Type middle name here" />
                            <FormInput label="Last name" type="text" name="prod_name" id="name" placeholder="Type last name here" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Mother:</h3>
                        <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                            <FormInput label="First name" type="text" name="prod_name" id="name" placeholder="Type first name here" />
                            <FormInput label="Middle name" type="text" name="prod_name" id="name" placeholder="Type middle name here" />
                            <FormInput label="Last name" type="text" name="prod_name" id="name" placeholder="Type last name here" />
                        </div>
                                            
                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Dependants:</h3>
                        <div class="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                            <table class="w-full">
                                <FormTHead>
                                    <FormTH label="Name" />
                                    <FormTH label="Relationship" />
                                    <FormTH label="Age" />
                                    <FormTH label="School" />
                                </FormTHead>
                                <FormTBody>
                                    <FormTD placeholder="Full name here" />
                                    <FormTD placeholder="Address here" />
                                    <FormTD placeholder="Cellphone number" />
                                    <FormTD placeholder="School name" />
                                </FormTBody>
                            </table>
                            <div class="grid pt-4 sm:cols-span-1">
                                <BttnwithIcon text="Add row">
                                    <Plus />
                                </BttnwithIcon>
                            </div>
                        </div>

                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Nearest Relatives:</h3>
                        <div class="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                            <table class="w-full">
                                <FormTHead>
                                    <FormTH label="Name" />
                                    <FormTH label="Relationship" />
                                    <FormTH label="Age" />
                                    <FormTH label="School" />
                                </FormTHead>
                                <FormTBody>
                                    <FormTD placeholder="Full name here" />
                                    <FormTD placeholder="Address here" />
                                    <FormTD placeholder="Cellphone number" />
                                    <FormTD placeholder="School name" />
                                </FormTBody>
                            </table>
                            <div class="grid pt-4 sm:cols-span-1">
                                <BttnwithIcon text="Add row">
                                    <Plus />
                                </BttnwithIcon>
                            </div>
                        </div>

                        <div class="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                            <FormTextarea name="description" id="description" label="Community Standing" placeholder="Write commuity standing here" />
                            <FormTextarea name="description" id="description" label="Brief description of place of residence and home" placeholder="Write residence description here" />
                        </div>

                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Unit Applied:</h3>
                        <div class="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                            <table class="w-full">
                                <FormTHead>
                                    <FormTH label="Model" />
                                    <FormTH label="Downpayment" />
                                    <FormTH label="Terms Conditions" />
                                </FormTHead>
                                <FormTBody>
                                    <FormTD placeholder="Model name" />
                                    <FormTD placeholder="Downpayment here" />
                                    <FormTD placeholder="Terms & Conditions" />
                                </FormTBody>
                            </table>
                            <div class="grid pt-4 sm:cols-span-1">
                                <BttnwithIcon text="Add row">
                                    <Plus />
                                </BttnwithIcon>
                            </div>
                        </div>
                                
                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">RECOMMENDATION:</h3>
                        <div class="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject is recommended for</label>
                                <div class="space-y-4 sm:flex sm:space-y-0">
                                    <FormCheck name="spouse_work[]" id="inline-check" label="Approval" value="" />
                                    <FormCheck name="spouse_work[]" id="inline-2-check" label="Disapproval" value="" />
                                </div>
                            </div>
                            <FormTextarea name="description" id="description" label="Other remarks" placeholder="Write remarks here" />
                        </div>

                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Unit verification:</h3>
                        <div class="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                            <FormInput label="First Unit applied" type="text" name="prod_name" id="name" placeholder="Type unit name here" />
                            <FileInput label="Sketch Image" type="img" />
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Delivered?</label>
                                <div class="space-y-4 sm:flex sm:space-y-0">
                                    <FormCheck name="spouse_work[]" id="inline-check" label="Yes" value="" />
                                    <FormCheck name="spouse_work[]" id="inline-2-check" label="No" value="" />
                                </div>
                            </div>
                            <FormInput label="Outlet" type="text" name="prod_name" id="name" placeholder="Type outlet here" />
                        </div>

                        <div class="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                            
                        </div>
        
                        <div class="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
                            <Button text="Done" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}