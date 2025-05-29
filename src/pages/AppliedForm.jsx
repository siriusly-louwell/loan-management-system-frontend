import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import Button from "../components/buttons/Button";

export default function AppliedForm({url}) {
    const navigate = useNavigate();
    const {state} = useLocation();
    const location = useLocation();
    const id = state?.id;
    const [currentIndex, setCurrentIndex] = useState(0);
    const routerPaths = useMemo(() => [`${url}/apply`, `${url}/apply/employinfo`, `${url}/apply/familyinfo`, `${url}/apply/requirements`], []);
    const [applicant, setApplicant] = useState({view: true});

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/application/1')
        .then(response => response.json())
        .then(data => {
            setApplicant({...applicant, ...data});
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });

    }, []);

    useEffect(() => {
        const index = routerPaths.indexOf(location.pathname);
        if(index >= 0 && index !== currentIndex)setCurrentIndex(index);
    }, [location, routerPaths, currentIndex]);

    function handleNext () {
        const nextIndex = currentIndex + 1;
        if(nextIndex < routerPaths.length)navigate(routerPaths[nextIndex]);
    }

    function handlePrev() {
        const prevIndex = currentIndex - 1;
        if(prevIndex >= 0)navigate(routerPaths[prevIndex]);
    }

    const address = applicant.address;
    // const outletContext = {applicant, address};

    return (
        <div className="overflow-y-auto overflow-x-hidden sm:flex justify-center fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-5xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div className="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">APPLICATION FORM</h3>
                    </div>
                    <form>
                        {/* <Outlet context={{applicant, address}} /> */}
                        {address ? (<Outlet context={{applicant, address}} />) : ''}

                        <div className="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
                        {currentIndex > 0 && (
                            <Button text="Back" bttnType="button" onclick={handlePrev} />
                        )}
                        {currentIndex < routerPaths.length - 1 ? (
                            <Button text="Next" bttnType="button" onclick={handleNext} />
                        ) : ''}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}