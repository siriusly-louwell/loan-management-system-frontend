import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddtoCartBttn from "../components/buttons/AddtoCartBttn";
import StarRating from "../components/StarRating";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import NavPath from "../components/NavPath";
import EMICalculator from './EMICalculator';
import ColorLabel from '../components/ColorLabel';
import SmallLabel from '../components/texts/SmallLabel';
import Button from '../components/buttons/Button';

export default function ProductInfo() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const id = state?.id;
    const [unit, setUnit] = useState({});
    const [unitLoad, setUnitLoad] = useState(true);
    const [current, setCurrent] = useState(0);
    const images = [
        "http://127.0.0.1:8000/storage/" + unit.file_path,
        'https://via.placeholder.com/800x400/7FB3FF/333333?text=Slide+2',
        'https://via.placeholder.com/800x400/7FFF7F/333333?text=Slide+3',
    ];
    const totalSlides = images.length;

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
        }, []);

    return (
        <section className="py-8 bg-gray-100 md:py-16 dark:bg-gray-800 antialiased">
            {/* <NavPath /> */}
            <div className="max-w-screen-xl mt-10 px-4 pb-6 mx-auto 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-15 xl:gap-16">
                    {unitLoad ? (<div>Loading...</div>) : (
                        <>
                            <div className="relative w-full lg:max-w-3xl mx-auto overflow-hidden rounded-xl">
                                <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                                    {images.map((src, index) => (
                                    <img key={index} src={src} alt={`Slide ${index + 1}`} className="w-full flex-shrink-0 bg-blue-800"/>
                                    ))}
                                </div>

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

                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {images.map((_, index) => (
                                        <button key={index} className={`w-2 h-2 rounded-full ${index === current ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => setCurrent(index)} />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8 lg:mt-0">
                                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">{unit.name} ({unit.brand})</h1>
                                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                    <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">₱{unit.price}</p>

                                    {/* <StarRating rating="(5.0)" rates="345 Reviews" /> */}
                                    <div className="flex space-x-2">
                                        <div className='grid grid-cols-10 gap-y-2'>
                                            {unit.colors.map(color => (
                                                <ColorLabel style={color.color} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className='grid sm:grid-cols-2'>
                                    <SmallLabel label="Annual Interest" text={unit.interest+"%"} />
                                    <SmallLabel label="Rebate" text={"₱"+unit.rebate} />
                                    <SmallLabel label="Loan Tenure" text={unit.tenure+" years"} />
                                    <SmallLabel label="Stock" text={unit.quantity+" units"} />
                                </div>

                                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                    <BttnwithIcon text="Add to favorites">
                                        <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                        </svg>
                                    </BttnwithIcon>
                                     {/* <Button text="Apply Loan" onclick={() => navigate('/customer/apply')} /> */}
                                    <AddtoCartBttn text="Apply Loan" url="/customer/apply"/>
                                </div>
                                <div className="flex mt-5 items-center space-x-4">
                                    <p className="text-gray-900 dark:text-white">Select Color: </p>
                                    <div className="grid grid-cols-10 gap-y-2">
                                        {unit.colors.map(color => (
                                                <ColorLabel style={color.color} />
                                            ))}
                                    </div>
                                </div>
                                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                                <p className="mb-6 text-gray-500 dark:text-gray-400">{unit.description}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <EMICalculator name={unit.name} brand={unit.brand} motorPrice={unit.price} years={unit.tenure} interest={unit.interest} />
        </section>
    );
}