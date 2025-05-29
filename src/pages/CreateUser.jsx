import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import Button from "../components/buttons/Button";
import CustomBttn from "../components/buttons/CustomBttn";
import Ex from "../assets/icons/Ex";
import CloseBttn from "../components/buttons/CloseBttn";
import Spinner from "../components/loading components/Spinner";

export default function CreateUser() {
    const location = useLocation();
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: location.pathname === '/admin/accounts/cis' ? 'ci' : 'staff',
        status: 'active',
        password: 'password'

    });

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(user)
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
        setUser({
            name: '',
            email: '',
            role: 'admin',
            status: 'active',
            password: 'password'
        });
        document.getElementById('saving_data').style.display = "none";
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
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <FormInput label="Full Name" type="text" value={user.name} onchange={handleChange} name="name" id="name" placeholder="Type full name" />
                            <FormInput label="email" type="text" name="email" id="email" value={user.email} onchange={handleChange} placeholder="john@gmail.com" />
                            {/* <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                                <FormSelect name="role" id="color" label="Role" value={user.role} onchange={handleChange}>
                                    <option value="red">Credit Investigator</option>
                                    <option value="orange">Staff</option>
                                </FormSelect>
                            </div> */}
                        </div>
                        <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Button text="Add user" type="submit" onclick={() => document.getElementById('saving_data').style.display = "flex"} />
                            {/* <CustomBttn text="Discard" className="inline-flex justify-center w-full sm:w-auto items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                onclick={() => document.getElementById('createUser').style.display = "none"}>
                                <Ex className="mr-1 -ml-1 w-5 h-5" />
                            </CustomBttn> */}
                        </div>
                    </form>
                    <Spinner id="saving_data" text="Saving data..." />
                </div>
            </div>
        </div>
    );
}