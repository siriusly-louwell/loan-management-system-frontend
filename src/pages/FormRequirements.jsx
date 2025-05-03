import React from "react";
import FileInput from "../components/inputs/FileInput";

export default function FormRequirements() {
    return (
        <>
            <h3 class="text-lg font-semibold text-gray-900 pb-3 dark:text-white">Other Requirements:</h3>
            <div class="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                <FileInput label="Valid ID" type="img" />
                <FileInput label="2x2 Picture" type="img" />
                <FileInput label="Proof of Residence" type="pdf" />
                <FileInput label="Proof of Income" type="pdf" />
            </div>
        </>
    );
}