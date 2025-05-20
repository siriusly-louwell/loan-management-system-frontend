import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/buttons/Button';
import TextInput from '../components/inputs/TextInput';
import RMCI from '../assets/images/RMCI.jpg';

export default function Register() {
    return (
        <>
            <section class="bg-gray-50 h-screen dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold space-x-4 text-gray-900 dark:text-white">
                        <img src={RMCI} class="h-8 rounded border border-gray-400 mr-2" alt="Rhean Motor Logo" />
                        Rhean Motor Center    
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register your account
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#">
                                <TextInput name="record_id" type="text" id="id" caption="Input your record ID/application ID" placeholder="2025-0032" required={true} />
                                <TextInput name="email" type="email" id="email" caption="Your email" placeholder="name@gmail.com" required={true} />
                                <TextInput name="password" type="password" id="password" caption="Password" placeholder="••••••••" required={true} />
                                <TextInput name="confirm_pass" type="password" id="confirm" caption="Confirm Password" placeholder="••••••••" required={true} />
                                <Button text="Register now" />
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/login" class="font-medium text-blue-500 hover:underline dark:text-primary-500 cursor-pointer">Log in</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}