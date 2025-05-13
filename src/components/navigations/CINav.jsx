import React from 'react';
import Navlink from '../links/NavLink';

export default function CINav() {
    return (
        <>
            <Navlink pathName="Applications" to="loanapplications" />
            <Navlink pathName="Evaluation" to="evaluation" />
            <Navlink pathName="Eligibility Recommendations" to="recommendation" />
        </>
    );
}