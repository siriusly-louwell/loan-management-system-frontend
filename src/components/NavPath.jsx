import React from "react";
import PathLink from "./links/PathLink";

export default function NavPath() {
    return (
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <PathLink pathName="Home" />
                    <PathLink pathName="Products" />
                    <PathLink pathName="Electronics" />
                </ol>
            </nav>
    );
}