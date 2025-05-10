import React from 'react';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div class="sm:flex bg-white dark:bg-gray-800">
            <SideBar />
            <Outlet />
        </div>
    );
}