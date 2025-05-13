import React from 'react';
import Navlink from '../links/NavLink';

export default function GuestNav() {
    return (
        <>
            <Navlink pathName="Home" to="prodlist" />
            <Navlink pathName="About" to="about" />
            <Navlink pathName="Services" to="services" />
        </>
    );
}