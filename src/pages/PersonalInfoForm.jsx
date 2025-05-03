import React from "react";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";

export default function PersonalInfoForm() {
    return (
        <>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Buyer's Personal Infomation:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormInput label="First Name" type="text" name="prod_name" id="name" placeholder="Type first name" />
                <FormInput label="Middle Name" type="text" name="prod_name" id="name" placeholder="Type middle name" />
                <FormInput label="Last Name" type="text" name="prod_name" id="name" placeholder="Type last name" />
                <FormSelect name="gender" label="Sex" id="gender">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>
                </FormSelect>
                <FormSelect name="status" label="Marital Status" id="status">
                    <option>Single</option>
                    <option>In a relationship</option>
                    <option>Married</option>
                    <option>Widowed</option>
                    <option>Separated</option>
                </FormSelect>
                <div class="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
                    <FormSelect name="educ_attain" label="Educ. Attainment" id="educ_attain">
                        <option>High School</option>
                        <option>Colege Level</option>
                        <option>College Graduate</option>
                        <option>Post Graduate</option>
                    </FormSelect>
                    <FormInput label="Others" type="text" name="prod_name" id="name" placeholder="Vocational" />
                </div>
                <FormInput label="Email Address" type="email" name="prod_name" id="name" placeholder="John@gmail.com" />
            </div>

            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <div class="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
                    <FormSelect name="residence" label="Residential Status" id="residence">
                        <option>Owned</option>
                        <option>Owned(Mortgaged)</option>
                        <option>Rented</option>
                        <option>Staying/Relative</option>
                    </FormSelect>
                    <FormInput label="Others" type="text" name="prod_name" id="name" placeholder="Other reason" />
                </div>
                <FormInput label="Amortization Monthly" type="number" name="prod_name" id="name" placeholder="PHP" />
                <FormInput label="Rent Monthly" type="number" name="prod_name" id="name" placeholder="PHP" />
                <FormInput label="SSS/GSIS #" type="text" name="prod_name" id="name" placeholder="Type SSS/GSIS number" />
                <FormInput label="TIN #" type="text" name="prod_name" id="name" placeholder="Type TIN number" />
            </div>

            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Present Address:</h3>
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
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Previous Address:</h3>
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
        </>
    );
}