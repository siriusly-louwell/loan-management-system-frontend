import React from 'react';
import CreateProduct from './CreateProduct';
import CRUDformat from '../components/CRUDformat';
import ApplicantsTable from '../components/tables/ApplicantsTable';
import CreateUser from './CreateUser';

export default function AccApplicants() {
    return (
        <CRUDformat addModal={<CreateUser />} modalId='createUser' label="User">
            <ApplicantsTable />
        </CRUDformat>
    );
}