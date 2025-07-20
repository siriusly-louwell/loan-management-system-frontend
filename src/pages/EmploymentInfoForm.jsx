import React, { useState } from "react";
import {useLocation, useOutletContext} from 'react-router-dom';
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import BttnwithIcon from '../components/buttons/BttnwithIcon';
import Plus from "../assets/icons/Plus";
import FormTHead from '../components/tables/FormTHead';
import FormTH from '../components/tables/FormTH';
import FormTBody from '../components/tables/FormTBody';
import FormTD from '../components/tables/FormTD';

export default function EmploymentInfoForm() {
    const {handleChange, applicant, address, disable} = useOutletContext();
    const location = useLocation();
    const [properties, setProperty] = useState(['']);
    const [references, setReference] = useState(['']);

    return (
        <>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Employment Information:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormSelect name="income" label="Source of income" id="income" value={applicant.income} onchange={handleChange} require={true} disable={disable}>
                    <option value="employment">Employment</option>
                    <option value="business">Business</option>
                </FormSelect>
                <FormInput label="Immediate Superior" type="text" name="superior" id="superior" value={applicant.superior} onchange={handleChange} placeholder="Type superior name" disable={disable} />
                <FormInput label="Employment Status" type="text" name="employment_status" id="emp_stat" value={applicant.employment_status} onchange={handleChange} placeholder="Type status" disable={disable} />
                <FormInput label="Years in service" type="number" name="yrs_in_service" id="yrs" value={applicant.yrs_in_service} onchange={handleChange} placeholder="Years" disable={disable} />
                <FormInput label="Monthly/Daily Rate" type="number" name="rate" id="rate" value={applicant.rate} onchange={handleChange} placeholder="₱1,000" require={true} disable={disable} />
                <FormInput label="Employer" type="text" name="employer" id="employer" value={applicant.employer} onchange={handleChange} placeholder="Type employer name" disable={disable} />
                <div class="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-1">
                    <FormInput label="Employer Address (Brgy, municipality/city, province, region)" type="text" name="employer_address" id="name" value={applicant.view ? address.employer_address : applicant.employment_address} onchange={handleChange} placeholder="Type employer address" disable={disable} />
                </div>
            </div>

            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Income</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormInput label="Salary" type="number" name="salary" id="salary" value={applicant.salary} onchange={handleChange} placeholder="₱15,000 per month" require={true} disable={disable} />
                <FormInput label="Business" type="text" name="business" id="business" value={applicant.business} onchange={handleChange} placeholder="Name your business" require={true} disable={disable} />
                <FormInput label="Others" type="text" name="prod_name" id="name" placeholder="Other income" disable={disable} />
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Expenses</h3>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Write down all expenses spent every month</label>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                <FormInput label="Living" type="number" name="living_exp" id="living" value={applicant.living_exp} onchange={handleChange} placeholder="Living expenses/month" require={true} disable={disable} />
                <FormInput label="Rental" type="number" name="rental_exp" id="rental" value={applicant.rental_exp} onchange={handleChange} placeholder="₱500 per month" require={true} disable={disable} />
                <FormInput label="Education" type="number" name="education_exp" id="education" value={applicant.education_exp} onchange={handleChange} placeholder="Education expenses/month" require={true} disable={disable} />
                <FormInput label="Transportation" type="number" name="transportation" id="transport" value={applicant.transportation} onchange={handleChange} placeholder="Transport expenses/month" require={true} disable={disable} />
                <FormInput label="Insurance" type="number" name="insurance" id="insurance" value={applicant.insurance} onchange={handleChange} placeholder="Insurance expenses/month" require={true} disable={disable} />
                <FormInput label="Electricity/Water Bill" type="number" name="bills" id="bills" value={applicant.bills} onchange={handleChange} placeholder="Billing expenses/month" require={true} disable={disable} />
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Real and/or Personal Properties:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                <table class="w-full">
                    <FormTHead>
                        <FormTH label="Kind of Property" />
                        <FormTH label="Location" />
                        <FormTH style="flex-end grid sm:grid-cols-1">
                            <label class="pb-3">Valuation</label>
                            <div class="grid sm:cols-span-1 gap-4 sm:grid-cols-2 h-full">
                                <label>Assessment</label>
                                <label>Material</label>
                            </div>
                        </FormTH>
                        <FormTH label="Status" />
                    </FormTHead>
                    <FormTBody>
                        {properties.map(i => (
                            <tr>
                                <FormTD placeholder="Property name here" />
                                <FormTD placeholder="Location here" />
                                <FormTD placeholder="Assessment" style="flex justify-between">
                                    <input type="text" placeholder="Material" class="bg-gray-50 ml-1 border-b border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                </FormTD>
                                <FormTD placeholder="Current status" />
                            </tr>
                        ))}
                    </FormTBody>
                </table>
                {location.pathname !== '/admin/apply/employinfo' ? (
                    <div class="grid pt-4 sm:cols-span-1">
                        <BttnwithIcon type="button" click={() => setProperty([...properties, ''])} text="Add row">
                            <Plus />
                        </BttnwithIcon>
                    </div>
                ) : ''}
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Credit References:</h3>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">(List down all financing firms & individual who wxtended credit to you)</label>
            <div class="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                <table class="w-full">
                    <FormTHead>
                        <FormTH label="Name" />
                        <FormTH label="Type of Credit" />
                        <FormTH label="Terms" />
                        <FormTH label="Amount" />
                        <FormTH label="O/S Balance" />
                        <FormTH label="M/A" />
                    </FormTHead>
                    <FormTBody>
                        {references.map(i => (
                            <tr>
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
                {location.pathname !== '/admin/apply/employinfo' ? (
                    <div class="grid pt-4 sm:cols-span-1">
                        <BttnwithIcon text="Add row" type="button" click={() => setReference([...references, ''])}>
                            <Plus />
                        </BttnwithIcon>
                    </div>
                ) : ''}
            </div>
        </>
    );
}