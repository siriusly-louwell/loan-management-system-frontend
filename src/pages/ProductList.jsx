import React from "react";
import {useEffect, useRef, useState} from 'react';
import ProductCard from "../components/cards/ProductCard";
import ProductGrid from "../components/cards/ProductGrid";
import FilterPanel from "../components/FilterPanel";
import BasicButton from "../components/buttons/BasicBttn";
import DropdownMenu from "../components/DropdownMenu";
import MenuLink from "../components/links/MenuLink";
import DropdownBttn from "../components/buttons/DropdownBttn";
import Filter from "../assets/icons/Filter";
import Sort from "../assets/icons/Sort";
import CardSkeleton from "../components/loading components/CardSkeleton";
import EmptySearch from "../components/empty states/EmptySearch";
import CreditBanner from "../components/cards/CreditBanner";
import BasicBanner from "../components/cards/BasicBanner";
import SpecialOfferBanner from "../components/cards/SpecialOfferBanner";
import StickyBanner from "../components/cards/StickyBanner";
import { useLocation } from "react-router-dom";

export default function ProductList({url}) {
    const [isFiltOn, setIsFiltOn] = useState(false);
    const [motors, setMotor] = useState([]);
    const [motorLoad, setMotorLoad] = useState(true);
    const filtMenu = useRef(null);
    const [current, setCurrent] = useState(0);
    const location = useLocation();

    const toggleMenu = () => setIsFiltOn((prev) => !prev);

    useEffect(() => {
        const menuClicked = (event) => {
            if (filtMenu.current && !filtMenu.current.contains(event.target)) {
                setIsFiltOn(false);
            }
        };

        document.addEventListener("mousedown", menuClicked);
        return () => document.removeEventListener("mousedown", menuClicked);
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/api/motorcycle')
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % 3);
        }, 5000); // 5000ms = 5 seconds

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % 3);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + 3) % 3);
    };

    return (
        <section className="bg-gray-100 py-8 justify-items-center antialiased dark:bg-gray-800 md:py-12">
            {location.pathname !== '/customer' ? (
                <StickyBanner />
            ) : ''}
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="relative w-full space-y-4 lg:max-w-6xl mb-3 mx-auto rounded-xl overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                        <BasicBanner caption="Rhean Motor Center" context="A trusted motorcycle loan provider that has been helping customers finance their dream motorcycles since year 2000." />
                        <SpecialOfferBanner />
                        <CreditBanner caption="Your Journey Starts Here — Fast, Flexible Motorcycle Loans." context="We make it simple to finance your next motorcycle with plans that fit your lifestyle and budget." />
                    </div>
                
                    <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 opacity-60 text-white p-2 rounded-full">
                        <span className="text-2xl">
                            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6"></path>
                            </svg>
                        </span>
                    </button>
                    <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 opacity-60 text-white p-2 rounded-full" >
                        <span className="text-2xl">
                            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </span>
                    </button>
                
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <button className={`w-2 h-2 rounded-full ${current === 0 ? 'bg-rose-500' : 'bg-gray-300'}`} onClick={() => setCurrent(0)} />
                        <button className={`w-2 h-2 rounded-full ${current === 1 ? 'bg-rose-500' : 'bg-gray-300'}`} onClick={() => setCurrent(1)} />
                        <button className={`w-2 h-2 rounded-full ${current === 2 ? 'bg-rose-500' : 'bg-gray-300'}`} onClick={() => setCurrent(2)} />
                    </div>
                </div>
                <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                    <div>
                        {/* <NavPath /> */}
                        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Available Units</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <DropdownBttn text="Filter">
                            <Filter />
                        </DropdownBttn>
                        <DropdownBttn toggleMenu={toggleMenu} text="Sort">
                            <Sort />
                        </DropdownBttn>
                    </div>
                </div>
                <DropdownMenu ref={filtMenu} className={isFiltOn ? "block" : "hidden"}>
                    <MenuLink pathName="The most popular" />
                    <MenuLink pathName="Newest" />
                    <MenuLink pathName="Increasing price" />
                    <MenuLink pathName="Decreasing price" />
                    <MenuLink pathName="No. reviews" />
                    <MenuLink pathName="Discount %" />
                </DropdownMenu>
                
                <ProductGrid>
                    {motorLoad ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : (
                        motors.map(motor => (
                            <ProductCard key={motor.id} unit={motor} url={url}/>
                        ))
                    )}
                </ProductGrid>
                {motors.length === 0 && !motorLoad ? (
                    <EmptySearch label="No results found" context="Try changing the filter or go to a different category" />
                ) : ""}
                <div className="w-full text-center">
                    <BasicButton text="Show more" />
                </div>
            </div>
            <FilterPanel />
        </section>
    );
}