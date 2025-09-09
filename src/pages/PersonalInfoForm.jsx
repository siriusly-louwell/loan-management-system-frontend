import React, { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
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
  draftForm,
  getDraft,
} from "../services/redux/slices/formSlice";

export default function PersonalInfoForm() {
  const location = useLocation();
  const { formData, selectDisable, disabled } = useSelector(
    (state) => state.form
  );
  const dispatch = useDispatch();
  const {
    handleChange,
    dispatchInput,
    addressChange,
    applicant,
    address,
    // copyAddress,
    disable,
    locations,
  } = useOutletContext();
  const disBool =
    formData.address.region === undefined ||
    formData.address.region === "__EMPTY__"
      ? true
      : disable;
  const urlBool =
    location.pathname !== "/admin/apply" &&
    location.pathname !== "/staff/apply" &&
    location.pathname !== "/ci/apply";

  useEffect(() => {
    dispatch(setType("applicant"));
    dispatch(initialForm({}));
    dispatch(getDraft());
  }, []);

  useEffect(() => {
    dispatch(disableAddress());
    setTimeout(() => {
      dispatch(draftForm());
    }, 3000);
  }, [formData]);

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Buyer's Personal Infomation:
      </h3>
      {urlBool ? (
        ""
      ) : (
        <img
          src={`http://127.0.0.1:8000/storage/${applicant.id_pic}`}
          className="rounded rounded-lg w-20"
        />
      )}
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
          disable={disable}
        />
        <FormInput
          label="Middle Name"
          type="text"
          name="middle_name"
          id="mid_name"
          value={formData.applicant.middle_name}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type middle name"
          disable={disable}
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
          disable={disable}
        />
        <FormSelect
          name="gender"
          label="Sex"
          id="gender"
          value={formData.applicant.gender}
          onchange={(e) => dispatchInput(e)}
          require={true}
          disable={disable}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Prefer not to say</option>
        </FormSelect>
        <FormInput
          label="Contact Number"
          type="number"
          name="contact_num"
          min={99999999999}
          id="contact_num"
          value={formData.applicant.contact_num}
          onchange={(e) => dispatchInput(e)}
          placeholder="+63 912 3456 789"
          require={true}
          disable={disable}
        />
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          id="email"
          value={formData.applicant.email}
          onchange={(e) => dispatchInput(e)}
          placeholder="doe@gmail.com"
          disable={disable}
        />
        <FormSelect
          name="status"
          label="Marital Status"
          id="status"
          value={formData.applicant.status}
          onchange={(e) => dispatchInput(e)}
          require={true}
          disable={disable}>
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
          disable={disable}
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
          disable={disable}
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
            disable={disable}>
            <option value="highschool">High School</option>
            <option value="college">College Level</option>
            <option value="graduate">College Graduate</option>
            <option value="post">Post Graduate</option>
          </FormSelect>
          <FormInput
            label="Others"
            type="text"
            name="prod_name"
            id="name"
            placeholder="Others"
            disable={disable}
            onchange={() => {}}
          />
        </div>
        <div className="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
          <FormSelect
            name="residence"
            label="Residential Status"
            id="residence"
            value={formData.applicant.residence}
            onchange={(e) => dispatchInput(e)}
            require={true}
            disable={disable}>
            <option value="owned">Owned</option>
            <option value="mortgaged">Owned(Mortgaged)</option>
            <option value="rented">Rented</option>
            <option value="staying">Staying/Relative</option>
          </FormSelect>
          <FormInput
            label="Others"
            type="text"
            name="prod_name"
            id="name"
            onchange={() => {}}
            placeholder="Other reason"
            disable={disable}
          />
        </div>
        <FormInput
          label="Amortization Monthly"
          type="number"
          name="amortization"
          id="amortization"
          value={formData.applicant.amortization}
          onchange={(e) => dispatchInput(e)}
          placeholder="₱5,000"
          require={true}
          disable={disable}
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
          disable={disable}
        />
        <FormInput
          label="SSS/GSIS #"
          type="number"
          name="sss"
          id="sss"
          value={formData.applicant.sss}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type SSS/GSIS number"
          disable={disable}
        />
        <FormInput
          label="TIN #"
          type="number"
          name="tin"
          id="tin"
          value={formData.applicant.tin}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type TIN number"
          disable={disable}
        />
        <FormTextarea
          name="comm_standing"
          id="comm_standing"
          label="Community Standing"
          value={formData.applicant.comm_standing}
          onchange={(e) => dispatchInput(e)}
          placeholder="Write commuity standing here"
          require={true}
          disable={disable}
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Present Address:
      </h3>
      <div
        className={
          "grid gap-4 mb-4 pb-2 " +
          (applicant.view ? "flex w-full" : "sm:grid-cols-3")
        }>
        {applicant.view ? (
          <FormInput
            type="text"
            placeholder="Present Address"
            value={address.personal_pres}
            disable={disable}
          />
        ) : (
          <>
            <FormSelect
              name="region"
              label="Region"
              id="region"
              value={formData.address.region}
              onchange={(e) => dispatchInput(e, "address")}
              require={true}
              disable={disable}>
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
              <option>Region XV</option>
            </FormSelect>
            <FormSelect
              name="province"
              label="Province"
              id="province"
              value={formData.address.province}
              onchange={(e) => dispatchInput(e, "address")}
              require={true}
              disable={selectDisable}>
              {formData.address.region !== undefined &&
              formData.address.region !== "__EMPTY__"
                ? locations[
                    formData.address.region.substring(
                      7,
                      formData.address.region.length
                    )
                  ].province.map((val, i) => <option key={i}>{val}</option>)
                : ""}
            </FormSelect>
            <FormSelect
              name="city"
              label="Municipality/City"
              id="city"
              value={formData.address.city}
              onchange={(e) => dispatchInput(e, "address")}
              require={true}
              disable={selectDisable}>
              {formData.address.region !== undefined &&
              formData.address.region !== "__EMPTY__"
                ? locations[
                    formData.address.region.substring(
                      7,
                      formData.address.region.length
                    )
                  ].city.map((val) => <option>{val}</option>)
                : ""}
            </FormSelect>
            <FormSelect
              name="brgy"
              label="Barangay"
              id="brgy"
              value={formData.address.brgy}
              onchange={(e) => dispatchInput(e, "address")}
              require={true}
              disable={disBool}>
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
            <FormInput
              label="Purok"
              type="text"
              name="purok"
              id="purok"
              value={formData.address.purok}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type purok number here"
              require={true}
              disable={disable}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="lot_num"
              id="lot_num"
              value={formData.address.lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={true}
              disable={disable}
            />
          </>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Previous Address:
      </h3>
      {!disable ? (
        <FormCheck
          label="Copy Present Address"
          type="checkbox"
          id="copy_address"
          style="mb-4"
          // change={() => copyAddress("personal")}
          change={() => dispatch(copyAddress("personal"))}
          icon={copy_icon}
        />
      ) : (
        ""
      )}
      <div
        className={
          "grid gap-4 mb-4 pb-2 " +
          (applicant.view ? "flex w-full" : "sm:grid-cols-3")
        }>
        {applicant.view ? (
          <FormInput
            type="text"
            placeholder="Present Address"
            value={address.personal_pres}
            disable={disable}
          />
        ) : (
          <>
            <FormInput
              label="Region"
              type="text"
              name="prev_region"
              id="region"
              value={formData.address.prev_region}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type region here"
              require={true}
              disable={disable}
            />
            <FormInput
              label="Province"
              type="text"
              name="prev_province"
              id="province"
              value={formData.address.prev_province}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type province here"
              require={true}
              disable={disable}
            />
            <FormInput
              label="City/Municipality"
              type="text"
              name="prev_city"
              id="city"
              value={formData.address.prev_city}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type city here"
              require={true}
              disable={disable}
            />
            <FormInput
              label="Barangay"
              type="text"
              name="prev_brgy"
              id="brgy"
              value={formData.address.prev_brgy}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type barangay here"
              require={true}
              disable={disable}
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
              disable={disable}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="prev_lot_num"
              id="prev_lot_num"
              value={formData.address.prev_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={true}
              disable={disable}
            />
          </>
        )}
      </div>

      <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-1">
        <FormTextarea
          name="home_description"
          id="home_description"
          label="Brief description of place of residence and home"
          value={formData.applicant.home_description}
          onchange={(e) => dispatchInput(e)}
          placeholder="Write residence description here"
          require={true}
          disable={disable}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Unit Applied:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
        <table className="w-full">
          <FormTHead>
            <tr>
              <FormTH label="Model" />
              <FormTH label="Downpayment" />
              <FormTH label="Terms Conditions" />
            </tr>
          </FormTHead>
          <FormTBody>
            <tr>
              <FormTD placeholder="Model name" />
              <FormTD placeholder="Downpayment here" />
              <FormTD placeholder="Terms & Conditions" />
            </tr>
          </FormTBody>
        </table>
        {urlBool ? (
          <div className="grid pt-4 sm:cols-span-1">
            <BttnwithIcon text="Add row">
              <Plus />
            </BttnwithIcon>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
