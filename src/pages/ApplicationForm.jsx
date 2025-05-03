import React from 'react';
import Button from "../components/buttons/Button";
import PersonalInfoForm from './PersonalInfoForm';
import FamilyInfoForm from './FamilyInfoForm';
import EmploymentInfoForm from './EmploymentInfoForm';
import Stepper from '../components/Stepper';
import Step from '../components/Step';
import FormRequirements from './FormRequirements';
import FormCredentials from './FormCredentials';

export default function ApplicationForm() {
    return (
        <div class="overflow-y-auto overflow-x-hidden sm:flex flex-start fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <Stepper>
                <Step label="1. Personal Information" status="done" />
                <Step label="2. Family/Relative Information" status="current" />
                <Step label="3. Employment, Properties, & Income/Expenses" status="pend" />
                <Step label="4. Upload Requirements" status="pend" />
                <Step label="5. Account Credentials" status="pend" />
            </Stepper>
            <div class="relative p-4 w-full max-w-5xl h-full md:h-auto">
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div class="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">REGISTRATION FORM</h3>
                    </div>
                    <form action="#">
                        {/* <PersonalInfoForm /> */}
                        {/* <FamilyInfoForm /> */}
                        <EmploymentInfoForm />
                        {/* <FormRequirements /> */}
                        {/* <FormCredentials /> */}

                        <div class="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
                            <Button text="Back" />
                            <Button text="Next" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}