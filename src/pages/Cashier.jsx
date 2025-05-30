import React from 'react';
import Button from '../components/buttons/Button';
import FormInput from "../components/inputs/FormInput";
import SmallUpArrow from '../assets/icons/SmallUpArrow';
import LoanList from "../components/LoanList";
import PfpLabel from '../components/PfpLabel';
import FormSelect from '../components/inputs/FormSelect';

export default function Cashier() {
    return (
        <section class="bg-gray-100 py-8 antialiased dark:bg-gray-800 md:py-16">
            <form action="#" class="mx-auto max-w-screen-xl px-2 2xl:px-0">
                <div class="lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div class="min-w-0 flex-1 space-y-8">
                        <div class="space-y-4">
                            <div class="w-1/2">
                                <FormSelect name="applicant" id="color" label="Select Applicant">
                                    <option value={100000}>John Doe</option>
                                    <option value={140000}>Steve Java</option>
                                </FormSelect>
                            </div>
                            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Account Details</h2>

                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div class="flex space-x-4">
                                    <img class="h-16 w-16 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="Helene avatar" />
                                    <h2 class="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">John Doe</h2>
                                </div>

                                <div class="flex items-center space-x-4">
                                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Credit Score:</h2>
                                    <h2 class="flex items-center text-xl font-bold leading-none text-green-400 sm:text-2xl">67</h2>
                                    <span class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                        <SmallUpArrow />
                                        15%
                                    </span>
                                </div>
                                <PfpLabel caption="Salary" label="100,000 PHP" />
                                <PfpLabel caption="Co-maker" label="John Doe" />
                                <PfpLabel caption="TIN Number" label="9234RF4534DF" />
                                <PfpLabel caption="SSS/GSIS Number" label="012345j43" />
                                <div class="grid gap-4 sm:col-span-2 sm:grid-cols-4">
                                    <PfpLabel caption="Lot number" label="Lot number" />
                                    <PfpLabel caption="Phase" label="Type phase" />
                                    <PfpLabel caption="Sitio" label="Type sitio" />
                                    <PfpLabel caption="City/Municipality" label="Type city" />
                                    <PfpLabel caption="Blk number" label="Blk number" />
                                    <PfpLabel caption="Purok" label="Type purok" />
                                    <PfpLabel caption="Barangay" label="Type brgy" />
                                    <PfpLabel caption="District/Province" label="Type district" />
                                </div>

                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Products:</h2>
                                <div class="divide-y grid sm:col-span-2 sm:grid-cols-2 divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600">
                                    <LoanList id="BJ8364850" price="₱103,499" units="1" name="Kawasaki 45RF0" />
                                    <LoanList id="BJ8364850" price="₱103,500" units="3" name="Wave 100" />
                                    <LoanList id="BJ8364850" price="₱103,500" units="3" name="XRM" />
                                    <LoanList id="BJ8364850" price="₱103,500" units="3" name="Click" />
                                    <LoanList id="BJ8364850" price="₱103,500" units="3" name="Kawasaki" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="mt-6 w-full sticky top-10 space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                        <div class="flow-root">
                            <div class="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Date</dt>
                                    <dd class="text-base font-medium text-gray-900 dark:text-white">June 05, 2025</dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Res. Certificate number</dt>
                                    <dd class="text-base font-medium text-gray-900 dark:text-white">#4859JS33</dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Issued on</dt>
                                    <dd class="text-base font-medium text-gray-900 dark:text-white">- - -</dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Issued at</dt>
                                    <dd class="text-base font-medium text-gray-900 dark:text-white">- - -</dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Current Balance</dt>
                                    <dd class="text-base font-medium text-red-500">$199</dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Amount Paid</dt>
                                    <dd class="text-base font-medium text-green-500">$15,000</dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                    <dd class="text-base font-bold text-gray-900 dark:text-white">$8,392.00</dd>
                                </dl>

                                <dl class="grid grid-cols-1 items-center justify-between gap-4 py-3">
                                    <FormInput label="Add payment" type="number" name="prod_name" id="name" placeholder="1,500 PHP" />
                                </dl>

                                <dl>
                                    <Button text="Done Payment" />
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}