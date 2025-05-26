import React from 'react';
import Navlink from '../links/NavLink';

export default function AdminNav() {
    return (
        <>
            <Navlink pathName="Inventory" to="inventory" />
            <Navlink pathName="Dashboard" to="dashboard" />
            <Navlink pathName="Accounts" to="accounts" />
            <Navlink pathName="Loans" to="loans" />
        </>
    );
}