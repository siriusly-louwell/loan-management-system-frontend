import React, {useState} from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import FileInput from "../components/inputs/FileInput";

export default function FormRequirements() {
    const {fileChange, applicant} = useOutletContext();
    const location = useLocation();

    return (
        <>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Other Requirements:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                {location.pathname === '/admin/apply/requirements' ? (
                    <>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valid ID</label>
                            <img src={`http://127.0.0.1:8000/storage/${applicant.valid_id}`} className="rounded rounded-lg w-20" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Picture</label>
                            <img src={`http://127.0.0.1:8000/storage/${applicant.id_pic}`} className="rounded rounded-lg w-20" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proof of Residence</label>
                            <img src={`http://127.0.0.1:8000/storage/${applicant.residence_proof}`} className="rounded rounded-lg w-20" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proof of Income</label>
                            <img src={`http://127.0.0.1:8000/storage/${applicant.income_proof}`} className="rounded rounded-lg w-20" />
                        </div>
                    </>
                ) : (
                    <>
                        <FileInput label="Valid ID" name="valid_id" type="img" change={fileChange} require={true} />
                        <FileInput label="2x2 Picture" name="id_pic" type="img" change={fileChange} require={true} />
                        <FileInput label="Proof of Residence" name="residence_proof" type="img" change={fileChange} require={true} />
                        <FileInput label="Proof of Income" name="income_proof" type="img" change={fileChange} require={true} />
                    </>
                )}
            </div>
        </>
    );
}