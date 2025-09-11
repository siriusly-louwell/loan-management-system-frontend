import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import FormCheck from "../components/checkboxes/FormCheck";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Plus from "../assets/icons/Plus";
import FormTHead from "../components/tables/FormTHead";
import FormTH from "../components/tables/FormTH";
import FormTBody from "../components/tables/FormTBody";
import FormTD from "../components/tables/FormTD";
import copy_icon from "../assets/images/copy_icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  copyAddress,
  disableAddress,
  setType,
} from "../services/redux/slices/formSlice";

export default function FamilyInfoForm() {
  const {
    dispatchInput,
    addressChange,
    applicant,
    address,
    disable,
    locations,
  } = useOutletContext();
  const dispatch = useDispatch();
  const { formData, selectDisable } = useSelector((state) => state.form);
  const [relatives, setRelative] = useState([""]);
  const location = useLocation();
  const urlBool =
    location.pathname !== "/admin/apply/familyinfo" &&
    location.pathname !== "/staff/apply/familyinfo" &&
    location.pathname !== "/ci/apply/familyinfo";

  useEffect(() => {
    dispatch(disableAddress());
  }, [formData, dispatch]);

  useEffect(() => {
    dispatch(setType("applicant"));
  }, []);

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Family Information:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="Spouse name"
          type="text"
          name="spouse_name"
          id="spouse"
          value={formData.applicant.spouse_name}
          onchange={(e) => dispatchInput(e)}
          // onchange={handleChange}
          placeholder="Type full name"
          disable={disable}
        />
        <FormInput
          label="Date of Birth"
          type="date"
          name="b_date"
          id="b_date"
          value={formData.applicant.b_date}
          onchange={(e) => dispatchInput(e)}
          placeholder=""
          disable={disable}
        />
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Spouse Working?
          </label>
          <div className="space-y-4 sm:flex sm:space-y-0">
            <FormCheck
              name="spouse_work"
              type="radio"
              id="inline-check"
              label="Yes"
              value="yes"
              check={formData.applicant.spouse_work === "yes"}
              change={(e) => dispatchInput(e)}
              disable={disable}
            />
            <FormCheck
              name="spouse_work"
              type="radio"
              id="inline-2-check"
              label="No"
              value="no"
              check={formData.applicant.spouse_work === "no"}
              change={(e) => dispatchInput(e)}
              disable={disable}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
          <FormInput
            label="Number of Children"
            type="text"
            name="children_num"
            id="children"
            value={formData.applicant.children_num}
            onchange={(e) => dispatchInput(e)}
            placeholder="0"
            disable={disable}
          />
          <FormInput
            label="Dep. Children"
            type="text"
            name="children_dep"
            id="dep"
            value={formData.applicant.children_dep}
            onchange={(e) => dispatchInput(e)}
            placeholder="0"
            disable={disable}
          />
          <FormSelect
            name="school"
            label="Schooling Children"
            id="school"
            value={formData.applicant.school}
            onchange={(e) => dispatchInput(e)}
            disable={disable}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </FormSelect>
        </div>
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
        <div className="grid gap-4 sm:grid-cols-4">
          <FormInput
            label="Name of Schooling Children"
            type="text"
            name="prod_name"
            id="name"
            placeholder="Full name here"
            disable={disable}
            onchange={() => {}}
          />
          <FormInput
            label="Age"
            type="number"
            name="prod_name"
            id="name"
            placeholder=""
            disable={disable}
            onchange={() => {}}
          />
          <FormInput
            label="Enrolled at"
            type="text"
            name="prod_name"
            id="name"
            placeholder="Type school here"
            disable={disable}
            onchange={() => {}}
          />
          <FormInput
            label="Address"
            type="text"
            name="prod_name"
            id="name"
            placeholder="Full address here"
            disable={disable}
            onchange={() => {}}
          />
        </div>
        {urlBool ? (
          <div className="grid pt-4 sm:cols-span-3">
            <BttnwithIcon text="Add row">
              <Plus />
            </BttnwithIcon>
          </div>
        ) : (
          ""
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Father's Name:
      </h3>
      <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
        <FormInput
          label="First name"
          type="text"
          name="father_first"
          id="ff-name"
          value={formData.applicant.father_first}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type first name here"
          require={true}
        />
        <FormInput
          label="Middle name"
          type="text"
          name="father_middle"
          id="fm-name"
          value={formData.applicant.father_middle}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type middle name here"
          require={true}
        />
        <FormInput
          label="Last name"
          type="text"
          name="father_last"
          id="fl-name"
          value={formData.applicant.father_last}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type last name here"
          require={true}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Mother's Name:
      </h3>
      <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
        <FormInput
          label="First name"
          type="text"
          name="mother_first"
          id="mf-name"
          value={formData.applicant.mother_first}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type first name here"
          require={true}
        />
        <FormInput
          label="Middle name"
          type="text"
          name="mother_middle"
          id="mm-name"
          value={formData.applicant.mother_middle}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type middle name here"
          require={true}
        />
        <FormInput
          label="Last name"
          type="text"
          name="mother_last"
          id="ml-name"
          value={formData.applicant.mother_last}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type last name here"
          require={true}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Parent's Present Address:
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
              name="p_region"
              label="Region"
              id="region"
              value={formData.address.p_region}
              // onchange={addressChange}
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
            </FormSelect>
            <FormSelect
              name="p_province"
              label="Province"
              id="province"
              value={formData.address.p_province}
              onchange={(e) => dispatchInput(e, "address")}
              require={true}
              disable={selectDisable.parent}>
              {formData.address.p_region !== undefined &&
              formData.address.p_region !== "__EMPTY__"
                ? locations[
                    formData.address.p_region.substring(
                      7,
                      formData.address.p_region.length
                    )
                  ].province.map((val, i) => <option key={i}>{val}</option>)
                : ""}
            </FormSelect>
            <FormSelect
              name="p_city"
              label="Municipality/City"
              id="city"
              value={formData.address.p_city}
              // onchange={addressChange}
              onchange={(e) => dispatchInput(e, "address")}
              require={true}
              disable={selectDisable.parent}>
              {formData.address.p_region !== undefined &&
              formData.address.p_region !== "__EMPTY__"
                ? locations[
                    formData.address.p_region.substring(
                      7,
                      formData.address.p_region.length
                    )
                  ].city.map((val, i) => <option key={i}>{val}</option>)
                : ""}
            </FormSelect>
            <FormSelect
              name="p_brgy"
              label="Barangay"
              id="brgy"
              value={formData.address.p_brgy}
              // onchange={addressChange}
              onchange={(e) => dispatchInput(e, "address")}
              require={true}
              disable={selectDisable.parent}>
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
              name="p_purok"
              id="p_purok"
              value={formData.address.p_purok}
              // onchange={addressChange}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type purok number here"
              require={true}
              disable={disable}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="p_lot_num"
              id="p_lot_num"
              value={formData.address.p_lot_num}
              // onchange={addressChange}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={true}
              disable={disable}
            />
          </>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Parent's Previous Address:
      </h3>
      {!disable ? (
        <FormCheck
          label="Copy Present Address"
          type="checkbox"
          id="parent_address"
          style="mb-4"
          change={() => dispatch(copyAddress("parent"))}
          disable={disable}
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
            value={formData.address.personal_pres}
            disable={disable}
          />
        ) : (
          <>
            <FormInput
              label="Region"
              type="text"
              name="p_prev_region"
              id="region"
              value={formData.address.p_prev_region}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type region here"
              require={true}
              disable={disable}
            />
            <FormInput
              label="Province"
              type="text"
              name="p_prev_province"
              id="province"
              value={formData.address.p_prev_province}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type province here"
              require={true}
              disable={disable}
            />
            <FormInput
              label="City/Municipality"
              type="text"
              name="p_prev_city"
              id="city"
              value={formData.address.p_prev_city}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type city here"
              require={true}
              disable={disable}
            />
            <FormInput
              label="Barangay"
              type="text"
              name="p_prev_brgy"
              id="brgy"
              value={formData.address.p_prev_brgy}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type barangay here"
              require={true}
              disable={disable}
            />
            <FormInput
              label="Purok"
              type="text"
              name="p_prev_purok"
              id="purok"
              value={formData.address.p_prev_purok}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={true}
              disable={disable}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="p_prev_lot_num"
              id="lot_num"
              value={formData.address.p_prev_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={true}
              disable={disable}
            />
          </>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Spouse's Present Address:
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
            value={formData.address.personal_pres}
            disable={disable}
          />
        ) : (
          <>
            <FormSelect
              name="sp_region"
              label="Region"
              id="region"
              value={formData.address.sp_region}
              onchange={(e) => dispatchInput(e, "address")}
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
            </FormSelect>
            <FormSelect
              name="sp_province"
              label="Province"
              id="province"
              value={formData.address.sp_province}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.spouse}>
              {formData.address.sp_region !== undefined &&
              formData.address.sp_region !== "__EMPTY__"
                ? locations[
                    formData.address.sp_region.substring(
                      7,
                      formData.address.sp_region.length
                    )
                  ].province.map((val, i) => <option key={i}>{val}</option>)
                : ""}
            </FormSelect>
            <FormSelect
              name="sp_city"
              label="Municipality/City"
              id="city"
              value={formData.address.sp_city}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.spouse}>
              {formData.address.sp_region !== undefined &&
              formData.address.sp_region !== "__EMPTY__"
                ? locations[
                    formData.address.sp_region.substring(
                      7,
                      formData.address.sp_region.length
                    )
                  ].city.map((val, i) => <option key={i}>{val}</option>)
                : ""}
            </FormSelect>
            <FormSelect
              name="sp_brgy"
              label="Barangay"
              id="brgy"
              value={formData.address.sp_brgy}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.spouse}>
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
              name="sp_purok"
              id="sp_purok"
              value={formData.address.sp_purok}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type purok number here"
              disable={disable}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="sp_lot_num"
              id="sp_lot_num"
              value={formData.address.sp_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              disable={disable}
            />
          </>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Spouse's Previous Address:
      </h3>
      {!disable ? (
        <FormCheck
          label="Copy Present Address"
          type="checkbox"
          id="spouse_address"
          style="mb-4"
          change={() => dispatch(copyAddress("spouse"))}
          disable={disable}
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
            value={formData.address.personal_pres}
            disable={disable}
          />
        ) : (
          <>
            <FormInput
              label="Region"
              type="text"
              name="sp_prev_region"
              id="region"
              value={formData.address.sp_prev_region}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type region here"
              disable={disable}
            />
            <FormInput
              label="Province"
              type="text"
              name="sp_prev_province"
              id="province"
              value={formData.address.sp_prev_province}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type province here"
              disable={disable}
            />
            <FormInput
              label="City/Municipality"
              type="text"
              name="sp_prev_city"
              id="city"
              value={formData.address.sp_prev_city}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type city here"
              disable={disable}
            />
            <FormInput
              label="Barangay"
              type="text"
              name="sp_prev_brgy"
              id="brgy"
              value={formData.address.sp_prev_brgy}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type barangay here"
              disable={disable}
            />
            <FormInput
              label="Purok"
              type="text"
              name="sp_prev_purok"
              id="purok"
              value={formData.address.sp_prev_purok}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              disable={disable}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="sp_prev_lot_num"
              id="lot_num"
              value={formData.address.sp_prev_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              disable={disable}
            />
          </>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Personal References
      </h3>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        (Relatives or friends not living with you)
      </label>
      <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
        <table className="w-full">
          <FormTHead>
            <tr>
              <FormTH label="Name" />
              <FormTH label="Address" />
              <FormTH label="Contact number" />
            </tr>
          </FormTHead>
          <FormTBody>
            {relatives.map((i) => (
              <tr key={i}>
                <FormTD placeholder="Full name here" />
                <FormTD placeholder="Address here" />
                <FormTD placeholder="Cellphone number" />
              </tr>
            ))}
          </FormTBody>
        </table>
        {urlBool ? (
          <div className="grid pt-4 sm:cols-span-1">
            <BttnwithIcon
              text="Add row"
              type="button"
              click={() => setRelative([...relatives, ""])}>
              <Plus />
            </BttnwithIcon>
          </div>
        ) : (
          ""
        )}

        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
          Dependants:
        </h3>
        <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
          <table className="w-full">
            <FormTHead>
              <tr>
                <FormTH label="Name" />
                <FormTH label="Relationship" />
                <FormTH label="Age" />
                <FormTH label="School" />
              </tr>
            </FormTHead>
            <FormTBody>
              <tr>
                <FormTD placeholder="Full name here" />
                <FormTD placeholder="Address here" />
                <FormTD placeholder="Cellphone number" />
                <FormTD placeholder="School name" />
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

        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
          Nearest Relatives:
        </h3>
        <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
          <table className="w-full">
            <FormTHead>
              <tr>
                <FormTH label="Name" />
                <FormTH label="Relationship" />
                <FormTH label="Age" />
                <FormTH label="School" />
              </tr>
            </FormTHead>
            <FormTBody>
              <tr>
                <FormTD placeholder="Full name here" />
                <FormTD placeholder="Address here" />
                <FormTD placeholder="Cellphone number" />
                <FormTD placeholder="School name" />
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
      </div>
    </>
  );
}
