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
import EmptySearch from "../components/empty states/EmptySearch";
import { useLocation } from "react-router-dom";

export default function InvoiceList({headText, record = '', path, bttnText = "View Details", id}) {
    const [loans, setLoans] = useState([]);
    const [loanLoad, setLoanLoad] = useState(true);
    const location = useLocation();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/application${record}`)
            .then(response => response.json())
            .then(data => {
                if(Array.isArray(data))setLoans(data);
                else setLoans([data]);
                setLoanLoad(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            setLoanLoad(true);
            setLoans({});
        })
    }, [record]);

    function dateConvert(date) {
        const newDate = new Date(date);
        const formatted = new Intl.DateTimeFormat('en-GB').format(newDate);

        return formatted;
    }

    function displayLoan(loan) {        
        if(location.pathname !== '/ci/loanapplications' && location.pathname !== '/ci' && location.pathname !== '/ci/evaluation') {
            return (
                <LogRow id={loan.record_id} name={loan.first_name+" "+loan.last_name} date={dateConvert(loan.created_at)} badge={
                    loan.apply_status === 'pending' ? (<CustomBadge text="Pending" color="blue" />) : (loan.apply_status === 'approved' ? (<CustomBadge text="Approved" color="green" />) : (<CustomBadge text="Evaluated" color="yellow" />))
                } path={path} bttnText={bttnText} state={loan.id} />
            );
        } else if(loan.ci_id === id) {
            if(bttnText === "Evaluate") {
                if(loan.apply_status === 'approved') {
                        return (
                        <LogRow id={loan.record_id} name={loan.first_name+" "+loan.last_name} date={dateConvert(loan.created_at)}
                        badge={<CustomBadge text="Approved" color="green" />} path={path} bttnText={bttnText} state={loan.id} />
                    );
                }
            } else return (
                <LogRow id={loan.record_id} name={loan.first_name+" "+loan.last_name} date={dateConvert(loan.created_at)} badge={
                    loan.apply_status === 'pending' ? (<CustomBadge text="Pending" color="blue" />) : (loan.apply_status === 'approved' ? (<CustomBadge text="Approved" color="green" />) : (<CustomBadge text="Evaluated" color="yellow" />))
                } path={path} bttnText={bttnText} state={loan.id} />
            );
        }
    }
    
    return (
        <section className="bg-gray-200 py-8 w-full antialiased dark:bg-gray-800 md:py-10">
            <div className="mx-auto max-w-screen-x 2xl:px-0">
                <div className="mx-auto max-w-5xl bg-white dark:bg-gray-700 rounded-xl p-5">
                    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">{headText}</h2>

                        {location.pathname === '/find' ? '' : (
                            <div className="mt-6 gap-4 space-y-4 lg:w-1/2 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                                <SearchInput id="invoice_search" name="log_search" placeholder="Search ID, name...">
                                    <Search />
                                </SearchInput>
                                <DropdownBttn text="Filters">
                                    <Filter />
                                </DropdownBttn>
                            </div>
                        )}
                    </div>

                    {Object.keys(loans).length === 0 ? (
                        <EmptySearch label="No results" context="It seems no such data exists" />
                    ) : (
                        <>
                            <LogList>
                                {loanLoad ? (
                                    <div>Loading...</div>
                                ) : (
                                    loans.length > 1 ?
                                        loans.map(loan => (displayLoan(loan))
                                    ) : displayLoan(loans[0])
                                )}
                                {/* <LogRow id="FWB127364372" name="John Doe" date="20/12/2023" state={100}
                                badge={<CustomBadge text="Evaluated" color="yellow" />} path={path} bttnText={bttnText} /> */}
                                {/* <LogRow id="FWB127364372" name="John Doe" date="20.12.2023" badge={<Confirmed />} path={path} bttnText={bttnText} />
                                <LogRow id="FWB127364372" name="John Doe" date="20.12.2023" badge={<Cancelled />} path={path} bttnText={bttnText} /> */}
                            </LogList>

                            <PageNav />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}