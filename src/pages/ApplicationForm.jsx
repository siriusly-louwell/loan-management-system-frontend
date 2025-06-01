import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import Button from "../components/buttons/Button";
import Stepper from '../components/Stepper';
import Step from '../components/Step';
import Alert from '../components/Alert';
import Spinner from '../components/loading components/Spinner';

export default function ApplicationForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [applicant, setApplicant] = useState({});
    const [address, setAddress] = useState({});
    const [files, setFiles] = useState({});
    const [alert, setAlert] = useState({});
    const submitData = new FormData();
    const routerPaths = useMemo(() => [
        '/customer/apply',
        '/customer/apply/employinfo',
        '/customer/apply/familyinfo',
        '/customer/apply/requirements',
        '/customer/apply/comakerform'
    ], []);

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


    async function handleSubmit(event) {
        event.preventDefault();
        document.getElementById('saving_application').style.display = 'flex';

        if (files.length == 0) {
            setAlert({
                text: "Please upload a file in the requirements section.",
                icon: "warn"
            });
            document.getElementById('application_submit').style.display = "block";
            document.getElementById('saving_application').style.display = 'none';
            return;
        }

        applicant.personal_pres = address.brgy+", "+ address.city+" "+address.province+", "+ address.region+" "+address.country;
        applicant.personal_prev = address.prev_brgy+", "+ address.prev_city+" "+address.prev_province+", "+ address.prev_region+" "+address.prev_country;
        applicant.parent_pres = address.p_brgy+", "+ address.p_city+" "+address.p_province+", "+ address.p_region+" "+address.p_country;
        applicant.parent_prev = address.p_prev_brgy+", "+ address.p_prev_city+" "+address.p_prev_province+", "+ address.p_prev_region+" "+address.p_prev_country;
        applicant.spouse_pres = address.sp_brgy+", "+ address.sp_city+" "+address.sp_province+", "+ address.sp_region+" "+address.sp_country;
        applicant.spouse_prev = address.sp_prev_brgy+", "+ address.sp_prev_city+" "+address.sp_prev_province+", "+address.sp_prev_region+" "+address.sp_prev_country;

        for(let key in applicant) {
            submitData.append(`${key}`, applicant[key]);
        }

        Object.entries(files).forEach(([key, file]) => {
            submitData.append(key, file);
        });

        try {
            const response = await fetch('http://127.0.0.1:8000/api/application', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Accept': 'application/json'
                // },
                body: submitData
                // body: JSON.stringify(applicant)
            });

            const result = await response.json();
            if(!response.ok) throw new Error('Update failed');
            setAlert({
                text: `Your application has been submitted! Your Record ID is ${result.record_id}`,
                icon: "done"
            });
            document.getElementById('saving_application').style.display = "none"
            document.getElementById('application_submit').style.display = "block";
            setApplicant({});
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Failed to save data",
                icon: "warn"
            });
            document.getElementById('application_submit').style.display = "block";
            document.getElementById('saving_application').style.display = "none";
        }
    }

    function fileChange(event) {
        setFiles({
            ...files,
            [event.target.name]: event.target.files[0]
        });
    }

    function addressChange(event) {
        setAddress({
            ...address,
            [event.target.name]: event.target.value
        });
    }

    function copyAddress(type) {
        switch (type) {
            case "personal":
                setAddress({
                    ...address,
                    prev_country: address.country,
                    prev_region: address.region,
                    prev_province: address.province,
                    prev_city: address.city,
                    prev_brgy: address.brgy
                });
                break;
            case "parent":
                setAddress({
                    ...address,
                    p_prev_country: address.p_country,
                    p_prev_region: address.p_region,
                    p_prev_province: address.p_province,
                    p_prev_city: address.p_city,
                    p_prev_brgy: address.p_brgy
                });
                break;
            case "spouse":
                setAddress({
                    ...address,
                    sp_prev_country: address.sp_country,
                    sp_prev_region: address.sp_region,
                    sp_prev_province: address.sp_province,
                    sp_prev_city: address.sp_city,
                    sp_prev_brgy: address.sp_brgy
                });
                break;
        }
    }

    function handleChange(event) {
        setApplicant({
            ...applicant,
            [event.target.name]: event.target.value
        });
    }

    const outletContext = {handleChange, addressChange, applicant, address, copyAddress, fileChange};

    return (
        <div className="overflow-y-auto overflow-x-hidden sm:flex flex-start fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <Stepper>
                <Step label="1. Personal Information" status="done" />
                <Step label="2. Family/Relative Information" status="current" />
                <Step label="3. Employment, Properties, & Income/Expenses" status="pend" />
                <Step label="4. Upload Requirements" status="pend" />
                <Step label="5. Comaker Form" status="pend" />
            </Stepper>
            <div className="relative p-4 w-full max-w-5xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div className="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {location.pathname == "/customer/apply/comakerform" ? "COMAKER FORM" : "APPLICATION FORM"}
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Outlet context={outletContext} />

                        <div className="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
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
                    <Spinner id="saving_application" text="Submitting application. Please wait..." />
                    <Alert id="application_submit" text={alert.text} icon={alert.icon}>
                        <Button text="Ok" type="button" onclick={() => document.getElementById('application_submit').style.display = "none"} />
                    </Alert>
                </div>
            </div>
        </div>
    );
}