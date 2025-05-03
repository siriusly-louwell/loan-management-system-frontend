import React from "react";
import LogList from "../components/LogList";
import LogRow from "../components/tables/LogRow";
import Preorder from '../components/badges/Preorder';
import Transit from "../components/badges/Transit";
import Confirmed from "../components/badges/Confirmed";
import Cancelled from "../components/badges/Cancelled";
import PageNav from "../components/PageNav";
import SearchInput from "../components/inputs/SearchInput";
import Search from "../assets/icons/Search";

export default function InvoiceList() {
    return (
        <section class="bg-white py-8 w-full antialiased dark:bg-gray-800 md:py-10">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div class="mx-auto max-w-5xl">
                    <div class="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Loan Payments</h2>

                        <div class="mt-6 gap-4 space-y-4 lg:w-1/2 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                            <SearchInput id="invoice_search" name="log_search" placeholder="Search invoice...">
                                <Search />
                            </SearchInput>
                        </div>
                    </div>

                    <LogList>
                        <LogRow id="FWB127364372" date="20.12.2023" unit="Kawasaki" badge={<Preorder />} />
                        <LogRow id="FWB127364372" date="20.12.2023" unit="Kawasaki" badge={<Transit />} />
                        <LogRow id="FWB127364372" date="20.12.2023" unit="Kawasaki" badge={<Confirmed />} />
                        <LogRow id="FWB127364372" date="20.12.2023" unit="Kawasaki" badge={<Cancelled />} />
                    </LogList>

                    <PageNav />
                </div>
            </div>
        </section>
    );
}