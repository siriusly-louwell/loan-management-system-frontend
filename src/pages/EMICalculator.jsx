import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/buttons/Button';
import FormSelect from "../components/inputs/FormSelect";
import StepCard from '../components/cards/StepCard';
import BttnSmall from '../components/buttons/BttnSmall';

export default function EMICalculator() {
    const navigate = useNavigate();
    const [price, setPrice] = useState(100000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(10);
    const [tenure, setTenure] = useState(24);

    const downPayment = (price * downPaymentPercent) / 100;
    const loanAmount = price - downPayment;
    const monthlyInterestRate = interestRate / 12 / 100;

    const emi =
        loanAmount === 0 || interestRate === 0
        ? loanAmount / tenure
        : (loanAmount * monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, tenure)) /
            (Math.pow(1 + monthlyInterestRate, tenure) - 1);

    return (
        <div class="w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
            <div class="sm:px-10 py-20 w-full">
                <div class="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-lg justify-items-center space-y-5">
                    <h1 class="dark:text-white font-bold text-3xl">How Do I Apply?</h1>
                    <ul class="relative flex flex-col md:flex-row gap-2 w-full">
                        <StepCard num={1} label="Calculate your Loan" context="Calculate your motorcycle loan below and adjust the the fields to fit your preferences." />
                        <StepCard num={2} label="Fillout the Application" context="After you calculate your estimated monthly EMI, click 'Apply Loan' and apply by filling out an application form." />
                        <StepCard num={3} label="Submit your Documents" context="After filling out the application form, upload your documents to the system." />
                        <StepCard num={4} label="Leave the rest to us" context="Your loan will be processed. We will notify you once it is done." />
                    </ul>
                </div>
            </div>

            <div class="w-full justify-items-center px-5">
                <h1 class="dark:text-white font-bold text-3xl">Motorcycle Loan Calculator</h1>
                <p class="text-gray-800 dark:text-gray-300">Calculate the monthly EMI based on motorcycle loan amount, tenure and interest rate</p>
            </div>

            <div class="py-20 sm:flex sm:space-x-20 items-center px-4 justify-center">
                <div class="sm:w-1/2 p-2">
                    <div class="mb-6">
                        {/* <FormSelect name="unit" id="color" label="Select Motorcycle unit" onchange={(e) => setPrice(parseInt(e.target.value))}>
                            <option value={100000}>Honda - Wave 100</option>
                            <option value={140000}>Honda - Click</option>
                        </FormSelect> */}
                    </div>
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-medium text-gray-700 dark:text-gray-200">Downpayment</h3>
                            <span class="font-bold text-blue-600">{downPaymentPercent}%</span>
                        </div>
                        <input type="range" min="10" max="60" step="10" onChange={(e) => setDownPaymentPercent(Number(e.target.value))} class="w-full h-2 bg-gray-300 dark:bg-gray-400 rounded-lg appearance-none cursor-pointer" />
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                            <span>10%</span>
                            <span>20%</span>
                            <span>30%</span>
                            <span>40%</span>
                            <span>50%</span>
                            <span>60%</span>
                        </div>
                    </div>

                    {/* <div class="mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-medium text-gray-700 dark:text-gray-200">Rate of Interest</h3>
                            <span class="font-bold text-blue-600">{interestRate}%</span>
                        </div>
                        <input type="range" min="6" max="36" step="1" onChange={(e) => setInterestRate(Number(e.target.value))} class="w-full h-2 bg-gray-300 dark:bg-gray-400 rounded-lg appearance-none cursor-pointer" />
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                            <span>6%</span>
                            <span>9%</span>
                            <span>12%</span>
                            <span>15%</span>
                            <span>18%</span>
                            <span>21%</span>
                            <span>24%</span>
                            <span>27%</span>
                            <span>30%</span>
                            <span>33%</span>
                            <span>36%</span>
                        </div>
                    </div> */}

                    <div class="mb-8">
                        <h3 class="font-medium text-gray-700 dark:text-gray-200 mb-3">Loan Tenure</h3>
                        <div class="grid grid-cols-5 gap-2">
                            <input type="radio" value checked={tenure === 12} class="hidden" />
                            <BttnSmall text="1 Year" click={() => setTenure(12)} />
                            <BttnSmall text="2 Year" click={() => setTenure(24)} />
                            <BttnSmall text="3 Year" click={() => setTenure(36)} />
                            <BttnSmall text="4 Year" click={() => setTenure(48)} />
                            <BttnSmall text="5 Year" click={() => setTenure(60)} />
                            <BttnSmall text="6 Year" click={() => setTenure(72)} />
                            <BttnSmall text="7 Year" click={() => setTenure(84)} />
                            <BttnSmall text="8 Year" click={() => setTenure(96)} />
                            <BttnSmall text="9 Year" click={() => setTenure(108)} />
                            <BttnSmall text="10 Year" click={() => setTenure(120)} />
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-600 rounded-2x1 shadow-lg sm:w-1/3 justify-items-center rounded-xl p-5 mb-4">
                    <div class="flex justify-between items-center space-x-5 mb-4">
                        <div class="justify-items-center">
                            <p class="text-gray-500 dark:text-gray-100 text-sm">Down Payment</p>
                            <p class="text-xl font-bold text-gray-800 dark:text-white">₱{downPayment.toFixed(2)}</p>
                        </div>
                        <div class="justify-items-center">
                            <p class="text-gray-500 dark:text-gray-100 text-sm">Loan Amount</p>
                            <p class="text-xl font-bold text-gray-800 dark:text-white">₱{price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="border-t w-full justify-items-center border-gray-200 py-4">
                        <p class="text-gray-500 dark:text-gray-100 text-sm">Estimated Monthly EMI</p>
                        <p class="text-2xl font-bold text-blue-600 dark:text-blue-500">₱{emi.toFixed(2)}</p>
                    </div>

                    <Button text="Apply Loan" onclick={() => navigate('/applicant/apply')} />
                </div>
            </div>
        </div>
    );
}