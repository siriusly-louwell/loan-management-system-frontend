import React, {useState, useEffect} from "react";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Download from "../assets/icons/Download";
import ProductGrid from "../components/cards/ProductGrid";
import ProductCard from "../components/cards/ProductCard";
import Ex from "../assets/icons/Ex";
import RMCI from '../assets/images/RMCI.png';
import CustomBttn from "../components/buttons/CustomBttn";

export default function Invoice() {
    const [motors, setMotor] = useState([]);
    const [motorLoad, setMotorLoad] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/motorcycle')
        .then(response => response.json())
        .then(data => {
                setMotor(data);
                setMotorLoad(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setMotorLoad(true);
            })
    }, []);
    return (
        <div class="max-w-full px-4 sm:px-6 lg:px-28 mx-auto py-4 bg-gray-100 dark:bg-gray-800 sm:py-10">
            <div class="mb-5 pb-5 flex justify-between items-center border-b border-gray-200">
                <div>
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Invoice</h2>
                </div>

                <div class="inline-flex gap-x-2">
                    <BttnwithIcon text="Download PDF" click={() => document.getElementById('pdfPrint').style.display = "block"}>
                        <Download />
                    </BttnwithIcon>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-3">
                <div>
                    <div class="grid space-y-3">
                        <dl class="flex flex-col sm:flex-row gap-x-3 text-sm">
                            <dt class="min-w-36 max-w-50 text-gray-500">
                                Billed to:
                            </dt>
                            <dd class="text-gray-800 dark:text-gray-200">
                                <a class="inline-flex items-center gap-x-1.5 text-rose-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium" href="#">
                                sara@site.com
                                </a>
                            </dd>
                        </dl>

                        <dl class="flex flex-col sm:flex-row gap-x-3 text-sm">
                            <dt class="min-w-36 max-w-50 text-gray-500">
                                Billing details:
                            </dt>
                            <dd class="font-medium text-gray-800 dark:text-gray-200">
                                <span class="block font-semibold">Sara Williams</span>
                                <address class="not-italic font-normal">
                                    280 Suzanne Throughway,
                                    Breannabury, OR 45801,
                                    United States
                                </address>
                            </dd>
                        </dl>

                        <dl class="flex flex-col sm:flex-row gap-x-3 text-sm">
                            <dt class="min-w-36 max-w-50 text-gray-500">
                                Shipping details:
                            </dt>
                            <dd class="font-medium text-gray-800 dark:text-gray-200">
                                <span class="block font-semibold">Sara Williams</span>
                                <address class="not-italic font-normal">
                                    280 Suzanne Throughway,
                                    Breannabury, OR 45801,
                                    United States
                                </address>
                            </dd>
                        </dl>
                    </div>
                </div>

                <div>
                    <div class="grid space-y-3">
                        <dl class="flex flex-col sm:flex-row gap-x-3 text-sm">
                            <dt class="min-w-36 max-w-50 text-gray-500">
                                Invoice number:
                            </dt>
                            <dd class="font-medium text-gray-800 dark:text-gray-200">
                                ADUQ2189H1-0038
                            </dd>
                        </dl>

                        <dl class="flex flex-col sm:flex-row gap-x-3 text-sm">
                            <dt class="min-w-36 max-w-50 text-gray-500">
                                Currency:
                            </dt>
                            <dd class="font-medium text-gray-800 dark:text-gray-200">
                                PHP - Philippine Peso
                            </dd>
                        </dl>

                        <dl class="flex flex-col sm:flex-row gap-x-3 text-sm">
                            <dt class="min-w-36 max-w-50 text-gray-500">
                                Due date:
                            </dt>
                            <dd class="font-medium text-gray-800 dark:text-gray-200">
                                10 Jan 2023
                            </dd>
                        </dl>

                        <dl class="flex flex-col sm:flex-row gap-x-3 text-sm">
                            <dt class="min-w-36 max-w-50 text-gray-500">
                                Billing method:
                            </dt>
                            <dd class="font-medium text-gray-800 dark:text-gray-200">
                                Send invoice
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div class="mt-6 border border-gray-200 p-4 rounded-lg space-y-4">
                <div class="hidden sm:grid sm:grid-cols-5">
                    <div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
                    <div class="text-start text-xs font-medium text-gray-500 uppercase">Qty</div>
                    <div class="text-start text-xs font-medium text-gray-500 uppercase">Rate</div>
                    <div class="text-end text-xs font-medium text-gray-500 uppercase">Amount</div>
                </div>

                <div class="hidden sm:block border-b border-gray-200"></div>

                <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                        <p class="font-medium text-gray-800 dark:text-gray-200">Yamaha 460T</p>
                    </div>
                    <div>
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                        <p class="text-gray-800 dark:text-gray-200">1</p>
                    </div>
                    <div>
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                        <p class="text-gray-800 dark:text-gray-200">5</p>
                    </div>
                    <div>
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                        <p class="sm:text-end text-gray-800 dark:text-gray-200">₱500</p>
                    </div>
                </div>

                <div class="sm:hidden border-b border-gray-200"></div>

                <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                        <p class="font-medium text-gray-800 dark:text-gray-200">Wave 100</p>
                    </div>
                    <div>
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                        <p class="text-gray-800 dark:text-gray-200">1</p>
                    </div>
                    <div>
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                        <p class="text-gray-800 dark:text-gray-200">24</p>
                    </div>
                    <div>
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                        <p class="sm:text-end text-gray-800 dark:text-gray-200">₱1250</p>
                    </div>
                </div>

                <div class="sm:hidden border-b border-gray-200"></div>

                <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                        <p class="font-medium text-gray-800 dark:text-gray-200">Raider FI</p>
                    </div>
                    <div>
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                        <p class="text-gray-800 dark:text-gray-200">1</p>
                    </div>
                    <div>
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                        <p class="text-gray-800 dark:text-gray-200">6</p>
                    </div>
                    <div>
                        <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                        <p class="sm:text-end text-gray-800 dark:text-gray-200">₱2000</p>
                    </div>
                </div>
            </div>

            <div class="mt-8 flex sm:justify-end">
                <div class="w-full max-w-2xl sm:text-end space-y-2">
                    <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                        <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                            <dt class="col-span-3 text-gray-500">Subotal:</dt>
                            <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">₱2750.00</dd>
                        </dl>

                        <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                            <dt class="col-span-3 text-gray-500">Total:</dt>
                            <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">₱2750.00</dd>
                        </dl>

                        <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                            <dt class="col-span-3 text-gray-500">Tax:</dt>
                            <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">₱39.00</dd>
                        </dl>

                        <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                            <dt class="col-span-3 text-gray-500">Amount paid:</dt>
                            <dd class="col-span-2 font-medium text-rose-600 dark:text-rose-200">₱2789.00</dd>
                        </dl>

                        <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                            <dt class="col-span-3 text-gray-500">Due balance:</dt>
                            <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">₱0.00</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div id="pdfPrint" className="fixed hidden top-0 left-0 right-0 z-50 px-20 pt-10 bg-gray-500 bg-opacity-30 justify-items-center items-center overflow-x-hidden overflow-y-auto md:inset-0 max-h-full">
                <div className="relative w-full h-auto max-w-5xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border dark:border-gray-500">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="delete-modal"
                            onClick={() => document.getElementById('pdfPrint').style.display = "none"}>
                            <Ex className="w-5 h-5" />
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-10 py-8 bg-gray-200">
                            <div class="mb-4 pb-1 flex justify-between items-end border-b border-gray-500">
                                <h2 class="text-lg font-bold text-gray-800 dark:text-gray-200">PDF View</h2>
                                <CustomBttn text="Download" classname="text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:focus:ring-rose-800 font-medium rounded-lg text-sm inline-flex items-center px-4 py-1.5 text-center mr-2" />
                                {/* <div class="inline-flex gap-x-2">
                                    <BttnwithIcon text="Download PDF">
                                        <Download />
                                    </BttnwithIcon>
                                </div> */}
                            </div>
                            <div className="bg-white rounded-lg px-10 py-5 text-xs">
                                <a href="#" className="flex items-center text-2xl mb-4 text-rose-600 font-semibold text-gray-900 dark:text-white border-b border-rose-500">
                                    <img src={RMCI} className="h-6 mr-2" alt="Rhean Motor Logo" />
                                    Rhean Motor Center
                                </a>
                                <div class="grid md:grid-cols-2 gap-3">
                                    <div>
                                        <div class="grid space-y-3">
                                            <dl class="flex flex-col sm:flex-row gap-x-3 text-xs">
                                                <dt class="min-w-36 max-w-50 text-gray-500">
                                                    Billed to:
                                                </dt>
                                                <dd class="text-gray-800 dark:text-gray-200">
                                                    <a class="inline-flex items-center gap-x-1.5 text-rose-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium" href="#">
                                                    sara@site.com
                                                    </a>
                                                </dd>
                                            </dl>

                                            <dl class="flex flex-col sm:flex-row gap-x-3 text-xs">
                                                <dt class="min-w-36 max-w-50 text-gray-500">
                                                    Billing details:
                                                </dt>
                                                <dd class="font-medium text-gray-800 dark:text-gray-200">
                                                    <span class="block font-semibold">Sara Williams</span>
                                                    <address class="not-italic font-normal">
                                                        280 Suzanne Throughway,
                                                        Breannabury, OR 45801,
                                                        United States
                                                    </address>
                                                </dd>
                                            </dl>

                                            <dl class="flex flex-col sm:flex-row gap-x-3 text-xs">
                                                <dt class="min-w-36 max-w-50 text-gray-500">
                                                    Shipping details:
                                                </dt>
                                                <dd class="font-medium text-gray-800 dark:text-gray-200">
                                                    <span class="block font-semibold">Sara Williams</span>
                                                    <address class="not-italic font-normal">
                                                        280 Suzanne Throughway,
                                                        Breannabury, OR 45801,
                                                        United States
                                                    </address>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>

                                    <div>
                                        <div class="grid space-y-3">
                                            <dl class="flex flex-col sm:flex-row gap-x-3 text-xs">
                                                <dt class="min-w-36 max-w-50 text-gray-500">
                                                    Invoice number:
                                                </dt>
                                                <dd class="font-medium text-gray-800 dark:text-gray-200">
                                                    ADUQ2189H1-0038
                                                </dd>
                                            </dl>

                                            <dl class="flex flex-col sm:flex-row gap-x-3 text-xs">
                                                <dt class="min-w-36 max-w-50 text-gray-500">
                                                    Currency:
                                                </dt>
                                                <dd class="font-medium text-gray-800 dark:text-gray-200">
                                                    PHP - Philippine Peso
                                                </dd>
                                            </dl>

                                            <dl class="flex flex-col sm:flex-row gap-x-3 text-xs">
                                                <dt class="min-w-36 max-w-50 text-gray-500">
                                                    Due date:
                                                </dt>
                                                <dd class="font-medium text-gray-800 dark:text-gray-200">
                                                    10 Jan 2023
                                                </dd>
                                            </dl>

                                            <dl class="flex flex-col sm:flex-row gap-x-3 text-xs">
                                                <dt class="min-w-36 max-w-50 text-gray-500">
                                                    Billing method:
                                                </dt>
                                                <dd class="font-medium text-gray-800 dark:text-gray-200">
                                                    Send invoice
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-6 border border-rose-200 p-4 rounded-lg space-y-4">
                                    <div class="hidden sm:grid sm:grid-cols-5">
                                        <div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
                                        <div class="text-start text-xs font-medium text-gray-500 uppercase">Qty</div>
                                        <div class="text-start text-xs font-medium text-gray-500 uppercase">Rate</div>
                                        <div class="text-end text-xs font-medium text-gray-500 uppercase">Amount</div>
                                    </div>

                                    <div class="hidden sm:block border-b border-rose-200"></div>

                                    <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        <div class="col-span-full sm:col-span-2">
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                                            <p class="font-medium text-gray-800 dark:text-gray-200">Yamaha 460T</p>
                                        </div>
                                        <div>
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                                            <p class="text-gray-800 dark:text-gray-200">1</p>
                                        </div>
                                        <div>
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                                            <p class="text-gray-800 dark:text-gray-200">5</p>
                                        </div>
                                        <div>
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                                            <p class="sm:text-end text-gray-800 dark:text-gray-200">₱500</p>
                                        </div>
                                    </div>

                                    <div class="sm:hidden border-b border-gray-200"></div>

                                    <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        <div class="col-span-full sm:col-span-2">
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                                            <p class="font-medium text-gray-800 dark:text-gray-200">Wave 100</p>
                                        </div>
                                        <div>
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                                            <p class="text-gray-800 dark:text-gray-200">1</p>
                                        </div>
                                        <div>
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                                            <p class="text-gray-800 dark:text-gray-200">24</p>
                                        </div>
                                        <div>
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                                            <p class="sm:text-end text-gray-800 dark:text-gray-200">₱1250</p>
                                        </div>
                                    </div>

                                    <div class="sm:hidden border-b border-gray-200"></div>

                                    <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        <div class="col-span-full sm:col-span-2">
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                                            <p class="font-medium text-gray-800 dark:text-gray-200">Raider FI</p>
                                        </div>
                                        <div>
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                                            <p class="text-gray-800 dark:text-gray-200">1</p>
                                        </div>
                                        <div>
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                                            <p class="text-gray-800 dark:text-gray-200">6</p>
                                        </div>
                                        <div>
                                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                                            <p class="sm:text-end text-gray-800 dark:text-gray-200">₱2000</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-8 flex sm:justify-end">
                                    <div class="w-full max-w-2xl sm:text-end space-y-2">
                                        <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                                            <dl class="grid sm:grid-cols-5 gap-x-3 text-xs">
                                                <dt class="col-span-3 text-gray-500">Subotal:</dt>
                                                <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">₱2750.00</dd>
                                            </dl>

                                            <dl class="grid sm:grid-cols-5 gap-x-3 text-xs">
                                                <dt class="col-span-3 text-gray-500">Total:</dt>
                                                <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">₱2750.00</dd>
                                            </dl>

                                            <dl class="grid sm:grid-cols-5 gap-x-3 text-xs">
                                                <dt class="col-span-3 text-gray-500">Tax:</dt>
                                                <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">₱39.00</dd>
                                            </dl>

                                            <dl class="grid sm:grid-cols-5 gap-x-3 text-xs">
                                                <dt class="col-span-3 text-gray-500">Amount paid:</dt>
                                                <dd class="col-span-2 font-medium text-rose-600 dark:text-rose-200">₱2789.00</dd>
                                            </dl>

                                            <dl class="grid sm:grid-cols-5 gap-x-3 text-xs">
                                                <dt class="col-span-3 text-gray-500">Due balance:</dt>
                                                <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">₱0.00</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <h2 class="text-2xl font-semibold mt-5 text-gray-800 dark:text-gray-200">Recommendations</h2>
            <ProductGrid>
                {motorLoad ? (<div>Loading...</div>) : (
                    <>
                        <ProductCard key={motors[0].id} unit={motors[0]} url="/customer/product" />
                        <ProductCard key={motors[1].id} unit={motors[1]} url="/customer/product" />
                        <ProductCard key={motors[2].id} unit={motors[2]} url="/customer/product" />
                    </>
                )}
            </ProductGrid> */}
        </div>
    );
}