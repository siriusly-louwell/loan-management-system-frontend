import React from "react";
import {useOutletContext} from 'react-router-dom';
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import FormCheck from "../components/checkboxes/FormCheck";

export default function PersonalInfoForm() {
    const {handleChange, addressChange, applicant, address, copyAddress} = useOutletContext();

    return (
        <>
            <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Buyer's Personal Infomation:</h3>
            <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormInput label="First Name" type="text" name="first_name" id="first_name" value={applicant.first_name} onchange={handleChange} placeholder="Type first name" require={true} />
                <FormInput label="Middle Name" type="text" name="middle_name" id="mid_name" value={applicant.middle_name} onchange={handleChange} placeholder="Type middle name" require={true} />
                <FormInput label="Last Name" type="text" name="last_name" id="last_name" value={applicant.last_name} onchange={handleChange} placeholder="Type last name" require={true} />
                <FormSelect name="gender" label="Sex" id="gender" value={applicant.gender} onchange={handleChange} require={true}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Prefer not to say</option>
                </FormSelect>
                <FormInput label="Contact Number" type="number" name="contact_num" id="contact_num" value={applicant.contact_num} onchange={handleChange} placeholder="+63 912 3456 789" require={true} />
                <FormInput label="Email Address" type="email" name="email" id="email" value={applicant.email} onchange={handleChange} placeholder="doe@gmail.com" />
                <FormSelect name="status" label="Marital Status" id="status" value={applicant.status} onchange={handleChange} require={true}>
                    <option value="single">Single</option>
                    <option value="relationship">In a relationship</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="separated">Separated</option>
                </FormSelect>
                <div className="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
                    <FormSelect name="educ_attain" label="Educ. Attainment" id="educ_attain" value={applicant.educ_attain} onchange={handleChange} require={true}>
                        <option value="highschool">High School</option>
                        <option value="college">College Level</option>
                        <option value="graduate">College Graduate</option>
                        <option value="post">Post Graduate</option>
                    </FormSelect>
                    <FormInput label="Others" type="text" name="prod_name" id="name" placeholder="Others" />
                </div>
            </div>

            <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <div className="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
                    <FormSelect name="residence" label="Residential Status" id="residence" value={applicant.residence} onchange={handleChange} require={true}>
                        <option value="owned">Owned</option>
                        <option value="mortgaged">Owned(Mortgaged)</option>
                        <option value="rented">Rented</option>
                        <option value="staying">Staying/Relative</option>
                    </FormSelect>
                    <FormInput label="Others" type="text" name="prod_name" id="name" placeholder="Other reason" />
                </div>
                <FormInput label="Amortization Monthly" type="number" name="amortization" id="amortization" value={applicant.amortization} onchange={handleChange} placeholder="₱5,000" />
                <FormInput label="Rent Monthly" type="number" name="rent" id="rent" value={applicant.rent} onchange={handleChange} placeholder="₱500" />
                <FormInput label="SSS/GSIS #" type="text" name="sss" id="sss" value={applicant.sss} onchange={handleChange} placeholder="Type SSS/GSIS number" />
                <FormInput label="TIN #" type="text" name="tin" id="tin" value={applicant.tin} onchange={handleChange} placeholder="Type TIN number" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Present Address:</h3>
            <div className={"grid gap-4 mb-4 pb-2 " + (applicant.view ? 'flex w-full' : 'sm:grid-cols-3')}>
                {applicant.view ? (
                    <FormInput type="text" placeholder="Present Address" value={address.personal_pres} />
                ) : (
                    <>
                        {/* <FormSelect name="country" label="Country" id="country" value={address.country} onchange={addressChange} require={true}>
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
                        </FormSelect> */}
                        <FormSelect name="region" label="Region" id="region" value={address.region} onchange={addressChange} require={true}>
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
                        <FormSelect name="province" label="Province" id="province" value={address.province} onchange={addressChange} require={true}>
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
                        <FormSelect name="city" label="Municipality/City" id="city" value={address.city} onchange={addressChange} require={true}>
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
                        <FormSelect name="brgy" label="Barangay" id="brgy" value={address.brgy} onchange={addressChange} require={true}>
                            <option>A. O. Floriendo</option>
                            <option>Buenavista</option>
                            <option>Cacao</option>
                            <option>Cagangohan</option>
                            <option>Consolacion</option>
                            <option>Dapco</option>
                            <option>Datu Abdul Dadia</option>
                            <option>Gredu</option>
                            <option>J. P. Laurel</option>
                            <option>Kasilak</option>
                            <option>Katipunan</option>
                            <option>Katualan</option>
                            <option>Kiotoy</option>
                            <option>Little Panay</option>
                            <option>Lower Panaga</option>
                            <option>Mabunao</option>
                            <option>Maduao</option>
                            <option>Malativas</option>
                            <option>Manay</option>
                            <option>Nanyo</option>
                            <option>New Malaga</option>
                            <option>New Malitbog</option>
                            <option>New Pandan</option>
                            <option>New Visayas</option>
                            <option>Quezon</option>
                            <option>Salvacion</option>
                            <option>San Francisco</option>
                            <option>San Nicolas</option>
                            <option>San Pedro</option>
                            <option>San Roque</option>
                            <option>San Vicente</option>
                            <option>Santa Cruz</option>
                            <option>Santo Nino</option>
                            <option>Sindaton</option>
                            <option>Southern DAvao</option>
                            <option>Tagpore</option>
                            <option>Tibungol</option>
                            <option>Upper Licanan</option>
                            <option>Waterfall</option>
                        </FormSelect>
                        <FormSelect name="purok" label="Purok" id="purok" value={address.purok} onchange={addressChange} require={true}>
                            <option>Purok #1</option>
                            <option>Purok #2</option>
                            <option>Purok #3</option>
                            <option>Purok #4</option>
                            <option>Purok #5</option>
                            <option>Purok #6</option>
                            <option>Purok #7</option>
                            <option>Purok #8</option>
                            <option>Purok #9</option>
                            <option>Purok #10</option>
                        </FormSelect>
                        <FormInput label="Lot/House Number" type="text" name="lot_num" id="lot_num" value={address.lot_num} onchange={addressChange} placeholder="Type House number here" require={true} />
                    </>
                )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Previous Address:</h3>
            <FormCheck label="Copy Present Address" type="checkbox" id="copy_address" style="mb-4" change={() => copyAddress('personal')} />
            <div className={"grid gap-4 mb-4 pb-2 " + (applicant.view ? 'flex w-full' : 'sm:grid-cols-3')}>
                {applicant.view ? (
                    <FormInput type="text" placeholder="Present Address" value={address.personal_pres} />
                ) : (
                    <>
                        {/* <FormInput label="Country" type="text" name="prev_country" id="country" value={address.prev_country} onchange={addressChange} placeholder="Type country here" require={true} /> */}
                        <FormInput label="Region" type="text" name="prev_region" id="region" value={address.prev_region} onchange={addressChange} placeholder="Type region here" require={true} />
                        <FormInput label="Province" type="text" name="prev_province" id="province" value={address.prev_province} onchange={addressChange} placeholder="Type province here" require={true} />
                        <FormInput label="City/Municipality" type="text" name="prev_city" id="city" value={address.prev_city} onchange={addressChange} placeholder="Type city here" require={true} />
                        <FormInput label="Barangay" type="text" name="prev_brgy" id="brgy" value={address.prev_brgy} onchange={addressChange} placeholder="Type barangay here" require={true} />
                        <FormInput label="Purok" type="text" name="prev_purok" id="purok" value={address.prev_purok} onchange={addressChange} placeholder="Type House number here" require={true} />
                        <FormInput label="Lot/House Number" type="text" name="prev_lot_num" id="lot_num" value={address.prev_lot_num} onchange={addressChange} placeholder="Type House number here" require={true} />
                    </>
                )}
            </div>
        </>
    );
}