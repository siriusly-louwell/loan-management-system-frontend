import React from "react";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import FormCheck from "../components/checkboxes/FormCheck";
import BttnwithIcon from '../components/buttons/BttnwithIcon';
import Plus from "../assets/icons/Plus";
import FormTHead from '../components/tables/FormTHead';
import FormTH from '../components/tables/FormTH';
import FormTBody from '../components/tables/FormTBody';
import FormTD from '../components/tables/FormTD';

export default function FamilyInfoForm() {
    return (
        <>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Family Information:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormInput label="Spouse name" type="text" name="prod_name" id="name" placeholder="Type full name" />
                <FormInput label="Date of Birth" type="date" name="prod_name" id="name" placeholder="" />
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Spouse Working?</label>
                    <div class="space-y-4 sm:flex sm:space-y-0">
                        <FormCheck name="spouse_work[]" id="inline-check" label="Yes" value="" />
                        <FormCheck name="spouse_work[]" id="inline-2-check" label="No" value="" />
                    </div>
                </div>
                {/* <FormInput label="Employer" type="text" name="prod_name" id="name" placeholder="Employer full name" /> */}
                <div class="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                    <FormInput label="Number of Children" type="text" name="prod_name" id="name" placeholder="0" />
                    <FormInput label="Dep. Children" type="text" name="prod_name" id="name" placeholder="0" />
                    <FormSelect name="school" label="Schooling Children" id="school">
                        <option>Public</option>
                        <option>Private</option>
                    </FormSelect>
                </div>
            </div>
            
            <div class="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                <div class="grid gap-4 sm:grid-cols-4">
                    <FormInput label="Name of Schooling Children" type="text" name="prod_name" id="name" placeholder="Full name here" />
                    <FormInput label="Age" type="number" name="prod_name" id="name" placeholder="" />
                    <FormInput label="Enrolled at" type="text" name="prod_name" id="name" placeholder="Type school here" />
                    <FormInput label="Address" type="text" name="prod_name" id="name" placeholder="Full address here" />
                </div>
                <div class="grid pt-4 sm:cols-span-3">
                    <BttnwithIcon text="Add row">
                        <Plus />
                    </BttnwithIcon>
                </div>
            </div>

            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Parent's Present Address:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-4 pb-2">
                <FormInput label="Lot number" type="text" name="prod_name" id="name" placeholder="Lot number" />
                <FormInput label="Phase" type="text" name="prod_name" id="name" placeholder="Type phase" />
                <FormInput label="Sitio" type="text" name="prod_name" id="name" placeholder="Type sitio" />
                <FormInput label="City/Municipality" type="text" name="prod_name" id="name" placeholder="Type city" />
                <FormInput label="Blk number" type="text" name="prod_name" id="name" placeholder="Blk number" />
                <FormInput label="Purok" type="text" name="prod_name" id="name" placeholder="Type purok" />
                <FormInput label="Barangay" type="text" name="prod_name" id="name" placeholder="Type brgy" />
                <FormInput label="District/Province" type="text" name="prod_name" id="name" placeholder="Type district" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Parent's Previous Address:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-4 pb-2 border-b dark:border-gray-500">
                <FormInput label="Lot number" type="text" name="prod_name" id="name" placeholder="Lot number" />
                <FormInput label="Phase" type="text" name="prod_name" id="name" placeholder="Type phase" />
                <FormInput label="Sitio" type="text" name="prod_name" id="name" placeholder="Type sitio" />
                <FormInput label="City/Municipality" type="text" name="prod_name" id="name" placeholder="Type city" />
                <FormInput label="Blk number" type="text" name="prod_name" id="name" placeholder="Blk number" />
                <FormInput label="Purok" type="text" name="prod_name" id="name" placeholder="Type purok" />
                <FormInput label="Barangay" type="text" name="prod_name" id="name" placeholder="Type brgy" />
                <FormInput label="District/Province" type="text" name="prod_name" id="name" placeholder="Type district" />
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Spouse's Present Address:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-4 pb-2">
                <FormInput label="Lot number" type="text" name="prod_name" id="name" placeholder="Lot number" />
                <FormInput label="Phase" type="text" name="prod_name" id="name" placeholder="Type phase" />
                <FormInput label="Sitio" type="text" name="prod_name" id="name" placeholder="Type sitio" />
                <FormInput label="City/Municipality" type="text" name="prod_name" id="name" placeholder="Type city" />
                <FormInput label="Blk number" type="text" name="prod_name" id="name" placeholder="Blk number" />
                <FormInput label="Purok" type="text" name="prod_name" id="name" placeholder="Type purok" />
                <FormInput label="Barangay" type="text" name="prod_name" id="name" placeholder="Type brgy" />
                <FormInput label="District/Province" type="text" name="prod_name" id="name" placeholder="Type district" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Spouse's Previous Address:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-4 pb-2 border-b dark:border-gray-500">
                <FormInput label="Lot number" type="text" name="prod_name" id="name" placeholder="Lot number" />
                <FormInput label="Phase" type="text" name="prod_name" id="name" placeholder="Type phase" />
                <FormInput label="Sitio" type="text" name="prod_name" id="name" placeholder="Type sitio" />
                <FormInput label="City/Municipality" type="text" name="prod_name" id="name" placeholder="Type city" />
                <FormInput label="Blk number" type="text" name="prod_name" id="name" placeholder="Blk number" />
                <FormInput label="Purok" type="text" name="prod_name" id="name" placeholder="Type purok" />
                <FormInput label="Barangay" type="text" name="prod_name" id="name" placeholder="Type brgy" />
                <FormInput label="District/Province" type="text" name="prod_name" id="name" placeholder="Type district" />
            </div>

            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Personal References</h3>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">(Relatives or friends not living with you)</label>
            <div class="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                <table class="w-full">
                    <FormTHead>
                        <FormTH label="Name" />
                        <FormTH label="Address" />
                        <FormTH label="Contact number" />
                    </FormTHead>
                    <FormTBody>
                        <FormTD placeholder="Full name here" />
                        <FormTD placeholder="Address here" />
                        <FormTD placeholder="Cellphone number" />
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