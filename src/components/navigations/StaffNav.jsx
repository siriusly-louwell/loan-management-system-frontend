import React from 'react';
import Navlink from '../links/NavLink';

export default function StaffNav() {
    return (
        <>
            {/* <Navlink pathName="Inventory" to="inventory" /> */}
            <Navlink pathName="Loans" to="loans" />
            <Navlink pathName="Cashier" to="cashier" />
            <Navlink pathName="Walk In" to="product" />
            <Navlink pathName="History" to="history" />
        </>
    );
}