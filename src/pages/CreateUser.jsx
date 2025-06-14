import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import Button from "../components/buttons/Button";
import CloseBttn from "../components/buttons/CloseBttn";
import Spinner from "../components/loading components/Spinner";
import FileInput from "../components/inputs/FileInput";
import Alert from "../components/Alert";

export default function CreateUser() {
    const location = useLocation();
    const [pfp, setPfp] = useState({});
    const submitData = new FormData();
    const [alert, setAlert] = useState({});
    const [user, setUser] = useState({
        middle_name: '',
        contact: '',
        role: location.pathname === '/admin/accounts/cis' ? 'ci' : 'staff',
        status: 'active',
        password: 'password'

    });

    async function handleSubmit(event) {
        event.preventDefault();

        for(let key in user) {
            submitData.append(`${key}`, user[key]);
        }
        submitData.append('pfp', pfp);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/account', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Accept': 'application/json'
                // },
                body: submitData
                // body: JSON.stringify(user)
            });

            const result = await response.json();
            console.log('Success: ', result);
            if(!response.ok) throw new Error('Update failed');
            setAlert({
                text: "User added succcessfully!",
                icon: "done"
            });
            resetInput();
            document.getElementById('alertUser').style.display = "block";
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Failed to save data",
                icon: "warn"
            });
            document.getElementById('saving_data').style.display = "none";
            document.getElementById('alertUser').style.display = "block";
        }

    }

    function resetInput() {
        setUser({
            middle_name: '',
            contact: '',
            role: location.pathname === '/admin/accounts/cis' ? 'ci' : 'staff',
            status: 'active',
            password: 'password'
        });
        setPfp({});
        document.getElementById('saving_data').style.display = "none";
    }

    function pfpChange(event)  {
        setPfp(event.target.files[0]);
    }

    function handleChange(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div id="createUser" className="overflow-y-auto hidden overflow-x-hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add User</h3>
                        <CloseBttn id="createUser" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-3">
                            <FormInput label="First name" type="text" value={user.first_name || ''} onchange={handleChange} name="first_name" id="name" placeholder="Type first name" require={true} />
                            <FormInput label="Middle name" type="text" name="middle_name" id="mname" value={user.middle_name || ''} onchange={handleChange} placeholder="Type middle name" />
                            <FormInput label="Last name" type="text" name="last_name" id="lname" value={user.last_name || ''} onchange={handleChange} placeholder="Type last name" require={true} />
                            <FormInput label="Email Address" type="text" name="email" id="email" value={user.email || ''} onchange={handleChange} placeholder="john@gmail.com" require={true} />
                            <FormInput label="Contact number" type="number" name="contact" id="number" value={user.contact || ''} onchange={handleChange} placeholder="Phone number here" />
                            <FormSelect name="gender" id="gender" label="Gender" require={true}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </FormSelect>
                        </div>
                        <FileInput label="Upload Profile picture:" type="img" name="pfp" change={pfpChange} require={true} />
                        <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Button text="Add user" type="submit" onclick={() => document.getElementById('saving_data').style.display = "flex"} />
                        </div>
                    </form>
                    <Spinner id="saving_data" text="Saving data..." />
                    <Alert id="alertUser" text={alert.text} icon={alert.icon}>
                        <Button text="Ok" onclick={() => document.getElementById('alertUser').style.display = 'none'} />
                    </Alert>
                </div>
            </div>
        </div>
    );
}