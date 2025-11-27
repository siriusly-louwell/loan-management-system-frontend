import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import FormCheck from "../components/checkboxes/FormCheck";
import copy_icon from "../assets/images/copy_icon.png";
import FormTextarea from "../components/inputs/FormTextarea";
import FormTHead from "../components/tables/FormTHead";
import FormTH from "../components/tables/FormTH";
import FormTBody from "../components/tables/FormTBody";
import FormTD from "../components/tables/FormTD";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Plus from "../assets/icons/Plus";
import { useDispatch, useSelector } from "react-redux";
import {
  initialForm,
  setType,
  copyAddress,
  disableAddress,
} from "../services/redux/slices/formSlice";
import { UserEntity } from "../services/entities/User";
import { UnitEntity } from "../services/entities/Unit";

export default function PersonalInfoForm() {
  const dispatch = useDispatch();
  const { role } = useSelector(UserEntity);
  const { dispatchInput, toggleKeep } = useOutletContext();
  const [unitApplied, setUnitApplied] = useState(1);
  const { addressLoading } = useSelector((state) => state.address);
  const { formData, selectDisable, copyLoading } = useSelector(
    (state) => state.form
  );
  const { regions, provinces, cities, barangays } = useSelector(
    (state) => state.address
  );
  const [contactNumber, setContactNumber] = useState(formData.applicant.contact_num);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    dispatch(setType("applicant"));
    if (role !== "customer") dispatch(initialForm({}));
  }, []);

  // Recalculate EMI whenever formData or related fields change
  useEffect(() => {
    const unitSelected = formData.unit;
    const loanAmount = unitSelected?.price && unitSelected?.downpayment 
      ? unitSelected.price - unitSelected.downpayment 
      : 0;

    // Monthly interest rate (annual interest rate of 10%)
    const monthlyInterestRate = (unitSelected.interest ?? 10) / 12 / 100;  // 10% annual interest rate
    const tenureInYears = unitSelected?.tenure || 3;  // Default tenure to 3 years if not specified
    const tenureInMonths = tenureInYears * 12;  // Convert tenure from years to months
    const quantity = unitSelected?.quantity || 1;  // Default quantity of 1 unit if not specified

 

    // EMI calculation
    const newEmi = loanAmount === 0 || monthlyInterestRate === 0
      ? Math.ceil(loanAmount / tenureInMonths)  // If no loan or interest, simple division of loan amount by tenure (in months)
      : Math.ceil(
          (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureInMonths)) /
          (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1) * quantity
        );

    console.log("Loan Amount: ", loanAmount);
    console.log("Monthly Interest Rate: ", monthlyInterestRate);
    console.log("Tenure in Years: ", tenureInYears);
    console.log("Tenure in Months: ", tenureInMonths);
    console.log("Quantity: ", quantity);
    console.log("Monthly Amortization: ", newEmi);


    console.log(formData);
    setEmi(newEmi);

    // Dispatch action if needed, based on changes to formData
    dispatch(disableAddress());
  }, [formData, dispatch, emi]); 

  
  function currency(num) {
    return `₱${parseFloat(num || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  // Apply dispatchInput, at the same, limits the character length
  function onChangeContact(event){
      const input = event.target.value.replace(/\D/g, ""); // removes non-numeric chars
      if (input.length <= 12) {
        setContactNumber(input);
        dispatchInput({ target: { name: "contact_num", value: input } });
      }
  }
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Buyer's Personal Infomation:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="First Name"
          type="text"
          name="first_name"
          id="first_name"
          value={formData.applicant.first_name}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type first name"
          require={true}
        />
        <FormInput
          label="Middle Name"
          type="text"
          name="middle_name"
          id="mid_name"
          value={formData.applicant.middle_name}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type middle name"
          require={false}
        />
        <FormInput
          label="Last Name"
          type="text"
          name="last_name"
          id="last_name"
          value={formData.applicant.last_name}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type last name"
          require={true}
        />
        <FormSelect
          name="gender"
          label="Sex"
          id="gender"
          value={formData.applicant.gender}
          onchange={(e) => dispatchInput(e)}
          require={true}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Prefer not to say</option>
        </FormSelect>
        <FormInput
          label="Contact Number"
          type="text"
          name="contact_num"
          maxLength={11}
          id="contact_num"
          value={contactNumber}
          onchange={onChangeContact}
          placeholder="+63 912 3456 789"
          require={true}
        />
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          id="email"
          require={true}
          value={formData.applicant.email}
          onchange={(e) => dispatchInput(e)}
          placeholder="doe@gmail.com"
        />
        <FormSelect
          name="status"
          label="Marital Status"
          id="status"
          value={formData.applicant.status}
          onchange={(e) => dispatchInput(e)}
          require={true}
        >
          <option value="single">Single</option>
          <option value="relationship">In a relationship</option>
          <option value="married">Married</option>
          <option value="widowed">Widowed</option>
          <option value="separated">Separated</option>
        </FormSelect>
        <FormInput
          label="Date of Birth"
          type="date"
          name="birth_day"
          id="bday"
          value={formData.applicant.birth_day}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Place of Birth"
          type="text"
          name="birth_place"
          id="bplace"
          value={formData.applicant.birth_place}
          onchange={(e) => dispatchInput(e)}
          placeholder="Birth place address"
          require={true}
        />
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <div className="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
          <FormSelect
            name="educ_attain"
            label="Educ. Attainment"
            id="educ_attain"
            value={formData.applicant.educ_attain}
            onchange={(e) => dispatchInput(e)}
            require={true}
          >
            <option value="highschool">High School</option>
            <option value="college">College Level</option>
            <option value="graduate">College Graduate</option>
            <option value="post">Post Graduate</option>
          </FormSelect>
          {/* <FormInput
            label="Others"
            type="text"
            name="prod_name"
            id="name"
            placeholder="Others"
            require={false}
            onchange={(e) => {
              console.log(e.target.value)
            }}
          /> */}
        </div>
        <div className="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
          <FormSelect
            name="residence"
            label="Residential Status"
            id="residence"
            value={formData.applicant.residence}
            onchange={(e) => dispatchInput(e)}
            require={true}
          >
            <option value="owned">Owned</option>
            <option value="mortgaged">Owned(Mortgaged)</option>
            <option value="rented">Rented</option>
            <option value="staying">Staying/Relative</option>
          </FormSelect>
          {/* <FormInput
            label="Others"
            type="text"
            name="prod_name"
            id="name"
            require={false}
            onchange={(e) => {
              console.log(e.target.value)
            }}
            placeholder="Other reason"
          /> */}
        </div>
        
        <input type="hidden" type="hidden"
          name="amortization"
          id="amortization"
          value={emi}
        />
        <FormInput
          label="Amortization Monthly"
          type="text"
          name="fake_amortization"
          id="fake_amortization"
          value={currency(emi)}
          placeholder="₱5,000"
          readOnly
        />
        <FormInput
          label="Rent Monthly"
          type="number"
          name="rent"
          id="rent"
          value={formData.applicant.rent}
          onchange={(e) => dispatchInput(e)}
          placeholder="₱500"
          require={true}
        />
        <FormInput
          label="SSS/GSIS #"
          type="number"
          name="sss"
          id="sss"
          value={formData.applicant.sss}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type SSS/GSIS number"
          require={false}
        />
        <FormInput
          label="TIN #"
          type="number"
          name="tin"
          id="tin"
          value={formData.applicant.tin}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type TIN number"
          require={false}
        />
        <FormTextarea
          name="comm_standing"
          id="comm_standing"
          label="Community Standing"
          value={formData.applicant.comm_standing}
          onchange={(e) => dispatchInput(e)}
          placeholder="Write community standing here"
          require={true}
        />
      </div>

      {role === "customer" && (
        <>
          <FormCheck
            label="Keep current address"
            type="checkbox"
            name="keep_personal"
            id="keep_address"
            style="mb-4"
            icon={copy_icon}
            change={() => toggleKeep("keep_personal", "address")}
          />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Current Address:
          </h3>
          <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Present Address:
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formData.address.personal_pres}
              </span>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Previous Address:
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formData.address.personal_prev}
              </span>
            </div>
          </div>
        </>
      )}

      {!formData.address.keep_personal && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
            Present Address:
          </h3>
          <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
            <FormSelect
              name="region"
              label="Region"
              id="region"
              require={true}
              loading={addressLoading}
              value={formData.address.region}
              onchange={(e) => dispatchInput(e, "address")}>
              {regions.map((reg, i) => (
                <option key={i} value={reg.code}>
                  {reg.name}
                </option>
              ))}
            </FormSelect>
            <FormSelect
              name="province"
              label="Province"
              id="province"
              require={true}
              loading={addressLoading}
              value={formData.address.province}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.personal}
            >
              {formData.address.region !== undefined &&
                formData.address.region !== "__EMPTY__" &&
                provinces.map((prov, i) => (
                  <option key={i} value={prov.code}>
                    {prov.name}
                  </option>
                ))}
            </FormSelect>
            <FormSelect
              name="city"
              label="Municipality/City"
              id="city"
              require={true}
              loading={addressLoading}
              value={formData.address.city}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.personal}
            >
              {formData.address.region !== undefined &&
                formData.address.region !== "__EMPTY__" &&
                cities.map((cit, i) => (
                  <option key={i} value={cit.code}>
                    {cit.name}
                  </option>
                ))}
            </FormSelect>
            <FormSelect
              name="brgy"
              label="Barangay"
              id="brgy"
              require={true}
              loading={addressLoading}
              value={formData.address.brgy}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.personal}
            >
              {formData.address.region !== undefined &&
                formData.address.region !== "__EMPTY__" &&
                barangays.map((bgy, i) => (
                  <option key={i} value={bgy.code}>
                    {bgy.name}
                  </option>
                ))}
            </FormSelect>
            <FormInput
              label="Purok"
              type="text"
              name="purok"
              id="purok"
              value={formData.address.purok}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type purok number here"
              require={true}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="lot_num"
              id="lot_num"
              value={formData.address?.lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={false}
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
            Previous Address:
          </h3>
          <FormCheck
            label="Copy Present Address"
            type="checkbox"
            id="copy_address"
            style="mb-4"
            change={() =>
              dispatch(
                copyAddress({
                  addressType: "personal",
                  region: formData.address.region,
                  province: formData.address.province,
                  city: formData.address.city,
                  barangay: formData.address.brgy,
                })
              )
            }
            icon={copy_icon}
          />
          <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
            <FormInput
              label="Region"
              type="text"
              name="prev_region"
              id="region"
              loading={copyLoading}
              value={formData.address.prev_region}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type region here"
              require={true}
            />
            <FormInput
              label="Province"
              type="text"
              name="prev_province"
              id="province"
              loading={copyLoading}
              value={formData.address.prev_province}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type province here"
              require={true}
            />
            <FormInput
              label="City/Municipality"
              type="text"
              name="prev_city"
              id="city"
              loading={copyLoading}
              value={formData.address.prev_city}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type city here"
              require={true}
            />
            <FormInput
              label="Barangay"
              type="text"
              name="prev_brgy"
              id="brgy"
              loading={copyLoading}
              value={formData.address.prev_brgy}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type barangay here"
              require={true}
            />
            <FormInput
              label="Purok"
              type="text"
              name="prev_purok"
              id="purok"
              value={formData.address.prev_purok}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={true}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="prev_lot_num"
              id="prev_lot_num"
              value={formData.address?.prev_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={false}
            />
          </div>
        </>
      )}

      <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-1">
        <FormTextarea
          name="home_description"
          id="home_description"
          label="Brief description of place of residence and home"
          value={formData.applicant.home_description}
          onchange={(e) => dispatchInput(e)}
          placeholder="Write residence description here"
          require={true}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Unit Applied:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
        <table className="w-full border rounded-lg overflow-hidden">
          <FormTHead>
            <tr>
              <FormTH label="Model" />
              <FormTH label="Downpayment" />
              <FormTH label="Terms Conditions" />
            </tr>
          </FormTHead>
          <FormTBody>
            {[...Array(unitApplied)].map((_, i) => (
              <tr key={i}>
                <FormTD placeholder="Model name" />
                <FormTD placeholder="Downpayment here" />
                <FormTD placeholder="Terms & Conditions" />
              </tr>
            ))}
          </FormTBody>
        </table>
        <div className="grid pt-4 sm:cols-span-1">
          <BttnwithIcon
            text="Add row"
            type="button"
            click={() => setUnitApplied(unitApplied + 1)}
          >
            <Plus />
          </BttnwithIcon>
        </div>
      </div>
    </>
  );
}
