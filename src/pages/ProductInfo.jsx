import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddtoCartBttn from "../components/buttons/AddtoCartBttn";
import StarRating from "../components/StarRating";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import NavPath from "../components/NavPath";
import EMICalculator from './EMICalculator';
import ColorLabel from '../components/ColorLabel';
import SmallLabel from '../components/texts/SmallLabel';
import FormSelect from '../components/inputs/FormSelect';
import Button from '../components/buttons/Button';
import Plus from '../assets/icons/Plus';
import ProductGrid from '../components/cards/ProductGrid';
import ProductCard from '../components/cards/ProductCard';
import CloseBttn from '../components/buttons/CloseBttn';
import PfpLabel from '../components/PfpLabel';
import SmallSpin from '../components/loading components/SmallSpin';

export default function ProductInfo({staff = false}) {
    const navigate = useNavigate();
    const {state} = useLocation();
    // const id = staff ? 5 : state?.id;
    const [id, setId] = useState(staff ? 1 : state?.id);
    const [unit, setUnit] = useState({});
    const [unitLoad, setUnitLoad] = useState(true);
    const [addUnit, setUnits] = useState([]);
    const [addLoad, setUnitsLoad] = useState(true);
    const [current, setCurrent] = useState(0);
    const images = [];

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    useEffect(() => {
            fetch('http://127.0.0.1:8000/api/motorcycle/' + id)
            .then(response => response.json())
            .then(data => {
                setUnit(data);
                setUnitLoad(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setUnitLoad(true);
            })
    }, [id]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/motorcycle')
        .then(response => response.json())
        .then(data => {
                setUnits(data);
                setUnitsLoad(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setUnitsLoad(true);
            })
    }, []);

    if(!unitLoad)unit.images.map(file => {
        images.push("http://127.0.0.1:8000/storage/" + file.path);
    });


    function changeUnit(event) {
        setUnit(addUnit[event.target.value]);
        setUnitLoad(true);
    }

    const totalSlides = images.length;

    // console.log(unit.downpayment);

    return (
        <section className="py-6 bg-gray-100 md:py-10 dark:bg-gray-800 antialiased">
            {/* <NavPath /> */}
            <div className="max-w-screen-xl mt-10 px-4 pb-6 mx-auto 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-15 xl:gap-16">
                    {(
                        <>
                            <div className="relative w-full space-y-4 lg:max-w-3xl mx-auto rounded-xl overflow-hidden">
                                {!unitLoad ? (
                                    staff ? (
                                        <FormSelect name="motor" id="motor" value={`${unit.brand}: ${unit.name} - ₱${parseFloat(unit.price).toLocaleString()}`} label="Select Unit" onchange={(e) => setId(e.target.value)}>
                                            {addUnit.map(motor => (
                                                <option value={motor.id}>{motor.brand}: {motor.name} - ₱{parseFloat(motor.price).toLocaleString()}</option>
                                            ))}
                                        </FormSelect>
                                    ) : ""
                                ) : (
                                    <div className="w-full h-10 bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md"></div>
                                )}
                                {unitLoad ? (
                                    <div className="flex justify-center items-center w-full h-full">
                                        <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-500 animate-pulse flex items-center justify-center">
                                            <svg class="w-12 h-12 stroke-gray-500 dark:stroke-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.5499 15.15L19.8781 14.7863C17.4132 13.4517 16.1808 12.7844 14.9244 13.0211C13.6681 13.2578 12.763 14.3279 10.9528 16.4679L7.49988 20.55M3.89988 17.85L5.53708 16.2384C6.57495 15.2167 7.09388 14.7059 7.73433 14.5134C7.98012 14.4396 8.2352 14.4011 8.49185 14.3993C9.16057 14.3944 9.80701 14.7296 11.0999 15.4M11.9999 21C12.3154 21 12.6509 21 12.9999 21C16.7711 21 18.6567 21 19.8283 19.8284C20.9999 18.6569 20.9999 16.7728 20.9999 13.0046C20.9999 12.6828 20.9999 12.3482 20.9999 12C20.9999 11.6845 20.9999 11.3491 20.9999 11.0002C20.9999 7.22883 20.9999 5.34316 19.8283 4.17158C18.6568 3 16.7711 3 12.9998 3H10.9999C7.22865 3 5.34303 3 4.17145 4.17157C2.99988 5.34315 2.99988 7.22877 2.99988 11C2.99988 11.349 2.99988 11.6845 2.99988 12C2.99988 12.3155 2.99988 12.651 2.99988 13C2.99988 16.7712 2.99988 18.6569 4.17145 19.8284C5.34303 21 7.22921 21 11.0016 21C11.3654 21 11.7021 21 11.9999 21ZM7.01353 8.85C7.01353 9.84411 7.81942 10.65 8.81354 10.65C9.80765 10.65 10.6135 9.84411 10.6135 8.85C10.6135 7.85589 9.80765 7.05 8.81354 7.05C7.81942 7.05 7.01353 7.85589 7.01353 8.85Z" stroke="stroke-current" stroke-width="1.6" stroke-linecap="round"></path>
                                            </svg>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                                        {images.map((src, index) => (
                                        <img key={index} src={src} alt={`Slide ${index + 1}`} className="w-full object-contain flex-shrink-0 rounded-xl bg-gray-200 dark:bg-gray-600"/>
                                        ))}
                                    </div>
                                )}

                                {unitLoad ? "" : (
                                    <>
                                        <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 opacity-60 text-white p-2 rounded-full">
                                            <span className="text-2xl" aria-hidden="true">
                                                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="m15 18-6-6 6-6"></path>
                                                </svg>
                                            </span>
                                        </button>
                                        <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 opacity-60 text-white p-2 rounded-full" >
                                            <span className="text-2xl" aria-hidden="true">
                                                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="m9 18 6-6-6-6"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </>
                                )}

                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {images.map((_, index) => (
                                        <button key={index} className={`w-2 h-2 rounded-full ${index === current ? 'bg-rose-500' : 'bg-gray-300'}`} onClick={() => setCurrent(index)} />
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6 sm:mt-8 lg:mt-0">
                                {unitLoad ? (
                                    <h1 className="h-5 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse w-60 mb-4"></h1>
                                ) : (
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">{unit.name} ({unit.brand})</h1>
                                   )}
                                        
                                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                    {unitLoad ? (
                                        <p className="h-8 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse w-40 mb-4"></p>
                                    ) : (
                                        <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">₱{parseFloat(unit.price).toLocaleString()}</p>
                                    )}
                                    <div className="flex space-x-2">
                                        <div className='grid grid-cols-10 gap-y-2'>
                                            {unitLoad ? "":
                                                unit.colors.map(color => (
                                                    <ColorLabel style={color.color} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='grid sm:grid-cols-2'>
                                    <SmallLabel label="Annual Interest" text={unitLoad ? (<SmallSpin size={20} />) : `${unit.interest}%`} />
                                    <SmallLabel label="Rebate" text={unitLoad ? (<SmallSpin size={20} />) : `₱${parseFloat(unit.rebate).toLocaleString()}`} />
                                    <SmallLabel label="Loan Tenure" text={unitLoad ? (<SmallSpin size={20} />) : `${unit.tenure} years`} />
                                    <SmallLabel label="Stock" text={unitLoad ? (<SmallSpin size={20} />) : `${unit.quantity} units`} />
                                </div>

                                <div className="mt-6 sm:gap-4 space-y-2 sm:items-center sm:flex sm:mt-8">
                                    <BttnwithIcon text="Add to favorites">
                                        <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                        </svg>
                                    </BttnwithIcon>
                                    {/* <Button text="Apply Loan" onclick={() => navigate('/customer/apply')} /> */}
                                    <AddtoCartBttn text="Apply Loan" url="/customer/apply"/>
                                    <AddtoCartBttn text="Pay in Cash" />
                                </div>
                                <BttnwithIcon text="Add more units" click={() => document.getElementById('add_units').style.display = "block"}>
                                    <Plus />
                                </BttnwithIcon>
                                <div className="flex mt-5 items-center space-x-4">
                                    <p className="text-gray-900 dark:text-white">Select Color: </p>
                                    <div className="grid grid-cols-10 gap-y-2">
                                        {unitLoad ? "" :
                                            unit.colors.map(color => (
                                                <ColorLabel style={color.color} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                                <p className="mb-6 text-gray-500 dark:text-gray-400">
                                    {unitLoad ? (
                                        <>
                                            <div className='w-full flex justify-between items-start animate-pulse'>
                                                <div className="block">
                                                    <h3 className='h-3 bg-gray-300 dark:bg-gray-500 rounded-full  w-48 mb-4'></h3>
                                                    <p className='h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-32 mb-2.5'></p>
                                                </div>
                                                <span className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-16 "></span>
                                            </div>
                                            <div className=' w-full flex justify-between items-start animate-pulse'>
                                                <div className="block">
                                                    <h3 className='h-3 bg-gray-300 dark:bg-gray-500 rounded-full  w-60 mb-4'></h3>
                                                    <h3 className='h-3 bg-gray-300 dark:bg-gray-500 rounded-full  w-58 mb-4'></h3>
                                                    <p className='h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-40 mb-2.5'></p>
                                                    <p className='h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-50 mb-2.5'></p>
                                                    <p className='h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-50 mb-2.5'></p>
                                                </div>
                                            </div>
                                        </>
                                    ) : `${unit.description}`}
                                </p>
                            </div>

                            <div className="grid gap-4 sm:gap-5 col-span-2 lg:grid-cols-5 grid-cols-2 md:grid-cols-3">
                                <PfpLabel caption="Engine" label={unit.engine} />
                                <PfpLabel caption="Compression Ratio" label={unit.compression} />
                                <PfpLabel caption="Displacement (cc)" label={unit.displacement} />
                                <PfpLabel caption="Horsepower (hp)" label={unit.horsepower} />
                                <PfpLabel caption="Torque (Nm)" label={unit.torque} />
                                <PfpLabel caption="Fuel System" label={unit.fuel} />
                                <PfpLabel caption="Final Drive" label={unit.drive} />
                                <PfpLabel caption="Transmission" label={unit.transmission} />
                                <PfpLabel caption="Cooling System" label={unit.cooling} />
                                <PfpLabel caption="Front Suspension" label={unit.front_suspension} />
                                <PfpLabel caption="Rear Suspension" label={unit.rear_suspension} />
                                <PfpLabel caption="Frame Type" label={unit.frame} />
                                <PfpLabel caption="Front/Rear Travel (mm/in)" label={unit.travel} />
                                <PfpLabel caption="Swingarm Type" label={unit.swingarm} />
                                <PfpLabel caption="Dry Weight" label={unit.dry_weight} />
                                <PfpLabel caption="Wet Weight" label={unit.wet_weight} />
                                <PfpLabel caption="Seat Height (mm/in)" label={unit.seat} />
                                <PfpLabel caption="Wheelbase" label={unit.wheelbase} />
                                <PfpLabel caption="Fuel Tank Capacity" label={unit.fuel_tank} />
                                <PfpLabel caption="Ground Clearance" label={unit.clearance} />
                                <PfpLabel caption="Tire Size" label={unit.tires} />
                                <PfpLabel caption="Wheel Type" label={unit.wheel} />
                                <PfpLabel caption="Brakes" label={unit.brakes} />
                                <PfpLabel caption="ABS" label={unit.abs} />
                                <PfpLabel caption="Traction Control" label={unit.traction} />
                                <PfpLabel caption="TFT Display" label={unit.tft} />
                                <PfpLabel caption="Lighting" label={unit.lighting} />
                                <PfpLabel caption="Riding Modes" label={unit.ride_mode} />
                                <PfpLabel caption="Quickshifter" label={unit.quickshifter} />
                                <PfpLabel caption="Cruise Control" label={unit.cruise} />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <EMICalculator name={unit.name} brand={unit.brand} motorPrice={unit.price} years={unit.tenure} down={unit.downpayment} interest={unit.interest} staff={staff} />
            <div id="add_units" className="overflow-y-auto overflow-x-hidden hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
                <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
                    <div className="relative p-4 bg-white h-fit rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select units</h3>
                            <CloseBttn id="add_units" />
                        </div>
                        <ProductGrid addunit={true}>
                            {addLoad ? (<div>Loading...</div>) : (
                                addUnit.map(motor => (
                                <ProductCard key={motor.id} unit={motor} />
                                ))
                            )}
                        </ProductGrid>
                    </div>
                </div>
            </div>
        </section>
    );
}