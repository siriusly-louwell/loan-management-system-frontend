import React, {useState} from "react";
import { useOutletContext } from "react-router-dom";
import FileInput from "../components/inputs/FileInput";

export default function FormRequirements() {
    const {fileChange} = useOutletContext();

    return (
        <>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Other Requirements:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                <FileInput label="Valid ID" name="valid_id" type="img" change={fileChange} require={true} />
                <FileInput label="2x2 Picture" name="id_pic" type="img" change={fileChange} require={true} />
                <FileInput label="Proof of Residence" name="residence_proof" type="pdf" change={fileChange} require={true} />
                <FileInput label="Proof of Income" name="income_proof" type="pdf" change={fileChange} require={true} />
            </div>
        </>
    );
}