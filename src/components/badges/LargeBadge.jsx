import React from "react";

export default function LargeBadge({type}) {
    let color;

    switch (type) {
        case 'eligible':
            color = 'blue';
            break;
        case 'passed':
            color = 'passed';
            break;
        case 'review':
            color = 'yellow';
            break;
        case 'not_eligible':
            color = 'orange';
            break;
        default:
            color = 'red';
            break;
    }

    return (
        <div className={`flex flex-col space-y-2 items-center justify-center w-full my-5 rounded-lg bg-${color}-100 px-20 py-4 text-2xl text-${color}-700 dark:bg-${color}-900 dark:text-${color}-300`}>
            <h3 className="font-bold">
                {type === 'review' ? 'Manual Review' : (type === 'not_eligible' ? 'Not Eligible' : type.charAt(0).toUpperCase() + type.slice(1))}
            </h3>
            <span className={`text-sm font-small text-${color}-600`}>
                {type === 'eligible' || type === 'passed' ? 'The applicant is eligible to take the loan'
                : (type === 'not_eligible' || type === 'reject' ? 'The applicant is not eligible to take the loan' : 'The application needs to be manually reviewed')}
            </span>
        </div>
    );
}