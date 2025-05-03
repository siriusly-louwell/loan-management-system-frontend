import React from 'react';
import PageLink from './links/PageLink';

export default function Paginator() {
    return (
        <ul class="inline-flex items-stretch -space-x-px">
            <PageLink extra="py-1.5 ml-0 rounded-l-lg h-full">
                <span class="sr-only">Previous</span>
                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
            </PageLink>
            <PageLink extra="py-2">1</PageLink>
            <PageLink extra="py-2">2</PageLink>
            <PageLink extra="py-2">3</PageLink>
            <PageLink extra="py-2">...</PageLink>
            <PageLink extra="py-2">100</PageLink>
            <PageLink extra="py-1.5 rounded-r-lg h-full">
                <span class="sr-only">Next</span>
                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </PageLink>
        </ul>
    );
}