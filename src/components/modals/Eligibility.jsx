import React from "react";
import CloseBttn from "../buttons/CloseBttn";
import Button from "../buttons/Button";
import ColorLabel from "../ColorLabel";

export default function Eligibity({rate, income, yrs, rent, amortization, salary, transactions = []}) {
    const loans = transactions.length > 0 ? transactions.reduce((sum, item) => {
        const tenure = item.tenure * 12;
        const loanAmount = parseFloat(item.motorcycle?.price || 0) - parseFloat(item.downpayment || 0);
        const monthlyRate = item.motorcycle.interest / 12 / 100;
        const emi = monthlyRate === 0 ? loanAmount / tenure
            : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
        
        return sum + Math.round(emi * 100) / 100;
    }, 0) : 0;

    const dti = ((parseFloat(rent) + parseFloat(amortization) + loans) / parseFloat(rate)) * 100;

    // console.log(loans, rent, amortization, rate);

    return (
        <div id="eligibleModal" className="overflow-y-auto hidden overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-10 sm:py-8 border border-gray-500">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Eligibility Results</h3>
                        <CloseBttn id="eligibleModal" />
                    </div>
                    <section>
                        <table className="mb-5 w-full">
                            <thead className="border-b border-gray-400">
                                <th className="py-2">Category</th>
                                <th className="py-2">Data</th>
                                <th className="py-2">Threshold</th>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-400">
                                    <td className="py-4 flex space-x-3 items-center mr-3">
                                        <ColorLabel style="red" />
                                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Employment Stability</h3>
                                    </td>
                                    <td className="py-4">
                                        <div className="grid grid-cols-2 gap-x-6">
                                            <span className="text-sm text-gray-600">Income Source:</span>
                                            <span className="font-semibold text-md text-gray-700">{income ? income.charAt(0).toUpperCase() + income.slice(1) : ''}</span>
                                            <span className="text-sm text-gray-600">Years in service:</span>
                                            <span className="font-semibold text-md text-gray-700">{yrs} years</span>
                                            <span className="text-sm text-gray-600">Monthly Income:</span>
                                            <span className="font-semibold text-md text-rose-700">₱{parseFloat(rate).toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="font-semibold text-rose-700 whitespace-nowrap">+12,000 loan eligibility</span>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-400">
                                    <td className="py-4 flex space-x-3 items-center mr-3">
                                        <ColorLabel style="red" />
                                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Existing Debts and Loans</h3>
                                    </td>
                                    <td className="py-4">
                                        <div className="grid grid-cols-2 gap-x-6">
                                            <span className="text-sm text-gray-600 whitespace-nowrap">Monthly Rent:</span>
                                            <span className="font-semibold text-md text-gray-700">₱{parseFloat(rent).toLocaleString()}</span>
                                            <span className="text-sm text-gray-600 whitespace-nowrap">Amortization:</span>
                                            <span className="font-semibold text-md text-gray-700">₱{parseFloat(amortization).toLocaleString()}</span>
                                            <span className="text-sm text-gray-600 whitespace-nowrap">Total Existing Loans:</span>
                                            <span className="font-semibold text-md text-gray-700">₱{loans.toLocaleString()}</span>
                                            <span className="text-md font-bold mt-2 text-gray-600">DTI:</span>
                                            <span className="text-rose-500 font-bold mt-2">{dti}%</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="font-semibold text-rose-700 whitespace-nowrap">Below 40% DTI</span>
                                    </td>
                                </tr>
                                 <tr className="border-b border-gray-400">
                                    <td className="py-4 flex space-x-3 items-center mr-3">
                                        <ColorLabel style="red" />
                                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Net Disposable Income</h3>
                                    </td>
                                    <td className="py-4">
                                        <div className="grid grid-cols-2 gap-x-6">
                                            <span className="text-sm text-gray-600 whitespace-nowrap">Net Income:</span>
                                            <span className="font-semibold text-md text-gray-700">₱{parseFloat(salary).toLocaleString()}</span>
                                            <div className="grid col-span-2 mt-2">
                                                <span className="text-sm text-gray-700">
                                                    <span className="text-rose-500 font-bold mt-2">₱{parseFloat(salary).toLocaleString()}</span> (after expenses)
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="font-semibold text-rose-700 whitespace-nowrap">+30% EMI of net (2,400)</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex flex-col space-y-2 items-center justify-center w-full my-5 rounded-lg bg-green-100 px-20 py-4 text-2xl text-green-700 dark:bg-green-900 dark:text-green-300">
                            <h3 className="font-bold">Eligible</h3>
                            <span className="text-sm font-small text-green-600">The applicant is eligible to take the loan</span>
                        </div>
                        <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Button text="Close" type="submit" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}