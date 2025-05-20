import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import Button from "../components/buttons/Button";
import Stepper from '../components/Stepper';
import Step from '../components/Step';
import Spinner from '../components/loading components/Spinner';

export default function ApplicationForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const routerPaths = useMemo(() => ['/applicant/apply', '/applicant/apply/employinfo', '/applicant/apply/familyinfo', '/applicant/apply/requirements'], []);
    const [applicant, setApplicant] = useState({});

    useEffect(() => {
        const index = routerPaths.indexOf(location.pathname);
        if(index >= 0 && index !== currentIndex)setCurrentIndex(index);
    }, [location, routerPaths, currentIndex]);

    function handleNext () {
        const nextIndex = currentIndex + 1;
        if(nextIndex < routerPaths.length)navigate(routerPaths[nextIndex]);
        console.log(applicant);
    }

    function handlePrev() {
        const prevIndex = currentIndex - 1;
        if(prevIndex >= 0)navigate(routerPaths[prevIndex]);
    }


    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(applicant)
            });

            const result = await response.json();
            resetInput();
            console.log('Success: ', result);
            if(!response.ok) throw new Error('Update failed');
            alert('Data saved successfully!');
        } catch(error) {
            console.error('Error: ', error);
            alert('Failed to save data.');
        }
    }

    function resetInput() {
        setApplicant({});
        document.getElementById('saving_data').style.display = "none";
    }

    function handleChange(event) {
        setApplicant({
            ...applicant,
            [event.target.name]: event.target.value
        });
    }

    const outletContext = {handleChange, applicant};

    return (
        <div class="overflow-y-auto overflow-x-hidden sm:flex flex-start fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <Stepper>
                <Step label="1. Personal Information" status="done" />
                <Step label="2. Family/Relative Information" status="current" />
                <Step label="3. Employment, Properties, & Income/Expenses" status="pend" />
                <Step label="4. Upload Requirements" status="pend" />
                <Step label="5. Account Credentials" status="pend" />
            </Stepper>
            <div class="relative p-4 w-full max-w-5xl h-full md:h-auto">
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div class="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">REGISTRATION FORM</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Outlet context={outletContext} />

                        <div class="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
                        {currentIndex > 0 && (
                            <Button text="Back" bttnType="button" onclick={handlePrev} />
                        )}
                        {currentIndex < routerPaths.length - 1 ? (
                            <Button text="Next" bttnType="button" onclick={handleNext} />
                        ) : (
                            <Button text="Done" bttnType="submit" />
                        )}
                        </div>
                    </form>
                    <Spinner id="saving_data" text="Submitting application. Please wait..." />
                </div>
            </div>
        </div>
    );
}