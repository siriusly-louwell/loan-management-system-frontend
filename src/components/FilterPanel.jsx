import React from "react";

export default function FilterPanel() {
    return (
        <form action="#" method="get" id="filterModal" tabIndex="-1" className="fixed hidden left-0 right-0 top-0 z-50 h-modal w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full">
            <div className="relative h-full w-full max-w-xl md:h-auto">
                <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="flex items-start justify-between rounded-t p-4 md:p-5">
                        <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">Filters</h3>
                        <button type="button" className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                <div className="px-4 md:px-5">
                    <div id="myTabContent">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3" id="brand" role="tabpanel">
                        <div className="space-y-2">
                            <h5 className="text-lg font-medium uppercase text-black dark:text-white">A</h5>

                            <div className="flex items-center">
                                <input id="apple" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Apple (56) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="asus" type="checkbox" value="" checked className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="asus" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Asus (97) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="acer" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                            <label htmlFor="acer" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Acer (234) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="allview" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="allview" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Allview (45) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="atari" type="checkbox" value="" checked className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="asus" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Atari (176) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="amd" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="amd" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> AMD (49) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="aruba" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="aruba" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Aruba (16) </label>
                            </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-lg font-medium uppercase text-black dark:text-white">B</h5>

                            <div className="flex items-center">
                                <input id="beats" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="beats" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Beats (56) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="bose" type="checkbox" value="" checked className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="bose" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Bose (97) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="benq" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="benq" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> BenQ (45) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="bosch" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="bosch" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Bosch (176) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="brother" type="checkbox" value="" checked className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="brother" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Brother (176) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="biostar" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="biostar" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Biostar (49) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="braun" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="braun" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Braun (16) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="blaupunkt" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="blaupunkt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Blaupunkt (45) </label>
                            </div>

                            <div className="flex items-center">
                                <input id="benq2" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                <label htmlFor="benq2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> BenQ (23) </label>
                            </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-lg font-medium uppercase text-black dark:text-white">C</h5>

                        <div className="flex items-center">
                        <input id="canon" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="canon" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Canon (49) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="cisco" type="checkbox" value="" checked className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="cisco" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Cisco (97) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="cowon" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="cowon" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Cowon (234) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="clevo" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="clevo" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Clevo (45) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="corsair" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="corsair" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Corsair (15) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="csl" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="csl" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Canon (49) </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-lg font-medium uppercase text-black dark:text-white">D</h5>

                        <div className="flex items-center">
                        <input id="dell" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="dell" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Dell (56) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="dogfish" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="dogfish" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Dogfish (24) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="dyson" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="dyson" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Dyson (234) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="dobe" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="dobe" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Dobe (5) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="digitus" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="digitus" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Digitus (1) </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-lg font-medium uppercase text-black dark:text-white">E</h5>

                        <div className="flex items-center">
                        <input id="emetec" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="emetec" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Emetec (56) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="extreme" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="extreme" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Extreme (10) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="elgato" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="elgato" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Elgato (234) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="emerson" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="emerson" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Emerson (45) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="emi" type="checkbox" value="" checked className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="emi" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> EMI (176) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="fugoo" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="fugoo" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Fugoo (49) </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-lg font-medium uppercase text-black dark:text-white">F</h5>

                        <div className="flex items-center">
                        <input id="fujitsu" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="fujitsu" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Fujitsu (97) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="fitbit" type="checkbox" value="" checked className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Fitbit (56) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="foxconn" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="foxconn" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Foxconn (234) </label>
                        </div>

                        <div className="flex items-center">
                        <input id="floston" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />

                        <label htmlFor="floston" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Floston (45) </label>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="flex items-center space-x-4 rounded-b p-4 dark:border-gray-600 md:p-5">
                    <button type="submit" className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-blue-700 dark:hover:bg-primary-800 dark:focus:ring-primary-800">Show 50 results</button>
                    <button type="reset" className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Reset</button>
                </div>
            </div>
            </div>
        </form>
    );
}