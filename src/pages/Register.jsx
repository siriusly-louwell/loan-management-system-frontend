import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/buttons/Button';
import TextInput from '../components/inputs/TextInput';
import RMCI from '../assets/images/RMCI.png';
import Alert from '../components/Alert';
import Spinner from '../components/loading components/Spinner';

export default function Register() {
    const navigate =  useNavigate();
    const [register, setRegister] = useState({role: 'customer', status: 'active'});
    const [alert, setAlert] = useState({});

    async function handleSubmit(event) {
        event.preventDefault();
        document.getElementById('register_spin').style.display = "flex";

        try {
            const response = await fetch('http://127.1:8000/api/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(register)
            });

            const result = await response.json();
            setAlert({
                text: result.message,
                icon: result.type === "valid" ? "done" : "warn"
            });
            console.log('Success: ', result);
            if(!response.ok) throw new Error('Update failed');
            // if(result.type == 'valid')navigate('/customer');
            else document.getElementById('register_alert').style.display = 'block';
            document.getElementById('register_spin').style.display = 'none';
            setTimeout(() => {
                navigate('/customer');
            }, 2000);
        } catch(error) {
            console.error('Error: ', error);
            setAlert({
                text: "Unexpected error!",
                icon: "warn"
            });
            document.getElementById('register_spin').style.display = 'none';
            document.getElementById('register_alert').style.display = 'block';
        }

    }

    function handleChange(event) {
        setRegister({
            ...register,
            [event.target.name]: event.target.value
        });
    }

    return (
        <>
            <section className="bg-gray-200 dark:bg-gray-900 p-10">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold space-x-4 text-gray-900 dark:text-white">
                        <img src={RMCI} className="h-8 mr-2" alt="Rhean Motor Logo" />
                        Rhean Motor Center    
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <TextInput name="record_id" type="text" id="id" value={register.record_id} change={handleChange} caption="Input your record ID/application ID" placeholder="2025-FG343D" required={true} />
                                <TextInput name="name" type="text" id="name" value={register.name} change={handleChange} caption="Name" placeholder="Type your name her" required={true} />
                                <TextInput name="email" type="email" id="email" value={register.email} change={handleChange} caption="Your email" placeholder="name@gmail.com" required={true} />
                                <TextInput name="password" type="password" id="password" value={register.password} change={handleChange} caption="Password" placeholder="••••••••" required={true} />
                                <TextInput name="confirm_pass" type="password" id="confirm" caption="Confirm Password" placeholder="••••••••" required={true} />
                                <Button text="Register now" />
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/login" className="font-medium text-rose-500 hover:underline dark:text-primary-500 cursor-pointer">Log in</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                    <Alert id="register_alert" text={alert.text} icon={alert.icon}>
                        <Button text="Ok" type="button" onclick={() => document.getElementById('register_alert').style.display = "none"} />
                    </Alert>
                    <Spinner id="register_spin" />
                </div>
            </section>
        </>
    );
}