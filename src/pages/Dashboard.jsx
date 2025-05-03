import React from 'react';
import SideBar from '../components/SideBar';
import InvoiceList from './InvoiceList';
import DashOverview from './DashOverview';
import Invoice from './Invoice';

export default function Dashboard() {
    return (
        <div class="sm:flex bg-white dark:bg-gray-800">
            <SideBar />
            {/* <InvoiceList /> */}
            {/* <DashOverview /> */}
            <Invoice />
        </div>
    );
}