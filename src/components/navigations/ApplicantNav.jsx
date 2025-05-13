import React from 'react';
import Navlink from '../links/NavLink';

export default function ApplicantNav() {
    return (
        <>
            <Navlink pathName="Home" to="prodlist" />
            <Navlink pathName="Applications" to="applications" />
            <Navlink pathName="My Loans" to="myloans" />
            <Navlink pathName="Payment History" to="history" />
        </>
    );
}