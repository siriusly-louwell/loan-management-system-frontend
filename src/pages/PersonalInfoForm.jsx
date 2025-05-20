import React from "react";
import {useOutletContext} from 'react-router-dom';
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";

export default function PersonalInfoForm() {
    const {handleChange, applicant} = useOutletContext();

    return (
        <>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Buyer's Personal Infomation:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormInput label="First Name" type="text" name="first_name" id="first_name" value={applicant.first_name} onchange={handleChange} placeholder="Type first name" />
                <FormInput label="Middle Name" type="text" name="middle_name" id="mid_name" value={applicant.middle_name} onchange={handleChange} placeholder="Type middle name" />
                <FormInput label="Last Name" type="text" name="last_name" id="last_name" value={applicant.last_name} onchange={handleChange} placeholder="Type last name" />
                <FormSelect name="gender" label="Sex" id="gender" value={applicant.gender} onchange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Prefer not to say</option>
                </FormSelect>
                <FormSelect name="status" label="Marital Status" id="status" value={applicant.status} onchange={handleChange}>
                    <option value="single">Single</option>
                    <option value="relationship">In a relationship</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="separated">Separated</option>
                </FormSelect>
                <div class="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
                    <FormSelect name="educ_attain" label="Educ. Attainment" id="educ_attain" value={applicant.educ_attain} onchange={handleChange}>
                        <option value="highschool">High School</option>
                        <option value="college">College Level</option>
                        <option value="graduate">College Graduate</option>
                        <option value="post">Post Graduate</option>
                    </FormSelect>
                    <FormInput label="Others" type="text" name="prod_name" id="name" placeholder="Vocational" />
                </div>
            </div>

            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <div class="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
                    <FormSelect name="residence" label="Residential Status" id="residence" value={applicant.residence} onchange={handleChange}>
                        <option value="owned">Owned</option>
                        <option value="mortgaged">Owned(Mortgaged)</option>
                        <option value="rented">Rented</option>
                        <option value="staying">Staying/Relative</option>
                    </FormSelect>
                    <FormInput label="Others" type="text" name="prod_name" id="name" placeholder="Other reason" />
                </div>
                <FormInput label="Amortization Monthly" type="number" name="amortization" id="amortization" value={applicant.amortization} onchange={handleChange} placeholder="PHP" />
                <FormInput label="Rent Monthly" type="number" name="rent" id="rent" value={applicant.rent} onchange={handleChange} placeholder="PHP" />
                <FormInput label="SSS/GSIS #" type="text" name="sss" id="sss" value={applicant.sss} onchange={handleChange} placeholder="Type SSS/GSIS number" />
                <FormInput label="TIN #" type="text" name="tin" id="tin" value={applicant.tin} onchange={handleChange} placeholder="Type TIN number" />
            </div>

            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Present Address:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2">
                <FormSelect name="country" label="Country" id="country">
                    <option>Nigeria</option>
                    <option>Greece</option>
                    <option>USA</option>
                    <option>Philippines</option>
                    <option>Italy</option>
                    <option>Germany</option>
                    <option>Afganistan</option>
                    <option>India</option>
                    <option>Pakistan</option>
                    <option>Bulgaria</option>
                    <option>Bahrain</option>
                    <option>Botswana</option>
                    <option>France</option>
                    <option>Great Britain</option>
                </FormSelect>
                <FormSelect name="region" label="Region" id="region">
                    <option>Region I</option>
                    <option>Region II</option>
                    <option>Region III</option>
                    <option>Region IV</option>
                    <option>Region V</option>
                    <option>Region VI</option>
                    <option>Region VII</option>
                    <option>Region VIII</option>
                    <option>Region IX</option>
                    <option>Region X</option>
                    <option>Region XI</option>
                    <option>Region XII</option>
                    <option>Region XIII</option>
                    <option>Region XIV</option>
                </FormSelect>
                <FormSelect name="province" label="Province" id="province">
                    <option>Zamboanga del norte</option>
                    <option>Zamboanga del sur</option>
                    <option>Zamboanga sibugay</option>
                    <option>Davao del norte</option>
                    <option>Davao del sur</option>
                    <option>Davao de oro(Compostela Valley)</option>
                    <option>Davao oriental</option>
                    <option>Davao Occidental</option>
                    <option>Cotabato</option>
                    <option>Sarangani</option>
                    <option>South Cotabato</option>
                </FormSelect>
                <FormSelect name="city" label="Municipality/City" id="city">
                    <option>Davao City</option>
                    <option>Panabo City</option>
                    <option>Tagum City</option>
                    <option>Samal Island</option>
                    <option>Digos City</option>
                    <option>Mati City</option>
                    <option>Talaingod</option>
                    <option>San Isidro</option>
                    <option>Carmen</option>
                    <option>Kapalong</option>
                    <option>New Corilla</option>
                    <option>Sto. Tomas</option>
                </FormSelect>
                <FormSelect name="brgy" label="Barangay" id="brgy">
                    <option>Baranggay I</option>
                    <option>Baranggay II</option>
                    <option>Baranggay III</option>
                    <option>Baranggay IV</option>
                    <option>Baranggay V</option>
                    <option>Baranggay VI</option>
                    <option>Baranggay VII</option>
                    <option>Baranggay VIII</option>
                    <option>Baranggay IX</option>
                    <option>Baranggay X</option>
                </FormSelect>
                {/* <FormInput label="Lot number" type="text" name="prod_name" id="name" placeholder="Lot number" />
                <FormInput label="Phase" type="text" name="prod_name" id="name" placeholder="Type phase" />
                <FormInput label="Sitio" type="text" name="prod_name" id="name" placeholder="Type sitio" />
                <FormInput label="City/Municipality" type="text" name="prod_name" id="name" placeholder="Type city" />
                <FormInput label="Blk number" type="text" name="prod_name" id="name" placeholder="Blk number" />
                <FormInput label="Purok" type="text" name="prod_name" id="name" placeholder="Type purok" />
                <FormInput label="Barangay" type="text" name="prod_name" id="name" placeholder="Type brgy" />
                <FormInput label="District/Province" type="text" name="prod_name" id="name" placeholder="Type district" /> */}
            </div>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Previous Address:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormSelect name="country" label="Country" id="country">
                    <option>Nigeria</option>
                    <option>Greece</option>
                    <option>USA</option>
                    <option>Philippines</option>
                    <option>Italy</option>
                    <option>Germany</option>
                    <option>Afganistan</option>
                    <option>India</option>
                    <option>Pakistan</option>
                    <option>Bulgaria</option>
                    <option>Bahrain</option>
                    <option>Botswana</option>
                    <option>France</option>
                    <option>Great Britain</option>
                </FormSelect>
                <FormSelect name="region" label="Region" id="region">
                    <option>Region I</option>
                    <option>Region II</option>
                    <option>Region III</option>
                    <option>Region IV</option>
                    <option>Region V</option>
                    <option>Region VI</option>
                    <option>Region VII</option>
                    <option>Region VIII</option>
                    <option>Region IX</option>
                    <option>Region X</option>
                    <option>Region XI</option>
                    <option>Region XII</option>
                    <option>Region XIII</option>
                    <option>Region XIV</option>
                </FormSelect>
                <FormSelect name="province" label="Province" id="province">
                    <option>Zamboanga del norte</option>
                    <option>Zamboanga del sur</option>
                    <option>Zamboanga sibugay</option>
                    <option>Davao del norte</option>
                    <option>Davao del sur</option>
                    <option>Davao de oro(Compostela Valley)</option>
                    <option>Davao oriental</option>
                    <option>Davao Occidental</option>
                    <option>Cotabato</option>
                    <option>Sarangani</option>
                    <option>South Cotabato</option>
                </FormSelect>
                <FormSelect name="city" label="Municipality/City" id="city">
                    <option>Davao City</option>
                    <option>Panabo City</option>
                    <option>Tagum City</option>
                    <option>Samal Island</option>
                    <option>Digos City</option>
                    <option>Mati City</option>
                    <option>Talaingod</option>
                    <option>San Isidro</option>
                    <option>Carmen</option>
                    <option>Kapalong</option>
                    <option>New Corilla</option>
                    <option>Sto. Tomas</option>
                </FormSelect>
                <FormSelect name="brgy" label="Barangay" id="brgy">
                    <option>Baranggay I</option>
                    <option>Baranggay II</option>
                    <option>Baranggay III</option>
                    <option>Baranggay IV</option>
                    <option>Baranggay V</option>
                    <option>Baranggay VI</option>
                    <option>Baranggay VII</option>
                    <option>Baranggay VIII</option>
                    <option>Baranggay IX</option>
                    <option>Baranggay X</option>
                </FormSelect>
                {/* <FormInput label="Lot number" type="text" name="prod_name" id="name" placeholder="Lot number" />
                <FormInput label="Phase" type="text" name="prod_name" id="name" placeholder="Type phase" />
                <FormInput label="Sitio" type="text" name="prod_name" id="name" placeholder="Type sitio" />
                <FormInput label="City/Municipality" type="text" name="prod_name" id="name" placeholder="Type city" />
                <FormInput label="Blk number" type="text" name="prod_name" id="name" placeholder="Blk number" />
                <FormInput label="Purok" type="text" name="prod_name" id="name" placeholder="Type purok" />
                <FormInput label="Barangay" type="text" name="prod_name" id="name" placeholder="Type brgy" />
                <FormInput label="District/Province" type="text" name="prod_name" id="name" placeholder="Type district" /> */}
            </div>
        </>
    );
}