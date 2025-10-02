import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
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
  const { dispatchInput, locations } = useOutletContext();
  const dispatch = useDispatch();
  const { regions, provinces, cities, barangays } = useSelector(
    (state) => state.address
  );
  const { formData, selectDisable } = useSelector((state) => state.form);
  const [relatives, setRelative] = useState([""]);
  const regCondition =
    formData.address.p_region !== undefined &&
    formData.address.p_region !== "__EMPTY__";

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
          placeholder="Type full name"
        />
        <FormInput
          label="Date of Birth"
          type="date"
          name="b_date"
          id="b_date"
          value={formData.applicant.b_date}
          onchange={(e) => dispatchInput(e)}
          placeholder=""
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
            />
            <FormCheck
              name="spouse_work"
              type="radio"
              id="inline-2-check"
              label="No"
              value="no"
              check={formData.applicant.spouse_work === "no"}
              change={(e) => dispatchInput(e)}
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
          />
          <FormInput
            label="Dep. Children"
            type="text"
            name="children_dep"
            id="dep"
            value={formData.applicant.children_dep}
            onchange={(e) => dispatchInput(e)}
            placeholder="0"
          />
          <FormSelect
            name="school"
            label="Schooling Children"
            id="school"
            value={formData.applicant.school}
            onchange={(e) => dispatchInput(e)}>
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
          <BttnwithIcon text="Add row" type="button">
            <Plus />
          </BttnwithIcon>
        </div>
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
      <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
        <FormSelect
          name="p_region"
          label="Region"
          id="region"
          value={formData.address.p_region}
          onchange={(e) => dispatchInput(e, "address")}
          require={true}>
          {regions.map((reg, i) => (
            <option key={i} value={reg.code}>
              {reg.name}
            </option>
          ))}
        </FormSelect>
        <FormSelect
          name="p_province"
          label="Province"
          id="province"
          value={formData.address.p_province}
          onchange={(e) => dispatchInput(e, "address")}
          require={true}
          disable={selectDisable.parent}>
          {regCondition &&
            provinces.map((prov, i) => (
              <option key={i} value={prov.code}>
                {prov.name}
              </option>
            ))}
        </FormSelect>
        <FormSelect
          name="p_city"
          label="Municipality/City"
          id="city"
          value={formData.address.p_city}
          onchange={(e) => dispatchInput(e, "address")}
          require={true}
          disable={selectDisable.parent}>
          {regCondition &&
            cities.map((cit, i) => (
              <option key={i} value={cit.code}>
                {cit.name}
              </option>
            ))}
        </FormSelect>
        <FormSelect
          name="p_brgy"
          label="Barangay"
          id="brgy"
          value={formData.address.p_brgy}
          onchange={(e) => dispatchInput(e, "address")}
          require={true}
          disable={selectDisable.parent}>
          {regCondition &&
            barangays.map((bgy, i) => (
              <option key={i} value={bgy.code}>
                {bgy.name}
              </option>
            ))}
        </FormSelect>
        <FormInput
          label="Purok"
          type="text"
          name="p_purok"
          id="p_purok"
          value={formData.address.p_purok}
          onchange={(e) => dispatchInput(e, "address")}
          placeholder="Type purok number here"
          require={true}
        />
        <FormInput
          label="Lot/House Number"
          type="text"
          name="p_lot_num"
          id="p_lot_num"
          value={formData.address.p_lot_num}
          onchange={(e) => dispatchInput(e, "address")}
          placeholder="Type House number here"
          require={true}
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Parent's Previous Address:
      </h3>
      <FormCheck
        label="Copy Present Address"
        type="checkbox"
        id="parent_address"
        style="mb-4"
        change={() => dispatch(copyAddress("parent"))}
        icon={copy_icon}
      />
      <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
        <FormInput
          label="Region"
          type="text"
          name="p_prev_region"
          id="region"
          value={formData.address.p_prev_region}
          onchange={(e) => dispatchInput(e, "address")}
          placeholder="Type region here"
          require={true}
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
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Spouse's Present Address:
      </h3>
      <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
        <FormSelect
          name="sp_region"
          label="Region"
          id="region"
          value={formData.address.sp_region}
          onchange={(e) => dispatchInput(e, "address")}>
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
        />
        <FormInput
          label="Lot/House Number"
          type="text"
          name="sp_lot_num"
          id="sp_lot_num"
          value={formData.address.sp_lot_num}
          onchange={(e) => dispatchInput(e, "address")}
          placeholder="Type House number here"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Spouse's Previous Address:
      </h3>
      <FormCheck
        label="Copy Present Address"
        type="checkbox"
        id="spouse_address"
        style="mb-4"
        change={() => dispatch(copyAddress("spouse"))}
        icon={copy_icon}
      />
      <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
        <FormInput
          label="Region"
          type="text"
          name="sp_prev_region"
          id="region"
          value={formData.address.sp_prev_region}
          onchange={(e) => dispatchInput(e, "address")}
          placeholder="Type region here"
        />
        <FormInput
          label="Province"
          type="text"
          name="sp_prev_province"
          id="province"
          value={formData.address.sp_prev_province}
          onchange={(e) => dispatchInput(e, "address")}
          placeholder="Type province here"
        />
        <FormInput
          label="City/Municipality"
          type="text"
          name="sp_prev_city"
          id="city"
          value={formData.address.sp_prev_city}
          onchange={(e) => dispatchInput(e, "address")}
          placeholder="Type city here"
        />
        <FormInput
          label="Barangay"
          type="text"
          name="sp_prev_brgy"
          id="brgy"
          value={formData.address.sp_prev_brgy}
          onchange={(e) => dispatchInput(e, "address")}
          placeholder="Type barangay here"
        />
        <FormInput
          label="Purok"
          type="text"
          name="sp_prev_purok"
          id="purok"
          value={formData.address.sp_prev_purok}
          onchange={(e) => dispatchInput(e, "address")}
          placeholder="Type House number here"
        />
        <FormInput
          label="Lot/House Number"
          type="text"
          name="sp_prev_lot_num"
          id="lot_num"
          value={formData.address.sp_prev_lot_num}
          onchange={(e) => dispatchInput(e, "address")}
          placeholder="Type House number here"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Personal References
      </h3>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        (Relatives or friends not living with you)
      </label>
      <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
        <table className="w-full border rounded-lg overflow-hidden">
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
        <div className="grid pt-4 sm:cols-span-1">
          <BttnwithIcon
            text="Add row"
            type="button"
            click={() => setRelative([...relatives, ""])}>
            <Plus />
          </BttnwithIcon>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
          Dependants:
        </h3>
        <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
          <table className="w-full border rounded-lg overflow-hidden">
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
          <div className="grid pt-4 sm:cols-span-1">
            <BttnwithIcon text="Add row" type="button">
              <Plus />
            </BttnwithIcon>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
          Nearest Relatives:
        </h3>
        <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
          <table className="w-full border rounded-lg overflow-hidden">
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
          <div className="grid pt-4 sm:cols-span-1">
            <BttnwithIcon text="Add row" type="button">
              <Plus />
            </BttnwithIcon>
          </div>
        </div>
      </div>
    </>
  );
}
