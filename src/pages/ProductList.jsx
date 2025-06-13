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

export default function ProductList({url}) {
    const [isFiltOn, setIsFiltOn] = useState(false);
    const [motors, setMotor] = useState([]);
    const [motorLoad, setMotorLoad] = useState(true);
    const filtMenu = useRef(null);

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

    return (
        <section className="bg-gray-100 py-8 antialiased dark:bg-gray-800 md:py-12">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
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