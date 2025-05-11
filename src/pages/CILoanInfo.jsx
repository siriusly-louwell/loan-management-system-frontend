import React from "react";
import { useNavigate } from "react-router-dom";
import LoanList from "../components/LoanList";
import TrackList from "../components/TrackList";
import CustomBttn from "../components/buttons/CustomBttn";
import Button from "../components/buttons/Button";

export default function CILoanInfo() {
    const navigate = useNavigate();

    return (
        <section class="bg-white py-8 antialiased dark:bg-gray-800 md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the loan #957684673</h2>

                <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
                    <div class="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600 lg:max-w-xl xl:max-w-2xl">
                        <LoanList id="BJ8364850" price="$1,499" units="1" name="PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24' Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, macOS Sonoma, Blue, Keyboard layout INT" />
                        <LoanList id="BJ8364850" price="$1,500" units="3" name="Wave 100" />
                        <LoanList id="BJ8364850" price="$1,500" units="3" name="XRM" />
                        <LoanList id="BJ8364850" price="$1,500" units="3" name="Click" />
                        <LoanList id="BJ8364850" price="$1,500" units="3" name="Kawasaki" />

                        <div class="space-y-4 bg-gray-50 p-6 dark:bg-gray-700">
                            <div class="space-y-2">
                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="font-normal text-gray-500 dark:text-gray-300">Res. Certificate number</dt>
                                    <dd class="font-medium text-gray-900 dark:text-white">#4859JS33</dd>
                                </dl>
                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="font-normal text-gray-500 dark:text-gray-300">Issued at</dt>
                                    <dd class="font-medium text-gray-900 dark:text-white">- - -</dd>
                                </dl>
                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="font-normal text-gray-500 dark:text-gray-300">Issued on</dt>
                                    <dd class="font-medium text-gray-900 dark:text-white">- - -</dd>
                                </dl>
                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="font-normal text-gray-500 dark:text-gray-300">Amount Paid</dt>
                                    <dd class="font-medium text-green-500 dark:text-green-500">$6,592.00</dd>
                                </dl>
                            </div>

                            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-600">
                                <dt class="text-lg font-bold text-gray-900 dark:text-white">Overall price</dt>
                                <dd class="text-lg font-bold text-gray-900 dark:text-white">$7,191.00</dd>
                            </dl>
                        </div>
                    </div>

                    <div class="mt-6 grow sm:mt-8 lg:mt-0">
                        <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 sm:sticky top-0 shadow-sm dark:border-gray-700 dark:bg-gray-700">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Loan history</h3>

                            <ol class="relative ms-3 border-s border-gray-200 dark:border-gray-600">
                                <TrackList label="Loan Submission" sublabel="Loan application was successful" isDone="done" />
                                <TrackList label="Credit Investigation" sublabel="Your application is under investigation" isDone="current" />
                                <TrackList label="Accepted" sublabel="The application has passed the investigation" isDone="pend" />
                                <TrackList label="Initial Payment" sublabel="Your loan application has been successful" isDone="pend" />
                                <TrackList label="Paid!" sublabel="The loan has been fully paid" isDone="pend" />
                            </ol>

                            <div class="gap-4 sm:flex sm:items-center">
                                <Button text="View Form" onclick={() => navigate('/ciappform')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
    );
}