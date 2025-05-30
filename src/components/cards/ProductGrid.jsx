import React from "react";

export default function ProductGrid({children, addunit}) {
    const condition = addunit ? "lg:grid-cols-2 xl:grid-cols-2" : "lg:grid-cols-3 xl:grid-cols-4";
    return (
        <div className={`mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 ${condition}`}>
            {children}
        </div>
    );
}