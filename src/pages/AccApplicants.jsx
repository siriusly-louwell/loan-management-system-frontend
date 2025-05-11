import React from 'react';
import CreateProduct from './CreateProduct';
import CRUDformat from '../components/CRUDformat';
import ApplicantsTable from '../components/tables/ApplicantsTable';

export default function AccApplicants() {
    return (
        <CRUDformat addModal={<CreateProduct />} label="User">
            <ApplicantsTable />
        </CRUDformat>
    );
}