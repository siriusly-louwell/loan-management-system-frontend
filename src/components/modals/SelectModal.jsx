import React from 'react';
import CloseBttn from '../buttons/CloseBttn';
import CardBttn from '../buttons/CardBttn';

export default function SelectModal() {
    return (
        <div id="select_modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-40 dark:bg-opacity-40 top-0 right-0 left-0 z-50 flex justify-items-center sm:pt-20 w-full md:inset-0 h-screen">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Register As:
                        </h3>
                        <CloseBttn id="select_modal" />
                    </div>
                    <div class="p-4 md:p-5">
                        <p class="text-gray-500 dark:text-gray-400 mb-4">Select your user type:</p>
                        <ul class="space-y-4 mb-4">
                            <CardBttn label="Applicant/Customer" text="Inquire/apply loans"to="/applicant/apply" />
                            <CardBttn label="Co-maker" text="Gaurantor (Oblige applicant loans)"to="/comakr/comakeform" />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}