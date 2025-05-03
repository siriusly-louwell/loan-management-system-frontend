import React from "react";

export default function FooterLink({text}) {
    return (
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">{text}</a>
        </li>
    );
}