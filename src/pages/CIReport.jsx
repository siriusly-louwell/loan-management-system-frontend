import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from "../components/buttons/Button";
import FormInput from "../components/inputs/FormInput";
import BttnwithIcon from '../components/buttons/BttnwithIcon';
import Plus from "../assets/icons/Plus";
import FormTHead from '../components/tables/FormTHead';
import FormTH from '../components/tables/FormTH';
import FormTBody from '../components/tables/FormTBody';
import FormTD from '../components/tables/FormTD';
import FormTextarea from '../components/inputs/FormTextarea';
import FormCheck from '../components/checkboxes/FormCheck';
import FileInput from '../components/inputs/FileInput';
import PfpLabel from '../components/PfpLabel';
import Spinner from '../components/loading components/Spinner';
import Alert from '../components/Alert';

export default function CIReport() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [report, setReport] = useState({});
    const [appReport, setAppReport] = useState({});
    const [sketch, setSketch] = useState({});
    const [alert, setAlert] = useState({});
    const submitData = new FormData();

    useEffect(() => {
        fetch(`http://localhost:8000/api/application/${state.id}?by=id`)
        .then(response => response.json())
        .then(data => {
            setAppReport(data);
            setReport({...report, application_id: data.id});
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        })
    }, [state.id]);

    async function handleSubmit(event) {
        event.preventDefault();
        document.getElementById('report_spin').style.display = 'flex';

        if (!sketch && !sketch instanceof File) {
            setAlert({
                text: "Please upload a sketch image.",
                icon: "warn"
            });
            document.getElementById('ciReport').style.display = "block";
            document.getElementById('report_spin').style.display = 'none';
            return;
        }

        for(let key in report) {
            submitData.append(`${key}`, report[key]);
        }
        submitData.append('sketch', sketch);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/report', {
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
                text: `Report for ${appReport.first_name} ${appReport.last_name} has been submitted!`,
                icon: "done",
                id: result.record_id,
                contact: result.contact
            });
            document.getElementById('report_spin').style.display = "none"
            document.getElementById('ciReport').style.display = "block";
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Failed to submit report",
                icon: "warn"
            });
            document.getElementById('ciReport').style.display = "block";
            document.getElementById('report_spin').style.display = "none";
        }
    }

    function handleChange(event) {
        setReport({
            ...report,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div className="overflow-y-auto overflow-x-hidden justify-items-center items-center fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-5xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div className="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">CREDIT INVESTIGATION REPORT</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                            <PfpLabel caption="Applicant Name" label={`${appReport.first_name} ${appReport.last_name}`} />
                            <PfpLabel caption="Date of Birth" label={`${appReport.birth_day}`} />
                            <PfpLabel caption="Place of Birth" label={`${appReport.birth_place}`} />
                            {/* <FormInput label="Date of Birth" type="date" name="birth_day" id="bday" value={report.birth_day} onchange={handleChange} require={true} />
                            <FormInput label="Place of Birth" type="text" name="birth_place" id="bplace" value={report.birth_place} onchange={handleChange} placeholder="Birth place address" require={true} /> */}
                        </div>
                                
                        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Father:</h3>
                        <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2">
                            <PfpLabel caption="First Name" label={`${appReport.father_first}`} />
                            <PfpLabel caption="Middle Name" label={`${appReport.father_middle}`} />
                            <PfpLabel caption="Last Name" label={`${appReport.father_last}`} />
                            {/* <FormInput label="First name" type="text" name="father_first" id="ff-name" value={report.father_first} onchange={handleChange} placeholder="Type first name here" require={true} />
                            <FormInput label="Middle name" type="text" name="father_middle" id="fm-name" value={report.father_middle} onchange={handleChange} placeholder="Type middle name here" require={true} />
                            <FormInput label="Last name" type="text" name="father_last" id="fl-name" value={report.father_last} onchange={handleChange} placeholder="Type last name here" require={true} /> */}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Mother:</h3>
                        <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                            <PfpLabel caption="First Name" label={`${appReport.mother_first}`} />
                            <PfpLabel caption="Middle Name" label={`${appReport.mother_middle}`} />
                            <PfpLabel caption="Last Name" label={`${appReport.mother_last}`} />
                            {/* <FormInput label="First name" type="text" name="mother_first" id="mf-name" value={report.mother_first} onchange={handleChange} placeholder="Type first name here" require={true} />
                            <FormInput label="Middle name" type="text" name="mother_middle" id="mm-name" value={report.mother_middle} onchange={handleChange} placeholder="Type middle name here" require={true} />
                            <FormInput label="Last name" type="text" name="mother_last" id="ml-name" value={report.mother_last} onchange={handleChange} placeholder="Type last name here" require={true} /> */}
                        </div>
                                            
                        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Dependants:</h3>
                        <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                            <table className="w-full">
                                <FormTHead>
                                    <FormTH label="Name" />
                                    <FormTH label="Relationship" />
                                    <FormTH label="Age" />
                                    <FormTH label="School" />
                                </FormTHead>
                                <FormTBody>
                                    <FormTD placeholder="Full name here" />
                                    <FormTD placeholder="Address here" />
                                    <FormTD placeholder="Cellphone number" />
                                    <FormTD placeholder="School name" />
                                </FormTBody>
                            </table>
                            <div className="grid pt-4 sm:cols-span-1">
                                <BttnwithIcon text="Add row">
                                    <Plus />
                                </BttnwithIcon>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Nearest Relatives:</h3>
                        <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                            <table className="w-full">
                                <FormTHead>
                                    <FormTH label="Name" />
                                    <FormTH label="Relationship" />
                                    <FormTH label="Age" />
                                    <FormTH label="School" />
                                </FormTHead>
                                <FormTBody>
                                    <FormTD placeholder="Full name here" />
                                    <FormTD placeholder="Address here" />
                                    <FormTD placeholder="Cellphone number" />
                                    <FormTD placeholder="School name" />
                                </FormTBody>
                            </table>
                            <div className="grid pt-4 sm:cols-span-1">
                                <BttnwithIcon text="Add row">
                                    <Plus />
                                </BttnwithIcon>
                            </div>
                        </div>

                        <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                            <FormTextarea name="comm_standing" id="comm_standing" label="Community Standing" value={appReport.comm_standing} onchange={handleChange} placeholder="Write commuity standing here" require={true} disable={true} />
                            <FormTextarea name="home_description" id="home_description" label="Brief description of place of residence and home" value={appReport.home_description} onchange={handleChange} placeholder="Write residence description here" require={true} disable={true} />
                            {/* <FormTextarea name="comm_standing" id="comm_standing" label="Community Standing" value={report.comm_standing} onchange={handleChange} placeholder="Write commuity standing here" require={true} />
                            <FormTextarea name="home_description" id="home_description" label="Brief description of place of residence and home" value={report.home_description} onchange={handleChange} placeholder="Write residence description here" require={true} /> */}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Unit Applied:</h3>
                        <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                            <table className="w-full">
                                <FormTHead>
                                    <FormTH label="Model" />
                                    <FormTH label="Downpayment" />
                                    <FormTH label="Terms Conditions" />
                                </FormTHead>
                                <FormTBody>
                                    <FormTD placeholder="Model name" />
                                    <FormTD placeholder="Downpayment here" />
                                    <FormTD placeholder="Terms & Conditions" />
                                </FormTBody>
                            </table>
                            <div className="grid pt-4 sm:cols-span-1">
                                <BttnwithIcon text="Add row">
                                    <Plus />
                                </BttnwithIcon>
                            </div>
                        </div>
                                
                        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">RECOMMENDATION:</h3>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject is recommended for</label>
                                <div className="space-y-4 sm:flex sm:space-y-0">
                                    <FormCheck name="recommendation" type="radio" id="recomm-1" label="Approval" value="approval" check={report.recommendation === 'approval'} change={handleChange} require={true} />
                                    <FormCheck name="recommendation" type="radio" id="recomm-2" label="Disapproval" value="disapproval" check={report.recommendation === 'disapproval'} change={handleChange} />
                                </div>
                            </div>
                            <FormTextarea name="remarks" id="remarks" label="Other remarks" placeholder="Write remarks here" />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Unit verification:</h3>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                            <FormInput label="First Unit applied" type="text" name="first_unit" id="name" value={report.first_unit} onchange={handleChange} placeholder="Type unit name here" />
                            <FileInput label="Sketch Image" name="sketch" type="img" change={(e) => setSketch(e.target.files[0])} require={true} />
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Delivered?</label>
                                <div className="space-y-4 sm:flex sm:space-y-0">
                                    <FormCheck name="delivered" type="radio" id="deliver-1" label="Yes" value="yes" check={report.delivered === 'yes'} change={handleChange} />
                                    <FormCheck name="delivered" type="radio" id="deliver-2" label="No" value="no" check={report.delivered === 'no'} change={handleChange} />
                                </div>
                            </div>
                            <FormInput label="Outlet" type="text" name="outlet" id="outlet" value={report.outlet} onchange={handleChange} placeholder="Type outlet here" />
                        </div>
        
                        <div className="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
                            <Button bttnType="submit" text="Done" />
                        </div>
                    </form>
                </div>
                <Alert id="ciReport" text={alert.text} icon={alert.icon}>
                    <Button text="Ok" onclick={() => navigate('/ci/evaluation')} />
                </Alert>
            </div>
            <Spinner id="report_spin" text="Submitting report..." />
        </div>
    );
}