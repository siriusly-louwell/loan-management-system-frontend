import React from 'react';
import Navlink from '../links/NavLink';

export default function CoMakerNav() {
    return (
        <>
            <Navlink pathName="Liable Loans" to="obligeloans" />
            <Navlink pathName="Co-Signed Loans" to="cosigned" />
            <Navlink pathName="Payment Alerts" to="alerts" />
        </>
    );
}