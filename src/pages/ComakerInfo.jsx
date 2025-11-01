import FormInput from "../components/inputs/FormInput";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Plus from "../assets/icons/Plus";
import copy_icon from "../assets/images/copy_icon.png";
import FileInput from "../components/inputs/FileInput";
import FormSelect from "../components/inputs/FormSelect";
import FormCheck from "../components/checkboxes/FormCheck";
import { useSelector } from "react-redux";
import { UserEntity } from "../services/entities/User";
import { useOutletContext } from "react-router-dom";

export default function ComakerInfo() {
  const { toggleKeep, dispatchInput } = useOutletContext();
  const { role } = useSelector(UserEntity);
  // const [comaker, setComaker] = useState({});
  const { formData, selectDisable } = useSelector((state) => state.form);
  const { addressLoading, regions, provinces, cities, barangays } = useSelector(
    (state) => state.address
  );
  const comakeCondition =
    formData.address.co_region !== undefined &&
    formData.address.co_region !== "__EMPTY__";

  // function comakeChange(event) {
  //   setComaker({
  //     ...comaker,
  //     [event.target.name]: event.target.value,
  //   });
  // }

  // function copycomake() {
  //   setComaker({
  //     ...comaker,
  //     perm_country: comaker.country,
  //     perm_region: comaker.region,
  //     perm_province: comaker.province,
  //     perm_city: comaker.city,
  //     perm_brgy: comaker.brgy,
  //   });
  // }

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
          id="name"
          placeholder="Type first name here"
          onchange={() => {}}
        />
        <FormInput
          label="Middle name"
          type="text"
          name="middle_name"
          id="name"
          placeholder="Type middle name here"
          onchange={() => {}}
        />
        <FormInput
          label="Last name"
          type="text"
          name="last_name"
          id="name"
          placeholder="Type last name here"
          onchange={() => {}}
        />
        <FormInput
          label="Date of Birth"
          type="date"
          name="prod_name"
          id="name"
          onchange={() => {}}
        />
        <FormInput
          label="Place of Birth"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Birth place address"
          onchange={() => {}}
        />
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
              onchange={(e) => dispatchInput(e, "address")}>
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
              disable={selectDisable.comaker}>
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
              disable={selectDisable.comaker}>
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
              disable={selectDisable.comaker}>
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
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="co_lot_num"
              id="co_lot_num"
              value={formData.address.co_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
            Permanent Address:
          </h3>
          <div className="grid gap-4 mb-4 pb-2 sm:grid-cols-3">
            <FormSelect
              name="perm_region"
              label="Region"
              id="region"
              loading={addressLoading}
              value={formData.address.perm_region}
              onchange={(e) => dispatchInput(e, "address")}>
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
              disable={selectDisable.comake}>
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
              disable={selectDisable.comake}>
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
              disable={selectDisable.comake}>
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
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="perm_lot_num"
              id="perm_lot_num"
              value={formData.address.perm_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
            />
          </div>
        </>
      )}

      {/* <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
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
        />
        <FormInput
          label="Region"
          type="text"
          name="perm_region"
          id="region"
          value={comaker.perm_region}
          onchange={comakeChange}
          placeholder="Type region here"
        />
        <FormInput
          label="Province"
          type="text"
          name="perm_province"
          id="province"
          value={comaker.perm_province}
          onchange={comakeChange}
          placeholder="Type province here"
        />
        <FormInput
          label="City/Municipality"
          type="text"
          name="perm_city"
          id="city"
          value={comaker.perm_city}
          onchange={comakeChange}
          placeholder="Type city here"
        />
        <FormInput
          label="Barangay"
          type="text"
          name="perm_brgy"
          id="brgy"
          value={comaker.perm_brgy}
          onchange={comakeChange}
          placeholder="Type barangay here"
        />
      </div> */}

      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="Contact Number"
          type="text"
          name="contact_num"
          id="name"
          placeholder="Phone number here"
          onchange={() => {}}
        />
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          id="name"
          placeholder="doe@gmail.com"
          onchange={() => {}}
        />
        <FormInput
          label="Facebook Account"
          type="text"
          name="facebook"
          id="name"
          placeholder="Facebook name here"
          onchange={() => {}}
        />
        <FormInput
          label="Citizenship"
          type="text"
          name="citizenship"
          id="name"
          placeholder="Type citizenhip"
          onchange={() => {}}
        />
        <FormInput
          label="Occupation"
          type="text"
          name="occupation"
          id="name"
          placeholder="Type occupation here"
          onchange={() => {}}
        />
        <FormInput
          label="Years of Service"
          type="text"
          name="yrs_in_service"
          id="name"
          placeholder="Type last name here"
          onchange={() => {}}
        />
        <FormInput
          label="Employment Status"
          type="date"
          name="employment_status"
          id="name"
          onchange={() => {}}
        />
        <FormInput
          label="Business Name/Employer"
          type="text"
          name="employer"
          id="name"
          placeholder="Name of business or employer"
          onchange={() => {}}
        />
        <FormInput
          label="Business/Employer Address"
          type="text"
          name="comaker_emp_address"
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
          name="spouse_first"
          id="name"
          placeholder="Spouse first name here"
          onchange={() => {}}
        />
        <FormInput
          label="Middle name"
          type="text"
          name="spouse_middle"
          id="name"
          placeholder="Spouse middle name here"
          onchange={() => {}}
        />
        <FormInput
          label="Last name"
          type="text"
          name="spouse_last"
          id="name"
          placeholder="Spouse last name here"
          onchange={() => {}}
        />
        <FormInput
          label="Citizenship"
          type="text"
          name="sp_citizenship"
          id="name"
          placeholder="Type citizenhip"
          onchange={() => {}}
        />
        <FormInput
          label="Occupation"
          type="text"
          name="sp_occupation"
          id="name"
          placeholder="Type occupation here"
          onchange={() => {}}
        />
        <FormInput
          label="Years of Service"
          type="text"
          name="sp_yrs_in_service"
          id="name"
          placeholder="Type last name here"
          onchange={() => {}}
        />
        <FormInput
          label="Employment Status"
          type="date"
          name="sp_emp_status"
          id="name"
          placeholder=""
          onchange={() => {}}
        />
        <FormInput
          label="Employment Address"
          type="text"
          name="spouse_emp_address"
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
          label="Father's First Name"
          type="text"
          name="sp_father_first"
          id="name"
          placeholder="First name here"
          onchange={() => {}}
        />
        <FormInput
          label="Father's Middle Name"
          type="text"
          name="sp_father_middle"
          id="name"
          placeholder="Middle name here"
          onchange={() => {}}
        />
        <FormInput
          label="Father's Last Name"
          type="text"
          name="sp_father_last"
          id="name"
          placeholder="Last name here"
          onchange={() => {}}
        />
        <FormInput
          label="Mother's First Name"
          type="text"
          name="sp_mother_first"
          id="name"
          placeholder="First name here"
          onchange={() => {}}
        />
        <FormInput
          label="Mother's Middle Name"
          type="text"
          name="sp_mother_middle"
          id="name"
          placeholder="Middle name here"
          onchange={() => {}}
        />
        <FormInput
          label="Mother's maiden Name"
          type="text"
          name="sp_mother_last"
          id="name"
          placeholder="Last name here"
          onchange={() => {}}
        />
      </div>

      {role === "customer" && (
        <>
          <FormCheck
            label="Keep current spouse address"
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
              onchange={(e) => dispatchInput(e, "address")}>
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
              disable={selectDisable.comaker_spouse}>
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
              disable={selectDisable.comaker_spouse}>
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
              disable={selectDisable.comaker_spouse}>
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
            />
            <FormInput
              label="Lot/House Number"
              type="text"
              name="co_sp_lot_num"
              id="co_sp_lot_num"
              value={formData.address.co_sp_lot_num}
              onchange={(e) => dispatchInput(e, "address")}
              placeholder="Type House number here"
            />
          </div>
        </>
      )}
      {/* <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Parent's Address:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
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
      </div> */}

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
        <FileInput label="Sketch Image" type="img" />
        <FileInput label="Valid ID" type="img" />
        <FileInput label="2x2 ID picture" type="img" />
        <FileInput label="Proof of Residence" type="img" />
      </div>
    </>
  );
}
