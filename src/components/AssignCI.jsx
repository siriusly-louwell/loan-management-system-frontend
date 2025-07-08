import React, { useState, useEffect } from "react";
import FormInput from "./inputs/FormInput";
import FormSelect from "./inputs/FormSelect";
import Button from "./buttons/Button";
import CloseBttn from "./buttons/CloseBttn";
import Alert from "./Alert";
import FormTextarea from "./inputs/FormTextarea";
import Spinner from "./loading components/Spinner";
import { useNavigate } from "react-router-dom";

export default function AssignCI({id, record, name}) {
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    const [appCI, setAppCI] = useState([]);
    const [alert, setAlert] = useState({});
    const [applicant, setApplicant] = useState({apply_status: 'accepted'});
    const [ciLoad, setCiLoad] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/account')
        .then(response => response.json())
        .then(data => {
            setAppCI(data);
            setCiLoad(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        })
    }, []);

    function handleChange(event) {
        setApplicant({
            ...applicant,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        document.getElementById('add_ci').style.display = "flex";

        try {
            const response = await fetch('http://127.0.0.1:8000/api/application/'+id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(applicant)
            });

            const result = await response.json();
            console.log('Success: ', result);
            if(!response.ok) throw new Error('Update failed');
            setAlert({
                text: "Applicant has been accepted!",
                icon: "done"
            });
            document.getElementById('appli-loan').style.display = 'block';
            document.getElementById('add_ci').style.display = "none";
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Unexpected Error!",
                icon: "warn"
            });
            document.getElementById('appli-loan').style.display = 'block';
            document.getElementById('add_ci').style.display = "none";
        }
    }

    return (
        <div id="addCI" className="overflow-y-auto hidden overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-10 sm:py-8 border border-gray-500">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Assign Credit Investigator</h3>
                        <CloseBttn id="addCI" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5 space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">{record} - {name}</h3>
                            <FormSelect name="ci_id" id="ci" label="Credit Investigator" value={applicant.ci_id} onchange={handleChange} >
                                {ciLoad ? "" : appCI.map(acc => {
                                    if(acc.role === 'ci')return (<option value={acc.id}>{acc.first_name} {acc.last_name}</option>);
                                })}
                            </FormSelect>
                            <p className="text-md font-medium text-gray-900 dark:text-white">Set meeting schedule</p>
                            <div className="grid grid-cols-2 gap-2">
                                <FormInput label="From" type="date" value={applicant.from_sched} onchange={handleChange} name="from_sched" id="from_sched" min={today} />
                                <FormInput label="To" type="date" value={applicant.to_sched} onchange={handleChange} name="to_sched" id="to_sched" min={applicant.from_sched} />
                            </div>
                            <FormTextarea label="Add a message to the applicant (optional):" placeholder="Write your message here..." />
                        </div>
                        <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Button text="Finish Assignment" type="submit" />
                        </div>
                    </form>
                    <Spinner id="add_ci" />
                    <Alert id="appli-loan" text={alert.text} icon={alert.icon}>
                        {alert.icon === "done" ? (
                            <Button text="Ok" type="button" onclick={() => navigate('/staff/loans')} />
                        ) : (
                            <Button text="Ok" type="button" onclick={() => document.getElementById('appli-loan').style.display = "none"} />
                        )}
                    </Alert>
                </div>
            </div>
        </div>
    );
}