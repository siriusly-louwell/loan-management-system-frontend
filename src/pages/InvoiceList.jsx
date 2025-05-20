import React, { useState, useEffect } from "react";
import LogList from "../components/LogList";
import LogRow from "../components/tables/LogRow";
import Preorder from '../components/badges/Preorder';
import Transit from "../components/badges/Transit";
import Confirmed from "../components/badges/Confirmed";
import Cancelled from "../components/badges/Cancelled";
import PageNav from "../components/PageNav";
import SearchInput from "../components/inputs/SearchInput";
import Search from "../assets/icons/Search";
import DropdownBttn from "../components/buttons/DropdownBttn";
import Filter from "../assets/icons/Filter";
import CustomBadge from "../components/badges/CustomBadge";

export default function InvoiceList({headText, path, bttnText ="View Details"}) {
    const [loans, setLoans] = useState([]);
    const [loanLoad, setLoanLoad] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/application')
            .then(response => response.json())
            .then(data => {
                setLoans(data);
                setLoanLoad(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            setLoanLoad(true);
        })
    }, []);

    function dateConvert(date) {
        const newDate = new Date(date);
        const formatted = new Intl.DateTimeFormat('en-GB').format(newDate);

        return formatted;
    }

    function displayLoan(loan) {
        if(bttnText == "Evaluate") {
            if(loan.user_id) return (
                <LogRow id={loan.record_id} name={loan.first_name+" "+loan.last_name} date={dateConvert(loan.created_at)}
                badge={<CustomBadge text="Approved" color="green" />} path={path} bttnText={bttnText} state={loan.id} />
            );
        } else return (
            <LogRow id={loan.record_id} name={loan.first_name+" "+loan.last_name} date={dateConvert(loan.created_at)} badge={
                !loan.user_id ? (<CustomBadge text="Pending" color="blue" />) : (<CustomBadge text="Approved" color="green" />)
            } path={path} bttnText={bttnText} state={loan.id} />
        );
    }

    return (
        <section class="bg-gray-200 py-8 w-full antialiased dark:bg-gray-800 md:py-10">
            <div class="mx-auto max-w-screen-x 2xl:px-0">
                <div class="mx-auto max-w-5xl bg-white dark:bg-gray-700 rounded-xl p-5">
                    <div class="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">{headText}</h2>

                        <div class="mt-6 gap-4 space-y-4 lg:w-1/2 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                            <SearchInput id="invoice_search" name="log_search" placeholder="Search ID, name...">
                                <Search />
                            </SearchInput>
                            <DropdownBttn text="Filters">
                                <Filter />
                            </DropdownBttn>
                        </div>
                    </div>

                    <LogList>
                        {loans.map(loan => (
                            loanLoad ? (
                                <div>Loading...</div>
                            )
                            : displayLoan(loan)
                        ))}
                        <LogRow id="FWB127364372" name="John Doe" date="20/12/2023" state={100}
                        badge={<CustomBadge text="Evaluated" color="yellow" />} path={path} bttnText={bttnText} />
                        {/* <LogRow id="FWB127364372" name="John Doe" date="20.12.2023" badge={<Confirmed />} path={path} bttnText={bttnText} />
                        <LogRow id="FWB127364372" name="John Doe" date="20.12.2023" badge={<Cancelled />} path={path} bttnText={bttnText} /> */}
                    </LogList>

                    <PageNav />
                </div>
            </div>
        </section>
    );
}