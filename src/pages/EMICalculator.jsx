import React from 'react';
import Button from '../components/buttons/Button';
import { Navigate, useNavigate } from 'react-router-dom';

export default function EMICalculator() {
    const navigate = useNavigate();

    return (
        <div class="w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
            <div class="bg-blue-600 dark:bg-blue-800 p-6 text-white">
                <h1 class="text-2x1 font-bold">Motorcycle Loan Calculator</h1>
                <p class="text-blue-10">Calculate the monthly EMI based on motorcycle loan amount, tenure and interest rate</p>
            </div>

            <div class="py-20 sm:flex sm:space-x-20 items-center px-4 justify-center">
                <div class="sm:w-1/2 p-2">
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-medium text-gray-700 dark:text-gray-200">Downpayment</h3>
                            <span class="font-bold text-blue-600">20%</span>
                        </div>
                        <input type="range" min="20" max="60" step="10" class="w-full h-2 bg-gray-300 dark:bg-gray-400 rounded-lg appearance-none cursor-pointer" />
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                            <span>20%</span>
                            <span>30%</span>
                            <span>40%</span>
                            <span>50%</span>
                            <span>60%</span>
                        </div>
                    </div>

                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-medium text-gray-700 dark:text-gray-200">Rate of Interest</h3>
                            <span class="font-bold text-blue-600">14%</span>
                        </div>
                        <input type="range" min="0" max="36" step="1" class="w-full h-2 bg-gray-300 dark:bg-gray-400 rounded-lg appearance-none cursor-pointer" />
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0%</span>
                            <span>14%</span>
                            <span>17%</span>
                            <span>21%</span>
                            <span>25%</span>
                            <span>29%</span>
                            <span>32%</span>
                            <span>36%</span>
                        </div>
                    </div>

                    <div class="mb-8">
                        <h3 class="font-medium text-gray-700 dark:text-gray-200 mb-3">Loan Tenure</h3>
                        <div class="grid grid-cols-5 gap-2">
                            <button class="bg-gray-200 dark:bg-gray-500 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">1 Year</button>
                            <button class="bg-gray-200 dark:bg-gray-500 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">2 Year</button>
                            <button class="bg-gray-200 dark:bg-gray-500 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">3 Year</button>
                            <button class="bg-gray-200 dark:bg-gray-500 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">4 Year</button>
                            <button class="bg-gray-200 dark:bg-gray-500 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">5 Year</button>
                            <button class="bg-gray-200 dark:bg-gray-500 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">6 Year</button>
                            <button class="bg-gray-200 dark:bg-gray-500 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">7 Year</button>
                            <button class="bg-gray-200 dark:bg-gray-500 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">8 Year</button>
                            <button class="bg-gray-200 dark:bg-gray-500 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">9 Year</button>
                            <button class="bg-gray-200 dark:bg-gray-500 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition">10 Year</button>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-600 rounded-2x1 shadow-lg sm:w-1/3 justify-items-center rounded-xl p-5 mb-4">
                    <div class="flex justify-between items-center space-x-5 mb-4">
                        <div class="justify-items-center">
                            <p class="text-gray-500 dark:text-gray-100 text-sm">Down Payment</p>
                            <p class="text-xl font-bold text-gray-800 dark:text-white">98,000 PHP</p>
                        </div>
                        <div class="justify-items-center">
                            <p class="text-gray-500 dark:text-gray-100 text-sm">Loan Amount</p>
                            <p class="text-xl font-bold text-gray-800 dark:text-white">308,000 PHP</p>
                        </div>
                    </div>
                    <div class="border-t w-full justify-items-center border-gray-200 py-4">
                        <p class="text-gray-500 dark:text-gray-100 text-sm">Estimated Monthly EMI</p>
                        <p class="text-2xl font-bold text-blue-600 dark:text-blue-500">12,000 PHP</p>
                    </div>

                    <Button text="Apply Loan" onclick={() => navigate('/applicant/apply')} />
                    {/* <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition">Apply Loan</button> */}
                </div>
            </div>
        </div>
    );
}