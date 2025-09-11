import React, { useState } from "react";
import Button from "../components/buttons/Button";
import FormInput from "../components/inputs/FormInput";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Plus from "../assets/icons/Plus";
import FileInput from "../components/inputs/FileInput";
import FormSelect from "../components/inputs/FormSelect";
import FormCheck from "../components/checkboxes/FormCheck";

export default function ComakerInfo() {
  const [comaker, setComaker] = useState({});

  function comakeChange(event) {
    setComaker({
      ...comaker,
      [event.target.name]: event.target.value,
    });
  }

  function copycomake() {
    setComaker({
      ...comaker,
      perm_country: comaker.country,
      perm_region: comaker.region,
      perm_province: comaker.province,
      perm_city: comaker.city,
      perm_brgy: comaker.brgy,
    });
  }

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Personal Information:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="First name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type first name here"
          // require={true}
          onchange={() => {}}
        />
        <FormInput
          label="Middle name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type middle name here"
          // require={true}
          onchange={() => {}}
        />
        <FormInput
          label="Last name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type last name here"
          // require={true}
          onchange={() => {}}
        />
        <FormInput
          label="Date of Birth"
          type="date"
          name="prod_name"
          id="name"
          // require={true}
          onchange={() => {}}
        />
        <FormInput
          label="Place of Birth"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Birth place address"
          // require={true}
          onchange={() => {}}
        />
        <FormSelect name="gender" label="Sex" id="gender"
        // require={true}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Prefer not to say</option>
        </FormSelect>
        <FormSelect
          name="status"
          label="Civil Status"
          id="status"
          // require={true}
          >
          <option>Single</option>
          <option>In a relationship</option>
          <option>Married</option>
          <option>Widowed</option>
          <option>Separated</option>
        </FormSelect>
        <FormInput
          label="Religion"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Catholic/INC"
          onchange={() => {}}
        />
        <FormInput
          label="Tribe"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type tribe here"
          onchange={() => {}}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Residential Address:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2">
        <FormSelect
          name="country"
          label="Country"
          id="country"
          value={comaker.country}
          onchange={comakeChange}
          // require={true}
          >
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
        <FormSelect
          name="region"
          label="Region"
          id="region"
          value={comaker.region}
          onchange={comakeChange}
          // require={true}
          >
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
        <FormSelect
          name="province"
          label="Province"
          id="province"
          value={comaker.province}
          onchange={comakeChange}
          // require={true}
          >
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
        <FormSelect
          name="city"
          label="Municipality/City"
          id="city"
          value={comaker.city}
          onchange={comakeChange}
          // require={true}
          >
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
        <FormSelect
          name="brgy"
          label="Barangay"
          id="brgy"
          value={comaker.brgy}
          onchange={comakeChange}
          // require={true}
          >
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
      </div>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Permanent Address:
      </h3>
      <FormCheck
        label="Copy Residential Address"
        type="checkbox"
        id="copy_address"
        style="mb-4"
        change={copycomake}
      />
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="Country"
          type="text"
          name="perm_country"
          id="country"
          value={comaker.perm_country}
          onchange={comakeChange}
          placeholder="Type country here"
          // require={true}
        />
        <FormInput
          label="Region"
          type="text"
          name="perm_region"
          id="region"
          value={comaker.perm_region}
          onchange={comakeChange}
          placeholder="Type region here"
          // require={true}
        />
        <FormInput
          label="Province"
          type="text"
          name="perm_province"
          id="province"
          value={comaker.perm_province}
          onchange={comakeChange}
          placeholder="Type province here"
          // require={true}
        />
        <FormInput
          label="City/Municipality"
          type="text"
          name="perm_city"
          id="city"
          value={comaker.perm_city}
          onchange={comakeChange}
          placeholder="Type city here"
          // require={true}
        />
        <FormInput
          label="Barangay"
          type="text"
          name="perm_brgy"
          id="brgy"
          value={comaker.perm_brgy}
          onchange={comakeChange}
          placeholder="Type barangay here"
          // require={true}
        />
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="Citizenship"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type citizenhip"
          // require={true}
          onchange={() => {}}
        />
        <FormInput
          label="Occupation"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type occupation here"
          // require={true}
          onchange={() => {}}
        />
        <FormInput
          label="Years of Service"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type last name here"
          // require={true}
          onchange={() => {}}
        />
        <FormInput
          label="Employment Status"
          type="date"
          name="prod_name"
          id="name"
          // require={true}
          onchange={() => {}}
        />
        <FormInput
          label="Contact Number"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Phone number here"
          // require={true}
          onchange={() => {}}
        />
        <FormInput
          label="Email Address"
          type="email"
          name="prod_name"
          id="name"
          placeholder="doe@gmail.com"
          onchange={() => {}}
        />
        <FormInput
          label="Facebook Account"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Facebook name here"
          onchange={() => {}}
        />
        <FormInput
          label="Business Name/Employer"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Name of business or employer"
          onchange={() => {}}
        />
        <FormInput
          label="Business/Employer Address"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type business address here"
          onchange={() => {}}
        />
        <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
          <FormSelect
            name="educ_attain"
            label="Educ. Attainment"
            id="educ_attain"
            require={true}>
            <option>High School</option>
            <option>College Level</option>
            <option>College Graduate</option>
            <option>Post Graduate</option>
          </FormSelect>
          <FormInput
            label="Others"
            type="text"
            name="prod_name"
            id="name"
            placeholder="Others"
            onchange={() => {}}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Spouse Information:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="First name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Spouse first name here"
          onchange={() => {}}
        />
        <FormInput
          label="Middle name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Spouse middle name here"
          onchange={() => {}}
        />
        <FormInput
          label="Last name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Spouse last name here"
          onchange={() => {}}
        />
        <FormInput
          label="Citizenship"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type citizenhip"
          onchange={() => {}}
        />
        <FormInput
          label="Occupation"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type occupation here"
          onchange={() => {}}
        />
        <FormInput
          label="Years of Service"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Type last name here"
          onchange={() => {}}
        />
        <FormInput
          label="Employment Status"
          type="date"
          name="prod_name"
          id="name"
          placeholder=""
          onchange={() => {}}
        />
        <FormInput
          label="Employment Address"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Employer address here"
          onchange={() => {}}
        />
        <div className="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
          <FormInput
            label="Number of Children"
            type="text"
            name="prod_name"
            id="name"
            placeholder="0"
            onchange={() => {}}
          />
          <FormInput
            label="Dep. Children"
            type="text"
            name="prod_name"
            id="name"
            placeholder="0"
            onchange={() => {}}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Spouse's Parents Information:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label=" Father's First Name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="First name here"
          onchange={() => {}}
        />
        <FormInput
          label=" Father's Middle Name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Middle name here"
          onchange={() => {}}
        />
        <FormInput
          label=" Father's Last Name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Last name here"
          onchange={() => {}}
        />
        <FormInput
          label=" Mother's First Name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="First name here"
          onchange={() => {}}
        />
        <FormInput
          label=" Mother's Middle Name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Middle name here"
          onchange={() => {}}
        />
        <FormInput
          label=" Mother's maiden Name"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Last name here"
          onchange={() => {}}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Parent's Address:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormSelect name="country" label="Country" id="country"
        // require={true}
        >
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
        <FormSelect name="region" label="Region" id="region"
        // require={true}
        >
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
        <FormSelect
          name="province"
          label="Province"
          id="province"
          // require={true}
          >
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
        <FormSelect
          name="city"
          label="Municipality/City"
          id="city"
          // require={true}
          >
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
        <FormSelect name="brgy" label="Barangay" id="brgy"
        // require={true}
        >
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
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
        <div className="grid gap-4 sm:grid-cols-4">
          <FormInput
            label="Name of the Child"
            type="text"
            name="prod_name"
            id="name"
            placeholder="Full name here"
            onchange={() => {}}
          />
          <FormInput
            label="Age"
            type="number"
            name="prod_name"
            id="name"
            placeholder=""
            onchange={() => {}}
          />
          <FormInput
            label="Enrolled at"
            type="text"
            name="prod_name"
            id="name"
            placeholder="Type school here"
            onchange={() => {}}
          />
          <FormInput
            label="Address"
            type="text"
            name="prod_name"
            id="name"
            placeholder="Full address here"
            onchange={() => {}}
          />
        </div>
        <div className="grid pt-4 sm:cols-span-3">
          <BttnwithIcon text="Add row">
            <Plus />
          </BttnwithIcon>
        </div>
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
        <FileInput label="Sketch Image" type="img"
        // require={true}
        />
        <FileInput label="Valid ID" type="img"
        // require={true}
        />
        <FileInput label="2x2 ID picture" type="img"
        // require={true}
        />
        <FileInput label="Proof of Residence" type="img"
        // require={true}
        />
      </div>
    </>
  );
}
