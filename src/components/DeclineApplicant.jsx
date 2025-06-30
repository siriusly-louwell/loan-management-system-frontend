import React, { useState } from "react";
import FormSelect from "./inputs/FormSelect";
import Button from "./buttons/Button";
import CloseBttn from "./buttons/CloseBttn";
import Alert from "./Alert";
import FormTextarea from "./inputs/FormTextarea";
import Spinner from "./loading components/Spinner";
import FormCheck from "./checkboxes/FormCheck";
import { useNavigate } from "react-router-dom";

export default function DeclineApplicant({id, record, name}) {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({});
    const [decline, setDecline] = useState({apply_status: 'denied'});


    function handleChange(event) {
        setDecline({
            ...decline,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        document.getElementById('decline_app').style.display = "flex";

        try {
            const response = await fetch('http://127.0.0.1:8000/api/application/'+id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(decline)
            });

            const result = await response.json();
            console.log('Success: ', result);
            if(!response.ok) throw new Error('Update failed');
            setAlert({
                text: "Applicant has been denied!",
                icon: "done"
            });
            document.getElementById('dec-app').style.display = 'block';
            document.getElementById('decline_app').style.display = "none";
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Unexpected Error!",
                icon: "warn"
            });
            document.getElementById('dec-app').style.display = 'block';
            document.getElementById('decline_app').style.display = "none";
        }
    }

    return (
        <div id="declineApp" className="overflow-y-auto hidden overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-10 sm:py-8 border border-gray-500">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Declination of Application</h3>
                        <CloseBttn id="declineApp" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5 space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">{record} - {name}</h3>
                            <FormSelect name="type" id="ci" label="Reason for Declination" value={decline.type} onchange={handleChange}>
                                <option>Icorrect inputted values</option>
                                <option>Wrong requirements uploaded</option>
                                <option>Unmet standards</option>
                            </FormSelect>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Allow Resubmit?</label>
                                <div className="space-y-4 sm:flex sm:space-y-0">
                                    <FormCheck type="radio" id="inline-check" label="Yes" value="yes" name="resubmit" change={handleChange} />
                                    <FormCheck type="radio" id="inline-2-check" label="No" value="no" name="resubmit" change={handleChange} />
                                </div>
                            </div>
                            <FormTextarea label="Add a message to the applicant (optional):" placeholder="Write your message here..." />
                        </div>
                        <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Button text="Finish Assignment" type="submit" />
                        </div>
                    </form>
                    <Spinner id="decline_app" />
                    <Alert id="dec-app" text={alert.text} icon={alert.icon}>
                        {alert.icon === "done" ? (
                            <Button text="Ok" type="button" onclick={() => navigate('/admin/accounts')} />
                        ) : (
                            <Button text="Ok" type="button" onclick={() => document.getElementById('dec-app').style.display = "none"} />
                        )}
                    </Alert>
                </div>
            </div>
        </div>
    );
}