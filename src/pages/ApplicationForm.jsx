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
    const routerPaths = useMemo(() => ['/customer/apply', '/customer/apply/employinfo', '/customer/apply/familyinfo', '/customer/apply/requirements'], []);
    const [applicant, setApplicant] = useState({});
    const [address, setAddress] = useState({});
    const [files, setFiles] = useState([]);
    const [recordId, setRecordId] = useState('');
    const submitData = new FormData();

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

        // if (!files[0]) {
        //     alert('Please select a file');
        //     console.log(files[0]);
        //     return;
        // }

        applicant.personal_pres = address.brgy+", "+ address.city+" "+address.province+", "+ address.region+" "+address.country;
        applicant.personal_prev = address.prev_brgy+", "+ address.prev_city+" "+address.prev_province+", "+ address.prev_region+" "+address.prev_country;
        applicant.parent_pres = address.p_brgy+", "+ address.p_city+" "+address.p_province+", "+ address.p_region+" "+address.p_country;
        applicant.parent_prev = address.p_prev_brgy+", "+ address.p_prev_city+" "+address.p_prev_province+", "+ address.p_prev_region+" "+address.p_prev_country;
        applicant.spouse_pres = address.sp_brgy+", "+ address.sp_city+" "+address.sp_province+", "+ address.sp_region+" "+address.sp_country;
        applicant.spouse_prev = address.sp_prev_brgy+", "+ address.sp_prev_city+" "+address.sp_prev_province+", "+address.sp_prev_region+" "+address.sp_prev_country;
        // applicant.valid_id = files[0];
        // applicant.id_pic = files[1];
        // applicant.residence_proof = files[2];
        // applicant.income_proof = files[3];

        // submitData.append('first_name', applicant.first_name);
        // submitData.append('last_name', applicant.last_name);
        // submitData.append('middle_name', applicant.middle_name);
        // submitData.append('gender', applicant.gender);
        // submitData.append('status', applicant.status);
        // submitData.append('educ_attain', applicant.educ_attain);
        // submitData.append('amortization', applicant.amortization);
        // submitData.append('residence', applicant.residence);
        // submitData.append('rent', applicant.rent);
        // submitData.append('sss', applicant.sss);
        // submitData.append('tin', applicant.tin);
        // submitData.append('income', applicant.income);
        // submitData.append('superior', applicant.superior);
        // submitData.append('employment_status', applicant.employment_status);
        // submitData.append('yrs_in_service', applicant.yrs_in_service);
        // submitData.append('rate', applicant.rate);
        // submitData.append('employer', applicant.employer);
        // submitData.append('salary', applicant.salary);
        // submitData.append('business', applicant.business);
        // submitData.append('living_exp', applicant.living_exp);
        // submitData.append('rental_exp', applicant.rental_exp);
        // submitData.append('education_exp', applicant.education_exp);
        // submitData.append('transportation', applicant.transportation);
        // submitData.append('insurance', applicant.insurance);
        // submitData.append('bills', applicant.bills);
        // submitData.append('spouse_name', applicant.spouse_name);
        // submitData.append('b_date', applicant.b_date);
        // submitData.append('spouse_work', applicant.spouse_work);
        // submitData.append('children_num', applicant.children_num);
        // submitData.append('children_dep', applicant.children_dep);
        // submitData.append('school', applicant.school);
        // submitData.append('personal_pres', applicant.personal_pres);
        // submitData.append('personal_prev', applicant.personal_prev);
        // submitData.append('parent_pres', applicant.parent_pres);
        // submitData.append('parent_prev', applicant.parent_prev);
        // submitData.append('spouse_pres', applicant.spouse_pres);
        // submitData.append('spouse_prev', applicant.spouse_prev);
        // submitData.append('employer_address', applicant.employer_address);
        // submitData.append('valid_id', files[0]);
        // submitData.append('id_pic', files[1]);
        // submitData.append('residence_proof', files[2]);
        // submitData.append('income_proof', files[3]);
        console.log(applicant);
        // document.getElementById('saving_data').style.display = "flex"

        try {
            const response = await fetch('http://127.0.0.1:8000/api/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // body: submitData
                body: JSON.stringify(applicant)
            });

            const result = await response.json();
            setRecordId(result.record_id);
            // console.log('Success: ', result);
            if(!response.ok) throw new Error('Update failed');
            document.getElementById('saving_application').style.display = "none"
            document.getElementById('application_submit').style.display = "block";
            setApplicant({});
        } catch(error) {
            console.error('Error: ', error);
            alert('Failed to save data.');
        }
    }

    function fileChange(event) {
        setFiles([...files, event.target.files[0]]);
        console.log(files);
    }

    function addressChange(event) {
        setAddress({
            ...address,
            [event.target.name]: event.target.value
        });
    }

    function handleChange(event) {
        setApplicant({
            ...applicant,
            [event.target.name]: event.target.value
        });
    }

    const outletContext = {handleChange, addressChange, applicant, address, fileChange};

    return (
        <div className="overflow-y-auto overflow-x-hidden sm:flex flex-start fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <Stepper>
                <Step label="1. Personal Information" status="done" />
                <Step label="2. Family/Relative Information" status="current" />
                <Step label="3. Employment, Properties, & Income/Expenses" status="pend" />
                <Step label="4. Upload Requirements" status="pend" />
                <Step label="5. Account Credentials" status="pend" />
            </Stepper>
            <div className="relative p-4 w-full max-w-5xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div className="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">APPLICATION FORM</h3>
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
                            <Button text="Done" bttnType="submit" onclick={() => document.getElementById('saving_application').style.display = 'flex'} />
                        )}
                        </div>
                    </form>
                    <Spinner id="saving_application" text="Submitting application. Please wait..." />
                    <Alert id="application_submit" text={`Your application has been submitted! Your Record Id is ${recordId}`}>
                        <Button text="Got it" type="button" onclick={() => document.getElementById('application_submit').style.display = "none"} />
                    </Alert>
                </div>
            </div>
        </div>
    );
}