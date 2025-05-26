import React from 'react';
import Navlink from '../links/NavLink';

export default function AdminNav() {
    return (
        <>
            {/* <Navlink pathName="Inventory" to="inventory" /> */}
            <Navlink pathName="Loans" to="loans" />
            <Navlink pathName="Cashier" to="cashier" />
            <Navlink pathName="Inquire Loan" to="emi" />
        </>
    );
}