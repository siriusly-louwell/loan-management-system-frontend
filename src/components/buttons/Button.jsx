import React from "react";

export default function Button({text, bttnType, onclick}) {
    return (
        <button onClick={onclick} type={bttnType} className="w-full text-white bg-rose-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800">
            {text}
        </button>
    );
}