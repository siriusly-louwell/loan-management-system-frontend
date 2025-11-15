import FormInput from "../components/inputs/FormInput";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Plus from "../assets/icons/Plus";
import copy_icon from "../assets/images/copy_icon.png";
import FileInput from "../components/inputs/FileInput";
import FormSelect from "../components/inputs/FormSelect";
import FormCheck from "../components/checkboxes/FormCheck";
import { useDispatch, useSelector } from "react-redux";
import { UserEntity } from "../services/entities/User";
import { useOutletContext } from "react-router-dom";
import { disableAddress, setType } from "../services/redux/slices/formSlice";
import { useEffect } from "react";

export default function ComakerInfo() {
  const dispatch = useDispatch();
  const { role } = useSelector(UserEntity);
  const { toggleKeep, dispatchInput, fileChange } = useOutletContext();
  const { formData, selectDisable } = useSelector((state) => state.form);
  const { addressLoading, regions, provinces, cities, barangays } = useSelector(
    (state) => state.address
  );
  const comakeCondition =
    formData.address.co_region !== undefined &&
    formData.address.co_region !== "__EMPTY__";

  useEffect(() => {
    dispatch(setType("comaker"));
  }, []);

  useEffect(() => {
    dispatch(disableAddress());
  }, [formData, dispatch]);

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Personal Information:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="First name"
          type="text"
          name="first_name"
          id="first-name"
          placeholder="Type first name here"
          value={formData.comaker.first_name}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Middle name"
          type="text"
          name="middle_name"
          id="middle-name"
          placeholder="Type middle name here"
          value={formData.comaker.middle_name}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Last name"
          type="text"
          name="last_name"
          id="last-name"
          placeholder="Type last name here"
          value={formData.comaker.last_name}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Date of Birth"
          type="date"
          name="birthdate"
          id="birthdate"
          value={formData.comaker.birthdate}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Place of Birth"
          type="text"
          name="birth_place"
          id="birth-place"
          placeholder="Birth place address"
          value={formData.comaker.birth_place}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormSelect
          label="Sex"
          name="gender"
          id="gender"
          value={formData.comaker.gender}
          onchange={(e) => dispatchInput(e)}
          require={true}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Prefer not to say</option>
        </FormSelect>
        <FormInput
          label="Contact Number"
          type="text"
          name="contact_num"
          id="contact"
          placeholder="Phone number here"
          value={formData.comaker.contact_num}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          id="email"
          placeholder="doe@gmail.com"
          value={formData.comaker.email}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Facebook Account"
          type="text"
          name="facebook"
          id="facebook"
          placeholder="Facebook name here"
          value={formData.comaker.facebook}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormSelect
          label="Civil Status"
          name="status"
          id="status"
          value={formData.comaker.status}
          onchange={(e) => dispatchInput(e)}
          require={true}
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
          name="religion"
          id="religion"
          placeholder="Catholic/INC"
          value={formData.comaker.religion}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Tribe"
          type="text"
          name="tribe"
          id="tribe"
          placeholder="Type tribe here"
          value={formData.comaker.tribe}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
      </div>

      {role === "customer" && (
        <>
          <FormCheck
            label="Keep current comaker address"
            type="checkbox"
            name="keep_comaker"
            id="keep-comaker"
            style="mb-4"
            icon={copy_icon}
            change={() => toggleKeep("keep_comaker", "address")}
          />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Current Address:
          </h3>
          <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Comaker's Residential Address:
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formData.address.comaker_pres}
              </span>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Comaker's Permanent Address:
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formData.address.comaker_perm}
              </span>
            </div>
          </div>
        </>
      )}

      {!formData.address.keep_comaker && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
            Residential Address:
          </h3>
          <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
            <FormSelect
              name="co_region"
              label="Region"
              id="region"
              loading={addressLoading}
              value={formData.address.co_region}
              onchange={(e) => dispatchInput(e, "address")}
              require={true}
            >
              {regions.map((reg, i) => (
                <option key={i} value={reg.code}>
                  {reg.name}
                </option>
              ))}
            </FormSelect>
            <FormSelect
              name="co_province"
              label="Province"
              id="province"
              loading={addressLoading}
              value={formData.address.co_province}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.comaker}
              require={true}
            >
              {comakeCondition &&
                provinces.map((prov, i) => (
                  <option key={i} value={prov.code}>
                    {prov.name}
                  </option>
                ))}
            </FormSelect>
            <FormSelect
              name="co_city"
              label="Municipality/City"
              id="city"
              loading={addressLoading}
              value={formData.address.co_city}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.comaker}
              require={true}
            >
              {comakeCondition &&
                cities.map((cit, i) => (
                  <option key={i} value={cit.code}>
                    {cit.name}
                  </option>
                ))}
            </FormSelect>
            <FormSelect
              name="co_brgy"
              label="Barangay"
              id="brgy"
              loading={addressLoading}
              value={formData.address.co_brgy}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.comaker}
              require={true}
            >
              {comakeCondition &&
                barangays.map((bgy, i) => (
                  <option key={i} value={bgy.code}>
                    {bgy.name}
                  </option>
                ))}
            </FormSelect>
            <FormInput
              label="Purok"
              type="text"
              name="co_purok"
              id="co_purok"
              value={formData.address.co_purok}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type purok number here"
              require={true}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="co_lot_num"
              id="co_lot_num"
              value={formData.address.co_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={true}
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
            Permanent Address:
          </h3>
          <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3 border-b border-gray-500">
            <FormSelect
              name="perm_region"
              label="Region"
              id="region"
              loading={addressLoading}
              value={formData.address.perm_region}
              onchange={(e) => dispatchInput(e, "address")}
              require={true}
            >
              {regions.map((reg, i) => (
                <option key={i} value={reg.code}>
                  {reg.name}
                </option>
              ))}
            </FormSelect>
            <FormSelect
              name="perm_province"
              label="Province"
              id="province"
              loading={addressLoading}
              value={formData.address.perm_province}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.comake}
              require={true}
            >
              {comakeCondition &&
                provinces.map((prov, i) => (
                  <option key={i} value={prov.code}>
                    {prov.name}
                  </option>
                ))}
            </FormSelect>
            <FormSelect
              name="perm_city"
              label="Municipality/City"
              id="city"
              loading={addressLoading}
              value={formData.address.perm_city}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.comake}
              require={true}
            >
              {comakeCondition &&
                cities.map((cit, i) => (
                  <option key={i} value={cit.code}>
                    {cit.name}
                  </option>
                ))}
            </FormSelect>
            <FormSelect
              name="perm_brgy"
              label="Barangay"
              id="brgy"
              loading={addressLoading}
              value={formData.address.perm_brgy}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.comake}
              require={true}
            >
              {comakeCondition &&
                barangays.map((bgy, i) => (
                  <option key={i} value={bgy.code}>
                    {bgy.name}
                  </option>
                ))}
            </FormSelect>
            <FormInput
              label="Purok"
              type="text"
              name="perm_purok"
              id="perm_purok"
              value={formData.address.perm_purok}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type purok number here"
              require={true}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="perm_lot_num"
              id="perm_lot_num"
              value={formData.address.perm_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={true}
            />
          </div>
        </>
      )}

      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="Citizenship"
          type="text"
          name="citizenship"
          id="citizenship"
          placeholder="Type citizenhip"
          value={formData.comaker.citizenship}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Occupation"
          type="text"
          name="occupation"
          id="occupation"
          placeholder="Type occupation here"
          value={formData.comaker.occupation}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Years of Service"
          type="number"
          name="yrs_in_service"
          id="yrs-service"
          placeholder="Type last name here"
          value={formData.comaker.yrs_in_service}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Employment Status"
          type="date"
          name="employment_status"
          id="emp-status"
          value={formData.comaker.employment_status}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Business Name/Employer"
          type="text"
          name="employer"
          id="employer"
          placeholder="Name of business or employer"
          value={formData.comaker.employer}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Business/Employer Address"
          type="text"
          name="comaker_emp_address"
          id="co-emp-address"
          placeholder="Type business address here"
          value={formData.comaker.comaker_emp_address}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
          <FormSelect
            label="Educ. Attainment"
            name="educ_attain"
            id="educ-attain"
            value={formData.comaker.educ_attain}
            onchange={(e) => dispatchInput(e)}
            require={true}
          >
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
          name="spouse_first"
          id="spouse-first"
          placeholder="Spouse first name here"
          value={formData.comaker.spouse_first}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Middle name"
          type="text"
          name="spouse_middle"
          id="spouse-middle"
          placeholder="Spouse middle name here"
          value={formData.comaker.spouse_middle}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Last name"
          type="text"
          name="spouse_last"
          id="spouse-last"
          placeholder="Spouse last name here"
          value={formData.comaker.spouse_last}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Citizenship"
          type="text"
          name="sp_citizenship"
          id="sp-citizenship"
          placeholder="Type citizenhip"
          value={formData.comaker.sp_citizenship}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Occupation"
          type="text"
          name="sp_occupation"
          id="sp-occupation"
          placeholder="Type occupation here"
          value={formData.comaker.sp_occupation}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Years of Service"
          type="number"
          name="sp_yrs_in_service"
          id="sp-yrs-service"
          placeholder="Type last name here"
          value={formData.comaker.sp_yrs_in_service}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Employment Status"
          type="date"
          name="sp_emp_status"
          id="sp-emp-status"
          placeholder=""
          value={formData.comaker.sp_emp_status}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Employment Address"
          type="text"
          name="spouse_emp_address"
          id="sp-emp-address"
          placeholder="Employer address here"
          value={formData.comaker.spouse_emp_address}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <div className="grid gap-4 sm:col-span-1 md:gap-6 sm:grid-cols-2">
          <FormInput
            label="Number of Children"
            type="text"
            name="prod_name"
            id="name"
            value=""
            placeholder="0"
          />
          <FormInput
            label="Dep. Children"
            type="text"
            name="prod_name"
            id="name"
            value=""
            placeholder="0"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Spouse's Parents Information:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="Father's First Name"
          type="text"
          name="sp_father_first"
          id="sp-f-first"
          placeholder="First name here"
          value={formData.comaker.sp_father_first}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Father's Middle Name"
          type="text"
          name="sp_father_middle"
          id="sp-f-middle"
          placeholder="Middle name here"
          value={formData.comaker.sp_father_middle}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Father's Last Name"
          type="text"
          name="sp_father_last"
          id="sp-f-last"
          placeholder="Last name here"
          value={formData.comaker.sp_father_last}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Mother's First Name"
          type="text"
          name="sp_mother_first"
          id="sp-m-first"
          placeholder="First name here"
          value={formData.comaker.sp_mother_first}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Mother's Middle Name"
          type="text"
          name="sp_mother_middle"
          id="sp-m-middle"
          placeholder="Middle name here"
          value={formData.comaker.sp_mother_middle}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
        <FormInput
          label="Mother's maiden Name"
          type="text"
          name="sp_mother_last"
          id="sp-m-last"
          placeholder="Last name here"
          value={formData.comaker.sp_mother_last}
          onchange={(e) => dispatchInput(e)}
          require={true}
        />
      </div>

      {role === "customer" && (
        <>
          <FormCheck
            label="Keep current spouse's parent address"
            type="checkbox"
            name="keep_comaker"
            id="keep-comaker"
            style="mb-4"
            icon={copy_icon}
            change={() => toggleKeep("keep_comaker", "address")}
          />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Current Address:
          </h3>
          <div className="flex gap-4 mb-4 pb-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Spouse's Parent's Address:
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formData.address.co_spouse}
              </span>
            </div>
          </div>
        </>
      )}

      {!formData.address.keep_co_spouse && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
            Parent's Address:
          </h3>
          <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
            <FormSelect
              name="co_sp_region"
              label="Region"
              id="region"
              loading={addressLoading}
              value={formData.address.co_sp_region}
              onchange={(e) => dispatchInput(e, "address")}
              require={true}
            >
              {regions.map((reg, i) => (
                <option key={i} value={reg.code}>
                  {reg.name}
                </option>
              ))}
            </FormSelect>
            <FormSelect
              name="co_sp_province"
              label="Province"
              id="province"
              loading={addressLoading}
              value={formData.address.co_sp_province}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.comaker_spouse}
              require={true}
            >
              {comakeCondition &&
                provinces.map((prov, i) => (
                  <option key={i} value={prov.code}>
                    {prov.name}
                  </option>
                ))}
            </FormSelect>
            <FormSelect
              name="co_sp_city"
              label="Municipality/City"
              id="city"
              loading={addressLoading}
              value={formData.address.co_sp_city}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.comaker_spouse}
              require={true}
            >
              {comakeCondition &&
                cities.map((cit, i) => (
                  <option key={i} value={cit.code}>
                    {cit.name}
                  </option>
                ))}
            </FormSelect>
            <FormSelect
              name="co_sp_brgy"
              label="Barangay"
              id="brgy"
              loading={addressLoading}
              value={formData.address.co_sp_brgy}
              onchange={(e) => dispatchInput(e, "address")}
              disable={selectDisable.comaker_spouse}
              require={true}
            >
              {comakeCondition &&
                barangays.map((bgy, i) => (
                  <option key={i} value={bgy.code}>
                    {bgy.name}
                  </option>
                ))}
            </FormSelect>
            <FormInput
              label="Purok"
              type="text"
              name="co_sp_purok"
              id="co_sp_purok"
              value={formData.address.co_sp_purok}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type purok number here"
              require={true}
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="co_sp_lot_num"
              id="co_sp_lot_num"
              value={formData.address.co_sp_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
              require={true}
            />
          </div>
        </>
      )}

      <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
        <div className="grid gap-4 sm:grid-cols-4">
          <FormInput
            label="Name of the child"
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
            value=""
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
        <FileInput
          label="Sketch Image"
          type="img"
          name="co_sketch"
          accept=".jpg,.png,.pdf"
          change={fileChange}
        />
        <FileInput
          label="Valid ID"
          type="img"
          name="co_valid_id"
          accept=".jpg,.png,.pdf"
          change={fileChange}
        />
        <FileInput
          label="2x2 ID picture"
          type="img"
          name="co_id_pic"
          accept=".jpg,.png,.pdf"
          change={fileChange}
        />
        <FileInput
          label="Proof of Residence"
          type="img"
          name="co_residence_proof"
          accept=".jpg,.png,.pdf"
          change={fileChange}
        />
      </div>
    </>
  );
}
