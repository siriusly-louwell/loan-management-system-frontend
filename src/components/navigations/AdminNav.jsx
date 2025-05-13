import React from 'react';
import Navlink from '../links/NavLink';

export default function AdminNav() {
    return (
        <>
            <Navlink pathName="Dashboard" to="dashboard" />
            <Navlink pathName="Inventory" to="inventory" />
            <Navlink pathName="Loans" to="loans" />
            <Navlink pathName="Accounts" to="accounts" />
        </>
    );
}