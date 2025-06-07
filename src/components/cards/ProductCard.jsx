import React from "react";
import { Link, useLocation } from "react-router-dom";
import StarRating from "../StarRating";
import AddtoCartBttn from "../buttons/AddtoCartBttn";
import ProductLink from "../links/ProductLink";
import ColorLabel from "../ColorLabel";
import Check from "../../assets/icons/Check";

export default function ProductCard({unit, url, id, selected, selectUnits}) {
    const location = useLocation();
    const including = location.pathname === '/product' ? selected.includes(`${id}`) : false;

    return (
        <>
            {location.pathname === '/product' ? (
                <input type="checkbox" id={`unit_${id}`} className="hidden" value={id} onChange={(e) => selectUnits(e.target.value)} />
            ) : ""}
            <label htmlFor={`unit_${id}`} type="button" 
                className={`rounded-lg border hover:bg-gray-200 p-6 shadow-sm ${including ? 'border-rose-500 border-2 bg-rose-100 hover:bg-rose-200' : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-700'}`}>
                <div className="h-56 w-full rounded-lg">
                    <img className="mx-auto rounded-lg object-contain h-full" src={"http://127.0.0.1:8000/storage/"+unit.file_path} alt="Product Image" />
                </div>
                <div className="pt-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-rose-500 dark:text-rose-100">{unit.interest}% Interest rate</span>

                        {location.pathname !== "/product" ? (
                            <div className="flex items-center justify-end gap-1">
                                <button type="button" data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only"> Quick look </span>
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                                <div id="tooltip-quick-look" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                    Quick look
                                    <div className="tooltip-arrow" data-popper-arrow=""></div>
                                </div>
                                <button type="button" data-tooltip-target="tooltip-add-to-favorites" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only"> Add to Favorites </span>
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                                    </svg>
                                </button>
                                <div id="tooltip-add-to-favorites" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                    Add to favorites
                                    <div className="tooltip-arrow" data-popper-arrow=""></div>
                                </div>
                            </div>
                        ) : ""}
                    </div>

                    <ProductLink url={url} prodName={unit.brand+": "+unit.name} id={unit.id} />
                    <div className="flex space-x-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Colors: </p>
                        <div className='grid grid-cols-10 gap-y-2'>
                            {unit.colors.map(color => (
                                <ColorLabel style={color.color} />
                            ))}
                        </div>
                    </div>

                    <ul className="mt-2 flex items-center gap-4">
                        <li className="flex items-center gap-2">
                            {/* <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                            </svg> */}
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{unit.tenure}-year loan</p>
                        </li>

                        <li className="flex items-center gap-2">
                            {/* <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg> */}
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rebate: ₱{parseFloat(unit.rebate).toLocaleString()}</p>
                        </li>
                    </ul>

                    <div className="mt-4 flex items-center justify-between gap-4">
                        <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">₱{parseFloat(unit.price).toLocaleString()}</p>
                        {location.pathname !== "/product" ? (
                            <AddtoCartBttn state={{id: unit.id}} url={url} text="Inquire" />
                        ) : (
                            <div className={`rounded-full h-6 w-6 border border-2 flex p-1 justify-center items-center ${including ? 'border-rose-500 bg-rose-500' : 'border-gray-400 dark:border-gray-500'}`}>
                                {including ? (<Check color="white" />) : ""}
                            </div>
                        )}
                    </div>
                </div>
            </label>
        </>
    );
}