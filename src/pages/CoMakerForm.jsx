import React from 'react';
import Button from "../components/buttons/Button";
import FormInput from "../components/inputs/FormInput";
import BttnwithIcon from '../components/buttons/BttnwithIcon';
import Plus from "../assets/icons/Plus";
import FileInput from '../components/inputs/FileInput';
import FormSelect from '../components/inputs/FormSelect';

export default function CoMakerForm() {
    return (
        <div class="overflow-y-auto overflow-x-hidden justify-items-center items-center fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div class="relative p-4 w-full max-w-5xl h-full md:h-auto">
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div class="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">COMAKER'S PERSONAL INFORMATION</h3>
                    </div>
                    <form action="#">
                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Personal Information:</h3>
                        <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                            <FormInput label="First name" type="text" name="prod_name" id="name" placeholder="Type first name here" />
                            <FormInput label="Middle name" type="text" name="prod_name" id="name" placeholder="Type middle name here" />
                            <FormInput label="Last name" type="text" name="prod_name" id="name" placeholder="Type last name here" />
                            <FormInput label="Date of Birth" type="date" name="prod_name" id="name" placeholder="" />
                            <FormInput label="Place of Birth" type="text" name="prod_name" id="name" placeholder="Birth place address" />
                            <FormSelect name="gender" label="Sex" id="gender">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Prefer not to say</option>
                            </FormSelect>
                            <FormSelect name="status" label="Civil Status" id="status">
                                <option>Single</option>
                                <option>In a relationship</option>
                                <option>Married</option>
                                <option>Widowed</option>
                                <option>Separated</option>
                            </FormSelect>
                            <FormInput label="Religion" type="text" name="prod_name" id="name" placeholder="Catholic/INC" />
                            <FormInput label="Tribe" type="text" name="prod_name" id="name" placeholder="Type tribe here" />
                        </div>

                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Residential Address:</h3>
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
                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Permanent Address:</h3>
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

                        <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                            <FormInput label="Citizenship" type="text" name="prod_name" id="name" placeholder="Type citizenhip" />
                            <FormInput label="Occupation" type="text" name="prod_name" id="name" placeholder="Type occupation here" />
                            <FormInput label="Years of Service" type="text" name="prod_name" id="name" placeholder="Type last name here" />
                            <FormInput label="Employment Status" type="date" name="prod_name" id="name" placeholder="" />
                            <FormInput label="Contact Number" type="text" name="prod_name" id="name" placeholder="Phone number here" />
                            <FormInput label="Email Address" type="email" name="prod_name" id="name" placeholder="doe@gmail.com" />
                            <FormInput label="Facebook Account" type="text" name="prod_name" id="name" placeholder="Facebook name here" />
                            <FormInput label="Business Name/Employer" type="text" name="prod_name" id="name" placeholder="Name of business or employer" />
                            <FormInput label="Business/Employer Address" type="text" name="prod_name" id="name" placeholder="Type business address here" />
                            <div class="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
                                <FormSelect name="educ_attain" label="Educ. Attainment" id="educ_attain">
                                    <option>High School</option>
                                    <option>Colege Level</option>
                                    <option>College Graduate</option>
                                    <option>Post Graduate</option>
                                </FormSelect>
                                <FormInput label="Others" type="text" name="prod_name" id="name" placeholder="Vocational" />
                            </div>
                        </div>

                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Spouse Information:</h3>
                        <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                            <FormInput label="First name" type="text" name="prod_name" id="name" placeholder="Spouse first name here" />
                            <FormInput label="Middle name" type="text" name="prod_name" id="name" placeholder="Spouse middle name here" />
                            <FormInput label="Last name" type="text" name="prod_name" id="name" placeholder="Spouse last name here" />
                            <FormInput label="Citizenship" type="text" name="prod_name" id="name" placeholder="Type citizenhip" />
                            <FormInput label="Occupation" type="text" name="prod_name" id="name" placeholder="Type occupation here" />
                            <FormInput label="Years of Service" type="text" name="prod_name" id="name" placeholder="Type last name here" />
                            <FormInput label="Employment Status" type="date" name="prod_name" id="name" placeholder="" />
                            <FormInput label="Employment Address" type="text" name="prod_name" id="name" placeholder="Employer address here" />
                            <div class="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
                                <FormInput label="Number of Children" type="text" name="prod_name" id="name" placeholder="0" />
                                <FormInput label="Dep. Children" type="text" name="prod_name" id="name" placeholder="0" />
                            </div>
                        </div>

                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Spouse's Parents Information:</h3>
                        <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                            <FormInput label=" Father's First Name" type="text" name="prod_name" id="name" placeholder="First name here" />
                            <FormInput label=" Father's Middle Name" type="text" name="prod_name" id="name" placeholder="Middle name here" />
                            <FormInput label=" Father's Last Name" type="text" name="prod_name" id="name" placeholder="Last name here" />
                            <FormInput label=" Mother's First Name" type="text" name="prod_name" id="name" placeholder="First name here" />
                            <FormInput label=" Mother's Middle Name" type="text" name="prod_name" id="name" placeholder="Middle name here" />
                            <FormInput label=" Mother's maiden Name" type="text" name="prod_name" id="name" placeholder="Last name here" />
                        </div>

                        <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Parent's Address:</h3>
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

                        <div class="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                            <div class="grid gap-4 sm:grid-cols-2">
                                <FormInput label="Name of the Child" type="text" name="prod_name" id="name" placeholder="Full name here" />
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

                        <div class="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                            <FileInput label="Sketch Image" type="img" />
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