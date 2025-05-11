import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import EmploymentInfoForm from './EmploymentInfoForm';
import FamilyInfoForm from './FamilyInfoForm';

export default function CIAppForm() {
    return (
        <div class="overflow-y-auto overflow-x-hidden justify-items-center fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div class="relative p-4 w-full max-w-5xl h-full md:h-auto">
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div class="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">APPLICATION FORM</h3>
                    </div>
                    <form action="#">
                        <PersonalInfoForm />
                        <EmploymentInfoForm />
                        <FamilyInfoForm />
                    </form>
                </div>
            </div>
        </div>
    );
}