import React from "react";

export default function ProductGrid(props) {
    return (
        <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {props.children}
        </div>
    );
}