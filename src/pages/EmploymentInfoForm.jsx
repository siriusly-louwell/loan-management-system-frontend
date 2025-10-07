import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Plus from "../assets/icons/Plus";
import FormTHead from "../components/tables/FormTHead";
import FormTH from "../components/tables/FormTH";
import FormTBody from "../components/tables/FormTBody";
import FormTD from "../components/tables/FormTD";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../services/redux/slices/formSlice";

export default function EmploymentInfoForm() {
  const { dispatchInput } = useOutletContext();
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.form);
  const [properties, setProperty] = useState(1);
  const [references, setReference] = useState(1);

  useEffect(() => {
    dispatch(setType("applicant"));
  }, []);

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Employment Information:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormSelect
          name="income"
          label="Source of income"
          id="income"
          value={formData.applicant.income}
          onchange={(e) => dispatchInput(e)}
          require={true}>
          <option value="employment">Employment</option>
          <option value="business">Business</option>
        </FormSelect>
        <FormInput
          label="Immediate Superior"
          type="text"
          name="superior"
          id="superior"
          value={formData.applicant.superior}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type superior name"
        />
        <FormInput
          label="Employment Status"
          type="text"
          name="employment_status"
          id="emp_stat"
          value={formData.applicant.employment_status}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type status"
        />
        <FormInput
          label="Years in service"
          type="number"
          name="yrs_in_service"
          id="yrs"
          value={formData.applicant.yrs_in_service}
          onchange={(e) => dispatchInput(e)}
          placeholder="Years"
        />
        <FormInput
          label="Monthly/Daily Rate"
          type="number"
          name="rate"
          id="rate"
          value={formData.applicant.rate}
          onchange={(e) => dispatchInput(e)}
          placeholder="₱1,000"
          require={true}
        />
        <FormInput
          label="Employer"
          type="text"
          name="employer"
          id="employer"
          value={formData.applicant.employer}
          onchange={(e) => dispatchInput(e)}
          placeholder="Type employer name"
        />
        <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-1">
          <FormInput
            label="Employer Address (Brgy, municipality/city, province, region)"
            type="text"
            name="employer_address"
            id="name"
            value={formData.applicant.employer_address}
            onchange={(e) => dispatchInput(e)}
            placeholder="Type employer address"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Income
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="Salary"
          type="number"
          name="salary"
          id="salary"
          value={formData.applicant.salary}
          onchange={(e) => dispatchInput(e)}
          placeholder="₱15,000 per month"
          require={true}
        />
        <FormInput
          label="Business"
          type="text"
          name="business"
          id="business"
          value={formData.applicant.business}
          onchange={(e) => dispatchInput(e)}
          placeholder="Name your business"
          require={true}
        />
        <FormInput
          label="Others"
          type="text"
          name="prod_name"
          id="name"
          placeholder="Other income"
          onchange={() => {}}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Expenses
      </h3>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Write down all expenses spent every month
      </label>
      <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
        <FormInput
          label="Living"
          type="number"
          name="living_exp"
          id="living"
          value={formData.applicant.living_exp}
          onchange={(e) => dispatchInput(e)}
          placeholder="Living expenses/month"
          require={true}
        />
        <FormInput
          label="Rental"
          type="number"
          name="rental_exp"
          id="rental"
          value={formData.applicant.rental_exp}
          onchange={(e) => dispatchInput(e)}
          placeholder="₱500 per month"
          require={true}
        />
        <FormInput
          label="Education"
          type="number"
          name="education_exp"
          id="education"
          value={formData.applicant.education_exp}
          onchange={(e) => dispatchInput(e)}
          placeholder="Education expenses/month"
          require={true}
        />
        <FormInput
          label="Transportation"
          type="number"
          name="transportation"
          id="transport"
          value={formData.applicant.transportation}
          onchange={(e) => dispatchInput(e)}
          placeholder="Transport expenses/month"
          require={true}
        />
        <FormInput
          label="Insurance"
          type="number"
          name="insurance"
          id="insurance"
          value={formData.applicant.insurance}
          onchange={(e) => dispatchInput(e)}
          placeholder="Insurance expenses/month"
          require={true}
        />
        <FormInput
          label="Electricity/Water Bill"
          type="number"
          name="bills"
          id="bills"
          value={formData.applicant.bills}
          onchange={(e) => dispatchInput(e)}
          placeholder="Billing expenses/month"
          require={true}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Real and/or Personal Properties:
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
        <table className="w-full border rounded-lg overflow-hidden">
          <FormTHead>
            <tr>
              <FormTH label="Kind of Property" />
              <FormTH label="Location" />
              <FormTH style="flex-end grid sm:grid-cols-1">
                <label className="pb-3">Valuation</label>
                <div className="grid sm:cols-span-1 gap-4 sm:grid-cols-2 h-full">
                  <label>Assessment</label>
                  <label>Material</label>
                </div>
              </FormTH>
              <FormTH label="Status" />
            </tr>
          </FormTHead>
          <FormTBody>
            {[...Array(properties)].map((_, i) => (
              <tr key={i}>
                <FormTD placeholder="Property name here" />
                <FormTD placeholder="Location here" />
                <FormTD placeholder="Assessment" style="flex justify-between">
                  <input
                    type="text"
                    placeholder="Material"
                    className="bg-gray-50 ml-1 border-b border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </FormTD>
                <FormTD placeholder="Current status" />
              </tr>
            ))}
          </FormTBody>
        </table>
        <div className="grid pt-4 sm:cols-span-1">
          <BttnwithIcon
            type="button"
            click={() => setProperty(properties + 1)}
            text="Add row">
            <Plus />
          </BttnwithIcon>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
        Credit References:
      </h3>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        (List down all financing firms & individual who wxtended credit to you)
      </label>
      <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
        <table className="w-full border rounded-lg overflow-hidden">
          <FormTHead>
            <tr>
              <FormTH label="Name" />
              <FormTH label="Type of Credit" />
              <FormTH label="Terms" />
              <FormTH label="Amount" />
              <FormTH label="O/S Balance" />
              <FormTH label="M/A" />
            </tr>
          </FormTHead>
          <FormTBody>
            {[...Array(references)].map((_, i) => (
              <tr key={i}>
                <FormTD placeholder="Property name here" />
                <FormTD placeholder="Location here" />
                <FormTD placeholder="Current status" />
                <FormTD placeholder="Property name here" />
                <FormTD placeholder="Location here" />
                <FormTD placeholder="Current status" />
              </tr>
            ))}
          </FormTBody>
        </table>
        <div className="grid pt-4 sm:cols-span-1">
          <BttnwithIcon
            text="Add row"
            type="button"
            click={() => setReference(references + 1)}>
            <Plus />
          </BttnwithIcon>
        </div>
      </div>
    </>
  );
}
