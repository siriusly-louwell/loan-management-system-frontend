import React from "react";
import SelectColor from "../checkboxes/SelectColor";
import CloseBttn from "../buttons/CloseBttn";

export default function ColorModal({colors, changeColor}) {
    return (
        <div id="colorModal" className="overflow-y-auto hidden overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-2 w-full max-w-xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 sm:py-4 border border-gray-500">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pick a Color:</h3>
                        <CloseBttn id="colorModal" />
                    </div>
                    <form>
                        <section className="border-b border-gray-300">
                            <h4 className="text-md text-gray-900 dark:text-white">Brand Colors: </h4>
                            <SelectColor size={6} colors={colors} changeColor={changeColor} colorType="ofc" />
                        </section>
                        <section className="mt-3">
                            <h4 className="text-md text-gray-900 dark:text-white">Non-brand Colors: </h4>
                            <SelectColor size={6} colors={colors} changeColor={changeColor} />
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );
}