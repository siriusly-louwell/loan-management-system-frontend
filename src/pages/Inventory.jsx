import React from 'react';
import CreateProduct from './CreateProduct';
import InventoryTable from '../components/tables/InventoryTable';
import CRUDformat from '../components/CRUDformat';

export default function Inventory() {
    return (
        <CRUDformat addModal={<CreateProduct />} label="Product">
            <InventoryTable />
        </CRUDformat>
    );
}