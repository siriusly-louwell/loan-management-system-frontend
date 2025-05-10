import React from "react";
import {useEffect, useRef, useState} from 'react';
import ProductCard from "../components/cards/ProductCard";
import ProductGrid from "../components/cards/ProductGrid";
import FilterPanel from "../components/FilterPanel";
import BasicButton from "../components/buttons/BasicBttn";
import DropdownMenu from "../components/DropdownMenu";
import MenuLink from "../components/links/MenuLink";
import DropdownBttn from "../components/buttons/DropdownBttn";
import NavPath from "../components/NavPath";
import Filter from "../assets/icons/Filter";
import Sort from "../assets/icons/Sort";

export default function ProductList() {
    const [isFiltOn, setIsFiltOn] = useState(false);
    const filtMenu = useRef(null);

    // Toggle dropdown visibility
    const toggleMenu = () => setIsFiltOn((prev) => !prev);

    // Close dropdown if clicked outside
    useEffect(() => {
        const menuClicked = (event) => {
            if (filtMenu.current && !filtMenu.current.contains(event.target)) {
                setIsFiltOn(false);
            }
        };

        document.addEventListener("mousedown", menuClicked);
        return () => document.removeEventListener("mousedown", menuClicked);
    }, []);

    return (
        <section class="bg-gray-50 py-8 antialiased dark:bg-gray-800 md:py-12">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                    <div>
                        <NavPath />
                        <h2 class="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Electronics</h2>
                    </div>
                    <div class="flex items-center space-x-4">
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
                    <ProductCard
                        prodName='Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max'
                        img="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                    />
                    <ProductCard
                        prodName='Apple iPhone 15 Pro Max, 256GB, Blue Titanium'
                        img="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg"
                    />
                    <ProductCard
                        prodName='iPad Pro 13-Inch (M4): XDR Display, 512GB'
                        img="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg"
                    />
                    <ProductCard
                        prodName='PlayStation®5 Console – 1TB, PRO Controller'
                        img="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
                    />
                    <ProductCard
                        prodName='Microsoft Xbox Series X 1TB Gaming Console'
                        img="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-dark.svg"
                    />
                    <ProductCard
                        prodName='Apple MacBook PRO Laptop with M2 chip'
                        img="https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-dark.svg"
                    />
                    <ProductCard
                        prodName='MApple Watch SE [GPS 40mm], Smartwatch'
                        img="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                    />
                    <ProductCard
                        prodName='Microsoft Surface Pro, Copilot+ PC, 13 Inch'
                        img="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-keyboard-dark.svg"
                    />
                </ProductGrid>
                <div class="w-full text-center">
                    <BasicButton text="Show more" />
                </div>
            </div>
            <FilterPanel />
        </section>
    );
}