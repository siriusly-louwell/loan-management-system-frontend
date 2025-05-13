import React from 'react';
import Button from '../components/buttons/Button';
import TextInput from '../components/inputs/TextInput';
import Link from '../components/links/Link';
import Checkbox from '../components/checkboxes/Checkbox';
import SelectModal from '../components/modals/SelectModal';

export default function Login() {
    return (
        <>
            <section class="bg-gray-50 h-screen dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Rhean Motor Center    
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#">
                                <TextInput name="email" type="email" id="email" caption="Your email" placeholder="name@gmail.com" required={true} />
                                <TextInput name="password" type="password" id="password" caption="Password" placeholder="••••••••" required={true} />
                                <div class="flex items-center justify-between">
                                    <Checkbox name="" id="show_pass" text="Show password" required={false} />
                                    <Link text="Forgot Password" style="text-sm" />
                                </div>
                                <Button text="Login" />
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <span class="font-medium text-blue-500 hover:underline dark:text-primary-500 cursor-pointer"
                                    onClick={() => document.getElementById('select_modal').style.display = 'block'}>Sign up</span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <SelectModal />
        </>
    );
}