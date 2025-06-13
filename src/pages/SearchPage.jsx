import React, { useState } from "react";
import SearchInput from "../components/inputs/SearchInput";
import Search from "../assets/icons/Search";
import EmptySearch from "../components/empty states/EmptySearch";
import InvoiceList from "./InvoiceList";

export default function SearchPage() {
    const [search, setSearch] = useState('');

    return (
        <section className="bg-gray-200 py-8 antialiased dark:bg-gray-800 md:py-12">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-12">
                <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white mb-5 sm:text-2xl">Search your Application</h2>
                <SearchInput name="loan_search" placeholder="2025-GT43D, John Doe" change={setSearch} value={search}>
                    <Search />
                </SearchInput>
                {search === '' ? (
                    <EmptySearch label="No data to show" context="Use the search bar to find applications" />
                ) : (
                    <InvoiceList record={`/${search}?by=record_id`} />
                )}
            </div>
        </section>
    );
}