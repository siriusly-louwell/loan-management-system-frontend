import React from 'react';
import FormInput from '../components/inputs/FormInput';

export default function FormCredentials() {
    return (
        <>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Login Credentials:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                <FormInput label="Email" type="email" placeholder="Name@gmail.com" />
                <FormInput label="Confirm Email" type="email" placeholder="Name@gmail.com" />
                <FormInput label="Password" type="password" placeholder="*****" />
                <FormInput label="Confirm Password" type="password" placeholder="*****" />
            </div>
        </>
    );
}